
(function (win) {

	/* PRIVATE */

	var TooltipInstance = function(context, settings) {


		var
			autoPositioning = settings.autoPositioning,
			autoResizing = settings.autoResizing,
			autoPositioningMargin = settings.autoPositioningMargin,
			transitionDuration = settings.transitionDuration,
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

				var tooltipWrappers = webui(context).find(".tooltip");

				for (var i = 0; i < tooltipWrappers.length; i++) {
					var tooltip = webui(tooltipWrappers[i]).children("[class*='tooltip-']").first();
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
					showTooltip(webui(tooltipWrappers[i]), null, true);
				};
			},

			showTooltip = function (tooltipWrapper, message, resetOnly) {

				var el = webui(tooltipWrapper).first();
				var tooltip = el.children("[class*='tooltip-']").first();
		
				if (tooltip.length) {
		
					var tooltipWidth = tooltip.hasClass("tooltip-sm") ? 125 : tooltip.hasClass("tooltip-md") ? 175 : tooltip.hasClass("tooltip-lg") ? 225 : 125;
		
					if (tooltip.hasClass("tooltip-left")) {
						if (autoResizing && !tooltip.hasClass("tooltip-noautosize")) {
							if (ui.isWindowInBreakPointRange([0, 2])) {
								tooltipWidth = 125;
							}
						}
						if (autoPositioning && !tooltip.hasClass("tooltip-noautopos")) {
							if (tooltip.css("display") === "block") {
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).leftExceeded) {
									flipTooltip(tooltip, RIGHT, SHADOW_LEFT);
								}	
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).rightExceeded) {
									flipTooltip(tooltip, TOP, SHADOW_LEFT);
								}	
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).topExceeded) {
									flipTooltip(tooltip, BOTTOM, SHADOW_LEFT);
								}	
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).bottomExceeded) {
									flipTooltip(tooltip, TOP, SHADOW_LEFT);
								}
							}
						}
					} else if (tooltip.hasClass("tooltip-top")) {
						if (autoResizing && !tooltip.hasClass("tooltip-noautosize")) {
							if (ui.isWindowInBreakPointRange([0, 2])) {
								tooltipWidth = 125;
							}
						}
						if (autoPositioning && !tooltip.hasClass("tooltip-noautopos")) {
							if (tooltip.css("display") === "block") {
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).topExceeded) {
									flipTooltip(tooltip, BOTTOM, SHADOW_TOP);
									if (getTooltipViewportStatus(tooltip, autoPositioningMargin).bottomExceeded) {
										flipTooltip(tooltip, LEFT, SHADOW_TOP);
										if (getTooltipViewportStatus(tooltip, autoPositioningMargin).leftExceeded) {
											flipTooltip(tooltip, RIGHT, SHADOW_TOP);
											if (getTooltipViewportStatus(tooltip, autoPositioningMargin).rightExceeded) {
												flipTooltip(tooltip, TOP, SHADOW_TOP);
											}			
										}		
									}	
								}
							}
						}
					} else if (tooltip.hasClass("tooltip-right")) {
						if (autoResizing && !tooltip.hasClass("tooltip-noautosize")) {
							if (ui.isWindowInBreakPointRange([0, 2])) {
								tooltipWidth = 125;
							}
						}
						if (autoPositioning && !tooltip.hasClass("tooltip-noautopos")) {
							if (tooltip.css("display") === "block") {
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).rightExceeded) {
									flipTooltip(tooltip, LEFT, SHADOW_RIGHT);
								}
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).leftExceeded) {
									flipTooltip(tooltip, BOTTOM, SHADOW_RIGHT);
								}
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).bottomExceeded) {
									flipTooltip(tooltip, TOP, SHADOW_RIGHT);
								}
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).topExceeded) {
									flipTooltip(tooltip, BOTTOM, SHADOW_RIGHT);
								}		
							}
						}
					} else if (tooltip.hasClass("tooltip-bottom")) {
						if (autoResizing && !tooltip.hasClass("tooltip-noautosize")) {
							if (ui.isWindowInBreakPointRange([0, 2])) {
								tooltipWidth = 125;
							}
						}
						if (autoPositioning && !tooltip.hasClass("tooltip-noautopos")) {
							if (tooltip.css("display") === "block") {
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).bottomExceeded) {
									flipTooltip(tooltip, TOP, SHADOW_BOTTOM);
									if (getTooltipViewportStatus(tooltip, autoPositioningMargin).topExceeded) {
										flipTooltip(tooltip, RIGHT, SHADOW_BOTTOM);
										if (getTooltipViewportStatus(tooltip, autoPositioningMargin).rightExceeded) {
											flipTooltip(tooltip, LEFT, SHADOW_BOTTOM);
											if (getTooltipViewportStatus(tooltip, autoPositioningMargin).leftExceeded) {
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
			},
		
			hideTooltip = function (tooltipWrapper) {
				var el = webui(tooltipWrapper).first();
		
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


			this.showTooltip = function (tooltipWrapper, message) {
				showTooltip(tooltipWrapper, message);
			};

			this.hideTooltip = function (tooltipWrapper) {
				hideTooltip(tooltipWrapper);
			};

	

		/* EVENTS */

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


		context.find(".tooltip").hoverIn(function () {
			var tooltipWrapper = webui(this);

			var disabledTarget = tooltipWrapper.children(".control-disabled");
			if (!disabledTarget.length) {
				var disabledParent = tooltipWrapper.parents(".control-group-disabled");
				if (!disabledParent.length) {
					var tooltip = tooltipWrapper.children(".tooltip-dynamic").first();
					if (tooltip.length) {
						showTooltip(tooltipWrapper);
						resetTooltips();
					}
				}
			}
		});

		context.find(".tooltip").hoverOut(function () {
			var tooltip = webui(this).children(".tooltip-dynamic").first();

			if (tooltip.length && !tooltip.hasClass("tooltip-noautohide")) {
				hideTooltip(webui(this));
			}
		});

		context.find(".tooltip").children("input, button, select, textarea, [tabindex]").focus(function () {
			var tooltipWrapper = webui(this).parent(".tooltip");

			var disabledTarget = webui(this).hasClass("control-disabled");
			if (!disabledTarget) {
				var disabledParent = webui(this).parents(".control-group-disabled");
				if (!disabledParent.length) {
					var el = tooltipWrapper.children(".tooltip-focus").first();
					if (el.length) {
						showTooltip(tooltipWrapper);
						resetTooltips();
					}
				}
			}
		});

		context.find(".tooltip").children("input, button, select, textarea, [tabindex]").blur(function () {
			var tooltipWrapper = webui(this).parent(".tooltip");

			var el = tooltipWrapper.children(".tooltip-focus").first();
			if (el.length && !el.hasClass("tooltip-noautohide")) {
				hideTooltip(tooltipWrapper);
			}
		});

		context.find(".tooltip .tooltip-static").siblings().keyDown(function (e) {	
			if (e.which == 27) {
				e.preventDefault();
				var el = webui(this).first();
				hideTooltip(el.parent(".tooltip"));
			}
		});
		
		context.find(".tooltip .tooltip-focus").siblings().keyDown(function (e) {	
			if (e.which == 27) {
				e.preventDefault();
				var el = webui(this).first();
				hideTooltip(el.parent(".tooltip"));
			}
		});

		context.find(".tooltip-close").click(function (e) {
			e.preventDefault();

			var tooltipWrapper = webui(this).closest(".tooltip");
			hideTooltip(tooltipWrapper);
		});		

	};


	/* PUBLIC */

	Object.defineProperty(webui.prototype, "tooltipControl", {
		value: function (options) {

			var settings = ui.extend({
				autoPositioning: true,
				autoResizing: true,
				autoPositioningMargin: 0,
				transitionDuration: 300
			}, options);


			var control = new TooltipInstance(this, settings);


			this.showTooltip = function (tooltipWrapper, message) {
				control.showTooltip(tooltipWrapper, message);	
			};

			this.hideTooltip = function (tooltipWrapper) {
				control.hideTooltip(tooltipWrapper);	
			};

			return this;
		},
		enumerable: false
	});

})(window);
