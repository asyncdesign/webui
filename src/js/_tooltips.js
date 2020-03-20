
(function (win) {

	/* PRIVATE */

	var fn = webui.fn,

		tooltipAutoPos = true,
		tooltipAutoSize = true,
		tooltipAutoPosMargin = 0,
		transitionDuration = 500,
		LEFT = 0,
		TOP = 1,
		RIGHT = 2,
		BOTTOM = 3,
		SHADOW_LEFT = 0,
		SHADOW_TOP = 1,
		SHADOW_RIGHT = 2,
		SHADOW_BOTTOM = 3,

		getTooltipViewportStatus = function (tooltip, requiredMargin) {
			if (arguments.length > 0) {

				var margin = 0;
				var pointerSize = 5;
				var target = tooltip.siblings().first();
				var targetHeight = target[0].offsetHeight;
				var targetWidth = target[0].offsetWidth;
				if (arguments.length > 1 && requiredMargin != null && !isNaN(requiredMargin)) {
					margin = requiredMargin;
				}
				var viewport = {
					left: 0,
					top: 0,
					right: win.innerWidth,
					bottom: win.innerHeight
				};
				var tooltipRect = tooltip[0].getBoundingClientRect();
				var tooltipWidth = tooltipRect.right - tooltipRect.left;
				var tooltipHeight = tooltipRect.bottom - tooltipRect.top;

				var bounds = {
					top: tooltipRect.top - tooltipHeight - pointerSize - margin,
					left: tooltipRect.left - tooltipWidth - pointerSize - margin,
					bottom: tooltipRect.bottom + targetHeight + pointerSize + margin,
					right: tooltipRect.right + targetWidth + pointerSize + margin
				};

				var targetIsFirst = !target.prevSibling()[0];

				if (tooltip.hasClass("tooltip-left") || tooltip.hasClass("tooltip-right")) {
					if (tooltip.hasClass("tooltip-right")) {
							bounds.left = tooltipRect.left + targetWidth + pointerSize - margin;
					}

					if (targetIsFirst) {
						bounds.top = tooltipRect.top - tooltipHeight / 2 - targetHeight / 2 - margin;
						bounds.bottom = tooltipRect.bottom - tooltipHeight / 2 - targetHeight / 2 + margin;
					}
					else {
						bounds.top = tooltipRect.top - tooltipHeight / 2 + targetHeight / 2 - margin;
						bounds.bottom = tooltipRect.bottom - tooltipHeight / 2 + targetHeight / 2 + margin;
					}
				}
				else {
					if (targetIsFirst) {
						bounds.top = tooltipRect.top - targetHeight - tooltipHeight - pointerSize - margin;
						bounds.bottom = tooltipRect.bottom + pointerSize + margin;
					}
				}

				return {
					result: !(viewport.top > bounds.top || viewport.left > bounds.left || viewport.bottom < bounds.bottom || viewport.right < bounds.right),
					topExceeded: bounds.top < viewport.top,
					leftExceeded: bounds.left < viewport.left,
					bottomExceeded: bounds.bottom > viewport.bottom,
					rightExceeded: bounds.right > viewport.right
				};
			}
			return null;
		},

		flipTooltip = function (tooltip, orientation, shadowClass) {

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

					default:
						break;
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

					default:
						break;
				}
			}
		},

		positionTooltip = function (tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight) {

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
		},

		resetTooltips = function () {

			var tooltips = webui(".tooltip");

			for (var i = 0; i < tooltips.length; i++) {
				var tooltip = webui(tooltips[i]).children("[class*='tooltip-']").first();
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
				webui(tooltips[i]).showTooltip(null, true);
			};
		};

	if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
		win.addEventListener("resize", function () {
			resetTooltips();
		});
		win.setTimeout(function () {
			win.addEventListener("scroll", function () {
				resetTooltips();
			});
		}, 100);
	}

	/* PUBLIC */

	webui.initTooltips = function (options) {
		tooltipAutoPos = options.autoPositioning !== void 0 ? options.autoPositioning : tooltipAutoPos;
		tooltipAutoPosMargin = options.autoPositioningMargin !== void 0 ? options.autoPositioningMargin : tooltipAutoPosMargin;
		tooltipAutoSize = options.autoResizing !== void 0 ? options.autoResizing : tooltipAutoSize;
		transitionDuration = options.transitionDuration !== void 0 ? options.transitionDuration : transitionDuration;
	};

	fn.showTooltip = function (message, resetOnly) {

		var el = webui(this).first();
		var tooltip = el.children("[class*='tooltip-']").first();

		if (tooltip.length) {

			var tooltipWidth = tooltip.hasClass("tooltip-sm") ? 125 : tooltip.hasClass("tooltip-md") ? 175 : tooltip.hasClass("tooltip-lg") ? 225 : 125;

			if (tooltip.hasClass("tooltip-left")) {
				if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
					if (ui.isWindowInBreakPointRange([0, 2])) {
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
					if (ui.isWindowInBreakPointRange([0, 2])) {
						tooltipWidth = 125;
					}
				}
				if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
					if (tooltip.css("display") === "block") {
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
							flipTooltip(tooltip, BOTTOM, SHADOW_TOP);
							if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
								flipTooltip(tooltip, LEFT, SHADOW_TOP);
								if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {
									flipTooltip(tooltip, RIGHT, SHADOW_TOP);
									if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
										flipTooltip(tooltip, TOP, SHADOW_TOP);
									}			
								}		
							}	
						}
					}
				}
			} else if (tooltip.hasClass("tooltip-right")) {
				if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
					if (ui.isWindowInBreakPointRange([0, 2])) {
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
					if (ui.isWindowInBreakPointRange([0, 2])) {
						tooltipWidth = 125;
					}
				}
				if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
					if (tooltip.css("display") === "block") {
						if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
							flipTooltip(tooltip, TOP, SHADOW_BOTTOM);
							if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
								flipTooltip(tooltip, RIGHT, SHADOW_BOTTOM);
								if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
									flipTooltip(tooltip, LEFT, SHADOW_BOTTOM);
									if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {
										flipTooltip(tooltip, BOTTOM, SHADOW_BOTTOM);
									}			
								}		
							}	
						}
					}
				}
			}
			if (tooltipWidth > 0) {
				tooltip.css("width", tooltipWidth + "px");
				if (arguments.length > 0 && message != null && message.length) {
					tooltip.html(message);
				}
				var target = el.children(":not(.tooltip-dynamic):not(.tooltip-focus):not(.tooltip-static)").first();
				var targetIsFirst = !target.prevSibling()[0] && (tooltip.hasClass("tooltip-top") || tooltip.hasClass("tooltip-bottom"));

				if (target.length) {
					var targetWidth = target[0].offsetWidth;
					var targetHeight = targetIsFirst ? 0 : target[0].offsetHeight;
					var tooltipHeight = targetIsFirst ? tooltip[0].offsetHeight + target[0].offsetHeight : tooltip[0].offsetHeight;
					positionTooltip(tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight);
					if (arguments.length < 2 || arguments.length > 1 && !resetOnly) {
						tooltip.trigger("ui.tooltip.show.before");
						if (transitionDuration) {
							tooltip.fadeIn(transitionDuration).trigger("ui.tooltip.show.after");
						}
						else {
							tooltip.show().trigger("ui.tooltip.show.after");
						}
						win.setTimeout(function () {
							resetTooltips();
						}, 50);
					}
				}
			}
		}
		return this;
	};

	fn.hideTooltip = function () {
		var el = webui(this).first();

		var tooltip = el.children("[class*='tooltip-']").first();

		if (tooltip && tooltip.length) {
			tooltip.trigger("ui.tooltip.hide.before");
			if (transitionDuration) {
				tooltip.fadeOut(transitionDuration).trigger("ui.tooltip.hide.after");
			}
			else {
				tooltip.hide().trigger("ui.tooltip.hide.after");
			}
		}
	};


	/* EVENTS */

	webui(".tooltip").hoverIn(function () {
		var els = webui(this);

		var disabledTarget = els.children(".control-disabled");
		if (!disabledTarget.length) {
			var disabledParent = els.parents(".control-group-disabled");
			if (!disabledParent.length) {
				var tooltip = els.children(".tooltip-dynamic").first();
				if (tooltip.length) {
					els.showTooltip();
					resetTooltips();
				}
			}
		}
	});

	webui(".tooltip").hoverOut(function () {
		var tooltip = webui(this).children(".tooltip-dynamic").first();

		if (tooltip.length && !tooltip.hasClass("tooltip-noautohide")) {
			webui(this).hideTooltip();
		}
	});

	webui(".tooltip").children("input, button, select, textarea, [tabindex]").focus(function () {
		var tooltip = webui(this).parent(".tooltip");

		var disabledTarget = webui(this).hasClass("control-disabled");
		if (!disabledTarget) {
			var disabledParent = webui(this).parents(".control-group-disabled");
			if (!disabledParent.length) {
				var el = tooltip.children(".tooltip-focus").first();
				if (el.length) {
					tooltip.showTooltip();
					resetTooltips();
				}
			}
		}
	});

	webui(".tooltip").children("input, button, select, textarea, [tabindex]").blur(function () {
		var tooltip = webui(this).parent(".tooltip");

		var el = tooltip.children(".tooltip-focus").first();
		if (el.length && !el.hasClass("tooltip-noautohide")) {
			tooltip.hideTooltip();
		}
	});

	webui(".tooltip .tooltip-static").siblings().keyDown(function (e) {	
		if (e.which == 27) {
			e.preventDefault();
			var el = webui(this).first();
			el.parent(".tooltip").hideTooltip();
		}
	});
	
	webui(".tooltip .tooltip-focus").siblings().keyDown(function (e) {	
		if (e.which == 27) {
			e.preventDefault();
			var el = webui(this).first();
			el.parent(".tooltip").hideTooltip();
		}
	});

	webui(".tooltip-close").click(function (e) {
		e.preventDefault();

		var tooltip = webui(this).closest(".tooltip");
		tooltip.hideTooltip();
	});

}(window));
