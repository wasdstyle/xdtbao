
$(function() {
	/**兼容placeholder*/
		function isPlaceholder(){  
		    var input = document.createElement('input');  
		    return 'placeholder' in input;  
		}  
		  
		if (!isPlaceholder()) {//不支持placeholder 用jquery来完成  
		    $(document).ready(function() {  
		        if(!isPlaceholder()){  
		            $("input").not("#inviter").each(//把input绑定事件 排除inviter框  
		                function(){  
		                    if($(this).val()=="" && $(this).attr("placeholder")!=""){  
		                        $(this).val($(this).attr("placeholder"));  
		                        $(this).focus(function(){  
		                            if($(this).val()==$(this).attr("placeholder")) $(this).val("");  
		                        });  
		                        $(this).blur(function(){  
		                            if($(this).val()=="") $(this).val($(this).attr("placeholder"));  
		                        });  
		                    }  
		            });  
		            //对inviter框的特殊处理1.创建一个text框 2获取焦点和失去焦点的时候切换  
		            var pwdField    = $("#inviter");  
		            var pwdVal      = pwdField.attr('placeholder');  
		            pwdField.after('<input id="inviter1" type="text" value='+pwdVal+' autocomplete="off" />');  
		            var pwdPlaceholder = $('#inviter1');  
		            pwdPlaceholder.show();  
		            pwdField.hide();  
		              
		            pwdPlaceholder.focus(function(){  
		                pwdPlaceholder.hide();  
		                pwdField.show();  
		                pwdField.focus();  
		            });  
		              
		            pwdField.blur(function(){  
		                if(pwdField.val() == '') {  
		                    pwdPlaceholder.show();  
		                    pwdField.hide();  
		                }  
		            });  
		              
		        }  
		    });  
		      
		}  
		/* 键盘输入时，提示文字隐藏 */
	$('.step-cont1 ul li input').each(function() {
		if ($.browser.msie) {
			this.onpropertychange = function() {
				if (this.value) {
					$(this).siblings('label').hide();
				}
			};
		} else {
			this.addEventListener('input', function() {
				$(this).siblings('label').hide();
			}, false);
		}
	});

	/* 失去焦点是判断值是否为空 */
	$('.step-cont1 ul li input').blur(function() {
		if (!$(this).val()) {
			$(this).siblings('label').show();
		}
	});
	/*短信验证码*/
	$('#getvaliCode').live('click', function() {
			var self = this;
			var countDown = parseInt($('#count-down').val());
			
			if(!$('#phone').val()) {
				infoDialog('请先输入手机号码！');
				return false;
			}else if(!$('#validcode').val()){
				errorDialog('请先输入验证码！');
				validcodeStatus = 0;
				return false;
			}
			else if(phoneStatus === 1 && validcodeStatus===1) {
				$.ajax({
					url     : "/user/phoneaccess.html?mobile=" + $('#phone').val() + '&phone_type=' + 1,
					type    : 'post',
					cache   : false,
					dataType: 'json',
					data    : {name: $('#phone').val()},
					// 重新发送倒计时
					success: function(data){
						$(self).attr({id: 'resend-time'}).text(countDown + '秒后重新发送');
						timer = setInterval(function() {
							countDown--;
							if(countDown) {
								$(self).text(countDown + '秒后重新发送');
							}else {
								clearInterval(timer);
								countDown = parseInt($('#count-down').val());
								$(self).attr({id: 'getvaliCode'}).text('获取校验码');
							}
						}, 1000);
					}
				});
			}
		});

	/* 表单校验状态的初始值：0表示校验不通过，1表示校验通过 */
	var emailStatus     = 1;
	var usernameStatus  = 0;		
	var passwordStatus  = 0;
	var conPwdStatus    = 0;
	var realnameStatus  = 1;//非必填项，不可以修改
	var phoneStatus     = 0;//非必填项，不可以修改
	var inviterStatus	= 1;//非必填项，不可以修改
	var validcodeStatus = 0;
	var phonecodeStatus = 0;


	/* 提示框初始文字和错误提示文字 */
	var tip = {
		emailInit         : '',
		emailNull         : '<img src="' + themeDir + '/bg/icon-error.png">' + '邮箱号不能为空！',
		emailStyleError   : '<img src="' + themeDir + '/bg/icon-error.png">' + '邮箱号格式不正确！',
		emailUsed         : '<img src="' + themeDir + '/bg/icon-error.png">' + '该邮箱号已被注册！',
		
		usernameInit      : '',
		usernameNull      : '<img src="' + themeDir + '/bg/icon-error.png">' + '用户名不能为空！',
		usernameStyleError: '<img src="' + themeDir + '/bg/icon-error.png">' + '用户名格式不正确！',
		usernameLength    : '<img src="' + themeDir + '/bg/icon-error.png">' + '用户名长度必须是4~15位，中文2~6位！',
		usernameExist     : '<img src="' + themeDir + '/bg/icon-error.png">' + '此用户名已被注册了！',
		
		passwordInit      : '',
		passwordNull      : '<img src="' + themeDir + '/bg/icon-error.png">' + '密码不能为空！',
		passwordLength    : '<img src="' + themeDir + '/bg/icon-error.png">' + '密码长度必须是8~16位！',
		passwordSimple    : '<img src="' + themeDir + '/bg/icon-error.png">' + '不能使用纯数字或纯字母作为密码！',
		
		conPwdInit        : '',
		twoPwdNotSame     : '<img src="' + themeDir + '/bg/icon-error.png">' + '两次输入的密码不一致！',
		conPwdPlease      : '<img src="' + themeDir + '/bg/icon-error.png">' + '请再次输入密码，确保输入的密码和您需要的一致！',
		pwdError		  : '<img src="' + themeDir + '/bg/icon-error.png">' + '密码填写不合法！',

		realNameInit      : ''	,
		// realNameNull      : '<img src="' + themeDir + '/bg/icon-error.png">' + '真实姓名不能为空！',
		realNameLength    : '<img src="' + themeDir + '/bg/icon-error.png">' + '真实姓名必须是2~8位中文！',
		realNameChinese   : '<img src="' + themeDir + '/bg/icon-error.png">' + '真实姓名只能有中文字符！',
		
		phoneInit         : '',
		phoneStyleError   : '<img src="' + themeDir + '/bg/icon-error.png">' + '手机号码格式不正确！',
		phoneStyleNull    : '<img src="' + themeDir + '/bg/icon-error.png">' + '手机号码不能为空',
		phoneExist        : '<img src="' + themeDir + '/bg/icon-error.png">' + '该手机号码已被使用！',

		validStyleError   : '<img src="' + themeDir + '/bg/icon-error.png">' + '验证码不正确',

		conPhoneInit 		 : '',
		conPhoneNull  		 : '<img src="' + themeDir + '/bg/icon-error.png">' + '短信验证码不能为空！',
		conPhoneStyleError   : '<img src="' + themeDir + '/bg/icon-error.png">' + '短信验证码不正确',

		
		inviterInit       : '',
		inviterNotExist   : '<img src="' + themeDir + '/bg/icon-error.png">' + '邀请人不存在！',

		formError		  : '请把页面中不能为空或不合法的数据填写正确后再提交！'
	}
	
	$LAB.script(themeDir + '/plugin/mail-auto-complete.js')
		.wait(function() {
			/* 输入邮箱时自动补全 */ 
			$('#email').mailAutoComplete({
				left: 90,
				top: 34
			});
		})
		.script(themeDir + '/plugin/input-tooltip.js')
		.wait(function() {
			/* 输入框对应的提示框生成 */
			// 提示框相对于输入框的位置position: horizonal(默认), vertical
			// 提示框相对于输入框的水平偏移left，垂直偏移top

			$('#email').toolTip({text: tip.emailInit, left: 90});
			$('#username').toolTip({text: tip.usernameInit, left: -700});
			$('#password').toolTip({text: tip.passwordInit, left: -700});
			$('#con-pwd').toolTip({text: tip.conPwdInit, left: -700});
			$('#realname').toolTip({text: tip.realNameInit, left: -700});
			$('#phone').toolTip({text: tip.phoneInit, left: -700});
			$('#phoneCode').toolTip({text: tip.conPhoneInit, left: -700});
			$('#inviter').toolTip({text: tip.inviterInit, left: -700});
		});
	
	
	/* 邮箱校验 */
	$("#email").focus(function(){
		$(this).toolTipInit(tip.emailInit);
	}).blur(function(){
		var $self = $(this);
		var emailVal = $self.val();
		var emailReg = /^(\w)+(\.\w+)*@(\w)+(\.[a-zA-Z]{2,3})$/;
		// 邮箱号是否为空
		if(!emailVal) {
			$self.toolTipError(tip.emailNull);
			emailStatus = 0;
			return false;
		// 邮箱号格式是否正确
		}else if(!emailReg.test(emailVal)) {
			$self.toolTipError(tip.emailStyleError);
			emailStatus = 0;
			return false;
	    }else{
	        //验证该邮箱号是否已被注册
	        $.get(
	        	'/user/checkEmail.html',
	        	{email:emailVal}, 
	        	function(result){
	                if(result == true) {
						emailStatus = 1;
						$self.toolTipHide();
	                }else{
	                	$self.toolTipError(tip.emailUsed);
						emailStatus = 0;
	                }
	            }
	        );
	    }
	});


	/* 用户名校验 */
	$('#username').focus(function(){
		$(this).toolTipInit(tip.usernameInit);
	}).blur(function(){
		var $self = $(this);
		var usernameVal = $self.val();
		var usernameLen = usernameVal.length;
		var regExp = /^(\w*|[\u4e00-\u9fff]*)$/;
		var regExpCn = /^\w*$/;
		// 用户名是否为空
		if(!usernameLen) {
			$self.toolTipError(tip.usernameNull);
			usernameStatus = 0;
			return false;
		// 用户名长度是否符合要求
		}else if(regExp.test(usernameVal)) {
			// 用户名是字母加数字
			if(regExpCn.test(usernameVal)) {
				if(usernameLen < 4 || usernameLen > 15) {
					$self.toolTipError(tip.usernameLength);
					usernameStatus = 0;
					return false;
				}
			// 用户名是全中文
			}else {
				if(usernameLen < 2 || usernameLen > 6) {
					$self.toolTipError(tip.usernameLength);
					usernameStatus = 0;
					return false;
				}
			}
			//判断用户名是否被注册过
			$.get(
				'/user/checkUsername.html',
				{username: usernameVal},
				function (result){
					if(result == true){
						$self.toolTipHide();
						usernameStatus = 1;
					}else{
						$self.toolTipError(tip.usernameExist);
						usernameStatus = 0;
					}
				}
			);
		// 用户名不是字母加数字的格式，也不是全中文的格式，就是不合法的用户名
		}else {
			$self.toolTipError(tip.usernameStyleError);
			usernameStatus = 0;
		}
	});


	/* 密码校验 */
	$('#password').focus(function(){
		$(this).toolTipInit(tip.passwordInit);
	}).blur(function(){
		var pwdVal = $(this).val();
		var conPwdVal = $('#con-pwd').val();
		var regExp = /(^[\d]+$)|(^[a-zA-Z]+$)/;
		// 密码为空
		if(!pwdVal) {
			$(this).toolTipError(tip.passwordNull);
			passwordStatus = 0;
			return false;
		// 密码长度不符合要求
		}else if(pwdVal.length < 8 || pwdVal.length > 16) {
			$(this).toolTipError(tip.passwordLength);
			passwordStatus = 0;
			return false;
		// 密码为纯数字或纯密码
		}else if(regExp.test(pwdVal)){
			$(this).toolTipError(tip.passwordSimple);
			passwordStatus = 0;
			if(conPwdVal) {
				$('#con-pwd').toolTipError(tip.pwdError);
				conPwdStatus = 0;
			}
			return false;
		// 确认密码为空
		}else if(!conPwdVal) {
			$(this).toolTipHide();
			passwordStatus = 1;
		// 确认密码不为空，确认密码不等于密码
		}else if(conPwdVal && conPwdVal !== pwdVal) {
			$(this).toolTipHide();
			passwordStatus = 1;
			$('#con-pwd').toolTipError(tip.twoPwdNotSame);
			conPwdStatus = 0;
		}else if(conPwdVal && conPwdVal === pwdVal){
			$(this).toolTipHide();
			passwordStatus = 1;
			$('#con-pwd').toolTipHide();
			conPwdStatus = 1;
		}
	});


	/* 确认密码校验 */
	$('#con-pwd').focus(function(){
		var conPwdVal = $(this).val();
		var pwdVal = $('#password').val();
		if(passwordStatus) {
			$(this).toolTipInit(tip.conPwdInit);
		}
	}).blur(function(){
		var pwdVal = $('#password').val();
		var conPwdVal = $(this).val();
		// 密码不合法
		if(!passwordStatus){
			$(this).toolTipError(tip.pwdError);
			conPwdStatus = 0;
			return false;
		// 密码合法
		}else{
			if(!conPwdVal) {
				$(this).toolTipError(tip.conPwdPlease);
				conPwdStatus = 0;
				return false;
			// 确认密码不等于密码
			}else if(conPwdVal !== pwdVal){
				$(this).toolTipError(tip.twoPwdNotSame);
				conPwdStatus = 0;
				return false;
			// 确认密码等于密码
			}else{
				$(this).toolTipHide();
				conPwdStatus = 1
			}
		}
	});	

		
	/* 真实姓名校验 */
	$('#realname').focus(function(){
	    $(this).toolTipInit(tip.realNameInit);
	}).blur(function(){
		var realNameVal = $(this).val();
		var regExp = /^[\u4e00-\u9fff]+$/;
		// 判断输入的姓名是否是中文
		if(realNameVal) {
			if(regExp.test(realNameVal)) {
				// 真实姓名的长度是否符合要求
				if(realNameVal.length < 2 || realNameVal.length > 8) {
					$(this).toolTipError(tip.realNameLength);
					realnameStatus = 0;
					return false;
				}else {
					$(this).toolTipHide();
					realnameStatus = 1;
				}
			}else{
				$(this).toolTipError(tip.realNameChinese);
				realnameStatus = 0;
			}
		}
	});

		
	/* 手机号码校验 */
	$('#phone').focus(function(){
		$(this).toolTipInit(tip.phoneInit);
	}).blur(function(){
		var $self = $(this);
		var regExp =  /^(13[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(15[0-35-9][0-9]{8})$/;
		var phoneVal = $self.val();
		if(phoneVal) {
			// 手机号码格式是否正确
			if(!regExp.test(phoneVal)) {
				$self.toolTipError(tip.phoneStyleError);
				phoneStatus = 0;
				return false;
			// 验证该手机号码是否被使用过
			}else {
				$.get(
					'/user/checkPhone.html',
					{ phone:phoneVal},
					function(json){
		            	if(json.result == 'true') {
			            	$self.toolTipHide();
							phoneStatus = 1;
			            }else{
			            	$self.toolTipError(tip.phoneExist);
							phoneStatus = 0;
			            }
		        	}
		    	);
			}
		}else {
			$self.toolTipError(tip.phoneStyleNull);
			phoneStatus = 1;
		}
	});



	/* 邀请人用户名校验 */
	$('#inviter').focus(function() {
		$(this).toolTipInit(tip.inviterInit);
	}).blur(function() {
		var $self = $(this);
		var inviterVal = $('#inviter').val();
		if(inviterVal) {
			$.get(
				'checkUsername.html',
				{username:inviterVal},
				function (result){
				    if (result == true){
				    	//邀请人不存在
				    	$self.toolTipError(tip.inviterNotExist);
				    	inviterStatus = 0;
				    	return false;
					}else{
						//可以注册
						$self.toolTipHide();
						inviterStatus = 1;
					}
				}
			);
		}else {
			inviterStatus = 1;
		}
	});


	/* 验证码校验 */
	$('#validcode').focus(function() {
	}).blur(function() {
		var $self = $(this);
		var validVal = $self.val();
		if(validVal){
			$.get(
				'/user/validCode.html',
				{valid:validVal},
				function(result){
	            	if(result.result == true) {
	            		$('#validCodeHidden').val(result.data);
	            		$(this).removeAttr('id');
						validcodeStatus = 1;
		            }else{
		            	errorDialog("验证码错误！");
						validcodeStatus = 0;
						$('#validcode-img').trigger('click')
		        }
		    }
		 )
		}

	});
	/* 确认注册-表单校验 */
	$("#btn-register").click(function(){
		var formStatus = emailStatus * usernameStatus * passwordStatus * conPwdStatus * realnameStatus * phoneStatus * inviterStatus;
		if(formStatus) {
			if(!$('.protocol :checkbox').attr('checked')) {
				errorDialog('请阅读并同意服务协议！');
				return false;
			}else {
        			var valiPhone=$("#phoneCode").val();
        				$.get('/user/validPhoneCode.html',{valiPhone:valiPhone},
        						function(result){
        				    if(result.result==true){
        				    	$('#form-register').submit();
        				    	$('.register-step ul li:eq(1)').addClass('active');
		        				$('.current-step').width($('.current-step').width() * 2);
        				    }else{
        				    	errorDialog("手机验证码错误！");
        				    	$("#validcode-img").click();
        				    	$("#validcode").val('');
        				    }
        			     });

			}
		}else{
			$('#form-register ul li input').each(function() {
				$(this).focus().blur();
			});
		}
	});	

	/* 注册协议弹窗 */
	$('.protocol a').click(function() {
		art.dialog.open('/protocol.html', {
			width : 1010,
			height: 500,
			resize: false,
			fixed : true
		});
	});
});

$('#btn-submit-email').click(function() {
	if(!$('#email-validcode').val()) {
		errorDialog('校验码不能为空！');
		$('#email-validcode').focus();
		return false;
	}else {
		$('#form-register-email').ajaxSubmit(
			function(msg) {
				if(msg != null){
					if(msg.data.match(/(验证码不正确|验证码已过期)/)) {
						infoDialog(msg.data);
						return false;
					}else if(msg.data.match('验证成功')) {
						$('.wp-form-register .step-cont1').css('display','none');
						$('.wp-form-register .step-cont2').css('display','none');
						$('.wp-form-register .step-cont3').css('display','block');
						
						$('.register-step ul li:eq(2)').addClass('active');
        				$('.current-step').width($('.current-step').width() * 1.5);
        				var sTime=5;
        				var timer =setInterval(function(){
        					sTime--;
                        if(sTime>0){
                          $('.djs').html(sTime);

                        }else{
                        	clearInterval(timer);
                        	window.location.href="/member/index.html"
                        }
        				},1000)
						
					}
				}
			})
	}
});

//重新获取验证码
$('#btn-email-validcode').live('click', function() {
	var countDown = parseInt($('#email_count-down').val());
	var self = this;
	$.ajax({
		url     : '/user/getEmailCode.html',
		type    : 'post',
		dataType: 'json',
		cache   : false,
		data    : {email: $("#emailCheck").val(),userid: $("#userid").val()},
		success : function(msg){
			if(msg.data.match('重新获取')){
				$('.email-prompt:visible').text(msg.data);
				setTimeout(function() {
					$('.email-prompt:visible').text('');
				}, 3000);
				return false;
			}else if(msg.data.match('已发出')){
				$(self).removeClass('btn-email-validcode').addClass('resend-time').text(countDown + '秒后重新发送');
				timer = setInterval(function() {
					countDown--;
					if(countDown) {
						$(self).text(countDown + '秒后重新发送');
					}else {
						clearInterval(timer);
						countDown = parseInt($('#count-down').val());
						$(self).removeClass('resend-time').addClass('btn-email-validcode').text('获取校验码');
					}
				}, 1000);
			}else{
				$('.email-prompt:visible').text(msg.data);
			}
	   }
	});
});

function loginEmail(emailValue){
	var loginEmailBox = $("#loginEmail");
	var loginEmailValue = "";
	emailValue = (emailValue.split("@"))[1];
	switch (emailValue)
	{
		case "qq.com":
			loginEmailValue = "mail.qq.com";
			break;
		case "gmail.com":
			loginEmailValue = "mail.google.com";
			break;
		case "126.com":
			loginEmailValue = "mail.126.com";
			break;
		case "163.com":
			loginEmailValue = "mail.163.com";
			break;
		case "hotmail.com":
			loginEmailValue = "login.live.com";
			break;
		case "yahoo.com":
			loginEmailValue = "login.yahoo.com";
			break;
		case "live.com":
			loginEmailValue = "login.live.com";
			break;
		case "sohu.com":
			loginEmailValue = "mail.sohu.com";
			break;
		case "sina.com":
			loginEmailValue = "mail.sina.com";
			break;	
	}
	loginEmailBox.attr("href","http://"+loginEmailValue);
}



