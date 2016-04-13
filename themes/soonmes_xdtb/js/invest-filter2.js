loadCss(themeDir + '/plugin/poshytip-1.2/src/tip-twitter/tip-twitter.css');
$LAB.script(themeDir + '/plugin/poshytip-1.2/src/jquery.poshytip.min.js')
	.wait(function() {
		/*标种icon悬浮提示框*/
		$('.icon-bid-type').poshytip({
			className    : 'tip-twitter',
			showTimeout  : 1,
			alignTo      : 'target',
			alignX       : 'center',
			offsetY      : 5,
			allowTipHover: false,
			fade         : false,
			slide        : false
		});
	})
	.script(themeDir + '/js/draw-process.js')
	.wait(function() {
		$('.process-bar').drawProcess({
			width        : 48,     		//进度条直径(canvas的宽度),
	        processWidth : 3,       	//进度条的粗细
	        processColor : '#00c938',  	//进度条扇形背景颜色(进度条主颜色)
	        textColor    : '#E46A3B',  	//进度条文字的颜色
	        textSize     : '8pt',   	//进度条文字的大小(单位pt)
	        textWeight   : 'bold',  	//进度条文字的粗细
	        textFamily   : 'Arial', 	//进度条文字的字体
	        drawSpeed    : 5        	//进度条绘制速度(2~10)
		});
	});

// 属性下拉列表hover时展开
$('.invest-filter dl dd').hover(function() {
    $(this).children('ul').show('blind',250);
},function() {
    $('.invest-filter dl dd ul').stop().hide();
});

// 所有属性列表
var attrList = ['status','sType','sApr','sLimit','sAccount'];

/*根据查找url中每一个参数的值，给对应的筛选属性加上current样式*/
$.each(attrList,function(index,val) {
	var $attrListItem = $('#'+val).children('li');
	var attrVal = getQueryString(val);

	$attrListItem.each(function() {
		var dataValue = $(this).attr('data-value');
		if(attrVal == null) {
			$(this).parents('dd').find('h2').text($attrListItem.first().text());
			return false;
		}else{
			if(dataValue == attrVal) {
				$(this).addClass('current');
				$(this).parents('dd').find('h2').text($(this).text());
			}
		} 
	});
});

/*遍历每一个属性列表，点击属性，跳转url*/
$('.attr-list ul').each(function(){
	var $attrListItem = $(this).children('li');
	// 如果没有选择任何筛选属性，属性列表中的第一个高亮
	if(!$attrListItem.filter('.current').length) {
		$attrListItem.first().addClass('current');
	}

	$attrListItem.click(function() {
		$(this).addClass('current').siblings().removeClass('current');
		var url = window.location.href;
		var argIndex = url.indexOf('?');
		// url中是否有参数
		if(argIndex < 0) {
			url = url  + '?' + joinUrl() + 'search=union';
		}else {
			url = url.substring(0,argIndex) + '?' + joinUrl() + 'search=union';
		}
		window.location.href = url;
	});
});

/*根据选中的属性，重新拼接url字符串*/
function joinUrl(){
	var urlStr = '';
	$.each(attrList, function(index, val) {
		var $attrListItem = $('#'+val).children('li');
		$attrListItem.each(function() {
			if($(this).hasClass('current')) {
				urlStr += val + '=' + $(this).attr('data-value') + '&';
			}
		});

	});
	return urlStr;
}

/*查找url中参数的值*/
function getQueryString(name){
	var reg=new  RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var r =window.location.search.substr(1).match(reg);
	if(r!=null)
		return  unescape(r[2]);
	return  null;
}
