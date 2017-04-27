
(function (webui, ui, $, undefined) {

	/* PRIVATE */

	var tooltipAutoPos = false;
	var tooltipAutoPosMargin = 0;
	var tooltipAutoSize = true;

	var getTooltipViewportStatus = function (element, requiredMargin) {

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
				result: (!(viewport.top > bounds.top || viewport.left > bounds.left || viewport.bottom < bounds.bottom || viewport.right < bounds.right)),
				topExceeded: bounds.top < viewport.top,
				leftExceeded: bounds.left < viewport.left,
				bottomExceeded: bounds.bottom > viewport.bottom,
				rightExceeded: bounds.right > viewport.right
			};
		}
		return null;
	};

	
	var flipTooltip = function (tooltip, orientation, shadowClass) {
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

	var positionTooltip = function (tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight) {
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

	var resetTooltips = function () {
		try {
			var tooltips = $(".tooltip");
			tooltips.each(function () {
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
		}
		catch (ex) { }
	};

	
	if (typeof window !== void 0 && typeof window.addEventListener !== void 0) {

		$(window).resize(function () {
			resetTooltips();
		});

		setTimeout(function () {
			$(window).scroll(function () {
				resetTooltips();
			});
		}, 100);
	}
	

	/* PUBLIC */

	ui.initTooltips = function (options) {
		tooltipAutoPos = options.autoPositioning !== void 0 ? options.autoPositioning : tooltipAutoPos;
		tooltipAutoPosMargin = options.autoPositioningMargin !== void 0 ? options.autoPositioningMargin : tooltipAutoPosMargin;
		tooltipAutoSize = options.autoResizing !== void 0 ? options.autoResizing : tooltipAutoSize;
	};

	ui.showTooltip = function (selector, message, resetOnly) {

		var tooltip = $(selector).children("*[class*='tooltip-']:first");

		if (tooltip && tooltip.length) {

			var tooltipWidth = tooltip.hasClass("tooltip-sm") ? 125 : tooltip.hasClass("tooltip-md") ? 175 : tooltip.hasClass("tooltip-lg") ? 225 : 125;

			if (tooltip.hasClass("tooltip-left")) {
				if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
					if (ui.isWindowInBreakPointRange(["", "sm"])) {
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
					if (ui.isWindowInBreakPointRange(["", "sm"])) {
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
					if (ui.isWindowInBreakPointRange(["", "sm"])) {
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
					if (ui.isWindowInBreakPointRange(["", "sm"])) {
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
					if (arguments.length < 3 || (arguments.length > 2 && !resetOnly)) {
						tooltip.show();
						setTimeout(function () { resetTooltips(); }, 50);
					}
				}
			}
		}
	};

	ui.hideTooltip = function (selector) {

		var tooltip = $(selector).children("*[class*='tooltip-']:first");

		if (tooltip && tooltip.length) {
			tooltip.hide();
		}
	};

	$(".tooltip").hover(function () {
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
	}, function () {
		var tooltip = $(this).children(".tooltip-dynamic:first");

		if (tooltip && tooltip.length) {
			ui.hideTooltip(this);
		}
	});
	
	$(".tooltip").focusin(function () {
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
	$(".tooltip").focusout(function () {
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

} (window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery));
