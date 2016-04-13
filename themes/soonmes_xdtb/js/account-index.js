$(function() {
	/* VIP认证弹窗 */
	$('.index-top .identify li a.vip').click(function() {
		art.dialog.open('/member/vip.html', {
			title     : '',
			width     : 780,
			top		  : 155,
			fixed     : true,
			resize    : false,
			lock      : true,
			opacity	  : .3,
			background: '#fff'
		});
	});
		/* VIP认证弹窗 */
	$('a.apply-vip1').click(function() {
		art.dialog.open('/member/vip.html', {
			title     : '',
			width     : 780,
			top		  : 155,
			fixed     : true,
			resize    : false,
			lock      : true,
			opacity	  : .3,
			background: '#fff'
		});
	});

	$('a.recharge-a').click(function() {
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
		/* 查看提现记录 */
	$('a.cash-a').click(function() {
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
	$('#close').click(function(){
		$('.identify-tip').hide();
	})

	if(window.location.href.match('apply-vip')) {
		$('.index-top .identify li a.apply-vip1').trigger('click');
	}

	loadCss(themeDir + '/plugin/poshytip-1.2/src/tip-twitter/tip-twitter.css');
	$LAB.script(themeDir + '/plugin/poshytip-1.2/src/jquery.poshytip.min.js')
		.wait(function() {
			$('.index-top .identify li a').poshytip({
				className  : 'tip-twitter',
				alignTo: 'target',
				alignX:'center',
				alignY     : 'bottom',
				offsetY:0,
				showTimeout: 100
			});
		})
		.script(themeDir + '/plugin/highcharts-4.0.3/highcharts.js')
		.script(themeDir + '/plugin/highcharts-4.0.3/modules/data.js')
		.wait(function() {
			// 颜色数组
			var colors = Highcharts.getOptions().colors,
				// 列名称
				categories = ['账户总额', '账户余额', '冻结金额', '待收金额', '待还金额'],
				// 下方标题
				name = ' ',
				// 列数据、颜色和提示语
				data = [
					{
						y: parseFloat($('#all-amount').val()),
						color: '#f25d53',
						tooltip: '账户总额：可用余额 + 冻结金额 + 待收金额'
					},
					{
						y: parseFloat($('#remain-amount').val()),
						color: '#9bd7dd',
						tooltip: '账户余额：当前您账户中可实际用来投标的金额'
					},
					{
						y: parseFloat($('#frozen-amount').val()),
						color: '#f25d53',
						tooltip: '冻结金额：账户中暂时冻结的金额，包括投资招标中(尚未满标审核)的借款、开通vip等待客服审核等',
						href: '/member/invest/collect.html?status=0'
					},
					{
						y: parseFloat($('#collect-amount').val()),
						color: '#9bd7dd',
						tooltip: '待收金额：当前投资的所有借款标中尚未收回的金额(包括本金和利息)'
					},
					{
						y: parseFloat($('#repay-amount').val()),
						color: '#f25d53',
						tooltip:'待还金额：所有借款还需要偿还的金额总和'
					}
				];
			// 初始化图表
			function setChart(name, categories, data, color) {
				chart.xAxis[0].setCategories(categories, false);
				chart.series[0].remove(false);
				chart.addSeries({
					name: name,
					data: data,
					color: color || 'white'
				}, false);
				chart.redraw();
			}

			// 绘制图表
			var chart = $('.highcharts').highcharts({
				// 图表类型
				chart: {
					type: 'column'
				},
				// 上方标题
				title: {
					text: '资产统计',
					align:'left',
					style: {
						color: '#666',
						fontSize: '18px',
						fontFamily: 'Microsoft YaHei',
						letterSpacing: '1px',
						paddingBottom: '20px'
					}
				},
				// x坐标轴文字
				xAxis: {
					categories: categories,
					lineWidth: 1,
					tickLength: 5,
					lineColor:'#aaa',
					labels: {
						style: {
							color: '#666',
							fontSize: 14,
							fontFamily: 'Microsoft YaHei',
							letterSpacing: 2
						}
					}
				},
				// y坐标轴文字
				yAxis: {
					title: 'enable',
					lineWidth: 1,
					tickWidth: 1,
					tickLength: 5,
					tickColor:'#aaa',
					lineColor:'#aaa',
					gridLineDashStyle: 'dash',
					gridLineColor: '#aaa',
					labels: {
						format:'{value}'
					}
				},
				// 图表每一列的文本和指针样式
				plotOptions: {
					column: {
						dataLabels: {
							enabled: true,
							color: '#666',
							style: {
								fontFamily:'Arial'
							},
							formatter: function() {
								return this.y;
							}
						},
					}
				},
				// 图表每一列的提示语样式
				tooltip: {
					color: '#666',
					style: {
						fontFamily:'Microsoft YaHei'
					},
					formatter: function() {
						return this.point.tooltip;
					}
				},
				// 下方图例
				series: [{
					name: name,
					data: data,
					showInLegend:false
				}],
				// 是否允许导出
				exporting: {
					enabled: false
				}
			})
			.highcharts(); // return chart
		});
});


$.ajax({
	url:"/member/invest/jsonTender.html",
	type:"get",
	dataType:"json",
	success:function(data){
		var strs="";
		var zt="";
		var time="";
		var timeval="";
        var strlenght =data.data.length;
        for(var i = 0; i<strlenght; i++){ 
        	
        	if(data.data[i].status == 1){
        		zt = "已完成";
        	}
        	else if(data.data[i].status == 0){
        		zt = "未完成"
        	}
        	
        	timeval = data.data[i].addtime
        	
        	/*
        	* format="yyyy-MM-dd hh:mm:ss";
        	*/
        	function getLocalTime(timeval) {     
        	      return new Date(parseInt(timeval) * 1000).toLocaleString().substr(0,17)
        	    }     
        	time =  getLocalTime(timeval); 
        	
        	// v1.9.u2 BIAOZHUN-397 zza 2015-03-23 start
		   strs += "<ul class='item clearfix'>" 
			    + "<li class='time'>" + time + "</li>" 
		   		+ "<li class='title'>" + "<a href='/invest/detail.html?borrowid=" + data.data[i].id + "' target='_blank'>" + data.data[i].borrow_name + "</a>" + "</li>" 
		   		+ "<li>" + data.data[i].interest + "</li>" 
		   		+ "<li>" + data.data[i].op_username + "</li>"
				+ "<li class='amount'>" + "<b>" + data.data[i].account + "</b>" + "</li>" 
				+ "<li class='zt'>" + zt + "</li>"
				+ "</ul>";
		   // v1.9.u2 BIAOZHUN-397 zza 2015-03-23 end
        }
		$("#aa").html(strs);
	}
})


