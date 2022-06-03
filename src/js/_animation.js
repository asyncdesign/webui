
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

    if (distanceUnit === "rem") {
      distanceValue = ui.remToPx(distanceValue);
      distanceUnit = "px";
    }

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

    if (distanceUnit === "rem") {
      distanceValue = ui.remToPx(distanceValue);
      distanceUnit = "px";
    }

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

  fn.expandVertical = function (duration, targetHeight, callback, initialHeight) {
    var args = arguments,
      els = this, uiElement, uiOverflow, uiOriginalHeight, uiTargetHeight,
      targetHeightUnit = args.length > 1 ? ui.getUnitFromCssSize(targetHeight) : "px",
      targetHeightValue = args.length > 1 ? ui.getValueFromCssSize(targetHeight) : targetHeightUnit !== "auto" ? 0 : "",
      targetDisplayType = args.length > 1 ? ui.getvalueFromCssDisplayType(targetHeight) : "block",
      initialHeightValue = args.length > 3 ? ui.getValueFromCssSize(initialHeight) : -1,
      isAuto = targetHeightUnit === "auto";

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("display", targetDisplayType).css("overflow", "hidden").css("min-height", "0");
      uiOriginalHeight = parseFloat(uiElement.css("height")) > 0 ? parseFloat(uiElement.css("height")) : els[i].scrollHeight;

      if (isAuto) {
        uiTargetHeight = els[i].scrollHeight;        
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

      if (isAuto) {
        uiElement.css("height", "0");
        uiOriginalHeight = 0;  
      }
      else if (initialHeightValue > -1) {
        uiElement.css("height", initialHeight + targetHeightUnit);
        uiOriginalHeight = initialHeight;
      }
      else {
        if (targetHeightUnit === "rem") {
          uiOriginalHeight = ui.pxToRem(uiOriginalHeight);
        }
      }

      uiElement.animate("height", 1, (uiTargetHeight - uiOriginalHeight) + targetHeightUnit, uiOriginalHeight, duration, function (el) {
        
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

  fn.expandHorizontal = function (duration, targetWidth, callback, initialWidth) {
    var args = arguments,
      els = this, uiElement, uiOverflow, uiOriginalWidth, uiTargetWidth,
      targetWidthUnit = args.length > 1 ? ui.getUnitFromCssSize(targetWidth) : "px",
      targetWidthValue = args.length > 1 ? ui.getValueFromCssSize(targetWidth) : targetWidthUnit !== "auto" ? 0 : "",
      targetDisplayType = args.length > 1 ? ui.getvalueFromCssDisplayType(targetWidth) : "block",
      initialWidthValue = args.length > 3 ? ui.getValueFromCssSize(initialWidth) : -1,
      isAuto = targetWidthUnit === "auto";

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("display", targetDisplayType).css("overflow", "hidden").css("min-width", "0");
      uiOriginalWidth = parseFloat(uiElement.css("width")) > 0 ? parseFloat(uiElement.css("width")) : els[i].scrollWidth;

      if (isAuto) {
        uiTargetWidth = els[i].scrollWidth;
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

      if (isAuto) {
        uiElement.css("width", "0");
        uiOriginalWidth = 0;  
      }
      else if (initialWidthValue > -1) {
        uiElement.css("width", initialWidth + targetWidthUnit);
        uiOriginalWidth = initialWidth;
      }
      else {
        if (targetWidthUnit === "rem") {
          uiOriginalWidth = ui.pxToRem(uiOriginalWidth);
        }
      }

      uiElement.animate("width", 1, (uiTargetWidth - uiOriginalWidth) + targetWidthUnit, uiOriginalWidth, duration, function (el) {
        
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
      els = this, uiElement, uiOverflow, uiCurrentHeight, uiTargetHeight,
      targetHeightUnit = args.length > 1 ? ui.getUnitFromCssSize(targetHeight) : "px",
      targetHeightValue = args.length > 1 ? ui.getValueFromCssSize(targetHeight) : targetHeightUnit !== "auto" ? 0 : "";

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("overflow", "hidden").css("min-height", "0");
      uiCurrentHeight = parseFloat(uiElement.css("height")) > 0 ? parseFloat(uiElement.css("height")) : els[i].scrollHeight;

      if (targetHeightUnit === "auto") {
        uiTargetHeight = 0;
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
    
      uiElement.animate("height", 0, (uiCurrentHeight - uiTargetHeight) + targetHeightUnit, uiTargetHeight, duration, function (el) {
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
      els = this, uiElement, uiOverflow, uiCurrentWidth, uiTargetWidth,
      targetWidthUnit = args.length > 1 ? ui.getUnitFromCssSize(targetWidth) : "px",
      targetWidthValue = args.length > 1 ? ui.getValueFromCssSize(targetWidth) : targetWidthUnit !== "auto" ? 0 : "";

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("overflow", "hidden").css("min-width", "0");
      uiCurrentWidth = parseFloat(uiElement.css("width")) > 0 ? parseFloat(uiElement.css("width")) : els[i].scrollWidth;

      if (targetWidthUnit === "auto") {
        uiTargetWidth = 0;
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

      uiElement.animate("width", 0, (uiCurrentWidth - uiTargetWidth) + targetWidthUnit, uiTargetWidth, duration, function (el) {
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