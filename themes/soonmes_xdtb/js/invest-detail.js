$(function() {
	$LAB.script(themeDir + '/plugin/poshytip-1.2/src/jquery.poshytip.min.js')
	.script(themeDir + '/js/draw-process.js')
	.wait(function() {
		$('.process-bar').drawProcess({
			width        : 120,     		//进度条直径(canvas的宽度),
	        processWidth : 8,       	//进度条的粗细
	        processColor : '#ff5823',  	//进度条扇形背景颜色(进度条主颜色)
	        textColor    : '#888',  	//进度条文字的颜色
	        textSize     : '18px',   	//进度条文字的大小(单位pt)
	        textWeight   : '100',  	//进度条文字的粗细
	        textFamily   : '微软雅黑', 	//进度条文字的字体
	        drawSpeed    : 5        	//进度条绘制速度(2~10)
		});
	});
	/* 借款详细选项卡切换 */
	$(".bottom-tit").changeTab({contentTab: '.tab-cont'});

	/* 项目不可投资时，禁用投资表单所有输入框 */
	if ($('.invest-form .btn-invest').hasClass('disabled')) {
		$('.invest-form ul li.input').append('<div class="overlay"></div>');
		$('.invest-form input').attr('disabled', 'disabled');
		$('.auto-input').removeAttr('id');
	}

	/* 键盘输入时，提示文字隐藏 */
	$('.invest-form ul li input').each(function() {
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
	
	$('.invest-form ul li input').blur(function() {
		if(!$(this).val()) {
			$(this).siblings('label').show();
		}
	});

	/* 控制输入的金额 */
	// 账户余额
	var userMoney = parseInt($('#user-money').val());
	// 最低投标金额
	var minInvestAmount;
	if($('#min-invest-amount').length && $('#min-invest-amount').val()) {
		// 当剩余投标金额小于最小投标金额时，最小投标金额设为剩余投标金额
		if(parseInt($('#remain-invest-amount').val()) < parseInt($('#min-invest-amount').val())){
			minInvestAmount = parseInt($('#remain-invest-amount').val());
		}else {
			minInvestAmount = parseInt($('#min-invest-amount').val());
		}
	}else {
		minInvestAmount = 1;
	}

	//最高投标金额或最多购买份数
	var maxInvestAmount;
	if($('#max-invest-amount').length) {
		// 当剩余投标金额小于 最大投标金额 时，最大投标金额设为剩余投标金额
		if(parseInt($('#remain-invest-amount').val()) < parseInt($('#max-invest-amount').val())) {
			maxInvestAmount = parseInt($('#remain-invest-amount').val());
		}else {
			maxInvestAmount = parseInt($('#max-invest-amount').val());
		}
	}else {
		maxInvestAmount = parseInt($('#remain-invest-amount').val());
	}


	// 手动输入金额之后，判定金额是否在最小投标额到最大投标额之间，不符合就自动修改
	$('#money').blur(function() {
		$(this).siblings('label').hide();
		var amountVal = $('#money').val() && !isNaN($('#money').val()) ? parseInt($('#money').val()) : minInvestAmount;
		if(amountVal <= minInvestAmount) {
			$('#money').val(minInvestAmount);
		}else if(amountVal >= maxInvestAmount) {
			$('#money').val(maxInvestAmount);
		}
	});

	// 自动填入金额
	// 账户余额>最大投资金额-->>填入最大
	// 账户余额<最大投资金额-->>填入余额
	// 账户余额<最小投资金额-->>提示账户余额小于最低投标金额
	$('#auto-input').click(function() {
		if(userMoney < minInvestAmount) {
			infoDialog('您的账户余额小于最低投标金额！<br>请充值后再投标。');
			return false;
		}else if(userMoney <= maxInvestAmount) {
			$('#money').val(userMoney);
		}else if(userMoney >= maxInvestAmount) {
			$('#money').val(maxInvestAmount);
		}
		$('#money').siblings('label').hide();
	});


	/* 确认投资-表单校验 */
	$('#btn-invest').click(function() {
		var money=$("#money").val();
		if(!money.length){
			infoDialog('请输入投标金额!');
			return false;
		}
		if($('#single-flow-money').length) {
			var amountVal = parseInt($("#money").val()) * parseInt($("#single-flow-money").val());
		}else {
			var amountVal = parseInt($("#money").val());
		}
        //alert(amountVal);
		if(!$('#paypassword').length) {
			infoDialog('请先设置一个支付密码');
			return false;
		}else if(!$('#paypassword').val()) {
			infoDialog('请输入交易密码！');
			return false;
		}else if($('#pwd-direct').length && !$('#pwd-direct').val()) {
			infoDialog('请输入定向密码！');
			return false;
		}else if(userMoney < amountVal){
			infoDialog("您的可用余额小于您的投标金额，请先充值。");
			return false;
		}else {
			art.dialog.confirm('确定要投标"' + amountVal + '元"？<br>' + '此操作将无法撤消！',function() {
				$('#form-tender').submit();
			},function() {
				this.close();
			});
		}
	});


	/* 显示投标记录 */
	showTenderRecord(1);
	function showTenderRecord(pageIndex){
		var option = {
			param      : {
				borrowid: $('#borrow-id').val(), 
				page    : pageIndex
			},
			url        : 'detailTenderForJson.html?randID='+ escape(new Date()),
			callback   : function(result){
				var listStr = '<dl class="cf"><dd>投资用户</dd><dd>投资金额</dd><dd>有效金额</dd><dd>投资时间</dd></dl>';
				var listLength = result.data.list.length;
				for(var i = 0;i < listLength;i++){
					listStr += "<ul class='cf'>"+
								"<li>"+result.data.list[i].username+"</li>"+
								"<li style='color:#f25e54'>"+format(result.data.list[i].money,2)+"</li>"+
								"<li style='color:#f25e54'>"+format(result.data.list[i].account,2)+"</li>"+
								"<li>"+new Date(result.data.list[i].addtime*1000).format('yyyy-MM-dd hh:mm:ss')+"</li>"+
								"</ul>";
				}
				if(listLength) {
					$('.list-record').html(listStr);
				}else{
					$('.list-record').hide();
				}

				pageAmount = result.data.page.pages;
				var recordPage = '';
				for(var i = 0;i < pageAmount;i++) {
					recordPage += '<li><a href="javascript:">' + (i+1) + '</a></li>';
				}
				$('.list-record-page ul').html(recordPage);

				/*投标记录分页按钮点击跳转*/
				$('.list-record-page li').eq(pageIndex - 1).children().addClass('current');
				$('.list-record-page li').live('click', function() {
					showTenderRecord($(this).index() + 1);
				});
			}
		};
		$.get(option.url, option.param, option.callback);
	}

	// 投标记录中的日期数据转换
	Date.prototype.format = function(format){
		var o = {
			"M+" : this.getMonth()+1,
			"d+" : this.getDate(),
			"h+" : this.getHours(),
			"m+" : this.getMinutes(),
			"s+" : this.getSeconds(),
			"q+" : Math.floor((this.getMonth()+3)/3),
			"S"  : this.getMilliseconds()
		}
		if(/(y+)/.test(format))
			format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("("+ k +")").test(format))
				format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
			return format;
	}

	// 投标记录中的金额数据转换
	function format(pnumber,decimals){
		if (isNaN(pnumber)) { return 0};
		if (pnumber=='') { return 0};
		var snum = new String(pnumber);
		var sec = snum.split('.');
		var whole = parseFloat(sec[0]);
		var result = '';
		if(sec.length > 1){
			var dec = new String(sec[1]);
			dec = String(parseFloat(sec[1])/Math.pow(10,(dec.length - decimals)));
			dec = String(whole + Math.round(parseFloat(dec))/Math.pow(10,decimals));
			var dot = dec.indexOf('.');
			if(dot == -1){
				dec += '.';
				dot = dec.indexOf('.');
			}
			while(dec.length <= dot + decimals) { dec += '0'; }
			result = dec;
		} else{
			var dot;
			var dec = new String(whole);
			dec += '.';
			dot = dec.indexOf('.');
			while(dec.length <= dot + decimals) { dec += '0'; }
			result = dec;
		}
		return result;
	}
	/**
	 * 展示最新投资
	 */
	$.ajax({
		url:"newTender.html",
		type:"get",
		dataType:"json",
		success:function(data){
			var strs="";
			var zt="";
			var time="";
			var timeval="";
	        var strlenght =data.data.length;
	        for(var i = 0; i<strlenght; i++){ 
	        	timeval = data.data[i].addtime;
	        	function getTime(timeval){
	        		var nowTime = Date.parse(new Date())/1000;
	        		var t= parseInt(nowTime)-parseInt(timeval);
					   var d=parseInt(t/60/60/24);
					   var h=parseInt(t/60/60);
					   var m=parseInt(t/60);
					   var s=parseInt(t);
					    if(d>=1){
						   return d+"天前";
						}
						else if(h>=1){
							return h+"小时前";
						}
						else if(m>=1){
							return m+"分钟前";
						}
						else{
							return s+"秒前";
						}
	        	}
	        	time = getTime(timeval);
	        	strs+="<ul class='investment-ul'>" +
	        			"<li class='li-portrait'><img src='/imgurl.html?userid=" + data.data[i].user_id + "&size=middle' width='36px;' height='36px;' /></li>" +
	        			"<li class='li-name'>" + data.data[i].username + "</li>" +
	        			"<li class='li-type'>投资" + data.data[i].name + "</li>" +
	        			"<li class='li-money'>" + data.data[i].account + "</li>" +
	        			"<li class='li-time'>" + time + "</li>" +
	        			"</ul>";
	        }
			$("#newTender").html(strs);
		}
	})
});


function AutoScroll(obj){ 
	$(obj).find("#newTender").animate({ 
	marginTop:"-80px" 
	},500,function(){ 
	$(this).css({marginTop:"0px"}).find("ul:first").appendTo(this); 
	}); 
	} 
	$(document).ready(function(){ 
	setInterval('AutoScroll("#newTender_max")',3000); 
}); 
