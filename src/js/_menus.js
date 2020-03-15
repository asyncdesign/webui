

(function (win) {
	
	/* PRIVATE */

	var 
		fn = webui.fn,
		transitionDuration = 500,
		transitionType = "fade",
		
		navigateTo = function(url) {
			if (url) {
				location.href = url;
			}
		};

	/* PUBLIC */

	webui.initMenus = function (options) {
		transitionDuration = options.transitionDuration !== void 0 ? options.transitionDuration : transitionDuration;
		transitionType = options.transitionType !== void 0 ? options.transitionType : transitionType;
	};


	fn.toggleDropdown = function () {
		var menuItem;

		for (var i = 0; i < this.length; i++) {
			menuItem = webui(this[i]);

			var dropdown = menuItem.nextSibling("[class*='dropdown-']");

			if (dropdown) {

				if (dropdown.length) {

					if (dropdown.css("display") === "block") {

						dropdown.trigger("ui.dropdown.hide.before");

						if (transitionType === "fade") {
							dropdown.fadeOut(transitionDuration).trigger("ui.dropdown.hide.after");
						}
						else if (transitionType === "collapse") {
							dropdown.collapseVertical(transitionDuration).trigger("ui.dropdown.hide.after");
						}
						else {
							dropdown.hide().trigger("ui.dropdown.hide.after");
						}

						if (dropdown.parent(".dropdown").length) {
							var siblingDropdowns = dropdown.find("[class*='menu-activator']").siblings("[class*='dropdown-']").hide();
							if (transitionType === "fade") {
								siblingDropdowns.first().parents("[class*='dropdown-']").first().fadeOut(transitionDuration);
							}
							else if (transitionType === "collapse") {
								siblingDropdowns.first().parents("[class*='dropdown-']").first().collapseVertical(transitionDuration, "auto");
							}
							else {
								siblingDropdowns.first().parents("[class*='dropdown-']").first().hide();
							}
						}
					}
					else {
						
						dropdown.trigger("ui.dropdown.show.before");

						if (transitionType === "fade") {
							dropdown.fadeIn(transitionDuration).trigger("ui.dropdown.show.after");
						}
						else if (transitionType === "collapse") {
							dropdown.expandVertical(transitionDuration).trigger("ui.dropdown.show.after");
						}
						else {
							dropdown.show().trigger("ui.dropdown.show.after");
						}

						if (dropdown.hasClass("menu-inclusive") === false) {

							if (transitionType === "fade") {
								dropdown.prevSiblings("[class*='dropdown-']").fadeOut(transitionDuration);
								dropdown.nextSiblings("[class*='dropdown-']").fadeOut(transitionDuration);
							}
							else if (transitionType === "collapse") {
								dropdown.prevSiblings("[class*='dropdown-']").collapseVertical(transitionDuration);
								dropdown.nextSiblings("[class*='dropdown-']").collapseVertical(transitionDuration);
							}
							else {
								dropdown.prevSiblings("[class*='dropdown-']").hide();
								dropdown.nextSiblings("[class*='dropdown-']").hide();
							}
						}
					}
				}
				dropdown.select(".menu-close").find("[class*='menu-button']:not(.menu-activator):not(.menu-activator-focus)").click(function () {
					menuItem.parents("[class*='dropdown-']").find("[class*='menu-activator']").siblings("[class*='dropdown-']").hide().first().parents("[class*='dropdown-']").first().hide();
					navigateTo(webui(this).data("url"));
				});
				dropdown.select(".menu-close").find("a:not(.menu-activator):not(.menu-activator-focus)").click(function (e) {
					menuItem.parents("[class*='dropdown-']").find("[class*='menu-activator']").siblings("[class*='dropdown-']").hide().first().parents("[class*='dropdown-']").first().hide();
				});
				dropdown.select(":not(.menu-close)").find("[class*='menu-button']:not(.menu-activator):not(.menu-activator-focus)").click(function () {
					navigateTo(webui(this).data("url"));
				});
			}
		}
	};

	/* EVENTS */

	webui(".menu-activator").click(function (e) {
		var menuItem = webui(this);
		menuItem.toggleDropdown();
	});

	webui(".menu-activator-focus").focus(function (e) {
		var menuItem = webui(this);
		menuItem.toggleDropdown();
	});

	webui(".menu-activator-dynamic").hoverIn(function (e) {
		var menuItem = webui(this);
			
		if (menuItem.siblings("[class*='dropdown-']").css("display") === "none") {
			menuItem.trigger("ui.dropdown.show.before");
			if (transitionType === "fade") {
				menuItem.siblings("[class*='dropdown-']").fadeIn(transitionDuration).trigger("ui.dropdown.show.after");
			}
			else if (transitionType === "collapse") {
				menuItem.siblings("[class*='dropdown-']").expandVertical(transitionDuration).trigger("ui.dropdown.show.after");
			}
			else {
				menuItem.siblings("[class*='dropdown-']").show().trigger("ui.dropdown.show.after");
			}
		}
	});

	webui(".menu-activator-dynamic").hoverOut(function (e) {
		var menuItem = webui(this);

		var allowHide = true;
		var el = webui.elementHoverAt(e.clientX, e.clientY + 1);

		if (webui(el).parents("[class*='dropdown-']").length) {
			allowHide = false;
		}
		
		if (allowHide) {
			menuItem.trigger("ui.dropdown.hide.before");

			if (transitionType === "fade") {
				menuItem.siblings("[class*='dropdown-']").fadeOut(transitionDuration).trigger("ui.dropdown.show.after");
			}
			else if (transitionType === "collapse") {
				menuItem.siblings("[class*='dropdown-']").collapseVertical(transitionDuration).trigger("ui.dropdown.show.after");
			}
			else {
				menuItem.siblings("[class*='dropdown-']").hide().trigger("ui.dropdown.show.after");
			}
		}
	});

	webui(".menu-activator-dynamic").siblings("[class*='dropdown-']").hoverIn(function () {
		var dropdown = webui(this);

		if (dropdown.hasClass("menu-close")) {

			dropdown.find("[class*='menu-button']:not(.menu-activator-dynamic)").click(function () {
				dropdown.hide().first().parents("[class*='dropdown-']").first().hide();
				navigateTo(webui(this).data("url"));
			});
			dropdown.find("a:not(.menu-activator-dynamic)").click(function (e) {
				dropdown.hide().first().parents("[class*='dropdown-']").first().hide();
			});
		}
		else {
			dropdown.find("[class*='menu-button']:not(.menu-activator-dynamic)").click(function () {
				navigateTo(webui(this).data("url"));
			});			
		}
	});

	webui(".menu-activator-dynamic").siblings("[class*='dropdown-']").hoverOut(function (e) {

		var dropdown = webui(this);

		var allowHide = true;
		var el = webui.elementHoverAt(e.clientX, e.clientY);

		if (webui(el).is(".menu-activator-dynamic")) {
			allowHide = false;
		}

		if (allowHide) {
			dropdown.trigger("ui.dropdown.hide.before");

			if (transitionType === "fade") {
				dropdown.fadeOut(transitionDuration).trigger("ui.dropdown.hide.after");
			}
			else if (transitionType === "collapse") {
				dropdown.collapseVertical(transitionDuration).trigger("ui.dropdown.hide.after");
			}
			else {
				dropdown.hide().trigger("ui.dropdown.hide.after");
			}
		}
	});

}(window));
	
