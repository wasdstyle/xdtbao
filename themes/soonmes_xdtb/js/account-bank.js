$(function() {
	/* 如果没有进行实名认证则无法添加 */
	if($('#form-add-bank').length && !($('#real_status').val()==1)) {
		art.dialog({
			icon   : 'warning',
			content: '请先进行实名认证，认证后重新登录',
			esc    : false,
			lock   : true,
			ok     : function() {
				location.href = '/member/identify/realname.html?hand=1';
			},
			close  : function() {
				location.href = '/member/identify/realname.html?hand=1';
			}
		});
	}

	/* 给银行卡logo的容器设置背景图片的坐标 */
	$('.bg-bank').bankBgSet('#bank-select', '.bank-id');

	/* 添加银行卡 */
	$('.cardList li.addCard').click(function() {
		$(this).hide();
		$('.wp-form-add-bank').show();
	});

	/* 取消添加银行卡 */
	$('.wp-form-add-bank .cancel').click(function() {
		$('.wp-form-add-bank').hide();
		$('.cardList li.addCard').show();
	});

	/* 添加银行卡-表单校验 */
	$('.btn-add-bank').click(function() {
		if(!$('#account').val()) {
			infoDialog('银行账号不能为空！');
			return false;
		}else if($('#account').val().length < 16) {
			infoDialog('银行账号格式不正确！');
			return false;
		}else if($('#area').val() === '-1') {
			infoDialog('请选择银行卡的开户地区！');
			return false;
		}else if(!$('#validcode').val()) {
			infoDialog('验证码不能为空！');
			return false;
		}else {
			$('#form-add-bank').submit();
		}
	});
	
	/* 添加银行卡-表单校验 */
	$('.btn-del-bank').click(function() {
		var bankId = $(this).siblings('[name="bankId"]').val();
		art.dialog.confirm("确定要删除这张银行卡吗？", function () {
			window.location.href="/member/account/delbank.html?bankId=" + bankId;
		});
			
	});
});