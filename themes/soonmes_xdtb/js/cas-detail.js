/* v1.9.u2 BIAOZHUN-235（债权转让js） zza 2015-02-28 add */
$(function() {
	$('#validcode').each(function() {
		if ($.browser.msie) {
			this.onpropertychange = function() {
				if(this.value) {
					$(this).siblings('label').hide();
				}
			};
		} else {
			this.addEventListener('input',function() { $(this).siblings('label').hide(); },false);
		}
	});
	
	$('#validcode').blur(function() {
		if(!$(this).val()) {
			$(this).siblings('label').show();
		}
	});
	
	$('.zaiquan-form ul li input').each(function() {
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
	$('.zaiquan-form ul li input').blur(function() {
		if (!$(this).val()) {
			$(this).siblings('label').show();
		}
	});
	
	var userMoney = parseInt($('#use_money').val());
	var remainCasAccount = $('#remain_cas_account').val();
	
	// 手动输入金额之后，判定金额是否在最小投标额到最大投标额之间，不符合就自动修改
	/*$('#buyAccount').blur(function() {
		$('#buyAccount').val(remainCasAccount);
	});*/

	// 自动填入金额
	// 账户余额>最大投资金额-->>填入最大
	// 账户余额<最大投资金额-->>填入余额
	// 账户余额<最小投资金额-->>提示账户余额小于最低投标金额
	$('#auto-input').click(function() {
		if(userMoney < remainCasAccount) {
			infoDialog('您的账户余额小于最低投标金额！<br>请充值后再投标。');
			return false;
		} else {
			$('#buyAccount').val(remainCasAccount);
		}
		$('#buyAccount').siblings('label').hide();
	});
	
	$('.btn-purchase').click(function() {
		var paypassword = $('#paypassword').val();
		var buyAccount = $('#buyAccount').val();
		var validcode = $('#validcode').val();
		var isPwd = $('#isPwd').val();
		var errorMsg = '';

		if (!buyAccount) {
			errorMsg += '* 请输入购买金额' + '。<br>';
		}
		if (parseFloat(buyAccount) < 0.1) {
			errorMsg += '* 请输入合理的头买金额' + '。<br>';
		}
		if (isPwd != null && isPwd > 0) {
			var pwd = $('#pwd').val();
			if (pwd.length == 0)
				errorMsg += '* 请输入此债权的定向密码' + '。<br>';
		}
		if (paypassword.length == 0) {
			errorMsg += '* 请输入您的支付密码' + '。<br>';
		}
		if (!validcode) {
			errorMsg += '* 请输入验证码' + '。<br>';
		}

		if (errorMsg) {
			art.dialog({
				icon : 'info',
				content : errorMsg,
				lock : true,
				opacity : 0
			});
			return false;
		} else {
			$('#cas-buy').submit();
		}
	});
	
});
		
