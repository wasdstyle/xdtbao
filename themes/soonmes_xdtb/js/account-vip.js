$(function() {
    if(parseInt($('#remain-money').val()) < parseInt($('#vip-fee').val())) {
        setTimeout(function() {
            art.dialog({
                icon   : 'warning',
                content: '您的账户可用余额小于VIP申请费用,<br>请充值后再申请！',
                okVal  :'确&nbsp;定',
                lock   :'true',
                opacity: .2,
                ok     : function() {
                    window.parent.document.location.href = '/member/account/newrecharge.html';
                }
            });
        }, 500);
    }

    $('#form-vip ul li:first').addClass('selected').children(':radio').attr({checked: true});

    $('#form-vip ul li').click(function() {
        $('#form-vip ul :radio').attr({checked: false});
        $(this).addClass('selected').siblings().removeClass('selected');
        $(this).children(':radio').attr({checked: true});

    });

  //申请VIP
    $('.btn-confirm-apply').click(function() {
    	if(!$('#form-vip .validcode input').val()) {
    		// v1.9.u2 BIAOZHUN-331 zza 2015-03-23 start
    		$('.vip-prompt:visible').text('验证码不能为空！');
    		// v1.9.u2 BIAOZHUN-331 zza 2015-03-23 end
    		return false;
    	}else if(parseInt($('#remain-money').val()) < parseInt($('#vip-fee').val())) {
    		$('.vip-prompt:visible').text('您的账户可用余额小于VIP申请费用,<br>请充值后再申请！');
            return false;
    	}else {
    		$.ajax({
    			url     : '/member/vip.html?type=apply',
    			type    : 'post',
    			cache   : false,
    			dataType: 'json',
    			data    : {"kefu_userid": $("input[name='kefu_userid']:checked").val(),"valicode":$('#form-vip .validcode input').val()},
    			success : function(msg){
    				if(msg != null){
    					if(msg.data.match('success')) {
    						window.parent.location.reload();
    					}else{
    						$('.vip-prompt:visible').text(msg.data);
    						$('.validcode-img').trigger('click');
    		            	$('#validcode').val('').focus();
    						return false;
    					}
    				}
    			}
    		});
    	}
    });
});



