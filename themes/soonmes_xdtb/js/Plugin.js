(function($) {
	/*=1 alert弹出框=*/
	$.extend({
		alert:function(options){
			var o = {
				bClose:true,//是否显示关闭按钮
				bBtnCon:true,//	是否显示确定按钮
				sTitle:'温馨提示',//提示
				sTitleBgColor:'#8DD2D2',//提示标题背景色
				sContent:'',//内容
				iWidth:'400px',//宽度
				iHeight:'200px',//高度
				sBtnCon:'确定',//确定按钮内容
				sBtnOkColor:'#6DBB86',//确定按钮 	
				fn:'',
			}	
			var o = $.extend(o,options);
			var sHtml = '<div class="wrapper_bg"></div>'
						+ '<div class="wrapper">'
						+ '<div class="focus">'
						+ '<span class="w_title">'+ o.sTitle +'</span>'
						+ '<div class="w_content">' + o.sContent + '</div>';	
						
			if(o.bClose){
				sHtml +=  '<span id="box_close" class="w_close" >关闭</span>';	
			}
			if(o.bBtnCon){
				sHtml +=  '<div class="btn_cont"><span id="box_queding"  class="w_btn w_btn_green">'+o.sBtnCon+'</span></div>';	
			}
			
			sHtml +=  '</div>'
					+ '</div>';	
			$("body").prepend(sHtml);
			//进入效果添加 --start
			//$(".wrapper").hide();
			//$(".wrapper").fadeIn().animate({top:'200px',},'10');
			//进入效果添加 --end
			$(".wrapper").css({
				width: o.iWidth,
				height: o.iHeight,
				marginLeft: (-parseInt(o.iWidth)/2)+'px',
			});
			$(".wrapper .w_title").css({
				background: o.sTitleBgColor,
			});
			$(".wrapper .w_btn").css({
				marginLeft: (-parseInt($(".wrapper .w_btn").width())/2)+'px',
				background: o.sBtnOkColor,
			});
			
			function btnNo(){	
				$(".wrapper_bg").remove();
				$(".wrapper").remove();
			}
			function btnApply(){
				
			}
			$("#box_close").click(function(){btnNo();});
			$("#box_queding").click(function(){btnNo();o.fn&&o.fn()});			
		}
	});
	/*=2 confirm确认框=*/
	$.extend({
		confirm:function(options){
			o =	{
				bClose:true,//是否显示关闭按钮
				sTitle:'',//提示
				sContent:'',//内容
				iWidth:'400px',//宽度
				iHeight:'200px',//高度
				sBtnOk:'确定',//确定按钮
				sBtnQuxiao:'取消',//取消按钮
				sBtnOkColor:'#6DBB86',//确定按钮颜色
				sBtnQuxiaoColor:'#00a2e8',//取消按钮颜色
				fnOk:'',
				fnOn:'',
			};
			var o = $.extend(o,options);
			var sHtml = '<div class="wrapper_bg"></div>'
						+ '<div class="wrapper">'
						+ '<div class="focus">'
						+ '<span class="w_title">'+ o.sTitle +'</span>'
						+ '<div class="w_content">' + o.sContent + '</div>';	
						
			if(o.bClose){
				sHtml +=  '<span id="box_close" class="w_close">关闭</span>'
						+ '<div class="btn_cont"><span id="box_queding" class="w_btn w_btn_green" style="margin-right: 10px;">'+o.sBtnOk+'</span>'
						+ '<span id="box_quxiao" class="w_btn w_btn_blue">'+o.sBtnQuxiao+'</span></div>';	
			}
			sHtml +=  '</div>'
					+ '</div>';	
			$("body").append(sHtml);	
			$(".wrapper").css({
				width: o.iWidth,
				height: o.iHeight,
				marginLeft: (-parseInt(o.iWidth)/2)+'px',
			});
			$("#box_queding").css({		
				background: o.sBtnOkColor,
			});
			
			$(".wrapper .focus .btn_cont").css({
				marginLeft: (-parseInt($(".wrapper .focus .btn_cont").width())/2)+'px',
			});
			
			function btnNo(){
				$(".wrapper_bg").remove();
				$(".wrapper").remove();
			}
			$("#box_close").click(function(){btnNo();});
			$("#box_queding").click(function(){btnNo();o.fnOk&&o.fnOk();});	
			$("#box_quxiao").click(function(){btnNo();o.fnOn&&o.fnOn();});
		}
	});
	
	/*=2 table表格=*/
	$.fn.extend({
		table:function(options){
			var o = {
				type:'1',
				url:'',
				data:[{
					id:'id',
					name:'序号',
				},{
					id:'user_name',
					name:'投资人',
				},{
					id:'inverse_money',
					name:'投标金额',
				}],
				
			};
			var o = $.extend(o,options);
			var sHtml = '';
			sHtml += '<table>'
					+'	<tr>'
					+'		<td>'+ o.data[1] +'</td>'
					+'	</tr>';
			
			sHtml += '</table>';
		}
	});
})(jQuery);




