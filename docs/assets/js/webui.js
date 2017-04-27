/*!
* Name: webui - UI functions
* Version: 5.2.0
* Author: Levi Keogh, 2017-04-26
*/
"use strict";

(function(webui, ui, $, undefined) {
    ui.version = "webui-5.2.0";
    /* PRIVATE */
    var isDiv = function(selector) {
        return $(selector).is("div");
    };
    var isSpan = function(selector) {
        return $(selector).is("span");
    };
    var isTextbox = function(selector) {
        return $(selector).is("input:text");
    };
    var isPassword = function(selector) {
        return $(selector).is("input:password");
    };
    var isCheckbox = function(selector) {
        return $(selector).is("input:checkbox");
    };
    var isButton = function(selector) {
        return $(selector).is("input:button");
    };
    var isTextarea = function(selector) {
        return $(selector).is("textarea");
    };
    var isSelect = function(selector) {
        return $(selector).is("select");
    };
    var isDatalist = function(selector) {
        return $(selector).is("datalist");
    };
    var selectorValueMatches = function(selector, value) {
        var element = $(selector);
        return isTextbox(selector) && element.val() === value || isTextarea(selector) && element.text() === value || isSelect(selector) && $("option:selected", element).text() === value || isCheckbox(selector) && element.is(":checked") === value;
    };
    var switchClasses = function(selector, currentCssClass, newCssClass) {
        var element = $(selector);
        element.removeClass(currentCssClass);
        element.addClass(newCssClass);
        if (isSelect(selector)) {
            $("option", element).css("color", element.css("color"));
        }
    };
    var runToggleAction = function(toggleContainer, selector) {
        if (toggleContainer) {
            var toggleBody = $(".off-canvas-body");
            var toggleItem = toggleContainer.find(selector);
            if (toggleBody && toggleItem) {
                var fadeInDuration = parseInt(toggleContainer.data("fade-in-duration"));
                var fadeOutDuration = parseInt(toggleContainer.data("fade-out-duration"));
                if (toggleItem.hasClass("off-canvas-left")) {
                    toggleBody.css("-webkit-transition", "margin-left " + fadeInDuration / 1e3 + "s linear");
                    toggleBody.css("transition", "margin-left " + fadeInDuration / 1e3 + "s linear");
                } else if (toggleItem.hasClass("off-canvas-right")) {
                    toggleBody.css("-webkit-transition", "margin-left " + fadeInDuration / 1e3 + "s linear");
                    toggleBody.css("transition", "margin-left " + fadeInDuration / 1e3 + "s linear");
                }
                if (toggleItem.css("display") === "block") {
                    toggleItem.trigger("ui.toggleItem.hide.before");
                    toggleItem.hide(fadeOutDuration);
                    toggleBody.css("overflow-x", "");
                    toggleBody.css("margin-left", "");
                    toggleItem.trigger("ui.toggleItem.hide.after");
                } else {
                    toggleItem.trigger("ui.toggleItem.show.before");
                    if (toggleItem.hasClass("off-canvas-left")) {
                        var toggleItemWidth = parseInt(toggleItem.css("width"));
                        toggleBody.css("overflow-x", "hidden");
                        toggleBody.css("margin-left", toggleItemWidth + "px");
                    } else if (toggleItem.hasClass("off-canvas-right")) {
                        var toggleItemWidth = parseInt(toggleItem.css("width"));
                        toggleBody.css("margin-left", "-" + toggleItemWidth + "px");
                        toggleItem.css("mergin-right", toggleItemWidth + "px");
                        toggleItem.css("-webkit-transition", "margin-right " + fadeInDuration / 1e3 + "s linear");
                        toggleItem.css("transition", "margin-right " + fadeInDuration / 1e3 + "s linear");
                    }
                    toggleItem.show(fadeInDuration);
                    if (toggleContainer.hasClass("toggle-inclusive") === false) {
                        toggleItem.siblings(".toggle-item").hide(fadeOutDuration);
                    }
                    toggleItem.trigger("ui.toggleItem.show.after");
                }
            }
        } else {
            var toggleItem = $(selector);
            if (toggleItem) {
                if (toggleItem.css("display") === "block") {
                    toggleItem.trigger("ui.toggleItem.hide.before");
                    toggleItem.hide();
                    toggleItem.trigger("ui.toggleItem.hide.after");
                } else {
                    toggleItem.trigger("ui.toggleItem.show.before");
                    toggleItem.show();
                    toggleItem.trigger("ui.toggleItem.show.after");
                }
            }
        }
    };
    var checkboxes = $(".checkbox label");
    if (checkboxes && checkboxes.length) {
        checkboxes.attr({
            tabindex: "0",
            role: "checkbox"
        });
        checkboxes.keydown(function(e) {
            if (e.which == 13 || e.which == 32) {
                $(this).click();
            }
        });
    }
    var radiobuttons = $(".radio label");
    if (radiobuttons && radiobuttons.length) {
        radiobuttons.attr({
            tabindex: "0",
            role: "radio"
        });
        radiobuttons.keydown(function(e) {
            if (e.which == 13 || e.which == 32) {
                $(this).click();
            }
        });
    }
    /* PUBLIC */
    ui.hidden = function(selector) {
        var element = $(selector);
        if (!element.hasClass("hidden")) {
            element.addClass("hidden");
        }
    };
    ui.visible = function(selector) {
        var element = $(selector);
        if (element.hasClass("hidden")) {
            element.removeClass("hidden");
        }
    };
    ui.toggleControl = function(selector, toggleState) {
        if (arguments.length > 0) {
            var element = $(selector);
            if (element && element.length) {
                if (arguments.length === 1) {
                    if (element.css("display") === "block") {
                        element.css("display", "none");
                        element.attr("aria-hidden", "true");
                    } else {
                        element.css("display", "block");
                        element.attr("aria-hidden", "false");
                    }
                } else if (arguments.length > 1) {
                    if (toggleState === "on") {
                        if (element.css("display") === "none") {
                            element.css("display", "block");
                            element.attr("aria-hidden", "false");
                        }
                    } else {
                        if (element.css("display") === "block") {
                            element.css("display", "none");
                            element.attr("aria-hidden", "true");
                        }
                    }
                }
            }
        }
    };
    ui.toggleVisibleControl = function(visibleSelector, hiddenSelectors) {
        if (arguments.length === 2) {
            for (var i = 0; i < hiddenSelectors.length; i++) {
                ui.toggleControl(hiddenSelectors[i], "off");
            }
            ui.toggleControl(visibleSelector, "on");
        }
    };
    ui.toggleHiddenControl = function(hiddenSelector, visibleSelectors) {
        if (arguments.length === 2) {
            ui.toggleControl(hiddenSelector, "off");
            for (var i = 0; i < visibleSelectors.length; i++) {
                ui.toggleControl(visibleSelectors[i], "on");
            }
        }
    };
    $(".toggle-activator").click(function(e) {
        e.preventDefault();
        var selector = $(this).data("target");
        if (!selector) {
            selector = $(this).attr("href");
        }
        if (selector) {
            var toggleContainer = $(this).closest(".toggle-container");
            runToggleAction(toggleContainer, selector);
        }
    });
    $(".toggle-activator-dynamic").hover(function(e) {
        e.preventDefault();
        var selector = $(this).data("target");
        if (!selector) {
            selector = $(this).attr("href");
        }
        if (selector) {
            var toggleContainer = $(this).closest(".toggle-container");
            runToggleAction(toggleContainer, selector);
        }
    });
    ui.setControlState = function(selector, currentCssClass, newCssClass, revertOnClick, placeholder, resetData) {
        var element = $(selector);
        if (arguments.length > 2) {
            switchClasses(selector, currentCssClass, newCssClass);
        }
        if (arguments.length > 3 && revertOnClick) {
            element.click(function() {
                if (element.val().length === 0 && (isTextbox(selector) || isPassword(selector) || isTextarea(selector)) || isCheckbox(selector) || isSelect(selector) || isDiv(selector) || isSpan(selector)) {
                    switchClasses(selector, newCssClass, currentCssClass);
                    if (placeholder) {
                        element.attr("placeholder", "");
                    }
                }
            });
        }
        if (arguments.length > 4 && placeholder) {
            element.attr("placeholder", placeholder);
        }
        if (arguments.length === 6 && resetData) {
            ui.resetControl(selector, resetData);
        }
    };
    ui.resetControl = function(selector, resetData) {
        var element = $(selector);
        if (arguments.length > 0) {
            element.removeAttr("disabled");
            element.removeAttr("readonly");
        }
        if (arguments.length === 2 && resetData) {
            if (isTextbox(selector) || isPassword(selector) || isSelect(selector)) {
                element.val("");
            } else if (isCheckbox(selector)) {
                element.attr("checked", false);
            } else {
                element.text("");
            }
        }
    };
    ui.clearControl = function(selector) {
        var element = $(selector);
        if (isTextbox(selector) || isPassword(selector) || isTextarea(selector)) {
            element.val("");
        } else if (isCheckbox(selector)) {
            element.attr("checked", false);
        } else if (isSelect(selector)) {
            $("option", element).remove();
        } else {
            element.text("");
        }
    };
    ui.initialiseSelect = function(selector, itemCount, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
        if (arguments.length === 1) {
            var totalOptions = $("option", $(selector)).length;
            if (totalOptions < 2) {
                ui.disableControl(selector);
            } else {
                ui.setSelectedOption(selector, 0);
                ui.enableControl(selector);
            }
        } else if (arguments.length === 2) {
            if (itemCount > 0) {
                ui.setSelectedOption(selector, 0);
                ui.enableControl(selector);
            } else {
                ui.disableControl(selector);
            }
        } else if (arguments.length === 4) {
            if (itemCount > 0) {
                ui.setSelectedOption(selector, 0);
                ui.enableControl(selector, enabledCssClass, disabledCssClass);
            } else {
                ui.disableControl(selector, disabledCssClass, enabledCssClass);
            }
        } else if (arguments.length === 6) {
            if (itemCount > 0) {
                ui.setSelectedOption(selector, 0);
                ui.enableControl(selector, enabledCssClass, disabledCssClass, enabledValue);
            } else {
                ui.disableControl(selector, disabledCssClass, enabledCssClass, disabledValue);
            }
        }
    };
    ui.clearSelectOptions = function(selector, selectedOnly) {
        var element = $(selector);
        if (arguments.length === 1) {
            $("option:not(:first)", element).remove();
        } else if (arguments.length === 2) {
            if (selectedOnly) {
                $("option:selected", element).remove();
            } else {
                $("option:not(:first)", element).remove();
            }
        }
    };
    ui.addSelectOption = function(selector, optionValue, optionText) {
        $(selector).append(new Option(optionText, optionValue));
    };
    ui.setSelectedOption = function(selector, optionIndex) {
        if (arguments.length === 2) {
            $("option", $(selector))[optionIndex].selected = true;
        }
    };
    ui.setSelectOptionText = function(selector, optionIndex, optionText) {
        $("option", $(selector)).eq(optionIndex).html(optionText);
    };
    ui.moveSelectOptions = function(fromSelector, toSelector, moveAll) {
        var fromElement = $(fromSelector);
        var toElement = $(toSelector);
        if (arguments.length === 2) {
            $("option:selected", fromElement).remove().appendTo(toElement).removeAttr("selected");
        } else if (arguments.length === 3) {
            if (moveAll) {
                $("option", fromElement).remove().appendTo(toElement).removeAttr("selected");
            } else {
                $("option:selected", fromElement).remove().appendTo(toElement).removeAttr("selected");
            }
        }
    };
    ui.getSelectOptionValues = function(selector, selectedOnly) {
        var element = $(selector);
        var options = null;
        if (arguments.length === 1) {
            options = $("option", element);
        } else if (arguments.length === 2) {
            if (selectedOnly) {
                options = $("option:selected", element);
            } else {
                options = $("option", element);
            }
        }
        var values = $.map(options, function(option) {
            return option.value;
        });
        return values;
    };
    ui.getSelectOptionTexts = function(selector, selectedOnly) {
        var element = $(selector);
        var options = null;
        if (arguments.length === 1) {
            options = $("option", element);
        } else if (arguments.length === 2) {
            if (selectedOnly) {
                options = $("option:selected", element);
            } else {
                options = $("option", element);
            }
        }
        var texts = $.map(options, function(option) {
            return option.text;
        });
        return texts;
    };
    ui.getSelectedMarkup = function(targetSelector, focusTargetSelector, includeHtml) {
        var element = $(targetSelector);
        if (typeof window.getSelection !== void 0) {
            var selection = window.getSelection();
            if (selection.rangeCount) {
                var container = document.createElement("div");
                container.appendChild(selection.getRangeAt(0).cloneContents());
                var markup = container.innerText;
                if (arguments.length > 0) {
                    if (arguments.length > 1 && focusTargetSelector) {
                        element.focus();
                    }
                    if (arguments.length === 3) {
                        if (includeHtml) {
                            markup = container.innerHTML;
                        } else {
                            markup = container.innerText;
                        }
                    }
                    element.val(markup);
                }
            }
        }
        return "";
    };
    ui.disableControl = function(selector, disabledCssClass, enabledCssClass, withValue) {
        var element = $(selector);
        if (arguments.length > 0) {
            element.attr("disabled", "disabled");
            element.attr("readonly", "readonly");
        }
        if (arguments.length > 2) {
            switchClasses(selector, enabledCssClass, disabledCssClass);
        }
        if (arguments.length === 4) {
            if (isTextbox(selector) || isButton(selector)) {
                element.val(withValue);
            } else if (isSelect(selector)) {
                ui.setSelectOptionText(selector, 0, withValue);
            } else {
                if (!isCheckbox(selector)) {
                    element.text(withValue);
                }
            }
        }
    };
    ui.enableControl = function(selector, enabledCssClass, disabledCssClass, withValue) {
        var element = $(selector);
        if (arguments.length > 0) {
            element.removeAttr("disabled");
            element.removeAttr("readonly");
        }
        if (arguments.length > 2) {
            switchClasses(selector, disabledCssClass, enabledCssClass);
        }
        if (arguments.length === 4) {
            if (isTextbox(selector) || isButton(selector)) {
                element.val(withValue);
            } else if (isSelect(selector)) {
                ui.setSelectOptionText(selector, 0, withValue);
            } else {
                if (!isCheckbox(selector)) {
                    element.text(withValue);
                }
            }
        }
    };
    ui.disableControlsConditionally = function(dependsOnSelector, dependsOnValues, selectors, disabledCssClass, enabledCssClass, disabledValue, enabledValue) {
        if (arguments.length > 4) {
            var found = false;
            for (var i = 0; i < dependsOnValues.length; i++) {
                var dependsOnValue = dependsOnValues[i];
                if (selectorValueMatches(dependsOnSelector, dependsOnValue)) {
                    found = true;
                    for (var j = 0; j < selectors.length; j++) {
                        if (arguments.length > 5 && disabledValue !== null) {
                            ui.resetControl(selectors[j], true);
                            ui.disableControl(selectors[j], disabledCssClass, enabledCssClass, disabledValue);
                        } else {
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
                    } else {
                        ui.enableControl(selectors[i], enabledCssClass, disabledCssClass);
                    }
                }
            }
        }
    };
    ui.enableControlsConditionally = function(dependsOnSelector, dependsOnValues, selectors, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
        if (arguments.length > 4) {
            var found = false;
            for (var i = 0; i < dependsOnValues.length; i++) {
                var dependsOnValue = dependsOnValues[i];
                if (selectorValueMatches(dependsOnSelector, dependsOnValue)) {
                    found = true;
                    for (var j = 0; j < selectors.length; j++) {
                        if (arguments.length > 5 && enabledValue !== null) {
                            ui.resetControl(selectors[j], true);
                            ui.enableControl(selectors[j], enabledCssClass, disabledCssClass, enabledValue);
                        } else {
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
                    } else {
                        ui.disableControl(selectors[i], disabledCssClass, enabledCssClass);
                    }
                }
            }
        }
    };
    ui.showControlsConditionally = function(dependsOnSelector, dependsOnValues, selectors, infoSelector, infoSelectorValue) {
        if (arguments.length > 2) {
            var found = false;
            for (var i = 0; i < dependsOnValues.length; i++) {
                var dependsOnValue = dependsOnValues[i];
                if (selectorValueMatches(dependsOnSelector, dependsOnValue)) {
                    found = true;
                    for (var j = 0; j < selectors.length; j++) {
                        $(selectors[j]).show();
                    }
                    if (arguments.length > 4) {
                        if (isTextbox(infoSelector) || isButton(infoSelector)) {
                            $(infoSelector).val(infoSelectorValue);
                        } else if (isSelect(infoSelector)) {
                            $("option:contains(" + infoSelectorValue + ")", $(infoSelector)).attr("selected", true);
                        } else {
                            $(infoSelector).text(infoSelectorValue);
                        }
                    }
                    return;
                }
            }
            if (!found) {
                for (var i = 0; i < selectors.length; i++) {
                    $(selectors[i]).hide();
                }
                if (arguments.length > 4) {
                    if (isTextbox(infoSelector) || isButton(infoSelector)) {
                        $(infoSelector).val("");
                    } else if (isSelect(infoSelector)) {
                        $("option:contains(" + infoSelectorValue + ")", $(infoSelector)).attr("selected", false);
                    } else {
                        $(infoSelector).text("");
                    }
                }
            }
        }
    };
    ui.hideControlsConditionally = function(dependsOnSelector, dependsOnValues, selectors, infoSelector, infoSelectorValue) {
        if (arguments.length > 2) {
            var found = false;
            for (var i = 0; i < dependsOnValues.length; i++) {
                var dependsOnValue = dependsOnValues[i];
                if (selectorValueMatches(dependsOnSelector, dependsOnValue)) {
                    found = true;
                    for (var j = 0; j < selectors.length; j++) {
                        $(selectors[j]).hide();
                    }
                    if (arguments.length > 4) {
                        if (isTextbox(infoSelector) || isButton(infoSelector)) {
                            $(infoSelector).val(infoSelectorValue);
                        } else if (isSelect(infoSelector)) {
                            $("option:contains(" + infoSelectorValue + ")", $(infoSelector)).attr("selected", true);
                        } else {
                            $(infoSelector).text(infoSelectorValue);
                        }
                    }
                    return;
                }
            }
            if (!found) {
                for (var i = 0; i < selectors.length; i++) {
                    $(selectors[i]).show();
                }
                if (arguments.length > 4) {
                    if (isTextbox(infoSelector) || isButton(infoSelector)) {
                        $(infoSelector).val("");
                    } else if (isSelect(infoSelector)) {
                        $("option:contains(" + infoSelectorValue + ")", $(infoSelector)).attr("selected", false);
                    } else {
                        $(infoSelector).text("");
                    }
                }
            }
        }
    };
    ui.pxToRem = function(pxValue) {
        var element = document.getElementsByTagName("html")[0];
        return parseInt(pxValue) / parseInt(window.getComputedStyle(element)["fontSize"]);
    };
    ui.getScrollbarWidth = function() {
        var ruler = document.createElement("div");
        ruler.className = "scrollbar-measure";
        document.body.appendChild(ruler);
        var scrollbarWidth = ruler.offsetWidth - ruler.clientWidth;
        document.body.removeChild(ruler);
        return scrollbarWidth;
    };
    ui.getAccessibilityContrastColor = function(hexColor) {
        if (hexColor.indexOf("#") === 0) {
            hexColor = hexColor.slice(1);
        }
        if (hexColor.length === 3) {
            hexColor = hexColor[0] + hexColor[0] + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2];
        }
        if (hexColor.length === 6) {
            var r = parseInt(hexColor.slice(0, 2), 16), g = parseInt(hexColor.slice(2, 4), 16), b = parseInt(hexColor.slice(4, 6), 16);
            return r * .299 + g * .587 + b * .114 > 186 ? "#000000" : "#FFFFFF";
        }
        return null;
    };
    ui.getColorShade = function(hexColor, rgbValue) {
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
                } else if (r < 0) {
                    r = 0;
                }
                var g = (num & 255) + rgbValue;
                if (g > 255) {
                    g = 255;
                } else if (g < 0) {
                    g = 0;
                }
                var b = (num >> 8 & 255) + rgbValue;
                if (b > 255) {
                    b = 255;
                } else if (b < 0) {
                    b = 0;
                }
                return (hasHash ? "#" : "") + String("000000" + (g | b << 8 | r << 16).toString(16)).slice(-6);
            }
        }
        return "#FFFFFF";
    };
    ui.getElementViewportStatus = function(element, requiredMargin) {
        if (arguments.length > 0) {
            var win = $(window);
            var margin = 0;
            var el = element.get(0);
            if (arguments.length > 1 && requiredMargin != null && !isNaN(requiredMargin)) {
                margin = requiredMargin;
            }
            var viewport = {
                left: 0,
                top: 0,
                right: win.innerWidth(),
                bottom: win.innerHeight()
            };
            var clientRect = el.getBoundingClientRect();
            var bounds = {
                top: clientRect.top - (clientRect.bottom - clientRect.top) - margin,
                left: clientRect.left - (clientRect.right - clientRect.left) - margin,
                bottom: clientRect.bottom + element.outerHeight() + margin,
                right: clientRect.right + element.outerWidth() + margin
            };
            return {
                result: !(viewport.top > bounds.top || viewport.left > bounds.left || viewport.bottom < bounds.bottom || viewport.right < bounds.right),
                topExceeded: bounds.top < viewport.top,
                leftExceeded: bounds.left < viewport.left,
                bottomExceeded: bounds.bottom > viewport.bottom,
                rightExceeded: bounds.right > viewport.right
            };
        }
        return null;
    };
    ui.isWindowInBreakPointRange = function(breakPointRange) {
        var mediaWidth = window.innerWidth;
        var min = 0;
        var max = 0;
        if (breakPointRange != null && breakPointRange.length === 2) {
            switch (breakPointRange[0]) {
              case "xs":
                min = 480;
                break;

              case "sm":
                min = 768;
                break;

              case "md":
                min = 992;
                break;

              case "lg":
                min = 1200;
                break;

              case "xl":
                min = 1366;
                break;

              default:
                min = 0;
                break;
            }
            switch (breakPointRange[1]) {
              case "xs":
                max = 479;
                break;

              case "sm":
                max = 767;
                break;

              case "md":
                max = 991;
                break;

              case "lg":
                max = 1199;
                break;

              case "xl":
                max = 1365;
                break;

              default:
                max = 0;
                break;
            }
        }
        if (mediaWidth > min && mediaWidth <= max || mediaWidth > min && max == 0) {
            return true;
        }
        return false;
    };
    ui.setMediaWidth = function(selector, width, minOrMax, breakPointRange) {
        var element = $(selector);
        if (arguments.length > 1) {
            if (arguments.length === 2) {
                element.css("width", width);
                return;
            }
            if (arguments.length === 3 || arguments.length === 4 && ui.isWindowInBreakPointRange(breakPointRange)) {
                if (minOrMax == null || minOrMax == "") {
                    element.css("width", width);
                } else if (minOrMax.toLowerCase() == "min") {
                    element.css("min-width", width);
                } else if (minOrMax.toLowerCase() == "max") {
                    element.css("max-width", width);
                }
                return;
            }
        }
    };
    ui.setMediaHeight = function(selector, height, minOrMax, breakPointRange) {
        var element = $(selector);
        if (arguments.length > 1) {
            if (arguments.length === 2) {
                element.css("height", height);
                return;
            }
            if (arguments.length === 3 || arguments.length === 4 && ui.isWindowInBreakPointRange(breakPointRange)) {
                if (minOrMax == null || minOrMax == "") {
                    element.css("height", height);
                } else if (minOrMax.toLowerCase() == "min") {
                    element.css("min-height", height);
                } else if (minOrMax.toLowerCase() == "max") {
                    element.css("max-height", height);
                }
                return;
            } else if (arguments.length === 4 && (breakPointRange != null && breakPointRange.length === 2)) {
                if (ui.isWindowInBreakPointRange([ "", breakPointRange[0] ])) {
                    element.css("height", "auto");
                    element.css("min-height", "1px");
                }
            }
        }
    };
})(window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery);

