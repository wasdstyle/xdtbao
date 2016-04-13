/**
 * ${webname!}
 * @affect 首页js
 * @date 2013-12-11
 * @version $V1.0$
 */
$(function(){
//--------------------------------------------------【侧栏悬停】
function fnKeep(){
	var oAside=$("#homeAside"),			//侧栏元素
		iHeight=$("#productList").height()-oAside.height()-10,				//高度之差
		iTop = oAside.offset().top,			//侧栏距离顶部距离
		iLeft,						//主体区左侧距离
		iScrollTop;					//滚动条距离
	if(iHeight>0){
		$(window).bind("scroll load resize", function() {
			iScrollTop=$(window).scrollTop();
			iLeft=$("#productList").offset().left;
			if (iScrollTop >= iTop&&iScrollTop <= iTop+iHeight) {
				oAside.removeClass("m_t_10").css({
					"position": "fixed",
					"top": 0,
					"right":iLeft
				});
			}else{
				if(iScrollTop>iTop){
					oAside.addClass("m_t_10").css({
						"position": "absolute",
						"top": iTop+iHeight,
						"right":iLeft
					});
				}else{
					oAside.addClass("m_t_10").css({
						"position": "static"
					});
				}
			}
		});
	}
}
//--------------------------------------------------【Ajax】
	//焦点图
	(function(){
	    $.post("ajax/index_slide.txt",function(arr){
	    	var iLength = arr.length,
	    		sHtml="",
	    		oLi,
				oLiLenght,
				iAddDian="",
				oThis;
			//生成图
	    	for(var i=0;i<iLength;i++){
	    		sHtml+='<li style="background-color:'+arr[i].color+';background-image:url('+arr[i].img+')"><a class="mid" href="'+arr[i].href+'"></a></li>'
	    	};
	    	$("#slideCon .slide_img").append(sHtml);
	    	oLi=$("#slideCon>.slide_img>li");
	    	oLiLenght=oLi.length
			//生成点
			$("#slideCon").append('<div class="slide_dian mid"></div>');
			for(var i=1;i<=oLiLenght;i++){
				iAddDian+='<a href="javascript:;">'+i+'</a>';
			}
			$("#slideCon .slide_dian").append(iAddDian);
			//调用焦点图淡入淡出
			$.slide({
				oSlide:"#slideCon .slide_img",		//焦点图内容容器
				oSlideChildren:"li",		//焦点图内容
				oSlideList:"#slideCon .slide_dian",	//焦点图列表容器
				oSlideListChildren:"a",		//焦点图列表
				sClass:"current",			//选中样式
				sEvent:"click",		//焦点图切换的触发事件
				bAuto:true,					//需要自动切换吗
				iSpeed:5000,				//自动切换的速度
				iNumber:0,					//首先显示的图片编号
				bDrChoose:true,				//是否淡入淡出
				ichangeSpeed:1000,			//渐变速度
				bHover:true,				//是否启动鼠标移入时停止切换
				fnAdditional:""				//追加方法
			});
	    },"json");
	}());
	//产品推荐
	var oPushProduct={
		title:"",			//标题
		href:"",			//标链接
		seller:"",		//钱行名称
		sellerHref:"",	//钱行链接
		type:"",			//标类别
		amount:"",		//借款金额
		rate:"",			//年利率
		deadline:"",	//还款期限
		time:"",			//剩余时间
		progress:"",	//进度
		remainingSum:"",		//剩余金额
		state:""		//当前状态
	}
	$.ajax({
        type:'post',
        url: "ajax/product_list.txt",
        dataType: 'json',
        data:"0",
		success:fnProductList
	});
	$.ajax({
        type:'post',
        url: "ajax/product_list.txt",
        dataType: 'json',
        data:"1",
		success:fnProductList
	});
	$.ajax({
        type:'post',
        url: "ajax/product_list.txt",
        dataType: 'json',
        data:"2",
		success:fnProductList
	});
	//数据拼接
	function fnProductList(arr){
		var sData=this.data;
			sHtml="",
			iLength = arr.length;
		for (var i = 0; i < iLength; i++) {
			oPushProduct = {
				title:arr[i].title,			//标题
				href:arr[i].href,			//标链接
				seller:arr[i].seller,		//钱行名称
				sellerHref:arr[i].sellerHref,	//钱行链接
				type:arr[i].type,			//标类别
				amount:arr[i].amount,		//借款金额
				rate:arr[i].rate,			//年利率
				deadline:arr[i].deadline,	//还款期限
				time:arr[i].time,			//剩余时间
				progress:arr[i].progress,	//进度
				remainingSum:arr[i].remainingSum,		//剩余金额
				state:arr[i].state		//当前状态
			}
			sHtml+='<div class="cont">';
			sHtml+='<div class="tits">';
			sHtml+='<a href="'+oPushProduct.href+'">'+oPushProduct.title+'</a>';
			sHtml+='<span><figure></figure><a href="'+oPushProduct.sellerHref+'">'+oPushProduct.seller+'</a></span>';
			sHtml+='</div>';
			sHtml+='<div class="conts">';
			sHtml+='<div class="main">';
			sHtml+='<table>';
			sHtml+='<tbody><tr>';
			sHtml+='<th>借款金额</th>';
			sHtml+='<th>年利率</th>';
			sHtml+='<th>还款期限</th>';
			sHtml+='</tr>';
			sHtml+='<tr>';
			sHtml+='<td><em>¥</em><span>'+parseInt(oPushProduct.amount)+'</span>.'+oPushProduct.amount.slice(oPushProduct.amount.length-2)+'</td>';
			sHtml+='<td><span>'+parseInt(oPushProduct.rate)+'</span>.'+oPushProduct.rate.slice(oPushProduct.rate.length-2)+'<i>%</i></td>';
			sHtml+='<td><span>'+oPushProduct.deadline+'</span><i>个月</i></td>';
			sHtml+='</tr>';
			sHtml+='</tbody></table>';
			sHtml+='<ul class="main_info clearfix">';
			if(oPushProduct.type==0){
				sHtml+='<li data-info="为工薪阶层量身定制的借款产品，帮助您实现买房的需求提高生活品质。"><figure class="ico_purchase"></figure>购房用途贷款</li>';
			}else if(oPushProduct.type==1){
				sHtml+='<li data-info="为白领阶层量身定制的借款产品，帮助您实现买车的需求提高生活品质。"><figure class="ico_car"></figure>购车用途贷款</li>';
			}else if(oPushProduct.type==2){
				sHtml+='<li data-info="为贫困家庭的学生量身定制的借款产品，帮助您顺利的完成学业。"><figure class="ico_omics"></figure>助学用途贷款</li>';
			}else if(oPushProduct.type==3){
				sHtml+='<li data-info="为私营企业量身打造的借款产品，帮助您的企业解决资金周转的燃眉之急。"><figure class="ico_business"></figure>经营用途贷款</li>';
			}else if(oPushProduct.type==4){
				sHtml+='<li data-info="为工薪阶层量身定制的借款产品，帮助您实现装修的需求提高生活品质。"><figure class="ico_decorate"></figure>装修用途贷款</li>';
			}else if(oPushProduct.type==5){
				sHtml+='<li data-info="为企业和个人定制的借款产品，帮助您实现资金筹款困难等问题。"><figure class="ico_emergency"></figure>应急用途贷款</li>';
			}else{
				sHtml+='<li data-info="其他类型的借款产品，帮助您短期小额的资金周转。"><figure class="ico_other"></figure>其它用途贷款</li>';
			}
			sHtml+='<li><figure class="ico_interest"></figure>每月还息到期还本</li>';
			sHtml+='<li><figure class="ico_security"></figure>100%钱行本息担保</li>';
			sHtml+='</ul>';
			sHtml+='</div>';
			sHtml+='<div class="operation">';
			sHtml+='<div class="progress_bar">';
			sHtml+='<span>当前进度</span>';
			sHtml+='<span class="bar"><em style="width:'+oPushProduct.progress+'%"></em></span>';
			sHtml+='<span>'+oPushProduct.progress+'%</span>';
			sHtml+='</div>';
			sHtml+='<div class="info">';
			sHtml+='剩余金额<span>'+oPushProduct.remainingSum+'</span>元可购买';
			sHtml+='</div>';
			if(oPushProduct.state==0){
				sHtml+='<a class="btn red" href="'+oPushProduct.href+'" title="立即申购">立即申购</a>';
			}else if(oPushProduct.state==1){
				sHtml+='<a class="btn gray" href="'+oPushProduct.href+'" title="已售完">已售完</a>';
			}else if(oPushProduct.state==2){
				sHtml+='<a class="btn brown" href="'+oPushProduct.href+'" title="还款中">还款中</a>';
			}else if(oPushProduct.state==3){
				sHtml+='<figure class="ico_complete"></figure>';
			}
			sHtml+='</div>';
			sHtml+='</div>';
			sHtml+='</div>';
		};
		if(sData==0){
			$("#lqtCon .tit").after(sHtml);
		}else if(sData==1){
			$("#qbbCon .tit").after(sHtml);
		}else{
			$("#mbCon .tit").after(sHtml);
		}
		fnKeep();
		fnFloatInfo();
	}
	//hover描述
	function fnAddDom(data){
		var sHtml="";
		sHtml+='<div id="floatInfo" style="position: absolute;display: none;padding:10px;width: 260px;height:50px;border:1px solid #dadada;background-color:#f2f2f2;border-radius:5px">';
		sHtml+='<figure style="position: absolute;left: -8px;top: 10px;display: block;width: 8px;height: 20px;background:url(image/home_info_bg.png) no-repeat left top"></figure>';
		sHtml+=data;
		sHtml+='</div>';
		return sHtml;
	}
	function fnFloatInfo(){
		$("#productList .main_info li[data-info]").hover(function(){
			var oThis=$(this),
				sDom=fnAddDom(),
	            iX=oThis.offset().left,
	            iY=oThis.offset().top,
	            sStr=oThis.attr("data-info");
			$("#floatInfo").remove();
			$("body").append(sDom);
	        $("#floatInfo").css({
	            left:iX+128,
	            top:iY-5
	        }).fadeIn(300).html(sStr+'<figure style="position: absolute;left: -8px;top: 10px;display: block;width: 8px;height: 20px;background:url(image/home_info_bg.png) no-repeat left top"></figure>');
		},function(){
			$("#floatInfo").remove();
		});
	}
	//官方公告
	$.ajax({
        type:'post',
        url: "ajax/index_notice.txt",
        dataType: 'json',
        data:"",
        success:function(arr){
			var sHtml="";
			for(var i=0;i<4;i++){
				if(i%2==0){
					sHtml +='<li><a class="txt_cut" href="' + arr[i].href + '" title=' + arr[i].title + '>'+ arr[i].title + '</a></li>';
				}else{
					sHtml +='<li class="m_r_0"><a class="txt_cut" href="' + arr[i].href + '" title=' + arr[i].title + '>'+ arr[i].title + '</a></li>';
				}
			};
			$("#aside_notice .content").append(sHtml);
        }
	});
	//媒体报道
	$.ajax({
        type:'post',
        url: "ajax/index_reports.txt",
        dataType: 'json',
        data:"",
        success:function(arr){
			var sHtml="";
			for(var i=0;i<5;i++){
				sHtml +='<li><a class="txt_cut" href="' + arr[i].href + '" title=' + arr[i].title + '>'+ arr[i].title + '</a></li>';
			};
			$("#aside_reports .content").append(sHtml);
        }
	});
	//理财风云榜
	(function(){
		$.post("ajax/index_new_bid.txt",function(arr){
				var iLength=arr.length,
					sHtml="";
				for(var i=0;i<iLength;i++){
					sHtml+='<li> <dl> <dt class="bid_name"><span>投资</span><a class="txt_cut" href="'+arr[i].href+'" title="'+arr[i].name+'">'+arr[i].name+'</a></dt> <dd class="bid_amount">¥'+arr[i].amount+'</dd> <dd class="bid_user">'+arr[i].user+'</dd> <dd class="bid_time">'+arr[i].time+'</dd> </dl> </li>'
				};
				$("#hot_bid").append(sHtml)
			 },"json");	
	}());
});