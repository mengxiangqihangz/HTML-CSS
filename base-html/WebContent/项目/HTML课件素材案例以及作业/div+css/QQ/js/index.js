/**
 * Created by Administrator on 2016/1/16.
 */
$(function(){
    var oul=$(".focus ul");
    var ali=$(".focus ul li");
    var numLi=$(" .focus ol li");
    //获取ul li的宽度
    var aliWidth=$(".focus ul li").eq(0).width();
    //times
    var times=0;//控制数字样式的计数器
    var times2=0;//控制图片运动距离的计数器
    var timesId;

    numLi.mouseover(function(){
        var index=$(this).index();
        //图片和数字按钮同步
        times=index;
        times2=index;
        $(this).addClass('current').siblings().removeClass();
        oul.animate({"left":-aliWidth*index},666);
    });
    //图片滑动函数
    function setInt(){
        if(times==numLi.size()-1){
            //此处开始实行无缝滚动；
            ali.eq(0).css({
                "position":"relative",
                "left":oul.width()
            });
            times=0;
        }else{
            times++;
        }
        times2++;
        numLi.eq(times).addClass('current').siblings().removeClass();
        oul.animate({"left":-aliWidth*times2},666,function(){
            if(times==0){
                ali.eq(0).css("position","static");
                oul.css("left",0);
                times2=0;
            }
        });
    }

    timesId=setInterval(setInt,1500);
    //鼠标移动到图片上停止滑动
    $(".focus").mouseover(function(){
        clearInterval(timesId);
    });

    $(".focus").mouseout(function(){
        timesId=setInterval(setInt,1500);
    });
});

/**/

$(".link-ul li").hover(function(){
    var num=$(this).index();
    $(" .link-ul li a").eq(num).css({"color":"#FF4F02","font-size":"14px","font-weight":"800"});
    $(" .link-ul li a span").eq(num).addClass("animationPic"+num);

},function(){
    var num=$(this).index();
    $(".link-ul li a").css({"color":"#7f7f7f","font-size":"13px","font-weight":"400"});
    $(".link-ul li a span").eq(num).removeClass("animationPic"+num);
});