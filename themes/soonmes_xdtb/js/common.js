(function($) {
	$.fn.extend({
		/*网站导航条二级菜单显示/隐藏*/
		showNavMenu: function(options) {
			var options = $.extend({
				navList   : '.nav li',
				secondMenu: '.second-menu'
			}, options);
			
			var $navList    = $(options.navList);
			var $secondMenu = $(options.secondMenu);
			$navList.hover(function() {
				var i = $(this).index();
				$(this).addClass('hover').siblings().removeClass('hover');
				$secondMenu.hide();
				$(this).children(options.secondMenu).show();
			},function() {
				$secondMenu.hide();
				$(this).removeClass('hover');
			});
		},

		/*选项卡菜单切换*/
		changeTab:function(options) {
			var options = $.extend({
				useStyle   : 'click',            //使用这个方法的方式：click/hover
				activeClass: 'active',           //当前被激活的选项卡列表的样式
				contentTab : '.content-tab'      //显示的选项卡内容				
			}, options);

			var useStyle    = options.useStyle;
			var activeClass = options.activeClass;
			var $contentTab = $(options.contentTab);

			$(this).children().each(function(i) {
			   $(this).bind(useStyle, function() {
					$(this).addClass(activeClass).siblings().removeClass(activeClass);
					$contentTab.eq(i).show().siblings(options.contentTab).hide(); 
			   });
			});
		},

		/*列表内容(图片)上下/左右滚动*/
		listScroll:function(options) {
			var options = $.extend({
				scrollList      : '.scroll-list',
				prevBtn         : '.prev',
				nextBtn         : '.next',
				direction       : 'horizonal',
				speed           : 300,
				autoPlay        : true,
				autoPlayInterval: 4000
			}, options);
			
			var $scrollList      = $(options.scrollList);
			var $prevBtn         = $(options.prevBtn);
			var $nextBtn         = $(options.nextBtn);
			var direction        = options.direction;
			var speed            = options.speed;
			var autoPlay         = options.autoPlay;
			var autoPlayInterval = options.autoPlayInterval;
			var itemWidth  = $scrollList.children('li').outerWidth(true);
			var itemHeight = $scrollList.children('li').outerHeight(true);

			$(this).css({position: 'relative'}); 
			$scrollList.css({position: 'absolute'});
			if(direction == 'vertical') {
				var showprevItem = function() {
					if(!$scrollList.is(':animated')) {
						$scrollList.find('li:last').clone().prependTo($scrollList);
						$scrollList.css({top: -itemHeight});
						$scrollList.animate({top: 0}, speed, function() {
							$scrollList.find('li:last').remove();
						});
					}
				};
				var showNextItem = function() {
					if(!$scrollList.is(':animated')) {
						$scrollList.find('li:first').clone().appendTo($scrollList);
						$scrollList.animate({top: -itemHeight}, speed, function() {
							$scrollList.css({top: 0});
							$scrollList.find('li:first').remove();
						});
					}
				};
			}else {
				// 根据列表中li的个数动态设置滚动列表的宽度
				$scrollList.css({width:($scrollList.children('li').length + 1) * itemWidth});
				var showprevItem = function() {
					if(!$scrollList.is(':animated')) {
						$scrollList.find('li:last').clone().prependTo($scrollList);
						$scrollList.css({left:-itemWidth});
						$scrollList.animate({left: 0},speed,function() {
							$scrollList.find('li:last').remove();
						});
					}
				};
				var showNextItem = function() {
					if(!$scrollList.is(':animated')) {
						$scrollList.find('li:first').clone().appendTo($scrollList);
						$scrollList.animate({left: -itemWidth}, speed, function() {
							$scrollList.css({left: 0});
							$scrollList.find('li:first').remove();
						});
					}
				};

				$prevBtn.click(function() {
					showprevItem();
				});

				$nextBtn.click(function() {
					showNextItem();
				});

				$(this).hover(function() {
					$prevBtn.fadeIn();
					$nextBtn.fadeIn();
				},function() {
					$prevBtn.fadeOut();
					$nextBtn.fadeOut();
				});
			}

			if(autoPlay) {
				listScrollTimer = setInterval(function() {
					showNextItem();
				}, autoPlayInterval);
				$(this).hover(function() {
					clearInterval(listScrollTimer);
				},function() {
					listScrollTimer = setInterval(function() {
						showNextItem();
					}, autoPlayInterval);
				});
			}
		}
	});
})(jQuery);

