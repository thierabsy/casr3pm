/*Do not delete!*/
function IsArray(ObjectArray) {
    return (ObjectArray instanceof Array) || (Object.prototype.toString.apply(ObjectArray) === '[object Array]');
}
if( !IsArray($.ArtDesignMenu) ) {
    $.ArtDesignMenu                                                             = [];
}
/*Do not delete!*/

$.ArtDesignMenu.ArtDesign                                                       = ({
    HorizontalMode                                                              : {
        HorizontalMode                                                          : {
            PaddingLeftRightLevel0                                              : 30
        }
    },
    LevelSettings                                                               : {
        Level0                                                                  : {
            ElementHorizontalModeHorizontal                                     : {
                ElementHeight                                                   : 40,
                ElementBackgroundGradientStartColorNormal                       : "#9e957f",
                ElementBackgroundGradientEndColorNormal                         : "#9e957f",
                ElementBackgroundGradientStartColorHover                        : "#454542",
                ElementBackgroundGradientEndColorHover                          : "#454542",
                ElementBackgroundGradientStartColorClick                        : "#454542",
                ElementBackgroundGradientEndColorClick                          : "#454542",
                ElementBackgroundGradientStartColorActive                       : "#454542",
                ElementBackgroundGradientEndColorActive                         : "#454542",
                ElementColorNormal                                              : "#62625f",
                ElementColorHover                                               : "#c1bcb0",
                ElementColorClick                                               : "#c1bcb0",
                ElementColorActive                                              : "#c1bcb0",
                ElementFontFamily                                               : "earthregular, sans-serif",
                ElementFontSize: 13,
                ElementFontWeight: "normal",
                ElementLineHeight: 3.2
            },
            ElementHorizontalModeVertical                                       : {
                ElementHeight                                                   : 40,
                ElementBackgroundGradientStartColorNormal                       : "#4F4F4B",
                ElementBackgroundGradientEndColorNormal                         : "#4F4F4B",
                ElementBackgroundGradientStartColorHover                        : "#C9C8BD",
                ElementBackgroundGradientEndColorHover                          : "#C9C8BD",
                ElementBackgroundGradientStartColorClick                        : "#C9C8BD",
                ElementBackgroundGradientEndColorClick                          : "#C9C8BD",
                ElementBackgroundGradientStartColorActive                       : "#C9C8BD",
                ElementBackgroundGradientEndColorActive                         : "#C9C8BD",
                ElementColorNormal                                              : "#C9C8BD",
                ElementColorHover                                               : "#4F4F4B",
                ElementColorClick                                               : "#4F4F4B",
                ElementColorActive                                              : "#4F4F4B",
                ElementFontFamily                                               : "earthregular, sans-serif",
                ElementLineHeight                                               : 3
            },
            ElementVerticalMode                                                 : {
                ElementHeight                                                   : 40,
                ElementBackgroundGradientStartColorNormal                       : "#4F4F4B",
                ElementBackgroundGradientEndColorNormal                         : "#4F4F4B",
                ElementBackgroundGradientStartColorHover                        : "#C9C8BD",
                ElementBackgroundGradientEndColorHover                          : "#C9C8BD",
                ElementBackgroundGradientStartColorClick                        : "#C9C8BD",
                ElementBackgroundGradientEndColorClick                          : "#C9C8BD",
                ElementBackgroundGradientStartColorActive                       : "#C9C8BD",
                ElementBackgroundGradientEndColorActive                         : "#C9C8BD",
                ElementColorNormal                                              : "#C9C8BD",
                ElementColorHover                                               : "#4F4F4B",
                ElementColorClick                                               : "#4F4F4B",
                ElementColorActive                                              : "#4F4F4B",
                ElementFontFamily                                               : "earthregular, sans-serif",
                ElementLineHeight                                               : 3
            }
        }
    }
});