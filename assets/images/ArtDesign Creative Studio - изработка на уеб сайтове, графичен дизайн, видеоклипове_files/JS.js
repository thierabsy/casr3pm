$(document).ready(function() {
    $(".TextArea").niceScroll();
    $(document).on("click", ".ButtonWeb", function() {
        $(".WEB").trigger("click");
        setTimeout(function() {
            $(".Menu").removeClass("MenuOpen");
        }, 1000);
    });
    $(document).on("click", ".ButtonDesign", function() {
        $(".Design").trigger("click");
        setTimeout(function() {
            $(".Menu").removeClass("MenuOpen");
        }, 1000);
    });
    $(document).on("click", ".ButtonDevelopment", function() {
        $(".Development").trigger("click");
        setTimeout(function() {
            $(".Menu").removeClass("MenuOpen");
        }, 1000);
    });
    $(document).on("click", ".ButtonTV", function() {
        $(".TV").trigger("click");
        setTimeout(function() {
            $(".Menu").removeClass("MenuOpen");
        }, 1000);
    });


    $(document).on("mouseenter", ".Button1", function() {
        TweenLite.to(".ButtonContent1", 0.25, {scale: 0.8, transformOrigin:"center center"});
    });
    $(document).on("mouseout", ".Button1", function() {
        TweenLite.to(".ButtonContent1", 0.25, {scale: 1, transformOrigin:"center center"});
    });
    $(document).on("mouseenter", ".Button2", function() {
        TweenLite.to(".ButtonContent2", 0.25, {scale: 0.8, transformOrigin:"center center"});
    });
    $(document).on("mouseout", ".Button2", function() {
        TweenLite.to(".ButtonContent2", 0.25, {scale: 1, transformOrigin:"center center"});
    });
    $(document).on("mouseenter", ".Button3", function() {
        TweenLite.to(".ButtonContent3", 0.25, {scale: 0.8, transformOrigin:"center center"});
    });
    $(document).on("mouseout", ".Button3", function() {
        TweenLite.to(".ButtonContent3", 0.25, {scale: 1, transformOrigin:"center center"});
    });
    $(document).on("mouseenter", ".Button4", function() {
        TweenLite.to(".ButtonContent4", 0.25, {scale: 0.8, transformOrigin:"center center"});
    });
    $(document).on("mouseout", ".Button4", function() {
        TweenLite.to(".ButtonContent4", 0.25, {scale: 1, transformOrigin:"center center"});
    });

    $(document).on("mouseenter", ".Button5", function() {
        TweenLite.to(".ButtonContent5", 0.25, {scale: 0.8, transformOrigin:"center center"});
    });
    $(document).on("mouseout", ".Button5", function() {
        TweenLite.to(".ButtonContent5", 0.25, {scale: 1, transformOrigin:"center center"});
    });
    $(document).on("mouseenter", ".Button6", function() {
        TweenLite.to(".ButtonContent6", 0.25, {scale: 0.8, transformOrigin:"center center"});
    });
    $(document).on("mouseout", ".Button6", function() {
        TweenLite.to(".ButtonContent6", 0.25, {scale: 1, transformOrigin:"center center"});
    });

    $(document).on("mouseenter", ".Button7", function() {
        TweenLite.to(".ButtonContent7", 0.25, {scale: 0.8, transformOrigin:"center center"});
    });
    $(document).on("mouseout", ".Button7", function() {
        TweenLite.to(".ButtonContent7", 0.25, {scale: 1, transformOrigin:"center center"});
    });
    $(document).on("mouseenter", ".Button8", function() {
        TweenLite.to(".ButtonContent8", 0.25, {scale: 0.8, transformOrigin:"center center"});
    });
    $(document).on("mouseout", ".Button8", function() {
        TweenLite.to(".ButtonContent8", 0.25, {scale: 1, transformOrigin:"center center"});
    });
});



TweenLite.defaultEase = Linear.easeNone;

window.Cyprus = "#1d4152";
window.Bismark = "#295a72";
window.BurntSienna = "#ff8106";
window.BaliHai = "#90afbe";
window.White = "#FFFFFF";

