$(function() {
	/* 如果没有进行实名认证则无法添加 */
	if($('#form-recharge').length && !($('#real_status').val()==1)) {
		art.dialog({
			icon   : 'warning',
			content: '请先进行实名认证，点击立即认证',
			esc    : false,
			lock   : true,
			ok     : function() {
				location.href = '/wx/realname.html?hand=1';
			},
			close  : function() {
				location.href = '/wx/realname.html?hand=1';
			}
		});
	}
	/* 如果没有进行手机认证则无法添加 */
	else if($('#form-recharge').length && !($('#phone_status').val()==1)) {
		art.dialog({
			icon   : 'warning',
			content: '请先进行手机认证，点击立即认证',
			esc    : false,
			lock   : true,
			ok     : function() {
				location.href = '/wx/mobile.html';
			},
			close  : function() {
				location.href = '/wx/mobile.html';
			}
		});
	}
	
	/* 查看充值记录 */
	$('.wp-form-recharge .btn-record').click(function() {
		art.dialog.open('/member/account/recharge.html', {
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

	/* 充值金额 数字加中文提示 */
	$('#recharge-money').numberConvert();

	/* 切换 网上充值/线下充值 */
	$('.recharge-type span').click(function() {
		if($('.recharge-type span').length > 1) {
			var i = $('.recharge-type span').index($(this));
			$(this).addClass('current').siblings('span').removeClass('current');
			$(this).siblings(':hidden').val(i + 1);
			// 网上充值
			if(i === 0) {
				$('.list-online-bank, .list-third-party').show();
				$('.list-offline-bank').hide();
			// 线下充值
			}else {
				$('.list-offline-bank').show();
				$('.list-online-bank, .list-third-party').hide();
			}
		}
	});


	/* 输入金额为0时，自动删除 */
	/* 线下充值金额低于100元时提示 */
	$('#recharge-money').blur(function() {
    	this.value === '0' ? this.value = '' : '';
    	if($('.recharge-type :hidden').val() === '2' && parseInt(this.value) < 100) {
    		art.dialog({
				title  : '',
				icon   : 'info',
				content: '线下充值金额最低100元！',
				time   : 2,
				ok :null,
				close  : function() {
					$('#recharge-money').val('100').blur();
				}
    		});
    	}
    });

	/* 限制金额输入框的输入 */
	$('#recharge-money').bind('keyup blur', function() {
		var moneyVal = this.value;

        // 不能输入 类似00、01的数值
        if(moneyVal.match(/^0+\d+/)){
        	this.value = moneyVal.replace(/^0+(\d+)/, '$1');
        }

        // 小数点前没有数字，自动在前面加上0
        if(moneyVal.match(/^\./)){
        	this.value = moneyVal.replace(/\./, '0.');
        }

        // 如果输入的金额中没有小数点，只能输入到千万
        if(moneyVal.match(/\d{9}/)){
        	this.value = moneyVal.substring(0, 8);
        }
	});
	
	
	/* 选择充值银行或第三方支付 */
	// 默认选中网上银行第一个
	$('.list-online-bank dl dd:first').addClass('selected').append('<div class="icon-bank-selectd"></div>').children(':radio').attr({checked: true});

	// 切换充值银行时改变样式
	$('.list-online-bank dl dd, .list-third-party dl dd').click(function() {
		$('.list-online-bank dl dd, .list-third-party dl dd').removeClass('selected');
		$('.icon-bank-selectd').remove();
		$('.list-online-bank :radio, .list-third-party :radio').attr({checked: false});
		$(this).addClass('selected').append('<div class="icon-bank-selectd"></div>').children(':radio').attr({checked: true});
	});

	// 默认选中线下充值银行第一个
	$('.list-offline-bank dl dd:first').children('.select-box').addClass('selected').siblings(':radio').attr({checked: true});

	// 第三方支付个数为0时，移除第三方支付
	if(!$('.list-third-party dl dd').length) {
		$('.list-third-party').remove();
	}


	// 切换线下充值银行
	$('.list-offline-bank dl dd .select-box').click(function() {
		$('.list-offline-bank dl dd').children('.select-box').removeClass('selected').siblings(':radio').attr({checked: false});
		$(this).addClass('selected').siblings(':radio').attr({checked: true});
	});


	/* 确认充值-表单校验 */
	$('.btn-confirm-recharge').click(function() {
		if(!$("#card_no").is(":hidden") && !$("#card_no").val()){
			layer.alert('请输入银行卡号！');
			return false;
		}
		if(!$('#recharge-money').val()) {
			layer.alert('请输入充值金额！');
			return false;
		}else if($('.recharge-type :hidden').val() === '2' && !$('.remark').val()) {
			layer.alert('请输入线下充值的备注！');
			return false;
		}else if(!$('.validcode').val()) {
			layer.alert('请输入验证码！');
			return false;
		}else {
			$('#form-recharge').submit();
		}
	});
});

$("#yunRong_pay_kjcz").click(function(){
	$("#kjcz").show();
	$('.ra input').eq(1).attr("checked",'checked')
});
$(".no_yunRong_pay_kjcz").click(function(){
	$("#kjcz").hide();
	$('.ra input').eq(0).attr("checked",'checked')
});

$("#getVerify_info").click(function(){
	var partner_serial_no = $("#partner_serial_no").val();
	var url = "/member/account/collection_verify.html?partner_serial_no="+partner_serial_no;
	$.ajax({
		url:url,
		type:"post",
		success:function(data){
			alert(data.resultMsg);
		}
	});
});

$("#collection_confirm_submit").click(function(){
	if($("#verify_info").val() == ""){
		alert("短信验证码不能为空");
	}else {
		$("#collection_confirm_form").submit();
	}
});