$(function() {
	/* 根据url判断该页面是重置"登录密码"or重置"交易密码" */
	var url = location.href;
	var actionName = url.substring(url.indexOf('/user'), url.indexOf('?id'));
	if(actionName == '/user/setpaypwd.html') {
		$('.wp-setpwd-form ul li label').css({
			color        : '#0078ad',
			'font-weight': 'bold'
		});
		$('.btn-setpwd').text('重置交易密码').css({background:'#0078ad'});
	}

	// 提示语初始文字和错误文字 
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

	$LAB.script(themeDir + '/plugin/input-tooltip.js')
		.wait(function() {
			$('#password').toolTip({
				text    : tip.passwordInit,
				position: 'vertical',
				left    : 100
			});
			$('#con-pwd').toolTip({
				text   : tip.conPwdInit,
				position: 'vertical',
				left   : 100
			});
		})
		.script(themeDir + '/plugin/jquery.passwordStrength.js')
		.wait(function() {
			/* 密码强度判定 */
			$('#password').passwordStrength();
			$('#password').bind('keyup blur', function() {
				var strengthVal = parseInt($('#bg-password-strength').attr('class').replace('strength strength', '')) / 10;
				$('.strength').width(strengthVal * 25);
			});
		});

	var passwordStatus = 0;
	var conPwdStatus = 0;

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

	/* 重置密码-表单校验 */
	$('.btn-setpwd').click(function(){
		var formStatus = passwordStatus * conPwdStatus;
		if(formStatus) {
			$('#form-setpwd').submit();
		}else{
			if(!$('#password').val()) {
				var artdialogTip = tip.passwordNull;
			}else if(passwordStatus && !$('#con-pwd').val()) {
				var artdialogTip = tip.conPwdPlease;
			}else {
				var artdialogTip = '密码填写不正确！';
			}
			infoDialog(artdialogTip);
		}
	});
});






