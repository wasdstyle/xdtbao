$(function() {
	$LAB.script(themeDir + '/plugin/input-tooltip.js')
		.script(themeDir + '/plugin/jquery.passwordStrength.js')
		.wait(function() {
			/* 密码强度判定 */
			$('#newpassword').passwordStrength();
			// $('#newpassword').bind('keyup blur', function() {
			// 	var strengthVal = parseInt($('#bg-password-strength').attr('class').replace('strength strength', '')) / 10;
			// 	$('.strength').width(strengthVal * 25);
			// });

			var passwordStatus = 0;
			var conPwdStatus = 0;

			/* 提示语初始文字和错误文字 */
			var tip ={
				passwordInit      : '8~16位数字、字母或特殊符号组成的密码',
				passwordNull      : '新密码不能为空！',
				passwordLength    : '新密码长度必须是8~16位！',
				passwordSimple    : '不能使用纯数字或纯字母作为密码！',
				conPwdInit        : '再输入一次密码',
				twoPwdNotSame     : '两次输入的密码不一致!',
				conPwdPlease      : '再输入一次密码，确保输入的密码和您需要的一致',
				pwdError		  : '密码填写不合法！'
			};


			$('#newpassword').toolTip({
				text    : tip.passwordInit,
				left    : 130
			});
			$('#newpassword1').toolTip({
				text   : tip.conPwdInit,
				left   : 130
			});

			/* 密码校验 */
			$('#newpassword').focus(function(){
				$(this).toolTipInit(tip.passwordInit);
			}).blur(function(){
				var pwdVal = $(this).val();
				var conPwdVal = $('#newpassword1').val();
				var oldPwdVal = $('#oldpassword').val();
				var regExp = /(^[\d]+$)|(^[a-zA-Z]+$)/;
				// 密码为空
				if(!pwdVal) {
					layer.alert(tip.passwordNull);
					passwordStatus = 0;
					return false;
				// 密码长度不符合要求
				}else if(pwdVal.length < 8 || pwdVal.length > 16) {
					layer.alert(tip.passwordLength);
					passwordStatus = 0;
					return false;
				// 密码为纯数字或纯密码
				}else if(regExp.test(pwdVal)){
					layer.alert(tip.passwordSimple);
					passwordStatus = 0;
					if(conPwdVal) {
						layer.alert(tip.pwdError);
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
					layer.alert(tip.twoPwdNotSame);
					conPwdStatus = 0;
				}else if(conPwdVal && conPwdVal === pwdVal){
					$(this).toolTipHide();
					passwordStatus = 1;
					$('#newpassword1').toolTipHide();
					conPwdStatus = 1;
				}
			});


			/* 确认密码校验 */
			$('#newpassword1').focus(function(){
				var conPwdVal = $(this).val();
				var pwdVal = $('#newpassword').val();
				if(passwordStatus) {
					$(this).toolTipInit(tip.conPwdInit);
				}
			}).blur(function(){
				var pwdVal = $('#newpassword').val();
				var conPwdVal = $(this).val();
				// 密码不合法
				if(!passwordStatus){
					layer.alert(tip.pwdError);
					conPwdStatus = 0;
					return false;
				// 密码合法
				}else{
					if(!conPwdVal) {
						layer.alert(tip.conPwdPlease);
						conPwdStatus = 0;
						return false;
					// 确认密码不等于密码
					}else if(conPwdVal !== pwdVal){
						layer.alert(tip.twoPwdNotSame);
						conPwdStatus = 0;
						return false;
					// 确认密码等于密码
					}else{
						$(this).toolTipHide();
						conPwdStatus = 1
					}
				}
			});	

			/* 重置密码-表单校验 */
			$('.btn-modify-pwd').click(function(){
				var currentPwd = $('#form-modify-pwd ul li:first');
				if(!currentPwd.children('input').val()) {
					layer.alert(currentPwd.children('label').text().replace('：', '') + '不能为空！');
					return false;
				}else if(!$('.tooltip-input.error').length && !$('#newpassword').val()) {
					layer.alert(tip.passwordNull);
					return false;
				}else if(!$('.tooltip-input.error').length && !$('#newpassword1').val()) {
					layer.alert(tip.conPwdPlease);
					return false;
				}else if(passwordStatus && $('#newpassword').val() === $('#oldpassword').val()) {
					layer.alert('新密码不能和原来的密码一样！');
					return false;
				}else if(!$('.tooltip-input.error').length && !$('#validcode').val()) {
					layer.alert('请输入验证码！');
					return false;
				}else if(passwordStatus * conPwdStatus) {
					$('#form-modify-pwd').submit();
				}
			});
		});
});