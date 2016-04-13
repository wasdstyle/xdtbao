$(function() {
	$('.list-rule-edit li').each(function() {
		if($(this).children('input[type="checkbox"]').length) {
			$(this).children('input[type="checkbox"]').attr({title: '如果不勾选此规则的复选框，表示您将此规则设置为不限制'});
		}
	});

	/* 借款期限(原来是radio，现在改为checkbox) */
	$('#timelimit_status').click(function() {
		$(this).siblings(':radio').removeAttr('checked');
		if($(this).attr('checked')) {
			$('[name="timelimit_status"][value="1"]').attr({checked: 'checked'});
		}else {
			$('[name="timelimit_status"][value="0"]').attr({checked: 'checked'});
		}
	});

	/* 年利率范围、借款期限、还款方式禁用/启用 */
	$('.list-rule-edit li :checkbox').each(function() {
		if(!$(this).attr('checked')) {
			$(this).siblings('select').attr({disabled: true});
			$(this).siblings().find('select').attr({disabled: true});
		}
		$(this).click(function() {
			if(!$(this).attr('checked')) {
				$(this).siblings('select').attr({disabled: true});
				$(this).siblings().find('select').attr({disabled: true});
			}else {
				$(this).siblings('select').removeAttr('disabled');
				$(this).siblings().find('select').removeAttr('disabled');
			}
		});
	});

	/* 年利率范围、借款期限选择范围不正确时提示 */
	$('[name="apr_first"], [name="apr_last"]').change(function() {
		var minApr = parseInt($('[name="apr_first"] option:selected').attr('value'));
		var maxApr = parseInt($('[name="apr_last"] option:selected').attr('value'));	
		if(minApr >= maxApr) {
			$(this).siblings('span').text('年利率范围设置不正确！').show();
		}else {
			$(this).siblings('span').hide();
		}
	});

	$('[name="timelimit_month_first"], [name="timelimit_month_last"], [name="timelimit_day_first"], [name="timelimit_day_last"]').change(function() {
		if(($(this).val() === '0' && $(this).siblings('select').val() !== '0') || ($(this).val() !== '0' && $(this).siblings('select').val() === '0')) {
			$(this).siblings('span').text('借款期限范围设置不正确！').show();
		}if($(this).val() === '0' && $(this).siblings('select').val() === '0') {
			$(this).siblings('span').hide();
		}else {
			var minTimeLimit = parseInt($(this).parent().children('select:first').children('option:selected').attr('value'));
			var maxTimeLimit = parseInt($(this).parent().children('select:last').children('option:selected').attr('value'));	
			if(minTimeLimit >= maxTimeLimit) {
				$(this).siblings('span').text('借款期限范围设置不正确！').show();
			}else {
				$(this).siblings('span').hide();
			}
		}
	});
});