(function(webui, ui, $, undefined) {
    /* PRIVATE */
    var menuDropdownFadeInDuration = 500;
    var menuDropdownFadeOutDuration = 500;
    var menuDropdownTransitionType = "vertical";
    /* PUBLIC */
    ui.initMenus = function(options) {
        menuDropdownFadeInDuration = options.dropdownFadeInDuration !== void 0 ? options.dropdownFadeInDuration : menuDropdownFadeInDuration;
        menuDropdownFadeOutDuration = options.dropdownFadeOutDuration !== void 0 ? options.dropdownFadeOutDuration : menuDropdownFadeOutDuration;
        menuDropdownTransitionType = options.dropdownTransitionType !== void 0 ? options.dropdownTransitionType : menuDropdownTransitionType;
    };
    ui.toggleMenuItem = function(selector) {
        var menuItem = $(selector);
        var dropdown = menuItem.nextAll(".dropdown-sheet:first");
        if (dropdown.length === 0) {
            dropdown = menuItem.nextAll(".dropdown-content:first");
            if (dropdown.length === 0) {
                dropdown = menuItem.nextAll(".dropdown-content-expand:first");
            }
        }
        if (dropdown) {
            if (dropdown.length) {
                if (dropdown.css("display") === "block") {
                    menuItem.trigger("ui.dropdown.hide.before");
                    switch (menuDropdownTransitionType) {
                      case "vertical":
                        dropdown.animate({
                            height: "hide",
                            opacity: "hide"
                        }, menuDropdownFadeOutDuration);
                        dropdown.animate({
                            height: "hide",
                            opacity: "hide"
                        }, menuDropdownFadeOutDuration);
                        break;

                      case "horizontal":
                        dropdown.animate({
                            width: "hide",
                            opacity: "hide"
                        }, menuDropdownFadeOutDuration);
                        dropdown.animate({
                            width: "hide",
                            opacity: "hide"
                        }, menuDropdownFadeOutDuration);
                        break;

                      default:
                        dropdown.hide(menuDropdownFadeOutDuration);
                        dropdown.hide(menuDropdownFadeOutDuration);
                        break;
                    }
                    menuItem.trigger("ui.dropdown.hide.after");
                } else {
                    menuItem.trigger("ui.dropdown.show.before");
                    switch (menuDropdownTransitionType) {
                      case "vertical":
                        dropdown.animate({
                            height: "show",
                            opacity: "show"
                        }, menuDropdownFadeInDuration);
                        dropdown.animate({
                            height: "show",
                            opacity: "show"
                        }, menuDropdownFadeInDuration);
                        break;

                      case "horizontal":
                        dropdown.animate({
                            width: "show",
                            opacity: "show"
                        }, menuDropdownFadeInDuration);
                        dropdown.animate({
                            width: "show",
                            opacity: "show"
                        }, menuDropdownFadeInDuration);
                        break;

                      default:
                        dropdown.show(menuDropdownFadeInDuration);
                        dropdown.show(menuDropdownFadeInDuration);
                        break;
                    }
                    if (dropdown.hasClass("menu-inclusive") === false) {
                        dropdown.prevAll(".dropdown-sheet").hide(menuDropdownFadeOutDuration);
                        dropdown.nextAll(".dropdown-sheet").hide(menuDropdownFadeOutDuration);
                        dropdown.prevAll(".dropdown-content").hide(menuDropdownFadeOutDuration);
                        dropdown.nextAll(".dropdown-content").hide(menuDropdownFadeOutDuration);
                        dropdown.prevAll(".dropdown-content-expand").hide(menuDropdownFadeOutDuration);
                        dropdown.nextAll(".dropdown-content-expand").hide(menuDropdownFadeOutDuration);
                    }
                    $(".menu-activator:not(:focus)").siblings(".dropdown-sheet:not(.menu-inclusive)").hide(menuDropdownFadeOutDuration);
                    $(".menu-activator:not(:focus)").siblings(".dropdown-content:not(.menu-inclusive)").hide(menuDropdownFadeOutDuration);
                    menuItem.trigger("ui.dropdown.show.after");
                }
            }
            dropdown.filter(".menu-close").find(".menu-button:not(.menu-activator)").click(function() {
                menuItem.parents().children(".menu-activator:last").next().hide(menuDropdownFadeOutDuration);
            });
            dropdown.filter(".menu-close").find(".menu-button-sm:not(.menu-activator)").click(function() {
                menuItem.parents().children(".menu-activator:last").next().hide(menuDropdownFadeOutDuration);
            });
            dropdown.filter(".menu-close").find("a:not(.menu-activator)").click(function() {
                menuItem.parents().children(".menu-activator:last").next().hide(menuDropdownFadeOutDuration);
            });
        }
    };
    $(".menu-activator").click(function(e) {
        ui.toggleMenuItem($(this));
    });
    $(".menu-activator-dynamic").hover(function() {
        var menuItem = $(this);
        if (menuItem) {
            menuItem.trigger("ui.dropdown.show.before");
            switch (menuDropdownTransitionType) {
              case "vertical":
                menuItem.siblings(".dropdown-sheet").animate({
                    height: "show",
                    opacity: "show"
                }, menuDropdownFadeInDuration);
                menuItem.siblings(".dropdown-content").animate({
                    height: "show",
                    opacity: "show"
                }, menuDropdownFadeInDuration);
                break;

              case "horizontal":
                menuItem.siblings(".dropdown-sheet").animate({
                    width: "show",
                    opacity: "show"
                }, menuDropdownFadeInDuration);
                menuItem.siblings(".dropdown-content").animate({
                    width: "show",
                    opacity: "show"
                }, menuDropdownFadeInDuration);
                break;

              default:
                menuItem.siblings(".dropdown-sheet").show(menuDropdownFadeInDuration);
                menuItem.siblings(".dropdown-content").show(menuDropdownFadeInDuration);
                break;
            }
            menuItem.trigger("ui.dropdown.show.after");
        }
    }, function() {
        var menuItem = $(this);
        if (menuItem) {
            menuItem.trigger("ui.dropdown.hide.before");
            menuItem.siblings(".dropdown-sheet").css("display", "none");
            menuItem.siblings(".dropdown-content").css("display", "none");
            menuItem.trigger("ui.dropdown.hide.after");
        }
    });
    $(".menu-activator-dynamic ~ .dropdown-sheet").hover(function() {
        var dropdown = $(this);
        if (dropdown) {
            dropdown.css("display", "block");
            if (dropdown.hasClass("menu-close")) {
                dropdown.find(".menu-button:not(.menu-activator-dynamic)").click(function() {
                    dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
                });
                dropdown.find(".menu-button-sm:not(.menu-activator-dynamic)").click(function() {
                    dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
                });
                dropdown.find("a:not(.menu-activator-dynamic)").click(function() {
                    dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
                });
            }
        }
    }, function() {
        var dropdown = $(this);
        if (dropdown) {
            dropdown.trigger("ui.dropdown.hide.before");
            switch (menuDropdownTransitionType) {
              case "vertical":
                dropdown.animate({
                    height: "hide",
                    opacity: "hide"
                }, menuDropdownFadeOutDuration);
                dropdown.animate({
                    height: "hide",
                    opacity: "hide"
                }, menuDropdownFadeOutDuration);
                break;

              case "horizontal":
                dropdown.animate({
                    width: "hide",
                    opacity: "hide"
                }, menuDropdownFadeOutDuration);
                dropdown.animate({
                    width: "hide",
                    opacity: "hide"
                }, menuDropdownFadeOutDuration);
                break;

              default:
                dropdown.hide(menuDropdownFadeOutDuration);
                dropdown.hide(menuDropdownFadeOutDuration);
                break;
            }
            dropdown.trigger("ui.dropdown.hide.after");
        }
    });
    $(".menu-activator-dynamic ~ .dropdown-content").hover(function() {
        var dropdown = $(this);
        if (dropdown) {
            dropdown.css("display", "block");
            if (dropdown.hasClass("menu-close")) {
                dropdown.find(".menu-button:not(.menu-activator-dynamic)").click(function() {
                    dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
                });
                dropdown.find(".menu-button-sm:not(.menu-activator-dynamic)").click(function() {
                    dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
                });
                dropdown.find("a:not(.menu-activator-dynamic)").click(function() {
                    dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
                });
            }
        }
    }, function() {
        var dropdown = $(this);
        if (dropdown) {
            dropdown.trigger("ui.dropdown.hide.before");
            switch (menuDropdownTransitionType) {
              case "vertical":
                dropdown.animate({
                    height: "hide",
                    opacity: "hide"
                }, menuDropdownFadeOutDuration);
                dropdown.animate({
                    height: "hide",
                    opacity: "hide"
                }, menuDropdownFadeOutDuration);
                break;

              case "horizontal":
                dropdown.animate({
                    width: "hide",
                    opacity: "hide"
                }, menuDropdownFadeOutDuration);
                dropdown.animate({
                    width: "hide",
                    opacity: "hide"
                }, menuDropdownFadeOutDuration);
                break;

              default:
                dropdown.hide(menuDropdownFadeOutDuration);
                dropdown.hide(menuDropdownFadeOutDuration);
                break;
            }
            dropdown.trigger("ui.dropdown.hide.after");
        }
    });
})(window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery);