$(document).ready(function() {
    $("body").ArtDesignIcons();
    $("body").ArtDesignToolTip();
    URL = window.location.href;
/*    switch(URL) {
        case "http://www.artdesign-creative.com/site-v2/":
            window.Page = 1;
            break;
        case "http://www.artdesign-creative.com/site-v2/web":
            window.Page = 2;
            break;
        case "http://www.artdesign-creative.com/site-v2/design":
            window.Page = 3;
            break;
        case "http://www.artdesign-creative.com/site-v2/development":
            window.Page = 4;
            break;
        case "http://www.artdesign-creative.com/site-v2/tv-motion":
            window.Page = 5;
            break;
        default:
            window.Page = 1;
    }*/
    /*
     window.ArtDesignCircle = $(".CirclePad").ArtDesignCircle({
     CircleRadius                                                            : 130,
     CircleStroke                                                            : 20,
     CircleStrokeColor                                                       : "#253944",
     CircleOpacity                                                           : 0.6,
     StartPercent                                                            : 90
     });
     */


    TimeLineHalfCircle = new TimelineLite();

    setTimeout(function() {
        $(window).trigger("resize");
    }, 100);

    $(window).on("resize", function() {
        if($(window).width() <420) {
            $(".Phone").css({
                top: "88px"
            });
        }
        else {
            $(".Phone").css({
                top: "40px"
            });
        }

    });



    window.Intro();

    $('.ContactUsContentLeftFix').clickOut(function () {
        if($(".SectionContactUs").is(".ContactUsOpen")) {
            $(".SectionContactUs").toggleClass("ContactUsOpen");
            PreventClickMail = false;
            ContactUsContentClose();
        }
    });



});

window.Intro = function() {
    Logo();
    function Logo() {
        TweenLite.set(".SectionIntroLogo", {display: "block"});
        TimeLineLogo = new TimelineLite();
        TimeLineLogo.from(".LogoTextBlock1", 2, {
            top: -100,
            scale: 0.5,
            opacity: 0,
            delay: 0.3,
            ease: Elastic.easeOut,
            force3D: true
        }, 0.4);
        TimeLineLogo.staggerFrom(".LogoPath1", 2, {
            scale: 0.5,
            opacity: 0,
            delay: 0.3,
            ease: Elastic.easeOut.config(1, 0.4)
        }, 0.1, "=-1.6");
        TimeLineLogo.staggerFrom(".LogoPath2Block", 0.4, {opacity: 0}, 0.1, "=-1.5");
        setTimeout(function() {
            Text();
        }, 3000);
        setTimeout(function() {
            Hide();
        }, 6200);
    }
    function Text() {
        var $Quote, Text, TextTimeline;
        $Quote = $(".LogoTextBlock2");
        Text = new SplitText($Quote, {type:"words"});
        TextTimeline = new TimelineLite();
        TweenLite.set($Quote, {
            perspective: 400,
            opacity: 1
        });
        Text.split({type:"words"});
        $(Text.words).each(function(index,el) {
            TextTimeline.from($(el), 0.6, {
                opacity: 0,
                force3D: true
            }, index * 0.08);
            TextTimeline.from($(el), 0.6, {
                scale: index % 2 === 0 ? 0 : 2,
                ease: Back.easeOut
            }, index * 0.08);
        });
    }
    function Hide() {
        TimeLineLogo
            .to(".LogoTextBlock1", 0.7, {
                top: -50,
                opacity: 0,
                ease: Back.easeIn.config(3)
            })
            .to(".Logo", 1.2, {
                top: 30,
                ease: Back.easeInOut.config(4)
            }, "=-0.5")
            .to(".LogoTextBlock2", 0.9, {
                right: -50,
                opacity: 0,
                ease: Back.easeInOut.config(6)
            }, "=-0.9");
        setTimeout(function() {
            $(".LogoTextBlock2").css({
                display: "none"
            });
            $(".Logo").css({
                zIndex: 37
            });
            window.Screen();
        }, 1400);
    }
};

