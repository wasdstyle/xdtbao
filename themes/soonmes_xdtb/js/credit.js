/**
 * 积分商城相关js
 */
/**
 * +
 */

function addCount() {
	var aa = $('#r-num').val();
	if(aa == ''){
		$('#r-num').val(0);
	}
	$('#r-num').val(parseInt($('#r-num').val()) + 1);
	var total = $('#store').val();
	if (parseInt($('#r-num').val()) > (parseInt(total))) {
		$('#r-num').val(total);
	}
}

/**
 * -
 */
function subtractCount() {
	var aa = $('#r-num').val();
	if(aa == ''){
		$('#r-num').val(0);
	}
	$('#r-num').val(parseInt($('#r-num').val()) - 1);
	if (parseInt($('#r-num').val()) < 0) {
		$('#r-num').val(0);
	}
}

	
function okBtnFun(goodsId) {
	if (parseInt($('#r-num').val()) > parseInt('${goodsModel.store!}')) {
		alert("兑换数量不够！");
		return false;
	}
	if ($('#r-num').val() == '' || $('#r-num').val() == null
			|| $('#r-num').val() == '0') {
		return false;
	}
	var valid_value = '${creditModel.valid_value}';
	valid_value = valid_value.replace(",", "");
	var credit_value = '${goodsModel.credit_value!}';
	credit_value = credit_value.replace(",", "");
	var count = $('#r-num').val();
	if ((parseFloat(credit_value) * parseFloat(count)) > parseFloat(valid_value)) {
		alert("您的积分不够，请重新选择需要兑换的数量！");
		return false;
	}
	window.location.href = "convertAddress.html?goodsId=" + goodsId
			+ "&goodsNum=" + $('#r-num').val();
}



/**
 * 确认兑换商品
 * @returns {Boolean}
 */
function submitBtn() {
	if (parseInt($('#r-num').val()) > parseInt('${goodsModel.store!}')) {
		alert("兑换数量不够！");
		return false;
	}
	
	//
	
	
	if ($('#r-num').val() == '' || $('#r-num').val() == null
			|| $('#r-num').val() == '0') {
		return false;
	}
	var valid_value = '${creditModel.valid_value}';
	valid_value = valid_value.replace(",", "");
	var credit_value = '${goodsModel.credit_value!}';
	credit_value = credit_value.replace(",", "");
	var count = $('#r-num').val();
	if ((parseFloat(credit_value) * parseFloat(count)) > parseFloat(valid_value)) {
		alert("您的积分不够，请重新选择需要兑换的数量！");
		return false;
	}
	$("#convert-submit").submit();
	
}

// 弹框插件
$(function(){
	$(".addressBox").hide();
	$("#add-new-address").click(function(){
		$(".addressBox").show();
                $("#gNum").val($("#r-num").val());
	});
	$("#box_close").click(function(){
		$(".addressBox").hide();
	});
});


$(function(){
	$(".addressBox1").hide();
	$("#editor-address").click(function(){
                var aid=$(this).attr('aid');
                $.ajax({ 
                   type: "POST",
                   url: "/credit/loadAddress.html",
                   data: {id:aid},
                   dataType: "json",
                   success:function(data){
                        $(".addressBox1 #province").attr('pid',data.province);
                        $(".addressBox1 #province").attr('pid',data.area);
                        $(".addressBox1 #province").attr('pid',data.city);
                        $(".addressBox1 #detail-address").attr('value',data.address);
                        $(".addressBox1 #postcode").attr('value',data.postcode);
                   }
                });
                  $(".addressBox1").show();
	});
	$("#box_close1").click(function(){
		$(".addressBox1").hide();
	});
});

$(function(){
	$(".addressBox1").hide();
	$("#editor-address1").click(function(){
		//$(".addressBox1").show();
alert('aaa');
                var aid=$(this).attr('aid');
                $.ajax({ 
                   type: "POST",
                   url: "/credit/loadAddress.html",
                   data: {id:aid},
                   dataType: "json",
                   success:function(){


                   }
                });

	});
	$("#box_close1").click(function(){
		$(".addressBox1").hide();
	});
});


//	地址添加表单验证
function checkAddress() {
	var detailAddress = $("#detail-address").val();
	
	var province=$("#province").val();
	var city=$("#city").val();
	var area=$("#area").val();
	var postcode=$("#postcode").val();
	//var post=/^[1-9][0-9]\d{5}$/;
        var post=/^[1-9]\d{5}$/;
	
	if(province==-1 || city==-1 || area==-1){
		alert("请选择地区");
		return false;
	}
	if(!post.test(postcode)){
		alert("邮编格式错误");
		return false;
	}
	if (detailAddress.length > 0) {
		return true;
	} else {
		alert("请输入详细地址");
		return false;
	}
}

$(function(){
	//	默认显示一次
	var credit_value = $('#credit_value').val();
	var r_num = $('#r-num').val();
	$('#totalCredit').text(credit_value * r_num);
	
	//	点击改变总消耗积分
	$('.reduce-num').click(function() {
		subtractCount();
		var credit_value = $('#credit_value').val();
		var r_num = $('#r-num').val();	
		$('#totalCredit').text(credit_value * r_num);
	});
	$('.add-num').click(function() {
		addCount();
		var credit_value = $('#credit_value').val();
		var r_num = $('#r-num').val();
		$('#totalCredit').text(credit_value * r_num);
		$("#r-num").val(r_num);
	});




/* 数据列表搜索功能-时间输入框 */
if($('.search-box .search-btn').length) {
    // laydate.skin('dahong');
    var start = {
            elem   : '#start-time',
            format : 'YYYY-MM-DD hh:mm:ss',
            max    : '2099-06-16 23:59:59', //最大日期
            istime : true,
            istoday: false,
            choose: function(datas){
                end.min   = datas;  //开始日选好后，重置结束日的最小日期
                end.start = datas   //将结束日的初始值设定为开始日
            }
        };
    var end = {
        elem   : '#end-time',
        format : 'YYYY-MM-DD hh:mm:ss',
        min    : laydate.now(),
        max    : '2099-06-16 23:59:59',
        istime : true,
        istoday: false,
        choose : function(datas){
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };
    laydate(start);
    laydate(end);
}



/*
 * 积分兑换查询
 * */
/*$("#search-btn").click(function(){
	var startTime = $("#start-time").val();
	var endTime = $("#end-time").val();
	var goodsName = $("#goods-name").val();
	$.ajax({
		url:'convertLog.html',
		type:'post',
		data:{start_time:startTime,end_time:endTime,goods_name:goodsName},
		dataType:'json',
		success:function(){
			 alert('success');
		},
		error:function(){
			alert('error');
		}
	});
});*/







});


