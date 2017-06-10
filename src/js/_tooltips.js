
(function (webui, ui, $, undefined) {

	/* PRIVATE */

	var tooltipAutoPos = false;
	var tooltipAutoPosMargin = 0;
	var tooltipAutoSize = true;

	var LEFT = 0;
	var TOP = 1;
	var RIGHT = 2;
	var BOTTOM = 3;

	var SHADOW_LEFT = 0;
	var SHADOW_TOP = 1;
	var SHADOW_RIGHT = 2;
	var SHADOW_BOTTOM = 3;


	var getTooltipViewportStatus = function (element, requiredMargin) {

		if (arguments.length > 0) {

			var win = $(window);

			var margin = 0;
			var pointerSize = 5;

			var targetHeight = element.siblings(":first").outerHeight();
			var targetWidth = element.siblings(":first").outerWidth();

			if (arguments.length > 1 && requiredMargin != null && !isNaN(requiredMargin)) {
				margin = requiredMargin;
			}

			var viewport = {
				left: 0,
				top: 0,
				right: win.innerWidth(),
				bottom: win.innerHeight()
			};

			var clientRect = element.get(0).getBoundingClientRect();

			var elementWidth = clientRect.right - clientRect.left;
			var elementHeight = clientRect.bottom - clientRect.top;

			var bounds = {
				top: clientRect.top - elementHeight - targetHeight / 2 + pointerSize - margin,
				left: clientRect.left + targetWidth + pointerSize - margin,
				bottom: clientRect.bottom + targetHeight + targetHeight / 2 - pointerSize + margin,
				right: clientRect.right + targetWidth + pointerSize + margin
			};

			if (element.hasClass("tooltip-left") || element.hasClass("tooltip-right")) {
				if (element.hasClass("tooltip-left")) {
					bounds.left = clientRect.left - elementWidth - pointerSize - margin;
				}
				bounds.top = clientRect.top - elementHeight / 2 + targetHeight / 2 - margin;
				bounds.bottom = clientRect.bottom - elementHeight / 2 + targetHeight / 2 + margin;
			}
			
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
					case TOP:
						tooltip.removeClass("tooltip-left");
						tooltip.removeClass("tooltip-right");
						tooltip.removeClass("tooltip-bottom");
						tooltip.addClass("tooltip-top");
						break;
					case LEFT:
						tooltip.removeClass("tooltip-top");
						tooltip.removeClass("tooltip-right");
						tooltip.removeClass("tooltip-bottom");
						tooltip.addClass("tooltip-left");
						break;
					case BOTTOM:
						tooltip.removeClass("tooltip-top");
						tooltip.removeClass("tooltip-left");
						tooltip.removeClass("tooltip-right");
						tooltip.addClass("tooltip-bottom");
						break;
					case RIGHT:
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
					case SHADOW_TOP:
						tooltip.addClass("shadow-top");
						break;
					case SHADOW_LEFT:
						tooltip.addClass("shadow-left");
						break;
					case SHADOW_BOTTOM:
						tooltip.addClass("shadow-bottom");
						break;
					case SHADOW_RIGHT:
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
				var tooltip = $(this).children("[class*='tooltip-']:first");
				tooltip.css("margin-left", "");
				tooltip.css("margin-top", "");
				tooltip.css("left", "");
				tooltip.css("top", "");
				if (tooltip.hasClass("shadow-left")) {
					flipTooltip(tooltip, LEFT);
				} else if (tooltip.hasClass("shadow-top")) {
					flipTooltip(tooltip, TOP);
				} else if (tooltip.hasClass("shadow-right")) {
					flipTooltip(tooltip, RIGHT);
				} else if (tooltip.hasClass("shadow-bottom")) {
					flipTooltip(tooltip, BOTTOM);
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

		var tooltip = $(selector).children("[class*='tooltip-']:first");

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
							flipTooltip(tooltip, RIGHT, SHADOW_LEFT);
						}
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
							flipTooltip(tooltip, TOP, SHADOW_LEFT);
						}
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
							flipTooltip(tooltip, BOTTOM, SHADOW_LEFT);
						}
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
							flipTooltip(tooltip, TOP, SHADOW_LEFT);
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
							flipTooltip(tooltip, BOTTOM, SHADOW_TOP);
						}
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
							flipTooltip(tooltip, TOP, SHADOW_TOP);
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
							flipTooltip(tooltip, LEFT, SHADOW_RIGHT);
						}
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {
							flipTooltip(tooltip, BOTTOM, SHADOW_RIGHT);
						}
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
							flipTooltip(tooltip, TOP, SHADOW_RIGHT);
						}
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
							flipTooltip(tooltip, BOTTOM, SHADOW_RIGHT);
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
							flipTooltip(tooltip, TOP, SHADOW_BOTTOM);
						}
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
							flipTooltip(tooltip, BOTTOM, SHADOW_BOTTOM);
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

		var tooltip = $(selector).children("[class*='tooltip-']:first");

		if (tooltip && tooltip.length) {
			tooltip.css("display", "none");
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

		if (tooltip && tooltip.length && !tooltip.hasClass("tooltip-noautohide")) {
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

		if (tooltip && tooltip.length && !tooltip.hasClass("tooltip-noautohide")) {
			ui.hideTooltip(this);
		}
	});

} (window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery));