window.Screen = function() {


    TimeLineScreen = new TimelineLite();

    TimeLineScreen
        .to(".ScreenTop, .ScreenLeft", 0.7, {
            opacity: 0.7
        });
    /*    setTimeout(function() {
     TimeLineScreen
     .to(".CirclePathRight", 0.1, {
     opacity: 1
     });
     }, 100);*/
    setTimeout(function() {
        window.BackgroundVegasInit();
    }, 500);
    setTimeout(function() {
        TweenLite.set(".SectionCircleSlider", {display: "block"});
        TweenLite.set(".CircleSliderContent", {opacity: 1});
        TimeLineHalfCircle
            .from(".CircleSliderContent", 1, {
                opacity: 0,
                scale: 0.5,
                ease: Back.easeOut.config(3)
            });
    }, 1100);
    setTimeout(function() {
        window.CircleVegasInit();
    }, 1500);
    setTimeout(function() {
        window.StartPercent = 90;
        if($(window).width() < 1200) {
            window.Mode = "Small";
            window.PreventSmall = true;
        }
        else {
            window.Mode = "Big";
            window.PreventBig = true;
        }

        window.ArtDesignCircle = $(".CirclePad").ArtDesignCircle({
            CircleRadius                                                        : 130,
            CircleStroke                                                        : 20,
            CircleStrokeColor                                                   : window.Cyprus,
            CircleOpacity                                                       : 0.7,
            StartPercent                                                        : window.StartPercent
        });
        /*        setTimeout(function() {
         window.ArtDesignCircle.Rotate(90);
         }, 5000);
         setTimeout(function() {
         window.ArtDesignCircle.Rotate(0);
         }, 8000);*/
        window.ArtDesignCircle.Animation(0, 25, 1.25);
    }, 2100);

};

window.BackgroundVegasInit = function() {
    $(".BackgroundSlider").vegas({
        slide: window.Page - 1,
        autoplay: false,
        timer: false,
        overlay: false,
        color: window.Bismark,
        transition: 'zoomOut',
        slides: [
            {   src: 'https://www.artdesign-creative.com/Documents/Vegas/ArtDesignCreativeStudio.jpg',
                video: {
                    src: [
                        'https://www.artdesign-creative.com/Documents/Vegas/ArtDesignCreativeStudio.mp4',
                        'https://www.artdesign-creative.com/Documents/Vegas/ArtDesignCreativeStudio.webm'
                        /*,
                         'Documents/Vegas/video.webm'*/
                    ],
                    loop: false,
                    mute: false
                }
            }
            //{src: "Documents/Vegas/2_large.png"}
        ]
    });
    /*    $(".BackgroundSlider .vegas-overlay").animate({
     opacity: 0.6
     }, 10);*/
};

window.CircleVegasInit = function() {
    $(".CircleSlider").vegas({
        slide: window.Page - 1,
        autoplay: false,
        timer: false,
        transition: "fade",
        slides: [
            {src: "https://www.artdesign-creative.com/Documents/Vegas/ArtDesignCreativeStudioSmall.jpg"}
        ]
    });
    setTimeout(function() {
        window.MenuIconAnimationIn();
    }, 1000);
    setTimeout(function() {
        window.PhoneIn();
        window.BottomInfoAnimation();
    }, 800);
};

window.PhoneIn = function() {
    $(".PhoneIcon").animate({
        opacity: 1
    }, 250);
    TimeLinePhone = new TimelineLite();
    TweenLite.set(".PhoneAnimation", {opacity: 1});
    var $Quote = $(".PhoneAnimation"),
        Text = new SplitText($Quote, {type:"chars"});
    TimeLinePhone
        .staggerFrom(Text.chars, 0.4, {opacity:0, ease:Back.easeOut}, -0.05);
    //setTimeout(function() {
    $(".ArtDesignWindowContent").ArtDesignWindowContent();
    //}, 1000);

};

window.BottomInfoAnimation = function() {
    TimeLineBottomInfo = new TimelineMax();
    TimeLineBottomInfo
        .to(".SectionInfo", 2, {
            left: 0,
            ease: Elastic.easeOut,
            force3D: true
        });
    var $Quote, Text, TextTimeline;
    $Quote = $(".BottomInfoText");
    Text = new SplitText($Quote, {type:"words"});
    TextTimeline = new TimelineLite();
    TweenLite.set(".BottomInfoText", {display: "block"});
    TweenLite.set($Quote, {
        perspective: 400,
        opacity: 1
    });
    Text.split({type:"words"});
    $(Text.words).each(function(index,el) {
        TextTimeline.from($(el), 0.6, {
            opacity: 0,
            force3D: true
        }, index * 0.08);
        TextTimeline.from($(el), 0.6, {
            scale: index % 2 === 0 ? 0 : 2,
            ease: Back.easeOut
        }, index * 0.08);
    });
};

