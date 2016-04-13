$(function() {
	
	loadCss(themeDir + '/plugin/jqueryJcrop/jquery.Jcrop.min.css');
	loadCss(themeDir + '/plugin/perfect-scrollbar-0.4.6/perfect-scrollbar-0.4.6.css');
	$LAB.script(themeDir + '/plugin/perfect-scrollbar-0.4.6/jquery.mousewheel.js')
		.script(themeDir + '/plugin/perfect-scrollbar-0.4.6/perfect-scrollbar-0.4.6.js')
		.wait(function() {
			$('.wp-crop-img').perfectScrollbar({suppressScrollX: true});
		})
		.script(themeDir + '/plugin/jqueryJcrop/jquery.Jcrop.min.js')
		.script(themeDir + '/plugin/ajaxfileupload.js')
		.wait(function() {
			var cropX, cropY, cropW, cropH;
			// ajax异步上传图片
			$('#upload').live('change', function() {
				$.ajaxFileUpload ({
					url          : '/upload.html',
					secureuri    : false,
					fileElementId: 'upload',
					dataType     : 'json',
					data         : {name:'logan', id:'id'},
					success      : function (data, status) {
						if(typeof(data.error) != 'undefined') {
							if(data.error != '') {
								alert('error' + data.error);
							}else {
				                $('.wp-crop-img').html('<img src="' + data.msg + '?t=' + (new Date()).getTime() + '" id="crop-img">');
				                $('.wp-preview img').attr({src: data.msg + '?t=' + (new Date()).getTime()});
				                $('.wp-change-avatar .avatar, #upload, .btn-select-pic').hide();
				                $('.wp-crop-img, .wp-preview, .btn-cancel-change, .btn-save-avatar').show().css({display: 'block'});
				                crop();
							}
						}
					},
					error: function (data, status, e) {
						alert(e);
					}
				});
			});
			
			// 裁剪图片
			function crop(){
				var boundx = 100, boundy = 100;
				cropObj=$('#crop-img').Jcrop({
					setSelect  : [0,0,80,80],
					onChange   : updatePreview,
					onSelect   : updatePreview,
					aspectRatio: 1,
					minSize    : [30,30]
				},function(){
					var bounds = this.getBounds();
					boundx     = bounds[0];
					boundy     = bounds[1];
					jcrop_api  = this;
				});
				  
				function updatePreview(c) {
					if (parseInt(c.w) > 0) {
					  	var rx = 100 / c.w;
					  	var ry = 100 / c.h;
					  	cropX = c.x;
					  	cropY = c.y;
					  	cropW = c.w;
					  	cropH = c.h;
					  	$('.wp-preview img').css({
							width     : Math.round(rx * boundx) + 'px',
							height    : Math.round(ry * boundy) + 'px',
							marginLeft: '-' + Math.round(rx * c.x) + 'px',
							marginTop : '-' + Math.round(ry * c.y) + 'px'
					  });
					}
				};
			}
				
			// 保存头像
			$('.btn-save-avatar').bind('click', function() {
				$.post(
					"../../saveAvatar.action",
					{
						cropX: cropX,
						cropY: cropY,
						cropW: cropW,
						cropH: cropH
					},
					function(data, textStatus){
						if(data.flag){
							// 在账户中心首页更新头像时，以iframe的形式打开
							if(window.parent.document !== window.document) {
								var avatar = $('.avatar a img', window.parent.document);
								window.parent.$.fancybox.close();
							}else {
								var avatar = $('.wp-change-avatar .avatar img');
			                	$('.wp-crop-img, .wp-preview, .btn-cancel-change, .btn-save-avatar').hide();
								$('.wp-change-avatar .avatar, #upload, .btn-select-pic').show();
								okDialog('更新头像成功');
							}
							avatar.attr({src: avatar.attr('src') + '&t=' + (new Date()).getTime()});
						}
					}
				);
			});

			// 取消上传头像
			$('.btn-cancel-change').click(function() {
				if(window.parent.document !== window.document) {
					window.parent.$.fancybox.close();
				}else {
			    	$('.wp-crop-img, .wp-preview, .btn-cancel-change, .btn-save-avatar').hide();
					$('.wp-change-avatar .avatar, #upload, .btn-select-pic').show();
				}
			});
		});
});