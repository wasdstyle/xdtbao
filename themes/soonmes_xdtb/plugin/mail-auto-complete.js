(function($){
	$.fn.extend({
		mailAutoComplete:function(option){
			var options = $.extend({
				top		: 0,
				left    : 0
			}, option);
			var $this    = $(this);
			var ddIndex  = 0;
			/*将邮箱列表添加到邮箱输入框的位置*/
			$this.focus(function() {
				if(!$('.mail-list').length) {
					var mailListArray = ['qq.com', '163.com', '126.com', 'yahoo.com', '139.com', 'yeah.net', '21cn.com', 'gmail.com', 'sina.com', 'sohu.com'];
					var mailList = '';
					for(var i = 0;i < mailListArray.length;i++) {
						mailList += '<dd email="@'+mailListArray[i]+'"></dd>';
					}
					mailList = '<dl class="mail-list" style="width:' + ($this.outerWidth() - 2) + 'px!important;left: ' + options.left + 'px!important;top:' + options.top + 'px!important;">'+ mailList +'</dl>';
					$this.parent().append(mailList);
				}
			});

			/*邮箱输入框的值改变时*/
			$this.keyup(function(event){
				// esc键
				if(event.which == 27 ){
					hideList();
					return false;
				}
				// 回车键
				if(event.which != 13) {
					valChange();	
				}
			/*邮箱输入框的按下tab键失去焦点时隐藏列表*/
			}).blur(function() {
				setTimeout(function() {
					$('.mail-list').hide();
				},150);
			});


			/*点击邮箱输入框以外的区域隐藏下拉层*/
			$(document).click(function(event){
				if(event.target.id == $this.attr('id') || event.target.className == $this.attr('class')){

				}else if($(event.target).is('dd') && event.target.className == 'active-mail'){
					hideList();
					mailInputOk();
				}else{
					hideList();
				}
			});
			

			/*按键盘的上下移动li的背景色*/
			$this.keydown(function(event){
				// 左、上
				if(event.which == 38){
					event.preventDefault();
					keyChange('up')
				// 右、下
				}else if(event.which == 40){
					keyChange()
				//回车----传值
				}else if(event.which == 13 && $('.mail-list').is(':visible')){ 
					var liVal = $('.mail-list').children(':visible').eq(ddIndex).text();
					$this.val(liVal);
					ddIndex = 0;
					hideList();
					mailInputOk();
				}
			});

			/*隐藏下拉层*/
			function hideList(){
				$('.mail-list').hide();
			}
			
			/*按回车键输入值后跳转到后面的输入框*/
			function mailInputOk(){
				var i = $this.parents('form').find('input').index($this);
				$this.parents('form').find('input').eq(i+1).focus();
			}

			/*按键盘方向键执行的函数*/
			function keyChange(up){
				if(up == 'up'){
					if(ddIndex == 0){
						ddIndex = $('.mail-list').children(':visible').length-1;
					}else{
						ddIndex--;
					}
				}else{
					if(ddIndex ==  $('.mail-list').children(':visible').length-1){
						ddIndex = 0;
					}else{
						ddIndex++;
					}
				}
				$('.mail-list').children(':visible').eq(ddIndex).addClass('active-mail').siblings().removeClass();	
			}
			
			/*值发生改变时*/
			function valChange(){
				var tex = $this.val();	//输入框的值
				var fronts = '';		//存放含有“@”之前的字符串
				var af = /@/;
				//有“@”之后的字符串,注意正则字面量方法，是不能用变量的。所以这里用的是new方式。
				var regMail = new RegExp(tex.substring(tex.indexOf('@')));

				/*让提示层显示，并对里面的li遍历*/
				if(!$this.val()){
					ddIndex = 0;
					$('.mail-list').children().show();
					hideList();
					$this.removeAttr('style').addClass('shadow');
				}else{
					$('.mail-list').show().children().each(function(index) {
						$this.css({'box-shadow':'none'});
						var itemAttr = $(this).attr('email');
						//当输入的值有“@”的时候
						if(af.test(tex)){
							//如果含有“@”就截取输入框这个符号之前的字符串
							fronts = tex.substring(tex.indexOf('@'),0);
							$(this).text(fronts+itemAttr);
							//判断输入的值“@”之后的值，是否含有和li的email类似的属性
							if(regMail.test($(this).attr('email'))){
								$(this).show();
							}else{
								$(this).hide();
							}
						//当输入的值没有“@”的时候	
						}else{
							$(this).text(tex+itemAttr);
						}

						/*鼠标悬停li的背景色*/
						$(this).hover(function(){
							//获取当前鼠标悬停时的li索引值;
							ddIndex = $(this).index();
							$(this).addClass('active-mail').siblings().removeClass();
							$this.val($(this).text());
						},function() {
							
						});
	                });
				}

				// 如果ddIndex未改变过给列表中可见的第一个邮箱加上高亮样式
				if(!ddIndex) {
					$('.mail-list').children(':visible').first().addClass('active-mail').siblings().removeClass();
				}

				// 如果邮箱列表没有一个显示，外围的ul隐藏(防止露出边框)
				if(!$('.mail-list').children(':visible').length) {
					$('.mail-list').hide();
				}
			}
		}	
	})	
})(jQuery)