(function(webui, ui, $, undefined) {
    /* PRIVATE */
    var alertPosition = "top-right";
    var alertDuration = 5e3;
    var alertFadeInDuration = 300;
    var alertFadeOutDuration = 300;
    var alertWidth = "18.750rem";
    var alertShowHeader = true;
    var alertInline = true;
    var alertStyle = "outline-square";
    var alertDynamic = false;
    var alertShowIcon = true;
    var alertShowClose = true;
    /* PUBLIC */
    ui.initAlerts = function(options) {
        alertPosition = options.position !== void 0 ? options.position : alertPosition;
        alertDuration = options.duration !== void 0 ? options.duration : alertDuration;
        alertFadeInDuration = options.fadeInDuration !== void 0 ? options.fadeInDuration : alertFadeInDuration;
        alertFadeOutDuration = options.fadeOutDuration !== void 0 ? options.fadeOutDuration : alertFadeOutDuration;
        alertWidth = options.width != void 0 ? options.width : alertWidth;
        alertShowHeader = options.showHeader != void 0 ? options.showHeader : alertShowHeader;
        alertInline = options.inline != void 0 ? options.inline : alertInline;
        alertStyle = options.style != void 0 ? options.style : alertStyle;
        alertDynamic = options.dynamic !== void 0 ? options.dynamic : alertDynamic;
        alertShowIcon = options.showIcon !== void 0 ? options.showIcon : alertShowIcon;
        alertShowClose = options.showClose !== void 0 ? options.showClose : alertShowClose;
    };
    ui.showAlert = function(message, type, dynamic, showIcon, showClose) {
        if (arguments.length > 1) {
            var alertContainer = !$(".alert-container").length ? $("<div></div>").addClass("alert-container").addClass("alert-" + alertPosition).appendTo("body") : $(".alert-container");
            alertContainer.css("width", alertWidth);
            var alertItemOuter = $("<div></div>");
            var alertItemInner = $("<div role='alert'></div>").hide().addClass("alert alert-" + type).css("padding-left", "0.625rem").css("padding-right", "0.625rem").appendTo(alertContainer).animate({
                opacity: "show"
            }, alertFadeInDuration).wrap(alertItemOuter);
            if (alertStyle === "outline-square" || alertStyle === "outline-rounded") {
                switch (type) {
                  case "success":
                    alertItemInner.addClass("alert-success-outline");
                    break;

                  case "info":
                    alertItemInner.addClass("alert-info-outline");
                    break;

                  case "warning":
                    alertItemInner.addClass("alert-warning-outline");
                    break;

                  case "danger":
                    alertItemInner.addClass("alert-danger-outline");
                    break;

                  default:
                    break;
                }
            }
            if (alertStyle.toLowerCase().indexOf("rounded") >= 0) {
                alertItemInner.addClass("rounded-md");
            }
            if (alertShowHeader && !alertInline) {
                if (showIcon || showClose) {
                    var alertItemHeader = $("<div></div>").addClass("panel").appendTo(alertItemInner);
                    var alertItemHeaderLeft = $("<div></div>").addClass("move-left").appendTo(alertItemHeader);
                    var alertItemHeaderRight = $("<div></div>").addClass("move-right").appendTo(alertItemHeader);
                    if (showIcon) {
                        var alertItemIcon = $("<div></div>").addClass("alert-" + type + "-icon").appendTo(alertItemHeaderLeft);
                    }
                    if (showClose) {
                        var alertItemCancel = $("<div role='button'></div>").addClass("alert-cancel").appendTo(alertItemHeaderRight).click(function() {
                            ui.hideAlert(alertItemInner, false);
                        });
                    }
                }
            }
            var alertItemBody = $("<div></div>").addClass("panel").appendTo(alertItemInner);
            if (alertShowHeader && alertInline) {
                if (showIcon && showClose) {
                    var alertItemIcon = $("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody);
                    var alertItemBodyMessage = $("<div></div>").addClass("container width-adjacent-md pad-xs move-left").appendTo(alertItemBody).html(message);
                    var alertItemCancel = $("<div role='button'></div>").addClass("width-sm move-right alert-cancel").appendTo(alertItemBody).click(function() {
                        ui.hideAlert(alertItemInner, false);
                    });
                } else if (showIcon) {
                    var alertItemIcon = $("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody);
                    var alertItemBodyMessage = $("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-right", "0").appendTo(alertItemBody).html(message);
                } else if (showClose) {
                    var alertItemBodyMessage = $("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-left", "0").appendTo(alertItemBody).html(message);
                    var alertItemCancel = $("<div role='button'></div>").addClass("width-sm move-right alert-cancel").appendTo(alertItemBody).click(function() {
                        ui.hideAlert(alertItemInner, false);
                    });
                } else {
                    var alertItemBodyMessage = $("<div></div>").addClass("pad-xs").appendTo(alertItemBody).css("padding-left", "0").html(message);
                }
            } else {
                var alertItemBodyMessage = $("<div></div>").appendTo(alertItemBody).html(message);
            }
            if (dynamic != null) {
                if (dynamic) {
                    setTimeout(function() {
                        ui.hideAlert(alertItemInner, true);
                    }, alertDuration);
                }
            } else {
                if (alertDynamic) {
                    setTimeout(function() {
                        ui.hideAlert(alertItemInner, true);
                    }, alertDuration);
                }
            }
        }
    };
    ui.hideAlert = function(alert, dynamic) {
        if (alert) {
            alert.animate({
                opacity: "hide"
            }, dynamic ? alertDuration : alertFadeOutDuration, function() {
                alert.parent().animate({
                    height: "0px"
                }, alertFadeOutDuration, function() {
                    alert.parent().remove();
                });
            });
        }
    };
    ui.showSuccessAlert = function(message, dynamic, showIcon, showClose) {
        var msgType = "success";
        switch (arguments.length) {
          case 1:
            ui.showAlert(message, msgType, alertDynamic, alertShowIcon, alertShowClose);
            break;

          case 2:
            ui.showAlert(message, msgType, dynamic, alertShowIcon, alertShowClose);
            break;

          case 3:
            ui.showAlert(message, msgType, dynamic, showIcon, alertShowClose);
            break;

          case 4:
            ui.showAlert(message, msgType, dynamic, showIcon, showClose);
            break;

          default:
            break;
        }
    };
    ui.showInfoAlert = function(message, dynamic, showIcon, showClose) {
        var msgType = "info";
        switch (arguments.length) {
          case 1:
            ui.showAlert(message, msgType, alertDynamic, alertShowIcon, alertShowClose);
            break;

          case 2:
            ui.showAlert(message, msgType, dynamic, alertShowIcon, alertShowClose);
            break;

          case 3:
            ui.showAlert(message, msgType, dynamic, showIcon, alertShowClose);
            break;

          case 4:
            ui.showAlert(message, msgType, dynamic, showIcon, showClose);
            break;

          default:
            break;
        }
    };
    ui.showWarningAlert = function(message, dynamic, showIcon, showClose) {
        var msgType = "warning";
        switch (arguments.length) {
          case 1:
            ui.showAlert(message, msgType, alertDynamic, alertShowIcon, alertShowClose);
            break;

          case 2:
            ui.showAlert(message, msgType, dynamic, alertShowIcon, alertShowClose);
            break;

          case 3:
            ui.showAlert(message, msgType, dynamic, showIcon, alertShowClose);
            break;

          case 4:
            ui.showAlert(message, msgType, dynamic, showIcon, showClose);
            break;

          default:
            break;
        }
    };
    ui.showDangerAlert = function(message, dynamic, showIcon, showClose) {
        var msgType = "danger";
        switch (arguments.length) {
          case 1:
            ui.showAlert(message, msgType, alertDynamic, alertShowIcon, alertShowClose);
            break;

          case 2:
            ui.showAlert(message, msgType, dynamic, alertShowIcon, alertShowClose);
            break;

          case 3:
            ui.showAlert(message, msgType, dynamic, showIcon, alertShowClose);
            break;

          case 4:
            ui.showAlert(message, msgType, dynamic, showIcon, showClose);
            break;

          default:
            break;
        }
    };
})(window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery);

(function(webui, ui, $, undefined) {
    /* PRIVATE */
    var tooltipAutoPos = false;
    var tooltipAutoPosMargin = 0;
    var tooltipAutoSize = true;
    var getTooltipViewportStatus = function(element, requiredMargin) {
        if (arguments.length > 0) {
            var win = $(window);
            var el = element.get(0);
            var margin = 0;
            var pointerSize = 5;
            if (arguments.length > 1 && requiredMargin != null && !isNaN(requiredMargin)) {
                margin = requiredMargin;
            }
            var viewport = {
                left: 0,
                top: 0,
                right: win.innerWidth(),
                bottom: win.innerHeight()
            };
            var clientRect = el.getBoundingClientRect();
            var bounds = {
                top: clientRect.top - (clientRect.bottom - clientRect.top) - pointerSize - margin,
                left: clientRect.left - (clientRect.right - clientRect.left) - pointerSize - margin,
                bottom: clientRect.bottom + element.siblings(":first").outerHeight() + pointerSize + 20 + margin,
                right: clientRect.right + element.siblings(":first").outerWidth() + pointerSize + 20 + margin
            };
            return {
                result: !(viewport.top > bounds.top || viewport.left > bounds.left || viewport.bottom < bounds.bottom || viewport.right < bounds.right),
                topExceeded: bounds.top < viewport.top,
                leftExceeded: bounds.left < viewport.left,
                bottomExceeded: bounds.bottom > viewport.bottom,
                rightExceeded: bounds.right > viewport.right
            };
        }
        return null;
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

                  default:
                    break;
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

                  default:
                    break;
                }
            }
        } catch (ex) {}
    };
    var positionTooltip = function(tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight) {
        try {
            if (tooltip.hasClass("tooltip-left")) {
                tooltip.css("margin-left", "-" + (tooltipWidth + 5) + "px");
                tooltip.css("top", targetHeight / 2 - tooltipHeight / 2 + "px");
            } else if (tooltip.hasClass("tooltip-top")) {
                tooltip.css("margin-top", "-" + (tooltipHeight + 5) + "px");
                tooltip.css("left", targetWidth / 2 - tooltipWidth / 2 + "px");
            } else if (tooltip.hasClass("tooltip-right")) {
                tooltip.css("margin-left", targetWidth + 5 + "px");
                tooltip.css("top", targetHeight / 2 - tooltipHeight / 2 + "px");
            } else if (tooltip.hasClass("tooltip-bottom")) {
                tooltip.css("margin-top", targetHeight + 5 + "px");
                tooltip.css("left", targetWidth / 2 - tooltipWidth / 2 + "px");
            } else {
                tooltip.css("margin-top", "-" + (tooltipHeight + 5) + "px");
                tooltip.css("left", targetWidth / 2 - tooltipWidth / 2 + "px");
            }
        } catch (ex) {}
    };
    var resetTooltips = function() {
        try {
            var tooltips = $(".tooltip");
            tooltips.each(function() {
                var tooltip = $(this).children("*[class*='tooltip-']:first");
                tooltip.css("margin-left", "");
                tooltip.css("margin-top", "");
                tooltip.css("left", "");
                tooltip.css("top", "");
                if (tooltip.hasClass("shadow-left")) {
                    flipTooltip(tooltip, ui.LEFT);
                } else if (tooltip.hasClass("shadow-top")) {
                    flipTooltip(tooltip, ui.TOP);
                } else if (tooltip.hasClass("shadow-right")) {
                    flipTooltip(tooltip, ui.RIGHT);
                } else if (tooltip.hasClass("shadow-bottom")) {
                    flipTooltip(tooltip, ui.BOTTOM);
                }
                ui.showTooltip(this, null, true);
            });
        } catch (ex) {}
    };
    if (typeof window !== void 0 && typeof window.addEventListener !== void 0) {
        $(window).resize(function() {
            resetTooltips();
        });
        setTimeout(function() {
            $(window).scroll(function() {
                resetTooltips();
            });
        }, 100);
    }
    /* PUBLIC */
    ui.initTooltips = function(options) {
        tooltipAutoPos = options.autoPositioning !== void 0 ? options.autoPositioning : tooltipAutoPos;
        tooltipAutoPosMargin = options.autoPositioningMargin !== void 0 ? options.autoPositioningMargin : tooltipAutoPosMargin;
        tooltipAutoSize = options.autoResizing !== void 0 ? options.autoResizing : tooltipAutoSize;
    };
    ui.showTooltip = function(selector, message, resetOnly) {
        var tooltip = $(selector).children("*[class*='tooltip-']:first");
        if (tooltip && tooltip.length) {
            var tooltipWidth = tooltip.hasClass("tooltip-sm") ? 125 : tooltip.hasClass("tooltip-md") ? 175 : tooltip.hasClass("tooltip-lg") ? 225 : 125;
            if (tooltip.hasClass("tooltip-left")) {
                if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
                    if (ui.isWindowInBreakPointRange([ "", "sm" ])) {
                        tooltipWidth = 125;
                    }
                }
                if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
                    if (tooltip.css("display") === "block") {
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {
                            flipTooltip(tooltip, ui.RIGHT, ui.SHADOW_LEFT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
                            flipTooltip(tooltip, ui.TOP, ui.SHADOW_LEFT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
                            flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_LEFT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
                            flipTooltip(tooltip, ui.TOP, ui.SHADOW_LEFT);
                        }
                    }
                }
            } else if (tooltip.hasClass("tooltip-top")) {
                if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
                    if (ui.isWindowInBreakPointRange([ "", "sm" ])) {
                        tooltipWidth = 125;
                    }
                }
                if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
                    if (tooltip.css("display") === "block") {
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
                            flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_TOP);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
                            flipTooltip(tooltip, ui.TOP, ui.SHADOW_TOP);
                        }
                    }
                }
            } else if (tooltip.hasClass("tooltip-right")) {
                if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
                    if (ui.isWindowInBreakPointRange([ "", "sm" ])) {
                        tooltipWidth = 125;
                    }
                }
                if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
                    if (tooltip.css("display") === "block") {
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
                            flipTooltip(tooltip, ui.LEFT, ui.SHADOW_RIGHT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {
                            flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_RIGHT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
                            flipTooltip(tooltip, ui.TOP, ui.SHADOW_RIGHT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
                            flipTooltip(tooltip, ui.BOTTOM, ui.SHADOW_RIGHT);
                        }
                    }
                }
            } else if (tooltip.hasClass("tooltip-bottom")) {
                if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
                    if (ui.isWindowInBreakPointRange([ "", "sm" ])) {
                        tooltipWidth = 125;
                    }
                }
                if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
                    if (tooltip.css("display") === "block") {
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
                            flipTooltip(tooltip, ui.TOP, ui.SHADOW_BOTTOM);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
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
                var target = $(selector).children(":not(.tooltip-dynamic):not(.tooltip-focus):not(.tooltip-static):first");
                if (target.length > 0) {
                    var targetLeft = target.position().left;
                    var targetTop = target.position().top;
                    var targetWidth = target.outerWidth();
                    var targetHeight = target.outerHeight();
                    var tooltipHeight = tooltip.outerHeight();
                    positionTooltip(tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight);
                    if (arguments.length < 3 || arguments.length > 2 && !resetOnly) {
                        tooltip.show();
                        setTimeout(function() {
                            resetTooltips();
                        }, 50);
                    }
                }
            }
        }
    };
    ui.hideTooltip = function(selector) {
        var tooltip = $(selector).children("*[class*='tooltip-']:first");
        if (tooltip && tooltip.length) {
            tooltip.hide();
        }
    };
    $(".tooltip").hover(function() {
        var disabledTarget = $(this).children(".control-disabled");
        if (!disabledTarget.length) {
            var disabledParent = $(this).parents(".control-group-disabled");
            if (!disabledParent.length) {
                var tooltip = $(this).children(".tooltip-dynamic:first");
                if (tooltip && tooltip.length) {
                    ui.showTooltip(this);
                    resetTooltips();
                }
            }
        }
    }, function() {
        var tooltip = $(this).children(".tooltip-dynamic:first");
        if (tooltip && tooltip.length) {
            ui.hideTooltip(this);
        }
    });
    $(".tooltip").focusin(function() {
        var disabledTarget = $(this).children(".control-disabled");
        if (!disabledTarget.length) {
            var disabledParent = $(this).parents(".control-group-disabled");
            if (!disabledParent.length) {
                var tooltip = $(this).children(".tooltip-focus:first");
                if (tooltip && tooltip.length) {
                    ui.showTooltip(this);
                    resetTooltips();
                }
            }
        }
    });
    $(".tooltip").focusout(function() {
        var tooltip = $(this).children(".tooltip-focus:first");
        if (tooltip && tooltip.length) {
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
})(window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery);

(function(webui, ui, $, undefined) {
    /* PRIVATE */
    /* PUBLIC */
    $.fn.modalControl = function(options) {
        var settings = $.extend({
            closeFromBackdrop: false
        }, options);
        if (settings.closeFromBackdrop) {
            this.closest(".modal").click(function(e) {
                if (e.target !== this) {
                    return;
                }
                ui.hideModal(this);
            });
        }
        return this;
    };
    ui.showModal = function(selector) {
        var modal = $(selector);
        if (modal) {
            modal.trigger("ui.modal.show.before");
            modal.show();
            var scrollShift = Math.floor(ui.getScrollbarWidth()) + "px";
            $("body").css("padding-right", scrollShift);
            $("body").css("overflow", "hidden");
            modal.find("input, textarea, select").not("input[type=hidden],input[type=button],input[type=submit],input[type=reset],input[type=image],button").filter(":enabled:visible:first").focus();
            modal.trigger("ui.modal.show.after");
        }
    };
    ui.hideModal = function(selector) {
        var modal = $(selector);
        if (modal) {
            modal.trigger("ui.modal.hide.before");
            $("body").css("padding-right", "");
            $("body").css("overflow", "");
            modal.hide();
            modal.trigger("ui.modal.hide.after");
        }
    };
})(window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery);

(function(webui, ui, $, undefined) {
    /* PRIVATE */
    /* PUBLIC */
    $.fn.uploadControl = function(options) {
        var settings = $.extend({
            showFiles: true,
            showCount: true,
            scrollX: false,
            scrollY: false
        }, options);
        if (settings.showFiles === false) {
            this.siblings().first("label").addClass("hide-files");
        }
        if (settings.showCount === false) {
            this.siblings().first("label").addClass("hide-count");
        }
        if (settings.scrollX || settings.scrollY) {
            if (settings.scrollX) {
                this.siblings().first("label").css("overflow-x", "scroll");
                this.filter(".upload-icon-bottom").siblings().first("label").css("background-position", "center calc(96% - 15px)");
            }
            if (settings.scrollY) {
                this.siblings().first("label").css("overflow-y", "scroll");
                this.filter(".upload.upload-icon-right").siblings().first("label").css("background-position", "calc(97% - 15px) 5px");
                this.filter(".upload-sm.upload-icon-right").siblings().first("label").css("background-position", "calc(97% - 15px) 2px");
            }
        }
        return this;
    };
    $(".upload, .upload-sm").change(function() {
        var element = $(this);
        if (element) {
            element.trigger("ui.upload.change.before");
            var label = element.siblings("label:first");
            if (element.length > 0) {
                var files = element[0].files;
                if (files != null && files.length > 0) {
                    if (label) {
                        var textValue = "";
                        if (label.hasClass("hide-files") === false) {
                            for (var i = 0; i < files.length; i++) {
                                textValue += files[i].name + "<br />";
                            }
                            textValue += "<br />";
                        }
                        if (label.hasClass("hide-count") === false) {
                            if (files.length > 1) {
                                textValue += "(" + files.length + ") files";
                            }
                        }
                        if (label.hasClass("hide-files") && label.hasClass("hide-count")) {
                            textValue += "Files loaded.";
                        }
                        textValue += "<br />";
                        label.html(textValue);
                        element.trigger("ui.upload.change.after");
                    }
                } else {
                    if (element.val() !== null && element.val().length > 0) {
                        if (label) {
                            label.text(element.val().replace("C:\\fakepath\\", ""));
                            element.trigger("ui.upload.change.after");
                        }
                    }
                }
            }
        }
    });
})(window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery);

(function(webui, ui, $, undefined) {
    /* PRIVATE */
    /* PUBLIC */
    $.fn.tabControl = function(options) {
        var settings = $.extend({
            activeTabId: null,
            activeTabFocused: false
        }, options);
        if (settings.activeTabId) {
            this.find(settings.activeTabId).show().addClass("selected");
            this.find(settings.activeTabId).siblings(".tab-item").hide().removeClass("selected");
        }
        if (settings.activeTabFocused) {
            this.find("[href='" + settings.activeTabId + "']").focus();
            this.find("[data-target='" + settings.activeTabId + "']").focus();
        }
        return this;
    };
    $(".tab-activator").click(function(e) {
        e.preventDefault();
        var element = $(this);
        if (element) {
            var tabId = element.attr("href");
            if (!tabId) {
                tabId = element.data("target");
            }
            var prevTabId = element.parents(".tabs").find(tabId).siblings(".tab-item.selected").prop("id");
            var curTabId = tabId.replace("#", "");
            element.trigger("ui.tabs.change.before", [ prevTabId, curTabId ]);
            element.parents(".tabs").find(tabId).show().addClass("selected");
            element.parents(".tabs").find(tabId).siblings(".tab-item").hide().removeClass("selected");
            element.trigger("ui.tabs.change.after", [ prevTabId, curTabId ]);
        }
    });
})(window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery);