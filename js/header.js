$(document).ready(function(){
    $(window).scroll(function(){
        if ($(window).scrollTop() > 60){
            $("nav").css({"position":"fixed", "top":"0", "z-index":"2"});
            $(".logo-header").css({"margin":"0 60px 0 0", "overflow":"hidden"});
            $("nav a img").css({"margin":"-25px 0 0 80px"});
            $("nav ul li a").hover(function(){
                $(this).css("background", "#ddd");
            }, function(){
                $(this).css("background", "#fff");
            });
            $(".nav-last-link").css({"margin-right":"280px"});
            $("#main").css({"margin-top":"105px"});
        }
        else{
            $("nav").css({"position":"static"});
            $(".logo-header").css({"margin":"0 60px 0 0", "overflow":"visible"});
            $("nav a img").css({"margin":"-60px 0 0 120px"});
            $("nav ul li a").hover(function(){
                $(this).css("background", "#fff");
            });
            $(".nav-last-link").css({"margin-right":"275px"});
            $("#main").css({"margin-top":"55px"});
        }
    });
});
