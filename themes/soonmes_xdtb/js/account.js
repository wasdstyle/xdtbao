(function($) {
    $.fn.extend({
        /* 充值、提现页面输入金额后，显示金额的中文提示文字 */
        numberConvert: function(option) {
            var options = $.extend({
                moneyTip: '.money-tip'
            }, option);
            
            // 输入的金额可能会不合法或数值不在范围内
            // 金额数字需要截取或改变，然后再执行下面的方法
            // 需要延迟20ms，以防止下面的moneyVal取到的是改变之前的数字
           /* $(this).bind('keyup blur', function() {
                var Num = this.value;
                var moneyTip = $(options.moneyTip);
                for(i=Num.length-1;i>=0;i--) 
                　　{ 
                　　Num = Num.replace(",","")//替换tomoney()中的"," 
                　　Num = Num.replace(" ","")//替换tomoney()中的空格 
                　　} 
                　　Num = Num.replace("￥","")//替换掉可能出现的￥字符 
                　　if(isNaN(Num)) 
                　　{ //验证输入的字符是否为数字 
                　　alert("请检查小写金额是否正确"); 
                　　return; 
                　　} 
                　　//---字符处理完毕，开始转换，转换采用前后两部分分别转换---// 
                　　part = String(Num).split("."); 
                　　newchar = ""; 
                　　//小数点前进行转化 
                　　for(i=part[0].length-1;i>=0;i--) 
                　　{ 
                　　if(part[0].length > 10) 
                　　{ 
                　　alert("位数过大，无法计算"); 
                　　return ""; 
                　　}//若数量超过拾亿单位，提示 
                　　tmpnewchar = "" 
                　　perchar = part[0].charAt(i); 
                　　switch(perchar) 
                　　{ 
                　　case "0": tmpnewchar="零" + tmpnewchar ;break; 
                　　case "1": tmpnewchar="一" + tmpnewchar ;break; 
                　　case "2": tmpnewchar="二" + tmpnewchar ;break; 
                　　case "3": tmpnewchar="三" + tmpnewchar ;break; 
                　　case "4": tmpnewchar="四" + tmpnewchar ;break; 
                　　case "5": tmpnewchar="五" + tmpnewchar ;break; 
                　　case "6": tmpnewchar="六" + tmpnewchar ;break; 
                　　case "7": tmpnewchar="七" + tmpnewchar ;break; 
                　　case "8": tmpnewchar="八" + tmpnewchar ;break; 
                　　case "9": tmpnewchar="九" + tmpnewchar ;break; 
                　　} 
                　　switch(part[0].length-i-1) 
                　　{ 
                　　case 0: tmpnewchar = tmpnewchar +"元" ;break; 
                　　case 1: if(perchar!=0)tmpnewchar= tmpnewchar +"十" ;break; 
                　　case 2: if(perchar!=0)tmpnewchar= tmpnewchar +"百" ;break; 
                　　case 3: if(perchar!=0)tmpnewchar= tmpnewchar +"千" ;break; 
                　　case 4: tmpnewchar= tmpnewchar +"万" ;break; 
                　　case 5: if(perchar!=0)tmpnewchar= tmpnewchar +"十" ;break; 
                　　case 6: if(perchar!=0)tmpnewchar= tmpnewchar +"百" ;break; 
                　　case 7: if(perchar!=0)tmpnewchar= tmpnewchar +"千" ;break; 
                　　case 8: tmpnewchar= tmpnewchar +"亿" ;break; 
                　　case 9: tmpnewchar= tmpnewchar +"十" ;break; 
                　　} 
                　　newchar = tmpnewchar + newchar; 
                　　}//for 
                　　//小数点之后进行转化 
                　　if(Num.indexOf(".")!=-1) 
                　　{ 
                　　if(part[1].length > 2) 
                　　{ 
                　　alert("小数点之后只能保留两位,系统将自动截段"); 
                　　part[1] = part[1].substr(0,2) 
                　　} 
                　　for(i=0;i<part[1].length;i++) 
                　　{//for2 
                　　tmpnewchar = "" 
                　　perchar = part[1].charAt(i) 
                　　switch(perchar) 
                　　{
                　　case "0": tmpnewchar="零" + tmpnewchar ;break; 
                　　case "1": tmpnewchar="一" + tmpnewchar ;break; 
                　　case "2": tmpnewchar="二" + tmpnewchar ;break; 
                　　case "3": tmpnewchar="三" + tmpnewchar ;break; 
                　　case "4": tmpnewchar="四" + tmpnewchar ;break; 
                　　case "5": tmpnewchar="五" + tmpnewchar ;break; 
                　　case "6": tmpnewchar="六" + tmpnewchar ;break; 
                　　case "7": tmpnewchar="七" + tmpnewchar ;break; 
                　　case "8": tmpnewchar="八" + tmpnewchar ;break; 
                　　case "9": tmpnewchar="九" + tmpnewchar ;break;
                　　}
                　　if(i==0)tmpnewchar =tmpnewchar + "角"; 
                　　if(i==1)tmpnewchar = tmpnewchar + "分"; 
                　　newchar = newchar + tmpnewchar; 
                　　}//for2
                　　}
                　　//替换所有无用汉字
                　　while(newchar.search("零零") != -1) 
                　　newchar = newchar.replace("零零", "零"); 
                　　newchar = newchar.replace("亿零万", "亿"); 
                　　newchar = newchar.replace("零亿", "亿"); 
                　　newchar = newchar.replace("亿万", "亿"); 
                　　newchar = newchar.replace("零万", "万"); 
                　　newchar = newchar.replace("零元", "元"); 
                　　newchar = newchar.replace("零角", ""); 
                　　newchar = newchar.replace("零分", ""); 
                　　if (newchar.charAt(newchar.length-1) == "元" || newchar.charAt(newchar.length-1) == "角") 
                　　newchar = newchar 
            　　      newchar = newchar.replace(/^一十/, "十"); 
                  this.value !== '0' ? moneyTip.html(newchar) : '';
                　　return newchar; 
            });*/
        },


        /* 数据列表中的日期时间格式转换 */
        dateTimeConvert: function() {
            $(this).each(function() {
                var dateArray = $(this).attr('title').split(' ')[0].split('-');
                var timeArray = $(this).attr('title').split(' ')[1].split(':');
                var week = new Date(dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2]).getDay();
                week = '(星期' + '日一二三四五六'.charAt(week) + ')';
                var dateTime = dateArray[0] + '年' + dateArray[1] + '月' + dateArray[2] + '日 ' + timeArray[0] + ':' + timeArray[1] + week;
                $(this).attr({'title': dateTime});
            });
        },


        /* 银行卡、提现和提现纪录页面的银行卡背景图片动态设置 */
        bankBgSet: function(bankSelect, bankId) {
            var optionStr = $(bankSelect).children('option');
            var optionVal = '';
            var newOption = '';
            optionStr.each(function() {
                optionVal += $(this).attr('value') + ',';
            });

            // 删除最后一个字符','并对数组排序
            var optionValArr = optionVal.substring(0, optionVal.length - 1).split(',').sort(function(a, b) {
                return a - b;
            });

            // 重新构建新的option集合
            for(var i = 0;i < optionValArr.length;i++) {
                newOption += '<option value="' + optionValArr[i] + '">' + $(bankSelect).children('option[value="'+ optionValArr[i] + '"]').text() + '</option>';
            }

            // 银行卡下拉列表插入排序过后的option
            $(bankSelect).html(newOption);

            // 给银行卡logo的容器设置背景图片的坐标
            $(this).each(function() {
                var i = $(bankSelect).children('option[value="' + $(this).siblings(bankId).val() + '"]').index();
                var bgStr = '#fff url(' + themeDir + '/bg/bgs-bank.png) no-repeat ' + '0px -' + (i * 36) + 'px';
                $(this).css({background: bgStr});
            });
        },


        /* 伪下拉列表生成 */
        pseudoSelect: function(selectName) {
            var $pseudo = $(this);
            var $pseudoDl = $pseudo.children('dl');

            // 默认值的index
            var currentIndex = $('[name="' + selectName + '"] option[value="' + ($('[name="' + selectName + '"]').val()) + '"]').index();
            // 原生select里面的第一个option可能没有value属性
            currentIndex === -1 ? currentIndex = 0 : '';

            // 伪下拉列表伪下拉列表生成
            var selectOption = $('[name="' + selectName + '"] option');
            var pseudoDd = '';
            selectOption.each(function() {
                pseudoDd += '<dd value="' + $(this).attr('value') + '">' + $(this).text() + '</dd>';
            });
            $pseudoDl.append(pseudoDd);

            // 给当前值加上高亮样式
            $pseudo.find('dd').eq(currentIndex).addClass('current');
            $pseudo.find('dd').hover(function() {
                $(this).siblings().removeClass('current');
            });

            // 伪下拉列表设置默认值
            $pseudo.children('span').text($pseudoDl.children('dd.current').text());

            // 显示、隐藏伪下拉列表
            $pseudo.click(function() {
                $pseudoDl.toggle();
                // 给伪下拉列表加入滚动条
                loadCss(themeDir + '/plugin/perfect-scrollbar-0.4.6/perfect-scrollbar-0.4.6.css');
                $LAB.script(themeDir + '/plugin/perfect-scrollbar-0.4.6/jquery.mousewheel.js')
                    .script(themeDir + '/plugin/perfect-scrollbar-0.4.6/perfect-scrollbar-0.4.6.js')
                    .wait(function() {
                        $pseudoDl.perfectScrollbar( {
                            suppressScrollX: true,
                            wheelSpeed     : 40,
                            initOffSetY    : currentIndex - 5
                        });
                    });
            });

            $(document).click(function(e) {
                if(!(e.target.className === $pseudo.attr('class') || e.target.parentNode.className === $pseudo.attr('class'))) {
                    $pseudoDl.hide();
                }
            });

            // 伪下拉列表传值
            $pseudo.find('dd').click(function() {
                $pseudo.children('span').text($(this).text());
                $pseudo.siblings('select').val($(this).attr('value'));
            });
        }
    });
})(jQuery);

