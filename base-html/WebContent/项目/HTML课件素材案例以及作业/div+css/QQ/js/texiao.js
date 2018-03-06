$(function(){
    /*导航菜单效果*/
    $(".lsyLi").mouseover(function(){
        var num=$(this).index();
        $(this).children().css("display","block");
        $(".lsyLi h3").eq(num).css("color","white");
        $(".lsyLi1").eq(num).children().css("color","white");
    }).mouseout(function(){
        var num=$(this).index();
        $(".lsyLi .lsyHid").css("display","none");
        $(".lsyNav ul li h3").css("color","#555752");
        $(".lsyLi1").eq(num).children().css("color"," #898989");
    });

    var picNum=0;
    $(".lsyCP ul:eq(1) li").mouseover(function(){
        var num=$(this).index();
        $(".lsyCP ul:eq(0) li").css("display","none");
        $(".lsyCP ul:eq(1) li").css({"padding":"8px 0","margin-top":"0","background-color":"rgba(0,0,0,.3)"});

        $(".lsyCP ul:eq(0) li").eq(num).css("display","block");
        $(".lsyCP ul:eq(1) li").eq(num).css({"padding":"10px 0","margin-top":"-4px","background-color":"rgba(255,69,0,.7)"});
        picNum=num;

    });

    function changePic(){
        $(".lsyCP ul:eq(0) li").css("display","none")
        $(".lsyCP ul:eq(1) li").css({"padding":"8px 0","margin-top":"0","background-color":"rgba(0,0,0,.3)"});

        $(".lsyCP ul:eq(0) li").eq(picNum).css("display","block");
        $(".lsyCP ul:eq(1) li").eq(picNum).css({"padding":"10px 0","margin-top":"-4px","background-color":"rgba(255,69,0,.7)"})

        picNum++;
        if(picNum>3){
            picNum=0;
        }
    }



    var stop=setInterval(changePic,2000);

    $(".lsyCP").hover(function(){
        clearInterval(stop);
    },function(){
        stop=setInterval(changePic,2000);
    });




    /*快速入口*/
    $(".lsySpeed ul li").hover(function(){
        var num=$(this).index();
        $(".lsySpeed ul li a").eq(num).css({"color":"#FF4F02","font-size":"14px","font-weight":"800"});
        $(".lsySpeed ul li a span").eq(num).addClass("animationPic"+num);

    },function(){
        var num=$(this).index();
        $(".lsySpeed ul li a").css({"color":"#7f7f7f","font-size":"13px","font-weight":"400"});
        $(".lsySpeed ul li a span").eq(num).removeClass("animationPic"+num);
    });
    /*$(".lsy-list .lsyUl li a:nth-child(1)").mouseover(function(){
        $(".lsy-list .lsyUl li a:nth-child(2)").css("display","none");
        $(this).next().css("display","block")
    });*/
   /* $(".lsy-list .lsyUl").mouseout(function(){
        $(".lsy-list .lsyUl li a:nth-child(2)").css("display","none");
    })*/

});