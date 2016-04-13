/**
 * ${webname!}
 * @name Pop弹出层
 * @description 功能模块
 * @date 2014-0-03
 * @version $V1.0$
 */
define(function(require, exports, module) {
	//引入依赖函数
	require('jquery');
	$.fn.extend({
		pop: function(value) {
			var o = {
				bBefore: true, 		//是否允许触发弹出层
				sTitle: "", 		//弹出层标题
				bAutoClose:false,	//是否自动关闭
				iCloseTime:3,		//几秒关闭
				iWidth: "", 		//宽度
				iHeight: "", 		//高度
				iSrc: "", 			//iframe地址
				sContent: "", 		//不是iframe,采用html输出
				bShade: true, 		//是否有遮罩
				oTrigger: "", 		//触发弹出的对象(用于回调函数取对象)
				bHideClose:true,	//以删除的方式关闭，否则为隐藏
				bShadeClose: true,	//是否点遮罩关闭
				bNull:true,			//是否事件没绑定直接弹出
				fnInit: "",			//弹出前触发函数
				fnAfterInit:"",		//弹出后触发函数
				fnClose: ""			//关闭触发函数
			}
			o = $.extend(o, value);
			var oThis = $(this); //触发弹出层的元素
			if (o.bBefore) {
				var oPop, 	//弹出窗对象
					oShade, //遮罩元素对象
					oClose; //关闭按钮对象
				function fnShade() { //判断点遮罩是否关闭
					if (o.bShadeClose) {
						oShade.bind("click", function() {
							oPop.remove();
							o.bShade && oShade.remove();
							o.fnClose && o.fnClose();
						});
					}
				}
				function fnPop() {
					var sHtmlPop = "";
					if (o.fnInit) {
						o.bBefore = (o.fnInit)();
						if(!o.bBefore){
							return false;
						}
					}
					sHtmlPop += '<div id="qui_pop" class="qui_pop">';
					if (o.sTitle) {
						sHtmlPop += '<div class="tit clearfix">';
						sHtmlPop += '<h4>'+o.sTitle+'</h4>';
						if (o.bAutoClose) {
							sHtmlPop += '<span>( <em id="popCloseTime">'+o.iCloseTime+'</em> 秒后自动关闭)</span>';
						}
						sHtmlPop += '<a href="javascript:;" title="关闭" id="pop_close"></a>';
						sHtmlPop += '</div>';
					}
					sHtmlPop += '<div class="conts"></div>';
					sHtmlPop += '</div>';
					if (o.bHideClose) {
						if ($("#qui_pop").length) {
							$("#qui_pop").show();
							$("#qui_shade").show();
							return false;
						}
					}
					$("#qui_pop,#qui_shade").remove();
					$("body").append(sHtmlPop);
					oPop = $("#qui_pop");
					oClose = $("#pop_close");
					if (o.iWidth) {
						oPop.css({
							width: o.iWidth,
							marginLeft: -o.iWidth / 2
						});
					}
					if (o.iHeight) {
						oPop.css({
							height: o.iHeight,
							marginTop: -o.iHeight / 2
						});
					}
					//是否是iframe弹出窗
					if (o.iSrc) {
						oPop.find(".conts").append('<iframe src="" frameborder="0"></iframe>');
						oPop.find("iframe")
							.css({
								minHeight: o.sTitle ?parseInt(oPop.height())-50:parseInt(oPop.height())
							})
							.attr("src", o.iSrc);
					} else {
						oPop.find(".conts")
							.append(o.sContent)
							.css({
								minHeight: o.sTitle ?parseInt(oPop.height())-50:parseInt(oPop.height())
							});
					}
					//是否要遮罩
					if (o.bShade) {
						var sShade = '<div id="qui_shade" class="qui_shade"></div>';
						$("body").append(sShade);
						oShade = $("#qui_shade");
						oShade.css({
							"opacity": 0.4
						});
						fnShade();
					}
					//ie6的滚动定位
					if ($.browser.version == "6.0") {
						oPop.css("position", "absolute").fixed({
							iTop: oPop.offset().top,
							fnAdditional: function() {
								o.bShade && oShade.css({
									"position": "absolute",
									"width": $("body").width(),
									"height": $("body").height()
								});
							}
						});
					}
					oClose.bind("click", function() {
						if(o.bHideClose){
							oPop.hide();
							o.bShade && oShade.hide();
						}else{
							oPop.remove();
							o.bShade && oShade.remove();
						}
						o.fnClose &&  o.fnClose();
					});
					o.fnAfterInit && o.fnAfterInit();
					//自动关闭
					if(o.bAutoClose){
						setInterval(function() {
							o.iCloseTime--;
							if (o.iCloseTime > 0) {
								$("#popCloseTime").html(o.iCloseTime);
							} else {
								oClose.click();
							}
						}, 1000);
					}
				}
				if (oThis[0] || !o.bNull) {
					oThis.bind("click", function() {
						o.oTrigger = $(this);
						fnPop();
					});
				} else {
					fnPop();
				}
			}
		}
	});
});