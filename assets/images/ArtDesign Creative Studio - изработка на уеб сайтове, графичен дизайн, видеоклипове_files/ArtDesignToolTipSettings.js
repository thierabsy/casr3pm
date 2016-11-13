/*Do not delete!*/
function IsArray(ObjectArray) {
    return (ObjectArray instanceof Array) || (Object.prototype.toString.apply(ObjectArray) === '[object Array]');
}
if( !IsArray($.ToolTip) ) {
    $.ToolTip                                                                       = [];
}
/*Do not delete!*/
//
//
//
/*ArtDesignToolTip Settings - TopLeft, TopCenter, TopRight, BottomLeft, BottomCenter, BottomRight, LeftTop, LeftMiddle, LeftBottom, RightTop, RightMiddle, RightBottom, Click, Red*/
$.ToolTip.MenuIconToolTip                                                = ({
    Position: "BottomRight",
    ArrowSize: 6,
    DistanceHorizontal: 26,
    DistanceVertical: 36,
    PaddingTop: 2,
    PaddingBottom: 2,
    PaddingLeft: 10,
    PaddingRight: 10,

    BorderTopSize                                                               : 3,
    BorderBottomSize                                                            : 0,
    BorderLeftSize                                                              : 0,
    BorderRightSize                                                             : 0,
    BorderTopLeftRadius                                                         : 0,
    BorderTopRightRadius                                                        : 0,
    BorderBottomLeftRadius                                                      : 0,
    BorderBottomRightRadius                                                     : 0,

    BackgroundColor                                                             : "#1d4152",
    ArrowBackgroundColor                                                        : "#ff8106",
    ArrowBorderColor                                                            : "#ff8106",
    BorderColor                                                                 : "#ff8106",

    ContentColor                                                                : "#90afbe",
    ContentFontFamily                                                           : "earthregular",
    ContentFontSize                                                             : 14,
    ContentFontWeight                                                           : "normal",
    ContentLineHeight                                                           : 1.7

});
$.ToolTip.ADWCToolTip                                                = ({
    Position: "LeftMiddle",
    ArrowSize: 6,
    DistanceHorizontal: 12,
    DistanceVertical: 1,
    PaddingTop: 2,
    PaddingBottom: 2,
    PaddingLeft: 14,
    PaddingRight: 14,

    BorderTopSize                                                               : 0,
    BorderBottomSize                                                            : 0,
    BorderLeftSize                                                              : 0,
    BorderRightSize                                                             : 3,
    BorderTopLeftRadius                                                         : 0,
    BorderTopRightRadius                                                        : 0,
    BorderBottomLeftRadius                                                      : 0,
    BorderBottomRightRadius                                                     : 0,

    BackgroundColor                                                             : "#1d4152",
    ArrowBackgroundColor                                                        : "#ff8106",
    ArrowBorderColor                                                            : "#ff8106",
    BorderColor                                                                 : "#ff8106",

    ContentColor                                                                : "#90afbe",
    ContentFontFamily                                                           : "earthregular",
    ContentFontSize                                                             : 14,
    ContentFontWeight                                                           : "normal",
    ContentLineHeight                                                           : 1.7

});
$.ToolTip.TopLeft                                                                   = ({
    Position                                                                        : "TopLeft",
    ClosePosition                                                                   : "TopRight",
    DistanceHorizontal                                                              : 0
});
$.ToolTip.TopCenter                                                                 = ({
    Position                                                                        : "TopCenter",
    ClosePosition                                                                   : "TopRight",
    DistanceHorizontal                                                              : 0
});
$.ToolTip.TopRight                                                                  = ({
    Position                                                                        : "TopRight",
    ClosePosition                                                                   : "TopLeft",
    DistanceHorizontal                                                              : 0
});
$.ToolTip.BottomLeft                                                                = ({
    Position                                                                        : "BottomLeft",
    ClosePosition                                                                   : "BottomRight",
    DistanceHorizontal                                                              : 0,
    DistanceVertical                                                                : 3
});
$.ToolTip.BottomCenter                                                              = ({
    Position                                                                        : "BottomCenter",
    ClosePosition                                                                   : "BottomRight",
    DistanceHorizontal                                                              : 0
});
$.ToolTip.BottomRight                                                               = ({
    Position                                                                        : "BottomRight",
    ClosePosition                                                                   : "BottomLeft",
    DistanceHorizontal                                                              : 0
});
$.ToolTip.LeftTop                                                                   = ({
    Position                                                                        : "LeftTop",
    ClosePosition                                                                   : "TopLeft",
    DistanceVertical                                                                : 0
});
$.ToolTip.LeftMiddle                                                                = ({
    Position                                                                        : "LeftMiddle",
    ClosePosition                                                                   : "TopLeft",
    DistanceVertical                                                                : 0
});
$.ToolTip.LeftBottom                                                                = ({
    Position                                                                        : "LeftBottom",
    ClosePosition                                                                   : "TopLeft",
    DistanceVertical                                                                : 0
});
$.ToolTip.RightTop                                                                  = ({
    Position                                                                        : "RightTop",
    ClosePosition                                                                   : "TopRight",
    DistanceVertical                                                                : 0
});
$.ToolTip.RightMiddle                                                               = ({
    Position                                                                        : "RightMiddle",
    ClosePosition                                                                   : "TopRight",
    DistanceVertical                                                                : 0
});
$.ToolTip.RightBottom                                                               = ({
    Position                                                                        : "RightBottom",
    ClosePosition                                                                   : "TopRight",
    DistanceVertical                                                                : 0
});
$.ToolTip.Click                                                                     = ({
    Position                                                                        : "RightBottom"
});
$.ToolTip.Blue                                                                       = ({
    BorderColor                                                                     : "#2A8BD1",
    BackgroundColor                                                                 : "#2B8ED5",
    TitleColor                                                                      : "#FFFFFF",
    ContentColor                                                                    : "#FFFFFF",
    CloseColor                                                                      : "#2B8ED5",
    CloseColorHover                                                                 : "#2A8BD1",
    ShadowBlur                                                                      : 6,
    ShadowSpread                                                                    : 1,
    ShadowAlpha                                                                     : 0.5
});
$.ToolTip.Green                                                                       = ({
    BorderColor                                                                     : "#1EC764",
    BackgroundColor                                                                 : "#1FCB66",
    TitleColor                                                                      : "#FFFFFF",
    ContentColor                                                                    : "#FFFFFF",
    CloseColor                                                                      : "#1FCB66",
    CloseColorHover                                                                 : "#1EC764",
    ShadowBlur                                                                      : 6,
    ShadowSpread                                                                    : 1,
    ShadowAlpha                                                                     : 0.5
});
$.ToolTip.Yellow                                                                       = ({
    BorderColor                                                                     : "#DFA147",
    BackgroundColor                                                                 : "#E3A449",
    TitleColor                                                                      : "#FFFFFF",
    ContentColor                                                                    : "#FFFFFF",
    CloseColor                                                                      : "#E3A449",
    CloseColorHover                                                                 : "#DFA147",
    ShadowBlur                                                                      : 6,
    ShadowSpread                                                                    : 1,
    ShadowAlpha                                                                     : 0.5
});
$.ToolTip.Red                                                                       = ({
    BorderColor                                                                     : "#CE0906",
    BackgroundColor                                                                 : "#D10A07",
    TitleColor                                                                      : "#FFFFFF",
    ContentColor                                                                    : "#FFFFFF",
    CloseColor                                                                      : "#D10A07",
    CloseColorHover                                                                 : "#CE0906",
    ShadowBlur                                                                      : 6,
    ShadowSpread                                                                    : 1,
    ShadowAlpha                                                                     : 0.5
});
$.ToolTip.Niagara                                                                   = ({
    PaddingLeft                                                                     : 15,
    PaddingRight                                                                    : 15,
    BorderTopLeftRadius                                                             : 0,
    BorderTopRightRadius                                                            : 0,
    BorderBottomLeftRadius                                                          : 0,
    BorderBottomRightRadius                                                         : 0,
    BorderTopSize                                                                   : 0,
    BorderBottomSize                                                                : 3,
    BorderLeftSize                                                                  : 0,
    BorderRightSize                                                                 : 0,
    ArrowBackgroundColor                                                            : "#48CBC8",
    BorderColor                                                                     : "#48CBC8",
    ArrowBorderColor                                                                : "transparent",
    TitleColor                                                                      : "#48CBC8",
    TitleFontSize                                                                   : 15,
    TitleFontFamily                                                                 : "cinzelbold"
});