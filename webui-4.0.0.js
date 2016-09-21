/*!
* Name: webui - UI logic, formatting, validation, and utilities
* Version: 4.0.0
* Author: Levi Keogh, 2016-08-02
*/

(function( webui, ui, $, undefined ) {

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
	
	var switchClasses = function(selector, currentCssClass, newCssClass) {
		$("#" + selector).removeClass(currentCssClass); 
		$("#" + selector).addClass(newCssClass); 
		if (isSelect(selector)) {
			$("#" + selector + " option").css("color", $("#" + selector).css("color"));
		}
	};
		
	var dependsOnSelectorValueMatches = function(dependsOnSelector, dependsOnValue) {
		return (isTextbox(dependsOnSelector) && dependsOnValue === $("#" + dependsOnSelector).val()) ||
				(isTextarea(dependsOnSelector) && dependsOnValue === $("#" + dependsOnSelector).text()) ||
				(isSelect(dependsOnSelector) && dependsOnValue === $("#" + dependsOnSelector + " option:selected").text()) ||
				(isCheckbox(dependsOnSelector) && dependsOnValue === $("#" + dependsOnSelector).is(':checked'));
	};
	
	var dependsOnRegExpMatches = function(dependsOnSelector, dependsOnRegExp) {
		return (isTextbox(dependsOnSelector) && dependsOnRegExp.test($("#" + dependsOnSelector).val())) ||
				(isTextarea(dependsOnSelector) && dependsOnRegExp.test($("#" + dependsOnSelector).text())) ||
				(isSelect(dependsOnSelector) && dependsOnRegExp.test($("#" + dependsOnSelector + " option:selected").text())) ||
				(isCheckbox(dependsOnSelector) && dependsOnRegExp.test($("#" + dependsOnSelector).is(':checked')));		
	};
	
	var containsSpaceOrDot = function(selector) {
		return /^\s$/.test($("#" + selector).val()) || 
				$("#" + selector).val().indexOf('.') > -1;
	};
	
	var containsSpace = function(selector) {
		return /^\s$/.test($("#" + selector).val());
	};
	
	var toDateObject = function (year, month, day, hour, minute, second) {
	    try {
	        var date = new Date(year, month, day, hour, minute, second);

	        if (date.getDate() == day && date.getMonth() == month && date.getFullYear() == year &&
                date.getHours() == hour && date.getMinutes() == minute && date.getSeconds() == second) {            
	            return date;
	        }
	        return null;
	    }
	    catch (ex) { return null; }
	};
	
	var notificationDynamic = false;
	var notificationPosition = "top-right";
	var notificationDuration = 5000;
	var notificationFadeInDuration = 600;
	var notificationFadeOutDuration = 300;
		
	var showNotification = function(message, dynamic, type) {
		try {
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
			var notificationItemBodyIconColumn = $("<div></div>").addClass("content-col-4").appendTo(notificationItemBody).addClass("notification-icon-" + type);
			var notificationItemBodySpacerColumn = $("<div>&nbsp;</div>").addClass("content-col-1").appendTo(notificationItemBody);
			var notificationItemBodyMessageColumn = $("<div></div>").addClass("content-col-15").appendTo(notificationItemBody).html(message);
			
			var notificationItemSpacer = $("<div></div>").addClass("row-spacing-xs").appendTo(notificationItemInner);
							
			if (dynamic)
			{
				setTimeout(function()
				{
					ui.hideNotification(notificationItemInner, dynamic);
				},
				notificationFadeOutDuration);
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
			if (typeof window.getSelection != "undefined") {
				
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

	                for (i = 0; i < selectors.length; i++) {

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

	                for (i = 0; i < selectors.length; i++) {

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

	                for (i = 0; i < selectors.length; i++) {
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
							console.log(j);
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

	                for (i = 0; i < selectors.length; i++) {
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
	
	ui.isWindowInBreakPointRange = function(maxBreakPoint) {
		try {
			var maxBreakPoints = [479, 767, 991, 1199, 1365];
			var windowWidth = $(window).width();
			var min, max;
			for (var i = 0; i < maxBreakPoints.length; i++) {
				if (maxBreakPoints[i] === maxBreakPoint) {
					if (i === 0) {
						min = 0;
					}
					else {
						min = maxBreakPoints[i];
					}
					max = maxBreakPoints[i];
					break;
				}
			}
			return windowWidth > min && windowWidth <= max;
		}
	    catch (ex) { 
			return false;
		}	
	};
		
	ui.initNotifications = function( options ) {
		notificationDynamic = options.dynamic;
		notificationPosition = options.position;
		notificationDuration = options.duration;
		notificationFadeInDuration = options.fadeInDuration;
		notificationFadeOutDuration = options.fadeOutDuration;		
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
	
	ui.showSuccessNotification = function (message, dynamic) {
		if (arguments.length > 1) {
			notificationDynamic = dynamic;
		}
		showNotification(message, notificationDynamic, "success");
	};

	ui.showInfoNotification = function (message, dynamic) {
		if (arguments.length > 1) {
			notificationDynamic = dynamic;
		}
		showNotification(message, notificationDynamic, "info");
	};
	
	ui.showWarningNotification = function (message, dynamic) {
		if (arguments.length > 1) {
			notificationDynamic = dynamic;
		}
		showNotification(message, notificationDynamic, "warning");
	};
	
	ui.showDangerNotification = function (message, dynamic) {
		if (arguments.length > 1) {
			notificationDynamic = dynamic;
		}
		showNotification(message, notificationDynamic, "danger");
	};
	
	ui.showTooltip = function (selector, message) {
		try {
			if (arguments.length > 0) {
				if (arguments.length === 2) {
					$("#" + selector).html(message);
				}
				$("#" + selector).show();
			}
	    }
	    catch (ex) { }
	};
	
	ui.showTooltips = function (selectors, messages) {
		try {
			if (arguments.length > 0) {
				for (var i = 0; i < selectors.length; i++) {
					if (arguments.length === 2) {
						$("#" + selectors[i]).html(messages[i]);
					}
					$("#" + selectors[i]).show();
				}
			}
	    }
	    catch (ex) { }
	};
	
	ui.hideTooltip = function (selector) {
		try {
			if (arguments.length > 0) {
				$("#" + selector).hide();
			}
	    }
	    catch (ex) { }
	};
	
	ui.hideTooltips = function (selectors) {
		try {
			if (arguments.length > 0) {
				for (var i = 0; i < selectors.length; i++) {
					$("#" + selectors[i]).hide();
				}
			}
	    }
	    catch (ex) { }
	};
		
	ui.toggleVisibleControl = function (visibleSelector, hiddenSelectors) {
	    try {
	        if (arguments.length === 2) {
				$("#" + visibleSelector).show();
				for (i = 0; i < hiddenSelectors.length; i++) {
					$("#" + hiddenSelectors[i]).hide();
				}
	        }
	    }
	    catch (ex) { }
	};

	ui.toggleHiddenControl = function (hiddenSelector, visibleSelectors) {
	    try {
	        if (arguments.length === 2) {
				$("#" + hiddenSelector).hide();
				for (i = 0; i < visibleSelectors.length; i++) {
					$("#" + visibleSelectors[i]).show();
				}
	        }
	    }
	    catch (ex) { }
	};
	
	ui.toggleControlStyles = function (selectors, cssClasses) {
	    try {
	        if (arguments.length === 2 && (selectors.length <= cssClasses.length)) {
				for (i = 0; i < selectors.length; i++) {
					$("#" + selectors[i]).removeClass();
					$("#" + selectors[i]).addClass(cssClasses[i]);
				}
	        }
	    }
	    catch (ex) { }
	};

	ui.isCheckedValue = function (selector, dependsOnSelector, dependsOnRegExp) {
	    try {
	        if (arguments.length === 1) {
	            return $("#" + selector).is(':checked');
	        }
	        else if (arguments.length === 3) {

	            if (dependsOnRegExpMatches(dependsOnSelector, dependsOnRegExp)) {

	                return $("#" + selector).is(':checked');
	            }
	        }
	        return false;
	    }
	    catch (ex) {
	        return false;
	    }
	};

	ui.isConformingString = function (selector, selectorRegExp, allowEmpty, dependsOnSelector, dependsOnRegExp) {
	    try {
	        if (arguments.length === 3) {

	            if (!allowEmpty && $("#" + selector).val().length < 1) {
	                return false;
	            }
	            else if ($("#" + selector).val().length > 0) {

	                if (!selectorRegExp.test($("#" + selector).val())) {
	                    return false;
	                }
	            }
	            return true;
	        }
	        else if (arguments.length === 5) {

	            if (!allowEmpty && $("#" + selector).val().length < 1) {
	                return false;
	            }
	            else if ($("#" + selector).val().length > 0) {

					if (dependsOnRegExpMatches(dependsOnSelector, dependsOnRegExp)) {

						if (!selectorRegExp.test($("#" + selector).val())) {
							return false;
						}
						return true;
					}
					return false;
				}
				return true;
	        }
	        return false;
	    }
	    catch (ex) {
	        return false;
	    }
	};

	ui.isNumericInRange = function (selector, lowerLimit, upperLimit, allowEmpty, dependsOnSelector, dependsOnRegExp) {
	    try {
						
	        if (arguments.length === 4) {

	            if (!allowEmpty && $("#" + selector).val().length < 1) {
	                return false;
	            }
	            else if ($("#" + selector).val().length > 0) {

					if (isNaN($("#" + selector).val()) || isNaN(lowerLimit) || isNaN(upperLimit)) {
						return false;
					}
					else {
						if (containsSpace(selector) || $("#" + selector).val() < lowerLimit || $("#" + selector).val() > upperLimit) {
							return false;
						}
					}
				}
	            return true;
	        }
	        else if (arguments.length === 6) {

	            if (!allowEmpty && $("#" + selector).val().length < 1) {
	                return false;
	            }
	            else if ($("#" + selector).val().length > 0) {

					if (dependsOnRegExpMatches(dependsOnSelector, dependsOnRegExp)) {

						if (isNaN($("#" + selector).val()) || isNaN(lowerLimit) || isNaN(upperLimit)) {
							return false;
						}
						else {
							if (containsSpace(selector) || $("#" + selector).val() < lowerLimit || $("#" + selector).val() > upperLimit) {
								return false;
							}
						}
						return true;
					}
					return false;
				}
				return true;
	        }
	        return false;
	    }
	    catch (ex) {
	        return false;
	    }
	};

	ui.isIntegerInRange = function (selector, lowerLimit, upperLimit, allowEmpty, dependsOnSelector, dependsOnRegExp) {
	    try {
			
	        if (arguments.length === 4) {

	            if (!allowEmpty && $("#" + selector).val().length < 1) {
	                return false;
	            }
	            else if ($("#" + selector).val().length > 0) {

					if (isNaN($("#" + selector).val()) || isNaN(lowerLimit) || isNaN(upperLimit)) {
						return false;
					}
					else {
						if (containsSpaceOrDot(selector) || $("#" + selector).val() < lowerLimit || $("#" + selector).val() > upperLimit) {
							return false;
						}
					}
				}
	            return true;
	        }
	        else if (arguments.length === 6) {

	            if (!allowEmpty && $("#" + selector).val().length < 1) {
	                return false;
	            }
	            else if ($("#" + selector).val().length > 0) {

					if (dependsOnRegExpMatches(dependsOnSelector, dependsOnRegExp)) {

						if (isNaN($("#" + selector).val()) || isNaN(lowerLimit) || isNaN(upperLimit)) {
							return false;
						}
						else {
							if (containsSpaceOrDot(selector) || $("#" + selector).val() < lowerLimit || $("#" + selector).val() > upperLimit) {
								return false;
							}
						}
						return true;
					}
					return false;
				}
				return true;
	        }
	        return false;
	    }
	    catch (ex) {
	        return false;
	    }
	};
		
	ui.isValidDateTime = function (selector, format, allowEmpty) {	
		try {
			if (arguments.length > 1) {
				
				var strDate = $("#" + selector).val();
				
				if (allowEmpty && strDate.length < 1) {
					return true;
				}
				if (ui.convertToDate(strDate, format) != null)
				{
				    return true;
				}				
			}
			return false;
		}
	    catch (ex) {
	        return false;
	    }
	};
	
	ui.isPastDateTime = function (selector, format, allowEmpty) {
		try {			
			if (arguments.length > 1) {
				
				var strDate = $("#" + selector).val();
				
				if (allowEmpty && strDate.length < 1) {
					return true;
				}
				
				var sysDate = new Date();
				
				if (ui.isValidDateTime(selector, format, allowEmpty)) {
				    return ui.getTimeOffsetFromNow(strDate, format) < 0;
				}
			}		
			return false;
		}
		catch (ex) { 
			return false; 
		}    
	};

	ui.isPresentDateTime = function (selector, format, allowEmpty) {
	    try {
	        if (arguments.length > 1) {
				
				var strDate = $("#" + selector).val();

	            if (allowEmpty && strDate.length < 1) {
	                return true;
	            }
				
				var sysDate = new Date();
				
	            if (ui.isValidDateTime(selector, format, allowEmpty)) {
	                return ui.getTimeOffsetFromNow(strDate, format) === 0;
	            }
	        }
	        return false;
	    }
	    catch (ex) {
	        return false;
	    }		
	};

	ui.isFutureDateTime = function (selector, format, allowEmpty) {
		try {	
			if (arguments.length > 1) {
				
				var strDate = $("#" + selector).val();
				
				if (allowEmpty && strDate.length < 1) {
					return true;
				}
				
				var sysDate = new Date();
				
				if (ui.isValidDateTime(selector, format, allowEmpty)) {
				    return ui.getTimeOffsetFromNow(strDate, format) > 0;
				}
            }
			return false;
		}
		catch (ex) {
			return false; 
		}	    
	};

	ui.isDateTimeInRange = function (selector, minDateTimeString, maxDateTimeString, format, allowEmpty) {
	    try {
	        if (arguments.length > 3) {

				var strDate = $("#" + selector).val();
				
	            if (allowEmpty && strDate.length < 1) {
	                return true;
	            }

	            if (ui.isValidDateTime(selector, format, allowEmpty)) {

	                var date = ui.convertToDate(strDate, format);
	                var minDate = ui.convertToDate(minDateTimeString, format);
	                var maxDate = ui.convertToDate(maxDateTimeString, format);
	                
	                if (minDate != null && maxDate != null) {
	                    return date.valueOf() >= minDate.valueOf() && date.valueOf() <= maxDate.valueOf();
	                }
	            }
	        }
	        return false;
	    }
	    catch (ex) {
	        return false;
	    }
	};
	
	ui.convertToDate = function (dateTimeString, format) {
	    try {
	        if (arguments.length > 1) {

	            var parts;
	            var dateTokens;
	            var timeTokens;

	            switch (format)
	            {
	                case "DD/MM/YYYY":
	                    dateTokens = dateTimeString.split("/");
	                    if (dateTokens.length === 3) {
	                        return toDateObject(dateTokens[2], (dateTokens[1] - 1), dateTokens[0], 0, 0, 0);
	                    }
	                    break;
	                case "DD/MM/YYYY hh:mm":
	                case "DD/MM/YYYY HH:mm":
	                    parts = dateTimeString.split(" ");
	                    if (parts.length === 2) {
	                        dateTokens = parts[0].split("/");
	                        timeTokens = parts[1].split(":");
	                        if (dateTokens.length === 3 && timeTokens.length === 2) {
	                            return toDateObject(dateTokens[2], (dateTokens[1] - 1), dateTokens[0], timeTokens[0], timeTokens[1], 0);
	                        }
	                    }
	                    break;
	                case "DD/MM/YYYY hh:mm:ss":
	                case "DD/MM/YYYY HH:mm:ss":
	                    parts = dateTimeString.split(" ");
	                    if (parts.length === 2) {
	                        dateTokens = parts[0].split("/");
	                        timeTokens = parts[1].split(":");
	                        if (dateTokens.length === 3 && timeTokens.length === 3) {
	                            return toDateObject(dateTokens[2], (dateTokens[1] - 1), dateTokens[0], timeTokens[0], timeTokens[1], timeTokens[2]);
	                        }
	                    }
	                    break;
	                case "DD-MM-YYYY":
	                    dateTokens = dateTimeString.split("-");
	                    if (dateTokens.length === 3) {
	                        return toDateObject(dateTokens[2], (dateTokens[1] - 1), dateTokens[0], 0, 0, 0);
	                    }
	                    break;
	                case "DD-MM-YYYY hh:mm":
	                case "DD-MM-YYYY HH:mm":
	                    parts = dateTimeString.split(" ");
	                    if (parts.length === 2) {
	                        dateTokens = parts[0].split("-");
	                        timeTokens = parts[1].split(":");
	                        if (dateTokens.length === 3 && timeTokens.length === 2) {
	                            return toDateObject(dateTokens[2], (dateTokens[1] - 1), dateTokens[0], timeTokens[0], timeTokens[1], 0);
	                        }
	                    }
	                    break;
	                case "DD-MM-YYYY hh:mm:ss":
	                case "DD-MM-YYYY HH:mm:ss":
	                    parts = dateTimeString.split(" ");
	                    if (parts.length === 2) {
	                        dateTokens = parts[0].split("-");
	                        timeTokens = parts[1].split(":");
	                        if (dateTokens.length === 3 && timeTokens.length === 3) {
	                            return toDateObject(dateTokens[2], (dateTokens[1] - 1), dateTokens[0], timeTokens[0], timeTokens[1], timeTokens[2]);
	                        }
	                    }
	                    break;
	                case "MM/DD/YYYY":
	                    dateTokens = dateTimeString.split("/");
	                    if (dateTokens.length === 3) {
	                        return toDateObject(dateTokens[2], (dateTokens[0] - 1), dateTokens[1], 0, 0, 0);
	                    }
	                    break;
	                case "MM/DD/YYYY hh:mm":
	                case "MM/DD/YYYY HH:mm":
	                    parts = dateTimeString.split(" ");
	                    if (parts.length === 2) {
	                        dateTokens = parts[0].split("/");
	                        timeTokens = parts[1].split(":");
	                        if (dateTokens.length === 3 && timeTokens.length === 2) {
	                            return toDateObject(dateTokens[2], (dateTokens[0] - 1), dateTokens[1], timeTokens[0], timeTokens[1], 0);
	                        }
	                    }
	                    break;
	                case "MM/DD/YYYY hh:mm:ss":
	                case "MM/DD/YYYY HH:mm:ss":
	                    parts = dateTimeString.split(" ");
	                    if (parts.length === 2) {
	                        dateTokens = parts[0].split("/");
	                        timeTokens = parts[1].split(":");
	                        if (dateTokens.length === 3 && timeTokens.length === 3) {
	                            return toDateObject(dateTokens[2], (dateTokens[0] - 1), dateTokens[1], timeTokens[0], timeTokens[1], timeTokens[2]);
	                        }
	                    }
	                    break;
	                case "MM-DD-YYYY":
	                    dateTokens = dateTimeString.split("-");
	                    if (dateTokens.length === 3) {
	                        return toDateObject(dateTokens[2], (dateTokens[0] - 1), dateTokens[1], 0, 0, 0);
	                    }
	                    break;
	                case "MM-DD-YYYY hh:mm:ss":
	                case "MM-DD-YYYY HH:mm:ss":
	                    parts = dateTimeString.split(" ");
	                    if (parts.length === 2) {
	                        dateTokens = parts[0].split("-");
	                        timeTokens = parts[1].split(":");
	                        if (dateTokens.length === 3 && timeTokens.length === 3) {
	                            return toDateObject(dateTokens[2], (dateTokens[0] - 1), dateTokens[1], timeTokens[0], timeTokens[1], timeTokens[2]);
	                        }
	                    }
	                    break;
	                case "MM-DD-YYYY hh:mm":
	                case "MM-DD-YYYY HH:mm":
	                    parts = dateTimeString.split(" ");
	                    if (parts.length === 2) {
	                        dateTokens = parts[0].split("-");
	                        timeTokens = parts[1].split(":");
	                        if (dateTokens.length === 3 && timeTokens.length === 2) {
	                            return toDateObject(dateTokens[2], (dateTokens[0] - 1), dateTokens[1], timeTokens[0], timeTokens[1], 0);
	                        }
	                    }
	                    break;
	                case "hh:mm":
	                case "HH:mm":
	                    timeTokens = dateTimeString.split(":");
	                    if (timeTokens.length === 2) {
	                        return toDateObject(1900, 0, 1, timeTokens[0], timeTokens[1], 0);
	                    }
	                    break;
	                case "hh:mm:ss":
	                case "HH:mm:ss":
	                    timeTokens = dateTimeString.split(":");
	                    if (timeTokens.length === 3) {
	                        return toDateObject(1900, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
	                    }
	                    break;
	            }
	        }
	        return null;
	    }
	    catch (ex) {
	        return null;
	    }
	};

	ui.getTimeOffsetFromNow = function (dateTimeString, format) {
	    try {
	        if (arguments.length > 1) {

				var sysDate = new Date();
	            var date = ui.convertToDate(dateTimeString, format);

	            if (date != null) {
	                
	                if (format.toLowerCase() === "hh:mm:ss" || format.toLowerCase() === "hh:mm") {
	                    date.setDate(sysDate.getDate());
	                    date.setMonth(sysDate.getMonth());
	                    date.setFullYear(sysDate.getFullYear());
	                    if (format.toLowerCase() === "hh:mm") {
	                        date.setSeconds(sysDate.getSeconds());
	                    }
	                    sysDate.setMilliseconds(0);
	                }
	                else if (format.toLowerCase() === "dd/mm/yyyy hh:mm:ss" || format.toLowerCase() === "dd/mm/yyyy hh:mm" ||
                        format.toLowerCase() === "dd-mm-yyyy hh:mm:ss" || format.toLowerCase() === "dd-mm-yyyy hh:mm" ||
                        format.toLowerCase() === "mm/dd/yyyy hh:mm:ss" || format.toLowerCase() === "mm/dd/yyyy hh:mm" ||
                        format.toLowerCase() === "mm-dd-yyyy hh:mm:ss" || format.toLowerCase() === "mm-dd-yyyy hh:mm") {

	                    if (format.toLowerCase() === "dd/mm/yyyy hh:mm" || format.toLowerCase() === "dd-mm-yyyy hh:mm" ||
                            format.toLowerCase() === "mm/dd/yyyy hh:mm" || format.toLowerCase() === "mm-dd-yyyy hh:mm") {
	                        date.setSeconds(sysDate.getSeconds());
	                    }
	                    sysDate.setMilliseconds(0);
	                }
	                else {
	                    sysDate.setHours(0, 0, 0, 0);
	                }
	                return date.getTime() - sysDate.getTime();
	            }
	        }
	        return 0;
	    }
	    catch (ex) {
	        return 0;
	    }
	};
		
	ui.sum = function () {
		try {
			var i, n = arguments.length, total = 0;
			for (i = 0; i < n; i++) {
				total += arguments[i];
			}
			return total;
		}
		catch (ex) { return 0; }
	};

	ui.pad = function (number, length, padRight) {
	    try {
	        var str = '' + number;
	        while (str.length < length) {
				if (arguments.length > 2 && padRight) {
					str = str + '0';
				}
				else {
					str = '0' + str;
				}
	        }
	        return str;
	    }
	    catch (ex) { return ""; }
	};

	ui.truncate = function (text, length) {
	    try {
	        var str = '';
	        for (var i = 0; i < length; i++) {
	            str += text.charAt(i);
	        }
	        return str;
	    }
	    catch (ex) { return text; }
	};
	
	ui.limitWords = function(text, wordCount) {
		try {
			var words = text.split(' ');
			words.splice(wordCount, words.length-1);
			return words.join(' ') + (words.length !== text.split(' ').length ? '&hellip;' : '');
		}
		catch (ex) { return text; }
	};
	
	ui.getQueryString = function (key) {
	    try {
	        var temp = location.search.match(new RegExp(key + "=(.*?)($|\\&)", "i"));
	        if (!temp) {
	            return;
	        }
	        return temp[1];
	    }
	    catch (ex) { return ""; }

	};
	
	ui.getAbsoluteUrl = function () {
		try {
			var a;

			if (!a) a = document.createElement("a");
			a.href = url;

			return a.href;
	    }
	    catch (ex) { return ""; }	
	};
	
	ui.getAbsoluteUri = function (relativeUrl, virtualRoot, addReturnUrl) {
	    try {
	        var cleanUrl = relativeUrl.replace(/\.\.\//g, "").replace(/\./g, "");
	        cleanUrl = cleanUrl.substring(0, 1) === "/" ? cleanUrl.substring(1, cleanUrl.length) : cleanUrl;
	        var cleanRoot = virtualRoot.substring(0, 1) === "/" ? virtualRoot.substring(1, virtualRoot.length) : virtualRoot;
	        var url = window.top.location.protocol + "//" +
                        window.top.location.host + "/" +
                        ((!cleanRoot || cleanRoot === "/") ? "" : (cleanRoot.substring(cleanRoot.length - 1, cleanRoot.length) === "/" ? cleanRoot : cleanRoot + "/")) +
                        (cleanUrl.substring(cleanUrl.length - 1, cleanUrl.length) === "/" ? cleanUrl.substring(0, cleanUrl.length - 1) : cleanUrl);
	        if (addReturnUrl) {
	            url += "?returnUrl=" + encodeURIComponent(window.top.location.href);
	        }
	        return url;
	    }
	    catch (ex) { return ""; }
	};
		
	ui.getCookie = function (name) {
		try {
			var start = document.cookie.indexOf( name + "=" );
			var len = start + name.length + 1;

			if ((!start) && (name != document.cookie.substring(0, name.length))) {
				return null;
			}
			if (start == -1) {
				return null;
			}
			
			var end = document.cookie.indexOf(";", len);

			if (end == -1) {
				end = document.cookie.length;
			}
			return unescape(document.cookie.substring( len, end ));
		}
		catch (ex) { return null; }
	};

	ui.setCookie = function (name, value, expires, path, domain, secure) {
		try {
			var today = new Date();

			today.setTime(today.getTime());

			if (expires) {
				expires = expires * 1000 * 60 * 60 * 24;
			}

			var expiryDate = new Date(today.getTime() + (expires));

			document.cookie = name + "=" + escape(value) +
				((expires) ? ";expires=" + expiryDate.toGMTString() : "") +
				((path) ? ";path=" + path : "") + 
				((domain) ? ";domain=" + domain : "") +
				((secure) ? ";secure" : "");
				
			return true;
		}
		catch (ex) { return false; }
	};

	ui.deleteCookie = function (name, path, domain) {
		try {
			if (ui.getCookie(name)) {
				document.cookie = name + "=" +
				((path) ? ";path=" + path : "") +
				(( domain) ? ";domain=" + domain : "") +
				";expires=Thu, 01-Jan-1970 00:00:01 GMT";
			}	
			return true;
		}
		catch (ex) { return false; }
	};

	
	/* EXTENSIONS */
	
	Array.prototype.inArray = function (value) {
		try {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === value) {
					return true;
				}
			}
			return false;
		}
		catch (ex) { return false; }
	};

	
	ui.BASIC_STRING = /^([a-zA-Z0-9_\s\-\+\~\.\£\@\*\%\(\)\,\:\'\/]{1,2999})$/;
	ui.ITEM_CODE = /^([A-Z0-9]{1,50})$/;
	ui.INTEGER = /^[-+]?\d+$/;
	ui.POSITIVE_INTEGER = /^\d+$/;
	ui.NUMERIC = /^[-+]?\d+(\.\d+)?$/;
	ui.PASSWORD_STRENGTH = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/;
	ui.EMAIL_ADDRESS = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/;
	ui.UK_TELEPHONE = /^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/;
	ui.US_TELEPHONE = /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/;
	ui.UK_POSTCODE = /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i;
	ui.US_ZIPCODE = /^\d{5}(-\d{4})?$/;
	ui.URL = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
	ui.TRUE_VALUE = /^(true)$/;
	ui.FALSE_VALUE = /^(false)$/;
	ui.ANY_VALUE = /^(?!\s*$).+/;
	
	ui.version = "webui-4.0.0";

}( window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery ));
