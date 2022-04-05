"use strict";(self.webpackChunkseqr=self.webpackChunkseqr||[]).push([[853],{85959:function(t,n,e){function r(t,n,e){t.prototype=n.prototype=e,e.constructor=t}function i(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function o(){}e.d(n,{ZP:function(){return b},B8:function(){return A}});var u=.7,a=1/u,s="\\s*([+-]?\\d+)\\s*",c="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",l="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",h=/^#([0-9a-f]{3,8})$/,f=new RegExp("^rgb\\("+[s,s,s]+"\\)$"),p=new RegExp("^rgb\\("+[l,l,l]+"\\)$"),d=new RegExp("^rgba\\("+[s,s,s,c]+"\\)$"),g=new RegExp("^rgba\\("+[l,l,l,c]+"\\)$"),y=new RegExp("^hsl\\("+[c,l,l]+"\\)$"),m=new RegExp("^hsla\\("+[c,l,l,c]+"\\)$"),v={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function w(){return this.rgb().formatHex()}function _(){return this.rgb().formatRgb()}function b(t){var n,e;return t=(t+"").trim().toLowerCase(),(n=h.exec(t))?(e=n[1].length,n=parseInt(n[1],16),6===e?x(n):3===e?new M(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1):8===e?N(n>>24&255,n>>16&255,n>>8&255,(255&n)/255):4===e?N(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|240&n,((15&n)<<4|15&n)/255):null):(n=f.exec(t))?new M(n[1],n[2],n[3],1):(n=p.exec(t))?new M(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=d.exec(t))?N(n[1],n[2],n[3],n[4]):(n=g.exec(t))?N(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=y.exec(t))?P(n[1],n[2]/100,n[3]/100,1):(n=m.exec(t))?P(n[1],n[2]/100,n[3]/100,n[4]):v.hasOwnProperty(t)?x(v[t]):"transparent"===t?new M(NaN,NaN,NaN,0):null}function x(t){return new M(t>>16&255,t>>8&255,255&t,1)}function N(t,n,e,r){return r<=0&&(t=n=e=NaN),new M(t,n,e,r)}function k(t){return t instanceof o||(t=b(t)),t?new M((t=t.rgb()).r,t.g,t.b,t.opacity):new M}function A(t,n,e,r){return 1===arguments.length?k(t):new M(t,n,e,null==r?1:r)}function M(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function Z(){return"#"+S(this.r)+S(this.g)+S(this.b)}function E(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}function S(t){return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16)}function P(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new C(t,n,e,r)}function q(t){if(t instanceof C)return new C(t.h,t.s,t.l,t.opacity);if(t instanceof o||(t=b(t)),!t)return new C;if(t instanceof C)return t;var n=(t=t.rgb()).r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),u=Math.max(n,e,r),a=NaN,s=u-i,c=(u+i)/2;return s?(a=n===u?(e-r)/s+6*(e<r):e===u?(r-n)/s+2:(n-e)/s+4,s/=c<.5?u+i:2-u-i,a*=60):s=c>0&&c<1?0:a,new C(a,s,c,t.opacity)}function C(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function R(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}r(o,b,{copy:function(t){return Object.assign(new this.constructor,this,t)},displayable:function(){return this.rgb().displayable()},hex:w,formatHex:w,formatHsl:function(){return q(this).formatHsl()},formatRgb:_,toString:_}),r(M,A,i(o,{brighter:function(t){return t=null==t?a:Math.pow(a,t),new M(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?u:Math.pow(u,t),new M(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Z,formatHex:Z,formatRgb:E,toString:E})),r(C,(function(t,n,e,r){return 1===arguments.length?q(t):new C(t,n,e,null==r?1:r)}),i(o,{brighter:function(t){return t=null==t?a:Math.pow(a,t),new C(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?u:Math.pow(u,t),new C(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new M(R(t>=240?t-240:t+120,i,r),R(t,i,r),R(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===t?")":", "+t+")")}}))},93934:function(t,n,e){function r(t){return function(){return t}}e.d(n,{Z:function(){return r}})},30017:function(t,n,e){function r(t,n){return t=+t,n=+n,function(e){return t*(1-e)+n*e}}e.d(n,{Z:function(){return r}})},54684:function(t,n,e){e.d(n,{ZP:function(){return c}});var r=e(85959);function i(t,n,e,r,i){var o=t*t,u=o*t;return((1-3*t+3*o-u)*n+(4-6*o+3*u)*e+(1+3*t+3*o-3*u)*r+u*i)/6}var o=e(93934);function u(t,n){return function(e){return t+e*n}}function a(t){return 1==(t=+t)?s:function(n,e){return e-n?function(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}(n,e,t):(0,o.Z)(isNaN(n)?e:n)}}function s(t,n){var e=n-t;return e?u(t,e):(0,o.Z)(isNaN(t)?n:t)}var c=function t(n){var e=a(n);function i(t,n){var i=e((t=(0,r.B8)(t)).r,(n=(0,r.B8)(n)).r),o=e(t.g,n.g),u=e(t.b,n.b),a=s(t.opacity,n.opacity);return function(n){return t.r=i(n),t.g=o(n),t.b=u(n),t.opacity=a(n),t+""}}return i.gamma=t,i}(1);function l(t){return function(n){var e,i,o=n.length,u=new Array(o),a=new Array(o),s=new Array(o);for(e=0;e<o;++e)i=(0,r.B8)(n[e]),u[e]=i.r||0,a[e]=i.g||0,s[e]=i.b||0;return u=t(u),a=t(a),s=t(s),i.opacity=1,function(t){return i.r=u(t),i.g=a(t),i.b=s(t),i+""}}}l((function(t){var n=t.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),o=t[r],u=t[r+1],a=r>0?t[r-1]:2*o-u,s=r<n-1?t[r+2]:2*u-o;return i((e-r/n)*n,a,o,u,s)}})),l((function(t){var n=t.length;return function(e){var r=Math.floor(((e%=1)<0?++e:e)*n),o=t[(r+n-1)%n],u=t[r%n],a=t[(r+1)%n],s=t[(r+2)%n];return i((e-r/n)*n,o,u,a,s)}}))},70906:function(t,n,e){e.d(n,{Z:function(){return u}});var r=e(30017),i=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,o=new RegExp(i.source,"g");function u(t,n){var e,u,a,s=i.lastIndex=o.lastIndex=0,c=-1,l=[],h=[];for(t+="",n+="";(e=i.exec(t))&&(u=o.exec(n));)(a=u.index)>s&&(a=n.slice(s,a),l[c]?l[c]+=a:l[++c]=a),(e=e[0])===(u=u[0])?l[c]?l[c]+=u:l[++c]=u:(l[++c]=null,h.push({i:c,x:(0,r.Z)(e,u)})),s=o.lastIndex;return s<n.length&&(a=n.slice(s),l[c]?l[c]+=a:l[++c]=a),l.length<2?h[0]?function(t){return function(n){return t(n)+""}}(h[0].x):function(t){return function(){return t}}(n):(n=h.length,function(t){for(var e,r=0;r<n;++r)l[(e=h[r]).i]=e.x(t);return l.join("")})}},35e3:function(t,n,e){e.d(n,{Z:function(){return a}});var r=e(60447),i=e(19030);function o(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===i.P&&n.documentElement.namespaceURI===i.P?n.createElement(t):n.createElementNS(e,t)}}function u(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function a(t){var n=(0,r.Z)(t);return(n.local?u:o)(n)}},40597:function(t,n,e){function r(t){return function(){return this.matches(t)}}e.d(n,{Z:function(){return r}})},60447:function(t,n,e){e.d(n,{Z:function(){return i}});var r=e(19030);function i(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),r.Z.hasOwnProperty(n)?{space:r.Z[n],local:t}:t}},19030:function(t,n,e){e.d(n,{P:function(){return r}});var r="http://www.w3.org/1999/xhtml";n.Z={svg:"http://www.w3.org/2000/svg",xhtml:r,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"}},5130:function(t,n,e){e.d(n,{Z:function(){return i}});var r=e(73078);function i(t){return"string"==typeof t?new r.Y1([[document.querySelector(t)]],[document.documentElement]):new r.Y1([[t]],r.Jz)}},73078:function(t,n,e){e.d(n,{Y1:function(){return F},ZP:function(){return K},Jz:function(){return X}});var r=e(86408);var i=e(43912);var o=e(40597);function u(t){return new Array(t.length)}function a(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}a.prototype={constructor:a,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function s(t,n,e,r,i,o){for(var u,s=0,c=n.length,l=o.length;s<l;++s)(u=n[s])?(u.__data__=o[s],r[s]=u):e[s]=new a(t,o[s]);for(;s<c;++s)(u=n[s])&&(i[s]=u)}function c(t,n,e,r,i,o,u){var s,c,l,h={},f=n.length,p=o.length,d=new Array(f);for(s=0;s<f;++s)(c=n[s])&&(d[s]=l="$"+u.call(c,c.__data__,s,n),l in h?i[s]=c:h[l]=c);for(s=0;s<p;++s)(c=h[l="$"+u.call(t,o[s],s,o)])?(r[s]=c,c.__data__=o[s],h[l]=null):e[s]=new a(t,o[s]);for(s=0;s<f;++s)(c=n[s])&&h[d[s]]===c&&(i[s]=c)}function l(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}var h=e(60447);function f(t){return function(){this.removeAttribute(t)}}function p(t){return function(){this.removeAttributeNS(t.space,t.local)}}function d(t,n){return function(){this.setAttribute(t,n)}}function g(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function y(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function m(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}var v=e(40721);function w(t){return function(){delete this[t]}}function _(t,n){return function(){this[t]=n}}function b(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function x(t){return t.trim().split(/^|\s+/)}function N(t){return t.classList||new k(t)}function k(t){this._node=t,this._names=x(t.getAttribute("class")||"")}function A(t,n){for(var e=N(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function M(t,n){for(var e=N(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function Z(t){return function(){A(this,t)}}function E(t){return function(){M(this,t)}}function S(t,n){return function(){(n.apply(this,arguments)?A:M)(this,t)}}function P(){this.textContent=""}function q(t){return function(){this.textContent=t}}function C(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function R(){this.innerHTML=""}function B(t){return function(){this.innerHTML=t}}function H(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function L(){this.nextSibling&&this.parentNode.appendChild(this)}function O(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}k.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var $=e(35e3);function D(){return null}function I(){var t=this.parentNode;t&&t.removeChild(this)}function j(){var t=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function z(){var t=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}var T=e(42274),U=e(58414);function V(t,n,e){var r=(0,U.Z)(t),i=r.CustomEvent;"function"==typeof i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function Y(t,n){return function(){return V(this,t,n)}}function J(t,n){return function(){return V(this,t,n.apply(this,arguments))}}var X=[null];function F(t,n){this._groups=t,this._parents=n}function G(){return new F([[document.documentElement]],X)}F.prototype=G.prototype={constructor:F,select:function(t){"function"!=typeof t&&(t=(0,r.Z)(t));for(var n=this._groups,e=n.length,i=new Array(e),o=0;o<e;++o)for(var u,a,s=n[o],c=s.length,l=i[o]=new Array(c),h=0;h<c;++h)(u=s[h])&&(a=t.call(u,u.__data__,h,s))&&("__data__"in u&&(a.__data__=u.__data__),l[h]=a);return new F(i,this._parents)},selectAll:function(t){"function"!=typeof t&&(t=(0,i.Z)(t));for(var n=this._groups,e=n.length,r=[],o=[],u=0;u<e;++u)for(var a,s=n[u],c=s.length,l=0;l<c;++l)(a=s[l])&&(r.push(t.call(a,a.__data__,l,s)),o.push(a));return new F(r,o)},filter:function(t){"function"!=typeof t&&(t=(0,o.Z)(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var u,a=n[i],s=a.length,c=r[i]=[],l=0;l<s;++l)(u=a[l])&&t.call(u,u.__data__,l,a)&&c.push(u);return new F(r,this._parents)},data:function(t,n){if(!t)return y=new Array(this.size()),f=-1,this.each((function(t){y[++f]=t})),y;var e,r=n?c:s,i=this._parents,o=this._groups;"function"!=typeof t&&(e=t,t=function(){return e});for(var u=o.length,a=new Array(u),l=new Array(u),h=new Array(u),f=0;f<u;++f){var p=i[f],d=o[f],g=d.length,y=t.call(p,p&&p.__data__,f,i),m=y.length,v=l[f]=new Array(m),w=a[f]=new Array(m);r(p,d,v,w,h[f]=new Array(g),y,n);for(var _,b,x=0,N=0;x<m;++x)if(_=v[x]){for(x>=N&&(N=x+1);!(b=w[N])&&++N<m;);_._next=b||null}}return(a=new F(a,i))._enter=l,a._exit=h,a},enter:function(){return new F(this._enter||this._groups.map(u),this._parents)},exit:function(){return new F(this._exit||this._groups.map(u),this._parents)},join:function(t,n,e){var r=this.enter(),i=this,o=this.exit();return r="function"==typeof t?t(r):r.append(t+""),null!=n&&(i=n(i)),null==e?o.remove():e(o),r&&i?r.merge(i).order():i},merge:function(t){for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),a=0;a<o;++a)for(var s,c=n[a],l=e[a],h=c.length,f=u[a]=new Array(h),p=0;p<h;++p)(s=c[p]||l[p])&&(f[p]=s);for(;a<r;++a)u[a]=n[a];return new F(u,this._parents)},order:function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,u=i[o];--o>=0;)(r=i[o])&&(u&&4^r.compareDocumentPosition(u)&&u.parentNode.insertBefore(r,u),u=r);return this},sort:function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=l);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var u,a=e[o],s=a.length,c=i[o]=new Array(s),h=0;h<s;++h)(u=a[h])&&(c[h]=u);c.sort(n)}return new F(i,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){var t=new Array(this.size()),n=-1;return this.each((function(){t[++n]=this})),t},node:function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var u=r[i];if(u)return u}return null},size:function(){var t=0;return this.each((function(){++t})),t},empty:function(){return!this.node()},each:function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],u=0,a=o.length;u<a;++u)(i=o[u])&&t.call(i,i.__data__,u,o);return this},attr:function(t,n){var e=(0,h.Z)(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((null==n?e.local?p:f:"function"==typeof n?e.local?m:y:e.local?g:d)(e,n))},style:v.Z,property:function(t,n){return arguments.length>1?this.each((null==n?w:"function"==typeof n?b:_)(t,n)):this.node()[t]},classed:function(t,n){var e=x(t+"");if(arguments.length<2){for(var r=N(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?S:n?Z:E)(e,n))},text:function(t){return arguments.length?this.each(null==t?P:("function"==typeof t?C:q)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?R:("function"==typeof t?H:B)(t)):this.node().innerHTML},raise:function(){return this.each(L)},lower:function(){return this.each(O)},append:function(t){var n="function"==typeof t?t:(0,$.Z)(t);return this.select((function(){return this.appendChild(n.apply(this,arguments))}))},insert:function(t,n){var e="function"==typeof t?t:(0,$.Z)(t),i=null==n?D:"function"==typeof n?n:(0,r.Z)(n);return this.select((function(){return this.insertBefore(e.apply(this,arguments),i.apply(this,arguments)||null)}))},remove:function(){return this.each(I)},clone:function(t){return this.select(t?z:j)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:T.ZP,dispatch:function(t,n){return this.each(("function"==typeof n?J:Y)(t,n))}};var K=G},42274:function(t,n,e){e.d(n,{B:function(){return i},ZP:function(){return l},_H:function(){return h}});var r={},i=null;"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(r={mouseenter:"mouseover",mouseleave:"mouseout"}));function o(t,n,e){return t=u(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function u(t,n,e){return function(r){var o=i;i=r;try{t.call(this,this.__data__,n,e)}finally{i=o}}}function a(t){return t.trim().split(/^|\s+/).map((function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}}))}function s(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function c(t,n,e){var i=r.hasOwnProperty(t.type)?o:u;return function(r,o,u){var a,s=this.__on,c=i(n,o,u);if(s)for(var l=0,h=s.length;l<h;++l)if((a=s[l]).type===t.type&&a.name===t.name)return this.removeEventListener(a.type,a.listener,a.capture),this.addEventListener(a.type,a.listener=c,a.capture=e),void(a.value=n);this.addEventListener(t.type,c,e),a={type:t.type,name:t.name,value:n,listener:c,capture:e},s?s.push(a):this.__on=[a]}}function l(t,n,e){var r,i,o=a(t+""),u=o.length;if(!(arguments.length<2)){for(l=n?c:s,null==e&&(e=!1),r=0;r<u;++r)this.each(l(o[r],n,e));return this}var l=this.node().__on;if(l)for(var h,f=0,p=l.length;f<p;++f)for(r=0,h=l[f];r<u;++r)if((i=o[r]).type===h.type&&i.name===h.name)return h.value}function h(t,n,e,r){var o=i;t.sourceEvent=i,i=t;try{return n.apply(e,r)}finally{i=o}}},40721:function(t,n,e){e.d(n,{Z:function(){return a},S:function(){return s}});var r=e(58414);function i(t){return function(){this.style.removeProperty(t)}}function o(t,n,e){return function(){this.style.setProperty(t,n,e)}}function u(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function a(t,n,e){return arguments.length>1?this.each((null==n?i:"function"==typeof n?u:o)(t,n,null==e?"":e)):s(this.node(),t)}function s(t,n){return t.style.getPropertyValue(n)||(0,r.Z)(t).getComputedStyle(t,null).getPropertyValue(n)}},86408:function(t,n,e){function r(){}function i(t){return null==t?r:function(){return this.querySelector(t)}}e.d(n,{Z:function(){return i}})},43912:function(t,n,e){function r(){return[]}function i(t){return null==t?r:function(){return this.querySelectorAll(t)}}e.d(n,{Z:function(){return i}})},58414:function(t,n,e){function r(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}e.d(n,{Z:function(){return r}})}}]);