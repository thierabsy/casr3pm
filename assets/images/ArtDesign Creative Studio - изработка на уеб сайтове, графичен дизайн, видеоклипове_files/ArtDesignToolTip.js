/*
ArtDesignToolTip (v.1.0.0)

1167 lines code
www.artdesign-jquery.com/ArtDesignToolTip

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
        $.ns                                                                = {};
    }
    $.ns.ArtDesignToolTip                                                       = function (Element, Options) {
        var PlugIn                                                              = this;
        PlugIn.Options                                                          = $.extend({}, $.ns.ArtDesignToolTip.DefaultOptions, Options);
        var a,
            Unique,
            String,
            Characters,
            HEX, HEXConvertResult, HEXR, HEXG, HEXB,
            ResultNormal                                                        = [],
            RNormal                                                             = [],
            GNormal                                                             = [],
            BNormal                                                             = [],
            NativeOptions                                                       = [],
            NativeOptionsSplit                                                  = [],
            ElementsOptions                                                     = [],
            OffsetObject                                                        = [],
            Offset                                                              = [],
            ToolTipOffset                                                       = [],
            ToolTipTop                                                          = [],
            ToolTipLeft                                                         = [],
            Initializer                                                         = [],
            Destination                                                         = [],
            DestinationWidth                                                    = [],
            DestinationHeight                                                   = [],
            DestinationTop                                                      = [],
            DestinationBottom                                                   = [],
            DestinationLeft                                                     = [],
            DestinationRight                                                    = [],
            ToolTipArrow                                                        = [],
            NativeToolTipPosition                                               = [],
            CurrentToolTipPosition                                              = [],
            ToolTipCreated                                                      = [],
            Interval                                                            = [],
            ToolTipDestinationHovered                                           = [],
            ToolTipHovered                                                      = [];
        PlugIn.$Element                                                         = $(Element);
        PlugIn.Methods                                                          = {
            PreInitialize                                                       : function (ForceInitialize) {
                PlugIn.$Element.find("[data-plugin-ad-tooltip='ad-tooltip']").each(function () {
                    if((!$(this).attr("data-ad-tooltip-preinitialize") && !$(this).attr("data-ad-tooltip-prevent-initialize")) || (!$(this).attr("data-ad-tooltip-preinitialize") && ForceInitialize === true)) {
                        Unique                                                  = PlugIn.Methods.ID();
                        $(this).attr("data-ad-tooltip-preinitialize", "preinitialize");
                        $(this).attr("data-ad-tooltip-id", Unique);
                        Initializer[Unique]                                     = $(this);
                        if ($(this).attr("data-ad-tooltip-destination")) {
                            Destination[Unique]                                 = $("body").find($(this).attr("data-ad-tooltip-destination"));
                        }
                        else {
                            Destination[Unique]                                 = $(this);
                        }
                        ElementsOptions[Unique]                                 = $.extend({}, PlugIn.Options, Options);
                        if ($(this).attr("data-ad-tooltip-options")) {
                            NativeOptions[Unique]                               = $(this).attr("data-ad-tooltip-options").replace(/ /g, "");
                            NativeOptionsSplit[Unique]                          = NativeOptions[Unique].split(',');
                            for (a = 0; a < NativeOptionsSplit[Unique].length; a++) {
                                if ($.ToolTip !== undefined && $.ToolTip[NativeOptionsSplit[Unique][a]]) {
                                    ElementsOptions[Unique]                     = $.extend({}, ElementsOptions[Unique], $.ToolTip[NativeOptionsSplit[Unique][a]]);
                                }
                            }
                        }
/*                        if(!PlugIn.Methods.IsEven(ElementsOptions[Unique].BorderSize)) {
                            ElementsOptions[Unique].BorderSize                 += 1;

                            ElementsOptions[Unique].BorderTopSize                 += 1;
                            ElementsOptions[Unique].BorderBottomSize                 += 1;
                            ElementsOptions[Unique].BorderLeftSize                 += 1;
                            ElementsOptions[Unique].BorderRightSize                 += 1;
                        }*/
                        NativeToolTipPosition[Unique]                           = ElementsOptions[Unique].Position;
                        if ($(this).attr("data-ad-tooltip-event") === "Hover" || $(this).attr("data-ad-tooltip-event") === undefined) {
                            PlugIn.Methods.ListenHover(Unique);
                        }
                        else if ($(this).attr("data-ad-tooltip-event") === "Click") {
                            PlugIn.Methods.ListenClick(Unique);
                        }
                        else if ($(this).attr("data-ad-tooltip-event") === "Focus") {
                            PlugIn.Methods.ListenFocus(Unique);
                        }
                    }
                });
            },
            InitializeToolTip                                                   : function (Element) {
                Initializer[Element].attr("data-ad-tooltip-initialize", "initialize");
                PlugIn.Methods.CreateToolTip(Element);
                PlugIn.Methods.AppendToolTip(Element);
                if(ElementsOptions[Element].CloseWithButton === true || Initializer[Element].attr("data-ad-tooltip-event") === "Click") {
                    $("body").ArtDesignIcons();
                    PlugIn.Methods.ListenHoverIcon(Element);
                    PlugIn.Methods.ListenClickIcon(Element);
                }
                PlugIn.Methods.CSSToolTip(Element);
                PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                if(ElementsOptions[Element].ForceBestPosition === true) {
                    PlugIn.Methods.ForceBestPosition(Element);
                }
                if(ElementsOptions[Element].ListenScroll === true) {
                    PlugIn.Methods.ListenScroll(Element);
                }
                PlugIn.Methods.ListenWindowResize(Element);
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix  + "ToolTip").delay(ElementsOptions[Element].DelayShow).animate({
                    "opacity"                                                   :  1
                }, ElementsOptions[Element].AnimationSpeed);
                setTimeout(function() {
                    ToolTipCreated[Element]                                     = true;
                }, ElementsOptions[Element].DelayShow + ElementsOptions[Element].AnimationSpeed);
            },
            DestroyToolTip                                                      : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").delay(ElementsOptions[Element].DelayHide).animate({
                    "opacity"                                                   : 0
                }, ElementsOptions[Element].AnimationSpeed, function() {
                    ToolTipCreated[Element]                                     = false;
                    $(this).remove();
                    Initializer[Element].removeAttr("data-ad-tooltip-initialize");
                });
                if(Interval[Element]){
                    clearTimeout(Interval[Element]);
                    Interval[Element]                                           = null;
                }
                else {
                    Initializer[Element].removeAttr("data-ad-tooltip-initialize");
                    Interval[Element]                                           = setTimeout(function () {
                        if(ToolTipCreated[Element] !== true){
                            return false;
                        }
                        else{
                            clearTimeout(Interval[Element]);
                            Interval[Element] = null;
                            $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").delay(ElementsOptions[Element].DelayHide).animate({
                                "opacity"                                       : 0
                            }, ElementsOptions[Element].AnimationSpeed, function() {
                                ToolTipCreated[Element]                         = false;
                                $(this).remove();
                                //Initializer[Element].removeAttr("data-ad-tooltip-initialize");
                            });
                        }
                    }, 10);
                }
            },
            ListenHover                                                         : function (Element) {
                Initializer[Element].hover(function () {
                    if (!Initializer[Element].attr("data-ad-tooltip-initialize")) {
                        PlugIn.Methods.InitializeToolTip(Element);
                    }
                    ToolTipDestinationHovered[Element]                      = true;
                }, function () {
                    ToolTipDestinationHovered[Element]                      = false;
                    if(ElementsOptions[Element].PreventHoverOutWhenToolTipHovered === true && ElementsOptions[Element].CloseWithButton !== true) {
                        $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").hover(function () {
                            ToolTipHovered[Element]                             = true;
                        }, function () {
                            ToolTipHovered[Element]                             = false;
                            setTimeout(function() {
                                if(ToolTipDestinationHovered[Element] !== true) {
                                    PlugIn.Methods.DestroyToolTip(Element);
                                }
                            }, 10);
                        });
                        setTimeout(function() {
                            if(ToolTipHovered[Element] !== true) {
                                PlugIn.Methods.DestroyToolTip(Element);
                            }
                        }, 10);
                    }
                    else if(ElementsOptions[Element].CloseWithButton !== true) {
                        PlugIn.Methods.DestroyToolTip(Element);
                    }
                });
            },
            ListenClick                                                         : function (Element) {
                Initializer[Element].click(function () {
                    if (!Initializer[Element].attr("data-ad-tooltip-initialize")) {
                        PlugIn.Methods.InitializeToolTip(Element);
                    }
                });
            },
            ListenFocus                                                         : function (Element) {
                Initializer[Element].focusin(function () {
                    if (!Initializer[Element].attr("data-ad-tooltip-initialize")) {
                        PlugIn.Methods.InitializeToolTip(Element);
                    }
                });
                Initializer[Element].focusout(function () {
                    PlugIn.Methods.DestroyToolTip(Element);
                });
            },
            CreateToolTip                                                       : function(Element) {
                Object[Element]                                                 =
                "<table id='" + Element+"' class='" + PlugIn.Options.ClassPrefix + "ToolTip'>" +
                "<tr>" +
                "<td></td>" +
                "<td class='" + PlugIn.Options.ClassPrefix + "ToolTipTop'>" +
                "<div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowTop'>" +
                "<div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow'><div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove'></div></div>" +
                "</div>" +
                "</td>" +
                "<td></td>" +
                "</tr>" +
                "<tr>" +
                "<td class='" + PlugIn.Options.ClassPrefix + "ToolTipLeft'>" +
                "<div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowLeft'>" +
                "<div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow'><div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove'></div></div>" +
                "</div>" +
                "</td>" +
                "<td>" +
                "<div class='" + PlugIn.Options.ClassPrefix + "ToolTipBody'>";
                if((ElementsOptions[Element].CloseWithButton === true || Initializer[Element].attr("data-ad-tooltip-event") === "Click") && (ElementsOptions[Element].ClosePosition === "TopLeft" || ElementsOptions[Element].ClosePosition === "TopRight")) {
                    Object[Element]                                            += "<div class='" + PlugIn.Options.ClassPrefix + "Close'><span class='Icon " + PlugIn.Options.ClassPrefix + "CloseIcon " + ElementsOptions[Element].CloseIcon + "'></span></div>";
                }
                if($("body").find("[data-ad-tooltip-id='" + Element + "']").attr("data-ad-tooltip-title") !== undefined) {
                    Object[Element]                                            += "<div class='" + PlugIn.Options.ClassPrefix + "ToolTipTitle'>" + $("body").find("[data-ad-tooltip-id='" + Element + "']").attr("data-ad-tooltip-title") + "</div>";
                }
                Object[Element]                                                += "<div class='" + PlugIn.Options.ClassPrefix+"ToolTipContent'>" + $("body").find("[data-ad-tooltip-id='" + Element + "']").attr("data-ad-tooltip-content") + "</div>";
                if((ElementsOptions[Element].CloseWithButton === true || Initializer[Element].attr("data-ad-tooltip-event") === "Click") && (ElementsOptions[Element].ClosePosition === "BottomLeft" || ElementsOptions[Element].ClosePosition === "BottomRight")) {
                    Object[Element]                                            += "<div class='" + PlugIn.Options.ClassPrefix + "Close'><span class='Icon " + PlugIn.Options.ClassPrefix + "CloseIcon " + ElementsOptions[Element].CloseIcon + "'></span></div>";
                }
                Object[Element]                                                +="</div>" +
                "</td>" +
                "<td class='" + PlugIn.Options.ClassPrefix + "ToolTipRight'><div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowRight'>" +
                "<div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow'><div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove'></div></div>" +
                "</div>" +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td></td>" +
                "<td class='" + PlugIn.Options.ClassPrefix + "ToolTipBottom'><div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowBottom'>" +
                "<div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow'><div class='" + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove'></div></div>" +
                "</div>" +
                "</td>" +
                "<td></td>" +
                "</tr>" +
                "</table>";
                return Object[Element];
            },
            AppendToolTip                                                       : function(Element) {
                $("body").append(Object[Element]);
            },
            CSSToolTip                                                          : function(Element) {
                ResultNormal[Element]                                           = PlugIn.Methods.ConvertHex(ElementsOptions[Element].ShadowColor);
                RNormal[Element]                                                = ResultNormal[Element][0];
                GNormal[Element]                                                = ResultNormal[Element][1];
                BNormal[Element]                                                = ResultNormal[Element][2];
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "position"                                                  : "absolute",
                    "borderSpacing"                                             : 0,
                    "padding"                                                   : 0,
                    "borderCollapse"                                            : "collapse",
                    "opacity"                                                   :  0,
                    "zIndex"                                                    : ElementsOptions[Element].StartZIndex
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip td").css({
                    "margin"                                                    : 0,
                    "padding"                                                   : 0
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipBody").css({
                    "backgroundColor"                                           : ElementsOptions[Element].BackgroundColor,
                    "borderStyle"                                               : "solid",


                    "borderTopWidth"                                               : ElementsOptions[Element].BorderTopSize + "px",
                    "borderBottomWidth"                                               : ElementsOptions[Element].BorderBottomSize + "px",
                    "borderLeftWidth"                                               : ElementsOptions[Element].BorderLeftSize + "px",
                    "borderRightWidth"                                               : ElementsOptions[Element].BorderRightSize + "px",


                    "borderColor"                                               : ElementsOptions[Element].BorderColor,
                    "borderTopLeftRadius"                                              : ElementsOptions[Element].BorderTopLeftRadius + "px",
                    "borderTopRightRadius"                                              : ElementsOptions[Element].BorderTopRightRadius + "px",
                    "borderBottomLeftRadius"                                              : ElementsOptions[Element].BorderBottomLeftRadius + "px",
                    "borderBottomRightRadius"                                             : ElementsOptions[Element].BorderBottomRightRadius + "px",
                    "paddingTop"                                                : ElementsOptions[Element].PaddingTop + "px",
                    "paddingBottom"                                             : ElementsOptions[Element].PaddingBottom + "px",
                    "paddingLeft"                                               : ElementsOptions[Element].PaddingLeft + "px",
                    "paddingRight"                                              : ElementsOptions[Element].PaddingRight + "px",
                    "boxShadow"                                                 : ElementsOptions[Element].ShadowX + "px " + ElementsOptions[Element].ShadowY + "px " + ElementsOptions[Element].ShadowBlur + "px " + ElementsOptions[Element].ShadowSpread + "px rgba(" + RNormal[Element] + ", " + GNormal[Element] + ", " + BNormal[Element] + ", " + ElementsOptions[Element].ShadowAlpha + ")"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipTitle").css({
                    "paddingBottom"                                             : ElementsOptions[Element].TitlePaddingBottom + "px",
                    "color"                                                     : ElementsOptions[Element].TitleColor,
                    "fontFamily"                                                : ElementsOptions[Element].TitleFontFamily,
                    "fontSize"                                                  : ElementsOptions[Element].TitleFontSize + "px",
                    "textAlign"                                                 : ElementsOptions[Element].TitleTextAlign,
                    "lineHeight"                                                : ElementsOptions[Element].TitleLineHeight + "em",
                    "fontWeight"                                                : ElementsOptions[Element].TitleFontWeight,
                    "fontStyle"                                                 : ElementsOptions[Element].TitleFontStyle
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipContent").css({
                    "color"                                                     : ElementsOptions[Element].ContentColor,
                    "fontFamily"                                                : ElementsOptions[Element].ContentFontFamily,
                    "fontSize"                                                  : ElementsOptions[Element].ContentFontSize + "px",
                    "textAlign"                                                 : ElementsOptions[Element].ContentTextAlign,
                    "lineHeight"                                                : ElementsOptions[Element].ContentLineHeight + "em",
                    "fontWeight"                                                : ElementsOptions[Element].ContentFontWeight,
                    "fontStyle"                                                 : ElementsOptions[Element].ContentFontStyle
                });
                //////////////////////ARROW TOP
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowTop").css({
                    "width"                                                     : ElementsOptions[Element].ArrowSize * 2 + "px",
                    "height"                                                    : ElementsOptions[Element].ArrowSize + "px",
                    "display"                                                   : "none"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowTop ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow").css({
                    "width"                                                     : 0,
                    "height"                                                    : 0,
                    "borderTop"                                                 : 0,
                    "borderBottom"                                              : ElementsOptions[Element].ArrowSize + "px solid " + ElementsOptions[Element].ArrowBorderColor,
                    "borderLeft"                                                : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "borderRight"                                               : ElementsOptions[Element].ArrowSize + "px solid transparent"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowTop ." + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove").css({
                    "width"                                                     : 0,
                    "height"                                                    : 0,
                    "borderTop"                                                 : 0,
                    "borderBottom"                                              : ElementsOptions[Element].ArrowSize  + "px solid " + ElementsOptions[Element].ArrowBackgroundColor,
                    "borderLeft"                                                : ElementsOptions[Element].ArrowSize  + "px solid transparent",
                    "borderRight"                                               : ElementsOptions[Element].ArrowSize  + "px solid transparent",
                    "display"                                                   : "inline-block",
                    "marginLeft"                                                : -ElementsOptions[Element].ArrowSize  + "px",
                    "marginBottom"                                              : ElementsOptions[Element].ArrowSize + ElementsOptions[Element].BorderTopSize  + "px"
                });
                //////////////////////ARROW TOP
                //////////////////////ARROW BOTTOM
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBottom").css({
                    "width"                                                     : ElementsOptions[Element].ArrowSize * 2 + "px",
                    "height"                                                    : ElementsOptions[Element].ArrowSize + "px",
                    "display"                                                   : "none"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBottom ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow").css({
                    "width"                                                     : 0,
                    "height"                                                    : 0,
                    "borderBottom"                                              : 0,
                    "borderTop"                                                 : ElementsOptions[Element].ArrowSize + "px solid " + ElementsOptions[Element].ArrowBorderColor,
                    "borderLeft"                                                : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "borderRight"                                               : ElementsOptions[Element].ArrowSize + "px solid transparent"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBottom ." + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove").css({
                    "width"                                                     : 0,
                    "height"                                                    : 0,
                    "borderBottom"                                              : 0,
                    "borderTop"                                                 : ElementsOptions[Element].ArrowSize + "px solid " + ElementsOptions[Element].ArrowBackgroundColor,
                    "borderLeft"                                                : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "borderRight"                                               : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "marginLeft"                                                : -ElementsOptions[Element].ArrowSize  + "px",
                    "marginTop"                                                 : -(ElementsOptions[Element].ArrowSize + ElementsOptions[Element].BorderBottomSize) + "px"
                });
                //////////////////////ARROW BOTTOM
                //////////////////////ARROW LEFT
                $("body").find("#" + Element + "."+ PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowLeft").css({
                    "width"                                                     : ElementsOptions[Element].ArrowSize + "px",
                    "height"                                                    : ElementsOptions[Element].ArrowSize * 2 + "px",
                    "display"                                                   : "none"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowLeft ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow").css({
                    "width"                                                     : 0,
                    "height"                                                    : 0,
                    "borderLeft"                                                : 0,
                    "borderRight"                                               : ElementsOptions[Element].ArrowSize + "px solid " + ElementsOptions[Element].ArrowBorderColor,
                    "borderTop"                                                 : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "borderBottom"                                              : ElementsOptions[Element].ArrowSize + "px solid transparent"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowLeft ." + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove").css({
                    "width"                                                     : 0,
                    "height"                                                    : 0,
                    "borderLeft"                                                : 0,
                    "borderRight"                                               : ElementsOptions[Element].ArrowSize + "px solid " + ElementsOptions[Element].ArrowBackgroundColor,
                    "borderTop"                                                 : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "borderBottom"                                              : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "marginTop"                                                 : -ElementsOptions[Element].ArrowSize  + "px",
                    "marginLeft"                                                : ElementsOptions[Element].BorderRightSize  + "px"
                });
                //////////////////////ARROW LEFT
                //////////////////////ARROW RIGHT
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowRight").css({
                    "width"                                                     : ElementsOptions[Element].ArrowSize + "px",
                    "height"                                                    : ElementsOptions[Element].ArrowSize * 2 + "px",
                    "display"                                                   : "none"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowRight ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow").css({
                    "width"                                                     : 0,
                    "height"                                                    : 0,
                    "borderRight"                                               : 0,
                    "borderLeft"                                                : ElementsOptions[Element].ArrowSize + "px solid " + ElementsOptions[Element].ArrowBorderColor,
                    "borderTop"                                                 : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "borderBottom"                                              : ElementsOptions[Element].ArrowSize + "px solid transparent"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowRight ." + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove").css({
                    "width"                                                     : 0,
                    "height"                                                    : 0,
                    "borderRight"                                               : 0,
                    "borderLeft"                                                : ElementsOptions[Element].ArrowSize + "px solid " + ElementsOptions[Element].ArrowBackgroundColor,
                    "borderTop"                                                 : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "borderBottom"                                              : ElementsOptions[Element].ArrowSize + "px solid transparent",
                    "marginTop"                                                 : -ElementsOptions[Element].ArrowSize  + "px",
                    "marginLeft"                                                : -(ElementsOptions[Element].ArrowSize + ElementsOptions[Element].BorderRightSize)  + "px"
                });

                //////////////////////ARROW RIGHT
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow").css({
                    "-moz-transform"                                            : "scale(.9999)"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove").css({
                    "-moz-transform"                                            : "scale(.9999)"
                });
                if(window.Browser !== "Explorer" || (window.Browser === "Explorer" && (window.BrowserVersion < 8 || window.BrowserVersion > 8))) {
                    $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowTop ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow").css({
                        "position"                                              : "relative",
                        "zIndex"                                                : ElementsOptions[Element].StartZIndex + 1

                    });
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowTop ." + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove").css({
                        "position"                                              : "relative",
                        "zIndex"                                                : ElementsOptions[Element].StartZIndex + 2
                    });
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBottom ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow").css({
                        "position"                                              : "relative",
                        "zIndex"                                                : ElementsOptions[Element].StartZIndex + 1
                    });
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBottom ." + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove").css({
                        "position"                                              : "relative",
                        "zIndex"                                                : ElementsOptions[Element].StartZIndex + 2
                    });
                    $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowLeft ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow").css({
                        "position"                                              : "relative",
                        "zIndex"                                                : ElementsOptions[Element].StartZIndex + 1

                    });
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowLeft ." + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove").css({
                        "position"                                              : "relative",
                        "zIndex"                                                : ElementsOptions[Element].StartZIndex + 2
                    });
                    $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowRight ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBelow").css({
                        "position"                                              : "relative",
                        "zIndex"                                                : ElementsOptions[Element].StartZIndex + 1

                    });
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowRight ." + PlugIn.Options.ClassPrefix + "ToolTipArrowAbove").css({
                        "position"                                              : "relative",
                        "zIndex"                                                : ElementsOptions[Element].StartZIndex + 2
                    });
                }
                if($.isNumeric(ElementsOptions[Element].MinWidth)) {
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                        "minWidth"                                              : ElementsOptions[Element].MinWidth + "px"
                    });
                }
                if($.isNumeric(ElementsOptions[Element].MaxWidth)) {
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                        "maxWidth"                                              : ElementsOptions[Element].MaxWidth + "px"
                    });
                }
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "CloseIcon").css({
                    "fontSize"                                                  : ElementsOptions[Element].CloseSize + "px",
                    "color"                                                     : ElementsOptions[Element].CloseColor,
                    "cursor"                                                    : "pointer",
                    "position"                                                  : "absolute"
                });
                if(ElementsOptions[Element].ClosePosition === "TopLeft") {
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "CloseIcon").css({
                        "marginTop"                                             : -24 - ElementsOptions[Element].PaddingTop - ElementsOptions[Element].CloseMarginTop + "px",
                        "marginLeft"                                            : -10 + ElementsOptions[Element].CloseMarginLeft + "px"
                    });
                }
                else if(ElementsOptions[Element].ClosePosition === "TopRight") {
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "CloseIcon").css({
                        "marginTop"                                             : -24 - ElementsOptions[Element].PaddingTop - ElementsOptions[Element].CloseMarginTop + "px",
                        "marginLeft"                                            : -25 + $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").width() - ElementsOptions[Element].CloseMarginRight + "px"
                    });
                }
                if(ElementsOptions[Element].ClosePosition === "BottomLeft") {
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "CloseIcon").css({
                        "marginTop"                                             : ElementsOptions[Element].PaddingBottom + ElementsOptions[Element].CloseMarginBottom + "px",
                        "marginLeft"                                            : -10 + ElementsOptions[Element].CloseMarginLeft + "px"
                    });
                }
                else if(ElementsOptions[Element].ClosePosition === "BottomRight") {
                    $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "CloseIcon").css({
                        "marginTop"                                             : ElementsOptions[Element].PaddingBottom + ElementsOptions[Element].CloseMarginBottom + "px",
                        "marginLeft"                                            : -28 + $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").width() - ElementsOptions[Element].CloseMarginRight + "px"
                    });
                }
            },
            TopLeft                                                             : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipBottom").css({
                    "verticalAlign"                                             : "bottom"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBottom").css({
                    "display"                                                   : "block",
                    "float"                                                     : "left",
                    "marginLeft"                                                : ToolTipArrow[Element] + ElementsOptions[Element].BorderSize + "px"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationTop[Element] - $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").height() - ElementsOptions[Element].DistanceVertical  + "px",
                    "left"                                                      : DestinationLeft[Element] - ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "TopLeft";
            },
            TopCenter                                                           : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipBottom").css({
                    "verticalAlign"                                             : "top"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBottom").css({
                    "display"                                                   : "block",
                    "float"                                                     : "l",
                    "marginLeft"                                                : "auto",
                    "marginRight"                                               : "auto"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationTop[Element] - $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").height() - ElementsOptions[Element].DistanceVertical  + "px",
                    "left"                                                      : DestinationLeft[Element] + DestinationWidth[Element] / 2 - $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").width() / 2 + "px"
                });
                CurrentToolTipPosition[Element]                                 = "TopCenter";
            },
            TopRight                                                            : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipBottom").css({
                    "verticalAlign"                                             : "top"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowBottom").css({
                    "display"                                                   : "block",
                    "float"                                                     : "right",
                    "marginRight"                                               : ToolTipArrow[Element] + ElementsOptions[Element].BorderSize + "px"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationTop[Element] - $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").height() - ElementsOptions[Element].DistanceVertical  + "px",
                    "left"                                                      : DestinationLeft[Element] + DestinationWidth[Element] - $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").width() + ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "TopRight";
            },
            BottomLeft                                                          : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipTop").css({
                    "verticalAlign"                                             : "bottom"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowTop").css({
                    "display"                                                   : "block",
                    "float"                                                     : "left",
                    "marginLeft"                                                : ToolTipArrow[Element] + ElementsOptions[Element].BorderSize + "px"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationBottom[Element] + ElementsOptions[Element].DistanceVertical + "px",
                    "left"                                                      : DestinationLeft[Element] - ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "BottomLeft";
            },
            BottomCenter                                                        : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipTop").css({
                    "verticalAlign"                                             : "bottom"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowTop").css({
                    "display"                                                   : "block",
                    "float"                                                     : "left",
                    "marginLeft"                                                : ($("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").width() / 2) - (ToolTipArrow[Element] / 2) - ElementsOptions[Element].BorderSize + "px"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationBottom[Element] + ElementsOptions[Element].DistanceVertical + "px",
                    "left"                                                      : DestinationLeft[Element] + DestinationWidth[Element] / 2 - $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").width() / 2 + "px"
                });
                CurrentToolTipPosition[Element]                                 = "BottomCenter";
            },
            BottomRight                                                         : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipTop").css({
                    "verticalAlign"                                             : "bottom"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowTop").css({
                    "display"                                                   : "block",
                    "float"                                                     : "right",
                    "marginRight"                                               : ToolTipArrow[Element] + ElementsOptions[Element].BorderSize + "px"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationBottom[Element] + ElementsOptions[Element].DistanceVertical + "px",
                    "left"                                                      : DestinationLeft[Element] + DestinationWidth[Element] - $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").width() + ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "BottomRight";
            },
            LeftTop                                                             : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipRight").css({
                    "verticalAlign"                                             : "top"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowRight").css({
                    "display"                                                   : "block",
                    "marginTop"                                                 : ToolTipArrow[Element] + ElementsOptions[Element].BorderSize + "px"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationTop[Element] - ElementsOptions[Element].DistanceVertical + "px",
                    "left"                                                      : DestinationLeft[Element] - $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").width() - ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "LeftTop";
            },
            LeftMiddle                                                          : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipRight").css({
                    "verticalAlign"                                             : "middle"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowRight").css({
                    "display"                                                   : "block"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationBottom[Element] - (DestinationHeight[Element] / 2) - ($("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").height() / 2) + "px",
                    "left"                                                      : DestinationLeft[Element] - $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").width() - ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "LeftMiddle";
            },
            LeftBottom                                                          : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipRight").css({
                    "verticalAlign"                                             : "bottom"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowRight").css({
                    "display"                                                   : "block",
                    "marginBottom"                                              : ToolTipArrow[Element] + ElementsOptions[Element].BorderSize + "px"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationBottom[Element] - $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").height() + ElementsOptions[Element].DistanceVertical + "px",
                    "left"                                                      : DestinationLeft[Element] - $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").width() - ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "LeftBottom";
            },
            RightTop                                                            : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipLeft").css({
                    "verticalAlign"                                             : "top"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowLeft").css({
                    "display"                                                   : "block",
                    "float"                                                     : "right",
                    "marginTop"                                                 : ToolTipArrow[Element] + ElementsOptions[Element].BorderSize + "px"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationTop[Element] - ElementsOptions[Element].DistanceVertical + "px",
                    "left"                                                      : DestinationLeft[Element] + DestinationWidth[Element] + ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "RightTop";
            },
            RightMiddle                                                         : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipLeft").css({
                    "verticalAlign"                                             : "middle"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowLeft").css({
                    "display"                                                   : "block",
                    "float"                                                     : "right"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationBottom[Element] - (DestinationHeight[Element] / 2) - ($("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip").height() / 2) + "px",
                    "left"                                                      : DestinationLeft[Element] + DestinationWidth[Element] + ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "RightMiddle";
            },
            RightBottom                                                         : function(Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipLeft").css({
                    "verticalAlign"                                             : "bottom"
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrowLeft").css({
                    "display"                                                   : "block",
                    "float"                                                     : "right",
                    "marginBottom"                                              : ToolTipArrow[Element] + ElementsOptions[Element].BorderSize + "px"
                });
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                    "top"                                                       : DestinationBottom[Element] - $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").height() + ElementsOptions[Element].DistanceVertical + "px",
                    "left"                                                      : DestinationLeft[Element] + DestinationWidth[Element] + ElementsOptions[Element].DistanceHorizontal + "px"
                });
                CurrentToolTipPosition[Element]                                 = "RightBottom";
            },
            ToolTipPosition                                                     : function(Element, ToolTipPosition) {
                DestinationWidth[Element]                                       = Destination[Element].width();
                DestinationHeight[Element]                                      = Destination[Element].height();
                OffsetObject[Element]                                           = Destination[Element];
                Offset[Element]                                                 = OffsetObject[Element].offset();
                DestinationTop[Element]                                         = Offset[Element].top;
                DestinationBottom[Element]                                      = DestinationTop[Element] + DestinationHeight[Element];
                DestinationLeft[Element]                                        = Offset[Element].left;
                DestinationRight[Element]                                       = DestinationLeft[Element] + DestinationWidth[Element];
                ToolTipArrow[Element]                                           = ElementsOptions[Element].ArrowSize;
                switch(ToolTipPosition) {
                    //TOP
                    case "TopLeft":
                        PlugIn.Methods.TopLeft(Element);
                        break;
                    case "TopCenter":
                        PlugIn.Methods.TopCenter(Element);
                        break;
                    case "TopRight":
                        PlugIn.Methods.TopRight(Element);
                        break;
                    //TOP
                    //BOTTOM
                    case "BottomLeft":
                        PlugIn.Methods.BottomLeft(Element);
                        break;
                    case "BottomCenter":
                        PlugIn.Methods.BottomCenter(Element);
                        break;
                    case "BottomRight":
                        PlugIn.Methods.BottomRight(Element);
                        break;
                    //BOTTOM
                    //LEFT
                    case "LeftTop":
                        PlugIn.Methods.LeftTop(Element);
                        break;
                    case "LeftMiddle":
                        PlugIn.Methods.LeftMiddle(Element);
                        break;
                    case "LeftBottom":
                        PlugIn.Methods.LeftBottom(Element);
                        break;
                    //LEFT
                    //RIGHT
                    case "RightTop":
                        PlugIn.Methods.RightTop(Element);
                        break;
                    case "RightMiddle":
                        PlugIn.Methods.RightMiddle(Element);
                        break;
                    case "RightBottom":
                        PlugIn.Methods.RightBottom(Element);
                        break;
                    //RIGHT
                }
            },
            CheckPosition                                                       : function (Element, Position) {
                switch(Position) {
                    //TOP
                    case "TopLeft":
                    case "TopCenter":
                    case "TopRight":
                        if($("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").height() + ElementsOptions[Element].DistanceVertical <= DestinationTop[Element]) {
                            return true;
                        }
                        break;
                    //TOP
                    //BOTTOM
                    case "BottomLeft":
                    case "BottomCenter":
                    case "BottomRight":
                        if($("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").height() + ElementsOptions[Element].DistanceVertical <= $(window).height() - DestinationBottom[Element]) {
                            return true;
                        }
                        break;
                    //BOTTOM
                    //LEFT
                    case "LeftTop":
                    case "LeftMiddle":
                    case "LeftBottom":
                        if($("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").width() + ElementsOptions[Element].DistanceHorizontal <= DestinationLeft[Element]) {
                            return true;
                        }
                        break;
                    //LEFT
                    //RIGHT
                    case "RightTop":
                    case "RightMiddle":
                    case "RightBottom":
                        if($("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").width() + ElementsOptions[Element].DistanceHorizontal <= $(window).width() - DestinationRight[Element]) {
                            return true;
                        }
                        break;
                    //RIGHT
                }
            },
            ForceBestPosition                                                   : function (Element) {
                switch(CurrentToolTipPosition[Element]) {
                    //TOP
                    case "TopLeft":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.ShowArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "BottomLeft")) {
                            PlugIn.Methods.ToolTipPosition(Element, "BottomLeft");
                            PlugIn.Methods.ShowArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else {
                            PlugIn.Methods.DestroyToolTip(Element);
                        }
                        break;
                    case "TopCenter":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.ShowArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "BottomCenter")) {
                            PlugIn.Methods.ToolTipPosition(Element, "BottomCenter");
                            PlugIn.Methods.ShowArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        break;
                    case "TopRight":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.ShowArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "BottomRight")) {
                            PlugIn.Methods.ToolTipPosition(Element, "BottomRight");
                            PlugIn.Methods.ShowArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        break;
                    //TOP
                    //BOTTOM
                    case "BottomLeft":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.ShowArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "TopLeft")) {
                            PlugIn.Methods.ToolTipPosition(Element, "TopLeft");
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.ShowArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        break;
                    case "BottomCenter":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.ShowArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "TopCenter")) {
                            PlugIn.Methods.ToolTipPosition(Element, "TopCenter");
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.ShowArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        break;
                    case "BottomRight":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.ShowArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "TopRight")) {
                            PlugIn.Methods.ToolTipPosition(Element, "TopRight");
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.ShowArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        break;
                    //BOTTOM
                    //LEFT
                    case "LeftTop":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.ShowArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "RightTop")) {
                            PlugIn.Methods.ToolTipPosition(Element, "RightTop");
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.ShowArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        break;
                    case "LeftMiddle":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.ShowArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "RightMiddle")) {
                            PlugIn.Methods.ToolTipPosition(Element, "RightMiddle");
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.ShowArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        break;
                    case "LeftBottom":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.ShowArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "RightBottom")) {
                            PlugIn.Methods.ToolTipPosition(Element, "RightBottom");
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.ShowArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        break;
                    //LEFT
                    //RIGHT
                    case "RightTop":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.ShowArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "LeftTop")) {
                            PlugIn.Methods.ToolTipPosition(Element, "LeftTop");
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.ShowArrow(Element, "Right");
                        }
                        break;
                    case "RightMiddle":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.ShowArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "LeftMiddle")) {
                            PlugIn.Methods.ToolTipPosition(Element, "LeftMiddle");
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.ShowArrow(Element, "Right");
                        }
                        break;
                    case "RightBottom":
                        if (PlugIn.Methods.CheckPosition(Element, NativeToolTipPosition[Element])) {
                            PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.ShowArrow(Element, "Left");
                            PlugIn.Methods.HideArrow(Element, "Right");
                        }
                        else if (PlugIn.Methods.CheckPosition(Element, "LeftBottom")) {
                            PlugIn.Methods.ToolTipPosition(Element, "LeftBottom");
                            PlugIn.Methods.HideArrow(Element, "Top");
                            PlugIn.Methods.HideArrow(Element, "Bottom");
                            PlugIn.Methods.HideArrow(Element, "Left");
                            PlugIn.Methods.ShowArrow(Element, "Right");
                        }
                        break;
                    //RIGHT
                }
            },
            ShowArrow                                                           : function (Element, Arrow) {
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrow" + Arrow).css({
                    "display"                                                   : "block"
                });
            },
            HideArrow                                                           : function (Element, Arrow) {
                $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "ToolTipArrow" + Arrow).css({
                    "display"                                                   : "none"
                });
            },
            ListenScroll                                                        : function (Element) {
                ToolTipOffset[Element]                                          = $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").offset();
                ToolTipTop[Element]                                             = ToolTipOffset[Element].top + $(ElementsOptions[Element].ListenScrollElement).scrollTop();
                ToolTipLeft[Element]                                            = ToolTipOffset[Element].left + $(ElementsOptions[Element].ListenScrollElement).scrollLeft();
                $(ElementsOptions[Element].ListenScrollElement).scroll(function() {
                    $("body").find("#" + Element+"." + PlugIn.Options.ClassPrefix + "ToolTip").css({
                        top                                                     :  ToolTipTop[Element] - $(ElementsOptions[Element].ListenScrollElement).scrollTop(),
                        left                                                    :  ToolTipLeft[Element] - $(ElementsOptions[Element].ListenScrollElement).scrollLeft()
                    });
                });
            },
            ListenWindowResize                                                  : function (Element) {
                $(window).on("resize", function() {
                    PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                    if(ElementsOptions[Element].ForceBestPosition === true) {
                        PlugIn.Methods.ForceBestPosition(Element);
                    }
                    else {
                        PlugIn.Methods.ToolTipPosition(Element, NativeToolTipPosition[Element]);
                    }
                });
            },
            ListenHoverIcon                                                     : function (Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "CloseIcon").stop().hover(function() {
                    $(this).stop(true).animate({
                        "color"                                                 : ElementsOptions[Element].CloseColorHover
                    }, ElementsOptions[Element].CloseHoverSpeed);
                }, function() {
                    $(this).animate({
                        "color"                                                 : ElementsOptions[Element].CloseColor
                    }, ElementsOptions[Element].CloseHoverSpeed);
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "CloseIcon").css({
                    "fontSize"                                                  : ElementsOptions[Element].CloseSize + "px",
                    "color"                                                     : ElementsOptions[Element].CloseColor,
                    "cursor"                                                    : "pointer"
                });
            },
            ListenClickIcon                                                     : function (Element) {
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "CloseIcon").click(function() {
                    PlugIn.Methods.DestroyToolTip(Element);
                });
                $("body").find("#" + Element + "." + PlugIn.Options.ClassPrefix + "ToolTip ." + PlugIn.Options.ClassPrefix + "CloseIcon").css({
                    "fontSize"                                                  : ElementsOptions[Element].CloseSize + "px",
                    "color"                                                     : ElementsOptions[Element].CloseColor,
                    "cursor"                                                    : "pointer"
                });
            },
            ID                                                                  : function (NumberOfCharacters) {
                if(!NumberOfCharacters) {
                    NumberOfCharacters                                          = 10;
                }
                String                                                          = '';
                Characters                                                      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                for(a = 0; a < NumberOfCharacters; a++) {
                    String                                                     += Characters.charAt(Math.floor(Math.random() * Characters.length));
                }
                return String;
            },
            IsEven                                                              : function (Number) {
                return (Number%2 === 0) ? true : false;
            },
            ConvertHex                                                          : function (String) {
                HEX                                                             = String.replace('#', '');
                HEXR                                                            = parseInt(HEX.substring(0, 2), 16);
                HEXG                                                            = parseInt(HEX.substring(2, 4), 16);
                HEXB                                                            = parseInt(HEX.substring(4, 6), 16);
                HEXConvertResult                                                = [HEXR, HEXG, HEXB];
                return HEXConvertResult;
            }
        };
        PlugIn.PublicMethods                                                    = {
            ForceInitialize                                                     : function () {
                PlugIn.Methods.PreInitialize(true);
            }
        };
        PlugIn.Methods.PreInitialize();
    };
    $.ns.ArtDesignToolTip.DefaultOptions = {
        /*BASE SETTINGS*/
        ClassPrefix                                                             : "TT_",
        StartZIndex                                                             : 99999,
        ListenScroll                                                            : true,
        ListenScrollElement                                                     : ".SiteRightPanel",     //"window"
        ForceBestPosition                                                       : false,
        MinWidth                                                                : "auto",       //"auto", int
        MaxWidth                                                                : "auto",       //"auto", int
        DelayShow                                                               : 0,
        DelayHide                                                               : 0,
        PreventHoverOutWhenToolTipHovered                                       : true,
        AnimationSpeed                                                          : 250,
        ArrowSize                                                               : 8,
        Position                                                                : "TopCenter",
        DistanceHorizontal                                                      : 0,
        DistanceVertical                                                        : 0,
        /*BASE SETTINGS*/
        /*SHADOW*/
        ShadowX                                                                 : 0,
        ShadowY                                                                 : 0,
        ShadowBlur                                                              : 0,
        ShadowSpread                                                            : 0,
        ShadowColor                                                             : "#000000",
        ShadowAlpha                                                             : 0,
        /*SHADOW*/
        /*BACKGROUND*/
        BackgroundColor                                                         : "#FFFFFF",
        ArrowBackgroundColor                                                    : "#FFFFFF",

        /*BACKGROUND*/
        /*BORDER*/
        BorderSize                                                              : 2,

        BorderTopSize                                                           : 1,
        BorderBottomSize                                                        : 1,
        BorderLeftSize                                                          : 1,
        BorderRightSize                                                         : 1,

        BorderColor                                                             : "#CCCCCC",
        ArrowBorderColor                                                        : "#AAAAAA",
        BorderTopLeftRadius                                                     : 4,
        BorderTopRightRadius                                                    : 4,
        BorderBottomLeftRadius                                                  : 4,
        BorderBottomRightRadius                                                 : 4,
        /*BACKGROUND*/
        /*PADDING*/
        PaddingTop                                                              : 10,
        PaddingBottom                                                           : 10,
        PaddingLeft                                                             : 10,
        PaddingRight                                                            : 10,
        /*PADDING*/
        /*TITLE*/
        TitlePaddingBottom                                                      : 6,
        TitleColor                                                              : "#88959B",
        TitleFontFamily                                                         : "sans-serif",
        TitleFontSize                                                           : 12,
        TitleTextAlign                                                          : "center",
        TitleLineHeight                                                         : 1.8,          //em
        TitleFontWeight                                                         : "bold",
        TitleFontStyle                                                          : "normal",
        /*TITLE*/
        /*CONTENT*/
        ContentColor                                                            : "#88959B",
        ContentFontFamily                                                       : "sans-serif",
        ContentFontSize                                                         : 11,
        ContentTextAlign                                                        : "left",
        ContentLineHeight                                                       : 1.2,          //em
        ContentFontWeight                                                       : "normal",
        ContentFontStyle                                                        : "normal",
        /*CONTENT*/
        /*CLOSE*/
        CloseWithButton                                                         : false,
        ClosePosition                                                           : "TopRight",
        CloseIcon                                                               : "icon-cancel-circled",
        CloseSize                                                               : 18,
        CloseColor                                                              : "#88959B",
        CloseColorHover                                                         : "#74808F",
        CloseMarginTop                                                          : 0,
        CloseMarginBottom                                                       : 0,
        CloseMarginLeft                                                         : 0,
        CloseMarginRight                                                        : 0,
        CloseHoverSpeed                                                         : 250
        /*CLOSE*/
    };
    $.fn.ArtDesignToolTip                                                       = function(Options) {
        var ArtDesignToolTip                                                    = (new $.ns.ArtDesignToolTip(this, Options));
        return ArtDesignToolTip.PublicMethods;
    };
    window.ArtDesignToolTipLoaded                                               = true;
})(jQuery);