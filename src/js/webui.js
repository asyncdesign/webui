/*!
* Name: webui - UI functions
* Version: 4.3.0
* Author: Levi Keogh, 2016-10-25
*/

"use strict";

(function( webui, ui, $, undefined ) {
	
	/* PRIVATE */
	
	var notificationDynamic = false;
	var notificationPosition = "top-right";
	var notificationShowIcon = true;
	var notificationDuration = 5000;
	var notificationFadeInDuration = 300;
	var notificationFadeOutDuration = 300;
		
	var menuDropdownFadeInDuration = 500;
	var menuDropdownFadeOutDuration = 500;

	var tooltipFadeInDuration = 200;
	var tooltipFadeOutDuration = 200;
	var tooltipAutoPos = false;
	var tooltipAutoPosMargin = 0;
	var tooltipAutoSize = true;

	
    var isDiv = function (selector) {
        return $("#" + selector).is("div");
    };

    var isSpan = function (selector) {
        return $("#" + selector).is("span");
    };

	var isTextbox = function(selector) {
		return $("#" + selector).is("input:text");
	};
	
	var isPassword = function(selector) {
		return $("#" + selector).is("input:password");
	};

	var isCheckbox = function(selector) {
		return $("#" + selector).is("input:checkbox");
	};
	
	var isButton = function(selector) {
		return $("#" + selector).is("input:button");
	};
	
	var isTextarea = function(selector) {
		return $("#" + selector).is("textarea");
	};
	
	var isSelect = function(selector) {
		return $("#" + selector).is("select");
	};
	
	var dependsOnSelectorValueMatches = function(dependsOnSelector, dependsOnValue) {
		return (isTextbox(dependsOnSelector) && dependsOnValue === $("#" + dependsOnSelector).val()) ||
				(isTextarea(dependsOnSelector) && dependsOnValue === $("#" + dependsOnSelector).text()) ||
				(isSelect(dependsOnSelector) && dependsOnValue === $("#" + dependsOnSelector + " option:selected").text()) ||
				(isCheckbox(dependsOnSelector) && dependsOnValue === $("#" + dependsOnSelector).is(':checked'));
	};
	
	var switchClasses = function(selector, currentCssClass, newCssClass) {
		$("#" + selector).removeClass(currentCssClass); 
		$("#" + selector).addClass(newCssClass); 
		if (isSelect(selector)) {
			$("#" + selector + " option").css("color", $("#" + selector).css("color"));
		}
	};
			
	var flipTooltip = function(tooltip, orientation, shadowClass) {
		try {
			if (arguments.length > 1) {
				switch (orientation) {
					case ui.TOP:
						tooltip.removeClass("tooltip-left");
						tooltip.removeClass("tooltip-right");
						tooltip.removeClass("tooltip-bottom");		
						tooltip.addClass("tooltip-top");
						break;
					case ui.LEFT:
						tooltip.removeClass("tooltip-top");
						tooltip.removeClass("tooltip-right");
						tooltip.removeClass("tooltip-bottom");
						tooltip.addClass("tooltip-left");
						break;
					case ui.BOTTOM:
						tooltip.removeClass("tooltip-top");				
						tooltip.removeClass("tooltip-left");
						tooltip.removeClass("tooltip-right");			
						tooltip.addClass("tooltip-bottom");
						break;
					case ui.RIGHT:
						tooltip.removeClass("tooltip-top");			
						tooltip.removeClass("tooltip-left");
						tooltip.removeClass("tooltip-bottom");
						tooltip.addClass("tooltip-right");
						break;
					default: break;
				}
			}
			if (arguments.length > 2) {
				switch (shadowClass) {
					case ui.SHADOW_TOP:	
						tooltip.addClass("shadow-top");
						break;
					case ui.SHADOW_LEFT:
						tooltip.addClass("shadow-left");
						break;
					case ui.SHADOW_BOTTOM:			
						tooltip.addClass("shadow-bottom");
						break;
					case ui.SHADOW_RIGHT:
						tooltip.addClass("shadow-right");
						break;
					default: break;
				}			
			}
		}
		catch (ex) { }			
	};

	var positionTooltip = function(tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight) {
		try {
			if (tooltip.hasClass("tooltip-left")) {
				tooltip.css("margin-left", "-" + (tooltipWidth + 5) + "px");
				tooltip.css("top", ((targetHeight / 2) - (tooltipHeight / 2)) + "px");
			}
			else if (tooltip.hasClass("tooltip-top")) {
				tooltip.css("margin-top", "-" + (tooltipHeight + 5) + "px");
				tooltip.css("left", ((targetWidth / 2) - (tooltipWidth / 2)) + "px");
			}
			else if (tooltip.hasClass("tooltip-right")) {
				tooltip.css("margin-left", (targetWidth + 5) + "px");
				tooltip.css("top", ((targetHeight / 2) - (tooltipHeight / 2)) + "px");					
			}
			else if (tooltip.hasClass("tooltip-bottom")) {
				tooltip.css("margin-top", (targetHeight + 5) + "px");
				tooltip.css("left", ((targetWidth / 2) - (tooltipWidth / 2)) + "px");
			}
			else {						
				tooltip.css("margin-top", "-" + (tooltipHeight + 5) + "px");
				tooltip.css("left", ((targetWidth / 2) - (tooltipWidth / 2)) + "px");				
			}
		}
		catch (ex) { }		
	};

	var windowEventHandler = function() {
		
		if (tooltipAutoPos) {
						
			var tooltips = $(".tooltip");
			
			$(tooltips).each(function() {
				
				var tooltip = $(this).children("*[class^='tooltip-']:first");
				
				tooltip.css("margin-left", "");
				tooltip.css("margin-top", "");
				tooltip.css("left", "");
				tooltip.css("top", "");	
				
				if (tooltip.hasClass("shadow-left")) {					
					flipTooltip(tooltip, ui.LEFT);
				}
				else if (tooltip.hasClass("shadow-top")) {					
					flipTooltip(tooltip, ui.TOP);
				}		
				else if (tooltip.hasClass("shadow-right")) {					
					flipTooltip(tooltip, ui.RIGHT);
				}		
				else if (tooltip.hasClass("shadow-bottom")) {					
					flipTooltip(tooltip, ui.BOTTOM);
				}
											
				ui.showTooltip($(this), null, true);	
			});	
		}		
	};
	
	if (typeof window !== void 0 && typeof window.addEventListener !== void 0) {

		$(window).resize(function() {
			windowEventHandler();
		}); 
	
		setTimeout(function() {
			$(window).scroll(function() {
				windowEventHandler();
			}); 
		}, 100);
	}


	/* PUBLIC */
	
    ui.toggleControl = function(toggleItem, toggleState) {
		try {
			var toggleItem = $(toggleItem);
			
			if (arguments.length > 0 && toggleItem != null && toggleItem.length > 0) {
				if (arguments.length === 1) {
					if (toggleItem.css("display") === "block") {
						toggleItem.css("display", "none");
					} else {
						toggleItem.css("display", "block");
					}
				}
				else if (arguments.length === 2 && toggleState === "on") {
					if (toggleItem.css("display") === "none") {
						toggleItem.css("display", "block");
					}
				}
				else {
					if (toggleItem.css("display") === "block") {
						toggleItem.css("display", "none");
					}					
				}
			}			
	    }
	    catch (ex) { }
    };
	
	ui.toggleVisibleControl = function (visibleSelector, hiddenSelectors) {
	    try {
	        if (arguments.length === 2) {			
				for (var i = 0; i < hiddenSelectors.length; i++) {
					$("#" + hiddenSelectors[i]).hide();
				}
				$("#" + visibleSelector).show();
	        }
	    }
	    catch (ex) { }
	};

	ui.toggleHiddenControl = function (hiddenSelector, visibleSelectors) {
	    try {
	        if (arguments.length === 2) {
				$("#" + hiddenSelector).hide();
				for (var i = 0; i < visibleSelectors.length; i++) {
					$("#" + visibleSelectors[i]).show();
				}
	        }
	    }
	    catch (ex) { }
	};
	
	ui.toggleControlStyles = function (selectors, cssClasses) {
	    try {
	        if (arguments.length === 2 && (selectors.length <= cssClasses.length)) {
				for (var i = 0; i < selectors.length; i++) {
					$("#" + selectors[i]).removeClass();
					$("#" + selectors[i]).addClass(cssClasses[i]);
				}
	        }
	    }
	    catch (ex) { }
	};
	
	ui.setControlState = function(selector, currentCssClass, newCssClass, revertOnClick, placeholder, resetData) {
		try {
			if (arguments.length > 2) {
				switchClasses(selector, currentCssClass, newCssClass);
			}
			if (arguments.length > 3 && revertOnClick) {
				$("#" + selector).click(function () {
					if (($("#" + selector).val().length === 0 && (isTextbox(selector) || isPassword(selector) || isTextarea(selector))) || 
						isCheckbox(selector) || isSelect(selector) || isDiv(selector) || isSpan(selector))
					{
						switchClasses(selector, newCssClass, currentCssClass);
						if (placeholder) {
							$("#" + selector).attr("placeholder", "");
						}
					}
				});
			}
			if (arguments.length > 4 && placeholder) { 
				$("#" + selector).attr("placeholder", placeholder);
			}		
			if (arguments.length === 6 && resetData) {				
				ui.resetControl(selector, resetData);
			}
		}
		catch (ex) { }
	};
		
	ui.resetControl = function(selector, resetData) {
		try {
			if (arguments.length > 0) {
				$("#" + selector).removeAttr("disabled");
				$("#" + selector).removeAttr("readonly");
			}		
			if (arguments.length === 2 && resetData) {
				if (isTextbox(selector) || isPassword(selector) || isSelect(selector)) {
					$("#" + selector).val("");
				}
				else if (isCheckbox(selector)) {
					$("#" + selector).attr("checked", false);
				}
				else {				
					$("#" + selector).text("");
				}
			}
		}
		catch (ex) { }
	};
		
	ui.clearControl = function (selector) {
	    try {
			if (isTextbox(selector) || isPassword(selector) || isTextarea(selector)) {
				$("#" + selector).val("");
			}
			else if (isCheckbox(selector)) {
				$("#" + selector).attr("checked", false);
			}
			else if (isSelect(selector)) {
				$("#" + selector + " option").remove();
			}
			else {				
				$("#" + selector).text("");
			}
	    }
	    catch (ex) { }
	};
	
	ui.initialiseSelect = function (selector, itemCount, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
	    try {
	        if (arguments.length === 1) {
	            var totalOptions =
					$("#" + selector + " option").length;

				if (totalOptions < 2) {
					ui.disableControl(selector);
				}
				else {
					ui.setSelectedOption(selector, 0);
					ui.enableControl(selector);
				}
	        }
	        else if (arguments.length === 2) {
				if (itemCount > 0) {
					ui.setSelectedOption(selector, 0);
					ui.enableControl(selector);
				}
				else {
					ui.disableControl(selector);
				}
	        }
			else if (arguments.length === 4) {
				if (itemCount > 0) {
					ui.setSelectedOption(selector, 0);
					ui.enableControl(selector, enabledCssClass, disabledCssClass);
				}
				else {
					ui.disableControl(selector, disabledCssClass, enabledCssClass);
				}
			}
			else if (arguments.length === 6) {
				if (itemCount > 0) {
					ui.setSelectedOption(selector, 0);
					ui.enableControl(selector, enabledCssClass, disabledCssClass, enabledValue);
				}
				else {
					ui.disableControl(selector, disabledCssClass, enabledCssClass, disabledValue);				
				}
			}
	    }
	    catch (ex) { }
	};
	
	ui.clearSelectOptions = function (selector, selectedOnly) {
	    try {
	        if (arguments.length === 1) {
	            $("#" + selector + " option:not(:first)").remove();
	        }
			else if (arguments.length === 2) {
				if (selectedOnly) {
					$("#" + selector + " option:selected").remove();
				}
				else {
					$("#" + selector + " option:not(:first)").remove();
				}
			}
	    }
	    catch (ex) { }
	};
		
	ui.addSelectOption = function (selector, optionValue, optionText) {
		try {
			$("#" + selector).append(new Option(optionText, optionValue));
		}
		catch (ex) { }
	};
		
	ui.setSelectedOption = function (selector, optionIndex) {
	    try {
	        if (arguments.length === 2) {
	            $("#" + selector + " option")[optionIndex].selected = true;
	        }
	    }
	    catch (ex) { }
	};
		
	ui.setSelectOptionText = function (selector, optionIndex, optionText) {
		try {
			$("#" + selector + " option").eq(optionIndex).html(optionText);
		}
		catch (ex) { }
	};
		
	ui.moveSelectOptions = function (fromSelector, toSelector, moveAll) {
	    try {
	        if (arguments.length === 2) {
	            $("#" + fromSelector + " option:selected").remove().appendTo("#" + toSelector).removeAttr("selected");
	        }
	        else if (arguments.length === 3) {
	            if (moveAll) {
	                $("#" + fromSelector + " option").remove().appendTo("#" + toSelector).removeAttr("selected");
	            }
	            else {
	                $("#" + fromSelector + " option:selected").remove().appendTo("#" + toSelector).removeAttr("selected");
	            }
	        }
	    }
	    catch (ex) { }
	};
	
	ui.getSelectOptionValues = function (selector, selectedOnly) {
	    try {
	        var options = null;

	        if (arguments.length === 1) {
	            options = $("#" + selector + " option");
	        }
	        else if (arguments.length === 2) {
	            if (selectedOnly) {
	                options = $("#" + selector + " option:selected");
	            }
	            else {
	                options = $("#" + selector + " option");
	            }
	        }

	        var values = $.map(options, function (option) {
	            return option.value;
	        });

	        return values;
	    }
	    catch (ex) {
	        return "";
	    }
	};
		
	ui.getSelectOptionTexts = function (selector, selectedOnly) {
	    try {
	        var options = null;

	        if (arguments.length === 1) {
	            options = $("#" + selector + " option");
	        }
	        else if (arguments.length === 2) {
	            if (selectedOnly) {
	                options = $("#" + selector + " option:selected");
	            }
	            else {
	                options = $("#" + selector + " option");
	            }
	        }

	        var texts = $.map(options, function (option) {
	            return option.text;
	        });

	        return texts;
	    }
	    catch (ex) {
	        return "";
	    }
	};

	ui.getSelectedMarkup = function (targetSelector, focusTargetSelector, includeHtml) {
		try {
			if (typeof window.getSelection != void 0) {
				
				var selection = window.getSelection();
				
				if (selection.rangeCount) {
					
					var container = document.createElement("div");
					container.appendChild(selection.getRangeAt(0).cloneContents());
					
					var markup = container.innerText;

					if (arguments.length > 0)
					{			
						if (arguments.length > 1 && focusTargetSelector) {
							$("#" + targetSelector).focus();
						}
						
						if (arguments.length === 3) {
							if (includeHtml) {
								markup = container.innerHTML;
							}
							else {
								markup = container.innerText;
							}						
						}

						$("#" + targetSelector).val(markup);
					}
				}
			} 
			return markup;		
		}
		catch (ex) { return ex.message; }
	};

	ui.disableControl = function (selector, disabledCssClass, enabledCssClass, withValue) {
	    try {
	        if (arguments.length > 0) {
	            $("#" + selector).attr("disabled", "disabled");
	            $("#" + selector).attr("readonly", "readonly");
	        }
	        if (arguments.length > 2) {
				switchClasses(selector, enabledCssClass, disabledCssClass);
	        }
	        if (arguments.length === 4) {
				if (isTextbox(selector) || isButton(selector)) {
					$("#" + selector).val(withValue);
				}
				else if (isSelect(selector)) {
					ui.setSelectOptionText(selector, 0, withValue);
				}
				else {	
					if (!isCheckbox(selector)) {
						$("#" + selector).text(withValue);
					}
				}
	        }
	    }
	    catch (ex) { }
	};

	ui.enableControl = function (selector, enabledCssClass, disabledCssClass, withValue) {
	    try {
	        if (arguments.length > 0) {
	            $("#" + selector).removeAttr("disabled");
	            $("#" + selector).removeAttr("readonly");
	        }
	        if (arguments.length > 2) {
				switchClasses(selector, disabledCssClass, enabledCssClass);
	        }
	        if (arguments.length === 4) {
				if (isTextbox(selector) || isButton(selector)) {
					$("#" + selector).val(withValue);
				}
				else if (isSelect(selector)) {
					ui.setSelectOptionText(selector, 0, withValue);
				}
				else {		
					if (!isCheckbox(selector)) {
						$("#" + selector).text(withValue);
					}
				}
	        }
	    }
	    catch (ex) { }
	};

	ui.disableControlsConditionally = function (dependsOnSelector, dependsOnValues, selectors, disabledCssClass, enabledCssClass, disabledValue, enabledValue) {
	    try {
	        if (arguments.length > 4) {

	            var found = false;

	            for (var i = 0; i < dependsOnValues.length; i++) {

	                var dependsOnValue = dependsOnValues[i];

	                if (dependsOnSelectorValueMatches(dependsOnSelector, dependsOnValue)) {

	                    found = true;

	                    for (var j = 0; j < selectors.length; j++) {

	                        if (arguments.length > 5 && disabledValue !== null) {

	                            ui.resetControl(selectors[j], true);
	                            ui.disableControl(selectors[j], disabledCssClass, enabledCssClass, disabledValue);
	                        }
	                        else {
	                            ui.disableControl(selectors[j], disabledCssClass, enabledCssClass);
	                        }
	                    }
	                    return;
	                }
	            }

	            if (!found) {

	                for (var i = 0; i < selectors.length; i++) {

	                    if (arguments.length > 6 && enabledValue !== null) {
	                        ui.resetControl(selectors[i], true);
	                        ui.enableControl(selectors[i], enabledCssClass, disabledCssClass, enabledValue);
	                    }
	                    else {
	                        ui.enableControl(selectors[i], enabledCssClass, disabledCssClass);
	                    }
	                }
	            }
	        }
	    }
	    catch (ex) { }
	};

	ui.enableControlsConditionally = function (dependsOnSelector, dependsOnValues, selectors, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
	    try {
	        if (arguments.length > 4) {

	            var found = false;

	            for (var i = 0; i < dependsOnValues.length; i++) {

	                var dependsOnValue = dependsOnValues[i];

	                if (dependsOnSelectorValueMatches(dependsOnSelector, dependsOnValue)) {

	                    found = true;

	                    for (var j = 0; j < selectors.length; j++) {

	                        if (arguments.length > 5 && enabledValue !== null) {
	                            ui.resetControl(selectors[j], true);
	                            ui.enableControl(selectors[j], enabledCssClass, disabledCssClass, enabledValue);
	                        }
	                        else {
	                            ui.enableControl(selectors[j], enabledCssClass, disabledCssClass);
	                        }
	                    }
	                    return;
	                }
	            }

	            if (!found) {

	                for (var i = 0; i < selectors.length; i++) {

	                    if (arguments.length > 6 && disabledValue !== null) {
	                        ui.resetControl(selectors[i], true);
	                        ui.disableControl(selectors[i], disabledCssClass, enabledCssClass, disabledValue);
	                    }
	                    else {
	                        ui.disableControl(selectors[i], disabledCssClass, enabledCssClass);
	                    }
	                }
	            }
	        }
	    }
	    catch (ex) { }
	};

	ui.showControlsConditionally = function (dependsOnSelector, dependsOnValues, selectors, infoSelector, infoSelectorValue) {
	    try {
	        if (arguments.length > 2) {

	            var found = false;

	            for (var i = 0; i < dependsOnValues.length; i++) {

	                var dependsOnValue = dependsOnValues[i];

	                if (dependsOnSelectorValueMatches(dependsOnSelector, dependsOnValue)) {

	                    found = true;

	                    for (var j = 0; j < selectors.length; j++) {
	                        $("#" + selectors[j]).show();
	                    }

						if (arguments.length > 4) {
							if (isTextbox(infoSelector) || isButton(infoSelector)) {
								$("#" + infoSelector).val(infoSelectorValue);
							}
							else if (isSelect(infoSelector)) {
								$("#" + infoSelector + " option:contains(" + infoSelectorValue + ")").attr("selected", true);
							}
							else {		
								$("#" + infoSelector).text(infoSelectorValue);
							}
						}
	                    return;
	                }
	            }

	            if (!found) {

	                for (var i = 0; i < selectors.length; i++) {
	                    $("#" + selectors[i]).hide();
	                }
					
					if (arguments.length > 4) {
						if (isTextbox(infoSelector) || isButton(infoSelector)) {
							$("#" + infoSelector).val("");
						}
						else if (isSelect(infoSelector)) {
							$("#" + infoSelector + " option:contains(" + infoSelectorValue + ")").attr("selected", false);
						}
						else {		
							$("#" + infoSelector).text("");
						}
					}
	            }
	        }
	    }
	    catch (ex) { }
	};

	ui.hideControlsConditionally = function (dependsOnSelector, dependsOnValues, selectors, infoSelector, infoSelectorValue) {
	    try {
	        if (arguments.length > 2) {

	            var found = false;

	            for (var i = 0; i < dependsOnValues.length; i++) {

	                var dependsOnValue = dependsOnValues[i];

	                if (dependsOnSelectorValueMatches(dependsOnSelector, dependsOnValue)) {

	                    found = true;

	                    for (var j = 0; j < selectors.length; j++) {
	                        $("#" + selectors[j]).hide();
	                    }
						
						if (arguments.length > 4) {
							if (isTextbox(infoSelector) || isButton(infoSelector)) {
								$("#" + infoSelector).val(infoSelectorValue);
							}
							else if (isSelect(infoSelector)) {
								$("#" + infoSelector + " option:contains(" + infoSelectorValue + ")").attr("selected", true);
							}
							else {		
								$("#" + infoSelector).text(infoSelectorValue);
							}
						}
	                    return;
	                }
	            }

	            if (!found) {

	                for (var i = 0; i < selectors.length; i++) {
	                    $("#" + selectors[i]).show();
	                }
					
					if (arguments.length > 4) {
						if (isTextbox(infoSelector) || isButton(infoSelector)) {
							$("#" + infoSelector).val("");
						}
						else if (isSelect(infoSelector)) {
							$("#" + infoSelector + " option:contains(" + infoSelectorValue + ")").attr("selected", false);
						}
						else {		
							$("#" + infoSelector).text("");
						}
					}
	            }
	        }
	    }
	    catch (ex) { }
	};
	
	ui.getColorShade = function(hexColor, rgbValue) {
	  
		try {
			if (arguments.length === 2) {
				
				if ((hexColor.length === 6 || hexColor.length === 7) && !isNaN(rgbValue)) {
					var hasHash = false;
				  
					if (hexColor[0] == "#") {
						hexColor = hexColor.slice(1);
						hasHash = true;
					}
				 
					var num = parseInt(hexColor, 16);
				 
					var r = (num >> 16) + rgbValue;
				 
					if (r > 255) {
						r = 255;
					}
					else if  (r < 0) {
						r = 0;
					}
				 
					var g = (num & 0x0000FF) + rgbValue;
				 
					if (g > 255) {
						g = 255;
					}
					else if (g < 0) {
						g = 0;
					}

					var b = ((num >> 8) & 0x00FF) + rgbValue;
				 
					if (b > 255) {
						b = 255;
					}
					else if  (b < 0) {
						b = 0;
					}
				 
					return (hasHash?"#":"") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
				}
			}
			return "#FFFFFF";
	    }
	    catch (ex) { 
			return "#FFFFFF";
		}			  
	};
	
	ui.getElementViewportStatus = function(element, requiredMargin) {
		try {
			if (arguments.length > 0) {
								
				var win = $(window);
				var margin = 0;
				var el = element.get(0);
				
				if (arguments.length > 1 && requiredMargin != null && !isNaN(requiredMargin)) {
					margin = requiredMargin;
				}	
				
				var viewport = {
					left : 0,
					top : 0		
				};				
				viewport.right = win.innerWidth();
				viewport.bottom = win.innerHeight();

				var pos = el.getBoundingClientRect();
				
				var bounds = {
					left : pos.left - element.outerWidth() - margin,
					top : pos.top - element.outerHeight() - margin,
					right : pos.right + element.outerWidth() + margin,
					bottom : pos.bottom + element.outerHeight() + margin
				};
				
				return {
					result : (!(viewport.left > bounds.left || viewport.top > bounds.top || viewport.right < bounds.right || viewport.bottom < bounds.bottom)),
					leftExceeded : bounds.left < viewport.left,
					topExceeded : bounds.top < viewport.top,
					rightExceeded : bounds.right > viewport.right,
					bottomExceeded : bounds.bottom > viewport.bottom
				};
			}
			return false;
			
        } catch (ex) {
            return false;
        }
	};
	
    ui.isWindowInBreakPointRange = function(breakPointRange) {
        try {
			var mediaWidth = window.innerWidth;
			var min = 0;
			var max = 0;
			
			if (breakPointRange != null && breakPointRange.length === 2) {
				
				switch (breakPointRange[0]) {
					case "xs": min = 480; break;
					case "sm": min = 768; break;
					case "md": min = 992; break;
					case "lg": min = 1200; break;
					case "xl": min = 1366; break;
					default: min = 0; break;
				}
				switch (breakPointRange[1]) {
					case "xs": max = 479; break;
					case "sm": max = 767; break;
					case "md": max = 991; break;
					case "lg": max = 1199; break;
					case "xl": max = 1365; break;
					default: max = 0; break;
				}				
			}			
			if ((mediaWidth > min && mediaWidth <= max) || (mediaWidth > min && max == 0)) {				
				return true;
			}			
			return false;
			
        } catch (ex) {
            return false;
        }
    };
		
	ui.setMediaHeight = function (selector, height, minOrMax, breakPointRange) {
		try {
			if (arguments.length > 1) {
											
				if (arguments.length === 2) {
					$("#" + selector).css("height", height);
					return;
				}
				if (arguments.length === 3 || (arguments.length === 4 && ui.isWindowInBreakPointRange(breakPointRange))) {
					
					if (minOrMax == null || minOrMax == "") {
						$("#" + selector).css("height", height);
					}
					else if (minOrMax.toLowerCase() == "min") {
						$("#" + selector).css("min-height", height);
					}
					else if (minOrMax.toLowerCase() == "max") {
						$("#" + selector).css("max-height", height);
					}
					return;
				}
				else if (arguments.length === 4 && (breakPointRange != null && breakPointRange.length === 2)) {
					if (ui.isWindowInBreakPointRange(["", breakPointRange[0]])) {
						$("#" + selector).css("height", "auto");
						$("#" + selector).css("min-height", "1px");	
					}					
				}				
			}
	    }
	    catch (ex) { }
	};
		
    $(".toggle-activator").click(function(e) {
        ui.toggleControl($(".toggle-item"));
    });

	ui.initMenus = function( options ) {
		menuDropdownFadeInDuration = options.dropdownFadeInDuration !== void 0 ? options.dropdownFadeInDuration : menuDropdownFadeInDuration;
		menuDropdownFadeOutDuration = options.dropdownFadeOutDuration !== void 0 ? options.dropdownFadeOutDuration : menuDropdownFadeOutDuration;		
	};
	
	ui.toggleMenuItem = function(menuActivator) {
		try {
			var dropdownContent = $(menuActivator).nextAll(".dropdown-sheet:first");
			if (dropdownContent.length === 0) {
				dropdownContent = $(menuActivator).nextAll(".dropdown-content:first");
				if (dropdownContent.length === 0) {
					dropdownContent = $(menuActivator).nextAll(".dropdown-content-expand:first");
				}
			}
			
			if (dropdownContent.length > 0) {
				if (dropdownContent.css("display") === "block") {
					dropdownContent.hide(menuDropdownFadeOutDuration);
				}
				else {
					dropdownContent.show(menuDropdownFadeInDuration);
											
					if (dropdownContent.hasClass("menu-inclusive") === false) {
						dropdownContent.prevAll(".dropdown-sheet").hide(menuDropdownFadeOutDuration);
						dropdownContent.nextAll(".dropdown-sheet").hide(menuDropdownFadeOutDuration);
						dropdownContent.prevAll(".dropdown-content").hide(menuDropdownFadeOutDuration);
						dropdownContent.nextAll(".dropdown-content").hide(menuDropdownFadeOutDuration);
						dropdownContent.prevAll(".dropdown-content-expand").hide(menuDropdownFadeOutDuration);
						dropdownContent.nextAll(".dropdown-content-expand").hide(menuDropdownFadeOutDuration);				
					}					
					
					$(".menu-activator:not(:focus)").siblings(".dropdown-sheet:not(.menu-inclusive)").hide(menuDropdownFadeOutDuration);
					$(".menu-activator:not(:focus)").siblings(".dropdown-content:not(.menu-inclusive)").hide(menuDropdownFadeOutDuration);
				}
			}
					
			$(dropdownContent).filter(".menu-close").find(".menu-button:not(.menu-activator)").click(function () {
				menuActivator.parents().children(".menu-activator:last").next().hide(menuDropdownFadeOutDuration);
			});
			$(dropdownContent).filter(".menu-close").find(".menu-button-sm:not(.menu-activator)").click(function () {
				menuActivator.parents().children(".menu-activator:last").next().hide(menuDropdownFadeOutDuration);
			});
			$(dropdownContent).filter(".menu-close").find("a:not(.menu-activator)").click(function () {
				menuActivator.parents().children(".menu-activator:last").next().hide(menuDropdownFadeOutDuration);
			});
	    }
	    catch (ex) { }
	};
	
	$(".menu-activator").click(function(e) {		
		ui.toggleMenuItem($(this));	
	});
	
	$(".menu-activator-dynamic").hover(	
		function() {
			$(this).siblings(".dropdown-sheet").show(menuDropdownFadeInDuration);
			$(this).siblings(".dropdown-content").show(menuDropdownFadeInDuration);			
		}, 
		function() {
			$(this).siblings(".dropdown-sheet").css("display", "none");
			$(this).siblings(".dropdown-content").css("display", "none");			
		}
	);
	
	$(".menu-activator-dynamic ~ .dropdown-sheet").hover(
	
		function() {
					
			$(this).css("display", "block");
			
			if ($(this).hasClass("menu-close")) {
				
				$(this).find(".menu-button:not(.menu-activator-dynamic)").click(function () {
					$(this).parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
				});
				$(this).find(".menu-button-sm:not(.menu-activator-dynamic)").click(function () {
					$(this).parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
				});
				$(this).find("a:not(.menu-activator-dynamic)").click(function () {
					$(this).parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
				});
			}					
		}, 
		function() {		
			$(this).hide(menuDropdownFadeOutDuration);		
		}
	);

	$(".menu-activator-dynamic ~ .dropdown-content").hover(
	
		function() {
					
			$(this).css("display", "block");
			
			if ($(this).hasClass("menu-close")) {
				
				$(this).find(".menu-button:not(.menu-activator-dynamic)").click(function () {
					$(this).parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
				});
				$(this).find(".menu-button-sm:not(.menu-activator-dynamic)").click(function () {
					$(this).parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
				});
				$(this).find("a:not(.menu-activator-dynamic)").click(function () {
					$(this).parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
				});
			}					
		}, 
		function() {			
			$(this).hide(menuDropdownFadeOutDuration);			
		}
	);
	
				
	ui.initNotifications = function( options ) {	
		notificationDynamic = options.dynamic !== void 0 ? options.dynamic : notificationDynamic;
		notificationPosition = options.position !== void 0 ? options.position : notificationPosition;
		notificationShowIcon = options.showIcon !== void 0 ? options.showIcon : notificationShowIcon;
		notificationDuration = options.duration !== void 0 ? options.duration : notificationDuration;
		notificationFadeInDuration = options.fadeInDuration !== void 0 ? options.fadeInDuration : notificationFadeInDuration;
		notificationFadeOutDuration = options.fadeOutDuration !== void 0 ? options.fadeOutDuration : notificationFadeOutDuration;		
	};
	
	ui.showNotification = function(message, type, dynamic, showIcon) {
		try {
			if (arguments.length > 1) {
				var notificationContainer = (!$(".notification-container").length) ? 
												$("<div></div>").addClass("notification-container").addClass("notification-" + notificationPosition).appendTo("body") : 
												$(".notification-container");
											
				var notificationItemOuter = $("<div></div>");
				
				var notificationItemInner = $("<div></div>").hide()
												.addClass("panel notification-item notification-type-" + type)
												.appendTo(notificationContainer)
												.animate({opacity: "show"}, notificationFadeInDuration)
												.wrap(notificationItemOuter);
												
				var notificationItemHeader = $("<div></div>").addClass("content-row").appendTo(notificationItemInner);
				var notificationItemHeaderColumn = $("<div></div>").addClass("content-col-20").appendTo(notificationItemHeader);
				var notificationItemClose = $("<div></div>").addClass("notification-icon-cancel move-right").appendTo(notificationItemHeaderColumn)
												.html("").click(function() { 
													ui.hideNotification(notificationItemInner, false); 
												});

				var notificationItemBody = $("<div></div>").addClass("content-row").appendTo(notificationItemInner);

				var notificationItemBodyIconColumn = null;
				var notificationItemBodySpacerColumn = null;
				var notificationItemBodyMessageColumn = null;
				
				if (showIcon != null) {
					if (showIcon) {
						notificationItemBodyIconColumn = $("<div></div>").addClass("content-col-4").appendTo(notificationItemBody).addClass("notification-icon-" + type);
						notificationItemBodySpacerColumn = $("<div>&nbsp;</div>").addClass("content-col-1").appendTo(notificationItemBody);
						notificationItemBodyMessageColumn = $("<div></div>").addClass("content-col-15").appendTo(notificationItemBody).html(message);
					}
					else {
						notificationItemBodySpacerColumn = $("<div>&nbsp;</div>").addClass("content-col-2").appendTo(notificationItemBody);
						notificationItemBodyMessageColumn = $("<div></div>").addClass("content-col-18").appendTo(notificationItemBody).html(message);					
					}
				}
				else {
					if (notificationShowIcon) {
						notificationItemBodyIconColumn = $("<div></div>").addClass("content-col-4").appendTo(notificationItemBody).addClass("notification-icon-" + type);
						notificationItemBodySpacerColumn = $("<div>&nbsp;</div>").addClass("content-col-1").appendTo(notificationItemBody);
						notificationItemBodyMessageColumn = $("<div></div>").addClass("content-col-15").appendTo(notificationItemBody).html(message);						
					}
					else {
						notificationItemBodySpacerColumn = $("<div>&nbsp;</div>").addClass("content-col-2").appendTo(notificationItemBody);
						notificationItemBodyMessageColumn = $("<div></div>").addClass("content-col-18").appendTo(notificationItemBody).html(message);
					}
				}
				
				var notificationItemSpacer = $("<div></div>").addClass("row-spacing-xs").appendTo(notificationItemInner);
								
				if (dynamic != null) {
					if (dynamic) {
						setTimeout(function()
						{
							ui.hideNotification(notificationItemInner, true);
						},
						notificationDuration);
					}
				}
				else {
					if (notificationDynamic) {
						setTimeout(function()
						{
							ui.hideNotification(notificationItemInner, true);
						},
						notificationDuration);						
					}
				}
			}
	    }
	    catch (ex) { }
	};

	ui.hideNotification = function(notification, dynamic) {
		try {
			notification.animate({opacity: "0"}, dynamic ? notificationDuration : notificationFadeOutDuration, function()
			{
				notification.parent().animate({height: "0px"}, notificationFadeOutDuration, function()
				{
					notification.parent().remove();
				});
			});
	    }
	    catch (ex) { }
	};
	
	ui.showSuccessNotification = function (message, dynamic, showIcon) {
		var msgType = "success";
		switch (arguments.length) {
			case 1: ui.showNotification(message, msgType, null, null); break;
			case 2: ui.showNotification(message, msgType, dynamic, null); break;
			case 3: ui.showNotification(message, msgType, dynamic, showIcon); break;
			default: break;
		}
	};

	ui.showInfoNotification = function (message, dynamic, showIcon) {
		var msgType = "info";
		switch (arguments.length) {
			case 1: ui.showNotification(message, msgType, null, null); break;
			case 2: ui.showNotification(message, msgType, dynamic, null); break;
			case 3: ui.showNotification(message, msgType, dynamic, showIcon); break;
			default: break;
		}
	};
	
	ui.showWarningNotification = function (message, dynamic, showIcon) {
		var msgType = "warning";
		switch (arguments.length) {
			case 1: ui.showNotification(message, msgType, null, null); break;
			case 2: ui.showNotification(message, msgType, dynamic, null); break;
			case 3: ui.showNotification(message, msgType, dynamic, showIcon); break;
			default: break;
		}
	};
	
	ui.showDangerNotification = function (message, dynamic, showIcon) {
		var msgType = "danger";
		switch (arguments.length) {
			case 1: ui.showNotification(message, msgType, null, null); break;
			case 2: ui.showNotification(message, msgType, dynamic, null); break;
			case 3: ui.showNotification(message, msgType, dynamic, showIcon); break;
			default: break;
		}
	};
		
	ui.initTooltips = function( options ) {
		tooltipFadeInDuration = options.fadeInDuration !== void 0 ? options.fadeInDuration : tooltipFadeInDuration;
		tooltipFadeOutDuration = options.fadeOutDuration !== void 0 ? options.fadeOutDuration : tooltipFadeOutDuration;
		tooltipAutoPos = options.autoPositioning !== void 0 ? options.autoPositioning : tooltipAutoPos;
		tooltipAutoPosMargin = options.autoPositioningMargin !== void 0 ? options.autoPositioningMargin : tooltipAutoPosMargin;
		tooltipAutoSize = options.autoResizing !== void 0 ? options.autoResizing : tooltipAutoSize;
	};
		
	
	ui.showTooltip = function (tooltipObject, message, resetOnly) {	
			
		var tooltip = $(tooltipObject).children("*[class^='tooltip-']:first");
								
		if (tooltip.length > 0) {
			
			var tooltipWidth = tooltip.hasClass("tooltip-sm") ? 125 : 
								tooltip.hasClass("tooltip-md") ? 175 : 
								tooltip.hasClass("tooltip-lg") ? 225 : 0;
				
			
			if (tooltip.hasClass("tooltip-left")) {
				
				if (tooltipAutoSize) {
					if (ui.isWindowInBreakPointRange(["", "sm"])) {			
						tooltipWidth = 125;						
					}
				}
				
				if (tooltipAutoPos) {
					if (tooltip.css("display") == "block") {
						
						if ((ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) ||
							(ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) ||
							(ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded && 
								ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded)) {
														
							flipTooltip(tooltip, ui.TOP, ui.SHADOW_LEFT);				
						}
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {
							if (ui.isWindowInBreakPointRange(["", "sm"])) {
								flipTooltip(tooltip, ui.TOP, ui.SHADOW_LEFT);
							}
							else {
								flipTooltip(tooltip, ui.RIGHT, ui.SHADOW_LEFT);
							}							
						}
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {				
							flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_LEFT);					
						}
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {					
							flipTooltip(tooltip, ui.TOP, ui.SHADOW_LEFT);					
						}
						else {
							if (ui.isWindowInBreakPointRange(["", "sm"])) {
								flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_LEFT);
							}
							else {
								flipTooltip(tooltip, ui.LEFT, ui.SHADOW_LEFT);
							}
						}
					}				
				}
			}
			else if (tooltip.hasClass("tooltip-top")) {
				
				if (tooltipAutoSize) {
					if (ui.isWindowInBreakPointRange(["", "sm"])) {			
						tooltipWidth = 125;					
					}
				}
				
				if (tooltipAutoPos) {
					if (tooltip.css("display") == "block") {
						
						if ((ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) ||
							(ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) ||
							(ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded && 
								ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded)) {
														
							flipTooltip(tooltip, ui.TOP, ui.SHADOW_TOP);				
						}
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {															
							flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_TOP);
						}
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {
							if (ui.isWindowInBreakPointRange(["", "sm"])) {
								flipTooltip(tooltip, ui.TOP, ui.SHADOW_TOP);
							}
							else {
								flipTooltip(tooltip, ui.RIGHT, ui.SHADOW_TOP);
							}
						}			
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
							if (ui.isWindowInBreakPointRange(["", "sm"])) {	
								flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_TOP);
							}
							else {
								flipTooltip(tooltip, ui.LEFT, ui.SHADOW_TOP);
							}
						}
						else {
							flipTooltip(tooltip, ui.TOP, ui.SHADOW_TOP);
						}
					}					
				}
			}
			else if (tooltip.hasClass("tooltip-right")) {
				
				if (tooltipAutoSize) {
					if (ui.isWindowInBreakPointRange(["", "sm"])) {			
						tooltipWidth = 125;						
					}
				}
				
				if (tooltipAutoPos) {
					if (tooltip.css("display") == "block") {
												
						if ((ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) ||
							(ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) ||
							(ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded && 
								ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded)) {
							
							flipTooltip(tooltip, ui.TOP, ui.SHADOW_RIGHT);				
						}	
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
							if (ui.isWindowInBreakPointRange(["", "sm"])) {
								flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_RIGHT);
							}
							else {
								flipTooltip(tooltip, ui.LEFT, ui.SHADOW_RIGHT);
							}							
						}
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {							
							flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_RIGHT);				
						}			
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {						
							flipTooltip(tooltip, ui.TOP, ui.SHADOW_RIGHT);					
						}
						else {
							if (ui.isWindowInBreakPointRange(["", "sm"])) {
								flipTooltip(tooltip, ui.TOP, ui.SHADOW_RIGHT);
							}
							else {
								flipTooltip(tooltip, ui.RIGHT, ui.SHADOW_RIGHT);
							}
						}
					}
				}					
			}
			else if (tooltip.hasClass("tooltip-bottom")) {
				
				if (tooltipAutoSize) {
					if (ui.isWindowInBreakPointRange(["", "sm"])) {					
						tooltipWidth = 125;					
					}
				}
				
				if (tooltipAutoPos) {
					if (tooltip.css("display") == "block") {
						
						if ((ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) ||
							(ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) ||
							(ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded && 
								ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded && ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded)) {
														
							flipTooltip(tooltip, ui.TOP, ui.SHADOW_BOTTOM);				
						}				
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {															
							flipTooltip(tooltip, ui.TOP, ui.SHADOW_BOTTOM);
						}
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {											
							if (ui.isWindowInBreakPointRange(["", "sm"])) {
								flipTooltip(tooltip, ui.TOP, ui.SHADOW_BOTTOM);
							}
							else {
								flipTooltip(tooltip, ui.RIGHT, ui.SHADOW_BOTTOM);
							}							
						}			
						else if (ui.getElementViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
							if (ui.isWindowInBreakPointRange(["", "sm"])) {	
								flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_BOTTOM);
							}
							else {
								flipTooltip(tooltip, ui.LEFT, ui.SHADOW_BOTTOM);
							}							
						}
						else {
							flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_BOTTOM);
						}						
					}					
				}
			}


			if (tooltipWidth > 0) {
				
				tooltip.css("width", tooltipWidth + "px");
				
				if (arguments.length > 1 && message != null && message.length > 0) {
					tooltip.html(message);
				}
				
				var target = $(tooltipObject).children(":not(.tooltip-dynamic):not(.tooltip-focus):not(.tooltip-static):first");
				
				if (target.length > 0) {
					
					var targetLeft = target.position().left;
					var targetTop = target.position().top;
					var targetWidth = target.outerWidth();
					var targetHeight = target.outerHeight();
					
					var tooltipHeight = tooltip.outerHeight();
					
					positionTooltip(tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight);
										
					if (arguments.length < 3 || (arguments.length > 2 && !resetOnly)) {
						
						if (tooltip.hasClass("tooltip-animate")) {
							tooltip.show(tooltipFadeInDuration);
						}
						else {
							tooltip.show();
						}							
					}		
				}
			}
		}
	};
	
	ui.hideTooltip = function (tooltipObject) {
		
		var tooltip = $(tooltipObject).children("*[class^='tooltip-']:first");
			
		if (tooltip.length > 0) {

			if (tooltip.hasClass("tooltip-animate")) {
				tooltip.hide(tooltipFadeOutDuration);
			}
			else {
				tooltip.hide();
			}
		}
	};	
		
	$(".tooltip").hover(
	
		function() {
			var tooltip = $(this).children(".tooltip-dynamic:first");
			
			if (tooltip.length > 0) {
				ui.showTooltip(this);
			}			
		}, 
		function() {
			var tooltip = $(this).children(".tooltip-dynamic:first");
			
			if (tooltip.length > 0) {
				ui.hideTooltip(this);
			}
		}
	);
	
	$(".tooltip").focusin(function() {		
		var tooltip = $(this).children(".tooltip-focus:first");
		
		if (tooltip.length > 0) {
			ui.showTooltip(this);
		}			
	});

	$(".tooltip").focusout(function() {		
		var tooltip = $(this).children(".tooltip-focus:first");
		
		if (tooltip.length > 0) {
			ui.hideTooltip(this);
		}
	});

	
	/* ENUMERATIONS */
	
	ui.LEFT = 0;
	ui.TOP = 1;
	ui.RIGHT = 2;
	ui.BOTTOM = 3;
	
	ui.SHADOW_LEFT = 0;
	ui.SHADOW_TOP = 1;
	ui.SHADOW_RIGHT = 2;
	ui.SHADOW_BOTTOM = 3;
	
	
	ui.version = "webui-4.3.0";

}( window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery ));
