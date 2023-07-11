/*
 *   shortcut key library
 *   mousetrap v1.5.3 craig.is/killing/mice
 * */
(function(C,r,g){function t(a,b,h){a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h)}function x(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return l[a.which]?l[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase()}function D(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||
    "meta"==a}function y(a,b){var h,c,e,g=[];h=a;"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));for(e=0;e<h.length;++e)c=h[e],z[c]&&(c=z[c]),b&&"keypress"!=b&&A[c]&&(c=A[c],g.push("shift")),u(c)&&g.push(c);h=c;e=b;if(!e){if(!k){k={};for(var m in l)95<m&&112>m||l.hasOwnProperty(m)&&(k[l[m]]=m)}e=k[h]?"keydown":"keypress"}"keypress"==e&&g.length&&(e="keydown");return{key:c,modifiers:g,action:e}}function B(a,b){return null===a||a===r?!1:a===b?!0:B(a.parentNode,b)}function c(a){function b(a){a=
    a||{};var b=!1,n;for(n in q)a[n]?b=!0:q[n]=0;b||(v=!1)}function h(a,b,n,f,c,h){var g,e,l=[],m=n.type;if(!d._callbacks[a])return[];"keyup"==m&&u(a)&&(b=[a]);for(g=0;g<d._callbacks[a].length;++g)if(e=d._callbacks[a][g],(f||!e.seq||q[e.seq]==e.level)&&m==e.action){var k;(k="keypress"==m&&!n.metaKey&&!n.ctrlKey)||(k=e.modifiers,k=b.sort().join(",")===k.sort().join(","));k&&(k=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||k)&&d._callbacks[a].splice(g,1),l.push(e))}return l}function g(a,b,n,f){d.stopCallback(b,
    b.target||b.srcElement,n,f)||!1!==a(b,n)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=x(a);b&&("keyup"==a.type&&w===b?w=!1:d.handleKey(b,D(a),a))}function l(a,c,n,f){function e(c){return function(){v=c;++q[a];clearTimeout(k);k=setTimeout(b,1E3)}}function h(c){g(n,c,a);"keyup"!==f&&(w=x(c));setTimeout(b,10)}for(var d=q[a]=0;d<c.length;++d){var p=d+1===c.length?h:e(f||
y(c[d+1]).action);m(c[d],p,f,a,d)}}function m(a,b,c,f,e){d._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var g=a.split(" ");1<g.length?l(a,g,b,c):(c=y(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}))}var d=this;a=a||r;if(!(d instanceof c))return new c(a);d.target=a;d._callbacks={};d._directMap={};var q={},k,w=!1,p=!1,v=!1;d._handleKey=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        c,e){var f=h(a,c,e),d;c={};var k=0,l=!1;for(d=0;d<f.length;++d)f[d].seq&&(k=Math.max(k,f[d].level));for(d=0;d<f.length;++d)f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);f="keypress"==e.type&&p;e.type!=v||u(a)||f||b(c);p=l&&"keydown"==e.type};d._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)m(a[d],b,c)};t(a,"keypress",e);t(a,"keydown",e);t(a,"keyup",e)}var l={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",
    20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},A={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},z={option:"alt",command:"meta","return":"enter",
    escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},k;for(g=1;20>g;++g)l[111+g]="f"+g;for(g=0;9>=g;++g)l[g+96]=g;c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};this._directMap=
{};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||B(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.init=function(){var a=c(r),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};c.init();C.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=
    c);"function"===typeof define&&define.amd&&define(function(){return c})})(window,document);
// End of mousetrap

/* spectrum color picker 1.7.1 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports&&"object"==typeof module?module.exports=a:a(jQuery)}(function(a,b){"use strict";function c(b,c,d,e){for(var f=[],g=0;g<b.length;g++){var h=b[g];if(h){var i=tinycolor(h),j=i.toHsl().l<.5?"sp-thumb-el sp-thumb-dark":"sp-thumb-el sp-thumb-light";j+=tinycolor.equals(c,h)?" sp-thumb-active":"";var k=i.toString(e.preferredFormat||"rgb"),l=q?"background-color:"+i.toRgbString():"filter:"+i.toFilter();f.push('<span title="'+k+'" data-color="'+i.toRgbString()+'" class="'+j+'"><span class="sp-thumb-inner" style="'+l+';" /></span>')}else{var m="sp-clear-display";f.push(a("<div />").append(a('<span data-color="" style="background-color:transparent;" class="'+m+'"></span>').attr("title",e.noColorSelectedText)).html())}}return"<div class='sp-cf "+d+"'>"+f.join("")+"</div>"}function d(){for(var a=0;a<o.length;a++)o[a]&&o[a].hide()}function e(b,c){var d=a.extend({},n,b);return d.callbacks={move:j(d.move,c),change:j(d.change,c),show:j(d.show,c),hide:j(d.hide,c),beforeShow:j(d.beforeShow,c)},d}function f(f,h){function j(){if(U.showPaletteOnly&&(U.showPalette=!0),Ma.text(U.showPaletteOnly?U.togglePaletteMoreText:U.togglePaletteLessText),U.palette){na=U.palette.slice(0),oa=a.isArray(na[0])?na:[na],pa={};for(var b=0;b<oa.length;b++)for(var c=0;c<oa[b].length;c++){var d=tinycolor(oa[b][c]).toRgbString();pa[d]=!0}}xa.toggleClass("sp-flat",V),xa.toggleClass("sp-input-disabled",!U.showInput),xa.toggleClass("sp-alpha-enabled",U.showAlpha),xa.toggleClass("sp-clear-enabled",Za),xa.toggleClass("sp-buttons-disabled",!U.showButtons),xa.toggleClass("sp-palette-buttons-disabled",!U.togglePaletteOnly),xa.toggleClass("sp-palette-disabled",!U.showPalette),xa.toggleClass("sp-palette-only",U.showPaletteOnly),xa.toggleClass("sp-initial-disabled",!U.showInitial),xa.addClass(U.className).addClass(U.containerClassName),O()}function n(){function b(b){return b.data&&b.data.ignore?(H(a(b.target).closest(".sp-thumb-el").data("color")),K()):(H(a(b.target).closest(".sp-thumb-el").data("color")),K(),N(!0),U.hideAfterPaletteSelect&&F()),!1}if(p&&xa.find("*:not(input)").attr("unselectable","on"),j(),Pa&&va.after(Qa).hide(),Za||Ka.hide(),V)va.after(xa).hide();else{var c="parent"===U.appendTo?va.parent():a(U.appendTo);1!==c.length&&(c=a("body")),c.append(xa)}t(),Ra.bind("click.spectrum touchstart.spectrum",function(b){wa||B(),b.stopPropagation(),a(b.target).is("input")||b.preventDefault()}),(va.is(":disabled")||U.disabled===!0)&&S(),xa.click(i),Ga.change(A),Ga.bind("paste",function(){setTimeout(A,1)}),Ga.keydown(function(a){13==a.keyCode&&A()}),Ja.text(U.cancelText),Ja.bind("click.spectrum",function(a){a.stopPropagation(),a.preventDefault(),G(),F()}),Ka.attr("title",U.clearText),Ka.bind("click.spectrum",function(a){a.stopPropagation(),a.preventDefault(),Ya=!0,K(),V&&N(!0)}),La.text(U.chooseText),La.bind("click.spectrum",function(a){a.stopPropagation(),a.preventDefault(),p&&Ga.is(":focus")&&Ga.trigger("change"),J()&&(N(!0),F())}),Ma.text(U.showPaletteOnly?U.togglePaletteMoreText:U.togglePaletteLessText),Ma.bind("click.spectrum",function(a){a.stopPropagation(),a.preventDefault(),U.showPaletteOnly=!U.showPaletteOnly,U.showPaletteOnly||V||xa.css("left","-="+(ya.outerWidth(!0)+5)),j()}),k(Ea,function(a,b,c){ma=a/ga,Ya=!1,c.shiftKey&&(ma=Math.round(10*ma)/10),K()},y,z),k(Ba,function(a,b){ja=parseFloat(b/ea),Ya=!1,U.showAlpha||(ma=1),K()},y,z),k(za,function(a,b,c){if(c.shiftKey){if(!ta){var d=ka*ba,e=ca-la*ca,f=Math.abs(a-d)>Math.abs(b-e);ta=f?"x":"y"}}else ta=null;var g=!ta||"x"===ta,h=!ta||"y"===ta;g&&(ka=parseFloat(a/ba)),h&&(la=parseFloat((ca-b)/ca)),Ya=!1,U.showAlpha||(ma=1),K()},y,z),Ta?(H(Ta),L(),Wa=Va||tinycolor(Ta).format,u(Ta)):L(),V&&C();var d=p?"mousedown.spectrum":"click.spectrum touchstart.spectrum";Ha.delegate(".sp-thumb-el",d,b),Ia.delegate(".sp-thumb-el:nth-child(1)",d,{ignore:!0},b)}function t(){if(X&&window.localStorage){try{var b=window.localStorage[X].split(",#");b.length>1&&(delete window.localStorage[X],a.each(b,function(a,b){u(b)}))}catch(c){}try{qa=window.localStorage[X].split(";")}catch(c){}}}function u(b){if(W){var c=tinycolor(b).toRgbString();if(!pa[c]&&-1===a.inArray(c,qa))for(qa.push(c);qa.length>ra;)qa.shift();if(X&&window.localStorage)try{window.localStorage[X]=qa.join(";")}catch(d){}}}function v(){var a=[];if(U.showPalette)for(var b=0;b<qa.length;b++){var c=tinycolor(qa[b]).toRgbString();pa[c]||a.push(qa[b])}return a.reverse().slice(0,U.maxSelectionSize)}function w(){var b=I(),d=a.map(oa,function(a,d){return c(a,b,"sp-palette-row sp-palette-row-"+d,U)});t(),qa&&d.push(c(v(),b,"sp-palette-row sp-palette-row-selection",U)),Ha.html(d.join(""))}function x(){if(U.showInitial){var a=Ua,b=I();Ia.html(c([a,b],b,"sp-palette-row-initial",U))}}function y(){(0>=ca||0>=ba||0>=ea)&&O(),aa=!0,xa.addClass(sa),ta=null,va.trigger("dragstart.spectrum",[I()])}function z(){aa=!1,xa.removeClass(sa),va.trigger("dragstop.spectrum",[I()])}function A(){var a=Ga.val();if(null!==a&&""!==a||!Za){var b=tinycolor(a);b.isValid()?(H(b),N(!0)):Ga.addClass("sp-validation-error")}else H(null),N(!0)}function B(){_?F():C()}function C(){var b=a.Event("beforeShow.spectrum");return _?void O():(va.trigger(b,[I()]),void(Z.beforeShow(I())===!1||b.isDefaultPrevented()||(d(),_=!0,a(ua).bind("keydown.spectrum",D),a(ua).bind("click.spectrum",E),a(window).bind("resize.spectrum",$),Qa.addClass("sp-active"),xa.removeClass("sp-hidden"),O(),L(),Ua=I(),x(),Z.show(Ua),va.trigger("show.spectrum",[Ua]))))}function D(a){27===a.keyCode&&F()}function E(a){2!=a.button&&(aa||(Xa?N(!0):G(),F()))}function F(){_&&!V&&(_=!1,a(ua).unbind("keydown.spectrum",D),a(ua).unbind("click.spectrum",E),a(window).unbind("resize.spectrum",$),Qa.removeClass("sp-active"),xa.addClass("sp-hidden"),Z.hide(I()),va.trigger("hide.spectrum",[I()]))}function G(){H(Ua,!0)}function H(a,b){if(tinycolor.equals(a,I()))return void L();var c,d;!a&&Za?Ya=!0:(Ya=!1,c=tinycolor(a),d=c.toHsv(),ja=d.h%360/360,ka=d.s,la=d.v,ma=d.a),L(),c&&c.isValid()&&!b&&(Wa=Va||c.getFormat())}function I(a){return a=a||{},Za&&Ya?null:tinycolor.fromRatio({h:ja,s:ka,v:la,a:Math.round(100*ma)/100},{format:a.format||Wa})}function J(){return!Ga.hasClass("sp-validation-error")}function K(){L(),Z.move(I()),va.trigger("move.spectrum",[I()])}function L(){Ga.removeClass("sp-validation-error"),M();var a=tinycolor.fromRatio({h:ja,s:1,v:1});za.css("background-color",a.toHexString());var b=Wa;1>ma&&(0!==ma||"name"!==b)&&("hex"===b||"hex3"===b||"hex6"===b||"name"===b)&&(b="rgb");var c=I({format:b}),d="";if(Sa.removeClass("sp-clear-display"),Sa.css("background-color","transparent"),!c&&Za)Sa.addClass("sp-clear-display");else{var e=c.toHexString(),f=c.toRgbString();if(q||1===c.alpha?Sa.css("background-color",f):(Sa.css("background-color","transparent"),Sa.css("filter",c.toFilter())),U.showAlpha){var g=c.toRgb();g.a=0;var h=tinycolor(g).toRgbString(),i="linear-gradient(left, "+h+", "+e+")";p?Da.css("filter",tinycolor(h).toFilter({gradientType:1},e)):(Da.css("background","-webkit-"+i),Da.css("background","-moz-"+i),Da.css("background","-ms-"+i),Da.css("background","linear-gradient(to right, "+h+", "+e+")"))}d=c.toString(b)}U.showInput&&Ga.val(d),U.showPalette&&w(),x()}function M(){var a=ka,b=la;if(Za&&Ya)Fa.hide(),Ca.hide(),Aa.hide();else{Fa.show(),Ca.show(),Aa.show();var c=a*ba,d=ca-b*ca;c=Math.max(-da,Math.min(ba-da,c-da)),d=Math.max(-da,Math.min(ca-da,d-da)),Aa.css({top:d+"px",left:c+"px"});var e=ma*ga;Fa.css({left:e-ha/2+"px"});var f=ja*ea;Ca.css({top:f-ia+"px"})}}function N(a){var b=I(),c="",d=!tinycolor.equals(b,Ua);b&&(c=b.toString(Wa),u(b)),Na&&va.val(c),a&&d&&(Z.change(b),va.trigger("change",[b]))}function O(){ba=za.width(),ca=za.height(),da=Aa.height(),fa=Ba.width(),ea=Ba.height(),ia=Ca.height(),ga=Ea.width(),ha=Fa.width(),V||(xa.css("position","absolute"),U.offset?xa.offset(U.offset):xa.offset(g(xa,Ra))),M(),U.showPalette&&w(),va.trigger("reflow.spectrum")}function P(){va.show(),Ra.unbind("click.spectrum touchstart.spectrum"),xa.remove(),Qa.remove(),o[$a.id]=null}function Q(c,d){return c===b?a.extend({},U):d===b?U[c]:(U[c]=d,void j())}function R(){wa=!1,va.attr("disabled",!1),Ra.removeClass("sp-disabled")}function S(){F(),wa=!0,va.attr("disabled",!0),Ra.addClass("sp-disabled")}function T(a){U.offset=a,O()}var U=e(h,f),V=U.flat,W=U.showSelectionPalette,X=U.localStorageKey,Y=U.theme,Z=U.callbacks,$=l(O,10),_=!1,aa=!1,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=1,na=[],oa=[],pa={},qa=U.selectionPalette.slice(0),ra=U.maxSelectionSize,sa="sp-dragging",ta=null,ua=f.ownerDocument,va=(ua.body,a(f)),wa=!1,xa=a(s,ua).addClass(Y),ya=xa.find(".sp-picker-container"),za=xa.find(".sp-color"),Aa=xa.find(".sp-dragger"),Ba=xa.find(".sp-hue"),Ca=xa.find(".sp-slider"),Da=xa.find(".sp-alpha-inner"),Ea=xa.find(".sp-alpha"),Fa=xa.find(".sp-alpha-handle"),Ga=xa.find(".sp-input"),Ha=xa.find(".sp-palette"),Ia=xa.find(".sp-initial"),Ja=xa.find(".sp-cancel"),Ka=xa.find(".sp-clear"),La=xa.find(".sp-choose"),Ma=xa.find(".sp-palette-toggle"),Na=va.is("input"),Oa=Na&&"color"===va.attr("type")&&m(),Pa=Na&&!V,Qa=Pa?a(r).addClass(Y).addClass(U.className).addClass(U.replacerClassName):a([]),Ra=Pa?Qa:va,Sa=Qa.find(".sp-preview-inner"),Ta=U.color||Na&&va.val(),Ua=!1,Va=U.preferredFormat,Wa=Va,Xa=!U.showButtons||U.clickoutFiresChange,Ya=!Ta,Za=U.allowEmpty&&!Oa;n();var $a={show:C,hide:F,toggle:B,reflow:O,option:Q,enable:R,disable:S,offset:T,set:function(a){H(a),N()},get:I,destroy:P,container:xa};return $a.id=o.push($a)-1,$a}function g(b,c){var d=0,e=b.outerWidth(),f=b.outerHeight(),g=c.outerHeight(),h=b[0].ownerDocument,i=h.documentElement,j=i.clientWidth+a(h).scrollLeft(),k=i.clientHeight+a(h).scrollTop(),l=c.offset();return l.top+=g,l.left-=Math.min(l.left,l.left+e>j&&j>e?Math.abs(l.left+e-j):0),l.top-=Math.min(l.top,l.top+f>k&&k>f?Math.abs(f+g-d):d),l}function h(){}function i(a){a.stopPropagation()}function j(a,b){var c=Array.prototype.slice,d=c.call(arguments,2);return function(){return a.apply(b,d.concat(c.call(arguments)))}}function k(b,c,d,e){function f(a){a.stopPropagation&&a.stopPropagation(),a.preventDefault&&a.preventDefault(),a.returnValue=!1}function g(a){if(k){if(p&&j.documentMode<9&&!a.button)return i();var d=a.originalEvent&&a.originalEvent.touches&&a.originalEvent.touches[0],e=d&&d.pageX||a.pageX,g=d&&d.pageY||a.pageY,h=Math.max(0,Math.min(e-l.left,n)),q=Math.max(0,Math.min(g-l.top,m));o&&f(a),c.apply(b,[h,q,a])}}function h(c){var e=c.which?3==c.which:2==c.button;e||k||d.apply(b,arguments)!==!1&&(k=!0,m=a(b).height(),n=a(b).width(),l=a(b).offset(),a(j).bind(q),a(j.body).addClass("sp-dragging"),g(c),f(c))}function i(){k&&(a(j).unbind(q),a(j.body).removeClass("sp-dragging"),setTimeout(function(){e.apply(b,arguments)},0)),k=!1}c=c||function(){},d=d||function(){},e=e||function(){};var j=document,k=!1,l={},m=0,n=0,o="ontouchstart"in window,q={};q.selectstart=f,q.dragstart=f,q["touchmove mousemove"]=g,q["touchend mouseup"]=i,a(b).bind("touchstart mousedown",h)}function l(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,a.apply(e,f)};c&&clearTimeout(d),(c||!d)&&(d=setTimeout(g,b))}}function m(){return a.fn.spectrum.inputTypeColorSupport()}var n={beforeShow:h,move:h,change:h,show:h,hide:h,color:!1,flat:!1,showInput:!1,allowEmpty:!1,showButtons:!0,clickoutFiresChange:!0,showInitial:!1,showPalette:!1,showPaletteOnly:!1,hideAfterPaletteSelect:!1,togglePaletteOnly:!1,showSelectionPalette:!0,localStorageKey:!1,appendTo:"body",maxSelectionSize:7,cancelText:"cancel",chooseText:"choose",togglePaletteMoreText:"more",togglePaletteLessText:"less",clearText:"Clear Color Selection",noColorSelectedText:"No Color Selected",preferredFormat:!1,className:"",containerClassName:"",replacerClassName:"",showAlpha:!1,theme:"sp-light",palette:[["#ffffff","#000000","#ff0000","#ff8000","#ffff00","#008000","#0000ff","#4b0082","#9400d3"]],selectionPalette:[],disabled:!1,offset:null},o=[],p=!!/msie/i.exec(window.navigator.userAgent),q=function(){function a(a,b){return!!~(""+a).indexOf(b)}var b=document.createElement("div"),c=b.style;return c.cssText="background-color:rgba(0,0,0,.5)",a(c.backgroundColor,"rgba")||a(c.backgroundColor,"hsla")}(),r=["<div class='sp-replacer'>","<div class='sp-preview'><div class='sp-preview-inner'></div></div>","<div class='sp-dd'>&#9660;</div>","</div>"].join(""),s=function(){var a="";if(p)for(var b=1;6>=b;b++)a+="<div class='sp-"+b+"'></div>";return["<div class='sp-container sp-hidden'>","<div class='sp-palette-container'>","<div class='sp-palette sp-thumb sp-cf'></div>","<div class='sp-palette-button-container sp-cf'>","<button type='button' class='sp-palette-toggle'></button>","</div>","</div>","<div class='sp-picker-container'>","<div class='sp-top sp-cf'>","<div class='sp-fill'></div>","<div class='sp-top-inner'>","<div class='sp-color'>","<div class='sp-sat'>","<div class='sp-val'>","<div class='sp-dragger'></div>","</div>","</div>","</div>","<div class='sp-clear sp-clear-display'>","</div>","<div class='sp-hue'>","<div class='sp-slider'></div>",a,"</div>","</div>","<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>","</div>","<div class='sp-input-container sp-cf'>","<input class='sp-input' type='text' spellcheck='false'  />","</div>","<div class='sp-initial sp-thumb sp-cf'></div>","<div class='sp-button-container sp-cf'>","<a class='sp-cancel' href='#'></a>","<button type='button' class='sp-choose'></button>","</div>","</div>","</div>"].join("")}(),t="spectrum.id";a.fn.spectrum=function(b,c){if("string"==typeof b){var d=this,e=Array.prototype.slice.call(arguments,1);return this.each(function(){var c=o[a(this).data(t)];if(c){var f=c[b];if(!f)throw new Error("Spectrum: no such method: '"+b+"'");"get"==b?d=c.get():"container"==b?d=c.container:"option"==b?d=c.option.apply(c,e):"destroy"==b?(c.destroy(),a(this).removeData(t)):f.apply(c,e)}}),d}return this.spectrum("destroy").each(function(){var c=a.extend({},b,a(this).data()),d=f(this,c);a(this).data(t,d.id)})},a.fn.spectrum.load=!0,a.fn.spectrum.loadOpts={},a.fn.spectrum.draggable=k,a.fn.spectrum.defaults=n,a.fn.spectrum.inputTypeColorSupport=function u(){if("undefined"==typeof u._cachedResult){var b=a("<input type='color'/>")[0];u._cachedResult="color"===b.type&&""!==b.value}return u._cachedResult},a.spectrum={},a.spectrum.localization={},a.spectrum.palettes={},a.fn.spectrum.processNativeColorInputs=function(){var b=a("input[type=color]");b.length&&!m()&&b.spectrum({preferredFormat:"hex6"})},function(){function a(a){var c={r:0,g:0,b:0},e=1,g=!1,h=!1;return"string"==typeof a&&(a=G(a)),"object"==typeof a&&(a.hasOwnProperty("r")&&a.hasOwnProperty("g")&&a.hasOwnProperty("b")?(c=b(a.r,a.g,a.b),g=!0,h="%"===String(a.r).substr(-1)?"prgb":"rgb"):a.hasOwnProperty("h")&&a.hasOwnProperty("s")&&a.hasOwnProperty("v")?(a.s=D(a.s),a.v=D(a.v),c=f(a.h,a.s,a.v),g=!0,h="hsv"):a.hasOwnProperty("h")&&a.hasOwnProperty("s")&&a.hasOwnProperty("l")&&(a.s=D(a.s),a.l=D(a.l),c=d(a.h,a.s,a.l),g=!0,h="hsl"),a.hasOwnProperty("a")&&(e=a.a)),e=w(e),{ok:g,format:a.format||h,r:M(255,N(c.r,0)),g:M(255,N(c.g,0)),b:M(255,N(c.b,0)),a:e}}function b(a,b,c){return{r:255*x(a,255),g:255*x(b,255),b:255*x(c,255)}}function c(a,b,c){a=x(a,255),b=x(b,255),c=x(c,255);var d,e,f=N(a,b,c),g=M(a,b,c),h=(f+g)/2;if(f==g)d=e=0;else{var i=f-g;switch(e=h>.5?i/(2-f-g):i/(f+g),f){case a:d=(b-c)/i+(c>b?6:0);break;case b:d=(c-a)/i+2;break;case c:d=(a-b)/i+4}d/=6}return{h:d,s:e,l:h}}function d(a,b,c){function d(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+(b-a)*(2/3-c)*6:a}var e,f,g;if(a=x(a,360),b=x(b,100),c=x(c,100),0===b)e=f=g=c;else{var h=.5>c?c*(1+b):c+b-c*b,i=2*c-h;e=d(i,h,a+1/3),f=d(i,h,a),g=d(i,h,a-1/3)}return{r:255*e,g:255*f,b:255*g}}function e(a,b,c){a=x(a,255),b=x(b,255),c=x(c,255);var d,e,f=N(a,b,c),g=M(a,b,c),h=f,i=f-g;if(e=0===f?0:i/f,f==g)d=0;else{switch(f){case a:d=(b-c)/i+(c>b?6:0);break;case b:d=(c-a)/i+2;break;case c:d=(a-b)/i+4}d/=6}return{h:d,s:e,v:h}}function f(a,b,c){a=6*x(a,360),b=x(b,100),c=x(c,100);var d=K.floor(a),e=a-d,f=c*(1-b),g=c*(1-e*b),h=c*(1-(1-e)*b),i=d%6,j=[c,g,f,f,h,c][i],k=[h,c,c,g,f,f][i],l=[f,f,h,c,c,g][i];return{r:255*j,g:255*k,b:255*l}}function g(a,b,c,d){var e=[C(L(a).toString(16)),C(L(b).toString(16)),C(L(c).toString(16))];return d&&e[0].charAt(0)==e[0].charAt(1)&&e[1].charAt(0)==e[1].charAt(1)&&e[2].charAt(0)==e[2].charAt(1)?e[0].charAt(0)+e[1].charAt(0)+e[2].charAt(0):e.join("")}function h(a,b,c,d){var e=[C(E(d)),C(L(a).toString(16)),C(L(b).toString(16)),C(L(c).toString(16))];return e.join("")}function i(a,b){b=0===b?0:b||10;var c=P(a).toHsl();return c.s-=b/100,c.s=y(c.s),P(c)}function j(a,b){b=0===b?0:b||10;var c=P(a).toHsl();return c.s+=b/100,c.s=y(c.s),P(c)}function k(a){return P(a).desaturate(100)}function l(a,b){b=0===b?0:b||10;var c=P(a).toHsl();return c.l+=b/100,c.l=y(c.l),P(c)}function m(a,b){b=0===b?0:b||10;var c=P(a).toRgb();return c.r=N(0,M(255,c.r-L(255*-(b/100)))),c.g=N(0,M(255,c.g-L(255*-(b/100)))),c.b=N(0,M(255,c.b-L(255*-(b/100)))),P(c)}function n(a,b){b=0===b?0:b||10;var c=P(a).toHsl();return c.l-=b/100,c.l=y(c.l),P(c)}function o(a,b){var c=P(a).toHsl(),d=(L(c.h)+b)%360;return c.h=0>d?360+d:d,P(c)}function p(a){var b=P(a).toHsl();return b.h=(b.h+180)%360,P(b)}function q(a){var b=P(a).toHsl(),c=b.h;return[P(a),P({h:(c+120)%360,s:b.s,l:b.l}),P({h:(c+240)%360,s:b.s,l:b.l})]}function r(a){var b=P(a).toHsl(),c=b.h;return[P(a),P({h:(c+90)%360,s:b.s,l:b.l}),P({h:(c+180)%360,s:b.s,l:b.l}),P({h:(c+270)%360,s:b.s,l:b.l})]}function s(a){var b=P(a).toHsl(),c=b.h;return[P(a),P({h:(c+72)%360,s:b.s,l:b.l}),P({h:(c+216)%360,s:b.s,l:b.l})]}function t(a,b,c){b=b||6,c=c||30;var d=P(a).toHsl(),e=360/c,f=[P(a)];for(d.h=(d.h-(e*b>>1)+720)%360;--b;)d.h=(d.h+e)%360,f.push(P(d));return f}function u(a,b){b=b||6;for(var c=P(a).toHsv(),d=c.h,e=c.s,f=c.v,g=[],h=1/b;b--;)g.push(P({h:d,s:e,v:f})),f=(f+h)%1;return g}function v(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[a[c]]=c);return b}function w(a){return a=parseFloat(a),(isNaN(a)||0>a||a>1)&&(a=1),a}function x(a,b){A(a)&&(a="100%");var c=B(a);return a=M(b,N(0,parseFloat(a))),c&&(a=parseInt(a*b,10)/100),K.abs(a-b)<1e-6?1:a%b/parseFloat(b)}function y(a){return M(1,N(0,a))}function z(a){return parseInt(a,16)}function A(a){return"string"==typeof a&&-1!=a.indexOf(".")&&1===parseFloat(a)}function B(a){return"string"==typeof a&&-1!=a.indexOf("%")}function C(a){return 1==a.length?"0"+a:""+a}function D(a){return 1>=a&&(a=100*a+"%"),a}function E(a){return Math.round(255*parseFloat(a)).toString(16)}function F(a){return z(a)/255}function G(a){a=a.replace(H,"").replace(I,"").toLowerCase();var b=!1;if(Q[a])a=Q[a],b=!0;else if("transparent"==a)return{r:0,g:0,b:0,a:0,format:"name"};var c;return(c=S.rgb.exec(a))?{r:c[1],g:c[2],b:c[3]}:(c=S.rgba.exec(a))?{r:c[1],g:c[2],b:c[3],a:c[4]}:(c=S.hsl.exec(a))?{h:c[1],s:c[2],l:c[3]}:(c=S.hsla.exec(a))?{h:c[1],s:c[2],l:c[3],a:c[4]}:(c=S.hsv.exec(a))?{h:c[1],s:c[2],v:c[3]}:(c=S.hsva.exec(a))?{h:c[1],s:c[2],v:c[3],a:c[4]}:(c=S.hex8.exec(a))?{a:F(c[1]),r:z(c[2]),g:z(c[3]),b:z(c[4]),format:b?"name":"hex8"}:(c=S.hex6.exec(a))?{r:z(c[1]),g:z(c[2]),b:z(c[3]),format:b?"name":"hex"}:(c=S.hex3.exec(a))?{r:z(c[1]+""+c[1]),g:z(c[2]+""+c[2]),b:z(c[3]+""+c[3]),format:b?"name":"hex"}:!1}var H=/^[\s,#]+/,I=/\s+$/,J=0,K=Math,L=K.round,M=K.min,N=K.max,O=K.random,P=function(b,c){if(b=b?b:"",c=c||{},b instanceof P)return b;if(!(this instanceof P))return new P(b,c);var d=a(b);this._originalInput=b,this._r=d.r,this._g=d.g,this._b=d.b,this._a=d.a,this._roundA=L(100*this._a)/100,this._format=c.format||d.format,this._gradientType=c.gradientType,this._r<1&&(this._r=L(this._r)),this._g<1&&(this._g=L(this._g)),this._b<1&&(this._b=L(this._b)),this._ok=d.ok,this._tc_id=J++};P.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var a=this.toRgb();return(299*a.r+587*a.g+114*a.b)/1e3},setAlpha:function(a){return this._a=w(a),this._roundA=L(100*this._a)/100,this},toHsv:function(){var a=e(this._r,this._g,this._b);return{h:360*a.h,s:a.s,v:a.v,a:this._a}},toHsvString:function(){var a=e(this._r,this._g,this._b),b=L(360*a.h),c=L(100*a.s),d=L(100*a.v);return 1==this._a?"hsv("+b+", "+c+"%, "+d+"%)":"hsva("+b+", "+c+"%, "+d+"%, "+this._roundA+")"},toHsl:function(){var a=c(this._r,this._g,this._b);return{h:360*a.h,s:a.s,l:a.l,a:this._a}},toHslString:function(){var a=c(this._r,this._g,this._b),b=L(360*a.h),d=L(100*a.s),e=L(100*a.l);return 1==this._a?"hsl("+b+", "+d+"%, "+e+"%)":"hsla("+b+", "+d+"%, "+e+"%, "+this._roundA+")"},toHex:function(a){return g(this._r,this._g,this._b,a)},toHexString:function(a){return"#"+this.toHex(a)},toHex8:function(){return h(this._r,this._g,this._b,this._a)},toHex8String:function(){return"#"+this.toHex8()},toRgb:function(){return{r:L(this._r),g:L(this._g),b:L(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+L(this._r)+", "+L(this._g)+", "+L(this._b)+")":"rgba("+L(this._r)+", "+L(this._g)+", "+L(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:L(100*x(this._r,255))+"%",g:L(100*x(this._g,255))+"%",b:L(100*x(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+L(100*x(this._r,255))+"%, "+L(100*x(this._g,255))+"%, "+L(100*x(this._b,255))+"%)":"rgba("+L(100*x(this._r,255))+"%, "+L(100*x(this._g,255))+"%, "+L(100*x(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":this._a<1?!1:R[g(this._r,this._g,this._b,!0)]||!1},toFilter:function(a){var b="#"+h(this._r,this._g,this._b,this._a),c=b,d=this._gradientType?"GradientType = 1, ":"";if(a){var e=P(a);c=e.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+d+"startColorstr="+b+",endColorstr="+c+")"},toString:function(a){var b=!!a;a=a||this._format;var c=!1,d=this._a<1&&this._a>=0,e=!b&&d&&("hex"===a||"hex6"===a||"hex3"===a||"name"===a);return e?"name"===a&&0===this._a?this.toName():this.toRgbString():("rgb"===a&&(c=this.toRgbString()),"prgb"===a&&(c=this.toPercentageRgbString()),("hex"===a||"hex6"===a)&&(c=this.toHexString()),"hex3"===a&&(c=this.toHexString(!0)),"hex8"===a&&(c=this.toHex8String()),"name"===a&&(c=this.toName()),"hsl"===a&&(c=this.toHslString()),"hsv"===a&&(c=this.toHsvString()),c||this.toHexString())},_applyModification:function(a,b){var c=a.apply(null,[this].concat([].slice.call(b)));return this._r=c._r,this._g=c._g,this._b=c._b,this.setAlpha(c._a),this},lighten:function(){return this._applyModification(l,arguments)},brighten:function(){return this._applyModification(m,arguments)},darken:function(){return this._applyModification(n,arguments)},desaturate:function(){return this._applyModification(i,arguments)},saturate:function(){return this._applyModification(j,arguments)},greyscale:function(){return this._applyModification(k,arguments)},spin:function(){return this._applyModification(o,arguments)},_applyCombination:function(a,b){return a.apply(null,[this].concat([].slice.call(b)))},analogous:function(){return this._applyCombination(t,arguments)},complement:function(){return this._applyCombination(p,arguments)},monochromatic:function(){return this._applyCombination(u,arguments)},splitcomplement:function(){return this._applyCombination(s,arguments)},triad:function(){return this._applyCombination(q,arguments)},tetrad:function(){return this._applyCombination(r,arguments)}},P.fromRatio=function(a,b){if("object"==typeof a){var c={};for(var d in a)a.hasOwnProperty(d)&&("a"===d?c[d]=a[d]:c[d]=D(a[d]));a=c}return P(a,b)},P.equals=function(a,b){return a&&b?P(a).toRgbString()==P(b).toRgbString():!1},P.random=function(){return P.fromRatio({r:O(),g:O(),b:O()})},P.mix=function(a,b,c){c=0===c?0:c||50;var d,e=P(a).toRgb(),f=P(b).toRgb(),g=c/100,h=2*g-1,i=f.a-e.a;d=h*i==-1?h:(h+i)/(1+h*i),d=(d+1)/2;var j=1-d,k={r:f.r*d+e.r*j,g:f.g*d+e.g*j,b:f.b*d+e.b*j,a:f.a*g+e.a*(1-g)};return P(k)},P.readability=function(a,b){var c=P(a),d=P(b),e=c.toRgb(),f=d.toRgb(),g=c.getBrightness(),h=d.getBrightness(),i=Math.max(e.r,f.r)-Math.min(e.r,f.r)+Math.max(e.g,f.g)-Math.min(e.g,f.g)+Math.max(e.b,f.b)-Math.min(e.b,f.b);return{brightness:Math.abs(g-h),color:i}},P.isReadable=function(a,b){var c=P.readability(a,b);return c.brightness>125&&c.color>500},P.mostReadable=function(a,b){for(var c=null,d=0,e=!1,f=0;f<b.length;f++){var g=P.readability(a,b[f]),h=g.brightness>125&&g.color>500,i=3*(g.brightness/125)+g.color/500;(h&&!e||h&&e&&i>d||!h&&!e&&i>d)&&(e=h,d=i,c=P(b[f]))}return c};var Q=P.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},R=P.hexNames=v(Q),S=function(){var a="[-\\+]?\\d+%?",b="[-\\+]?\\d*\\.\\d+%?",c="(?:"+b+")|(?:"+a+")",d="[\\s|\\(]+("+c+")[,|\\s]+("+c+")[,|\\s]+("+c+")\\s*\\)?",e="[\\s|\\(]+("+c+")[,|\\s]+("+c+")[,|\\s]+("+c+")[,|\\s]+("+c+")\\s*\\)?";return{rgb:new RegExp("rgb"+d),rgba:new RegExp("rgba"+e),hsl:new RegExp("hsl"+d),hsla:new RegExp("hsla"+e),hsv:new RegExp("hsv"+d),hsva:new RegExp("hsva"+e),hex3:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();window.tinycolor=P}(),a(function(){a.fn.spectrum.load&&a.fn.spectrum.processNativeColorInputs()})});
/* end of spectrum */

