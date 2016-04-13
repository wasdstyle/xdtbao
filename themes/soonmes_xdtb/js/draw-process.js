// 新增：延迟绘制，出现在视口中才绘制
// 
$.fn.drawProcess = function(options) {
    var options = $.extend({
        width        : 100,     //进度条直径(canvas的宽度),
        processWidth : 5,       //进度条的粗细
        animation    : true,    //开启进度条加载动画
        processColor : '#0B0',  //进度条扇形背景颜色(进度条主颜色)
        endPointArc  : false,   //进度条端点圆弧
        outerCircleBg: '#ddd',  //外圆背景颜色
        innerCircleBg: '#fff',  //内圆背景颜色
        textColor    : '#333',  //进度条文字的颜色
        textSize     : '8pt',   //进度条文字的大小(单位pt)
        textWeight   : 'bold',  //进度条文字的粗细
        textFamily   : 'Arial', //进度条文字的字体
        drawSpeed    : 10        //进度条绘制速度(2~10)
    }, options);

    var circleCenter      = options.width / 2,                          //圆心x坐标、y坐标
        outerCircleRadius = options.width / 2,                          //外圆半径
        sectorRadius      = options.width / 2,                          //进度条扇形半径
        innerCircleRadius = options.width / 2 - options.processWidth;   //内圆半径

    $(this).each(function() {
        var $this          = $(this);
        this.width         = $(this).width();
        this.height        = $(this).height();
        var process        = parseInt($this.attr('percent'));   // 进度条的数值
        var text           = $this.attr('percent') + '%';       // 进度数值
        var currentProcess = 0;                                 // 进度条绘制时的当前进度
        var painter        = this.getContext('2d');             // 画笔
        // 绘制方法
        var draw = function () {
            // 绘制外圆
            painter.beginPath();
            painter.moveTo(circleCenter, circleCenter);  
            painter.arc(circleCenter, circleCenter, outerCircleRadius, 0, Math.PI * 2, false);  
            painter.closePath();  
            painter.fillStyle = options.outerCircleBg;  
            painter.fill();  
              
            // 绘制进度条扇形
            painter.beginPath();  
            painter.moveTo(circleCenter, circleCenter);  
            if(currentProcess) {
                // ie9以下的浏览器，100%的进度绘制会出现一个异常，将绘制的方向相反即可
                var drawDirection = /(7.0)|(8.0)/.test($.browser.version) && currentProcess === 100 ? true : false;
                painter.arc(circleCenter, circleCenter, sectorRadius, Math.PI * 1.5, Math.PI * (2 * currentProcess / 100 + 1.5), drawDirection);
            }

            painter.closePath();
            painter.fillStyle = options.processColor;  
            painter.fill();  
         
            // 绘制进度条开始、结束位置的圆弧
            if(options.endPointArc && currentProcess) {
                // 进度条开始位置的圆弧圆心坐标和半径
                var beginArcCenterX = circleCenter;
                var beginArcCenterY = (sectorRadius - innerCircleRadius) / 2 + (circleCenter - sectorRadius);
                var beginArcRadius = (sectorRadius - innerCircleRadius) / 2;
                painter.beginPath();
                painter.moveTo(beginArcCenterX, beginArcCenterY);  
                painter.arc(beginArcCenterX, beginArcCenterY, beginArcRadius,  0, Math.PI * 2, false);  
                painter.closePath();  
                painter.fillStyle = options.processColor;  
                painter.fill(); 

                // 进度条结束的圆弧的圆心坐标和半径
                var endArcCenterX = circleCenter + Math.sin(Math.PI * 2 * (currentProcess / 100)) * (sectorRadius - endArcRadius);
                var endArcCenterY = circleCenter - Math.cos(Math.PI * 2 * (currentProcess / 100)) * (sectorRadius - endArcRadius);
                var endArcRadius = (sectorRadius - innerCircleRadius) / 2;
                painter.beginPath();
                painter.moveTo(endArcCenterX, endArcCenterY);  
                painter.arc(endArcCenterX, endArcCenterY, endArcRadius, 0, Math.PI * 2, false);  
                painter.closePath();  
                painter.fillStyle = options.processColor;  
                painter.fill(); 
            }

            // 绘制内圆
            painter.beginPath();  
            painter.moveTo(circleCenter, circleCenter);  
            painter.arc(circleCenter, circleCenter, innerCircleRadius, 0, Math.PI * 2, false);  
            painter.closePath();  
            painter.fillStyle = options.innerCircleBg;  
            painter.fill();  
              
            // 绘制中间的字体
            painter.font         = options.textWeight + ' ' + options.textSize + ' ' + options.textFamily;
            painter.fillStyle    = options.textColor;  
            painter.textAlign    = 'center';  
            painter.textBaseline = 'middle';
            painter.moveTo(circleCenter, circleCenter);  
            painter.fillText(text, circleCenter, circleCenter);
        };

        // 绘制进度条条，形成动画
        // ie9以下的浏览器的绘制动画很卡，禁用动画
        if(!options.animation || /(7.0)|(8.0)/.test($.browser.version)) {
            currentProcess = parseInt($this.attr('percent'));
            draw();
        }else{
            timer = setInterval(function() {
                if(currentProcess <= process) {
                    // 重绘之前先清空画布
                    painter.clearRect(0, 0, $this.width(), $this.height());
                    draw();
                    currentProcess++;
                }
            }, options.drawSpeed);
        }
    });
}