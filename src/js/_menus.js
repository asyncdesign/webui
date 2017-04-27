
(function (webui, ui, $, undefined) {

	/* PRIVATE */

	var menuDropdownFadeInDuration = 500;
	var menuDropdownFadeOutDuration = 500;
	var menuDropdownTransitionType = "vertical";


    /* PUBLIC */

	ui.initMenus = function (options) {
		menuDropdownFadeInDuration = options.dropdownFadeInDuration !== void 0 ? options.dropdownFadeInDuration : menuDropdownFadeInDuration;
		menuDropdownFadeOutDuration = options.dropdownFadeOutDuration !== void 0 ? options.dropdownFadeOutDuration : menuDropdownFadeOutDuration;
		menuDropdownTransitionType = options.dropdownTransitionType !== void 0 ? options.dropdownTransitionType : menuDropdownTransitionType;
	};

	ui.toggleMenuItem = function (selector) {

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
							dropdown.animate({ height: "hide", opacity: "hide" }, menuDropdownFadeOutDuration);
							dropdown.animate({ height: "hide", opacity: "hide" }, menuDropdownFadeOutDuration); 
							break;
						case "horizontal":
							dropdown.animate({ width: "hide", opacity: "hide" }, menuDropdownFadeOutDuration);
							dropdown.animate({ width: "hide", opacity: "hide" }, menuDropdownFadeOutDuration); 
							break;
						default:
							dropdown.hide(menuDropdownFadeOutDuration);
							dropdown.hide(menuDropdownFadeOutDuration); 
							break;
					}

					menuItem.trigger("ui.dropdown.hide.after");
				}
				else {

					menuItem.trigger("ui.dropdown.show.before");


					switch (menuDropdownTransitionType) {
						case "vertical":
							dropdown.animate({ height: "show", opacity: "show" }, menuDropdownFadeInDuration);
							dropdown.animate({ height: "show", opacity: "show" }, menuDropdownFadeInDuration); 
							break;
						case "horizontal":
							dropdown.animate({ width: "show", opacity: "show" }, menuDropdownFadeInDuration);
							dropdown.animate({ width: "show", opacity: "show" }, menuDropdownFadeInDuration); 
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

			dropdown.filter(".menu-close").find(".menu-button:not(.menu-activator)").click(function () {
				menuItem.parents().children(".menu-activator:last").next().hide(menuDropdownFadeOutDuration);
			});
			dropdown.filter(".menu-close").find(".menu-button-sm:not(.menu-activator)").click(function () {
				menuItem.parents().children(".menu-activator:last").next().hide(menuDropdownFadeOutDuration);
			});
			dropdown.filter(".menu-close").find("a:not(.menu-activator)").click(function () {
				menuItem.parents().children(".menu-activator:last").next().hide(menuDropdownFadeOutDuration);
			});
		}

	};

	$(".menu-activator").click(function (e) {
		ui.toggleMenuItem($(this));
	});

	$(".menu-activator-dynamic").hover(
		function () {
			var menuItem = $(this);

			if (menuItem) {
				menuItem.trigger("ui.dropdown.show.before");

				switch (menuDropdownTransitionType) {
					case "vertical":
						menuItem.siblings(".dropdown-sheet").animate({ height: "show", opacity: "show" }, menuDropdownFadeInDuration);
						menuItem.siblings(".dropdown-content").animate({ height: "show", opacity: "show" }, menuDropdownFadeInDuration); 
						break;
					case "horizontal":
						menuItem.siblings(".dropdown-sheet").animate({ width: "show", opacity: "show" }, menuDropdownFadeInDuration);
						menuItem.siblings(".dropdown-content").animate({ width: "show", opacity: "show" }, menuDropdownFadeInDuration); 
						break;
					default:
						menuItem.siblings(".dropdown-sheet").show(menuDropdownFadeInDuration);
						menuItem.siblings(".dropdown-content").show(menuDropdownFadeInDuration); 
						break;
				}

				menuItem.trigger("ui.dropdown.show.after");
			}
		},
		function () {
			var menuItem = $(this);

			if (menuItem) {
				menuItem.trigger("ui.dropdown.hide.before");

				menuItem.siblings(".dropdown-sheet").css("display", "none");
				menuItem.siblings(".dropdown-content").css("display", "none");

				menuItem.trigger("ui.dropdown.hide.after");
			}
		}
	);

	$(".menu-activator-dynamic ~ .dropdown-sheet").hover(

		function () {
			var dropdown = $(this);

			if (dropdown) {
				dropdown.css("display", "block");

				if (dropdown.hasClass("menu-close")) {

					dropdown.find(".menu-button:not(.menu-activator-dynamic)").click(function () {
						dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
					});
					dropdown.find(".menu-button-sm:not(.menu-activator-dynamic)").click(function () {
						dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
					});
					dropdown.find("a:not(.menu-activator-dynamic)").click(function () {
						dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
					});
				}
			}
		},
		function () {
			var dropdown = $(this);

			if (dropdown) {
				dropdown.trigger("ui.dropdown.hide.before");

				switch (menuDropdownTransitionType) {
					case "vertical":
						dropdown.animate({ height: "hide", opacity: "hide" }, menuDropdownFadeOutDuration);
						dropdown.animate({ height: "hide", opacity: "hide" }, menuDropdownFadeOutDuration); 
						break;
					case "horizontal":
						dropdown.animate({ width: "hide", opacity: "hide" }, menuDropdownFadeOutDuration);
						dropdown.animate({ width: "hide", opacity: "hide" }, menuDropdownFadeOutDuration); 
						break;
					default:
						dropdown.hide(menuDropdownFadeOutDuration);
						dropdown.hide(menuDropdownFadeOutDuration); 
						break;
				}

				dropdown.trigger("ui.dropdown.hide.after");
			}
		}
	);

	$(".menu-activator-dynamic ~ .dropdown-content").hover(

		function () {
			var dropdown = $(this);

			if (dropdown) {

				dropdown.css("display", "block");

				if (dropdown.hasClass("menu-close")) {

					dropdown.find(".menu-button:not(.menu-activator-dynamic)").click(function () {
						dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
					});
					dropdown.find(".menu-button-sm:not(.menu-activator-dynamic)").click(function () {
						dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
					});
					dropdown.find("a:not(.menu-activator-dynamic)").click(function () {
						dropdown.parents().children(".menu-activator-dynamic:last").next().hide(menuDropdownFadeOutDuration);
					});
				}
			}
		},
		function () {
			var dropdown = $(this);

			if (dropdown) {
				dropdown.trigger("ui.dropdown.hide.before");

				switch (menuDropdownTransitionType) {
					case "vertical":
						dropdown.animate({ height: "hide", opacity: "hide" }, menuDropdownFadeOutDuration);
						dropdown.animate({ height: "hide", opacity: "hide" }, menuDropdownFadeOutDuration); 
						break;
					case "horizontal":
						dropdown.animate({ width: "hide", opacity: "hide" }, menuDropdownFadeOutDuration);
						dropdown.animate({ width: "hide", opacity: "hide" }, menuDropdownFadeOutDuration); 
						break;
					default:
						dropdown.hide(menuDropdownFadeOutDuration);
						dropdown.hide(menuDropdownFadeOutDuration); 
						break;
				}

				dropdown.trigger("ui.dropdown.hide.after");
			}
		}
	);



} (window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery));
