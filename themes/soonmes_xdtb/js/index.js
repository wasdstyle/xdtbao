loadCss(themeDir + '/plugin/poshytip-1.2/src/tip-twitter/tip-twitter.css');
$LAB.script(themeDir + '/plugin/poshytip-1.2/src/jquery.poshytip.min.js')
	.wait(function() {
		/* 标种icon悬浮提示框 */
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
	})
	.script(themeDir + '/plugin/jquery.easing-1.3.min.js')
	.script(themeDir + '/js/banner-change.js')
	.wait(function() {
		/* 全屏轮播切换 */
		$('.banner').bannerPlay({
			bannerItem       : '.wp-banner li',	// 切换的轮播图片
			changeBtnItem    : '.btn-change li',// 切换按钮
			playStyle        : 'slide',			// 播放模式：淡入淡出/滑动:fade/slide
			showChangeBtn	 : true,			// 显示prev,next切换按钮
			activeClass      : 'hover',			// 切换按钮激活(当前)的样式
			slideDirection   : 'horizonal',		// 滑动模式-滑动方向:horizonal/vertical
			easing           : 'swing',			// 动画效果(只对slide方式起作用):推荐
												// easeOutCubic/easeInOutExpo。
			fadeSpeed        : 1000,			// 淡入淡出-图片淡入淡出的速度-毫秒
			slideSpeed       : 500,				// 滑动模式-图片左右滑动的速度-毫秒
			autoPlayInterval : 5000				// 图片切换间隔-毫秒
		});
	});

/* 合作伙伴图片滚动 */
$('.wp-partner').listScroll({
	scrollList      : '.wp-partner ul',
	autoPlayInterval: 5000
});

/* 首页登录 */

$('.denglu').click(function() {
	validForm();
});

function validForm() {
	if(!$('#username').val()) {
		$("#loginForm ul li.error").html("用户名不能为空！").show();
		$('#username').focus();
		return false;
	}else if(!$('#password').val()) {
		$("#loginForm ul li.error").html("密码不能为空！").show();
		$('#password').focus();
		return false;
	}else if(!$('#validcode').val()) {
		$("#loginForm ul li.error").html("验证码不能为空！").show();
		$('#validcode').focus();
		return false;
	}else {
		$.get(
			'/user/validCode.html',
			{valid: $('#validcode').val()},
			function(result){
        	if(result.result == true) {
            	$('#validCodeHidden').val(result.data);
            	$('#loginForm').ajaxSubmit(function(data){
    				if(data.data != null){
    					if(data.data.match('member')) {
    						$(".show-error").hide();
    						window.location.reload();
    					}else{
    						$("#loginForm ul li.error").html(data.data).show();
    						$('.validcode-img').trigger('click');
    		            	$('#validcode').val('');
    						return false;
    					}
    				}else{
    					$("#loginForm ul li.error").html("该用户处于冻结状态，请联系管理员！").show();
						$('.validcode-img').trigger('click');
		            	$('#validcode').val('');
						return false;
    				}
    			})
            }else{
            	$("#loginForm ul li.error").html("验证码错误！").show();
            	$('.validcode-img').trigger('click');
            	$('#validcode').val('');
                return false;
            }
    });
	}
}


$(function(){
	$('.title-summary').each(function() {
		var summaryText = $('<p>' + $(this).children('#content').html().replace(/&nbsp\;/g,'') + '</p>').text();
		summaryText = summaryText.length > 19 ? summaryText.substring(0, 18) + '......' : summaryText;
		$(this).children('.summary').html(summaryText);
		$(this).children('#content').remove();
	});
	
	
	
	$(".index-invest-tit").changeTab({contentTab: '.list'});
})
