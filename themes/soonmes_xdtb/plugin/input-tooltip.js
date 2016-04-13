(function ($) {
    $.fn.extend({
        toolTip: function (option) {
            var options = $.extend({ 
                position      : 'horizonal', 
                left          : 0,
                top           : 0,
                initShow      : true
            }, option);

            var position    = options.position;
            var left = options.left;
            var top = options.top;
            return this.each(function () {
                var self = this;
                var toolTip = $('<div class="tooltip-input">' + options.text + '</div>');

                // 在输入框之前插入提示语
                $(self).before(toolTip);
                
                // 设置提示语的位置
                if(options.position === 'horizonal') {
                    left = $(self).outerWidth(true) + left;
                }else if(options.position === 'vertical'){
                    top = $(self).outerHeight(true) + top;
                }
                toolTip.css({
                    position: 'absolute',
                    left: left,
                    top: top
                });

                // 隐藏提示语(默认显示)
                if(!options.initShow){
                    toolTip.css({display: 'none'});
                    $(self).focus(function() {
                       toolTip.stop(false, true).show();
                    });
                }
            });
        },

        /* 提示语初始状态 */
        toolTipInit: function(initText) {
            $(this).siblings('.icon-input-right').remove();
            $(this).siblings('.tooltip-input').html(initText).removeClass('error').show();
        },

        /* 提示语错误状态 */
        toolTipError: function(errorText) {
            $(this).siblings('.icon-input-right').remove();
            $(this).siblings('.tooltip-input').html(errorText).addClass('error').show();
        },

        /* 隐藏提示语 */
        toolTipHide: function() {
            $(this).siblings('.tooltip-input').removeClass('error').hide();
            $(this).siblings('.icon-input-right').length ? '' : $(this).parents('li').append('<div class="icon-input-right"></div>');
        }
    });
})(jQuery);