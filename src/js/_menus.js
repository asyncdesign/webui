

(function (win) {
	
	/* PRIVATE */

	var fn = webui.fn,
		transitionDuration = 500,
		transitionType = "fade";

	/* PUBLIC */

	webui.initMenus = function (options) {
		transitionDuration = options.transitionDuration !== void 0 ? options.transitionDuration : transitionDuration;
		transitionType = options.transitionType !== void 0 ? options.transitionType : transitionType;
	};


	fn.toggleDropdown = function () {
		var menuItem;

		for (var i = 0; i < this.length; i++) {
			menuItem = webui(this[i]);

			var dropdown = menuItem.nextSibling(".dropdown-sheet");
			if (dropdown.length === 0) {
				dropdown = menuItem.nextSibling(".dropdown-content");
				if (dropdown.length === 0) {
					dropdown = menuItem.nextSibling(".dropdown-content-expand");
				}
			}
			if (dropdown) {
				if (dropdown.length) {
					if (dropdown.css("display") === "block") {

						menuItem.trigger("ui.dropdown.hide.before");
						if (transitionType === "fade") {
							dropdown.fadeOut(transitionDuration).trigger("ui.dropdown.hide.after");
						}
						else if (transitionType === "collapse") {
							dropdown.collapseVertical(transitionDuration, true).trigger("ui.dropdown.hide.after");
						}
						else {
							dropdown.hide().trigger("ui.dropdown.hide.after");
						}
					}
					else {
						menuItem.trigger("ui.dropdown.show.before");
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

							dropdown.prevSiblings(".dropdown-sheet").hide();
							dropdown.nextSiblings(".dropdown-sheet").hide();
							dropdown.prevSiblings(".dropdown-content").hide();
							dropdown.nextSiblings(".dropdown-content").hide();
							dropdown.prevSiblings(".dropdown-content-expand").hide();
							dropdown.nextSiblings(".dropdown-content-expand").hide();
						}

						webui(".menu-activator:not(:focus)").siblings(".dropdown-sheet:not(.menu-inclusive)").hide();
						webui(".menu-activator:not(:focus)").siblings(".dropdown-content:not(.menu-inclusive)").hide();
					}
				}
				dropdown.filter(".menu-close").find(".menu-button:not(.menu-activator)").click(function () {
					menuItem.parents().children(".menu-activator").last().nextSibling().hide();
				});
				dropdown.filter(".menu-close").find(".menu-button-sm:not(.menu-activator)").click(function () {
					menuItem.parents().children(".menu-activator").last().nextSibling().hide();
				});
				dropdown.filter(".menu-close").find("a:not(.menu-activator)").click(function () {
					menuItem.parents().children(".menu-activator").last().nextSibling().hide();
				});
			}
		}
	};

	/* EVENTS */

	webui(".menu-activator").click(function (e) {
		var menuItem = webui(this);
		menuItem.toggleDropdown();
	});

	webui(".menu-activator-dynamic").hoverIn(function (e) {
		var menuItem = webui(this);
			
		if (menuItem.siblings(".dropdown-content").css("display") === "none") {
			menuItem.trigger("ui.dropdown.show.before");
			if (transitionType === "fade") {
				menuItem.siblings(".dropdown-content").fadeIn(transitionDuration).trigger("ui.dropdown.show.after");
			}
			else if (transitionType === "collapse") {
				menuItem.siblings(".dropdown-content").expandVertical(transitionDuration).trigger("ui.dropdown.show.after");
			}
			else {
				menuItem.siblings(".dropdown-content").show().trigger("ui.dropdown.show.after");
			}
		}

		if (menuItem.siblings(".dropdown-sheet").css("display") === "none") {
			menuItem.trigger("ui.dropdown.show.before");
			if (transitionType === "fade") {
				menuItem.siblings(".dropdown-sheet").fadeIn(transitionDuration).trigger("ui.dropdown.show.after");
			}
			else if (transitionType === "collapse") {
				menuItem.siblings(".dropdown-sheet").expandVertical(transitionDuration).trigger("ui.dropdown.show.after");
			}
			else {
				menuItem.siblings(".dropdown-sheet").show().trigger("ui.dropdown.show.after");
			}
		}
	});


	webui(".menu-activator-dynamic").hoverOut(function (e) {
		var menuItem = webui(this);

		var allowHide = true;
		var el = webui.elementHoverAt(e.clientX, e.clientY);

		if (webui(el).parents(".dropdown-content").length || webui(el).parents(".dropdown-sheet").length) {
			allowHide = false;
		}
		
		if (allowHide) {
			menuItem.trigger("ui.dropdown.hide.before");

			if (transitionType === "fade") {
				menuItem.siblings(".dropdown-content").fadeOut(transitionDuration).trigger("ui.dropdown.show.after");
				menuItem.siblings(".dropdown-sheet").fadeOut(transitionDuration).trigger("ui.dropdown.show.after");
			}
			else if (transitionType === "collapse") {
				menuItem.siblings(".dropdown-content").collapseVertical(transitionDuration, true).trigger("ui.dropdown.show.after");
				menuItem.siblings(".dropdown-sheet").collapseVertical(transitionDuration, true).trigger("ui.dropdown.show.after");
			}
			else {
				menuItem.siblings(".dropdown-content").hide().trigger("ui.dropdown.show.after");
				menuItem.siblings(".dropdown-sheet").hide().trigger("ui.dropdown.show.after");					
			}
		}
	});

	webui(".menu-activator-dynamic").siblings(".dropdown-sheet").hoverIn(function () {
		var dropdown = webui(this);

		if (dropdown.hasClass("menu-close")) {

			dropdown.find(".menu-button:not(.menu-activator-dynamic)").click(function () {
				dropdown.parents().children(".menu-activator-dynamic").last().nextSibling().hide();
			});
			dropdown.find(".menu-button-sm:not(.menu-activator-dynamic)").click(function () {
				dropdown.parents().children(".menu-activator-dynamic").last().nextSibling().hide();
			});
			dropdown.find("a:not(.menu-activator-dynamic)").click(function (e) {
				e.preventDefault();
				dropdown.parents().children(".menu-activator-dynamic").last().nextSibling().hide();
			});
		}
	});

	webui(".menu-activator-dynamic").siblings(".dropdown-sheet").hoverOut(function (e) {
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
				dropdown.collapseVertical(transitionDuration, true).trigger("ui.dropdown.hide.after");
			}
			else {
				dropdown.hide().trigger("ui.dropdown.hide.after");
			}
		}
	});


	webui(".menu-activator-dynamic").siblings(".dropdown-content").hoverIn(function () {
		var dropdown = webui(this);

		if (dropdown.hasClass("menu-close")) {

			dropdown.find(".menu-button:not(.menu-activator-dynamic)").click(function () {
				dropdown.parents().children(".menu-activator-dynamic").last().nextSibling().hide();
			});
			dropdown.find(".menu-button-sm:not(.menu-activator-dynamic)").click(function () {
				dropdown.parents().children(".menu-activator-dynamic").last().nextSibling().hide();
			});
			dropdown.find("a:not(.menu-activator-dynamic)").click(function () {
				dropdown.parents().children(".menu-activator-dynamic").last().nextSibling().hide();
			});
		}
	});

	webui(".menu-activator-dynamic").siblings(".dropdown-content").hoverOut(function (e) {

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
				dropdown.collapseVertical(transitionDuration, true).trigger("ui.dropdown.hide.after");
			}
			else {
				dropdown.hide().trigger("ui.dropdown.hide.after");
			}
		}
	});


}(window));
	