/*! nouislider - 8.0.2 - 2015-07-06 13:22:09 */
!function(a){if("function"==typeof define&&define.amd)define([],a);else if("object"==typeof exports){var b=require("fs");module.exports=a(),module.exports.css=function(){return b.readFileSync(__dirname+"/nouislider.min.css","utf8")}}else window.noUiSlider=a()}(function(){"use strict";function a(a){return a.filter(function(a){return this[a]?!1:this[a]=!0},{})}function b(a,b){return Math.round(a/b)*b}function c(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.defaultView||c.parentWindow,e=c.documentElement,f=d.pageXOffset;return/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(f=0),{top:b.top+d.pageYOffset-e.clientTop,left:b.left+f-e.clientLeft}}function d(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function e(a){var b=Math.pow(10,7);return Number((Math.round(a*b)/b).toFixed(7))}function f(a,b,c){j(a,b),setTimeout(function(){k(a,b)},c)}function g(a){return Math.max(Math.min(a,100),0)}function h(a){return Array.isArray(a)?a:[a]}function i(a){var b=a.split(".");return b.length>1?b[1].length:0}function j(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function k(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function l(a,b){a.classList?a.classList.contains(b):new RegExp("(^| )"+b+"( |$)","gi").test(a.className)}function m(a,b){return 100/(b-a)}function n(a,b){return 100*b/(a[1]-a[0])}function o(a,b){return n(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function p(a,b){return b*(a[1]-a[0])/100+a[0]}function q(a,b){for(var c=1;a>=b[c];)c+=1;return c}function r(a,b,c){if(c>=a.slice(-1)[0])return 100;var d,e,f,g,h=q(c,a);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],f+o([d,e],c)/m(f,g)}function s(a,b,c){if(c>=100)return a.slice(-1)[0];var d,e,f,g,h=q(c,b);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],p([d,e],(c-f)*m(f,g))}function t(a,c,d,e){if(100===e)return e;var f,g,h=q(e,a);return d?(f=a[h-1],g=a[h],e-f>(g-f)/2?g:f):c[h-1]?a[h-1]+b(e-a[h-1],c[h-1]):e}function u(a,b,c){var e;if("number"==typeof b&&(b=[b]),"[object Array]"!==Object.prototype.toString.call(b))throw new Error("noUiSlider: 'range' contains invalid value.");if(e="min"===a?0:"max"===a?100:parseFloat(a),!d(e)||!d(b[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");c.xPct.push(e),c.xVal.push(b[0]),e?c.xSteps.push(isNaN(b[1])?!1:b[1]):isNaN(b[1])||(c.xSteps[0]=b[1])}function v(a,b,c){return b?void(c.xSteps[a]=n([c.xVal[a],c.xVal[a+1]],b)/m(c.xPct[a],c.xPct[a+1])):!0}function w(a,b,c,d){this.xPct=[],this.xVal=[],this.xSteps=[d||!1],this.xNumSteps=[!1],this.snap=b,this.direction=c;var e,f=[];for(e in a)a.hasOwnProperty(e)&&f.push([a[e],e]);for(f.sort(function(a,b){return a[0]-b[0]}),e=0;e<f.length;e++)u(f[e][1],f[e][0],this);for(this.xNumSteps=this.xSteps.slice(0),e=0;e<this.xNumSteps.length;e++)v(e,this.xNumSteps[e],this)}function x(a,b){if(!d(b))throw new Error("noUiSlider: 'step' is not numeric.");a.singleStep=b}function y(a,b){if("object"!=typeof b||Array.isArray(b))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===b.min||void 0===b.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");a.spectrum=new w(b,a.snap,a.dir,a.singleStep)}function z(a,b){if(b=h(b),!Array.isArray(b)||!b.length||b.length>2)throw new Error("noUiSlider: 'start' option is incorrect.");a.handles=b.length,a.start=b}function A(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'snap' option must be a boolean.")}function B(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'animate' option must be a boolean.")}function C(a,b){if("lower"===b&&1===a.handles)a.connect=1;else if("upper"===b&&1===a.handles)a.connect=2;else if(b===!0&&2===a.handles)a.connect=3;else{if(b!==!1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");a.connect=0}}function D(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function E(a,b){if(!d(b))throw new Error("noUiSlider: 'margin' option must be numeric.");if(a.margin=a.spectrum.getMargin(b),!a.margin)throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")}function F(a,b){if(!d(b))throw new Error("noUiSlider: 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")}function G(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1,a.connect=[0,2,1,3][a.connect];break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function H(a,b){if("string"!=typeof b)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0;a.events={tap:c||f,drag:d,fixed:e,snap:f}}function I(a,b){if(a.format=b,"function"==typeof b.to&&"function"==typeof b.from)return!0;throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")}function J(a){var b,c={margin:0,limit:0,animate:!0,format:U};b={step:{r:!1,t:x},start:{r:!0,t:z},connect:{r:!0,t:C},direction:{r:!0,t:G},snap:{r:!1,t:A},animate:{r:!1,t:B},range:{r:!0,t:y},orientation:{r:!1,t:D},margin:{r:!1,t:E},limit:{r:!1,t:F},behaviour:{r:!0,t:H},format:{r:!1,t:I}};var d={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"};return Object.keys(d).forEach(function(b){void 0===a[b]&&(a[b]=d[b])}),Object.keys(b).forEach(function(d){var e=b[d];if(void 0===a[d]){if(e.r)throw new Error("noUiSlider: '"+d+"' is required.");return!0}e.t(c,a[d])}),c.pips=a.pips,c.style=c.ort?"top":"left",c}function K(a,b,c){var d=a+b[0],e=a+b[1];return c?(0>d&&(e+=Math.abs(d)),e>100&&(d-=e-100),[g(d),g(e)]):[d,e]}function L(a){a.preventDefault();var b,c,d=0===a.type.indexOf("touch"),e=0===a.type.indexOf("mouse"),f=0===a.type.indexOf("pointer"),g=a;return 0===a.type.indexOf("MSPointer")&&(f=!0),d&&(b=a.changedTouches[0].pageX,c=a.changedTouches[0].pageY),(e||f)&&(b=a.clientX+window.pageXOffset,c=a.clientY+window.pageYOffset),g.points=[b,c],g.cursor=e||f,g}function M(a,b){var c=document.createElement("div"),d=document.createElement("div"),e=["-lower","-upper"];return a&&e.reverse(),j(d,T[3]),j(d,T[3]+e[b]),j(c,T[2]),c.appendChild(d),c}function N(a,b,c){switch(a){case 1:j(b,T[7]),j(c[0],T[6]);break;case 3:j(c[1],T[6]);case 2:j(c[0],T[7]);case 0:j(b,T[6])}}function O(a,b,c){var d,e=[];for(d=0;a>d;d+=1)e.push(c.appendChild(M(b,d)));return e}function P(a,b,c){j(c,T[0]),j(c,T[8+a]),j(c,T[4+b]);var d=document.createElement("div");return j(d,T[1]),c.appendChild(d),d}function Q(b,d){function e(a,b,c){if("range"===a||"steps"===a)return M.xVal;if("count"===a){var d,e=100/(b-1),f=0;for(b=[];(d=f++*e)<=100;)b.push(d);a="positions"}return"positions"===a?b.map(function(a){return M.fromStepping(c?M.getStep(a):a)}):"values"===a?c?b.map(function(a){return M.fromStepping(M.getStep(M.toStepping(a)))}):b:void 0}function m(b,c,d){var e=M.direction,f={},g=M.xVal[0],h=M.xVal[M.xVal.length-1],i=!1,j=!1,k=0;return M.direction=0,d=a(d.slice().sort(function(a,b){return a-b})),d[0]!==g&&(d.unshift(g),i=!0),d[d.length-1]!==h&&(d.push(h),j=!0),d.forEach(function(a,e){var g,h,l,m,n,o,p,q,r,s,t=a,u=d[e+1];if("steps"===c&&(g=M.xNumSteps[e]),g||(g=u-t),t!==!1&&void 0!==u)for(h=t;u>=h;h+=g){for(m=M.toStepping(h),n=m-k,q=n/b,r=Math.round(q),s=n/r,l=1;r>=l;l+=1)o=k+l*s,f[o.toFixed(5)]=["x",0];p=d.indexOf(h)>-1?1:"steps"===c?2:0,!e&&i&&(p=0),h===u&&j||(f[m.toFixed(5)]=[h,p]),k=m}}),M.direction=e,f}function n(a,b,c){function e(a){return["-normal","-large","-sub"][a]}function f(a,b,c){return'class="'+b+" "+b+"-"+h+" "+b+e(c[1])+'" style="'+d.style+": "+a+'%"'}function g(a,d){M.direction&&(a=100-a),d[1]=d[1]&&b?b(d[0],d[1]):d[1],i.innerHTML+="<div "+f(a,"noUi-marker",d)+"></div>",d[1]&&(i.innerHTML+="<div "+f(a,"noUi-value",d)+">"+c.to(d[0])+"</div>")}var h=["horizontal","vertical"][d.ort],i=document.createElement("div");return j(i,"noUi-pips"),j(i,"noUi-pips-"+h),Object.keys(a).forEach(function(b){g(b,a[b])}),i}function o(a){var b=a.mode,c=a.density||1,d=a.filter||!1,f=a.values||!1,g=a.stepped||!1,h=e(b,f,g),i=m(c,b,h),j=a.format||{to:Math.round};return I.appendChild(n(i,d,j))}function p(){return G["offset"+["Width","Height"][d.ort]]}function q(a,b){void 0!==b&&(b=Math.abs(b-d.dir)),Object.keys(R).forEach(function(c){var d=c.split(".")[0];a===d&&R[c].forEach(function(a){a(h(B()),b,r(Array.prototype.slice.call(Q)))})})}function r(a){return 1===a.length?a[0]:d.dir?a.reverse():a}function s(a,b,c,e){var f=function(b){return I.hasAttribute("disabled")?!1:l(I,T[14])?!1:(b=L(b),a===S.start&&void 0!==b.buttons&&b.buttons>1?!1:(b.calcPoint=b.points[d.ort],void c(b,e)))},g=[];return a.split(" ").forEach(function(a){b.addEventListener(a,f,!1),g.push([a,f])}),g}function t(a,b){var c,d,e=b.handles||H,f=!1,g=100*(a.calcPoint-b.start)/p(),h=e[0]===H[0]?0:1;if(c=K(g,b.positions,e.length>1),f=y(e[0],c[h],1===e.length),e.length>1){if(f=y(e[1],c[h?0:1],!1)||f)for(d=0;d<b.handles.length;d++)q("slide",d)}else f&&q("slide",h)}function u(a,b){var c=G.getElementsByClassName(T[15]),d=b.handles[0]===H[0]?0:1;c.length&&k(c[0],T[15]),a.cursor&&(document.body.style.cursor="",document.body.removeEventListener("selectstart",document.body.noUiListener));var e=document.documentElement;e.noUiListeners.forEach(function(a){e.removeEventListener(a[0],a[1])}),k(I,T[12]),q("set",d),q("change",d)}function v(a,b){var c=document.documentElement;if(1===b.handles.length&&(j(b.handles[0].children[0],T[15]),b.handles[0].hasAttribute("disabled")))return!1;a.stopPropagation();var d=s(S.move,c,t,{start:a.calcPoint,handles:b.handles,positions:[J[0],J[H.length-1]]}),e=s(S.end,c,u,{handles:b.handles});if(c.noUiListeners=d.concat(e),a.cursor){document.body.style.cursor=getComputedStyle(a.target).cursor,H.length>1&&j(I,T[12]);var f=function(){return!1};document.body.noUiListener=f,document.body.addEventListener("selectstart",f,!1)}}function w(a){var b,e,g=a.calcPoint,h=0;return a.stopPropagation(),H.forEach(function(a){h+=c(a)[d.style]}),b=h/2>g||1===H.length?0:1,g-=c(G)[d.style],e=100*g/p(),d.events.snap||f(I,T[14],300),H[b].hasAttribute("disabled")?!1:(y(H[b],e),q("slide",b),q("set",b),q("change",b),void(d.events.snap&&v(a,{handles:[H[h]]})))}function x(a){var b,c;if(!a.fixed)for(b=0;b<H.length;b+=1)s(S.start,H[b].children[0],v,{handles:[H[b]]});a.tap&&s(S.start,G,w,{handles:H}),a.drag&&(c=[G.getElementsByClassName(T[7])[0]],j(c[0],T[10]),a.fixed&&c.push(H[c[0]===H[0]?1:0].children[0]),c.forEach(function(a){s(S.start,a,v,{handles:H})}))}function y(a,b,c){var e=a!==H[0]?1:0,f=J[0]+d.margin,h=J[1]-d.margin,i=J[0]+d.limit,l=J[1]-d.limit;return H.length>1&&(b=e?Math.max(b,f):Math.min(b,h)),c!==!1&&d.limit&&H.length>1&&(b=e?Math.min(b,i):Math.max(b,l)),b=M.getStep(b),b=g(parseFloat(b.toFixed(7))),b===J[e]?!1:(a.style[d.style]=b+"%",a.previousSibling||(k(a,T[17]),b>50&&j(a,T[17])),J[e]=b,Q[e]=M.fromStepping(b),q("update",e),!0)}function z(a,b){var c,e,f;for(d.limit&&(a+=1),c=0;a>c;c+=1)e=c%2,f=b[e],null!==f&&f!==!1&&("number"==typeof f&&(f=String(f)),f=d.format.from(f),(f===!1||isNaN(f)||y(H[e],M.toStepping(f),c===3-d.dir)===!1)&&q("update",e))}function A(a){var b,c,e=h(a);for(d.dir&&d.handles>1&&e.reverse(),d.animate&&-1!==J[0]&&f(I,T[14],300),b=H.length>1?3:1,1===e.length&&(b=1),z(b,e),c=0;c<H.length;c++)q("set",c)}function B(){var a,b=[];for(a=0;a<d.handles;a+=1)b[a]=d.format.to(Q[a]);return r(b)}function C(){T.forEach(function(a){a&&k(I,a)}),I.innerHTML="",delete I.noUiSlider}function D(){var a=J.map(function(a,b){var c=M.getApplicableStep(a),d=i(String(c[2])),e=Q[b],f=100===a?null:c[2],g=Number((e-c[2]).toFixed(d)),h=0===a?null:g>=c[1]?c[2]:c[0]||!1;return[h,f]});return r(a)}function E(a,b){R[a]=R[a]||[],R[a].push(b),"update"===a.split(".")[0]&&H.forEach(function(a,b){q("update",b)})}function F(a){var b=a.split(".")[0],c=a.substring(b.length);Object.keys(R).forEach(function(a){var d=a.split(".")[0],e=a.substring(d.length);b&&b!==d||c&&c!==e||delete R[a]})}var G,H,I=b,J=[-1,-1],M=d.spectrum,Q=[],R={};if(I.noUiSlider)throw new Error("Slider was already initialized.");return G=P(d.dir,d.ort,I),H=O(d.handles,d.dir,G),N(d.connect,I,H),x(d.events),d.pips&&o(d.pips),{destroy:C,steps:D,on:E,off:F,get:B,set:A}}function R(a,b){if(!a.nodeName)throw new Error("noUiSlider.create requires a single element.");var c=J(b,a),d=Q(a,c);d.set(c.start),a.noUiSlider=d}var S=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},T=["noUi-target","noUi-base","noUi-origin","noUi-handle","noUi-horizontal","noUi-vertical","noUi-background","noUi-connect","noUi-ltr","noUi-rtl","noUi-dragable","","noUi-state-drag","","noUi-state-tap","noUi-active","","noUi-stacking"];w.prototype.getMargin=function(a){return 2===this.xPct.length?n(this.xVal,a):!1},w.prototype.toStepping=function(a){return a=r(this.xVal,this.xPct,a),this.direction&&(a=100-a),a},w.prototype.fromStepping=function(a){return this.direction&&(a=100-a),e(s(this.xVal,this.xPct,a))},w.prototype.getStep=function(a){return this.direction&&(a=100-a),a=t(this.xPct,this.xSteps,this.snap,a),this.direction&&(a=100-a),a},w.prototype.getApplicableStep=function(a){var b=q(a,this.xPct),c=100===a?2:1;return[this.xNumSteps[b-2],this.xVal[b-c],this.xNumSteps[b-c]]},w.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var U={to:function(a){return a.toFixed(2)},from:Number};return{create:R}});
/* end of nouislider */


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(c) {
    return "#" + componentToHex(c.r) + componentToHex(c.g) + componentToHex(c.b);
}

(function(){
    var socket = io.connect('/bsock', {transports: ['websocket', 'polling']});
    var settings = {};
    var settings_init = false;
    var cdummy = $('#settings-panel #color-dummy').html();
    var saving = false;
    var colors_update = function() {
        var colors = $('#settings-panel .colors .list');
        colors.find('.color input').spectrum('destroy');
        colors.html('');
        for(c in settings.colors) {
            var cur = $(cdummy);
            cur.find('input').val(rgbToHex(settings.colors[c]));
            colors.append(cur);
            colors.find('.color:last-child input').spectrum({
                preferredFormat: "hex"
            });
            colors.find('.color:last-child .color-remove').click(function(){
                $(this).parent().find('input').spectrum('destroy');
                $(this).parent().remove();
            });
        }
    };
    $('#settings-panel .colors .add-color').click(function(){
        var colors = $('#settings-panel .colors .list');
        colors.append(cdummy);
        colors.find('.color:last-child input').spectrum({
            allowEmpty: true,
            preferredFormat: "hex"
        });
        colors.find('.color:last-child input').spectrum('show');
        colors.find('.color:last-child .color-remove').click(function(){
            $(this).parent().find('input').spectrum('destroy');
            $(this).parent().remove();
        });
    });
    var sliders_update = function() {
        $('#settings-panel .slider').each(function() {
            this.noUiSlider.set([settings[$(this).next('input').attr('name')]]);
        });
    };
    var settings_update = function(s) {
        if(s) $.extend(settings, s);
        colors_update();
        sliders_update();
        if(settings.background !== undefined) {
            bg_val.val(settings.background).trigger('change');
            $('body').css({'background-image': settings.background ? 'url(' + settings.background + ')':''});
        }
        users.position_redraw();
        if(saving) {$('#settings-panel').hide().css({opacity: 0});window.alert('Settings saved');saving=false;}
    };
    var rgb = function(c, op) {
        var rgb = 'rgb(' + c.r + ',' + c.g + ',' + c.b;
        if(op) rgb += ',' + op;
        rgb += ')';
        return rgb;
    };
    var users = {
        dummy: $('#splash-dummy').html(),
        init_data: [],
        init: function() {
            if(this.init_data && this.init_data.constructor == Array) for(i=0;i<this.init_data.length;i++) {
                // console.log(this.init_data[i].name);
                this.create(this.init_data[i]);
                if(this.init_data[i].status === 'final')this.final_position(this.init_data[i]);
            }
        },
        create: function(user) {
            if(user._id && user.name && user.name.constructor == String) {
                var dummy = $(this.dummy);
                dummy.attr('id', user._id);
                $('body').append(dummy);
                dummy.find('.name').text(user.name);
                if(user.msg) dummy.find('.msg').text(user.msg);
                if(user.dp) dummy.find('.dp img').attr('src', user.dp);

                dummy.find('svg path').css({fill: rgb(user.color)});
                var inv = {r: 255-user.color.r, g: 255-user.color.g, b: 255-user.color.b};
                dummy.children('div').css({color: rgb(inv)});

                dummy.children('.splash .name').css({background: rgb(user.color)});
                dummy.children('.splash .msg').css({background: rgb(user.color)});

                var shadow = (user.color.r + user.color.g + user.color.b)/3;
                if(shadow > 255/2) shadow = 0;
                else shadow = 255;
                shadow = {r: shadow, g: shadow, b: shadow};
                dummy.find('.dp img').css({
                    'border-color': rgb(inv, 0.8),
                    'box-shadow': '0px 0px 5px ' + rgb(shadow, 0.8)
                });

                dummy.height(780);
                dummy.width(780);
                dummy.find('svg').height(780);
                dummy.find('svg').width(780);

                dummy.data('position', function(data) {
                    var css = {};
                    var dh = $(this).height()*settings.blob_height/100;
                    if(!data) data = {x: 0, y: 0};


                    var objLeft =  50 + data.x*2.5 ;
                    var objTop = 50 + data.y*1.5 ;

                    var width = screen.width ;
                    var height = screen.height ;

                    var objMarginLeft = -dh*(50+data.x*2.5)/100;
                    var objMarginTop  = -dh*(50+data.y*0.5)/100;

                    //console.log(width , height , objMarginLeft , objMarginTop , objLeft , objTop ) ;

                    css.left = String(objLeft) + '%' ;
                    css.top = String(objTop) + '%'; ;
                    css.marginLeft =  objMarginLeft ;
                    css.marginTop = objMarginTop ;
                    var factor = dh/580;
                    css['-webkit-transform'] = 'scale(' + factor + ',' + factor + ')';
                    dummy.css(css);
                    dummy.data('pos', data);
                });

                dummy.data('position')(user.pos);
            }
        },
        last_time: null,
        did_shake: function(data) {
            if(!data && !data.gyro) return false;
            if(data.history){
                var gx = [];
                data.history.map(function(item){gx.push(item.gyro.x);});
                if(gx.slice(-5).reduce(function(pv, cv) { return pv + cv; }, 0)/5 <= -1*(5-settings.sensitivity+1)) return true;
            }
            /* old shake detection */
            // var threshold = 0.3, slop_time = 500;
            // var now = new Date().getTime();
            // if(data.g_force >= threshold && this.last_time && (now - this.last_time) <= slop_time)return true;
            // this.last_time = now;
            /* end of old detection */

            return false;
        },
        position: function(data) {
            // if(data.status == 'paused' && this.did_shake(data)) {

			 if(data.status == 'paused' && data.shake == 'done' ) {
                data.pos = data.history.slice(-10)[0].pos;
                this.finalize(data);
            }
            if(data && data._id && $('#' + data._id).length && data.pos && data.status == 'positioning') $('#' + data._id).data('position')(data.pos);
        },
        position_redraw: function() {
            $('.splash').each(function(){
                if($(this).data('position')) $(this).data('position')($(this).data('pos'));
            });
        },
        finalize: function(data) {
            socket.emit('finalize', {_id: data._id, pos: data.history.slice(-10)[0].pos});
            this.final_position(data);
        },

		 finalSwap: function(data) {
           // socket.emit('finalize', {_id: data._id, pos: data.history.slice(-10)[0].pos});
            this.final_position(data);
        },

        final_position: function(data) {

            console.log( 'final_position'  ,  data );

            var user = $('#' + data._id);
            user.find('div').css({display: 'block'});
            user.find('svg').css({display: 'inline'});
            user.find('.aim').css({display: 'none'});
        },
        reposition: function(data) {
            var user = $('#' + data._id);
            user.find('div').css({display: 'none'});
            user.find('svg').css({display: 'none'});
            user.find('.aim').css({display: 'block'});
        },
        remove: function(_id) {
            $('#' + _id).remove();
        }
    };

    socket.on('init', function(data){
        users.init_data = data.users;
    });

    socket.on('new_user', function(user){
        users.create(user);
    });

    socket.on('user_position', function(data){
        users.position(data);
    });

    socket.on('user_expired', function(_id){
        users.remove(_id);
    });
    socket.on('settings', function(s) {
        // console.log('Settings received', s);
        settings_update(s);
        if(!settings_init) users.init();
        settings_init = true;
    });

	 socket.on('finalize', function(s) {
     //  console.log('ekkekekekeekekkk %%%%% ', s);
	   users.finalSwap(s)

    });

    socket.on('disconnect', function() {
        if($('#settings-panel:visible').length === 1) {
            window.alert('Disconnected from server');
            $('#settings-panel').hide().css({opacity: 0});
            settings_update();
        }
    });

    $(window).resize(users.position_redraw);
    $('#settings-panel #settings-cancel').click(function(){
        $('#settings-panel').hide().css({opacity: 0});
        $(this).blur();
        settings_update();
    });
    var bg = $('#settings-panel form input[name=background][type=file]')[0];
    var bg_val = $('#settings-panel form input[name=background][type=hidden]');
    var bg_state = 0; /* 0 = init, 1 = existing, 2 = edited */
    bg_val.change(function() {
        $('#settings-panel form .background img').attr('src', $(this).val());
        if(!$(this).val()) $('#settings-panel form input[name=background][type=file]').val('');
    });
    bg.onchange = function() {
        if(bg.files.length) {
            var bg_reader = new FileReader();
            bg_reader.onloadend = function(){
                bg_val.val(bg_reader.result).trigger('change');
            };
            bg_reader.readAsDataURL(bg.files[0]);
        }
        else {
            bg_val.val(settings.background?settings.background: '').trigger('change');
        }
    };
    $('#settings-panel form .background img+.bg-remove').click(function() {
        bg_val.val('').trigger('change');
    });
    $('#settings-panel #settings-save').click(function(){
        var new_settings = {};
        $('#settings-panel form').serializeArray().map(function(item) {
            if ( new_settings[item.name] ) {
                if ( typeof(new_settings[item.name]) === "string" ) {
                    new_settings[item.name] = [new_settings[item.name]];
                }
                if(item.value) new_settings[item.name].push(item.value);
            } else {
                new_settings[item.name] = (item.name === 'colors' || item.name === 'background')?item.value:Number(item.value);
            }
        });
        saving = true;
        socket.emit('settings', new_settings);
        $(this).blur();
    });
    $('#settings-panel .slider').each(function(){
        noUiSlider.create(this, {
            range: {min: Number($(this).attr('data-min')), max: Number($(this).attr('data-max'))},
            step: Number($(this).attr('data-step')),
            start: Number($(this).attr('data-min'))
        });
        var t = this;
        var ip = $(t).parent().children('input');
        this.noUiSlider.on('update', function(values, handle) {
            ip.val(values[handle]);
        });
        ip.change(function() {
            t.noUiSlider.set([$(this).val()]);
        });
    });
    Mousetrap.bind(['ctrl+alt+s', 'command+alt+s', 'alt+shift+s'], function(e) {
        if(socket.connected) {
            if($('#settings-panel:visible').length === 0) {/*console.log('Settings requested');*/socket.emit('settings');}
            $('#settings-panel').toggle();
            $('#settings-panel').css({opacity: $('#settings-panel').css('opacity')^1});
            if($('#settings-panel:visible').length === 0)settings_update();
        }
    });
    Mousetrap.bind('escape', function(e) {
        if(socket.connected) {
            $('#settings-panel').hide().css({opacity: 0});
            settings_update();
        }
    });
}());

