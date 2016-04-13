$(function() {
	/* 左侧栏目菜单加上对应的高度样式 */
	$('.category-menu ul li a[nid = "' + getQueryString('nid') + '"]').parent().addClass('current');

	/* 设置右侧内容高度 */
	$('.article-list').outerHeight() < $('.category-menu').outerHeight() ? $('.article-list').height($('.category-menu').outerHeight()) : '';
	$('.article-cont').outerHeight() < $('.category-menu').outerHeight() ? $('.article-cont').height($('.category-menu').outerHeight()) : '';

	/* 图片尺寸大于content容器尺寸时，缩小图片 */
	var $articleImg = $('.article-cont img'); 
	$articleImg.each(function() {
	    if(this.width > $('.article-cont .content').width()) {
	        this.width = $('.article-cont .content').width();
	    }
	});

	/* 文章列表截取内容摘要 */
	$('.title-summary').each(function() {
		var summaryText = $('<p>' + $(this).children('#content').html().replace(/&nbsp\;/g,'') + '</p>').text();
		summaryText = summaryText.length > 70 ? summaryText.substring(0, 70) + '......' : summaryText;
		$(this).children('.summary').html(summaryText);
		$(this).children('#content').remove();
	});
});
