/*!
* Name: webui - UI functions
* Version: 5.3.0
* Author: Levi Keogh, 2017-05-24
*/

"use strict";

(function (webui, ui, $, undefined) {

	ui.version = "webui-5.3.0";

	/* PRIVATE */	

	var isDiv = function (selector) {
		return $(selector).is("div");
	};

	var isSpan = function (selector) {
		return $(selector).is("span");
	};

	var isTextbox = function (selector) {
		return $(selector).is("input:text");
	};

	var isPassword = function (selector) {
		return $(selector).is("input:password");
	};

	var isCheckbox = function (selector) {
		return $(selector).is("input:checkbox");
	};

	var isButton = function (selector) {
		return $(selector).is("input:button");
	};

	var isTextarea = function (selector) {
		return $(selector).is("textarea");
	};

	var isSelect = function (selector) {
		return $(selector).is("select");
	};

	var isDatalist = function (selector) {
		return $(selector).is("datalist");
	};

	var selectorValueMatches = function (selector, value) {
		var element = $(selector);
		
		return (isTextbox(selector) && element.val() === value) ||
			(isTextarea(selector) && element.text() === value) ||
			(isSelect(selector) && $("option:selected", element).text() === value) ||
			(isCheckbox(selector) && element.is(":checked") === value);
	};

	var switchClasses = function (selector, currentCssClass, newCssClass) {
		var element = $(selector);

		element.removeClass(currentCssClass);
		element.addClass(newCssClass);
		if (isSelect(selector)) {
			$("option", element).css("color", element.css("color"));
		}
	};

	var runToggleAction = function (toggleContainer, selector) {

		if (toggleContainer) {
			var toggleBody = $(".off-canvas-body");
			var toggleItem = toggleContainer.find(selector);
			if (toggleBody && toggleItem) {
				var fadeInDuration = parseInt(toggleContainer.data("fade-in-duration"));
				var fadeOutDuration = parseInt(toggleContainer.data("fade-out-duration"));
				if (toggleItem.hasClass("off-canvas-left")) {
					toggleBody.css("transition", "margin-left " + fadeInDuration / 1e3 + "s linear");
				} else if (toggleItem.hasClass("off-canvas-right")) {
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
		checkboxes.attr({"tabindex": "0", "role": "checkbox"});
		checkboxes.keydown(function(e) {
			if (e.which == 13 || e.which == 32) {
				$(this).click();
			}
		});
	}

	var radiobuttons = $(".radio label");
	if (radiobuttons && radiobuttons.length) {
		radiobuttons.attr({"tabindex": "0", "role": "radio"});
		radiobuttons.keydown(function(e) {
			if (e.which == 13 || e.which == 32) {
				$(this).click();
			}
		});
	}
	

	/* PUBLIC */

	ui.hidden = function (selector) {
		var element = $(selector);

		if (!element.hasClass("hidden")) {
			element.addClass("hidden");
		}
	};

	ui.visible = function (selector) {
		var element = $(selector);

		if (element.hasClass("hidden")) {
			element.removeClass("hidden");
		}
	};

	ui.toggleControl = function (selector, toggleState) {

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
				}
				else if (arguments.length > 1) {
					if (toggleState === "on") {
						if (element.css("display") === "none") {
							element.css("display", "block");
							element.attr("aria-hidden", "false");
						}
					}
					else {
						if (element.css("display") === "block") {
							element.css("display", "none");	
							element.attr("aria-hidden", "true");
						}
					}
				}
			}
		}
	};

	ui.toggleVisibleControl = function (visibleSelector, hiddenSelectors) {

		if (arguments.length === 2) {
			for (var i = 0; i < hiddenSelectors.length; i++) {
				ui.toggleControl(hiddenSelectors[i], "off");
			}
			ui.toggleControl(visibleSelector, "on");
		}
	};

	ui.toggleHiddenControl = function (hiddenSelector, visibleSelectors) {

		if (arguments.length === 2) {
			ui.toggleControl(hiddenSelector, "off");
			for (var i = 0; i < visibleSelectors.length; i++) {
				ui.toggleControl(visibleSelectors[i], "on");
			}
		}
	};

	$(".toggle-activator").click(function (e) {
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

	$(".toggle-activator-dynamic").hover(function (e) {
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

	ui.setControlState = function (selector, currentCssClass, newCssClass, revertOnClick, placeholder, resetData) {

		var element = $(selector);

		if (arguments.length > 2) {
			switchClasses(selector, currentCssClass, newCssClass);
		}
		if (arguments.length > 3 && revertOnClick) {
			element.click(function () {
				if ((element.val().length === 0 && (isTextbox(selector) || isPassword(selector) || isTextarea(selector))) ||
					isCheckbox(selector) || isSelect(selector) || isDiv(selector) || isSpan(selector)) {
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

	ui.resetControl = function (selector, resetData) {

		var element = $(selector);
		
		if (arguments.length > 0) {
			element.removeAttr("disabled");
			element.removeAttr("readonly");
		}
		if (arguments.length === 2 && resetData) {
			if (isTextbox(selector) || isPassword(selector) || isSelect(selector)) {
				element.val("");
			}
			else if (isCheckbox(selector)) {
				element.attr("checked", false);
			}
			else {
				element.text("");
			}
		}
	};

	ui.clearControl = function (selector) {

		var element = $(selector);

		if (isTextbox(selector) || isPassword(selector) || isTextarea(selector)) {
			element.val("");
		}
		else if (isCheckbox(selector)) {
			element.attr("checked", false);
		}
		else if (isSelect(selector)) {
			$("option", element).remove();
		}
		else {
			element.text("");
		}
	};

	ui.initialiseSelect = function (selector, itemCount, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {

		if (arguments.length === 1) {
			var totalOptions = $("option", $(selector)).length;

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
	};

	ui.clearSelectOptions = function (selector, selectedOnly) {

		var element = $(selector);

		if (arguments.length === 1) {
			$("option:not(:first)", element).remove();
		}
		else if (arguments.length === 2) {
			if (selectedOnly) {
				$("option:selected", element).remove();
			}
			else {
				$("option:not(:first)", element).remove();
			}
		}
	};

	ui.addSelectOption = function (selector, optionValue, optionText) {

		$(selector).append(new Option(optionText, optionValue));
	};

	ui.setSelectedOption = function (selector, optionIndex) {

		if (arguments.length === 2) {
			$("option", $(selector))[optionIndex].selected = true;
		}
	};

	ui.setSelectOptionText = function (selector, optionIndex, optionText) {

		$("option", $(selector)).eq(optionIndex).html(optionText);
	};

	ui.moveSelectOptions = function (fromSelector, toSelector, moveAll) {

		var fromElement = $(fromSelector);
		var toElement = $(toSelector);

		if (arguments.length === 2) {
			$("option:selected", fromElement).remove().appendTo(toElement).removeAttr("selected");
		}
		else if (arguments.length === 3) {
			if (moveAll) {
				$("option", fromElement).remove().appendTo(toElement).removeAttr("selected");
			}
			else {
				$("option:selected", fromElement).remove().appendTo(toElement).removeAttr("selected");
			}
		}
	};

	ui.getSelectOptionValues = function (selector, selectedOnly) {

		var element = $(selector);
		var options = null;

		if (arguments.length === 1) {
			options = $("option", element);
		}
		else if (arguments.length === 2) {
			if (selectedOnly) {
				options = $("option:selected", element);
			}
			else {
				options = $("option", element);
			}
		}

		var values = $.map(options, function (option) {
			return option.value;
		});

		return values;
	};

	ui.getSelectOptionTexts = function (selector, selectedOnly) {

		var element = $(selector);
		var options = null;

		if (arguments.length === 1) {
			options = $("option", element);
		}
		else if (arguments.length === 2) {
			if (selectedOnly) {
				options = $("option:selected", element);
			}
			else {
				options = $("option", element);
			}
		}

		var texts = $.map(options, function (option) {
			return option.text;
		});

		return texts;
	};

	ui.getSelectedMarkup = function (targetSelector, focusTargetSelector, includeHtml) {

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
						}
						else {
							markup = container.innerText;
						}
					}
					element.val(markup);
				}
			}
		}
		return "";
	};

	ui.disableControl = function (selector, disabledCssClass, enabledCssClass, withValue) {

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
			}
			else if (isSelect(selector)) {
				ui.setSelectOptionText(selector, 0, withValue);
			}
			else {
				if (!isCheckbox(selector)) {
					element.text(withValue);
				}
			}
		}
	};

	ui.enableControl = function (selector, enabledCssClass, disabledCssClass, withValue) {

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
			}
			else if (isSelect(selector)) {
				ui.setSelectOptionText(selector, 0, withValue);
			}
			else {
				if (!isCheckbox(selector)) {
					element.text(withValue);
				}
			}
		}
	};

	ui.disableControlsConditionally = function (dependsOnSelector, dependsOnValues, selectors, disabledCssClass, enabledCssClass, disabledValue, enabledValue) {

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
	};

	ui.enableControlsConditionally = function (dependsOnSelector, dependsOnValues, selectors, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {

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
	};

	ui.showControlsConditionally = function (dependsOnSelector, dependsOnValues, selectors, infoSelector, infoSelectorValue) {

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
						}
						else if (isSelect(infoSelector)) {
							$("option:contains(" + infoSelectorValue + ")", $(infoSelector)).attr("selected", true);
						}
						else {
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
					}
					else if (isSelect(infoSelector)) {
						$("option:contains(" + infoSelectorValue + ")", $(infoSelector)).attr("selected", false);
					}
					else {
						$(infoSelector).text("");
					}
				}
			}
		}
	};

	ui.hideControlsConditionally = function (dependsOnSelector, dependsOnValues, selectors, infoSelector, infoSelectorValue) {

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
						}
						else if (isSelect(infoSelector)) {
							$("option:contains(" + infoSelectorValue + ")", $(infoSelector)).attr("selected", true);
						}
						else {
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
					}
					else if (isSelect(infoSelector)) {
						$("option:contains(" + infoSelectorValue + ")", $(infoSelector)).attr("selected", false);
					}
					else {
						$(infoSelector).text("");
					}
				}
			}
		}
	};

	ui.pxToRem = function (pxValue) {
		var element = document.getElementsByTagName("html")[0];
		return parseInt(pxValue) / parseInt(window.getComputedStyle(element)["fontSize"]);
	};


	ui.getScrollbarWidth = function () {

		var ruler = document.createElement("div");
		ruler.className = "scrollbar-measure";
		document.body.appendChild(ruler);

		var scrollbarWidth = ruler.offsetWidth - ruler.clientWidth;

		document.body.removeChild(ruler);

		return scrollbarWidth;
	};

	ui.getAccessibilityContrastColor = function (hexColor) {

		if (hexColor.indexOf("#") === 0) {
			hexColor = hexColor.slice(1);
		}

		if (hexColor.length === 3) {
			hexColor = hexColor[0] + hexColor[0] + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2];
		}

		if (hexColor.length === 6) {
			var r = parseInt(hexColor.slice(0, 2), 16),
				g = parseInt(hexColor.slice(2, 4), 16),
				b = parseInt(hexColor.slice(4, 6), 16);

			return (r * 0.299 + g * 0.587 + b * 0.114) > 186
				? "#000000"
				: "#FFFFFF";
		}
		return null;
	}

	ui.getColorShade = function (hexColor, rgbValue) {

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
				else if (r < 0) {
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
				else if (b < 0) {
					b = 0;
				}

				return (hasHash ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
			}
		}
		return "#FFFFFF";
	};

	ui.getElementViewportStatus = function (element, requiredMargin) {

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
				result: (!(viewport.top > bounds.top || viewport.left > bounds.left || viewport.bottom < bounds.bottom || viewport.right < bounds.right)),
				topExceeded: bounds.top < viewport.top,
				leftExceeded: bounds.left < viewport.left,
				bottomExceeded: bounds.bottom > viewport.bottom,
				rightExceeded: bounds.right > viewport.right
			};
		}
		return null;
	};

	ui.isWindowInBreakPointRange = function (breakPointRange) {

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
	};

	ui.setMediaWidth = function (selector, width, minOrMax, breakPointRange) {

		var element = $(selector);

		if (arguments.length > 1) {

			if (arguments.length === 2) {
				element.css("width", width);
				return;
			}
			if (arguments.length === 3 || (arguments.length === 4 && ui.isWindowInBreakPointRange(breakPointRange))) {

				if (minOrMax == null || minOrMax == "") {
					element.css("width", width);
				}
				else if (minOrMax.toLowerCase() == "min") {
					element.css("min-width", width);
				}
				else if (minOrMax.toLowerCase() == "max") {
					element.css("max-width", width);
				}
				return;
			}
		}
	};


	ui.setMediaHeight = function (selector, height, minOrMax, breakPointRange) {

		var element = $(selector);

		if (arguments.length > 1) {

			if (arguments.length === 2) {
				element.css("height", height);
				return;
			}
			if (arguments.length === 3 || (arguments.length === 4 && ui.isWindowInBreakPointRange(breakPointRange))) {

				if (minOrMax == null || minOrMax == "") {
					element.css("height", height);
				}
				else if (minOrMax.toLowerCase() == "min") {
					element.css("min-height", height);
				}
				else if (minOrMax.toLowerCase() == "max") {
					element.css("max-height", height);
				}
				return;
			}
			else if (arguments.length === 4 && (breakPointRange != null && breakPointRange.length === 2)) {
				if (ui.isWindowInBreakPointRange(["", breakPointRange[0]])) {
					element.css("height", "auto");
					element.css("min-height", "1px");
				}
			}
		}
	};


} (window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery));