window.MenuIconAnimationIn = function() {
    TimeLineMenuIcon = new TimelineLite();
    TweenLite.set(".SectionMenu", {display: "block"});
    TimeLineMenuIcon
        .to(".MenuButton", 1, {opacity:1, ease:Back.easeOut});
    setTimeout(function() {
        window.SocialAnimationIn();
    }, 800);
};

window.SubMenuCirclesAnimationIn = function() {
    TimeLineSubMenuCircles = new TimelineLite();
    TweenLite.set(".SubMenuCircle", {opacity: 1});
    TimeLineSubMenuCircles
        .staggerFrom(".SubMenuCircle", 0.6, {opacity:0, scale: 0, fill: window.White, ease:Back.easeOut}, 0.05);
};

window.SocialAnimationIn = function() {
    TimeLineSocial = new TimelineLite();
    TweenLite.set(".SectionSocial", {display: "block"});
    TimeLineSocial
        .staggerFrom(".SocialMail", 4, {opacity:0, ease:Back.easeOut}, -0.1);
    ListenWindowResize();
    setTimeout(function() {
        if(window.IsMobile !== true) {
            $(".ArticleContent").niceScroll();
            $(".ContactUsContentCenter").niceScroll();
            $(".MenuContentCenter").niceScroll();
        }
        window.ListenContactUsOpen();
        window.Video();
    }, 800);
    $(".FaceBook").mouseover(function() {
        TweenLite.to($(".FaceBook .SocialPath"), 0.25, {fill: window.BaliHai});
    });
    $(".FaceBook").mouseout(function() {
        TweenLite.to($(".FaceBook .SocialPath"), 0.25, {fill: window.Cyprus});
    });
    $(".Twitter").mouseover(function() {
        TweenLite.to($(".Twitter .SocialPath"), 0.25, {fill: window.BaliHai});
    });
    $(".Twitter").mouseout(function() {
        TweenLite.to($(".Twitter .SocialPath"), 0.25, {fill: window.Cyprus});
    });
    $(".Google").mouseover(function() {
        TweenLite.to($(".Google .SocialPath"), 0.25, {fill: window.BaliHai});
    });
    $(".Google").mouseout(function() {
        TweenLite.to($(".Google .SocialPath"), 0.25, {fill: window.Cyprus});
    });
    $(".Pinterest").mouseover(function() {
        TweenLite.to($(".Pinterest .SocialPath"), 0.25, {fill: window.BaliHai});
    });
    $(".Pinterest").mouseout(function() {
        TweenLite.to($(".Pinterest .SocialPath"), 0.25, {fill: window.Cyprus});
    });
    $(".MailButton").mouseover(function() {
        TweenLite.to($(".MailButton .MailPath"), 0.25, {rotation: -100, scale: 0.8, transformOrigin:"center center"});
    });
    $(".MailButton").mouseout(function() {
        TweenLite.to($(".MailButton .MailPath"), 0.25, {rotation: 0, scale: 1});
    });
};



var PreventClickMail = false;

window.ListenContactUsOpen = function() {
    $(".MailButton").click(function(){
        if(!$(".SectionContactUs").is(".ContactUsOpen") && PreventClickMail === false) {
        if($(".Menu").is(".MenuOpen")) {
            window.MenuContentClose();
            window.MenuIconHoverOut();
            $(".Menu").toggleClass("MenuOpen");
        }
        setTimeout(function() {
            $(".SectionContactUs").toggleClass("ContactUsOpen");
            PreventClickMail = true;
            ContactUsContentOpen();
        }, 10);
        setTimeout(function() {
            PreventClickMail = false;
        }, 1200);
        }
    });
}

window.ContactUsContentOpen = function() {
    $(".ContactUsContentBackground, .ContactUsContent").css({
        display: "block"
    });
    TweenLite.to(".ContactUsContentBackground, .ContactUsContent, .ContactUsContentOpen", 0.35, {opacity: 1});
};

