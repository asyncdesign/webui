
(function (win) {
    
    /* PRIVATE */

    var fn = webui.fn;

    /* PUBLIC */

    fn.slideVertical = function (direction, distance, duration, callback) {
        var args = arguments, els = this,
        uiElement, uiMovement, uiPosition, uiFinalPosition, pos, id,
        //frameAdjustment = 70 / (duration / 1000),
        uiDirection = direction ? direction : "down",
        uiDistance = distance ? distance : 0;

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiElement.css("display", "block");
            //uiMovement = uiDistance / duration * frameAdjustment;
            uiPosition = parseFloat(uiElement.css("top"));
            uiFinalPosition = uiDirection === "down" ? uiPosition + uiDistance : uiPosition - uiDistance;

            //console.log("dist: " + uiDistance);
          
            var start = performance.now();

            var nextFrame = function (element, movement, position, finalPosition, dir) {

                
                //pos = dir === "down" ? parseFloat(position + movement) : parseFloat(position - movement);
                pos = dir === "down" ? parseFloat(uiPosition + (uiDistance * movement)) : parseFloat(uiPosition - (uiDistance * movement));
                //console.log(pos);

                if ((dir === "down" && pos > finalPosition) || (dir === "up" && pos < finalPosition) || duration === 0) {
                    element.css("top", finalPosition + "px");
                    if (args.length === 4 && callback) {
                        callback(element);
                    }
                    return;
                }
                else {
                    element.css("top", pos + "px");

                    id = win.requestAnimationFrame(function (time) {
                        var timeFraction = ((time - start) / duration);
                        nextFrame(element, timeFraction, pos, finalPosition, dir);
                    });
                }
            };
            nextFrame(uiElement, 0, uiPosition, uiFinalPosition, uiDirection);			
        }
        return els;
    };

    fn.slideHorizontal = function (direction, distance, duration, callback) {
        var args = arguments, els = this,
        uiElement, uiMovement, uiPosition, uiFinalPosition, pos, id,
        //frameAdjustment = 70 / (duration / 1000),
        uiDirection = direction ? direction : "right",
        uiDistance = distance ? distance : 0;

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiElement.css("display", "block");
            //uiMovement = uiDistance / duration * frameAdjustment;
            uiPosition = parseFloat(uiElement.css("left"));
            uiFinalPosition = uiDirection === "right" ? uiPosition + uiDistance : uiPosition - uiDistance;
            
            //console.log("dist: " + uiDistance);
          
            var start = performance.now();
            
            var nextFrame = function (element, movement, position, finalPosition, dir) {

                //pos = dir === "right" ? parseFloat(position + movement) : parseFloat(position - movement);
                pos = dir === "right" ? parseFloat(uiPosition + (uiDistance * movement)) : parseFloat(uiPosition - (uiDistance * movement));

                if ((dir === "right" && pos > finalPosition) || (dir === "left" && pos < finalPosition) || duration === 0) {
                    element.css("left", finalPosition + "px");
                    if (args.length === 4 && callback) {
                        callback(element);
                    }
                    return;
                }
                else {
                    element.css("left", pos + "px");

                    id = win.requestAnimationFrame(function (time) {
                        var timeFraction = ((time - start) / duration);
                        nextFrame(element, timeFraction, pos, finalPosition, dir);
                    });
                }
            };
            nextFrame(uiElement, 0, uiPosition, uiFinalPosition, uiDirection);			
        }
        return els;
    };

    fn.expandVertical = function (duration, targetHeight, callback) {
        var args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiTargetHeight, uiOriginalHeight, uiMovement, uiCurrentHeight, id,
            //frameAdjustment = 70 / (duration / 1000),
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
                uiTargetHeight = targetHeightValue + uiBorderSize;
                uiCurrentHeight = uiOriginalHeight;
            }
            else {
                uiTargetHeight = uiOriginalHeight;
                uiElement.css("height", "0");
                uiCurrentHeight = 0;
            }

            //uiMovement = uiTargetHeight / duration * frameAdjustment;            

            var start = performance.now();

            var nextFrame = function (el, elTargetHeight, heightUnit, currentHeight, movement, overflow, borderSize) {

                //var height = currentHeight + movement;
                var height = elTargetHeight * movement;

                if (height > elTargetHeight || duration === 0) {
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

                    //console.log(height);

                    id = win.requestAnimationFrame(function (time) {
                        var timeFraction = ((time - start) / duration);
                        nextFrame(el, elTargetHeight, heightUnit, height, timeFraction, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiTargetHeight, targetHeightUnit, uiCurrentHeight, 0, uiOverflow, uiBorderSize);			
        }
        return els;
    };

    fn.expandHorizontal = function (duration, targetWidth, callback) {
        var args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiTargetWidth, uiOriginalWidth, uiMovement, uiCurrentWidth, id,
            //frameAdjustment = 70 / (duration / 1000),
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

            //uiMovement = uiTargetWidth / duration * frameAdjustment;

            var start = performance.now();

            var nextFrame = function (el, elTargetWidth, widthUnit, currentWidth, movement, overflow, borderSize) {

                //var width = currentWidth + movement;
                var width = elTargetWidth * movement;

                if (width > elTargetWidth || duration === 0) {
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

                    //console.log(width);

                    id = win.requestAnimationFrame(function (time) {
                        var timeFraction = ((time - start) / duration);
                        nextFrame(el, elTargetWidth, widthUnit, width, timeFraction, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiTargetWidth, targetWidthUnit, uiCurrentWidth, 0, uiOverflow, uiBorderSize);			
        }
        return els;
    };


    fn.collapseVertical = function (duration, targetHeight, callback) {
        var args = arguments, els = this,
            uiElement, uiOverflow, uiBorderSize, uiCurrentHeight, uiMovement, uiTargetHeight, uiOriginalHeight, id,
            //frameAdjustment = 70 / (duration / 1000),
            requiredHeight = args.length > 1 && targetHeight ? parseFloat(targetHeight.replace(/[^0-9]+/ig,"")) : 0,
            requiredUnit = args.length > 1 && targetHeight ? targetHeight.replace(/[^a-z]+/ig,"") : "auto",
            targetHeightValue = !isNaN(requiredHeight) ? requiredHeight : 0,
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

            //uiMovement = uiCurrentHeight / duration * frameAdjustment;
            uiTargetHeight = targetHeightValue + uiBorderSize;

            if (args.length === 1) {
                uiOriginalHeight = uiCurrentHeight;
            }

            var start = performance.now();

            var nextFrame = function (el, elTargetHeight, heightUnit, originalHeight, currentHeight, movement, overflow, borderSize) {

                //var height = currentHeight - movement;
                var height = originalHeight * movement;

                if (height < elTargetHeight || duration === 0) {
                    if (args.length > 1) {
                        el.css("height", elTargetHeight + heightUnit).css("overflow", overflow);
                    }
                    else {
                        el.css("height", originalHeight + heightUnit).css("overflow", overflow).css("display", "none");
                    }
                    if (args.length === 3 && callback) {
                        callback(el);
                    }
                    return;
                }
                else {
                    el.css("height", height + heightUnit);

                    //console.log(height);

                    id = win.requestAnimationFrame(function (time) {
                        var timeFraction = 1 - ((time - start) / duration);
                        nextFrame(el, elTargetHeight, heightUnit, originalHeight, height, timeFraction, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiTargetHeight, targetHeightUnit, uiOriginalHeight, uiCurrentHeight, 1, uiOverflow, uiBorderSize);
        }
        return els;
    };

    fn.collapseHorizontal = function (duration, targetWidth, callback) {
        var args = arguments, els = this,
            uiElement, uiOverflow, uiBorderSize, uiCurrentWidth, uiMovement, uiTargetWidth, uiOriginalWidth, id,
            //frameAdjustment = 70 / (duration / 1000),
            requiredWidth = args.length > 1 && targetWidth ? parseFloat(targetWidth.replace(/[^0-9]+/ig,"")) : 0,
            requiredUnit =  args.length > 1 && targetWidth ? targetWidth.replace(/[^a-z]+/ig,"") : "auto",
            targetWidthValue = !isNaN(requiredWidth) ? requiredWidth : 0,
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

            //uiMovement = uiCurrentWidth / duration * frameAdjustment;
            uiTargetWidth = targetWidthValue + uiBorderSize;

            if (args.length === 1) {
                uiOriginalWidth = uiCurrentWidth;
            }

            var start = performance.now();

            var nextFrame = function (el, elTargetWidth, widthUnit, originalWidth, currentWidth, movement, overflow, borderSize) {

                //var width = currentWidth - movement;
                var width = originalWidth * movement;

                if (width < elTargetWidth || duration === 0) {
                    if (args.length > 1) {
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

                    //console.log(width);

                    id = win.requestAnimationFrame(function (time) {
                        var timeFraction = 1 - ((time - start) / duration);
                        nextFrame(el, elTargetWidth, widthUnit, originalWidth, width, timeFraction, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiTargetWidth, targetWidthUnit, uiOriginalWidth, uiCurrentWidth, 1, uiOverflow, uiBorderSize);
        }
        return els;
    };

    fn.fadeIn = function (duration, initialOpacity, callback) {
        var args = arguments, els = this,
			uiElement, uiChange, uiCurrentOpacity, id,
			frameAdjustment = 70 / (duration / 1000);
            

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
			uiElement.css("opacity", "0").css("display", "block");
			uiChange = 0.3 / duration * frameAdjustment;
			uiCurrentOpacity = initialOpacity && !isNaN(parseFloat(initialOpacity)) ? initialOpacity : 0;
			
            var nextFrame = function (element, currentOpacity, change) {

                var opacity = currentOpacity + change;

                if (opacity >= 0.99 || duration === 0) {
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
			frameAdjustment = 70 / (duration / 1000);
            

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            if (uiElement.css("display") !== "block") {
                continue;
            }

			uiElement.css("opacity", "1");			
			uiChange = 0.3 / duration * frameAdjustment;
			uiCurrentOpacity = finalOpacity && !isNaN(parseFloat(finalOpacity)) ? finalOpacity : 1;

            var nextFrame = function (element, currentOpacity, change) {

				var opacity = currentOpacity - change;

                if (opacity <= 0.01 || duration === 0) {
                    element.css("opacity", "0").css("display", "none");	
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
            nextFrame(uiElement, uiCurrentOpacity, uiChange);
        }
        return els;
    };

}(window));