/*使footer置底的footer-blank空白占位盒子在视口大小发生改变时高度自适应*/
$(window).bind('resize click keyup',function() {
	var justAllEleHeight = $(window).height() - $('#footer').outerHeight(true);
	var allEleHeight = 0;
	$('#footer').prevAll('div').each(function() {
		if ($(this).is(':visible') && $(this).css('position') != 'absolute' && $(this).css('position') != 'fixed') {
			allEleHeight += $(this).outerHeight(true);
		}

	});

	if($('#footer-blank').length) {
		if (allEleHeight < justAllEleHeight) {
			var footerBlankHeight = $('#footer-blank').height() + (justAllEleHeight - allEleHeight);
			$('#footer-blank').animate({height:footerBlankHeight},200);
		}else if(allEleHeight > justAllEleHeight) {
			var footerBlankHeight = $('#footer-blank').height() - (allEleHeight - justAllEleHeight);
			$('#footer-blank').animate({height:footerBlankHeight}, 200);
		}
	}else {
		if (allEleHeight < justAllEleHeight) {
			$('#footer').before('<div id="footer-blank"></div>');
			$('#footer-blank').animate({height:justAllEleHeight - allEleHeight}).css({height:justAllEleHeight - allEleHeight});
		}
	}
});

$(function() {
	/*显示/隐藏客服窗口*/
	$('.service-5').hover(function() {
			$('.list-service1').stop(true,false).show('blind',{direction:'horizontal'},220);
		},function() {
			$('.list-service1').stop(true,false).hide('fade', 220);
		});
	// 判断客服qq是否在线，不在线的客服图标变成灰色
	// online是第三方js返回的数组，已经在footer.html中定义
	// 方法外层的$(function(){});不可删除
	if($('#online').length){
		for(var i = 0;i < online.length;i++) {
			if(!online[i]) {
				$('.list-service1 ul li').eq(i).addClass('offline').children().attr({title:'客服已离线，请留言！'});
			}
		}
	}
});

/*查找url中某个参数的值*/
function getQueryString(name){
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null)
		return  unescape(r[2]);
	return  null;
}

/*在页面中插入css文件*/
function loadCss(url){
	var styleSheet  = document.createElement('link');
	styleSheet.rel  = 'stylesheet';
	styleSheet.type = 'text/css';
	styleSheet.href = url;
	document.getElementsByTagName('head')[0].appendChild(styleSheet);
}

/* 自定义artDialog方法 */
function infoDialog(str) {
	$('head').append('<style id="aui-main-width">.aui_main{max-width: 300px!important;word-break: break-word!important;}</style>');
	art.dialog({
		content: str,
		icon   : 'info',
		okVal  : '确&nbsp;定',
		fixed  : true,
		lock   : true,
		opacity: 0,
		ok     : function() {},
		close  : function() {
			$('#aui-main-width').remove();
		}
	});
}

function okDialog(str) {
	$('head').append('<style id="aui-main-width">.aui_main{max-width: 300px!important;word-break: break-word!important;}</style>');
	art.dialog({
		content: str,
		icon   : 'succeed',
		okVal  : '确&nbsp;定',
		fixed  : true,
		lock   : true,
		opacity: 0,
		time   : 2,
		close  : function() {
			$('#aui-main-width').remove();
		}
	});
}

function errorDialog(str) {
	$('head').append('<style id="aui-main-width">.aui_main{max-width: 300px!important;word-break: break-word!important;}</style>');
	art.dialog({
		content: str,
		icon   : 'error',
		okVal  : '确&nbsp;定',
		fixed  : true,
		lock   : true,
		opacity: 0,
		time   : 2,
		close  : function() {
			$('#aui-main-width').remove();
		}
	});
}



/*输入框禁用空格*/
// 添加此属性的输入框在chrome31之后的版本中将无法输入中文，所以在下方的addEventListener方法中加入了浏览器判断
$('input[forbidspace="true"]').keyup(function(e) {
   if(e.which == 32) {
	   return false;
   }
});