window.ContactUsContentClose = function() {
    TweenLite.to(".ContactUsContentBackground, .ContactUsContent", 0.35, {opacity: 0}, 1);
    setTimeout(function() {
        $(".ContactUsContentBackground, .ContactUsContent").css({
            display: "none"
        });
    }, 500);
};

window.Video = function() {
    TimeLineVideo = new TimelineLite();

    $(".CircleSliderContent").mouseover(function() {
        //TweenLite
        //.to(".ScreenOverlay", 0.25, {opacity: 0});
        TweenLite
            .to(".ScreenOverlay, .ArticleContent, .ScreenLines", 0.25, {opacity: 0});
        TweenLite
            .to(".ScreenLines", 0.25, {opacity: .5});
        /*TweenLite
         .to(".ScreenNoise", 0.25, {opacity: 1});*/

        //if(window.VideoEnded !== true) {
        $(".SectionBackgroundSlider").find('video').get(0).play();
        //$(".SectionBackgroundSlider").find('video').get(0).onended = function() {
        //    window.VideoEnded = true;
        //};
        //}


    });
    $(".CircleSliderContent").mouseout(function() {
        TweenLite
            .to(".ScreenOverlay", 0.25, {opacity: 0.9});
        TweenLite
            .to(".ArticleContent, .ScreenLines", 0.25, {opacity: 1});
        /*TweenLite
         .to(".ScreenNoise", 0.25, {opacity: 0});*/

        setTimeout(function(){
            $(".SectionBackgroundSlider").find('video').get(0).pause();
        }, 50)

    });

};

function ListenWindowResize() {
    $(window).on("resize", function() {
        /*        if($(window).height() < 550) {
         $(".SectionSocial").css({
         display: "none!important"
         });
         }
         else {
         $(".SectionSocial").css({
         display: "block"
         });
         }*/
        if(($(window).width() > 600 && $(window).width() < 725) || ($(window).width() < 450)) {
            $(".Page1IconContent").css({
                display: "none"
            });
        }
        else {
            $(".Page1IconContent").css({
                display: "block"
            });
        }

        /*        window.PreventBig = false;
         window.PreventSmall = true;
         window.ArtDesignCircle.Rotate(-90);*/

        if($(window).width() < 1200) {
            /*           if(window.PreventSmall !== true && window.Mode === "Big") {
             window.PreventBig = false;
             window.PreventSmall = true;
             window.ArtDesignCircle.Rotate(-90);
             }
             if(window.PreventSmall !== true && window.Mode === "Small") {
             window.PreventBig = false;
             window.PreventSmall = true;
             window.ArtDesignCircle.Rotate(0);
             }*/




            $(".ElementTop").css({
                marginTop: "-90px"
            });
            $(".ElementMiddle").css({
                marginTop: "-60px"
            });
        }
        else {

            $(".ElementTop").css({
                marginTop: "-120px"
            });
            $(".ElementMiddle").css({
                marginTop: "-80px"
            });
        }
    });
}



