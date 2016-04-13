$(function() {
	/* 键盘输入时，提示文字隐藏 */
	$('.wp-form-login ul li input').each(function() {
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
	$('.wp-form-login ul li input').blur(function() {
		if (!$(this).val()) {
			$(this).siblings('label').show();
		}
	});

	$('.btn-login').click(function() {
		validForm();
	});

	$(document).keyup(function(e) {
		if ($('.form-login ul li input:focus').length) {
			e.which === 13 ? validForm() : '';
		}
	});

	function validForm() {
		if (!$('#username').val()) {

			$(".form-login ul li.error").html("用户名不能为空！").show();
			$('#username').focus();
			return false;
		} else if (!$('#password').val()) {

			$(".form-login ul li.error").html("密码不能为空！").show();
			$('#password').focus();
			return false;
		} else if (!$('#validcode').val()) {

			$(".form-login ul li.error").html("验证码不能为空！").show();
			$('#validcode').focus();
			return false;
		} else {
			$.get('/user/validCode.html', {
				valid : $('#validcode').val()
			}, function(result) {
				if (result.result == true) {
					$('#validCodeHidden').val(result.data);
					$('#form-login').ajaxSubmit(
						function(data) {
							if (data.data != null) {
								if (data.data.match('member')) {
									$(".show-error").hide();
									var url = "/member/index.html"
									if (data.redirectURL != "") {
										url = data.redirectURL;
									}
									window.location.href = url;
								} else {
									$(".form-login ul li.error").html(
											data.data).show();
									$('.validcode-img').trigger('click');
									$('#validcode').val('');
									return false;
								}
							} else {
								$(".form-login ul li.error").html(
										"该用户处于冻结状态，请联系管理员！").show();
								$('.validcode-img').trigger('click');
								$('#validcode').val('');
								return false;
							}
						})
				} else {
					$(".form-login ul li.error").html("验证码错误！").show();
					$('.validcode-img').trigger('click');
					$('#validcode').val('');
					return false;
				}
			});
		}
	}
});