$(function() {
	$LAB.script(themeDir + '/plugin/jQueryRotate.2.2.js')
		.script(themeDir + '/plugin/jquery.easing-1.3.min.js')
		.wait(function() {
			var dataVal = $("#lotteryBtn").attr("data-val");
			var timeOut = function() {
				$("#lotteryBtn").rotate({
					angle: 0,
					duration: 10000,
					animateTo: 2160,
					callback: function() {
						alert('网络超时')
					}
				});
			};

			var rotateFunc = function(awards, angle, text) { 
				$('#lotteryBtn').stopRotate();
				$("#lotteryBtn").rotate({
					angle: 0,
					duration: 5000,
					animateTo: angle + 2160, 
					callback: function() {
						alert(text);
						dataVal = 0;
					}
				});
			};

			$("#lotteryBtn").rotate(18);
			$("#lotteryBtn").rotate({
				bind: {
					click: function() {
						var ruleId = $("#id").val();
						var ruleUrl = "/award/award.html?id=" + ruleId + "&randID=" + escape(new Date());
						if (dataVal == 1) {
							return false;
						}
						$.ajax({
							url: ruleUrl,
							dataType: "json",
							data: "data",
							error: function() {
								timeOut();
							},
							success: function(result) {
								var levelNo = "";
								var prizeName = "";
								var times="";
								var status = result.data.is_success;
								if (status == "T") {
									levelNo = result.data.level_no;
									prizeName = result.data.name;
									prize_num(levelNo, prizeName);
								} else if (status == "F") {
									errorMsg = result.data.error;
									if (errorMsg == "RESULT_NO_REGISTER") {
										alert("没有登录"); //参数错误
										dataVal = 0;
									} else if (errorMsg == "RESULT_PARAMETER_ERROR") {
										rotateFunc(0, 22, '很遗憾，这次您未抽中奖'); // 参数错误
										dataVal = 1;
										//alert("未中奖")	
									} else if (errorMsg == "RESULT_INVALID_RULE_ID") {
										rotateFunc(0, 22, '很遗憾，这次您未抽中奖'); //规则ID不存在
										dataVal = 1;
										//alert("规则ID不存在")	
									} else if (errorMsg == "RESULT_BEFORE_START_TIME") {
										alert("活动还没开始");
										dataVal = 0;
									} else if (errorMsg == "RESULT_AFTER_END_TIME") {
										alert("活动已经结束");
										dataVal = 0;
									} else if (errorMsg == "RESULT_POINT_LIMIT") {
										alert("你的积分不足咯");
										dataVal = 0;
									} else if (errorMsg == "RESULT_TIME_LIMIT") {
										rotateFunc(0, 0, "抽奖次数用完啦");
										dataVal = 1;
									} else if (errorMsg == "RESULT_NO_AWARD") {
										rotateFunc(0, 22, '很遗憾，这次您未抽中奖');
										dataVal = 1;
										//alert("未中奖")	
									} else if (errorMsg == "RESULT_NO_AWARD_OBJ") {
										rotateFunc(0, 22, '很遗憾，这次您未抽中奖');
										dataVal = 1;
										//alert("未中奖")	
									} else if (errorMsg == "RESULT_MONEY_LIMIT") {
										rotateFunc(0, 22, '很遗憾，这次您未抽中奖');
										dataVal = 1;
									}
								}
							}
						});

						function prize_num(data, prizeName) {
							if (data == 1) {
								return rotateFunc(1, 306, '恭喜您抽中了' + prizeName); //一等奖
							}
							if (data == 2) {
								return rotateFunc(2, 342, '恭喜您抽中了' + prizeName) //二等奖
							}
							if (data == 3) {
								return rotateFunc(3, 270, '恭喜您抽中了' + prizeName) //三等奖
							}
							if (data == 4) {
								return rotateFunc(4, 198, '恭喜您抽中了' + prizeName)
							}
							if (data == 5) {
								return rotateFunc(5, 90, '恭喜您抽中了' + prizeName)
							}
							if (data == 6) {
								return rotateFunc(6, 126, '恭喜您抽中了' + prizeName)
							}
							if (data == 7) {
								return rotateFunc(7, 54, '恭喜您抽中了' + prizeName)
							}
							if (data == 8) {
								return rotateFunc(8, 164, '恭喜您抽中了' + prizeName)
							}
							if (data == 9) {
								return rotateFunc(9, 18, '恭喜您抽中了' + prizeName)
							}
							if (data == 10) {
								return rotateFunc(10, 162, '恭喜您抽中了' + prizeName)
							}
							if (data == 11) {
								return rotateFunc(11, 234, '恭喜您抽中了' + prizeName)
							}
						}
						dataVal = 1;
					}
				}
			});
			
			function refreshPrize(id,typeVal){
				var box = $(id);
				var ruleId = $("#id").val();
				var ruleUrl = "";
				if(typeVal == 1)
				{
					ruleUrl = "/award/getAwardList.html?id="+ruleId+"&randID="+ escape(new Date());
				}
				else if(typeVal == 2){
					ruleUrl = "/award/getAwardList.html?id="+ruleId+"&randID="+ escape(new Date())+"&level=level";
				}
				var str="";
				$.ajax({
					url:ruleUrl,
					error:function(){
						
					},
					success:function(data){
						var prize = data.data;
						var len = prize.length;
						for( var i = 0 ; i<len ; i++)
						{
							str+="<li class='clearfix'>"+prize[i].name.substring(0,3)+"&nbsp;"+prize[i].time.substring(0,10)+"&nbsp;"+prize[i].award+"</b></li>";
						}
						box.html(str);
					}	
				})
			}

			Timer = setInterval(function(){
				refreshPrize("#prize-list-ul",1);
			},10000);
		});
});