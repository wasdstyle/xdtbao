$(function() {
	$('#apply-form ul li input').each(function() {
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
	$('#apply-form ul li input').blur(function() {
		if (!$(this).val()) {
			$(this).siblings('label').show();
		}
	});
	
	
	
	

	$("#borrow_btn").click(function(){
		var borrowName=$('#borrowName').val();
		var borrowTel=$('#borrowTel').val();
		var validcode=$('#validcode').val();
		var teltest=/0?(13|14|15|17|18)[0-9]{9}/;
		var str_len = str_length(borrowName);
		if(borrowName.length==0||str_len<4) {
            infoDialog('姓名必须是在2到10位之间!');
            return false; 
            }else if(str_len>10){
            infoDialog('中文名字必须小于10位！');
            return false; 
            }
            else if(borrowName.match(/^[0-9]\d*$/)) {
            infoDialog('请输入正确的姓名');
            return false; 
            }else if(borrowTel.length<11){
                infoDialog('手机号码不能小于11位');
                return false;  
            }else if(!teltest.test(borrowTel)){
                infoDialog('请输入正确的手机号码');
                return false;
            }else if(validcode==''){
            	infoDialog('请输入验证码');
                return false;
            }
		art.dialog.confirm('确定要提交信息吗？', function() {
	        $.get("/user/validCode.html",{ valid:$("#validcode").val()},function(result){
	            if(result.result == true) {
	                $('#validCodeHidden').val(result.data);
	                $('#apply-form').submit();
	            }else{
	                $('#valicodeImg').click();
	                infoDialog("验证码错误！");
	                return false;
	            }
	        });
    	});
    });
	function str_length(val) {
    var len = 0;
    var a = val.split("");
    for (var i=0;i<a.length;i++) {
        if (a[i].charCodeAt(0)<299) {
            len++;
        } else {
            len+=2;
        }
    }
    return len;
}

	/* 发布借款标需要审核状态判断 */
	if($('#form-borrow').length) {
		var config = $('#borrow_config').val();
		//分割config
		var arr=new Array();
		arr = config.split('');
		var needReal = arr[0];//是否需要实名认证
		var needVip = arr[1];//是否需要VIP认证
		var needEmail = arr[2];//是否需要邮箱认证
		var needPhone = arr[3];//是否需要手机认证
		var needVideo = arr[4];//是否需要视频认证
		var needScene = arr[5];//是否需要现场认证
		if((needEmail == 1) && ($('#email_status').val() != 1)){
			art.dialog({
				icon   : 'warning',
				content: '请先进行邮箱认证，点击立即认证',
				esc    : false,
				lock   : true,
				ok     : function() {
					location.href = '/member/identify/realname.html?hand=1#email-identify';
				},
				close  : function() {
					location.href = '/member/identify/realname.html?hand=1#email-identify';
				}
			});
		}
		else if((needPhone == 1) && ($('#phone_status').val() != 1)){
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
		else if((needReal == 1) && ($('#real_status').val() != 1)){
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
		else if((needVip == 1) && ($('#vip_status').val() != 1)){
			art.dialog.open('/member/vip.html', {
				title     : '请先完成VIP认证',
				width     : 780,
				top		  : 155,
				fixed     : true,
				resize    : false,
				lock      : true,
				opacity	  : .3,
				close  : function() {
					art.dialog({
						icon   : 'warning',
						content: '请先等待VIP申请成功，点击返回我的账户',
						esc    : false,
						lock   : true,
						ok     : function() {
							location.href = '/member/index.html';
						},
						close  : function() {
							location.href = '/member/index.html';
						}
					});
				}
			});
		}
		else if((needVideo == 1) && ($('#video_status').val() != 1)){
			art.dialog({
				icon   : 'warning',
				content: '请先进行视频认证，点击立即认证',
				esc    : false,
				lock   : true,
				ok     : function() {
					location.href = '/member/identify/realname.html?hand=1#video-identify';
				},
				close  : function() {
					location.href = '/member/identify/realname.html?hand=1#video-identify';
				}
			});
		}
		else if((needScene == 1) && ($('#scene_status').val() != 1)){
			art.dialog({
				icon   : 'warning',
				content: '请先进行现场认证，点击立即认证',
				esc    : false,
				lock   : true,
				ok     : function() {
					location.href = '/member/identify/realname.html?hand=1#scene-identify';
				},
				close  : function() {
					location.href = '/member/identify/realname.html?hand=1#scene-identify';
				}
			});
		}
	}
	
	loadCss(themeDir + '/plugin/poshytip-1.2/src/tip-custom/tip-custom.css');
	$LAB.script(themeDir + '/plugin/poshytip-1.2/src/jquery.poshytip.min.js')
		.wait(function() {
			$('#title,#account,#apr,#flow_money,#changetoDay,#is-orientate').poshytip({
				className       : 'tip-custom',
				bgImageFrameSize: 9,
				showTimeout     : 100,
				offsetX         : 0,
				offsetY         : 20,
				allowTipHover	: false
			});
		});

	/*悬浮提示语和警告提示语*/
	var tip = {
		titleTip       : '借款的标题需要简洁明了，能够说明借款的意图',
		amountTip      : '借款金额应在500元至5,000,000元之间。借款成功后, 每个月按借款本金收取0.5%，管理费用不计息，不退还，在借款金额中直接扣除。 更详尽的信息请查看帮助网站 收费规则',
		amountLess     : '借款金额不能小于最低或最高投标金额',
		aprTip         : '填写还款的年利率。1至6个月的年利率不能超过22.4%,7至12个月的年利率不能超过24%.范围：1%至24%，且只保留小数后最后两位',
		flowMoneyTip   : '流转标的每一份的金额,必须是借款金额“整除”的结果',
		dayBidTip      : '借款成功后，系统将按照每月30天来计算借款利息',
		orientateTip   : '定向标可邀请特定的用户来投标，设置好密码后，告诉对方此标的密码即可',

		amountError    : '借款金额最少不能低于500元，最多不能高于5,000,000元！',
		aprError       : '借款年利率范围要在1%~24%（只保留小数点后两位数字）',
		mostLowestError: '最低投标金额不能大于最高投标金额！',
		lowestMore     : '最低投标金额不能大于借款金额',
		mostMore       : '最高投标金额不能大于借款金额',
		flowMoneyError : '借款金额必须是流转标每份金额的整数倍！'
	};

	if($('#typestr').val() == 'miaobiao') {
		tip.amountTip = '借款金额应在500元至5,000,000元之间。借款成功后,管理费用不计息，不退还，在借款金额中直接扣除。 更详尽的信息请查看帮助网站 收费规则';
	}else if($('#typestr').val() == 'jin') {
		tip.amountTip = '借款金额应在500元至5,000,000元之间。借款成功后, 每个月按借款本金收取0.2%，管理费用不计息，不退还，在借款金额中直接扣除。 更详尽的信息请查看帮助网站 收费规则';
	}

	$('#title').attr({title: tip.titleTip});
	$('#account').attr({title: tip.amountTip});
	$('#apr').attr({title: tip.aprTip});
	$('#flow_money').attr({title: tip.flowMoneyTip});
	$('#changetoDay').attr({title: tip.dayBidTip});
	$('#is-orientate').attr({title: tip.orientateTip});

	/* 刷新验证码 */
	$('#validcode').each(function() {
		if($.browser.msie) {
			this.onpropertychange = function() {
				if(this.value) {
					$(this).siblings('label').hide();
				}
			};
		}else {
			this.addEventListener('input',function() {
				$(this).siblings('label').hide();
			},false);
		}
	});

	$('#validcode').blur(function() {
		if(!$(this).val()) {
			$(this).siblings('label').show();
		}
	});

	/* 失去焦点是判断值是否为空 */
	$('#validcode').blur(function() {
		if(!$(this).val()) {
			$(this).siblings('label').show();
		}
	});

	$('#validcode-img').click();
	
	/*借款参数内容选项卡切换*/
	$('.borrow-param .tab-title').changeTab({contentTab: '.borrow-param .tab-cont'});

	/*还款方式显示*/
	changeBorrowStyle($('#btype').val(), $('#isday').val());

	/*选择天标*/
	$('#changetoDay').bind('click keyup',function(){
	    if($(this).attr('checked')){
	        $('#isday').val(1);
	        $('#time_limit').hide();
	        $('#time_limit_day').show();
	    }else{
	        $('#isday').val(0);
	        $('#time_limit').show();
	        $('#time_limit_day').hide();
	    }
	    changeBorrowStyle($('#btype').val(),$('#isday').val());
	});

	/*设置定向标密码*/
	$('#is-orientate').attr('checked') ? $('#pwd-orientate').removeAttr('disabled') : '';
	$('#is-orientate').click(function() {
		if($(this).attr('checked')) {
			$('#pwd-orientate').removeAttr('disabled')
		} else {
			$('#pwd-orientate').val('');
			$('#pwd-orientate').attr('disabled', 'disabled');
		}
	});

	$('#pwd-orientate').keyup(function() {
		this.value = this.value.replace(/[\u4E00-\u9FA5]/g,'');
	});


	// 如果借款是发布之后正在修改，并且发布时选择了天标
	if($('#isday').attr('day-bid') == 'true') {
		/*天标下拉列表显示，月标下拉列表隐藏*/
		$('#time_limit').hide();
		$('#time_limit_day').show();
		/*按天计算的复选框选中，是否天标的隐藏域值改变为1*/
		$('#changetoDay').attr({checked:true});
		$('#isday').val(1);
	// 如果借款是首次发布或者是正在修改但发布时没有选择天标
	}else{
		/*初始状态：月标下拉列表显示，天标下拉列表隐藏*/
		$('#time_limit').show();
		$('#time_limit_day').hide();
		/*初始状态：按天计算的复选框未选中*/
		$('#changetoDay').attr({checked:false});
		$('#isday').val(0);
	}

	/*由标种和是否天标来生成不同的还款方式*/
	function changeBorrowStyle(btype,isday){
	    var $repayStyleSelect = $('#repay-style');
	    var style1 = '<option value="1">按月分期还款</option>';
	    var style2 = '<option value="2">一次性还款</option>';
	    var style3 = '<option value="3">每月还息到期还本</option>';
	    var style4 = '<option value="4">提前付息到期一次性还本</option>';
	    var repayStyleOption;
	    // 如果是秒还标
	    if(btype == 101){
	        $repayStyleSelect.html(style2);
	    // 如果不是秒还标，不是天标
	    }else if(isday == 0){
	        repayStyleOption = style1 + style2 + style3;
	        $repayStyleSelect.html(repayStyleOption);
	    // 如果不是秒还标，是天标
	    }else if(isday == 1){
	        repayStyleOption = style2 + style4;
	        $repayStyleSelect.html(repayStyleOption);
	    }
	    $('#repay-style option').each(function() {
	    	if($('#hiddenStyle').val()==$(this).val()){//alert($(this).val());
	    		$(this).attr('selected',true);
	    	}
		});	
	}


	/*投资奖励单选框选中/未选中时，后面的输入框显示/隐藏*/
	$(document).bind('load click keyup',function() {
		$('#part-award, #funds-award').each(function() {
			if($(this).attr('checked')) {
				$(this).siblings('div').show();
			}else{
				$(this).siblings('div').hide();
			}
		});
	});


	/*表单校验*/
	var accountStatus 	= 1,
		aprStatus 		= 1,
		lowestStatus 	= 1,
		mostStatus 		= 1,
		flowMoneyStatus = 1;
	/*限制金额输入框的金额数量*/
	$('#account').blur(function() {
		var accountVal = parseInt($(this).val());
		var accountVal       = parseInt($('#account').val());
		var flowMoneyVal     = parseInt($('#flow_money').val())
		if(accountVal && (accountVal < 500 || accountVal > 5000000)) {
			errorTipLayer(this,tip.amountError);
			accountStatus = 0;
			return false;
		}else {
			accountStatus = 1;
		}

		if(accountVal < parseInt($('#lowest_account').val()) || accountVal < parseInt($('#most_account').val())) {
			errorTipLayer(this, tip.amountLess);
			accountStatus = 0;
			return false;
		} else {
			accountStatus = 1;
			$('#lowest_account, #most_account').removeClass('error-border');
		}

		if($('#flow_money').length) {
	   		if(accountVal % flowMoneyVal) {
	   			errorTipLayer(this,tip.flowMoneyError);
	   			flowMoneyStatus = 0;
	   		}else {
				flowMoneyStatus = 1;
				$('#flow_money').removeClass('error-border');
			}
		}
	});

	/*限制年利率输入框的金额数量*/
	$('#apr').blur(function() {
		var aprVal = parseFloat($(this).val());
		if(aprVal && (aprVal < 1 || aprVal > 24)) {
			errorTipLayer(this,tip.aprError);
			aprStatus = 0;
		}else {
			aprStatus = 1;
		}
	});

	/*限制最低投标和最高投标下拉列表的金额*/
	$('#lowest_account').blur(function() {
		var lowestAccountVal = parseInt($('#lowest_account').val());//最低投标金额
		var mostAccountVal   = parseInt($('#most_account').val());//最多投标金额
		if(mostAccountVal && mostAccountVal < lowestAccountVal) {
			errorTipLayer(this,tip.mostLowestError);
			lowestStatus = 0;
			return false;
		}else {
			lowestStatus = 1;
			$('#most_account').removeClass('error-border');
		}

		if(lowestAccountVal > parseInt($('#account').val())) {
			errorTipLayer(this, tip.lowestMore);
			lowestStatus = 0;
		}else {
			lowestStatus = 1;
			$('#account').removeClass('error-border');
		}
	});

	$('#most_account').blur(function() {
		var lowestAccountVal = parseInt($('#lowest_account').val());//最低投标金额
		var mostAccountVal   = parseInt($('#most_account').val());//最多投标金额
		if(mostAccountVal && mostAccountVal < lowestAccountVal) {
			errorTipLayer(this,tip.mostLowestError);
			mostStatus = 0;
			return false;
		}else {
			mostStatus = 1;
			$('#lowest_account').removeClass('error-border');
		}

		if(mostAccountVal > parseInt($('#account').val())) {
			errorTipLayer(this, tip.mostMore);
			mostStatus = 0;
		}else {
			mostStatus = 1;
			$('#account').removeClass('error-border');
		}
	});

	/*限制最低投标和最高投标下拉列表的金额*/
	$('#flow_money').blur(function() {
		var accountVal       = parseInt($('#account').val());
		var flowMoneyVal     = parseInt($('#flow_money').val())
	   	if(accountVal % flowMoneyVal) {
	   		errorTipLayer(this,tip.flowMoneyError);
	   		flowMoneyStatus = 0;
	   	}else {
			flowMoneyStatus = 1;
		}
	});


	$('#btn-publish').click(function() {
		var nameVal          = $('#title').val();//借款标题
		var accountVal       = parseInt($('#account').val());//借款金额
		var aprVal           = parseFloat($('#apr').val());//年利率
		var flowMoneyVal     = parseInt($('#flow_money').val());//流转标每份金额
		var validcodeVal	 = $('#validcode').val();

		if(!nameVal){
			infoDialog('请填写借款标题！');
			return false;
		}else if(!accountVal) {
			infoDialog('借款金额不能为空!');
			return false;
		}else if(!aprVal) {
			infoDialog('借款利率不能为空!');
			return false;
		}else if($('#flow_money').length > 0) {
			if(!flowMoneyVal) {
				infoDialog('请填写每份流转标的金额！');
				return false;
			}
		}else if(!validcodeVal) {
	        infoDialog('验证码不能为空!');
	        return false;  
	    }

	    if($('#flow_money').length > 0) {
			if(accountStatus * aprStatus * flowMoneyStatus) {
				art.dialog.confirm('确定要发布此借款吗？<br>发布后可以在  账户中心-待审核项目  中修改或取消', function() {
					$.get("/user/validCode.html",{ valid:$("#validcode").val()},function(result){
			            if(result.result == true) {
			            	$('#validCodeHidden').val(result.data);
			    			$("#form-borrow").submit();
			            }else{
							alert("验证码错误！");
			            	$("#validcode-img").click();
			                return false;
			            }
			        });
				});
			}
		}else{
			if(accountStatus * aprStatus * lowestStatus * mostStatus) {
				art.dialog.confirm('确定要发布此借款吗？<br>发布后可以在 账户中心-待审核项目中修改或取消', function() {
					$.get("/user/validCode.html",{ valid:$("#validcode").val()},function(result){
			            if(result.result == true) {
			            	$('#validCodeHidden').val(result.data);
			    			$("#form-borrow").submit();
			            }else{
			            	$('#valicodeImg').click();
							alert("验证码错误！");
			                return false;
			            }
			        });
				});
			}
		}
	});

	/*错误提示弹出层*/
	function errorTipLayer(obj,errorTipText) {	
		$(obj).addClass('error-border');
		art.dialog({
			title  : '',
			icon   : 'warning',
			content: errorTipText
		});
		$(obj).focus(function() {
			$(this).removeClass('error-border');
		});
	}
});