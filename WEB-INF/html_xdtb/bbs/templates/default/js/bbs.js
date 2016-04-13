/**
 * ${webname!}
 * @affect 论坛相关
 * @date 2014-3-20
 * @version $V1.0$
 */

//---------------------------------------------------【幻灯片】
//构造函数
function SLIDESHOW(dom,timer){
    this.silderShow = dom.find("ul").eq(0); //幻灯片容器
    this.silderBtn = dom.find(".btn a"); //幻灯片指示器
    this.imgWidth = parseInt(dom.css("width")); //幻灯片容器的宽度（移动的单位距离）
    this.imgNum = this.silderShow.find("li").length; //幻灯片的数量

    //自动滚动
    var autoScroll;
    dom.mouseenter(function(){
        if(autoScroll){
            clearInterval(autoScroll);
            autoScroll = undefined;
        }
    });

    dom.mouseleave(function(){
        if(!autoScroll){
            autoScroll = setInterval(function(){
                var element = dom.find(".hover").eq(0);
                var elementArray = dom.find(".btn a");
                var index = elementArray.index(element); //当前的index值
                var length = elementArray.length - 1; //幻灯总数

                if(index < length){

                    elementArray[index + 1].click();
                }else{
                    elementArray[0].click();
                }

            },timer);
        }
    });

    dom.mouseleave();
}

//点击幻灯片指示器
SLIDESHOW.prototype.active = function(e){
    var index = this.silderBtn.index(e); //当前点击的指示器的index值
    this.silderBtn.removeClass("active");
    e.addClass("active");
    this.move(index);
};

//计算幻灯片容器的移动距离
SLIDESHOW.prototype.move = function(index){
    //计算距离
    var mun = "-" + index * this.imgWidth;

    //移动动画
    this.silderShow.animate({
        marginLeft : mun + "px"
    },500);
};



$(function(){
    //---------------------------------------------------【幻灯效果】
    var html = "";
    for(var i=0;i<$(".slide-inner ul li").length;i++){
        html += '<a href="javascript:void(0);"></a>';
    }
    $(".slide-inner .btn").html(html);
    $(".slide-inner .btn a").eq(0).addClass("active");

    var slideShow = new SLIDESHOW($(".slide-inner"),3500);
    $(".slide-inner .btn a").bind("click",function(){
        slideShow.active($(this));
    });


    //---------------------------------------------------【新闻切换】
    $(".news-inner .nav li").click(function(){
        var index = $(this).index();
        $(".news-inner .nav li").removeClass("active");
        $(this).addClass("active");
        $(".news-inner .con .list").removeClass("active");
        $(".news-inner .con .list").eq(index).addClass("active");
    });


    //---------------------------------------------------【input 光标焦点】
    $(document).on("focus","input.input-focus",function(){
        if($(this).val() === $(this).attr("data-val")){
            $(this).val("");
            $(this).addClass("font-color");
        }
    });

    $(document).on("blur","input.input-focus",function(){
        if($(this).val() === ""){
            $(this).val($(this).attr("data-val"));
            $(this).removeClass("font-color");
        }
    });
});