/*输入框限制:只能输入数字*/
$('input[onlynumber="true"]').keypress(function(e) {
	// 需要排除在firefox下某些按键不起作用的异常
	if(e.which && e.which != 8 && !(e.which >= 48 && e.which <= 57)) {
	   return false;
	}
});

/*输入框限制:只能输入数字和小数点*/
$('input[numberpoint="true"]').bind({
	keypress: function(e) {
		// 需要排除在firefox下某些按键不起作用的异常
		if(e.which && e.which != 8 && !(e.which >= 48 && e.which <= 57 || e.which == 46)) {
		   return false;
		}

		// 如果输入了1个小数点，则不能输入第2个小数点
		if(e.which == 46 && this.value.match(/\./) && this.value.match(/\./).length >= 1) {
			return false;
		}
	},
	keyup: function(e) {
		// 限制小数点后面的位数
		if($(this).attr('decimal')) {
			// 根据decimal属性判断需要的小数位数
			var decimalLen = parseInt($(this).attr('decimal'));
			var pointIndex = this.value.indexOf('.');
			if(pointIndex !== -1 && this.value.substr(pointIndex).length > decimalLen) {
				this.value = this.value.substring(0, pointIndex) + '.' + this.value.substr(pointIndex + 1, decimalLen);
			}
		}
	}
});

$('input[type="text"]').each(function() {
    if($.browser.msie) {
        if($(this).attr('forbidspace') == 'true' || $(this).attr('onlynumber') == 'true' || $(this).attr('numberpoint') == 'true') {
            this.onpaste = function() {
                return false;
            }
        }
        $(this).keypress(function() {
            if($(this).attr('forbidspace') == 'true') {
                this.value = this.value.replace(/\s/g,'');
            }else if($(this).attr('onlynumber') == 'true') {
                this.value = this.value.replace(/\D/g,'');
            }else if($(this).attr('numberpoint') == 'true') {
                this.value = this.value.replace(/[^.\d]/g,'');
            }
        });
    }else {
        this.addEventListener('input', function() {
            if($(this).attr('forbidspace') == 'true' && !$.browser.webkit) {
                this.value = this.value.replace(/\s/g,'');
            }else if($(this).attr('onlynumber') == 'true') {
                this.value = this.value.replace(/\D/g,'');
            }else if($(this).attr('numberpoint') == 'true') {
                this.value = this.value.replace(/[^.\d]/g,'');
            }
        }, false);
    }
});

/*导航条样式设置*/
$('.nav').showNavMenu({navList:'.nav-list li', secondMenu:'.second-menu'});
$('.nav-list li').each(function() {
    if(!$(this).children('.second-menu').children().length) {
        $(this).find('.second-menu,.arrow').css({border:'none',display:'none'});
    }
});

$('.nav-list li').hover(function() {
    $(this).find(".arrow").css({'border-top-color':'#5dc2eb'});
},function() {
    $(this).find(".arrow").css({'border-top-color':'#787878'});
});

/*header微信和qq群显示/隐藏*/
$('#wechat, #qq-group').hover(function() {
	$('.layer-' + this.id).stop(true, true).show('drop', {direction:'up'},220);
}, function() {
	$('.layer-' + this.id).hide();
});

$("#back-top").click(function(){
    $('body,html').animate({scrollTop:0},1000);
    return false;
});

/*倒计时显示功能*/
function showRemainTime(){
	$(".endtime").each(function(){
	   var iDay,iHour,iMinute,iSecond,account;
	   var sDay="",sTime="";
	   var iTime=$(this).attr('data-time');
	   if (iTime >= 0){
			iDay = parseInt(iTime/3600/24);
			iHour = parseInt((iTime / 3600) % 24);
			iMinute = parseInt((iTime / 60) % 60);
			if (iDay > 0){
				sDay = iDay + "天";
			}
			sTime =sDay + iHour + "小时" + iMinute + "分钟";
			$(this).attr({'data-time': iTime - 1});
		}else{
		   sTime="<span style='color:red'>此标已过期！</span>";
		}
	   $(this).html(sTime);
	});
}
setInterval('showRemainTime()',1000);
