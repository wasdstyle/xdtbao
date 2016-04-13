$(function() {
	$LAB.script(themeDir + '/plugin/ZeroClipboard/ZeroClipboard-1.0.7.js')
		.wait(function() {
			// 隐藏输入框闪烁的光标
			$('#invite-url').focus(function() {
				$(this).blur();
			});

	        //引入 Zero Clipboard flash文件   
	        ZeroClipboard.setMoviePath(themeDir + '/plugin/ZeroClipboard/ZeroClipboard-1.0.7.swf');   
	        //新建对象   
	        var clip = new ZeroClipboard.Client();   
	        clip.setHandCursor(true); 
	        //添加监听器，通过传入的参数设置剪贴板内容   
	        clip.addEventListener('mouseOver', function(client) {
	            clip.setText($('#invite-url').val());
	        });  
	        //完成点击复制后弹出提示
	        clip.addEventListener('complete', function (client, text) {   
	            art.dialog({
	    			title  : '提示',
	    			icon   : 'succeed',
	    			content: '复制邀请链接成功！',
	    			time   : 2
	    		});
	        });   
	        //绑定触发对象按钮ID   
	        clip.glue('btn-copy-url');   

		    //网页缩放后重设flash的位置
		    $(document).resize(function() {
		        clip.reposition();
		    }); 

		    //窗口改变大小后重设flash的位置
		    $(window).resize(function() {
		        clip.reposition();
		    });
		});	
});