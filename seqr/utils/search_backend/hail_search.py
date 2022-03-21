from collections import defaultdict
import hail as hl
import logging

from seqr.views.utils.json_utils import _to_camel_case
from reference_data.models import GENOME_VERSION_GRCh37
from seqr.models import Sample, Individual
from seqr.utils.elasticsearch.utils import InvalidSearchException
from seqr.utils.elasticsearch.constants import RECESSIVE, COMPOUND_HET, X_LINKED_RECESSIVE, ANY_AFFECTED, \
    INHERITANCE_FILTERS, ALT_ALT, REF_REF, REF_ALT, HAS_ALT, HAS_REF, \
    POPULATIONS # TODO may need different constants
from seqr.utils.elasticsearch.es_search import EsSearch, _get_family_affected_status, _annotations_filter

logger = logging.getLogger(__name__)

GENOTYPE_QUERY_MAP = {
    REF_REF: 'is_hom_ref',
    REF_ALT: 'is_het',
    ALT_ALT: 'is_hom_var',
    HAS_ALT: 'is_non_ref',
    # HAS_REF: '', # TODO find function for this
}

#  For production: constants should have their own file

POPULATION_SUB_FIELDS = {
    'AF',
    'AC',
    'AN',
    'Hom',
    'Hemi',
    'Het',
}
POPULATIONS = {
    'topmed': {'hemi': None,'het': None},
    'g1k': {'filter_af': 'POPMAX_AF', 'hom': None, 'hemi': None, 'het': None},
    'exac': {
        'filter_af': 'AF_POPMAX', 'ac': 'AC_Adj', 'an': 'AN_Adj', 'hom': 'AC_Hom', 'hemi': 'AC_Hemi', 'het': None,
    },
    'gnomad_exomes': {'filter_AF':  'AF_POPMAX_OR_GLOBAL', 'het': None},
    'gnomad_genomes': {'filter_af': 'AF_POPMAX_OR_GLOBAL', 'het': None},
}
for pop_config in POPULATIONS.values():
    pop_config.update({field.lower(): field for field in POPULATION_SUB_FIELDS if field.lower() not in pop_config})

PREDICTION_FIELDS_CONFIG = {}
for path, pred_config in {
    'cadd': {'PHRED': 'cadd'},
    'dbnsfp': {
        'FATHMM_pred': 'fathmm',
        'GERP_RS': 'gerp_rs',
        'MetaSVM_pred': 'metasvm',
        'MutationTaster_pred': 'mutationtaster',
        'phastCons100way_vertebrate': 'phastcons_100_vert',
        'Polyphen2_HVAR_pred': 'polyphen',
        'REVEL_score': 'revel',
        'SIFT_pred': 'sift',
    },
    'eigen': {'Eigen_phred': 'eigen'},
    'mpc': {'MPC': 'mpc'},
    'primate_ai': {'score': 'primate_ai'},
    'splice_ai': {'delta_score': 'splice_ai', 'splice_consequence': 'splice_ai_consequence'},
}.items():
    PREDICTION_FIELDS_CONFIG.update({prediction: (path, sub_path) for sub_path, prediction in pred_config.items()})

CORE_FIELDS = ['pos', 'ref', 'alt', 'familyGuids', 'genotypes', 'hgmd', 'rsid', 'xpos']
RENAME_FIELDS = {'contig': 'chrom'}
ANNOTATION_FIELDS = {
    'clinvar': lambda r: hl.struct(
        clinicalSignificance=r.clinvar.clinical_significance,
        alleleId=r.clinvar.allele_id,
        goldStars=r.clinvar.gold_stars,
    ),
    'genotypeFilters': lambda r: hl.str(' ,').join(r.filters),
    'genomeVersion': lambda r: hl.eval(r.gv),
    'liftedOverGenomeVersion': lambda r: hl.if_else(
        hl.is_defined(r.rg37_locus), hl.literal(GENOME_VERSION_GRCh37), hl.missing(hl.dtype('str')),
    ),
    'liftedOverChrom': lambda r: hl.if_else(
        hl.is_defined(r.rg37_locus), r.rg37_locus.contig, hl.missing(hl.dtype('str')),
    ),
    'liftedOverPos': lambda r: hl.if_else(
        hl.is_defined(r.rg37_locus), r.rg37_locus.position, hl.missing(hl.dtype('int32')),
    ),
    'mainTranscriptId': lambda r: r.sortedTranscriptConsequences[0].transcript_id,
    'originalAltAlleles': lambda r: r.originalAltAlleles.map(lambda a: a.split('-')[-1]),
    'populations': lambda r: hl.struct(callset=hl.struct(af=r.AF, ac=r.AC, an=r.AN), **{
        population: hl.struct(**{
            response_key: hl.or_else(r[population][field], 0) for response_key, field in pop_config.items()
            if field is not None
        }) for population, pop_config in POPULATIONS.items()}
    ),
    'predictions': lambda r: hl.struct(**{
        prediction: r[path[0]][path[1]] for prediction, path in PREDICTION_FIELDS_CONFIG.items()
    }),
    'transcripts': lambda r: r.sortedTranscriptConsequences.map(
        lambda t: hl.struct(**{_to_camel_case(k): t[k] for k in [
            'amino_acids', 'biotype', 'canonical', 'codons', 'gene_id', 'hgvsc', 'hgvsp',
            'lof', 'lof_flags', 'lof_filter', 'lof_info', 'transcript_id',
        ]})).group_by(lambda t: t.geneId),
}

