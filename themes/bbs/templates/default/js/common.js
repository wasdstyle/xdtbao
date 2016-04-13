/**
 * ${webname!}
 * @affect JS\JQ特效
 * @date 2013-11-26
 * @version $V1.0$
 */
/*全局变量*/
window.webrootUrl = "/themes/soonmes_qzw/";
window.GlobalUrl ={};
GlobalUrl.webroot =  "/themes/soonmes_qzw/";
GlobalUrl.fcIndex =  "/franchisee/index.html?fid=";
GlobalUrl.typeSelect =  "/tl/typeSelect.html?fid=";
GlobalUrl.detail =  "/ti/detail.html?borrowId=";
// 借款用途
window.borrowUsage = {
	"11001": {"title": "经营用途贷款", "desc": "为私营企业量身打造的借款产品，帮助您的企业解决资金周转的燃眉之急。"}, 
	"11002": {"title": "购车用途贷款", "desc": "为白领阶层量身定制的借款产品，帮助您实现买车的需求提高生活品质。"},
	"11003": {"title": "购房用途贷款", "desc": "为工薪阶层量身定制的借款产品，帮助您实现买房的需求提高生活品质。"},
	"11004": {"title": "装修用途贷款", "desc": "为工薪阶层量身定制的借款产品，帮助您实现装修的需求提高生活品质。"},
	"11005": {"title": "应急用途贷款", "desc": "为企业和个人定制的借款产品，帮助您实现资金筹款困难等问题。"},
	"11006": {"title": "助学用途贷款", "desc": "为贫困家庭的学生量身定制的借款产品，帮助您顺利的完成学业。"},
	"11007": {"title": "其它用途贷款", "desc": ""},
	"1627":	{"title": "公司经营贷款", "desc": "为私营企业量身打造的借款产品，帮助您的企业解决资金周转的燃眉之急。"},
	"1628":	{"title": "房屋装修贷款", "desc": "为工薪阶层量身定制的借款产品，帮助您实现装修的需求提高生活品质。"},
	"1629":	{"title": "购房用途贷款", "desc": "为工薪阶层量身定制的借款产品，帮助您实现买房的需求提高生活品质。"},
	"1630":	{"title": "其它投资贷款", "desc": ""}
};

Date.prototype.format=function(fmt) {     
    var o = {     
    "M+" : this.getMonth()+1, //月份     
    "d+" : this.getDate(), //日     
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时     
    "H+" : this.getHours(), //小时     
    "m+" : this.getMinutes(), //分     
    "s+" : this.getSeconds(), //秒     
    "q+" : Math.floor((this.getMonth()+3)/3), //季度     
    "S" : this.getMilliseconds() //毫秒     
    };     
    var week = {     
    "0" : "\u65e5",     
    "1" : "\u4e00",     
    "2" : "\u4e8c",     
    "3" : "\u4e09",     
    "4" : "\u56db",     
    "5" : "\u4e94",     
    "6" : "\u516d"    
    };     
    if(/(y+)/.test(fmt)){     
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));     
    }     
    if(/(E+)/.test(fmt)){     
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);     
    }     
    for(var k in o){     
        if(new RegExp("("+ k +")").test(fmt)){     
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));     
        }     
    }     
    return fmt;     
} 
/*特效代码*/
$(function(){
//--------------------------------------------------【切换栅格模式】
	$(window).bind("load ready resize", function() {
		if(document.documentElement.clientWidth>1230){
			$("body").addClass("full");
			$(".no_full").show();
		}else{
			$("body").removeClass("full");
			$(".no_full").hide();
		}
	});
//--------------------------------------------------【头部滚动口号】
	(function(){
		if(document.getElementById("slogan_roll")){
			var oUl=$("#slogan_roll>ul"),
				oLi=oUl.children("li"),
				iLength=oLi.length,
				iHeight=oLi.eq(0).height();
			oUl[0].innerHTML+=oUl[0].innerHTML;
			setInterval(function(){
				if(parseInt(oUl.css("margin-top"))>-iLength*iHeight){
					oUl.animate({
						"margin-top":"-="+iHeight
					});
				}else{
					oUl.css({
						"margin-top":"0"
					}).animate({
						"margin-top":"-="+iHeight
					});
				}
			},3000);
		}
	}());
//--------------------------------------------------【进度条】
	(function(){
		if(document.getElementsByTagName("ui-progress")){
			var i=0,
				oThis,
				iProgress,
				iLength=$(".ui-progress").length;
			for(i=0;i<iLength;i++){
				oThis=$(".ui-progress").eq(i);
				iProgress=parseInt(oThis.text());
				oThis.addClass('ui-progress-'+iProgress);
			}
		}
	}());
	
	//--------------------------------------------------【导航条侧栏】
	//显示隐藏
	$("#classifyTit").hover(function(){
		$("#classifyMain").removeClass("js_hide");
	},function(){
	 	var bShowHide=setTimeout(function(){
			$("#classifyMain").addClass("js_hide");
	 	},500);
	 	$("#classifyMain").hover(function(){
	 		clearTimeout(bShowHide);
	 	},function(){
	 		$("#classifyMain").addClass("js_hide");
	 	});
	});
	//传参跳页面
	$("#classifyMain a").click(function(){
		var oThis=$(this),
			sType=oThis.attr("data-type"),
			sVal=oThis.attr("data-val");
		window.location.href="/tl/select.html?type="+sType+"&val="+sVal;
	});
});
