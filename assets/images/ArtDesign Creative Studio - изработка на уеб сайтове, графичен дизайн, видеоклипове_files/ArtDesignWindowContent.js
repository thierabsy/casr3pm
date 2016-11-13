/*
 ArtDesignWindowContent (v.2.0.0)

 323 lines code
 www.artdesign-jquery.com/ArtDesignWindowContent

 License: ArtDesignCreative

 Author:
 ArtDesign Creative Studio

 www.artdesign-creative.com
 office@artdesign-creative.com

 More jQuery PlugIns:
 www.artdesign-ui.com
 */
(function ($) {
    if (!$.ns) {
        $.ns                                                                    = {};
    }
    $.ns.ArtDesignWindowContent                                                 = function (Element, Options) {
        var PlugIn                                                              = this;
        var a, b,
            TableStructure,
            MainContent,
            Content,
            Count                                                               = 0,
            NavigationStructure,
            Navigation,
            ClickSector,
            AllElements,
            CurrentElement,
            PositionX,
            Delay,
            Margin,
            Scale,
            Opacity,
            Speed,
            Ease,
            FunctionInstruction,
            FunctionExecute,
            CustomAnimation                                                     = [],
            CustomExecute                                                       = [];
        PlugIn.$Element                                                         = $(Element);

        PlugIn.Options                                                          = $.extend({}, $.ns.ArtDesignWindowContent.DefaultOptions, Options);
        TimeLine                                                                = new TimelineLite();
        PlugIn.Methods                                                          = {
            Initialize                                                          : function() {
                PlugIn.Methods.PrepareElements();
                PlugIn.Methods.CreateNavigation();
                PlugIn.Methods.CSS();
                setTimeout(function() {
                    PlugIn.Methods.InitNavigation();
                    PlugIn.Methods.LoadContent(PlugIn.Options.StartSector);
                    PlugIn.Methods.ListenHover();
                    PlugIn.Methods.ListenClick();
                    PlugIn.Methods.ListenWindowResize();
                }, PlugIn.Options.InitDelay);

            },
            PrepareElements                                                     : function () {
                PlugIn.$Element.children('li').each(function() {
                    if(!$(this).is(PlugIn.Options.Exclude)) {
                        Count++;
                        $(this).addClass(PlugIn.Options.ClassPrefix + "Li" + Count)
                        $(this).wrapInner("<div></div>").addClass(PlugIn.Options.ClassPrefix + "Sector" + Count);
                    }
                });
                TableStructure                                                           =
                    '<table class="' + PlugIn.Options.ClassPrefix + 'MainContent">' +
                    '<tr>' +
                    '<td class="' + PlugIn.Options.ClassPrefix + 'NavigationLeft"></td>' +
                    '<td class="' + PlugIn.Options.ClassPrefix + 'Content"></td>' +
                    '<td class="' + PlugIn.Options.ClassPrefix + 'NavigationRight"></td>' +
                    '</tr>' +
                    '</table>';
                MainContent                                                     = $(TableStructure).insertBefore(PlugIn.$Element);

                Content                                                         = MainContent.find("." + PlugIn.Options.ClassPrefix + "Content");
                PlugIn.$Element.appendTo(Content);
            },
            CreateNavigation                                                    : function() {
                NavigationStructure = '<table>';
                for(a = 1; a <= Count; a++) {
                    NavigationStructure += '<tr><td><div class="' + PlugIn.Options.ClassPrefix + 'Navigation';
                    if(PlugIn.Options.StartSector === a) {
                        NavigationStructure += ' ' + PlugIn.Options.ClassPrefix + 'NavigationCurrent';
                    }
                    NavigationStructure += '"';
                    if(PlugIn.$Element.find("." + PlugIn.Options.ClassPrefix + "Li" + a).attr("data-tooltip")) {
                        NavigationStructure += ' data-plugin-ad-tooltip="ad-tooltip" data-ad-tooltip-content="' + PlugIn.$Element.find("." + PlugIn.Options.ClassPrefix + "Li" + a).attr("data-tooltip") + '" data-ad-tooltip-options="ADWCToolTip"';
                    }
                    NavigationStructure += ' data-navigation="' + a;
                    NavigationStructure += '';
                    NavigationStructure += '"></div></td></tr>';
/*                    if(PlugIn.Options.StartSector === a) {
                        NavigationStructure                                    += '<tr><td><div class="' + PlugIn.Options.ClassPrefix + 'Navigation ' + PlugIn.Options.ClassPrefix + 'NavigationCurrent" data-navigation="' + a + '"></div></td></tr>';
                    }
                    else {
                        NavigationStructure += '<tr><td><div class="' + PlugIn.Options.ClassPrefix + 'Navigation" data-navigation="' + a + '"></div></td></tr>';
                    }*/
                }
                NavigationStructure                                            += '</table>';
                if(PlugIn.Options.NavigationPositionX === "left") {
                    Navigation                                                  = $(NavigationStructure).appendTo(MainContent.find("." + PlugIn.Options.ClassPrefix + "NavigationLeft"));
                }
                else {
                    Navigation                                                  = $(NavigationStructure).appendTo(MainContent.find("." + PlugIn.Options.ClassPrefix + "NavigationRight"));
                }
                MainContent.ArtDesignToolTip();
            },
            InitNavigation                                                      : function() {
                TweenLite.set(Navigation.find("." + PlugIn.Options.ClassPrefix + "NavigationCurrent"), {
                    "scale"                                                     : PlugIn.Options.NavigationButtonHoverScale,
                    "backgroundColor"                                           : PlugIn.Options.NavigationButtonBackgroundColorActive,
                    "borderColor"                                               : PlugIn.Options.NavigationButtonBorderColorActive
                });
                TweenLite.set(Navigation.find("." + PlugIn.Options.ClassPrefix + "Navigation"), {opacity: 1});
                TweenMax.staggerFrom(Navigation.find("." + PlugIn.Options.ClassPrefix + "Navigation"), 1, {
                    scale                                                       : 0,
                    opacity                                                     : 0,
                    delay                                                       : 0.5 ,
                    ease                                                        : Back.easeOut,
                    force3D                                                     : true
                }, 0.2);
            },
            CSS                                                                 : function () {
                Content.find("ul").css({
                    "display"                                                   : "none"
                });
                MainContent.css({
                    "width"                                                     : "100%",
                    "height"                                                    : "100%"
                });
                Content.css({
                    "width"                                                     : "100%",
                    "verticalAlign"                                             : PlugIn.Options.ContentVerticalPosition
                });
                MainContent.find("tr, td").css({
                    "borderCollapse"                                            : "collapse",
                    "borderSpacing"                                             : 0,
                    "margin"                                                    : 0,
                    "padding"                                                   : 0,
                    "border"                                                    : "none",
                    "outline"                                                   : "none"
                });
                MainContent.find("." + PlugIn.Options.ClassPrefix + "NavigationLeft, ." + PlugIn.Options.ClassPrefix + "NavigationRight").css({
                    width                                                       : 0
                });
                MainContent.find("." + PlugIn.Options.ClassPrefix + "Navigation").css({
                    "width"                                                     : PlugIn.Options.NavigationButtonSize + "px",
                    "height"                                                    : PlugIn.Options.NavigationButtonSize + "px",
                    "backgroundColor"                                           : PlugIn.Options.NavigationButtonBackgroundColor,
                    "border"                                                    : "solid",
                    "borderWidth"                                               : PlugIn.Options.NavigationButtonBorderSize + "px",
                    "borderColor"                                               : PlugIn.Options.NavigationButtonBorderColor,
                    "borderRadius"                                              : "50%",
                    "cursor"                                                    : "pointer",
                    "marginTop"                                                 : PlugIn.Options.NavigationButtonMargin / 2 + "px",
                    "marginBottom"                                              : PlugIn.Options.NavigationButtonMargin / 2 + "px",
                    "opacity"                                                   : 0
                });
/*                if(PlugIn.Options.NavigationPositionY === "top") {
                    Navigation.css({
                        "position"                                              : "absolute",
                        "top"                                                   : 0
                    });
                }
                else if(PlugIn.Options.NavigationPositionY === "bottom") {
                    Navigation.css({
                        "position"                                              : "absolute",
                        "bottom"                                                : 0
                    });
                }
                else {
                    Navigation.css({
                        "position"                                              : "absolute",
                        "top"                                                   : "50%",
                        "transform"                                             : "translateY(-50%)"
                    });
                }
                if(PlugIn.Options.NavigationPositionX === "left") {
                    Navigation.css({
                        "left"                                                  : PlugIn.Options.NavigationMarginX + "px"
                    });
                }
                else {
                    Navigation.css({
                        "right"                                                  : PlugIn.Options.NavigationMarginX + "px"
                    });
                }*/
            },
            LoadContent                                                         : function(Sector) {
                setTimeout(function() {
                    $(window).trigger("resize");
                }, 10);
                setTimeout(function() {
                    $(window).trigger("resize");
                }, 500);
                CurrentContent = PlugIn.$Element.find("." + PlugIn.Options.ClassPrefix + "Sector" + Sector).find("div").first();
                $(CurrentContent).clone().appendTo(Content);
                $("body").ArtDesignIcons();
                AllElements                                                     = Content.children("div").find("." + PlugIn.Options.ElementClass).length;
                FunctionInstruction                                            = 'window.TimeLine = new TimelineLite(); ';
                FunctionInstruction                                             += 'TweenLite.set(".' + PlugIn.Options.ElementClass + '", {display: "block", opacity: 1});';
                FunctionInstruction                                            += 'window.TimeLine';
                b = 1;
                Content.children("div").find("." + PlugIn.Options.ElementClass).each(function() {
                    CurrentElement                                              = $(this);
                    CurrentElement.addClass(PlugIn.Options.ClassPrefix + b);
                    if(window.Reload === true) {
                        Delay                                                   = CurrentElement.attr("data-delay") ? CurrentElement.attr("data-delay") : PlugIn.Options.Delay;
                    }
                    else {
                        Delay                                                   = (CurrentElement.attr("data-delay") ? CurrentElement.attr("data-delay") : PlugIn.Options.Delay) - 0.5;
                    }
                    Margin                                                      = CurrentElement.attr("data-margin") ? CurrentElement.attr("data-margin") : PlugIn.Options.Margin;
                    Opacity                                                     = CurrentElement.attr("data-opacity") ? CurrentElement.attr("data-opacity") : PlugIn.Options.Opacity;
                    Scale                                                       = CurrentElement.attr("data-scale") ? CurrentElement.attr("data-scale") : PlugIn.Options.Scale;
                    Speed                                                       = CurrentElement.attr("data-speed") ? CurrentElement.attr("data-speed") : PlugIn.Options.Speed;
                    Ease                                                       = CurrentElement.attr("data-ease") ? CurrentElement.attr("data-ease") : PlugIn.Options.Ease;
                    CurrentElement.css({
                        "position"                                              : "absolute",
                        "display"                                               : "none"
                    });
                    CurrentElement.parent().css({
                        "height"                                                : (CurrentElement.height() + parseInt(CurrentElement.css("padding-top")) + parseInt(CurrentElement.css("padding-bottom"))) + "px"
                    });
/*                    switch (PositionX) {
                        case "center":
                            CurrentElement.css({
                                "left"                                          : "50%",
                                "transform"                                     : "translateX(-50%)"
                            });
                            break;
                        case "right":
                            CurrentElement.css({
                                "right"                                         : 0
                            });
                            break;
                    }*/
                    switch(CurrentElement.attr("data-animation")) {
                        case "TopBottom":
                            FunctionInstruction                                 += '.from(';
                            FunctionInstruction                                 += '".' + PlugIn.Options.ClassPrefix + b + '", ';
                            FunctionInstruction                                 += Speed + ', {';
                            FunctionInstruction                                 += 'marginTop: -' + Margin + ', ';
                            FunctionInstruction                                 += 'opacity: ' + Opacity + ', ';
                            FunctionInstruction                                 += 'ease: ' + Ease;
                            FunctionInstruction                                 += '}, ' + Delay + ')';
                            break;
                        case "BottomTop":
                            FunctionInstruction                                 += '.from(';
                            FunctionInstruction                                 += '".' + PlugIn.Options.ClassPrefix + b + '", ';
                            FunctionInstruction                                 += Speed + ', {';
                            FunctionInstruction                                 += 'marginTop: ' + Margin + ', ';
                            FunctionInstruction                                 += 'opacity: ' + Opacity + ', ';
                            FunctionInstruction                                 += 'ease: ' + Ease;
                            FunctionInstruction                                 += '}, ' + Delay + ')';
                            break;
                        case "LeftRight":
                            FunctionInstruction                                 += '.from(';
                            FunctionInstruction                                 += '".' + PlugIn.Options.ClassPrefix + b + '", ';
                            FunctionInstruction                                 += Speed + ', {';
                            FunctionInstruction                                 += 'marginLeft: -' + Margin + ', ';
                            FunctionInstruction                                 += 'opacity: ' + Opacity + ', ';
                            FunctionInstruction                                 += 'ease: ' + Ease;
                            FunctionInstruction                                 += '}, ' + Delay + ')';
                            break;
                        case "RightLeft":
                            FunctionInstruction                                 += '.from(';
                            FunctionInstruction                                 += '".' + PlugIn.Options.ClassPrefix + b + '", ';
                            FunctionInstruction                                 += Speed + ', {';
                            FunctionInstruction                                 += 'marginLeft: ' + Margin + ', ';
                            FunctionInstruction                                 += 'opacity: ' + Opacity + ', ';
                            FunctionInstruction                                 += 'ease: ' + Ease;
                            FunctionInstruction                                 += '}, ' + Delay + ')';
                            break;
                        case "Scale":
                            FunctionInstruction                                 += '.from(';
                            FunctionInstruction                                 += '".' + PlugIn.Options.ClassPrefix + b + '", ';
                            FunctionInstruction                                 += Speed + ', {';
                            FunctionInstruction                                 += 'scale: ' + Scale + ', ';
                            FunctionInstruction                                 += 'opacity: ' + Opacity + ', ';
                            FunctionInstruction                                 += 'ease: ' + Ease;
                            FunctionInstruction                                 += '}, ' + Delay + ')';
                            break;
                        case "Custom":
                            FunctionInstruction                                 += '.from(';
                            FunctionInstruction                                 += '".' + PlugIn.Options.ClassPrefix + b + '", ';
                            FunctionInstruction                                 += Speed + ', {';
                            FunctionInstruction                                 += 'opacity: ' + Opacity + ', ';
                            FunctionInstruction                                 += 'ease: ' + Ease;
                            FunctionInstruction                                 += '}, ' + Delay + ')';
                            CustomAnimation[b]                                  = CurrentElement.attr("data-custom-animation") + "()";
                            CustomExecute[b]                                    = new Function(CustomAnimation[b]);
                            return(CustomExecute[b]());
                        case "Fade":
                            FunctionInstruction                                 += '.from(';
                            FunctionInstruction                                 += '".' + PlugIn.Options.ClassPrefix + b + '", ';
                            FunctionInstruction                                 += Speed + ', {';
                            FunctionInstruction                                 += 'opacity: ' + Opacity + ', ';
                            FunctionInstruction                                 += 'ease: ' + Ease;
                            FunctionInstruction                                 += '}, ' + Delay + ')';
                            break;
                    }
                    b++;
                });
                FunctionInstruction                                            += ';';
                FunctionExecute = new Function(FunctionInstruction);
                return(FunctionExecute());
            },
            ListenHover                                                         : function() {
                Navigation.find("." + PlugIn.Options.ClassPrefix + "Navigation").mouseover(function() {
                    TweenLite.to($(this), PlugIn.Options.NavigationButtonHoverSpeed, {
                        "scale"                                                 : PlugIn.Options.NavigationButtonHoverScale,
                        "backgroundColor"                                       : PlugIn.Options.NavigationButtonBackgroundColorActive,
                        "borderColor"                                           : PlugIn.Options.NavigationButtonBorderColorActive,
                        "ease"                                                  : Back.easeOut.config(PlugIn.Options.NavigationButtonEasingConfig)
                    });
                });
                Navigation.find("." + PlugIn.Options.ClassPrefix + "Navigation").mouseout(function() {
                    if(!$(this).is("." + PlugIn.Options.ClassPrefix + "NavigationCurrent")) {
                        TweenLite.to($(this), PlugIn.Options.NavigationButtonHoverSpeed, {
                            "scale"                                             : 1,
                            "backgroundColor"                                   : PlugIn.Options.NavigationButtonBackgroundColor,
                            "borderColor"                                       : PlugIn.Options.NavigationButtonBorderColor,
                            "ease"                                              : Back.easeOut.config(PlugIn.Options.NavigationButtonEasingConfig)
                        });
                    }

                });
            },
            ListenClick                                                         : function() {
                Navigation.find("." + PlugIn.Options.ClassPrefix + "Navigation").click(function() {
                    if(!$(this).is("." + PlugIn.Options.ClassPrefix + "NavigationCurrent")) {
                        TweenLite.to(Navigation.find("." + PlugIn.Options.ClassPrefix + "NavigationCurrent"), PlugIn.Options.NavigationButtonHoverSpeed, {
                            "scale"                                             : 1,
                            "backgroundColor"                                   : PlugIn.Options.NavigationButtonBackgroundColor,
                            "borderColor"                                       : PlugIn.Options.NavigationButtonBorderColor,
                            "ease"                                              : Back.easeOut.config(PlugIn.Options.NavigationButtonEasingConfig)
                        });
                        Navigation.find("." + PlugIn.Options.ClassPrefix + "NavigationCurrent").removeClass(PlugIn.Options.ClassPrefix + "NavigationCurrent");
                        $(this).addClass(PlugIn.Options.ClassPrefix + "NavigationCurrent");
                        ClickSector = $(this).attr("data-navigation");

                        function LoadNewSector() {
                            setTimeout(function() {
                                Content.empty();
                                PlugIn.Methods.LoadContent(ClickSector);
/*                                setTimeout(function() {
                                    $(window).trigger("resize");
                                }, 10);
                                setTimeout(function() {
                                    $(window).trigger("resize");
                                }, 1000);*/
                            }, PlugIn.Options.InitLoad);
                        }
                        window.TimeLine.reverse();
                        window.TimeLine.eventCallback("onReverseComplete", LoadNewSector);
                    }
                });
            },
            ListenWindowResize                                                  : function() {
                $(window).on("resize", function() {
                    setTimeout(function() {
                        Content.children("div").find("." + PlugIn.Options.ElementClass).each(function() {
                            $(this).parent().css({
                                "height"                                        : ($(this).height() + parseInt($(this).css("padding-top")) + parseInt($(this).css("padding-bottom"))) + "px"
                            });
                        });
                    }, 10);
                });
            }
        };
        PlugIn.PublicMethods = {
        };
        PlugIn.Methods.Initialize();
    };
    $.ns.ArtDesignWindowContent.DefaultOptions = {
        ClassPrefix                                                             : "WC_",
        InitDelay                                                               : 800,
        InitLoad                                                                : 500,
        ContentVerticalPosition                                                 : "middle", //top, middle, bottom
        Exclude                                                                 : ".NotWindowContent",
        StartSector                                                             : 1,
        ElementClass                                                            : "Element",
        NavigationPositionX                                                     : "right", //right, left
        NavigationPositionY                                                     : "middle", //top, middle, bottom
        NavigationMarginX                                                       : -14,
        NavigationButtonSize                                                    : 20,
        NavigationButtonBorderSize                                              : 0,
        NavigationButtonBackgroundColor                                         : "#1d4152",
        NavigationButtonBorderColor                                             : "#1d4152",
        NavigationButtonBackgroundColorActive                                   : "#90afbe",
        NavigationButtonBorderColorActive                                       : "#90afbe",
        NavigationButtonMargin                                                  : 16,
        NavigationButtonHoverScale                                              : 1,
        NavigationButtonHoverSpeed                                              : 0.6,
        NavigationButtonEasingConfig                                            : 1.3,
        //PositionX                                                             : "center", //left, center, right
        Delay                                                                   : 0.4,
        Margin                                                                  : 50,
        Scale                                                                   : 0.5,
        Opacity                                                                 : 0,
        Speed                                                                   : 1,
        Ease                                                                    : "Back.easeOut.config(3)"

    };
    $.fn.ArtDesignWindowContent                                                 = function(Options) {
        var ArtDesignWindowContent                                              = (new $.ns.ArtDesignWindowContent(this, Options));
        return ArtDesignWindowContent.PublicMethods;
    };
})(jQuery);