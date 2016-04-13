$(function(){
//--------------------------------------------------【最新投资】
	var oHotBid = $("#newInvest ul"), 	//热门标列表
		bTime = "", 					//自动滚动开关
		iIndex = 0, 					//当前滚动编码
		iBidLength = oHotBid.children("li").length, 		//标的数量
		sHtml=oHotBid.html();
	/*滚动动画*/
	oHotBid.append(sHtml + sHtml)
		.hover(function() {
			clearInterval(bTime);
		}, function() {
			bTime = setInterval(function() {
				oHotBid.children("li").eq(iIndex).animate({
					"left": "+=246",
					"opacity": "0"
				}, 500, function() {
					oHotBid.animate({
						"margin-top": "-=47"
					}, function() {
						if (iIndex < iBidLength) {
							iIndex += 1
						} else {
							oHotBid.css("margin-top", "0")
								.children("li").css({
									"left": "0",
									"opacity": "1"
								});
							iIndex = 0;
						}
					});
				});
			}, 3000);
		}).mouseleave();
	/*日期倒计时*/
	function before(t) {
				   var d=parseInt(t/60/60/24);
				   var h=parseInt(t/60/60);
				   var m=parseInt(t/60);
				   var s=parseInt(t);
				    if(d>=1){
					    result = d+"天前";
					}
					else if(h>=1){
						result = h+"小时前";
					}
					else if(m>=1){
						result = m+"分钟前";
					}
					else{
						result = s+"秒前";
					}
					return result;
	}
	oHotBid.children("li").each(function(){
		var oTime=$(this).children('.time').html();
		var oTime1=$(this).children('.nowtime').html();
			sTime=(parseInt(oTime1)-parseInt(oTime))
			$(this).children('.time').html((before(sTime)));
	});
	
//--------------------------------------------------【理财风云榜】
	$("#ranking .cont li").each(function(){
		var oThis=$(this),
			oRank=oThis.find('figure'),
			iIndex=oThis.index()+1;
		if(iIndex<=3){
			oRank.addClass('ico'+iIndex);
		}else{
			oRank.html(iIndex);
		}
	});
});