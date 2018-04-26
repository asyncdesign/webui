
(function (win) {
    
    /* PRIVATE */

    var fn = webui.fn;
    
    /* PUBLIC */

    fn.slideVertical = function (direction, distance, duration, callback) {
        var args = arguments, els = this,
        uiElement, uiMovement, uiPosition, uiFinalPosition, pos, id,
        frameAdjustment = 50 / (duration / 1000),
        uiDirection = direction ? direction : "down",
        uiDistance = distance ? distance : 0;

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiElement.css("display", "block");
            uiMovement = uiDistance / duration * frameAdjustment;
            uiPosition = parseFloat(uiElement.css("top"));
            uiFinalPosition = uiDirection === "down" ? uiPosition + uiDistance : uiPosition - uiDistance;
          
            var nextFrame = function (element, movement, position, finalPosition, dir) {

                pos = dir === "down" ? parseFloat(position + movement) : parseFloat(position - movement);

                if ((dir === "down" && pos > finalPosition) || (dir === "up" && pos < finalPosition) || duration === 0) {
                    element.css("top", finalPosition + "px");
                    if (args.length === 4 && callback) {
                        callback(element);
                    }
                    return;
                }
                else {
                    element.css("top", pos + "px");

                    id = win.requestAnimationFrame(function () {
                        nextFrame(element, movement, pos, finalPosition, dir);
                    });
                }
            };
            nextFrame(uiElement, uiMovement, uiPosition, uiFinalPosition, uiDirection);			
        }
        return els;
    };

    fn.slideHorizontal = function (direction, distance, duration, callback) {
        var args = arguments, els = this,
        uiElement, uiMovement, uiPosition, uiFinalPosition, pos, id,
        frameAdjustment = 50 / (duration / 1000),
        uiDirection = direction ? direction : "right",
        uiDistance = distance ? distance : 0;

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiElement.css("display", "block");
            uiMovement = uiDistance / duration * frameAdjustment;
            uiPosition = parseFloat(uiElement.css("left"));
            uiFinalPosition = uiDirection === "right" ? uiPosition + uiDistance : uiPosition - uiDistance;
            
            
            var nextFrame = function (element, movement, position, finalPosition, dir) {

                pos = dir === "right" ? parseFloat(position + movement) : parseFloat(position - movement);

                if ((dir === "right" && pos > finalPosition) || (dir === "left" && pos < finalPosition) || duration === 0) {
                    element.css("left", finalPosition + "px");
                    if (args.length === 4 && callback) {
                        callback(element);
                    }
                    return;
                }
                else {
                    element.css("left", pos + "px");

                    id = win.requestAnimationFrame(function () {
                        nextFrame(element, movement, pos, finalPosition, dir);
                    });
                }
            };
            nextFrame(uiElement, uiMovement, uiPosition, uiFinalPosition, uiDirection);			
        }
        return els;
    };

    fn.expandVertical = function (duration, targetHeight, callback) {
        var args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiTargetHeight, uiOriginalHeight, uiMovement, uiCurrentHeight, id,
            frameAdjustment = 50 / (duration / 1000),
            requiredHeight = args.length > 1 && targetHeight ? parseFloat(targetHeight.replace(/[^0-9]+/ig,"")) : 0,
            requiredUnit = args.length > 1 && targetHeight ? targetHeight.replace(/[^a-z]+/ig,"") : "auto",
            targetHeightValue = !isNaN(requiredHeight) ? requiredHeight : 0,
            targetHeightUnit = requiredUnit !== "auto" ? requiredUnit : "px";


        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            uiOverflow = uiElement.css("overflow");
            uiElement.css("display", "block").css("overflow", "hidden").css("min-height", "0");
            uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-top-width")) + parseFloat(uiElement.css("border-bottom-width")) : 0;
            uiOriginalHeight = parseFloat(uiElement.css("height")) > uiBorderSize ? parseFloat(uiElement.css("height")) + uiBorderSize : els[i].scrollHeight + uiBorderSize;

            if (targetHeightUnit === "rem") {
                uiOriginalHeight = ui.pxToRem(uiOriginalHeight);
            }

            if (targetHeightValue > 0) {
                uiTargetHeight = targetHeightValue;
                uiCurrentHeight = uiOriginalHeight;
            }
            else {
                uiTargetHeight = uiOriginalHeight;
                uiElement.css("height", "0");
                uiCurrentHeight = 0;
            }

            uiMovement = uiTargetHeight / duration * frameAdjustment;            

            var nextFrame = function (el, elTargetHeight, heightUnit, currentHeight, movement, overflow, borderSize) {

                var height = currentHeight + movement;

                if (height >= elTargetHeight || duration === 0) {
                    if (requiredUnit === "auto") {
                        el.css("height", "auto").css("overflow", overflow);
                    }
                    else {
                        el.css("height", elTargetHeight > 0 ? elTargetHeight + borderSize + heightUnit : "auto").css("overflow", overflow);
                    }
                    if (args.length === 3 && callback) {
                        callback(el);
                    }
                    return;
                }
                else {
                    el.css("height", height + heightUnit);

                    id = win.requestAnimationFrame(function () {
                        nextFrame(el, elTargetHeight, heightUnit, height, movement, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiTargetHeight, targetHeightUnit, uiCurrentHeight, uiMovement, uiOverflow, uiBorderSize);			
        }
        return els;
    };

    fn.expandHorizontal = function (duration, targetWidth, callback) {
        var args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiTargetWidth, uiOriginalWidth, uiMovement, uiCurrentWidth, id,
            frameAdjustment = 50 / (duration / 1000),
            requiredWidth = args.length > 1 && targetWidth ? parseFloat(targetWidth.replace(/[^0-9]+/ig,"")) : 0,
            requiredUnit =  args.length > 1 && targetWidth ? targetWidth.replace(/[^a-z]+/ig,"") : "auto",
            targetWidthValue = !isNaN(requiredWidth) ? requiredWidth : 0,
            targetWidthUnit = requiredUnit !== "auto" ? requiredUnit : "px";


        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            uiOverflow = uiElement.css("overflow");
            uiElement.css("display", "block").css("overflow", "hidden").css("min-width", "0");			
            uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-left-width")) + parseFloat(uiElement.css("border-right-width")) : 0;
            uiOriginalWidth = parseFloat(uiElement.css("width")) > uiBorderSize ? parseFloat(uiElement.css("width")) + uiBorderSize : els[i].scrollWidth + uiBorderSize;

            if (targetWidthUnit === "rem") {
                uiOriginalWidth = ui.pxToRem(uiOriginalWidth);
            }

            if (targetWidthValue > 0) {
                uiTargetWidth = targetWidthValue;
                uiCurrentWidth = uiOriginalWidth;
            }
            else {
                uiTargetWidth = uiOriginalWidth;
                uiElement.css("width", "0");
                uiCurrentWidth = 0;
            }

            uiMovement = uiTargetWidth / duration * frameAdjustment;

            var nextFrame = function (el, elTargetWidth, widthUnit, currentWidth, movement, overflow, borderSize) {

                var width = currentWidth + movement;

                if (width >= elTargetWidth || duration === 0) {
                    if (requiredUnit === "auto") {
                        el.css("width", "auto").css("overflow", overflow);
                    }
                    else {
                        el.css("width", elTargetWidth > 0 ? elTargetWidth + borderSize + widthUnit : "auto").css("overflow", overflow);
                    }
                    if (args.length === 3 && callback) {
                        callback(el);
                    }
                    return;
                }
                else {
                    el.css("width", width + widthUnit);

                    id = win.requestAnimationFrame(function () {
                        nextFrame(el, elTargetWidth, widthUnit, width, movement, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiTargetWidth, targetWidthUnit, uiCurrentWidth, uiMovement, uiOverflow, uiBorderSize);			
        }
        return els;
    };


    fn.collapseVertical = function (duration, targetHeight, callback) {
        var args = arguments, els = this,
            uiElement, uiOverflow, uiBorderSize, uiCurrentHeight, uiMovement, uiTargetHeight, uiOriginalHeight, id,
            frameAdjustment = 50 / (duration / 1000),
            requiredHeight = args.length > 1 && targetHeight ? parseFloat(targetHeight.replace(/[^0-9]+/ig,"")) : 0.01,
            requiredUnit = args.length > 1 && targetHeight ? targetHeight.replace(/[^a-z]+/ig,"") : "auto",
            targetHeightValue = !isNaN(requiredHeight) ? requiredHeight : 0.01,
            targetHeightUnit = requiredUnit !== "auto" ? requiredUnit : "px";


        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            uiOverflow = uiElement.css("overflow");
            uiElement.css("overflow", "hidden").css("min-height", "0");		
            uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-top-width")) + parseFloat(uiElement.css("border-bottom-width")) : 0;
            uiCurrentHeight = parseFloat(uiElement.css("height")) > uiBorderSize ? parseFloat(uiElement.css("height")) + uiBorderSize : els[i].scrollHeight + uiBorderSize;

            if (targetHeightUnit === "rem") {
                uiCurrentHeight = ui.pxToRem(uiCurrentHeight);
            }

            uiMovement = uiCurrentHeight / duration * frameAdjustment;
            uiTargetHeight = targetHeightValue;

            if (args.length === 1 || !targetHeight) {
                uiOriginalHeight = els[i].scrollHeight + uiBorderSize;
            }

            var nextFrame = function (el, elTargetHeight, heightUnit, originalHeight, currentHeight, movement, overflow, borderSize) {

                var height = currentHeight - movement;

                if (height <= elTargetHeight || duration === 0) {
                    if (args.length > 1 && targetHeight) {
                        el.css("height", elTargetHeight - borderSize + heightUnit).css("overflow", overflow);
                    }
                    else {
                        el.css("height", originalHeight - borderSize + heightUnit).css("overflow", overflow).css("display", "none");
                    }
                    if (args.length === 3 && callback) {
                        callback(el);
                    }
                    return;
                }
                else if (height > elTargetHeight) {
                    el.css("height", height + heightUnit);

                    id = win.requestAnimationFrame(function () {
                        nextFrame(el, elTargetHeight, heightUnit, originalHeight, height, movement, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiTargetHeight, targetHeightUnit, uiOriginalHeight, uiCurrentHeight, uiMovement, uiOverflow, uiBorderSize);
        }
        return els;
    };

    fn.collapseHorizontal = function (duration, targetWidth, callback) {
        var args = arguments, els = this,
            uiElement, uiOverflow, uiBorderSize, uiCurrentWidth, uiMovement, uiTargetWidth, uiOriginalWidth, id,
            frameAdjustment = 50 / (duration / 1000),
            requiredWidth = args.length > 1 && targetWidth ? parseFloat(targetWidth.replace(/[^0-9]+/ig,"")) : 0.01,
            requiredUnit =  args.length > 1 && targetWidth ? targetWidth.replace(/[^a-z]+/ig,"") : "auto",
            targetWidthValue = !isNaN(requiredWidth) ? requiredWidth : 0.01,
            targetWidthUnit = requiredUnit !== "auto" ? requiredUnit : "px";


        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            uiOverflow = uiElement.css("overflow");
            uiElement.css("overflow", "hidden").css("min-width", "0");		
            uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-left-width")) + parseFloat(uiElement.css("border-right-width")) : 0;
            uiCurrentWidth = parseFloat(uiElement.css("width")) > uiBorderSize ? parseFloat(uiElement.css("width")) + uiBorderSize : els[i].scrollWidth + uiBorderSize;

            if (targetWidthUnit === "rem") {
                uiCurrentWidth = ui.pxToRem(uiCurrentWidth);
            }

            uiMovement = uiCurrentWidth / duration * frameAdjustment;
            uiTargetWidth = targetWidthValue;

            if (args.length === 1 || !targetWidth) {
                uiOriginalWidth = els[i].scrollWidth + uiBorderSize;
            }

            var nextFrame = function (el, elTargetWidth, widthUnit, originalWidth, currentWidth, movement, overflow, borderSize) {

                var width = currentWidth - movement;

                if (width <= elTargetWidth || duration === 0) {
                    if (args.length > 1 && targetWidth) {
                        el.css("width", elTargetWidth - borderSize + widthUnit).css("overflow", overflow);
                    }
                    else {
                        el.css("width", originalWidth - borderSize + widthUnit).css("overflow", overflow).css("display", "none");
                    }
                    if (args.length === 3 && callback) {
                        callback(el);
                    }
                    return;
                }
                else if (width > elTargetWidth) {
                    el.css("width", width + widthUnit);

                    id = win.requestAnimationFrame(function () {
                        nextFrame(el, elTargetWidth, widthUnit, originalWidth, width, movement, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiTargetWidth, targetWidthUnit, uiOriginalWidth, uiCurrentWidth, uiMovement, uiOverflow, uiBorderSize);
        }
        return els;
    };

    fn.fadeIn = function (duration, initialOpacity, callback) {
        var args = arguments, els = this,
			uiElement, uiChange, uiCurrentOpacity, id,
            frameAdjustment = 50 / (duration / 1000);
            
        uiCurrentOpacity = args.length > 1 && !isNaN(parseFloat(initialOpacity)) ? initialOpacity : 0;

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
			uiElement.css("opacity", "0").css("display", "block");
            uiChange = 1 / duration * frameAdjustment;
			
            var nextFrame = function (element, currentOpacity, change) {

                var opacity = currentOpacity + change;

                if (opacity >= 0.99 || duration < frameAdjustment) {
                    element.css("opacity", "1").css("display", "block");
                    if (args.length === 3 && callback) {
                        callback(element);
                    }
                    return;
                }
                else if (opacity < 0.99) {
                    element.css("opacity", opacity).css("display", "block");

                    id = win.requestAnimationFrame(function () {
                        nextFrame(element, opacity, change);
                    });
                }
            };
            nextFrame(uiElement, uiCurrentOpacity, uiChange);
        }
        return els;
    };

    fn.fadeOut = function (duration, finalOpacity, callback) {
        var args = arguments, els = this,
			uiElement, uiChange, uiCurrentOpacity, id,
			frameAdjustment = 50 / (duration / 1000);
            
        uiCurrentOpacity = finalOpacity && !isNaN(parseFloat(finalOpacity)) ? finalOpacity : 0;

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            if (uiElement.css("display") !== "block") {
                continue;
            }

			uiElement.css("opacity", "1");			
            uiChange = 1 / duration * frameAdjustment;

            var nextFrame = function (element, currentOpacity, change) {

                var opacity = currentOpacity - change;

                if (opacity <= uiCurrentOpacity + 0.01 || duration < frameAdjustment) {
                    uiCurrentOpacity > 0.01 ? element.css("opacity", uiCurrentOpacity + "") : element.css("display", "none");	
                    if (args.length === 3 && callback) {
                        callback(element);
                    }	
                    return;
                }
                else if (opacity > 0.01) {
                    element.css("opacity", opacity);

                    id = win.requestAnimationFrame(function () {
                        nextFrame(element, opacity, change);
                    });
                }
            };
            nextFrame(uiElement, 1, uiChange);
        }
        return els;
    };

}(window));