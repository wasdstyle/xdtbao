loadCss(themeDir + '/plugin/poshytip-1.2/src/tip-twitter/tip-twitter.css');
$LAB.script(themeDir + '/plugin/poshytip-1.2/src/jquery.poshytip.min.js')
	.wait(function() {
		/*标种icon悬浮提示框*/
		$('.icon-bid').poshytip({
			className    : 'tip-twitter',
			showTimeout  : 1,
			alignTo      : 'target',
			alignX       : 'center',
			offsetY      : 5,
			allowTipHover: false,
			fade         : false,
			slide        : false
		});
	});
// 所有属性列表
var attrList = ['status','sType','sApr','sLimit','sAccount'];

/*根据查找url中每一个参数的值，给对应的筛选属性加上current样式*/
$.each(attrList,function(index,val) {
	var $attrListItem = $('#'+val).children('li');
	var attrVal = getQueryString(val);

	$attrListItem.each(function() {
		var dataValue = $(this).attr('data-value');
		if(dataValue == attrVal) {
			$(this).addClass('current');
		}
	});
});

/*遍历每一个属性列表，点击属性，跳转url*/
$('.filter-invest ul').each(function(){
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

/* 更多筛选条件 */
var filterItem = $('.filter-invest').children();
$('.more-filter a').click(function() {
	if($(this).hasClass('unfold')) {
		$('.filter-invest').animate({height:170}, 300);
		$(this).removeClass('unfold');
	}else {
		$('.filter-invest').animate({height:325}, 300);
		$(this).addClass('unfold');
	}
});
