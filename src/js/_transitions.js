
(function (win) {
    
  /* PRIVATE */

  var 
    fn = webui.fn,
  
    getValueFromCssSize = function (size) {
      var sizeValue = size && isNaN(size) ? parseFloat(size.replace(/[^0-9]+/gi, "")) : !isNaN(size) ? size : 0;
      return parseFloat(sizeValue);
    },
    getUnitFromCssSize = function (size) {
      var sizeUnit = size && isNaN(size) ? size.replace(/[^a-z%]+/gi, "") : "px";
      sizeUnit = sizeUnit.length > 0 ? sizeUnit : "px";
      return sizeUnit !== "auto" ? sizeUnit : "auto";
    };

    
  /* PUBLIC */

  fn.slideVertical = function (direction, distance, duration, callback) {
    var 
      args = arguments, els = this,
      uiElement, uiDistance, uiMovement, uiPosition, uiFinalPosition, pos,
      frameAdjustment = 50 / (duration / 1000),
      uiDirection = direction ? direction : "down",
      distanceUnit = args.length > 1 ? getUnitFromCssSize(distance) : "px", distanceValue = args.length > 1 ? getValueFromCssSize(distance) : 0;
        
    uiDistance = distanceValue;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("display", "block");
      uiMovement = uiDistance / duration * frameAdjustment;
      uiPosition = parseFloat(uiElement.css("top"));
      uiFinalPosition = uiDirection === "down" ? uiPosition + uiDistance : uiPosition - uiDistance;
    
      var nextFrame = function (element, movement, position, finalPosition, dir) {

        pos = dir === "down" ? parseFloat(position + movement) : parseFloat(position - movement);

        if ((dir === "down" && pos > finalPosition) || (dir === "up" && pos < finalPosition) || duration === 0) {
          element.css("top", finalPosition + distanceUnit);
          if (args.length === 4 && callback) {
            callback(element);
          }
          return;
        }
        else {
          element.css("top", pos + distanceUnit);

          win.requestAnimationFrame(function () {
            nextFrame(element, movement, pos, finalPosition, dir);
          });
        }
      };
      nextFrame(uiElement, uiMovement, uiPosition, uiFinalPosition, uiDirection);			
    }
    return els;
  };

  fn.slideHorizontal = function (direction, distance, duration, callback) {
    var 
      args = arguments, els = this,
      uiElement, uiDistance, uiMovement, uiPosition, uiFinalPosition, pos,
      frameAdjustment = 50 / (duration / 1000),
      uiDirection = direction ? direction : "right",
      distanceUnit = args.length > 1 ? getUnitFromCssSize(distance) : "px", distanceValue = args.length > 1 ? getValueFromCssSize(distance) : 0;

    uiDistance = distanceValue;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("display", "block");
      uiMovement = uiDistance / duration * frameAdjustment;
      uiPosition = parseFloat(uiElement.css("left"));
      uiFinalPosition = uiDirection === "right" ? uiPosition + uiDistance : uiPosition - uiDistance;
      
      
      var nextFrame = function (element, movement, position, finalPosition, dir) {

        pos = dir === "right" ? parseFloat(position + movement) : parseFloat(position - movement);

        if ((dir === "right" && pos > finalPosition) || (dir === "left" && pos < finalPosition) || duration === 0) {
          element.css("left", finalPosition + distanceUnit);
          if (args.length === 4 && callback) {
            callback(element);
          }
          return;
        }
        else {
          element.css("left", pos + distanceUnit);

          win.requestAnimationFrame(function () {
            nextFrame(element, movement, pos, finalPosition, dir);
          });
        }
      };
      nextFrame(uiElement, uiMovement, uiPosition, uiFinalPosition, uiDirection);			
    }
    return els;
  };
  
  fn.expandVertical = function(duration, targetHeight, callback) {
    var 
      args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiOriginalHeight, uiTargetHeight, uiMovement, uiCurrentHeight, 
      frameAdjustment = 50 / (duration / 1e3), 
      targetHeightUnit = args.length > 1 ? getUnitFromCssSize(targetHeight) : "px",
      targetHeightValue = args.length > 1 ? getValueFromCssSize(targetHeight) : targetHeightUnit !== "auto" ? 0 : "",
      isAuto = targetHeightUnit === "auto";

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("display", "block").css("overflow", "hidden").css("min-height", "0");
      uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-top-width")) + parseFloat(uiElement.css("border-bottom-width")) : 0;
      uiOriginalHeight = parseFloat(uiElement.css("height")) > uiBorderSize ? parseFloat(uiElement.css("height")) + uiBorderSize : els[i].scrollHeight + uiBorderSize;

      if (isAuto) {
        uiTargetHeight = els[i].scrollHeight + uiBorderSize;
        targetHeightUnit = "px";
      }
      else {
        if (targetHeightValue) {
          if (targetHeightUnit === "%") {
            uiTargetHeight = (parseFloat(uiElement.parent().css("height")) / 100) * targetHeightValue;
            targetHeightUnit = "px";
          }
          else {
            uiTargetHeight = targetHeightValue;
          }
        }
        else {
          uiTargetHeight = targetHeightUnit === "rem" ? ui.pxToRem(uiOriginalHeight) : uiOriginalHeight;
        }
      }

      uiElement.css("height", "0");
      uiCurrentHeight = 0;

      uiMovement = uiTargetHeight / duration * frameAdjustment;
      
      var nextFrame = function(el, targetHeight, heightUnit, currentHeight, movement, overflow) {
        var height = currentHeight + movement;

        if (height >= targetHeight || duration === 0) {

          if (isAuto) {
            el.css("height", "auto").css("overflow", overflow);
          }
          else {
            el.css("height", targetHeight + heightUnit).css("overflow", overflow);
          }
          if (args.length === 3 && callback) {
            callback(el);
          }
          return;
        } 
        else {
          el.css("height", height + heightUnit);
          win.requestAnimationFrame(function() {
            nextFrame(el, targetHeight, heightUnit, height, movement, overflow);
          });
        }
      };
      nextFrame(uiElement, uiTargetHeight, targetHeightUnit, uiCurrentHeight, uiMovement, uiOverflow);
    }
    return els;
  };

  fn.expandHorizontal = function(duration, targetWidth, callback) {
    var 
      args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiOriginalWidth, uiTargetWidth, uiMovement, uiCurrentWidth, 
      frameAdjustment = 50 / (duration / 1e3), 
      targetWidthUnit = args.length > 1 ? getUnitFromCssSize(targetWidth) : "px",
      targetWidthValue = args.length > 1 ? getValueFromCssSize(targetWidth) : targetWidthUnit !== "auto" ? 0 : "",
      isAuto = targetWidthUnit === "auto";

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("display", "block").css("overflow", "hidden").css("min-width", "0");
      uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-left-width")) + parseFloat(uiElement.css("border-right-width")) : 0;
      uiOriginalWidth = parseFloat(uiElement.css("width")) > uiBorderSize ? parseFloat(uiElement.css("width")) + uiBorderSize : els[i].scrollWidth + uiBorderSize;

      if (isAuto) {
        uiTargetWidth = els[i].scrollWidth + uiBorderSize;
        targetWidthUnit = "px";
      }
      else {
        if (targetWidthValue) {
          if (targetWidthUnit === "%") {
            uiTargetWidth = (parseFloat(uiElement.parent().css("width")) / 100) * targetWidthValue;
            targetWidthUnit = "px";
          }
          else {
            uiTargetWidth = targetWidthValue;
          }
        }
        else {
          uiTargetWidth = targetWidthUnit === "rem" ? ui.pxToRem(uiOriginalWidth) : uiOriginalWidth;
        }
      }

      uiElement.css("width", "0");
      uiCurrentWidth = 0;

      uiMovement = uiTargetWidth / duration * frameAdjustment;
      
      var nextFrame = function(el, targetWidth, widthUnit, currentWidth, movement, overflow) {
        var width = currentWidth + movement;

        if (width >= targetWidth || duration === 0) {

          if (isAuto) {
            el.css("width", "auto").css("overflow", overflow);
          }
          else {
            el.css("width", targetWidth + widthUnit).css("overflow", overflow);
          }
          if (args.length === 3 && callback) {
            callback(el);
          }
          return;
        } 
        else {
          el.css("width", width + widthUnit);
          win.requestAnimationFrame(function() {
            nextFrame(el, targetWidth, widthUnit, width, movement, overflow);
          });
        }
      };
      nextFrame(uiElement, uiTargetWidth, targetWidthUnit, uiCurrentWidth, uiMovement, uiOverflow);
    }
    return els;
  };

  fn.collapseVertical = function(duration, targetHeight, callback) {
    var 
      args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiCurrentHeight, uiTargetHeight, uiMovement, 
      frameAdjustment = 50 / (duration / 1e3),
      targetHeightUnit = args.length > 1 ? getUnitFromCssSize(targetHeight) : "px",
      targetHeightValue = args.length > 1 ? getValueFromCssSize(targetHeight) : targetHeightUnit !== "auto" ? 0 : "";

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("overflow", "hidden").css("min-height", "0");
      uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-top-width")) + parseFloat(uiElement.css("border-bottom-width")) : 0;
      uiCurrentHeight = parseFloat(uiElement.css("height")) > uiBorderSize ? parseFloat(uiElement.css("height")) + uiBorderSize : els[i].scrollHeight + uiBorderSize;

      if (targetHeightUnit === "auto") {
        uiTargetHeight = els[i].scrollHeight + uiBorderSize;
        targetHeightUnit = "px";
      }
      else {
        if (targetHeightUnit === "%") {
          uiTargetHeight = (parseFloat(uiElement.parent().css("height")) / 100) * targetHeightValue;
          targetHeightUnit = "px";
        }
        else {
          uiTargetHeight = targetHeightValue;
        }
      }

      if (targetHeightUnit === "rem") {
        uiCurrentHeight = ui.pxToRem(uiCurrentHeight);
      }

      uiMovement = uiCurrentHeight / duration * frameAdjustment;
      
      var nextFrame = function(el, targetHeight, heightUnit, currentHeight, movement, overflow) {
        var height = currentHeight - movement;
        
        if (height <= targetHeight || duration === 0) {
          if (targetHeight) {
            el.css("height", targetHeight + heightUnit).css("overflow", overflow);
          } 
          else {
            el.css("height", targetHeight + heightUnit).css("overflow", overflow).css("display", "none");
          }
          if (args.length === 3 && callback) {
            callback(el);
          }
          return;
        } 
        else if (height > targetHeight) {
          el.css("height", height + heightUnit);
          win.requestAnimationFrame(function() {
            nextFrame(el, targetHeight, heightUnit, height, movement, overflow);
          });
        }
      };
      nextFrame(uiElement, uiTargetHeight, targetHeightUnit, uiCurrentHeight, uiMovement, uiOverflow);
    }
    return els;
  };

  fn.collapseHorizontal = function(duration, targetWidth, callback) {
    var 
      args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiCurrentWidth, uiTargetWidth, uiMovement, 
      frameAdjustment = 50 / (duration / 1e3),
      targetWidthUnit = args.length > 1 ? getUnitFromCssSize(targetWidth) : "px",
      targetWidthValue = args.length > 1 ? getValueFromCssSize(targetWidth) : targetWidthUnit !== "auto" ? 0 : "";

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("overflow", "hidden").css("min-width", "0");
      uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-left-width")) + parseFloat(uiElement.css("border-right-width")) : 0;
      uiCurrentWidth = parseFloat(uiElement.css("width")) > uiBorderSize ? parseFloat(uiElement.css("width")) + uiBorderSize : els[i].scrollWidth + uiBorderSize;

      if (targetWidthUnit === "auto") {
        uiTargetWidth = els[i].scrollWidth + uiBorderSize;
        targetWidthUnit = "px";
      }
      else {
        if (targetWidthUnit === "%") {
          uiTargetWidth = (parseFloat(uiElement.parent().css("width")) / 100) * targetWidthValue;
          targetWidthUnit = "px";
        }
        else {
          uiTargetWidth = targetWidthValue;
        }
      }

      if (targetWidthUnit === "rem") {
        uiCurrentWidth = ui.pxToRem(uiCurrentWidth);
      }

      uiMovement = uiCurrentWidth / duration * frameAdjustment;             

      var nextFrame = function(el, targetWidth, widthUnit, currentWidth, movement, overflow) {
        var width = currentWidth - movement;

        if (width <= targetWidth || duration === 0) {
          if (targetWidth) {
            el.css("width", targetWidth + widthUnit).css("overflow", overflow);
          } 
          else {
            el.css("width", targetWidth + widthUnit).css("overflow", overflow).css("display", "none");
          }
          if (args.length === 3 && callback) {
            callback(el);
          }
          return;
        } 
        else if (width > targetWidth) {
          el.css("width", width + widthUnit);
          win.requestAnimationFrame(function() {
            nextFrame(el, targetWidth, widthUnit, width, movement, overflow);
          });
        }
      };
      nextFrame(uiElement, uiTargetWidth, targetWidthUnit, uiCurrentWidth, uiMovement, uiOverflow);
    }
    return els;
  };

  fn.fadeIn = function (duration, initialOpacity, callback) {
      var 
        args = arguments, els = this, uiElement, uiChange, uiCurrentOpacity, 
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

            win.requestAnimationFrame(function () {
              nextFrame(element, opacity, change);
            });
          }
        };
        nextFrame(uiElement, uiCurrentOpacity, uiChange);
      }
      return els;
  };

  fn.fadeOut = function (duration, finalOpacity, callback) {
    var 
      args = arguments, els = this, uiElement, uiChange, uiCurrentOpacity,
      frameAdjustment = 50 / (duration / 1000);
          
    uiCurrentOpacity = finalOpacity && !isNaN(parseFloat(finalOpacity)) ? finalOpacity : 0;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);

      if (uiElement.css("display") === "none" || uiElement.css("visibility") === "hidden") {
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

          win.requestAnimationFrame(function () {
            nextFrame(element, opacity, change);
          });
        }
      };
      nextFrame(uiElement, 1, uiChange);
    }
    return els;
  };

}(window));