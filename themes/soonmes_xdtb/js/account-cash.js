$(function() {
	var remainAmount     = parseFloat($('.remain-amount b').text()),
	minCashAmount    = parseFloat($('#min-cash-amount').text()),
	maxCashAmount    = parseFloat($('#max-cash-amount').text()),
	todayCashAmount  = parseFloat($('.today-cash-amount b').text());
	/* 如果没有进行实名认证则无法添加 */
	if($('#form-cash').length && !($('#real_status').val()==1)) {
		art.dialog({
			icon   : 'warning',
			content: '请先进行实名认证，点击立即认证',
			esc    : false,
			lock   : true,
			ok     : function() {
				location.href = '/member/identify/realname.html?hand=1#realname-identify';
			},
			close  : function() {
				location.href = '/member/identify/realname.html?hand=1#realname-identify';
			}
		});
	}
	/* 如果没有进行手机认证则无法添加 */
	else if($('#form-cash').length && !($('#phone_status').val()==1)) {
		art.dialog({
			icon   : 'warning',
			content: '请先进行手机认证，点击立即认证',
			esc    : false,
			lock   : true,
			ok     : function() {
				location.href = '/member/identify/realname.html?hand=1#phone-identify';
			},
			close  : function() {
				location.href = '/member/identify/realname.html?hand=1#phone-identify';
			}
		});
	}
	/* 如果没有绑定银行卡则无法添加 */
	else if($('#form-cash').length && ($('#bank_size').val()<=0)) {
		art.dialog({
			icon   : 'warning',
			content: '请先绑定银行卡，点击立即绑定',
			esc    : false,
			lock   : true,
			ok     : function() {
				location.href = '/member/account/bank.html';
			},
			close  : function() {
				location.href = '/member/account/bank.html';
			}
		});
	}
	/* 账户可提现余额小于最低提现金额时 */
	else if(remainAmount < minCashAmount){
		art.dialog({
			title  : '余额不足',
			icon   : 'warning',
			content: '您的账户可提现余额小于最低提现金额<br>无法提现！',
			close  : function() {
				$('#cash-money, #pay-password').attr({readonly: true});
				$('#cash-money, #pay-password').focus(function() {
					$(this).blur();
				});
			}
		});
	}
	
	/* 查看提现记录 */
	$('.wp-form-cash .btn-record').click(function() {
		art.dialog.open('/member/account/cash.html', {
			title     : '',
			width     : 720,
			height    : 495,
			top		  : 155,
			fixed     : true,
			resize    : false,
			lock      : true,
			opacity	  : .3,
			background: '#fff'
		});
	});
	
	$('.success .btn-record').click(function() {
		art.dialog.open('/member/account/cash.html', {
			title     : '',
			width     : 720,
			height    : 495,
			top		  : 155,
			fixed     : true,
			resize    : false,
			lock      : true,
			opacity	  : .3,
			background: '#fff'
		});
	});

	/* 提现金额 数字加中文提示 */
	$('#cash-money').numberConvert();


	/* 给银行卡logo的容器设置背景图片的坐标 */
	$('.bg-bank').bankBgSet('#bank', '.bank-id');


	var timer;
	/* 限制金额输入框的输入 */
	$('#cash-money').bind('keyup blur', function() {
		clearTimeout(timer);
		var moneyVal = this.value;
		
		// 不能输入 类似00、01的数值
		if(moneyVal.match(/^0\d+/)){
			this.value = moneyVal.replace(/^0(\d+)/, '$1');
		}

		// 小数点前没有数字，自动在前面加上0
		if(moneyVal.match(/^\./)){
			this.value = moneyVal.replace(/\./, '0.');
		}

		// 为空时，删除手续费提示文字
		// 计算提现手续费
		if(moneyVal && moneyVal !== '0') {
			timer = setTimeout(function() {
				$.ajax({
					url     : '/member/account/getAvailableCash.html',
					dataType: 'json', 
					data    : 'money=' + moneyVal,
					success : function(json){
						var cashFee = '';
						cashFee = (json.data.fee === '0.0' ? 0 : json.data.fee);
						$('.cash-fee').show().html('实际到账：<b>' + Math.round((moneyVal - cashFee) * 100) / 100 + '</b>元(手续费<b>' + cashFee +'</b>元)');
					}
				});
			}, 500)
		}else {
			$('.cash-fee').hide();
		}
	});

	/* 输入的提现金额不合法时弹窗提示 */
	$('#cash-money').blur(function() {
		var cashAmount = parseFloat(this.value);

		// 输入的提现金额为0时，自动删除
		this.value === '0' ? this.value = '' : '';
		
		// 提现金额大于账户余额
		if(cashAmount > remainAmount) {
			art.dialog({
				title  : '',
				icon   : 'warning',
				content: '提现金额大于账户的<b>可提现余额</b>！',
				time   : 2,
				ok :null,
				close  : function() {
					$('#cash-money').val(remainAmount > maxCashAmount ? maxCashAmount : remainAmount).blur();
				}
			});
		// 提现金额低于100元
		}else if(cashAmount < minCashAmount) {
			art.dialog({
				title  : '',
				icon   : 'warning',
				content: '提现金额最低<b>' + minCashAmount + '</b>元！',
				time   : 2,
				ok :null,
				close  : function() {
					$('#cash-money').val(minCashAmount).blur();
				}
			});
		// 提现金额高于50000元
		}else if(cashAmount > maxCashAmount) {
			art.dialog({
				title  : '',
				icon   : 'warning',
				content: '提现金额最高<b>' + maxCashAmount + '</b>元！',
				time   : 2,
				ok :null,
				close  : function() {
					$('#cash-money').val(maxCashAmount).blur();
				}
			});
		// 提现金额高于本日可提现金额
		}else if(cashAmount > todayCashAmount) {
			art.dialog({
				title  : '',
				icon   : 'warning',
				content: '您的提现金额已超过<b>本日可提现额度</b>！',
				time   : 2,
				ok :null,
				close  : function() {
					$('#cash-money').val(todayCashAmount).blur();
				}
			});
		}
	});
	

	/* 选择提现的银行卡 */
	// 默认选中第一个提现的银行卡
	$('.wp-form-cash li .cash-bank dd:first').addClass('selected').append('<div class="icon-bank-selectd"></div>').children(':radio').attr({checked: true});

	// 切换选择的银行卡
	$('.wp-form-cash li .cash-bank dd').click(function() {
		$('.wp-form-cash li .cash-bank dd').removeClass('selected').children(':radio').attr({checked: false});
		$('.icon-bank-selectd').remove();
		$(this).addClass('selected').append('<div class="icon-bank-selectd"></div>').children(':radio').attr({checked: true});
	});


	/* 确认提现-表单校验 */
	$('.btn-confirm-cash').click(function() {
		if(!$('#cash-money').val()) {
			infoDialog('请输入提现金额！');
			return false
		}else if(!$('#pay-password').val()) {
			infoDialog('请输入交易密码！');
			return false;
		}else {
			$('#form-cash').submit();
		}
	});
});