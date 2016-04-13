$(function() {
//	$LAB.script(themeDir + '/plugin/mail-auto-complete.js')
//		.wait(function() {
//			/* 输入邮箱时自动补全 */
//			$('#email').mailAutoComplete({
//				top : 50,
//				left: 150
//			});
//		});

	/* html5预览本地图片(不支持ie10以下的浏览器) */
	function previewImg(file, previewBox) {
		var reader = new FileReader();
		reader.onload = function(e) {
		    var $img = $('<img>').attr("src", e.target.result);
		    $(previewBox).empty().append($img);
		};
		reader.readAsDataURL(file);
	}


	/* 上传身份证照片类型过滤和预览 */
	$('#card-pic1, #card-pic2').change(function(e) {
		var self = this;
		if(!(this.value.match(/.*(.jpg|.gif|.png)$/))) {
			$(this).val('').siblings('.upload-ok, .preview').remove();
			layer.alert('上传的图片类型必须是jpg，gif或png格式！');
			return false;
		}else{
			$(this).parent().find('.upload-ok, .preview').remove();
			$(this).parent().append('<div class="upload-ok"></div>');
			// 上传图片后，图片预览框隐藏，"预览文字"hover时显示
			// ie10以下无法进行预览
			if(!($.browser.msie) || (parseFloat($.browser.version) >= 10.0)) {
				$(this).parent().append('<span class="preview">预览</span>');
				var file = e.target.files[0];
				var previewBox = '.' + this.id + '-preview';
				previewImg(file, previewBox);

				$('#form-realname dl dd .preview').each(function() {
					var self = this;
					$(self).live({
						mouseenter: function() {
							$(self).siblings('.card-pic-preview').show();
						},
						mouseleave: function() {
							$(self).siblings('.card-pic-preview').hide();
						}
					});
				});
			}
		}
	});


	/* 实名认证-表单校验 */
	$('#btn-submit-realname').click(function() {
		var count=$("#count").val();
		
		if(!$('#realname').val()){
			layer.alert('请填写真实姓名！');
			$('#realname').focus();
			return false;
		}else if(!$('#realname').val().match(/^[\u4e00-\u9fa5]+$/)) {
			layer.alert('真实姓名格式不正确!');
			$('#realname').css({'border-color': '#f20c00'}).focus(function() {
				$(this).removeAttr('style');
			});
			return false;
		}else if(!$('#card-id').val()) {
			layer.alert('请填写身份证号码！');
			$('#card-id').focus();
			return false;
		}else if(($('#card-id').val().length !== 15 && $('#card-id').val().length !== 18) || !$('#card-id').val().match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)) {
			layer.alert('身份证号码格式不正确！');
			$('#card-id').css({'border-color': '#f20c00'}).focus(function() {
				$(this).removeAttr('style');
			});
			return false;
		}else if($('#area').val() === '-1') {
			layer.alert('请选择您的籍贯！');
			return false;
		}
		
		else if((!$('#card-pic1').val() || !$('#card-pic2').val()) && count>=2) {
			layer.alert('请上传身份证正反面照片！');
			return false;
		}
		else if(!$('#realname-validcode').val()) {
			layer.alert('请输入验证码！');
			return false;
		}else {
			$('#form-realname').ajaxSubmit({
				dataType:"json",
				success:function(data){
					if(data.data){
						if(data.data.match('success')) {
							art.dialog.tips("实名认证申请成功，请等待管理人员审核。");
							$('#form-realname').html('<span class="btn-audit">审核中</span>')
						}else{
							layer.alert(data.data);
							$('.validcode-img').trigger('click');
			            	$('#validcode').val('').focus();
							return false;
						}
					}
				}
			});
			
			
		}
	});
	
	
	/* 绑定手机-校验输入的手机号码 */
	var phoneStatus = '';
	$('#phone').blur(function() {
		var phoneVal = $(this).val();
		if(phoneVal && !phoneVal.match(/^1[34578]{1}[0-9]{9}$/)) {
			$('.phone-prompt').html('<img src="' + themeDir + '/bg/icon-error.png">' + '手机号码格式不正确！');
			phoneStatus = 'error';
			return false;
		}else if(phoneVal){
			$.get(
				'/user/checkPhone.html',
				{phone: phoneVal},
				function(json){
	            	if(json.result !== 'true') {
		            	$('.phone-prompt').html('<img src="' + themeDir + '/bg/icon-error.png">' + '该手机号码已被使用！');
		            	phoneStatus = 'exsits';
		            	return false;
		            }else {
		            	$('.phone-prompt').html('<img src="' + themeDir + '/bg/icon-right.png">');
		            	phoneStatus = 'available';
		            }
	        	}
	    	);
		}
	});


	/* 绑定手机-获取校验码 */
	$('#btn-get-validcode').live('click', function() {
		var self = this;
		var countDown = parseInt($('#count-down').val());
		if(!$('#phone').val()) {
			layer.alert('请先输入手机号码！');
			return false;
		}else if(phoneStatus === 'available') {
			$.ajax({
				url     : "/member/identify/mobileaccess.html?mobile=" + $('#phone').val() + '&phone_type=' + 1,
				type    : 'post',
				cache   : false,
				dataType: 'json',
				data    : {name: $('#phone').val()},
				// 重新发送倒计时
				success: function(){
					$(self).attr({id: 'resend-time'}).text(countDown + '秒后重新发送');
					timer = setInterval(function() {
						countDown--;
						if(countDown) {
							$(self).text(countDown + '秒后重新发送');
						}else {
							clearInterval(timer);
							countDown = parseInt($('#count-down').val());
							$(self).attr({id: 'btn-get-validcode'}).text('获取校验码');
						}
					}, 1000);
				}
			});
		}
	});


	/* 绑定手机-表单校验 */
	$('#btn-submit-phone').click(function() {
		if(!$('#phone').val()) {
			layer.alert('请输入手机号码！');
			return false;
		}else if(phoneStatus === 'available' && !$('#phone-validcode').val()) {
			layer.alert('请输入您校验码！');
			return false;
		// 判断校验码是否正确
		}else if(phoneStatus === 'available' && $('#phone-validcode').val()){
			$.ajax({
				url     : '/member/identify/phoneSms.html?mobile=' + $('#phone').val() + '&valicode=' + $('#phone-validcode').val(),
				type    : 'post',
				cache   : false,
				dataType: 'json',
				data    : {name: $('#phone').val()},
				success : function(msg){
					if(msg != null){
						msg.data.match(/验证码不正确/) ? errorDialog(msg.data) : '';
						if(msg.data.match(/验证成功/)) {
							art.dialog({
								icon   : 'succeed',
								content: msg.data,
								fixed  : true,
								lock   : true,
								opacity: .1,
								time   : 2,
								close  : function() {
									window.location.reload();
								}
							});
						}
					}
				}
			});
		}
	});

	/* 人工审核绑定 */
	$('#btn-manual').click(function() {
		if(!$('#phone').val()) {
			layer.alert('请输入手机号码！');
			return false;
		}else if(phoneStatus === 'available') {
			art.dialog.confirm('使用人工审核的来绑定手机，审核时间可能会有延迟<br>确定要使用这种方式吗？', function() {
				$('#form-phone').ajaxSubmit(function(data){
					if(data.data != null){
						if(data.data.match('success')) {
							art.dialog.tips("手机认证申请成功，请等待管理人员审核。");
							$('#form-phone').html('<span class="btn-audit">审核中</span>')
						}else{
							layer.alert(data.data);
							$('.validcode-img').trigger('click');
			            	$('#validcode').val('').focus();
							return false;
						}
					}
				})
			});
		}
	});


	/* 绑定邮箱-表单校验 */
	/*$('#btn-submit-email').click(function() {
		if(!$('#email').val()) {
			layer.alert('请输入邮箱号！');
			$('#eamil').focus();
			return false;
		}else if(!$('#email').val().match(/^(\w)+(\.\w+)*@(\w)+(\.[a-zA-Z]{2,3})$/)){
			layer.alert('邮箱格式不正确！');
			$('#eamil').select();
			return false;
		}else {
			$('#form-email').ajaxSubmit(function(data){
				if(data.data != null){
					if(data.data.match('success')) {
						art.dialog.tips("发送激活邮件成功，请注意查收邮件。");
					}else{
						layer.alert(data.data);
						return false;
					}
				}
			})
		}
	});*/

	// 确定修改邮箱
	$('#btn-submit-email').click(function() {
		if(!$('#email-validcode').val()) {
			layer.alert('校验码不能为空！');
			$('#email-validcode').focus();
			return false;
		}else {
			$.ajax({
				url     : '/member/identify/emailCheck.html?emailCode=' + $('#email-validcode').val(),
				type    : 'post',
				cache   : false,
				dataType: 'json',
				data    : {"email": $('input[name=email]').val()},
				success : function(msg){
					if(msg != null){
						if(msg.data.match(/(验证码不正确|验证码已过期)/)) {
							layer.alert(msg.data);
							return false;
						}else if(msg.data.match('验证成功')) {
							window.parent.location.reload();
						}
					}
				}
			});
		}
	});

	/* 修改手机号码 */
	// 弹出修改窗口
	$('#edit-phone').click(function() {
		art.dialog.open('/member/identify/phoneChange.html?step=first',{
			title  :'修 改 手 机 号 码',
			width  : 420,
			height : 260,
			fixed  : true,
			lock   : true,
			opacity: .1,
			close  : function() {
				window.location.reload();
			}
		});
	});

	// 获取旧的手机验证码和新的手机验证码
	$('.btn-phone-modify-validcode').live('click', function() {
		var self = this;
		var mobile = $(self).parents('form').find('.mobile');
		var countDown = parseInt($('#count-down').val());
		$('.modify-prompt:visible').text('');
		if(!mobile.val()) {
			$('.modify-prompt:visible').text('手机号码不能为空！');
			return false;
		}else if(!mobile.val().match(/^1[34578]{1}[0-9]{9}$/)) {
			$('.modify-prompt:visible').text('手机号码格式不正确！');
			return false;
		}else if($('.btn-phone-modify-validcode').hasClass('resend-time')) {
			return false;
		}else {
			$.ajax({
				url     : '/member/identify/getPhoneCode.html',
				type    : 'post',
				dataType: 'json',
				cache   : 'false',
				data    : {mobile: mobile.val()},
				success : function(msg){
					if(msg.data.match('重新获取')){
						$('.modify-prompt:visible').text('验证码已发送，请查收，' + countDown + '秒后可重新发送！');
						setTimeout(function() {
							$('.modify-prompt:visible').text('');
						}, 3000);
						return false;
					}else if(msg.data.match('已发出')){
						$(self).removeClass('btn-modify-validcode').addClass('resend-time').text(countDown + '秒后重新发送');
						timer = setInterval(function() {
							countDown--;
							if(countDown) {
								$(self).text(countDown + '秒后重新发送');
							}else {
								clearInterval(timer);
								countDown = parseInt($('#count-down').val());
								$(self).removeClass('resend-time').addClass('btn-modify-validcode').text('获取校验码');
							}
						}, 1000);
					}else{
						$('.modify-prompt:visible').text(msg.data);
					}
			   }
			});
		}
	});	
	
	// 填写旧的手机验证码之后进行下一步
	$('#phone-next-step').click(function() {
		if(!$('#phone-validcode').val()) {
			$('.modify-prompt:visible').text('校验码不能为空');
			return false;
		}else {
			$.ajax({
				url     : '/member/identify/phoneChange.html?phoneValicode=' + $('#phone-validcode').val(),
				type    : 'post',
				cache   : false,
				dataType: 'json',
				data    : {'query_type': $('[name="query_type"]').val()},
				success : function(msg){
					if(msg != null){
						if(msg.data.match(/(验证码不正确|验证码已过期)/)) {
							$('.modify-prompt:visible').text(msg.data);
							return false;
						}else if(msg.data.match('验证成功')) {
							window.location.href = '/member/identify/phoneChange.html';
						}
					}
				}
			});
		}
	});
	
	// 确定修改手机
	$('#btn-submit-modify-phone').click(function() {
		if(!$('#valicode').val()) {
			$('.modify-prompt:visible').text('校验码不能为空');
			return false;
		}else {
			$.ajax({
				url     : '/member/identify/phoneCheck.html?valicode=' + $('#valicode').val(),
				type    : 'post',
				cache   : false,
				dataType: 'json',
				data    : {"mobile": $('input[name=mobile]').val()},
				success : function(msg){
					if(msg != null){
						if(msg.data.match(/(验证码不正确|验证码已过期)/)) {
							$('.modify-prompt:visible').text(msg.data);
							return false;
						}else if(msg.data.match('验证成功')) {
							window.parent.location.reload();
						}
					}
				}
			});
		}
	});



	/* 修改邮箱 */
	// 弹出修改窗口
	$('#edit-email').click(function() {
		art.dialog.open('/member/identify/emailChange.html?step=first',{
			title  :'修 改 邮 箱',
			width  : 420,
			height : 260,
			fixed  : true,
			lock   : true,
			opacity: .1,
			close  : function() {
				window.location.reload();
			}
		});
	});

	// 获取旧的邮箱验证码和新的邮箱验证码
	$('#btn-email-validcode').live('click', function() {
		$('.email-prompt:visible').text('');
		var countDown = parseInt($('#email_count-down').val());
		var self = this;
		var email = $(self).parents('form').find('#email');
		if(!email.val()) {
			$('.email-prompt:visible').text('邮箱不能为空！');
			return false;
		}else if(!email.val().match(/^(\w)+(\.\w+)*@(\w)+(\.[a-zA-Z]{2,3})$/)) {
			$('.email-prompt:visible').text('邮箱格式不正确');
			return false;
		}else if($('#btn-email-validcode').hasClass('resend-time')) {
			return false;
		}else {
			
			$.ajax({
				url     : '/member/identify/getEmailCode.html',
				type    : 'post',
				dataType: 'json',
				cache   : false,
				data    : {email: email.val()},
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
		}
	});

	// 填写旧的邮箱验证码验证码之后进行下一步
	$('#email-next-step').click(function() {
		if(!$('#email-valicode').val()) {
			$('.modify-prompt:visible').text('校验码不能为空');
		}else {
			$.ajax({
				url     : '/member/identify/emailChange.html?emailValicode=' + $('#email-valicode').val(),
				type    : 'post',
				cache   : false,
				dataType: 'json',
				data    : {'query_type': $('[name="query_type"]').val()},
				success : function(msg){
					if(msg != null){
						if(msg.data.match(/(验证码不正确|验证码已过期)/)) {
							$('.modify-prompt:visible').text(msg.data);
							return false;
						}else if(msg.data.match('验证成功')) {
							window.location.href = '/member/identify/emailChange.html';
						}
					}
				}
			});
		}
	});

	// 确定修改邮箱
	$('#btn-submit-modify-email').click(function() {
		if(!$('#valicode').val()) {
			$('.modify-prompt:visible').text('校验码不能为空');
			return false;
		}else {
			$.ajax({
				url     : '/member/identify/emailCheck.html?emailCode=' + $('#valicode').val(),
				type    : 'post',
				cache   : false,
				dataType: 'json',
				data    : {"email": $('input[name=email]').val()},
				success : function(msg){
					if(msg != null){
						if(msg.data.match(/(验证码不正确|验证码已过期)/)) {
							$('.modify-prompt:visible').text(msg.data);
							return false;
						}else if(msg.data.match('验证成功')) {
							window.parent.location.reload();
						}
					}
				}
			});
		}
	});


	/* 申请视频认证、现场认证 */
	$('#btn-submit-video').click(function() {
		art.dialog.confirm('确定要申请视频认证吗？', function() {
			$('#form-video').ajaxSubmit(function(data){
				if(data.data != null){
					if(data.data.match('success')) {
						art.dialog.tips("视频认证申请成功，请等待管理人员审核。");
						$('#form-video').html('<span class="btn-audit">审核中</span>')
					}else{
						layer.alert(data.data);
						return false;
					}
				}
			})
		});
	});

	$('#btn-submit-scene').click(function() {
		art.dialog.confirm('确定要申请现场认证吗？', function() {
			$('#form-scene').ajaxSubmit(function(data){
				if(data.data != null){
					if(data.data.match('success')) {
						art.dialog.tips("现场认证申请成功，请等待管理人员审核。");
						$('#form-scene').html('<span class="btn-audit">审核中</span>')
					}else{
						layer.alert(data.data);
						return false;
					}
				}
			})
		});
	});
});