class HailSearch(object):

    def __init__(self, families, previous_search_results=None, inheritance_search=None, user=None, **kwargs):

        self.samples_by_family = defaultdict(dict)
        samples = Sample.objects.filter(is_active=True, individual__family__in=families)

        data_sources = {s.elasticsearch_index for s in samples}
        if len(data_sources) > 1:
            raise InvalidSearchException(
                f'Search is only enabled on a single data source, requested {", ".join(data_sources)}')
        data_source = data_sources.pop()

        for s in samples.select_related('individual__family'):
            self.samples_by_family[s.individual.family.guid][s.sample_id] = s

        self._family_individual_affected_status = defaultdict(dict)
        if inheritance_search:
            skipped_families = []
            for family_guid, samples_by_id in self.samples_by_family.items():
                individual_affected_status = _get_family_affected_status(
                    samples_by_id, inheritance_search.get('filter') or {})
                self._family_individual_affected_status[family_guid].update(individual_affected_status)

                has_affected_samples = any(
                    aftd == Individual.AFFECTED_STATUS_AFFECTED for aftd in individual_affected_status.values()
                )
                if not has_affected_samples:
                    skipped_families.append(family_guid)

            for family_guid in skipped_families:
                del self.samples_by_family[family_guid]

            if len(self.samples_by_family) < 1:
                raise InvalidSearchException(
                    'Inheritance based search is disabled in families with no data loaded for affected individuals')

        self._user = user
        self.previous_search_results = previous_search_results or {}
        self._allowed_consequences = None
        self._sample_table_queries = {}

        self.ht = hl.read_matrix_table(f'/hail_datasets/{data_source}.mt').rows()

    def _sample_table(self, sample):
        return hl.read_table(f'/hail_datasets/{sample.elasticsearch_index}_samples/sample_{sample.sample_id}.ht')

    @classmethod
    def process_previous_results(cls, previous_search_results, page=1, num_results=100, **kwargs):
        # return EsSearch.process_previous_results(*args, **kwargs)
        # TODO re-enable caching at some point, but not helpful for development
        return None, {'page': page, 'num_results': num_results}

    def sort(self, sort):
        pass
        # raise NotImplementedError

    def filter_by_location(self, genes=None, intervals=None, **kwargs):
        parsed_intervals = [
            hl.parse_locus_interval(interval, reference_genome="GRCh38") for interval in
            ['{chrom}:{start}-{end}'.format(**interval) for interval in intervals or []] + [
                # long-term we should check project to get correct genome version
                'chr{chromGrch38}:{startGrch38}-chr{chromGrch38}:{endGrch38}'.format(**gene) for gene in (genes or {}).values()]
        ]

        self.ht = hl.filter_intervals(self.ht, parsed_intervals)

    def filter_by_frequency(self, frequencies, **kwargs):
        freq_filters = {}
        for pop, freqs in sorted(frequencies.items()):
            if freqs.get('af') is not None:
                filter_field = next(
                    (field_key for field_key in POPULATIONS[pop]['filter_AF']
                     if any(field_key in index_metadata['fields'] for index_metadata in self.index_metadata.values())),
                    POPULATIONS[pop]['AF'])
                freq_filters[filter_field] = freqs['af']
            elif freqs.get('ac') is not None:
                freq_filters[POPULATIONS[pop]['AC']] = freqs['ac']

            if freqs.get('hh') is not None:
                freq_filters[POPULATIONS[pop]['Hom']] = freqs['hh']
                freq_filters[POPULATIONS[pop]['Hemi']] = freqs['hh']

        # freq_filters example: {'gnomad_genomes_AF_POPMAX_OR_GLOBAL': 0.001, 'AC': 3}
        # TODO actually apply filters, get variants with freq <= specified value, or missing from data entirely
        raise NotImplementedError

    def filter_by_in_silico(self, in_silico_filters):
        raise NotImplementedError

    def filter_by_annotation_and_genotype(self, inheritance, quality_filter=None, annotations=None, **kwargs):
        if annotations:
            self._filter_by_annotations(annotations)

        inheritance_mode = (inheritance or {}).get('mode')
        inheritance_filter = (inheritance or {}).get('filter') or {}
        if inheritance_filter.get('genotype'):
            inheritance_mode = None

        if inheritance_mode in {RECESSIVE, COMPOUND_HET}:
            self._filter_compound_hets(quality_filter)
            if inheritance_mode == COMPOUND_HET:
                return

        self._filter_by_genotype(inheritance_mode, inheritance_filter, quality_filter)

    def _filter_by_annotations(self, annotations):
        _, allowed_consequences = _annotations_filter(annotations or {})
        if allowed_consequences:
            # allowed_consequences: list of allowed VEP transcript_consequence
            # TODO actually apply filters, get variants with any transcript with a consequence in the allowed list -
            allowed_consequences_set = hl.set(allowed_consequences)
            consequence_terms = self.ht.vep.transcript_consequences.flatmap(lambda tc: tc.consequence_terms)
            self.ht = self.ht.filter(consequence_terms.any(lambda ct: allowed_consequences_set.contains(ct)))

    def _filter_by_genotype(self, inheritance_mode, inheritance_filter, quality_filter):
        if inheritance_mode == ANY_AFFECTED:
            inheritance_filter = None
        elif inheritance_mode:
            inheritance_filter.update(INHERITANCE_FILTERS[inheritance_mode])

        if inheritance_mode == X_LINKED_RECESSIVE:
            # TODO will need to filter by both inheritance and chromosome
            raise NotImplementedError
        if inheritance_mode == COMPOUND_HET:
            # TODO implement comp het
            raise NotImplementedError
        if inheritance_mode == RECESSIVE:
            # TODO should add an OR filter for variants with X-linked inheritance, and also trigger comp het
            raise NotImplementedError

        if inheritance_filter and list(inheritance_filter.keys()) == ['affected']:
            raise InvalidSearchException('Inheritance must be specified if custom affected status is set')

        # TODO actually implement for multiple families
        for family_guid, samples_by_id in self.samples_by_family.items():
            samples = list(samples_by_id.values())
            sample_tables = [self._sample_table(sample).select_globals() for sample in samples]

            affected_status = self._family_individual_affected_status.get(family_guid)
            individual_genotype_filter = (inheritance_filter or {}).get('genotype') or {}

            family_ht = None
            for i, sample_ht in enumerate(sample_tables):
                if inheritance_filter:
                    individual_guid = samples[i].individual.guid
                    affected = affected_status[individual_guid]
                    genotype = individual_genotype_filter.get(individual_guid) or inheritance_filter.get(affected)
                    sample_ht = sample_ht.filter(getattr(sample_ht.GT, GENOTYPE_QUERY_MAP[genotype])())

                # TODO remove all samples in families where any sample is not passing the quality filters

                if family_ht is None:
                    family_ht = sample_ht
                else:
                    family_ht = family_ht.join(sample_ht)

            family_ht = family_ht.rename({'GT': 'GT_0', 'GQ': 'GQ_0'})

            # Filter if any matching genotypes for any affected or any inheritance search
            if not inheritance_filter:
                non_ref_sample_indices = [
                    i for i, sample in enumerate(samples)
                    if affected_status[sample.individual.guid] == Individual.AFFECTED_STATUS_AFFECTED
                ] if inheritance_mode == ANY_AFFECTED else range(len(samples))

                q = family_ht[f'GT_{non_ref_sample_indices[0]}'].is_non_ref()
                for i in non_ref_sample_indices[1:]:
                    q |= family_ht[f'GT_{i}'].is_non_ref()

                family_ht = family_ht.filter(q)

            family_ht = family_ht.annotate(
                familyGuids=hl.literal([family_guid]),
                genotypes=hl.struct(**{sample.individual.guid: hl.struct(
                    sampleId=hl.literal(sample.sample_id),
                    numAlt=family_ht[f'GT_{i}'].n_alt_alleles(),
                    gq=family_ht[f'GQ_{i}'],
                    # TODO ab
                ) for i, sample in enumerate(samples)})).select('genotypes', 'familyGuids')

            self.ht = self.ht.join(family_ht)


    def _filter_compound_hets(self, quality_filter):
        self._filter_by_genotype(COMPOUND_HET, inheritance_filter={}, quality_filter=quality_filter)
        # TODO modify query - get multiple hits within a single gene and ideally return grouped by gene
        raise NotImplementedError

    def search(self, page=1, num_results=100, **kwargs): # List of dictionaries of results {pos, ref, alt}
        rows = self.ht.annotate_globals(gv=hl.eval(self.ht.genomeVersion)).drop('genomeVersion') # prevents name collision with global
        rows = rows.annotate(**{k: v(rows) for k, v in ANNOTATION_FIELDS.items()})
        rows = rows.rename(RENAME_FIELDS)
        rows = rows.key_by('variantId')
        rows = rows.select(*CORE_FIELDS, *RENAME_FIELDS.values(), *ANNOTATION_FIELDS.keys())

        total_results = rows.count()
        self.previous_search_results['total_results'] = total_results
        logger.info(f'Total hits: {total_results}')

        collected = rows.take(num_results)
        hail_results = [_json_serialize(dict(row)) for row in collected]

        # TODO potentially post-process compound hets
        return hail_results

# For production: should use custom json serializer
def _json_serialize(result):
    if isinstance(result, list):
        return [_json_serialize(o) for o in result]

    if isinstance(result, hl.Struct) or isinstance(result, hl.utils.frozendict):
        result = dict(result)

    if isinstance(result, dict):
        return {k: _json_serialize(v)  for k, v in result.items()}

    return result