(function ($) {
    if (!$.ns) {
        $.ns                                                                    = {};
    }
    $.ns.ArtDesignCircle                                                        = function (Element, Options) {
        var PlugIn                                                              = this;
        PlugIn.$Element                                                         = $(Element);
        var ElementStructure, SVG, Circle , Size, LastRotation;
        PlugIn.Options                                                          = $.extend({}, $.ns.ArtDesignCircle.DefaultOptions, Options);
        PlugIn.Methods                                                          = {
            Initialize                                                          : function() {
                PlugIn.Methods.CreateElements();
                PlugIn.Methods.CSS();
                TimeLineArtDesignCircle                                         = new TimelineMax();
                TweenLite.set(Circle, {
                    opacity                                                     : 0
                });
                LastRotation                                                    = PlugIn.Options.StartPercent;
                if(PlugIn.Options.ClockDirection === false) {
                    TweenLite.set(PlugIn.$Element, {
                        rotationX                                               : 180
                    });

                    TweenLite.set(PlugIn.$Element, {
                        rotation                                                : PlugIn.Options.StartPercent
                    });
                }
                else {
                    TweenLite.set(Circle, {
                        rotation                                                : PlugIn.Options.StartPercent,
                        transformOrigin                                         :"50% 50%"
                    });
                }
            },
            CreateElements                                                      : function () {
                Size                                                            = PlugIn.Options.CircleRadius * 2 + PlugIn.Options.CircleStroke;
                ElementStructure                                                = '<svg version="1.1" ' +
                    'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
                    'width="' + Size + 'px" ' +
                    'height="' + Size + 'px" ' +
                    'x="0" ' +
                    'y="0" ' +
                    'viewBox="0 0 ' + Size + ' ' + Size + '" ' +
                    'class="' + PlugIn.Options.ClassPrefix + 'SVG">' +
                    '<circle class="' + PlugIn.Options.ClassPrefix + 'Circle" ' +
                    'stroke-width="' + PlugIn.Options.CircleStroke + '" ' +
                    'stroke="' + PlugIn.Options.CircleStrokeColor + '" ' +
                    'fill="' + PlugIn.Options.CircleFillColor + '" ' +
                    'cx="' + (PlugIn.Options.CircleRadius + (PlugIn.Options.CircleStroke / 2)) + '" ' +
                    'cy="' + (PlugIn.Options.CircleRadius + (PlugIn.Options.CircleStroke / 2)) + '" ' +
                    'r="' + PlugIn.Options.CircleRadius + '"' +
                    '></circle></svg>';
                $(ElementStructure).appendTo(PlugIn.$Element);
                SVG                                                             = PlugIn.$Element.find("." + PlugIn.Options.ClassPrefix + "SVG");
                Circle                                                          = PlugIn.$Element.find("." + PlugIn.Options.ClassPrefix + "Circle");

            },
            CSS                                                                 : function () {
                PlugIn.$Element.css({
                    "width"                                                     : PlugIn.Options.CircleRadius * 2 + PlugIn.Options.CircleStroke + "px",
                    "height"                                                    :  PlugIn.Options.CircleRadius * 2 + PlugIn.Options.CircleStroke + "px"
                });
                Size                                                            = PlugIn.Options.CircleRadius * 2 + PlugIn.Options.CircleStroke;


                $(SVG).css({
                    "opacity"                                                   : PlugIn.Options.CircleOpacity
                });
            },
            Animation                                                           : function (Start, End, Speed) {
                TweenLite.set(Circle, {
                    opacity                                                     : 1
                });
                TimeLineArtDesignCircle.fromTo(Circle, Speed, {
                    drawSVG                                                     : Start + "%"
                }, {
                    drawSVG                                                     : End + "%",
                    ease: Back.easeOut.config(2)
                });
            },
            Rotate                                                              : function (Degree) {
                TweenLite.set(Circle, {
                    rotation                                                    : Degree, transformOrigin:"50% 50%"
                });

                LastRotation                                                    = Degree;
            }
        };
        PlugIn.PublicMethods = {
            Animation                                                           : function (Start, End, Speed) {
                PlugIn.Methods.Animation(Start, End, Speed);
            },
            Rotate                                                              : function (Degree) {
                PlugIn.Methods.Rotate(Degree);
            }
        };
        PlugIn.Methods.Initialize();
    };
    $.ns.ArtDesignCircle.DefaultOptions = {
        ClassPrefix                                                             : "CRCL_",
        CircleRadius                                                            : 70,
        CircleStroke                                                            : 20,
        CircleStrokeColor                                                       : "#1d4152",
        CircleFillColor                                                         : "none",
        CircleOpacity                                                           : 0.85,
        ClockDirection                                                          : false,
        StartPercent                                                            : 180
    };
    $.fn.ArtDesignCircle                                                        = function(Options) {
        var ArtDesignCircle                                                     = (new $.ns.ArtDesignCircle(this, Options));
        return ArtDesignCircle.PublicMethods;
    };
})(jQuery);

window.Page1 = function() {
    if(window.Reload === false) {
        window.Reload = true;
        window.PageDelay = 0;
    }
    else {
        window.PageDelay = 2;
    }
    var Page1TimeLine                                                           = new TimelineLite,
        Page1SplitText                                                          = new SplitText(".InfoText2", {type:"words,chars"}),
        Page1Chars                                                              = Page1SplitText.chars;
    TweenLite.set(".InfoText2", {perspective:400});
    Page1TimeLine.staggerFrom(Page1Chars, 0.8, {delay: window.PageDelay, opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.01, "+=0");
};

