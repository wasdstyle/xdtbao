$(function() {
	/* 修改日期的title属性*/
	$('.list-message li.date').dateTimeConvert();

	/* 信息复选框全选/全不选 */
	$('.select-all').click(function() {
		if($(this).attr('checked')) {
			$('.list-message li.select input').attr({checked: true});
			$('.list-message').addClass('selected');
		}else {
			$('.list-message li.select input').attr({checked: false});
			$('.list-message').removeClass('selected');
		}
	});


	/* 选中的信息背景高亮 */
	$('.list-message li.select input').click(function() {
		if($(this).attr('checked')) {
			$(this).parents('ul').addClass('selected');
		}else {
			$(this).parents('ul').removeClass('selected');
		}
	});


	/* 提交操作 */
	$('#form-list-message .operate a').click(function() {
		$('#type').val($(this).attr('operate-type'));
		if(!$('.list-message li.select input:checked').length) {
			errorDialog('没有选中任何信息，请选择！');
			return false;
		}else {
			$('#form-list-message').submit();
		}
	});


	/* 删除当前信息 */
	$('.view-operate .btn-delete').click(function() {
		var self = this;
		art.dialog.confirm('确定要删除此信息吗？', function() {
			location.href = 'set.html?type=1&ids=' + self.id;
		});
	});


	/* 时间格式转换 */
	$('.message-info li .time').dateTimeConvert();
	$('.message-info li .time').text($('.message-info li .time').attr('title')).removeAttr('title');


	$LAB.script(themeDir + '/plugin/jquery.cookie-1.4.1.js')
		.wait(function() {
			if(location.href.match('box.html')) {
				$.cookie('msgListUrl', location.href);
			}else {
				/* 查看信息-返回列表功能 */
				$('.view-operate .btn-back').click(function() {
					location.href = $.cookie('msgListUrl') ? $.cookie('msgListUrl') : '/member/message/box.html';
				});
			}
			
		});
});