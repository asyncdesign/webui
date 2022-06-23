
(function (win) {
    
  /* PRIVATE */

  var 
    fn = webui.fn;

    
  /* PUBLIC */

  fn.slideVertical = function (direction, distance, duration, callback) {
    var els = this,
      args = arguments,
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
    var els = this,
      args = arguments,
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

  fn.expandVertical = function (options, callback) {
    var settings = ui.extend({
      duration: 300,
      targetHeight: "auto",
      initialHeight: null,
      displayType: "block",
      paddingTop: 0,
      paddingBottom: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0
    }, options),
    
    els = this,
    args = arguments, 
    uiElement, 
    uiOverflow, 
    uiOriginalHeight, 
    uiTargetHeight,

    targetHeightValue = ui.getValueFromCssSize(settings.targetHeight),
    targetHeightUnit = ui.getUnitFromCssSize(settings.targetHeight),
    initialHeightValue = ui.getValueFromCssSize(settings.initialHeight),
    initialHeightUnit = ui.getUnitFromCssSize(settings.initialHeight);


    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("display", settings.displayType).css("overflow", "hidden").css("min-height", "0");
      uiOriginalHeight = parseFloat(uiElement.css("height"));
      uiOriginalHeight = uiOriginalHeight > 0 ? uiOriginalHeight : els[i].scrollHeight;


      if (settings.targetHeight === "auto" || !targetHeightValue) {
        uiTargetHeight = els[i].scrollHeight + parseFloat(settings.borderTopWidth) + parseFloat(settings.borderBottomWidth);  
        uiElement.css("height", "0");
        uiOriginalHeight = 0;

        var paddingTopValue = ui.getValueFromCssSize(settings.paddingTop);    
        if (parseFloat(uiElement.css("padding-top")) < paddingTopValue) {
          uiTargetHeight = uiTargetHeight + paddingTopValue;
        }
        var paddingBottomValue = ui.getValueFromCssSize(settings.paddingBottom);
        if (parseFloat(uiElement.css("padding-bottom")) < paddingBottomValue) {
          uiTargetHeight = uiTargetHeight + paddingBottomValue;
        }
      } 
      else if (targetHeightValue) {
        uiTargetHeight = targetHeightValue;

        if (targetHeightUnit === "%") {
          uiTargetHeight = ui.percentHeightToPx(uiElement, uiTargetHeight)
        }
        else if (targetHeightUnit === "rem") {
          uiTargetHeight = ui.remToPx(uiTargetHeight);
        }
        uiElement.css("height", "0");
        uiOriginalHeight = 0;
      }

      if (settings.initialHeight !== null) {
        uiElement.css("height", initialHeightValue + initialHeightUnit);
        uiOriginalHeight = initialHeightValue;
      
        if (initialHeightUnit === "%") {
          uiOriginalHeight = ui.percentHeightToPx(uiElement, uiOriginalHeight)
        }
        else if (initialHeightUnit === "rem") {
          uiOriginalHeight = ui.remToPx(uiOriginalHeight);
        }
      }

      targetHeightUnit = "px";

      if (settings.paddingTop) { uiElement.animate("padding-top", 1, settings.paddingTop, 0, settings.duration); }
      if (settings.paddingBottom) { uiElement.animate("padding-bottom", 1, settings.paddingBottom, 0, settings.duration); }
      if (settings.borderTopWidth) { uiElement.animate("border-top-width", 1, settings.borderTopWidth, 0, settings.duration); }
      if (settings.borderBottomWidth) { uiElement.animate("border-bottom-width", 1, settings.borderBottomWidth, 0, settings.duration); }

      uiElement.animate("height", 1, (uiTargetHeight - uiOriginalHeight) + targetHeightUnit, uiOriginalHeight, settings.duration, function (el) {
        
        if (settings.targetHeight === "auto") {
          el.css("height", "auto");
        }

        el.css("overflow", uiOverflow);

        if (args.length === 2 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };  

  fn.expandHorizontal = function (options, callback) {
    var settings = ui.extend({
      duration: 300,
      targetWidth: "auto",
      initialWidth: null,
      displayType: "block",
      paddingLeft: 0,
      paddingRight: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0
    }, options),
    
    els = this,
    args = arguments,
    uiElement, 
    uiOverflow, 
    uiOriginalWidth, 
    uiTargetWidth,

    targetWidthValue = ui.getValueFromCssSize(settings.targetWidth),
    targetWidthUnit = ui.getUnitFromCssSize(settings.targetWidth),
    initialWidthValue = ui.getValueFromCssSize(settings.initialWidth),
    initialWidthUnit = ui.getUnitFromCssSize(settings.initialWidth);


    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("display", settings.displayType).css("overflow", "hidden").css("min-width", "0");
      uiOriginalWidth = parseFloat(uiElement.css("width"));
      uiOriginalWidth = uiOriginalWidth > 0 ? uiOriginalWidth : els[i].scrollWidth;


      if (settings.targetWidth === "auto" || !targetWidthValue) {
        uiTargetWidth = els[i].scrollWidth + parseFloat(settings.borderTopWidth) + parseFloat(settings.borderBottomWidth);  
        uiElement.css("width", "0");
        uiOriginalWidth = 0;
     
        var paddingLeftValue = ui.getValueFromCssSize(settings.paddingLeft);
        if (parseFloat(uiElement.css("padding-left")) < paddingLeftValue) {
          uiTargetWidth = uiTargetWidth + paddingLeftValue;
        }
        var paddingRightValue = ui.getValueFromCssSize(settings.paddingRight);
        if (parseFloat(uiElement.css("padding-right")) < paddingRightValue) {
          uiTargetWidth = uiTargetWidth + paddingRightValue;
        }
      } 
      else if (targetWidthValue) {
        uiTargetWidth = targetWidthValue;

        if (targetWidthUnit === "%") {
          uiTargetWidth = ui.percentWidthToPx(uiElement, uiTargetWidth)
        }
        else if (targetWidthUnit === "rem") {
          uiTargetWidth = ui.remToPx(uiTargetWidth);
        }
        uiElement.css("width", "0");
        uiOriginalWidth = 0;
      }

      if (settings.initialWidth !== null) {
        uiElement.css("width", initialWidthValue + initialWidthUnit);
        uiOriginalWidth = initialWidthValue;
      
        if (initialWidthUnit === "%") {
          uiOriginalWidth = ui.percentWidthToPx(uiElement, uiOriginalWidth)
        }
        else if (initialWidthUnit === "rem") {
          uiOriginalWidth = ui.remToPx(uiOriginalWidth);
        }
      }

      targetWidthUnit = "px";

      if (settings.paddingLeft) { uiElement.animate("padding-left", 1, settings.paddingLeft, 0, settings.duration); }
      if (settings.paddingRight) { uiElement.animate("padding-right", 1, settings.paddingRight, 0, settings.duration); }
      if (settings.borderLeftWidth) { uiElement.animate("border-left-width", 1, settings.borderLeftWidth, 0, settings.duration); }
      if (settings.borderRightWidth) { uiElement.animate("border-right-width", 1, settings.borderRightWidth, 0, settings.duration); }

      uiElement.animate("width", 1, (uiTargetWidth - uiOriginalWidth) + targetWidthUnit, uiOriginalWidth, settings.duration, function (el) {
        
        if (settings.targetWidth === "auto") {
          el.css("width", "auto");
        }

        el.css("overflow", uiOverflow);

        if (args.length === 2 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.collapseVertical = function (options, callback) {
    var settings = ui.extend({
      duration: 300,
      targetHeight: "auto",
      paddingTop: 0,
      paddingBottom: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0
    }, options),
    
    els = this,
    args = arguments,
    uiElement, 
    uiOverflow, 
    uiCurrentHeight, 
    uiTargetHeight,

    targetHeightValue = ui.getValueFromCssSize(settings.targetHeight),
    targetHeightUnit = ui.getUnitFromCssSize(settings.targetHeight);


    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("overflow", "hidden").css("min-height", "0");
      uiCurrentHeight = parseFloat(uiElement.css("height"));
      uiCurrentHeight = uiCurrentHeight > 0 ? uiCurrentHeight : els[i].scrollHeight;


      if (settings.targetHeight === "auto") {
        uiTargetHeight = 0;
      } 
      else if (targetHeightValue) {
        uiTargetHeight = targetHeightValue;

        if (targetHeightUnit === "%") {
          uiTargetHeight = ui.percentHeightToPx(uiElement, uiTargetHeight)
        }
        else if (targetHeightUnit === "rem") {
          uiTargetHeight = ui.remToPx(uiTargetHeight);
        }
      }

      targetHeightUnit = "px";

      if (settings.paddingTop) { uiElement.animate("padding-top", 0, settings.paddingTop, 0, settings.duration); }
      if (settings.paddingBottom) { uiElement.animate("padding-bottom", 0, settings.paddingBottom, 0, settings.duration); }
      if (settings.borderTopWidth) { uiElement.animate("border-top-width", 0, settings.borderTopWidth, 0, settings.duration); }
      if (settings.borderBottomWidth) { uiElement.animate("border-bottom-width", 0, settings.borderBottomWidth, 0, settings.duration); }
 
      uiElement.animate("height", 0, (uiCurrentHeight - uiTargetHeight) + targetHeightUnit, uiTargetHeight, settings.duration, function (el) {
        el.css("overflow", uiOverflow);

        if (!targetHeightValue) {
          el.css("display", "none");
        }
        if (args.length === 2 && callback) {
          callback(el);
        }
      });
      
    }
    return els;
  };

  fn.collapseHorizontal = function (options, callback) {
    var settings = ui.extend({
      duration: 300,
      targetWidth: "auto",
      paddingLeft: 0,
      paddingRight: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0
    }, options),
    
    els = this,
    args = arguments,
    uiElement, 
    uiOverflow, 
    uiCurrentWidth, 
    uiTargetWidth,

    targetWidthValue = ui.getValueFromCssSize(settings.targetWidth),
    targetWidthUnit = ui.getUnitFromCssSize(settings.targetWidth);


    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("overflow", "hidden").css("min-width", "0");
      uiCurrentWidth = parseFloat(uiElement.css("width"));
      uiCurrentWidth = uiCurrentWidth > 0 ? uiCurrentWidth : els[i].scrollWidth;


      if (settings.targetWidth === "auto") {
        uiTargetWidth = 0;
      } 
      else if (targetWidthValue) {
        uiTargetWidth = targetWidthValue;

        if (targetWidthUnit === "%") {
          uiTargetWidth = ui.percentWidthToPx(uiElement, uiTargetWidth)
        }
        else if (targetWidthUnit === "rem") {
          uiTargetWidth = ui.remToPx(uiTargetWidth);
        }
      }

      targetWidthUnit = "px";

      if (settings.paddingLeft) { uiElement.animate("padding-left", 0, settings.paddingLeft, 0, settings.duration); }
      if (settings.paddingRight) { uiElement.animate("padding-right", 0, settings.paddingRight, 0, settings.duration); }
      if (settings.borderLeftWidth) { uiElement.animate("border-left-width", 0, settings.borderLeftWidth, 0, settings.duration); }
      if (settings.borderRightWidth) { uiElement.animate("border-right-width", 0, settings.borderRightWidth, 0, settings.duration); }
 
      uiElement.animate("width", 0, (uiCurrentWidth - uiTargetWidth) + targetWidthUnit, uiTargetWidth, settings.duration, function (el) {
        el.css("overflow", uiOverflow);

        if (!targetWidthValue) {
          el.css("display", "none");
        }
        if (args.length === 2 && callback) {
          callback(el);
        }
      });
      
    }
    return els;
  };

  fn.fadeIn = function (duration, initialOpacity, callback) {
    var els = this,
      args = arguments,
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
    var els = this,
      args = arguments,
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
      args = arguments,
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
          if (args.length === 6 && callback) { 
            callback(els); 
          }
        }
      } else {
        if (timeFraction > 0) {
          requestAnimationFrame(animate);
        } else {
          if (args.length === 6 && callback) { 
            callback(els); 
          }
        }
      }
    });
    return els;
  };

})(window);