$(function() {
    /*账户中心菜单折叠、展开*/
    $('.account-menu h1').click(function() {
        if($(this).next('ul').is(':hidden')) {
            $('.account-menu h1').removeClass('unfolder');
            $('.account-menu ul:visible').stop(true,false).toggle('blind', 240, 'easeOutExpo');
            $(this).addClass('unfolder').next('ul').stop(true,false).toggle('blind', 240, 'easeOutExpo');
        }
        
    });
    
    /* 设置左侧菜单高度 */
    if($('.title-list-tab').outerHeight() + $('.account-content').outerHeight() > $('.account-menu').outerHeight()) {
        $('.account-menu').height($('.title-list-tab').outerHeight() + $('.account-content').outerHeight());
    }

    // 更新头像弹出层
 
    /*提示语弹出层展开折叠*/
    if($('[class^="prompt"]').length) {
        var promptInittHeight = $('[class^="prompt"]').height();
        /*如果提示语不止一个p标签，加入展开/折叠的功能*/
        $('[class^="prompt"]').each(function() {
            if($(this).children('li').length > 1) {
                $(this).append('<a href="javascript:" class="prompt-unfolder">更多</a>');
            }
        });

        // 展开提示语弹出层
        $('.prompt-unfolder').live('click', function() {
            var promptChildrenHeight = 0;
            var $promptChildren = $(this).parent().children('li');
            for(var i = 0;i < $promptChildren.length;i++) {
                promptChildrenHeight += $promptChildren.eq(i).outerHeight(true);
            }
            $(this).text('收起').removeClass('prompt-unfolder').addClass('prompt-folder');
            $(this).parent().animate({height: promptChildrenHeight}, 220);
        });

        // 折叠提示语弹出层
        $('.prompt-folder').live('click', function() {
            $(this).text('更多').removeClass('prompt-folder').addClass('prompt-unfolder');
            $(this).parent().animate({height: promptInittHeight}, 220);
        });

        // 当提示语弹出层展开时，点击提示语弹出层以外的区域折叠弹出层
        $(document).click(function(e) {
            if($('.prompt-folder').length && !(e.target.className.match(/^prompt.*/) || e.target.parentNode.className.match(/^prompt.*/))) {
                $('.prompt-folder').trigger('click');
            }
        });
        // 按下esc键时折叠提示语弹出层
        $(document).keyup(function(e) {
            if($('.prompt-folder').length && e.which === 27) {
                $('.prompt-folder').trigger('click');
            }
        });
    }


    /* 数据列表搜索功能-时间输入框 */
    if($('.search .btn-search').length) {
        // laydate.skin('dahong');
        var start = {
                elem   : '#start-time',
                format : 'YYYY-MM-DD hh:mm:ss',
                max    : '2099-06-16 23:59:59', //最大日期
                istime : true,
                istoday: false,
                choose: function(datas){
                    end.min   = datas;  //开始日选好后，重置结束日的最小日期
                    end.start = datas   //将结束日的初始值设定为开始日
                }
            };
        var end = {
            elem   : '#end-time',
            format : 'YYYY-MM-DD hh:mm:ss',
            min    : laydate.now(),
            max    : '2099-06-16 23:59:59',
            istime : true,
            istoday: false,
            choose : function(datas){
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };
        laydate(start);
        laydate(end);
    }


    /* 账户中心通用：地区选择-三级联动下拉列表*/
    $('#province').change(function(){
        $.ajax({
            url     : '/member/identify/showarea.html',
            dataType: 'json',
            data    : 'pid=' + $('#province').val(),
            success : function(json){
                $('#city option, #area option').remove();
                $('#city, #area').append('<option value="-1">请选择</option>');
                $(json).each(function(i){
                    $('#city').append('<option value="' + json[i].id + '">' + json[i].name + '</option>');
                });
            }
        });
    });

    $('#city').change(function(){
        $.ajax({
            url     : '/member/identify/showarea.html',
            dataType: 'json',
            data    : 'pid=' + $('#city').val(),
            success : function(json){
                $('#area option').remove();
                $('#area').append('<option value="-1">请选择</option>');
                $(json).each(function(i){
                    $('#area').append('<option value="' + json[i].id + '">'+ json[i].name + '</option>');
                });
            }
        });
    });
});
