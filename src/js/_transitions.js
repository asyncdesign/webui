
(function (win) {
    
    /* PRIVATE */

    var fn = webui.fn;

    /* PUBLIC */

    fn.slideVertical = function (direction, distance, duration) {
        var args = arguments, els = this,
        uiElement, uiMovement, uiPosition, uiFinalPosition, element, movement, position, finalPosition, id, dir, pos,
        frameAdjustment = 70 / (duration / 1000),
        uiDirection = direction ? direction : "down",
        uiDistance = distance ? distance : 0;

        if (duration === 0) {
            return els;
        }

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiElement.css("display", "block");
            uiMovement = uiDistance / duration * frameAdjustment;
            uiPosition = parseFloat(uiElement.css("top"));
            uiFinalPosition = uiDirection === "down" ? uiPosition + uiDistance : uiPosition - uiDistance;
          

            var nextFrame = function (element, movement, position, finalPosition, dir) {

                pos = dir === "down" ? parseFloat(position + movement) : parseFloat(position - movement);

                if ((dir === "down" && pos > finalPosition) || (dir === "up" && pos < finalPosition)) {
                    element.css("top", finalPosition + "px");
                    return els;
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

    fn.slideHorizontal = function (direction, distance, duration) {
        var args = arguments, els = this,
        uiElement, uiMovement, uiPosition, uiFinalPosition, element, movement, position, finalPosition, id, dir, pos,
        frameAdjustment = 70 / (duration / 1000),
        uiDirection = direction ? direction : "right",
        uiDistance = distance ? distance : 0;

        if (duration === 0) {
            return els;
        }

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiElement.css("display", "block");
            uiMovement = uiDistance / duration * frameAdjustment;
            uiPosition = parseFloat(uiElement.css("left"));
            uiFinalPosition = uiDirection === "right" ? uiPosition + uiDistance : uiPosition - uiDistance;
            
            
            var nextFrame = function (element, movement, position, finalPosition, dir) {

                pos = dir === "right" ? parseFloat(position + movement) : parseFloat(position - movement);

                if ((dir === "right" && pos > finalPosition) || (dir === "left" && pos < finalPosition)) {
                    element.css("left", finalPosition + "px");
                    return els;
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

    fn.expandVertical = function (duration, targetHeight) {
        var args = arguments, els = this,
            uiElement, uiOverflow, uiBorderSize, uiElementHeight, uiMovement, uiCurrentHeight, element, elementHeight, currentHeight, movement, overflow, borderSize, id,
            frameAdjustment = 70 / (duration / 1000),
            reqHeight = targetHeight ? targetHeight : 0;

        if (duration === 0) {
            return els;
        }

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            uiOverflow = uiElement.css("overflow");
            uiElement.css("display", "block").css("overflow", "hidden").css("min-height", "0");
            uiBorderSize = parseFloat(uiElement.css("border-top-width")) + parseFloat(uiElement.css("border-bottom-width"));
            uiElementHeight = parseFloat(uiElement.css("height")) > uiBorderSize ? parseFloat(uiElement.css("height")) + uiBorderSize : els[i].scrollHeight + uiBorderSize;
            uiMovement = uiElementHeight / duration * frameAdjustment;
            uiElement.css("height", "0");
            uiCurrentHeight = 0;
            

            var nextFrame = function (element, elementHeight, currentHeight, movement, overflow, borderSize) {

                var height = currentHeight + borderSize + movement;

                if (height >= elementHeight) {
                    element.css("height", reqHeight ? reqHeight + "px" : "auto").css("overflow", overflow);
                    return els;
                }
                else {
                    element.css("height", height + "px");

                    id = win.requestAnimationFrame(function () {
                        nextFrame(element, elementHeight, height, movement, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiElementHeight, uiCurrentHeight, uiMovement, uiOverflow, uiBorderSize);			
        }
        return els;
    };

    fn.expandHorizontal = function (duration, targetWidth) {
        var args = arguments, els = this,
        uiElement, uiOverflow, uiBorderSize, uiElementWidth, uiMovement, uiCurrentWidth, element, elementWidth, currentWidth, movement, overflow, borderSize, id,
        frameAdjustment = 70 / (duration / 1000),
        reqWidth = targetWidth ? targetWidth : 0;

        if (duration === 0) {
            return els;
        }

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            uiOverflow = uiElement.css("overflow");
            uiElement.css("display", "block").css("overflow", "hidden").css("min-width", "0");			
            uiBorderSize = parseFloat(uiElement.css("border-left-width")) + parseFloat(uiElement.css("border-right-width"));
            uiElementWidth = parseFloat(uiElement.css("width")) > uiBorderSize ? parseFloat(uiElement.css("width")) + uiBorderSize : els[i].scrollWidth + uiBorderSize;
            uiMovement = uiElementWidth / duration * frameAdjustment;
            uiElement.css("width", "0");
            uiCurrentWidth = 0;

            var nextFrame = function (element, elementWidth, currentWidth, movement, overflow, borderSize) {

                var width = currentWidth + borderSize + movement;

                if (width >= elementWidth) {
                    element.css("width", reqWidth ? reqWidth + "px" : "auto").css("overflow", overflow);
                    return els;
                }
                else {
                    element.css("width", width + "px");

                    id = win.requestAnimationFrame(function () {
                        nextFrame(element, elementWidth, width, movement, overflow, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiElementWidth, uiCurrentWidth, uiMovement, uiOverflow, uiBorderSize);			
        }
        return els;
    };


    fn.collapseVertical = function (duration, restoreHeight, originalHeight) {
        var args = arguments, els = this,
            uiElement, uiOverflow, uiBorderSize, uiCurrentHeight, uiMovement, uiOriginalHeight, element, currentHeight, movement, overflow, borderSize, id,
            frameAdjustment = 70 / (duration / 1000);

        if (duration === 0) {
            return els;
        }

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            uiOverflow = uiElement.css("overflow");
            uiElement.css("overflow", "hidden").css("min-height", "0");		
            uiBorderSize = parseFloat(uiElement.css("border-top-width")) + parseFloat(uiElement.css("border-bottom-width"));
            uiCurrentHeight = parseFloat(uiElement.css("height")) > uiBorderSize ? parseFloat(uiElement.css("height")) + uiBorderSize : els[i].scrollHeight + uiBorderSize;
            uiMovement = uiCurrentHeight / duration * frameAdjustment;

            if (args.length === 2) {
                uiOriginalHeight = els[i].scrollHeight + uiBorderSize;
            }
            else if (args.length === 3) {
                uiOriginalHeight = originalHeight ? originalHeight : els[i].scrollHeight + uiBorderSize;
            }

            var nextFrame = function (element, currentHeight, movement, overflow, origHeight, borderSize) {

                var height = currentHeight - borderSize - movement;

                if (height <= 0.01) {
                    if (args.length > 1 && restoreHeight) {
                        element.css("height", origHeight + "px").css("overflow", overflow).css("display", "none");
                    }
                    else {
                        element.css("height", "0").css("overflow", overflow).css("display", "none");
                    }
                    return els;
                }
                else if (height > 0.01) {
                    element.css("height", height + "px");

                    id = win.requestAnimationFrame(function () {
                        nextFrame(element, height, movement, overflow, origHeight, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiCurrentHeight, uiMovement, uiOverflow, uiOriginalHeight, uiBorderSize);
        }
        return els;
    };

    fn.collapseHorizontal = function (duration, restoreWidth, originalWidth) {
        var args = arguments, els = this,
        uiElement, uiOverflow, uiBorderSize, uiCurrentWidth, uiMovement, uiOriginalWidth, element, currentWidth, movement, overflow, borderSize, id,
        frameAdjustment = 70 / (duration / 1000);

        if (duration === 0) {
            return els;
        }

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);

            uiOverflow = uiElement.css("overflow");
            uiElement.css("overflow", "hidden").css("min-width", "0");		
            uiBorderSize = parseFloat(uiElement.css("border-left-width")) + parseFloat(uiElement.css("border-right-width"));
            uiCurrentWidth = parseFloat(uiElement.css("width")) > uiBorderSize ? parseFloat(uiElement.css("width")) + uiBorderSize : els[i].scrollWidth + uiBorderSize;
            uiMovement = uiCurrentWidth / duration * frameAdjustment;

            if (args.length === 2) {
                uiOriginalWidth = els[i].scrollWidth + uiBorderSize;
            }
            else if (args.length === 3) {
                uiOriginalWidth = originalWidth ? originalWidth : els[i].scrollWidth + uiBorderSize;
            }

            var nextFrame = function (element, currentWidth, movement, overflow, origWidth, borderSize) {

                var width = currentWidth - borderSize - movement;

                if (width <= 0.01) {
                    if (args.length > 1 && restoreWidth) {
                        element.css("width", origWidth + "px").css("overflow", overflow).css("display", "none");
                    }
                    else {
                        element.css("width", "0").css("overflow", overflow).css("display", "none");
                    }
                    return els;
                }
                else if (width > 0.01) {
                    element.css("width", width + "px");

                    id = win.requestAnimationFrame(function () {
                        nextFrame(element, width, movement, overflow, origWidth, borderSize);
                    });
                }
            };
            nextFrame(uiElement, uiCurrentWidth, uiMovement, uiOverflow, uiOriginalWidth, uiBorderSize);
        }
        return els;
    };

    fn.fadeIn = function (duration, initialOpacity) {
        var args = arguments, els = this,
			uiElement, uiChange, uiCurrentOpacity, element, opacity, id,
			frameAdjustment = 70 / (duration / 1000);
            
        if (duration === 0) {
            return els;
        }

        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
			uiElement.css("opacity", "0").css("display", "block");
			uiChange = 0.3 / duration * frameAdjustment;
			uiCurrentOpacity = initialOpacity && !isNaN(parseFloat(initialOpacity)) ? initialOpacity : 0;
			
            var nextFrame = function (element, currentOpacity, change) {

                var opacity = currentOpacity + change;

                if (opacity >= 0.99) {
                    element.css("opacity", "1").css("display", "block");
                    return els;
                }
                else if (opacity < 0.99) {
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

    fn.fadeOut = function (duration, finalOpacity) {
        var args = arguments, els = this,
			uiElement, uiChange, uiCurrentOpacity, element, opacity, id,
			frameAdjustment = 70 / (duration / 1000);
            
        if (duration === 0) {
            return els;
        }

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

                if (opacity <= 0.01) {
					element.css("opacity", "0").css("display", "none");		
                    return els;
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