# Generated by Django 3.2.11 on 2022-02-01 21:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('seqr', '0035_variantsearch_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='sample',
            name='tissue_type',
            field=models.CharField(blank=True, choices=[('WB', 'Whole Blood'), ('F', 'Fibroblast'), ('M', 'Muscle'), ('L', 'Lymphocyte')], max_length=2, null=True),
        ),
        migrations.CreateModel(
            name='RnaSeqTpm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gene_id', models.CharField(max_length=20)),
                ('tpm', models.FloatField()),
                ('sample', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='seqr.sample')),
            ],
            options={
                'unique_together': {('sample', 'gene_id')},
            },
        ),
    ]
