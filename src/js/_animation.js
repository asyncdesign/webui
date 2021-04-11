
(function (win) {
    
  /* PRIVATE */

  var 
    fn = webui.fn;

    
  /* PUBLIC */

  fn.slideVertical = function (direction, distance, duration, callback) {
    var 
      args = arguments, els = this,
      uiElement, uiDistance, uiMovement, uiPosition, uiFinalPosition, pos,
      safeDuration = duration > 0 ? duration : 1,
      frameAdjustment = 50 / (safeDuration / 1e3),
      uiDirection = direction ? direction : "down",
      distanceUnit = args.length > 1 ? ui.getUnitFromCssSize(distance) : "px", distanceValue = args.length > 1 ? ui.getValueFromCssSize(distance) : 0;
        
    uiDistance = distanceValue;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("display", "block");
      uiMovement = uiDistance / safeDuration * frameAdjustment;
      uiPosition = parseFloat(uiElement.css("top"));
      uiFinalPosition = uiDirection === "down" ? uiPosition + uiDistance : uiPosition - uiDistance;
    
      var nextFrame = function (el, movement, position, finalPosition, dir) {

        pos = dir === "down" ? parseFloat(position + movement) : parseFloat(position - movement);

        if ((dir === "down" && pos > finalPosition) || (dir === "up" && pos < finalPosition) || safeDuration === 1) {
          el.css("top", finalPosition + distanceUnit);
          if (args.length === 4 && callback) {
            callback(el);
          }
          return;
        }
        else {
          el.css("top", pos + distanceUnit);

          win.requestAnimationFrame(function () {
            nextFrame(el, movement, pos, finalPosition, dir);
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
      safeDuration = duration > 0 ? duration : 1,
      frameAdjustment = 50 / (safeDuration / 1e3),
      uiDirection = direction ? direction : "right",
      distanceUnit = args.length > 1 ? ui.getUnitFromCssSize(distance) : "px", distanceValue = args.length > 1 ? ui.getValueFromCssSize(distance) : 0;

    uiDistance = distanceValue;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("display", "block");
      uiMovement = uiDistance / safeDuration * frameAdjustment;
      uiPosition = parseFloat(uiElement.css("left"));
      uiFinalPosition = uiDirection === "right" ? uiPosition + uiDistance : uiPosition - uiDistance;
      
      
      var nextFrame = function (el, movement, position, finalPosition, dir) {

        pos = dir === "right" ? parseFloat(position + movement) : parseFloat(position - movement);

        if ((dir === "right" && pos > finalPosition) || (dir === "left" && pos < finalPosition) || safeDuration === 1) {
          el.css("left", finalPosition + distanceUnit);
          if (args.length === 4 && callback) {
            callback(el);
          }
          return;
        }
        else {
          el.css("left", pos + distanceUnit);

          win.requestAnimationFrame(function () {
            nextFrame(el, movement, pos, finalPosition, dir);
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
      safeDuration = duration > 0 ? duration : 1,
      frameAdjustment = 50 / (safeDuration / 1e3), 
      targetHeightUnit = args.length > 1 ? ui.getUnitFromCssSize(targetHeight) : "px",
      targetHeightValue = args.length > 1 ? ui.getValueFromCssSize(targetHeight) : targetHeightUnit !== "auto" ? 0 : "",
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

      uiMovement = uiTargetHeight / safeDuration * frameAdjustment;
      
      var nextFrame = function(el, targetHeight, heightUnit, currentHeight, movement, overflow) {
        var height = currentHeight + movement;

        if (height >= targetHeight || safeDuration === 1) {

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
      safeDuration = duration > 0 ? duration : 1,
      frameAdjustment = 50 / (safeDuration / 1e3), 
      targetWidthUnit = args.length > 1 ? ui.getUnitFromCssSize(targetWidth) : "px",
      targetWidthValue = args.length > 1 ? ui.getValueFromCssSize(targetWidth) : targetWidthUnit !== "auto" ? 0 : "",
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

      uiMovement = uiTargetWidth / safeDuration * frameAdjustment;
      
      var nextFrame = function(el, targetWidth, widthUnit, currentWidth, movement, overflow) {
        var width = currentWidth + movement;

        if (width >= targetWidth || safeDuration === 1) {

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
      safeDuration = duration > 0 ? duration : 1,
      frameAdjustment = 50 / (safeDuration / 1e3),
      targetHeightUnit = args.length > 1 ? ui.getUnitFromCssSize(targetHeight) : "px",
      targetHeightValue = args.length > 1 ? ui.getValueFromCssSize(targetHeight) : targetHeightUnit !== "auto" ? 0 : "";

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

      uiMovement = uiCurrentHeight / safeDuration * frameAdjustment;
      
      var nextFrame = function(el, targetHeight, heightUnit, currentHeight, movement, overflow) {
        var height = currentHeight - movement;
        
        if (height <= targetHeight || safeDuration === 1) {
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
      safeDuration = duration > 0 ? duration : 1,
      frameAdjustment = 50 / (safeDuration / 1e3),
      targetWidthUnit = args.length > 1 ? ui.getUnitFromCssSize(targetWidth) : "px",
      targetWidthValue = args.length > 1 ? ui.getValueFromCssSize(targetWidth) : targetWidthUnit !== "auto" ? 0 : "";

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

      uiMovement = uiCurrentWidth / safeDuration * frameAdjustment;             

      var nextFrame = function(el, targetWidth, widthUnit, currentWidth, movement, overflow) {
        var width = currentWidth - movement;

        if (width <= targetWidth || safeDuration === 1) {
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
        safeDuration = duration > 0 ? duration : 1,
        frameAdjustment = 50 / (safeDuration / 1e3);
          
      uiCurrentOpacity = args.length > 1 && !isNaN(parseFloat(initialOpacity)) ? initialOpacity : 0;

      for (var i = 0; i < els.length; i++) {
        uiElement = webui(els[i]);
        uiElement.css("opacity", "0").css("display", "block");
        uiChange = 1 / safeDuration * frameAdjustment;
    
        var nextFrame = function (el, currentOpacity, change) {

          var opacity = currentOpacity + change;

          if (opacity >= 0.99 || safeDuration < frameAdjustment) {
            el.css("opacity", "1").css("display", "block");
            if (args.length === 3 && callback) {
              callback(el);
            }
            return;
          }
          else if (opacity < 0.99) {
            el.css("opacity", opacity);

            win.requestAnimationFrame(function () {
              nextFrame(el, opacity, change);
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
      safeDuration = duration > 0 ? duration : 1,
      frameAdjustment = 50 / (safeDuration / 1e3);
          
    uiCurrentOpacity = finalOpacity && !isNaN(parseFloat(finalOpacity)) ? finalOpacity : 0;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);

      if (uiElement.css("display") === "none" || uiElement.css("visibility") === "hidden") {
        continue;
      }

      uiElement.css("opacity", "1");			
      uiChange = 1 / safeDuration * frameAdjustment;

      var nextFrame = function (el, currentOpacity, change) {

        var opacity = currentOpacity - change;

        if (opacity <= uiCurrentOpacity + 0.01 || safeDuration < frameAdjustment) {
          uiCurrentOpacity > 0.01 ? el.css("opacity", uiCurrentOpacity + "") : el.css("display", "none");	
          if (args.length === 3 && callback) {
            callback(el);
          }	
          return;
        }
        else if (opacity > 0.01) {
          el.css("opacity", opacity);

          win.requestAnimationFrame(function () {
            nextFrame(el, opacity, change);
          });
        }
      };
      nextFrame(uiElement, 1, uiChange);
    }
    return els;
  };


  fn.animate = function (animateWhat, delta, propertyValue, duration, callback) {
    var 
      els = this,
      pv = propertyValue ? ui.getValueFromCssSize(propertyValue) : 0, 
      pu = animateWhat !== "opacity" ? propertyValue ? ui.getUnitFromCssSize(propertyValue) : "px" : "",	   
      timeFraction = null;

    var start = performance.now();

    requestAnimationFrame(function animate(time) {

      if (delta === 1) {
        timeFraction = ((time - start) / duration);
        if (timeFraction > 1) timeFraction = 1;
      }
      else {
        timeFraction = 1 - ((time - start) / duration);	
        if (timeFraction < 0) timeFraction = 0;
      }

      var progress = timeFraction;


      els.css(animateWhat, progress * pv + pu);

      if (delta === 1) {
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
        else {
          callback(els);
        }
      }
      else {
        if (timeFraction > 0) {
          requestAnimationFrame(animate);
        }
        else {
          callback(els);
        }
      }
    });
    return els;		
  };


}(window));