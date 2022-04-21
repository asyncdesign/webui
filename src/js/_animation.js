
(function (win) {
    
  /* PRIVATE */

  var 
    fn = webui.fn;

    
  /* PUBLIC */

  fn.slideVertical = function (direction, distance, duration, callback) {
    var args = arguments, els = this,
      uiElement, uiPosition, uiDeltaPosition,
      uiDirection = direction.toLowerCase() === "down" ? 1 : 0,
      distanceValue = args.length > 1 ? ui.getValueFromCssSize(distance) : 0,
      distanceUnit = args.length > 1 ? ui.getUnitFromCssSize(distance) : "px";


    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("display", "block");
      uiPosition = parseFloat(uiElement.css("top"));

      uiDeltaPosition = uiDirection === 1 ? uiPosition : uiPosition - distanceValue;

      uiElement.animate("top", uiDirection, distanceValue + distanceUnit, uiDeltaPosition, duration, function (el) {
        if (args.length === 4 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.slideHorizontal = function (direction, distance, duration, callback) {
    var args = arguments, els = this,
      uiElement, uiPosition, uiDeltaPosition,
      uiDirection = direction.toLowerCase() === "right" ? 1 : 0,
      distanceValue = args.length > 1 ? ui.getValueFromCssSize(distance) : 0,
      distanceUnit = args.length > 1 ? ui.getUnitFromCssSize(distance) : "px";

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("display", "block");
      uiPosition = parseFloat(uiElement.css("left"));
      uiDeltaPosition = direction.toLowerCase() === "right" ? uiPosition : uiPosition - distanceValue;

      uiElement.animate("left", uiDirection, distanceValue + distanceUnit, uiDeltaPosition, duration, function (el) {
        if (args.length === 4 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.expandVertical = function (duration, targetHeight, callback) {
    var args = arguments,
      els = this, uiElement, uiOverflow, uiBorderSize, uiOriginalHeight, uiTargetHeight, uiCurrentHeight,
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
      } else {
        if (targetHeightValue) {
          if (targetHeightUnit === "%") {
            uiTargetHeight = parseFloat(uiElement.parent().css("height")) / 100 * targetHeightValue;
            targetHeightUnit = "px";
          } else {
            uiTargetHeight = targetHeightValue;
          }
        } else {
          uiTargetHeight = targetHeightUnit === "rem" ? ui.pxToRem(uiOriginalHeight) : uiOriginalHeight;
        }
      }

      uiElement.css("height", "0");
      uiCurrentHeight = 0;

      uiElement.animate("height", 1, uiTargetHeight + targetHeightUnit, uiCurrentHeight, duration, function (el) {
        
        if (isAuto) {
          el.css("height", "auto");
        }
        el.css("overflow", uiOverflow);

        if (args.length === 3 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.expandHorizontal = function (duration, targetWidth, callback) {
    var args = arguments,
      els = this, uiElement, uiOverflow, uiBorderSize, uiOriginalWidth, uiTargetWidth, uiCurrentWidth,
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
      } else {
        if (targetWidthValue) {
          if (targetWidthUnit === "%") {
            uiTargetWidth = parseFloat(uiElement.parent().css("width")) / 100 * targetWidthValue;
            targetWidthUnit = "px";
          } else {
            uiTargetWidth = targetWidthValue;
          }
        } else {
          uiTargetWidth = targetWidthUnit === "rem" ? ui.pxToRem(uiOriginalWidth) : uiOriginalWidth;
        }
      }

      uiElement.css("width", "0");
      uiCurrentWidth = 0;

      uiElement.animate("width", 1, uiTargetWidth + targetWidthUnit, uiCurrentWidth, duration, function (el) {
        
        if (isAuto) {
          el.css("width", "auto");
        }
        el.css("overflow", uiOverflow);
        
        if (args.length === 3 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.collapseVertical = function (duration, targetHeight, callback) {
    var args = arguments,
      els = this, uiElement, uiOverflow, uiBorderSize, uiCurrentHeight, uiTargetHeight,
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
      } else {
        if (targetHeightUnit === "%") {
          uiTargetHeight = parseFloat(uiElement.parent().css("height")) / 100 * targetHeightValue;
          targetHeightUnit = "px";
        } else {
          uiTargetHeight = targetHeightValue;
        }
      }
      if (targetHeightUnit === "rem") {
        uiCurrentHeight = ui.pxToRem(uiCurrentHeight);
      }
    
      uiElement.animate("height", 0, uiCurrentHeight + targetHeightUnit, uiTargetHeight, duration, function (el) {
        el.css("overflow", uiOverflow);

        if (!targetHeightValue) {
          el.css("display", "none");
        }
        if (args.length === 3 && callback) {
          callback(el);
        }
      });
      
    }
    return els;
  };

  fn.collapseHorizontal = function (duration, targetWidth, callback) {
    var args = arguments,
      els = this, uiElement, uiOverflow, uiBorderSize, uiCurrentWidth, uiTargetWidth,
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
      } else {
        if (targetWidthUnit === "%") {
          uiTargetWidth = parseFloat(uiElement.parent().css("width")) / 100 * targetWidthValue;
          targetWidthUnit = "px";
        } else {
          uiTargetWidth = targetWidthValue;
        }
      }
      if (targetWidthUnit === "rem") {
        uiCurrentWidth = ui.pxToRem(uiCurrentWidth);
      }

      uiElement.animate("width", 0, uiCurrentWidth + targetWidthUnit, uiTargetWidth, duration, function (el) {
        el.css("overflow", uiOverflow);

        if (!targetWidthValue) {
          el.css("display", "none");
        }
        if (args.length === 3 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.fadeIn = function (duration, initialOpacity, callback) {
    var args = arguments, els = this,
      uiElement, uiLimitOpacity;

    uiLimitOpacity = args.length > 1 && !isNaN(parseFloat(initialOpacity)) ? initialOpacity : 0;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("opacity", "0").css("display", "block");

      uiElement.animate("opacity", 1, 1, uiLimitOpacity, duration, function (el) {

        if (args.length === 3 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.fadeOut = function (duration, finalOpacity, callback) {
    var args = arguments, els = this,
      uiElement, uiLimitOpacity;

    uiLimitOpacity = finalOpacity && !isNaN(parseFloat(finalOpacity)) ? finalOpacity : 0;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      if (uiElement.css("display") === "none" || uiElement.css("visibility") === "hidden") {
        continue;
      }
      uiElement.css("opacity", "1");

      uiElement.animate("opacity", 0, 1, uiLimitOpacity, duration, function (el) {

        if (uiLimitOpacity <= 0.01) {
          el.css("display", "none");
        }
        if (args.length === 3 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.animate = function (animateWhat, delta, propertyValue, limitValue, duration, callback) {
    var els = this,
      pv = propertyValue ? ui.getValueFromCssSize(propertyValue) : 0,
      pu = animateWhat !== "opacity" ? propertyValue ? ui.getUnitFromCssSize(propertyValue) : "px" : "",
      lv = limitValue ? ui.getValueFromCssSize(limitValue) : 0,
      timeFraction = null, progress = null;

    var start = performance.now();

    requestAnimationFrame(function animate(time) {
      if (delta === 1) {
        timeFraction = (time - start) / duration;
      } else {
        timeFraction = 1 - (time - start) / duration;
      }

      if (timeFraction < 0) timeFraction = 0;
      if (timeFraction > 1) timeFraction = 1;

      progress = timeFraction;
      els.css(animateWhat, (progress * pv) + lv + pu);
  
      if (delta === 1) {
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        } else {
          callback(els);
        }
      } else {
        if (timeFraction > 0) {
          requestAnimationFrame(animate);
        } else {
          callback(els);
        }
      }
    });
    return els;
  };

})(window);