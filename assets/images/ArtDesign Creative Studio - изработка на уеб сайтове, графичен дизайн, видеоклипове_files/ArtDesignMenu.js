$(document).ready(function() {

    var PreventClickMenu = false;

    TimeLineMenu = new TimelineLite();

    $(".Current").parent().parent().css({
        backgroundColor: window.BurntSienna,
        borderColor: window.Cyprus
    });
    $(".Current span").css({
        color: "#253944"
    });

    $(".MenuIcon").mouseover(function() {
        MenuIconHoverOn();
    });

    $(".MenuIcon").mouseout(function() {
        if(!$(".Menu").is(".MenuOpen") ) {
            MenuIconHoverOut();
        }
    });

    $(".MenuIcon").mouseover(function() {
        MenuIconHoverOn();
    });

    $(".MenuIcon").mouseout(function() {
        if(!$(".Menu").is(".MenuOpen") ) {
            MenuIconHoverOut();
        }
    });

    $('.MenuContentLeftFix').clickOut(function () {
        if($(".Menu").is(".MenuOpen")) {
            $(".Menu").toggleClass("MenuOpen");
            PreventClickMenu = false;
            MenuContentClose();
            MenuIconHoverOut();
        }
    });

    $(".MenuContentCenter").find("li").stop().hover(function () {
        if(!$(this).find("a").is(".Current")) {
            $(this).find("span").stop(true).animate({
                color: window.BurntSienna 
            }, 250);
        }
    }, function () {
        if(!$(this).find("a").is(".Current")) {
            $(this).find("span").animate({
                color: window.BaliHai 
            }, 250);
        }
    });

    var Current;
    $(".MenuContentCenter").find("li").click(function() {
        if(!$(this).find("a").is(".Current") && !$(this).find("div").is(".NotActive1")) {
            Current = $(".MenuContentCenter").find("a.Current");
            Current.parent().parent().animate({
                backgroundColor: window.Cyprus,
                borderColor: window.BurntSienna
            }, 250);
            Current.find("span").animate({
                color: "#91A2AA"
            }, 250);
            $(".MenuContentCenter").find("a.Current").removeClass("Current");

            $(this).animate({
                backgroundColor: window.BurntSienna,
                borderColor: window.Cyprus 
            }, 250);
            $(this).find("span").stop(true).animate({
                color: window.Cyprus 
            }, 250);
            $(this).find("a").addClass("Current");
            setTimeout(function() {
                MenuIconHoverOut();
                MenuContentClose();
                $(".Menu").toggleClass("MenuOpen");
                setTimeout(function() {
                    PreventClickMenu = false;
                }, 500);
            }, 450);
        }
        else if($(this).find("div").is(".NotActive1")) {
            MenuIconHoverOut();
            MenuContentClose();
            $(".Menu").toggleClass("MenuOpen");
            $(".SectionContactUs").toggleClass("ContactUsOpen");
            setTimeout(function() {
                PreventClickMenu = false;
            }, 500);
            setTimeout(function() {
                window.ContactUsContentOpen();
                $(".ContactUs").toggleClass("ContactUsOpen");
            }, 100);
        }
    });

    $(".MenuIcon").click(function(){
        if(!$(".Menu").is(".MenuOpen") && PreventClickMenu === false) {
            if($(".ContactUs").is(".ContactUsOpen")) {
                window.ContactUsContentClose();
                $(".ContactUs").toggleClass("ContactUsOpen");
            }
            setTimeout(function() {
                $(".Menu").toggleClass("MenuOpen");
                PreventClickMenu = true;
                MenuContentOpen();
                MenuIconHoverOn();
            }, 10);
            setTimeout(function() {
                PreventClickMenu = false;
            }, 1200);
        }
    });

    function MenuIconHoverOn() {
        TweenLite.to(".MenuIconContent", 0.25, {rotation: -90});
    }

    window.MenuIconHoverOut = function() {
        TweenLite.to(".MenuIconContent", 0.25, {rotation: 0});
    };

    window.MenuContentOpen = function() {
        $(".MenuContentBackground, .MenuContent").css({
            display: "block"
        });
        TweenLite.to(".MenuContentBackground, .MenuContent, .MenuContentOpen", 0.35, {opacity: 1});
        TimeLineMenu.staggerFrom("li", 1, {delay: 0.25, scale: 0.85, opacity: 0, ease: Back.easeOut.config(1)});
    };

    window.MenuContentClose = function() {
        TweenLite.to(".MenuContentBackground, .MenuContent", 0.35, {opacity: 0}, 1);
        setTimeout(function() {
            $(".MenuContentBackground, .MenuContent").css({
                display: "none"
            });
        }, 500);
    };

});
