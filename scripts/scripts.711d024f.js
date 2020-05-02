"use strict";angular.module("htckApp",["ngAnimate","ngAria","ngRoute","ngTouch","ngMaterial","ngDragDrop","cfp.hotkeys"]).config(["$routeProvider","$logProvider","hotkeysProvider",function(a,b,c){$.extend(constants,params),c.cheatSheetHotkey="ctrl+h",b.debugEnabled(!1),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("htckApp").controller("MainCtrl",["$scope","$timeout","$log","$document","$mdSidenav","hExport","hTextEdit","hHotkeys","hElement","hTools","hSave","hPages",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(b,c){a.setCurrent(b.subject),a.handleFtChanged(b,c)}function n(b){return a.provisionElement(b),b}function o(){c.debug("Unfocus"),g.removeCaret(),a.setCurrent(null)}function p(b,d,e){var f=j.getSizeOfImage(b);if(d=d?d:(constants.W-f.w)/2,e=e?e:(constants.H-f.h)/2,0!==f.h&&0!==f.w){c.debug(f);var g=a.paper.image(b,d,e,f.w,f.h);return n(g)}}function q(a,b){var c=$("#paper"),d=c.width(),e=d/constants.W*constants.H,f=c.height();return[a/d*constants.W,b/e*constants.H-(f-e)/2]}function r(b){if(a.backgroundDown&&a.brush&&(!a.brush.timeStamp||b.timeStamp-a.brush.timeStamp>=a.brush.speed)){a.brush.timeStamp=b.timeStamp,c.debug("Brush event");var d=$("#paper").offset(),e=a.brush.images[j.randInt(0,a.brush.images.length-1)],f=j.getSizeOfImage(e.img),g=b.pageX-d.left-f.w/4,h=b.pageY-d.top-f.h/4,k=q(g,h),l=p(e.img,k[0],k[1]),m=j.randInt(-a.brush.randRotationRange,a.brush.randRotationRange);i.setRotation(l,m);var n=a.brush.scale*(e.scale||1)*(a.brush.randScaleRange?1-j.rand(100*-a.brush.randScaleRange,100*a.brush.randScaleRange)/100:1);l.ft.attrs.scale.y=n,a.elementChangedHeight(l.ft.attrs.scale.y),l.ft.attrs.scale.x=n,a.elementChangedWidth(l.ft.attrs.scale.x),l.ft.apply();var o=a.brush.mirror&&!e.mirror||!a.brush.mirror&&e.mirror;o&&i.setMirror(l),(a.brush.randMirror?j.randInt(0,1):!1)&&i.setMirror(l)}}function s(a,b){return a&&b&&a.id===b.origId&&a.keepratio===b.keepratio&&a.height===b.height&&a.width===b.width&&a.rotation===b.rotation&&a.opacity===b.opacity}function t(){a.font=constants.fonts&&constants.fonts.length?constants.fonts[0]:void 0,a.fontColor=constants.colors&&constants.colors.length?constants.colors[0]:constants.TEXT_DEFAULT_FONT_COLOR,a.headerStyle={},a.font&&(a.headerStyle={"font-family":a.font.font,"text-transform":a.font.uppercase?"uppercase":"none"});var d=new Raphael(constants.RAPHAEL_PAPER,constants.W,constants.H);a.paper=d,c.debug("Paper",d),d.setViewBox(0,0,constants.W,constants.H,!0),d.setSize("100%","100%"),d.canvas.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve");var e=a.paper.rect(0,0,constants.W,constants.H);e.attr({fill:"url("+constants.backgrounds[0]+")","fill-opacity":"1",stroke:"none"}),a.initBackground(e),$("#paper").mouseup(a.paperUnfocus),$("#paper").mouseleave(a.paperUnfocus),g.init(a),k.init(a),h(a),l.init(a),a.hPages=l,b(function(){a.$apply()}),b(function(){$("#itembank").redraw()},20),b(function(){$("#itembank").redraw()},1e3)}a.constants=constants,a.setCurrent=function(b){a.current&&b&&a.current.id===b.id||(a.current&&"text"===a.current.type&&!a.current[0].textContent.length&&i.remove(a.current),a.current&&a.current.ft&&i.handles(a.current),a.current=b,a.current&&i.handles(a.current,!0),a.current&&"text"===a.current.type?g.addCaret():g.removeCaret())},a.provisionElement=function(b){var c=a.paper.freeTransform(b,{},j.debounce(m),a.constants.DEBOUNCE);b.ft=c,a.setCurrent(b),c.attrs.y=constants.ELEMENT_DEFAULT_HEIGHT,i.setHeight(a.current,c.attrs.y),c.attrs.x=constants.ELEMENT_DEFAULT_WIDTH,i.setWidth(a.current,c.attrs.x),c.attrs.rotate=constants.ELEMENT_DEFAULT_ROTATION,i.setRotation(a.current,c.attrs.rotate),b.opacity=1,b.keepratio=constants.ELEMENT_DEFAULT_KEEPRATIO,a.elementSetKeepRatio(),c.setOpts({drag:["self"]}),"text"===b.type&&c.setOpts({distance:a.constants.ELEMENT_TEXT_HANDLE_DISTANCE}),b.ft.handles.y.line.handle=!0,b.ft.handles.x.line.handle=!0,b.ft.handles.x.disc.handle=!0,b.ft.handles.y.disc.handle=!0},a.handleFtChanged=function(b,c){-1!==c.indexOf("rotate")&&i.setRotation(a.current,b.attrs.rotate),-1!==c.indexOf("scale")&&(a.elementChangedHeight(b.attrs.scale.y),a.elementChangedWidth(b.attrs.scale.x)),g.updateCaretPosition()},a.unfocus=o,a.isFlipped=function(){var b=a.current.mirror?-1:1;return b},a.addImage=function(b,c,d){a.setBrush(void 0),p(b,c,d)},a.remove=function(){a.current&&(i.remove(a.current),o())},a.bringToFront=function(){a.current&&a.current.toFront()},a.bringToBack=function(){a.current&&(a.current.toBack(),a.backgroundElement.toBack())},a.elementSetHeight=function(){a.current&&(a.current.keepratio?(a.current.ft.attrs.scale.x=i.elementRatio(a.current)*a.current.height,a.elementChangedWidth(a.current.ft.attrs.scale.x),a.current.ft.attrs.scale.y=a.current.height):(a.current.ft.attrs.scale.y=a.current.height,a.current.ft.attrs.ratio=i.elementRatio(a.current)),a.current.ft.apply(),g.updateCaretPosition())},a.elementSetWidth=function(){a.current&&(a.current.keepratio?(a.current.ft.attrs.scale.y=a.isFlipped()*a.current.width/i.elementRatio(a.current),a.elementChangedHeight(a.current.ft.attrs.scale.y),a.current.ft.attrs.scale.x=a.isFlipped()*a.current.width):(a.current.ft.attrs.scale.x=a.isFlipped()*a.current.width,a.current.ft.attrs.ratio=i.elementRatio(a.current)),a.current.ft.apply(),g.updateCaretPosition())},a.elementChangedHeight=function(b){i.setHeight(a.current,b)},a.elementChangedWidth=function(b){i.setWidth(a.current,b)},a.elementSetRotation=function(){i.setRotation(a.current,a.current.rotation),g.updateCaretPosition()},a.elementSetKeepRatio=function(){i.setKeepRatio(a.current)},a.elementSetMirror=function(){i.setMirror(a.current),g.updateCaretPosition()},a.elementSetOpacity=function(){a.current&&a.current.attr({opacity:a.current.opacity})},a.elementChangeFont=function(){a.current&&"text"===a.current.type&&(a.current.attr({"text-anchor":"start","font-family":a.font.font,"font-size":a.font.size+"px"||constants.TEXT_DEFAULT_SIZE,fill:a.fontColor}),a.font.uppercase&&g.toUpperCase(a.current),b(g.updateCaretPosition,10))},a.backgroundMousedownHandler=function(b){if(a.backgroundDown=!0,!a.brush&&a.font){var c=q(b.layerX,b.layerY),d=a.paper.text(c[0],c[1],"H").attr({"text-anchor":"start","font-family":a.font.font,"font-size":a.font.size+"px",fill:a.fontColor});n(d),a.caret=0,d.attr({text:""}),d.inited=!0,a.$apply()}},a.paperUnfocus=function(){a.backgroundDown=!1},a.setBackground=function(b){a.backgroundElement.attr({fill:"url("+b+")","fill-opacity":"1",stroke:"none"})},a.dragDropItemBank=function(b,c){var d=c.draggable[0].src,e=c.offset.left-$("#paper").offset().left,f=c.offset.top-$("#paper").offset().top,g=q(e,f);a.addImage(d,g[0],g[1])},a.setBrush=function(b){a.backgroundElement.unmousemove(r),o(),a.brush&&b&&b.name===a.brush.name?(a.brush.classe=void 0,a.brush=void 0):(a.brush&&(a.brush.classe=void 0),a.brush=b,a.brush&&(a.brush.classe="brush-active",$("#paper").mousemove(r)))},a["export"]=function(){c.debug("Exporting"),o(),a.exportPNGRunning=!0,f.exportOnePNG(constants.RAPHAEL_PAPER,"canvas","TheCosmicArtifacesOfHirayama.png",a.paper,function(){a.exportPNGRunning=!1})},a.exportAll=function(){f.exportManyPNG(a,constants.RAPHAEL_PAPER,"canvas","TheCosmicArtifacesOfHirayama")},a.setFontColor=function(b){a.current.attr({fill:b}),a.fontColor=b,a.caretPointer&&a.caretPointer.attr({fill:b})},a.$on("$destroy",function(){g.destroy()}),a.save=function(){o(),k.save(l.pages,"TheCosmicArtifacesOfHirayama.htck")},a.startImport=function(){angular.element("#import-file-chooser").trigger("click")},a.paste=function(){if(a.clipboard){var b=i.clone(a.clipboard,a.provisionElement);i.move(b,2*-constants.W,0),"text"===b.type&&g.addCaret()}},a.copy=function(){var d=a.current;if(!(!d||a.clipboard&&s(d,a.clipboard)||"text"===d.type&&!d[0].textContent.length)){a.clipboard&&(i.remove(a.clipboard),delete a.clipboard);var e=i.clone(d,a.provisionElement);i.move(e,2*constants.W,0),a.clipboard=e,a.clipboard.tmpClone=!0,b(function(){a.setCurrent(d)},5),c.debug("Copied to clipboard")}},a.initBackground=function(b){a.backgroundElement=b,a.backgroundElement.background=!0,a.backgroundElement.mousedown(a.backgroundMousedownHandler),a.backgroundElement.mouseup(a.paperUnfocus)},t()}]),angular.module("htckApp").factory("hExport",["hTools",function(a){function b(b,c,d,e){d.setSize(constants.W+"px",constants.H+"px");var f=document.getElementById(b).children[0],g=a.svgfix(f.outerHTML);d.setSize("100%","100%"),canvg(document.getElementById(c),g,{renderCallback:function(){for(var a=document.getElementById(c),b=a.getContext("2d"),d="Based on Yokohama City Hall's public library's series of Hirayama fireworks catalog",f=10,g=a.height-10,h=b.getImageData(f,a.height-11,a.width-11,10).data,i=0,j=0,k=0;k<h.length;k+=4)j+=h[k]+h[k+1]+h[k+2],i+=3;var l="black",m="white";console.log(j/i),j/i>170&&(l="white",m="black"),b.font="13px Sans-serif",b.strokeStyle=l,b.lineWidth=1,b.strokeText(d,f,g),b.fillStyle=m,b.fillText(d,f,g),e(a)}})}function c(a,c,d,e){b(a,c,d,function(a){e(a.toDataURL())})}function d(a,c,d,e,f){b(a,c,e,function(a){a.toBlob(function(a){saveAs(a,d),f()})})}function e(a,b){var c=a.toJSON(function(a,c){if(!a.handle&&!a.tmpClone){if(a.background)c.background=!0;else if(b)return;return c.height=a.height,c.width=a.width,c.rotation=a.rotation,c.opacity=a.opacity,c.keepratio=a.keepratio,c.mirror=a.mirror,a.ft&&(c.ft=a.ft.attrs),c}});return c}function f(a,b,c,e){var f=a.hPages;f.saveCurrent();for(var g=0,h=f.pages.length;h>g;g++)f["goto"](g),d(b,c,e+g+".png",a.paper)}function g(b,c,d,e,f,g,h){gifshot.createGIF({images:b,gifWidth:e,gifHeight:f,sampleInterval:10,interval:g,numFrames:b.length,crossOrigin:""},function(b){if(!b.error){var d=b.image,e=a.b64toBlob(d.split(",")[1],"image/gif");saveAs(e,c),h()}})}return{exportOnePNG:d,exportOneJSON:e,exportManyPNG:f,exportManyGIF:g,exportOneBase64:c}}]),angular.module("htckApp").factory("hTextEdit",["$document","$log","$interval",function(a,b,c){function d(b){a.on("keypress",i),a.on("keydown",h),n=b.$new()}function e(){c.cancel(o),a.off("keypress",i),a.off("keydown",h)}function f(){n.$parent.caretPointer&&n.$parent.caretPointer.attr({"fill-opacity":1-n.$parent.caretPointer.attr("fill-opacity")})}function g(){if(n.$parent.current&&"text"===n.$parent.current.type){var a=n.$parent.current.clone();a.attr({fill:"blue"});var b=a.attr("x");a.attr({text:n.$parent.current[0].textContent.substr(0,n.$parent.caret)});var c=a.getBBox(!0).width;0===n.$parent.caret&&(a.attr({text:""}),c=0),n.$parent.caretPointer.attr({x:b+c}),n.$parent.caretPointer.transform(n.$parent.current.transform()),n.$parent.caretPointer.attr({"fill-opacity":1}),a.remove()}}function h(a){var b=!1;32===a.keyCode?(a.key=" ",b=!0):(8===a.keyCode||37===a.keyCode||39===a.keyCode)&&(b=!0),b&&i(a)}function i(a){if(a.key||(a.key=String.fromCharCode(a.which)),n.$parent.current&&"text"===n.$parent.current.type){if(b.debug(a),"Backspace"===a.key||8===a.keyCode)return a.preventDefault(),n.$parent.current[0].textContent.length&&n.$parent.caret>0&&(n.$parent.current.attr({text:n.$parent.current[0].textContent.substr(0,n.$parent.caret-1)+n.$parent.current[0].textContent.substr(n.$parent.caret)}),n.$parent.caret--,g()),a.stopPropagation(),void a.preventDefault();if("ArrowLeft"===a.key||37===a.keyCode)return n.$parent.caret>0&&(n.$parent.caret--,g()),a.stopPropagation(),void a.preventDefault();if("ArrowRight"===a.key||39===a.keyCode)return n.$parent.caret<n.$parent.current[0].textContent.length&&(n.$parent.caret++,g()),a.stopPropagation(),void a.preventDefault();if(!(!a.key.match(constants.ENABLED_CHARACTERS)&&" "!==a.key||a.key.length>1)){var c=" "===a.key?" ":n.$parent.font.uppercase?a.key.toUpperCase():a.key;n.$parent.current.attr({text:n.$parent.current[0].textContent.substr(0,n.$parent.caret)+c+n.$parent.current[0].textContent.substr(n.$parent.caret)}),n.$parent.caret++,g(),a.stopPropagation(),a.preventDefault()}}}function j(a){a&&"text"===a.type&&(a.attr({text:a[0].textContent.substr(0,n.$parent.caret-1)+a[0].textContent.substr(n.$parent.caret)}),a.caret--,g())}function k(){m(),n.$parent.caret=n.$parent.current[0].textContent.length,n.$parent.current.inited||(n.$parent.caret=0);var a=n.$parent.current.attr("x"),b=n.$parent.current.attr("y"),c=n.$parent.current.getBBox(!0).height;n.$parent.caretPointer=n.$parent.paper.rect(a-1,b-3*c/5,3,c),n.$parent.caretPointer.attr({fill:n.$parent.current.attr("fill"),stroke:"none"}),g()}function l(a){a&&"text"===a.type&&a.attr({text:a[0].textContent.toUpperCase()})}function m(){n.$parent.caretPointer&&(n.$parent.caretPointer.remove(),n.$parent.caretPointer=null)}var n={},o=c(f,500);return{init:d,destroy:e,updateCaretPosition:g,addCaret:k,removeCaret:m,popChar:j,toUpperCase:l}}]),angular.module("htckApp").factory("hHotkeys",["hotkeys","hElement","hTextEdit","hPages",function(a,b,c,d){function e(e){var f=e.$new();f.$parent.hotkeys=a,a.add({combo:"del",description:"Removes currently selected element",callback:f.$parent.remove}),a.add({combo:"esc",description:"Unfocuses from currently selected element",callback:f.$parent.unfocus}),a.add({combo:"space",description:"Bring currently selected element to the front",callback:function(a){a.preventDefault(),f.$parent.current&&"text"!==f.$parent.current.type&&f.$parent.bringToFront()}}),a.add({combo:"ctrl+space",description:"Puts currently selected element to the back",callback:function(a){a.preventDefault(),f.$parent.current&&"text"!==f.$parent.current.type&&f.$parent.bringToBack()}}),a.add({combo:"ctrl+m",description:"Mirrors currently selected element",callback:function(){f.$parent.elementSetMirror(),f.$parent.current&&"text"===f.$parent.current.type&&c.popChar(f.$parent.current)}}),a.add({combo:"up",description:"Slightly moves currently selected element up",callback:function(a){a.preventDefault(),b.move(f.$parent.current,0,-constants.ELEMENT_DISPLACEMENT)}}),a.add({combo:"down",description:"Slightly moves currently selected element down",callback:function(a){a.preventDefault(),b.move(f.$parent.current,0,constants.ELEMENT_DISPLACEMENT)}}),a.add({combo:"right",description:"Slightly moves currently selected element to the right",callback:function(a){f.$parent.current&&"text"!==f.$parent.current.type&&(a.preventDefault(),b.move(f.$parent.current,constants.ELEMENT_DISPLACEMENT,0))}}),a.add({combo:"left",description:"Slightly moves currently selected element to the left",callback:function(a){f.$parent.current&&"text"!==f.$parent.current.type&&(a.preventDefault(),b.move(f.$parent.current,-constants.ELEMENT_DISPLACEMENT,0))}}),a.add({combo:"ctrl+left",description:"Slightly rotates currently selected element counter clock-wise",callback:function(a){a.preventDefault(),b.rotate(f.$parent.current,-constants.ELEMENT_ROTATION),f.$parent.current&&"text"!==f.$parent.current.type||(f.$parent.caret=f.$parent.current[0].textContent.length+1,c.updateCaretPosition())}}),a.add({combo:"ctrl+right",description:"Slightly rotates currently selected element clock-wise",callback:function(a){a.preventDefault(),b.rotate(f.$parent.current,constants.ELEMENT_ROTATION),f.$parent.current&&"text"!==f.$parent.current.type||(f.$parent.caret=f.$parent.current[0].textContent.length,c.updateCaretPosition())}}),a.add({combo:"ctrl+s",description:"Saves draft file for further edit",callback:function(a){a.preventDefault(),f.$parent.save()}}),a.add({combo:"ctrl+shift+s",description:"Exports canvas to png",callback:function(a){a.preventDefault(),f.$parent["export"]()}}),a.add({combo:"ctrl+shift+g",description:"Exports pages to gif",callback:function(a){a.preventDefault(),d.exportGIF(null)}}),a.add({combo:"ctrl+c",description:"Copies currently selected element to clipboard",callback:function(a){a.preventDefault(),f.$parent.copy()}}),a.add({combo:"ctrl+v",description:"Pastes clipboard content",callback:function(a){a.preventDefault(),f.$parent.paste()}}),a.add({combo:"ctrl+h",description:"Show / hide this help menu",callback:function(b){b.preventDefault(),a.toggleCheatSheet()}})}return e}]),angular.module("htckApp").factory("hElement",function(){function a(a){return a.ft.attrs.scale.x/a.ft.attrs.scale.y}function b(a,b,c){a&&(a.ft.attrs.translate.x+=b,a.ft.attrs.translate.y+=c,a.ft.apply())}function c(a){a&&(a.ft.unplug(),a.remove())}function d(a,b){a&&(a.height=Math.abs(b))}function e(a,b){a&&(a.width=Math.abs(b))}function f(a,b){a&&(a.rotation=Math.floor(b),a.ft.attrs.rotate=a.rotation,a.ft.apply())}function g(a,b){a&&f(a,a.rotation+b)}function h(a){a&&a.ft.setOpts({keepRatio:a.keepratio})}function i(b){b&&(b.ft.attrs.scale.x=-b.ft.attrs.scale.x,b.ft.attrs.ratio=a(b),b.ft.apply())}function j(a,b){a.ft.handles.x.disc.attr({opacity:b?1:0}),a.ft.handles.y.disc.attr({opacity:b?1:0}),a.ft.handles.x.line.attr({opacity:b?1:0}),a.ft.handles.y.line.attr({opacity:b?1:0})}function k(a,b){if(a){var c=a.clone();return c.origId=a.id,b(c),c.keepratio=a.keepratio,c.height=a.height,c.width=a.width,c.rotation=a.rotation,f(c,c.rotation),c.opacity=a.opacity,c.caret=a.caret,c.inited=a.inited,c}}return{move:b,remove:c,setHeight:d,setWidth:e,setRotation:f,setKeepRatio:h,setMirror:i,elementRatio:a,handles:j,rotate:g,clone:k}}),angular.module("htckApp").factory("hTools",function(){function a(a){var b=new Image;b.src=a;var c=b.width,d=b.height;return{w:c,h:d}}function b(a,b){return Math.floor(Math.random()*(b-a+1))+a}function c(a,b){return Math.random()*(b-a+1)+a}function d(a,b,c){b=b||"",c=c||512;for(var d=atob(a),e=[],f=0;f<d.length;f+=c){for(var g=d.slice(f,f+c),h=new Array(g.length),i=0;i<g.length;i++)h[i]=g.charCodeAt(i);var j=new Uint8Array(h);e.push(j)}var k=new Blob(e,{type:b});return k}function e(a){var b=a;return b=$.trim(b),-1===b.indexOf("xmlns:xlink")&&(b=b.replace("<svg ",'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')),b=b.replace(" href"," xlink:href")}function f(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}return $.fn.redraw=function(){$(this).each(function(){this.style.display="none",this.offsetHeight,this.style.display="block"})},{getSizeOfImage:a,randInt:b,rand:c,b64toBlob:d,svgfix:e,debounce:f}}),angular.module("htckApp").factory("hSave",["hElement","$timeout",function(a,b){function c(a){g=a.$new(),angular.element("#import-file-chooser")[0].onchange=d}function d(a){if(a.target.files&&a.target.files.length){var b=a.target.files[0],c=new FileReader;c.onloadend=function(a){g.$parent.hPages.pages=JSON.parse(a.target.result),g.$parent.hPages["goto"](0)},c.readAsText(b)}}function e(a,b){g.$parent.hPages.saveCurrent();var c=JSON.stringify(a),d=new Blob([c],{type:"text/plain;charset=utf-8"});saveAs(d,b)}function f(c){g.$parent.paper.clear(),g.$parent.paper.fromJSON(c,function(b,c){if(b.height=c.height,b.width=c.width,b.rotation=c.rotation,b.opacity=c.opacity,b.keepratio=c.keepratio,b.mirror=c.mirror,c.background)g.$parent.initBackground(b);else if(c.ft){b.mousedown(g.$parent.elementMouseDown);var d=g.$parent.paper.freeTransform(b,{},function(a,b){g.$parent.setCurrent(a.subject),g.$parent.handleFtChanged(a,b)});b.ft=d,b.ft.attrs=c.ft,a.setHeight(b,d.attrs.y),a.setWidth(b,d.attrs.x),a.setRotation(b,d.attrs.rotate),a.setKeepRatio(b),d.setOpts({drag:["self"]}),"text"===b.type&&(d.setOpts({distance:g.$parent.constants.ELEMENT_TEXT_HANDLE_DISTANCE}),b.inited=!0),d.handles.y.line.handle=!0,d.handles.x.line.handle=!0,d.handles.x.disc.handle=!0,d.handles.y.disc.handle=!0,a.handles(b)}return b}),b(g.$parent.unfocus,1)}var g={};return{init:c,save:e,"import":f}}]),angular.module("htckApp").factory("hPages",["hExport","hSave","hElement","$timeout","$mdDialog","$log",function(a,b,c,d,e,f){function g(a,b){a.hPages=b,a.constants=constants,a.cancel=function(){e.cancel()},a.answer=function(){e.hide({})}}var h={};return this.pages=[],this.pngPages=[],this.currentPageIndex=0,this.gifInterval=1,this.gifWidth=constants.W/2,this.init=function(a){h=a.$new(),this.currentPageIndex=0},this.saveCurrent=function(){h.$parent.unfocus();var b=a.exportOneJSON(h.$parent.paper),c=this.currentPageIndex,d=this;a.exportOneBase64(constants.RAPHAEL_PAPER,"canvas",h.$parent.paper,function(a){d.pngPages[c]=a}),this.pages[this.currentPageIndex]=b},this["goto"]=function(a){this.pages[a]&&(h.$parent.setBrush(void 0),this.currentPageIndex=a,b["import"](this.pages[a]))},this.next=function(){this.saveCurrent(),this["goto"](this.currentPageIndex+1)},this.prev=function(){this.saveCurrent(),this["goto"](this.currentPageIndex-1)},this.create=function(a){this.pages.splice(this.currentPageIndex+1,0,a),this["goto"](this.currentPageIndex+1)},this.createByCopy=function(){this.saveCurrent(),this.create(this.pages[this.currentPageIndex])},this.createNew=function(){this.saveCurrent(),this.create(a.exportOneJSON(h.$parent.paper,!0))},this.clearPage=function(){h.$parent.unfocus();var a=[];h.$parent.paper.forEach(function(b){!b.ft||b.background||b.tmpClone||a.push(b)});for(var b=0;b<a.length;++b)c.remove(a[b])},this.deletePage=function(){this.pages.splice(this.currentPageIndex,1),this.pngPages.splice(this.currentPageIndex,1),this.currentPageIndex=this.currentPageIndex<=0?0:this.currentPageIndex-1,this["goto"](this.currentPageIndex)},g.$inject=["$scope","hPages"],this.exportGIF=function(b){if(!(this.pages.length<=1)){this.saveCurrent();var c=this;e.show({controller:g,templateUrl:"views/gifsettings.html",parent:angular.element(document.body),targetEvent:b,clickOutsideToClose:!0,locals:{}}).then(function(){h.$parent.exportGIFRunning=!0,a.exportManyGIF(c.pngPages,"TheCosmicArtifacesOfHirayama.gif","canvas",c.gifWidth,c.gifWidth*constants.H/constants.W,c.gifInterval,function(){h.$parent.exportGIFRunning=!1})},function(){f.debug("Cancel")})}},{init:this.init,pages:this.pages,pngPages:this.pngPages,currentPageIndex:this.currentPageIndex,gifInterval:this.gifInterval,gifWidth:this.gifWidth,saveCurrent:this.saveCurrent,"goto":this["goto"],create:this.create,"delete":this.deletePage,next:this.next,prev:this.prev,createByCopy:this.createByCopy,createNew:this.createNew,exportGIF:this.exportGIF,clearPage:this.clearPage}}]);