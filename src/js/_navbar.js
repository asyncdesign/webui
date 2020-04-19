
(function (win) {
	
	/* PRIVATE */

	var NavbarInstance = function(navbar, settings) {

		var

		transitionDuration = settings.transitionDuration,
		largeDeviceOffset = settings.largeDeviceOffset,
		largeDeviceMenuOffset = settings.largeDeviceMenuOffset,
		smallDeviceBreakpoint = settings.smallDeviceBreakpoint,
		smallDeviceAlignment = settings.smallDeviceAlignment,
		smallDeviceExpansion = settings.smallDeviceExpansion,
		
		resetNavbar = function(el, params) {

			var mq = null;
			var mqClassName = null;
			
			switch (params.smallDeviceBreakpoint) {
				case 1: mq = window.matchMedia("(max-width: 29.99rem)"); mqClassName = "mq-1"; break;
				case 2: mq = window.matchMedia("(max-width: 39.99rem)"); mqClassName = "mq-2"; break;
				case 3: mq = window.matchMedia("(max-width: 49.99rem)"); mqClassName = "mq-3"; break;
				case 4: mq = window.matchMedia("(max-width: 69.99rem)"); mqClassName = "mq-4"; break;
				case 5: mq = window.matchMedia("(max-width: 89.99rem)"); mqClassName = "mq-5"; break;
				default: mqClassName = "mq-2"; break;
			}

			var rootMenus = navbar.children(".nav-menu");
			var childMenus = navbar.children(".nav-menu").find(".nav-menu");
			var components = rootMenus.children(".nav-component");	

			if (!mq.matches) {
				
				navbar.removeClass(mqClassName);
				navbar.find("[class*='nav-button']").css("display", "none");

				rootMenus.css("position", "static").css("top", "auto");
				rootMenus.first().css("padding-left", params.largeDeviceOffset + "px");
				rootMenus.find("a").css("padding-left", "0").css("padding-right", "1.25rem");
				rootMenus.css("display", "block").css("height", navbar.hasClass("nav-sm") ? "2.375rem" : "2.75rem").addClass("active");
				
				childMenus.css("margin-left", "-" + (parseFloat(ui(this).css("width")) + params.largeDeviceMenuOffset) + "px");	
				childMenus.css("top", navbar.css("height"));	
				childMenus.parent().siblings().children(".nav-menu").hide();
				childMenus.hide();

				components.css("display", "flex").css("height", navbar.css("height"));
			}
			else {
				navbar.addClass(mqClassName);
				navbar.find("[class*='nav-button']").css("display", "block").removeClass("active");

				rootMenus.css("display", "none").removeClass("active");

				if (params.smallDeviceExpansion === "expand") {
					rootMenus.css("position", "static").css("top", "auto");				
				}
				else {
					rootMenus.css("position", "absolute").css("top", navbar.css("height"));
				}
				
				rootMenus.first().css("padding-left", "0");
				rootMenus.find("a").css("padding-left", "1.25rem").css("padding-right", "1.25rem");

				if (smallDeviceAlignment === "center") {
					rootMenus.find("a").css("text-align", "center");
				}
				else if (smallDeviceAlignment === "right") {
					rootMenus.find("a").css("text-align", "right");
				}
				else {
					rootMenus.find("a").css("text-align", "left");
				}

				childMenus.css("margin-left", "0").css("top", "0").removeClass("active");
				childMenus.parent().siblings().children(".nav-menu").hide();
				childMenus.hide();
			}

		};


		var mq = null;
		var mqClassName = null;
		
		switch (smallDeviceBreakpoint) {
			case 1: mq = window.matchMedia("(max-width: 29.99rem)"); mqClassName = "mq-1"; break;
			case 2: mq = window.matchMedia("(max-width: 39.99rem)"); mqClassName = "mq-2"; break;
			case 3: mq = window.matchMedia("(max-width: 49.99rem)"); mqClassName = "mq-3"; break;
			case 4: mq = window.matchMedia("(max-width: 69.99rem)"); mqClassName = "mq-4"; break;
			case 5: mq = window.matchMedia("(max-width: 89.99rem)"); mqClassName = "mq-5"; break;
			default: mqClassName = "mq-2"; break;
		}

		var navItems = navbar.children(".nav-menu").children();
		var navButtons = navbar.find("[class*='nav-button']");

		if (!mq.matches) {
			navbar.removeClass(mqClassName);
			navbar.children(".nav-menu").first().css("padding-left", largeDeviceOffset + "px");
			navbar.children(".nav-menu").css("position", "static").css("top", "auto");
			navbar.children(".nav-menu").find("a").css("padding-left", "0").css("padding-right", "1.25rem");

			navItems.children(".nav-menu").css("top", navbar.css("height"));				
		}
		else {
			navbar.addClass(mqClassName);

			if (smallDeviceExpansion === "expand") {
				navbar.children(".nav-menu").css("position", "static").css("top", "auto");				
			}
			else {
				navbar.children(".nav-menu").css("position", "absolute").css("top", navbar.css("height"));
			}

			navbar.children(".nav-menu").first().css("padding-left", "0");
			navbar.children(".nav-menu").find("a").css("padding-left", "1.25rem").css("padding-right", "1.25rem");		

			if (smallDeviceAlignment === "center") {
				navbar.children(".nav-menu").find("a").css("text-align", "center");
			}
			else if (smallDeviceAlignment === "right") {
				navbar.children(".nav-menu").find("a").css("text-align", "right");
			}
			else {
				navbar.children(".nav-menu").find("a").css("text-align", "left");
			}

			navItems.children(".nav-menu").css("height", "0").css("top", "0");	
			
			navButtons.css("display", "block");
		}



		navButtons.click(function(e) {
			e.preventDefault();
			
			ui(this).toggleClass("active");

			if (ui(this).hasClass("active")) {
				navbar.trigger("ui.navmenu.show.before");
				ui(this).parent().children(".nav-menu").children().css("display", "block");
				ui(this).parent().children(".nav-menu").expandVertical(transitionDuration, "auto", function() {
					navbar.trigger("ui.navmenu.show.after");
				});	
			}
			else {
				navbar.trigger("ui.navmenu.hide.before");
				ui(this).parent().children(".nav-menu").collapseVertical(transitionDuration, 0, function() {
					navbar.trigger("ui.navmenu.hide.after");
				});	
			}		
		});
		
		navItems.click(function(e) {

			if (ui(this).nextSibling().length) {

				var activeMenus = ui(this).nextSibling().children(".nav-menu");
									
				activeMenus.toggleClass("active").parent().siblings().children(".nav-menu").removeClass("active");

				if (!mq.matches) {
					navbar.removeClass(mqClassName);
					activeMenus.css("margin-left", "-" + ((parseFloat(ui(this).css("width"))) - largeDeviceMenuOffset) + "px");

					if (activeMenus.css("display") === "none") {
						navbar.trigger("ui.navitem.show.before");
						activeMenus.children().css("display", "block");

						activeMenus.parent().siblings().children(".nav-menu").hide();
						activeMenus.children().css("float", "none");
						activeMenus.expandVertical(transitionDuration, "auto", function() {
							navbar.trigger("ui.navitem.show.after");
						});
					}
					else {
						navbar.trigger("ui.navitem.hide.before");
						activeMenus.collapseVertical(transitionDuration, 0, function() {
							navbar.trigger("ui.navitem.hide.after");
						});
					}
	
				}
				else {
					navbar.addClass(mqClassName);
					activeMenus.css("height", "auto");
					activeMenus.children().css("height", "auto");
			
					if (activeMenus.hasClass("active")) {	
						navbar.trigger("ui.navitem.show.before");	
						activeMenus.parent().siblings().children(".nav-menu").collapseVertical(transitionDuration);
						activeMenus.children().css("display", "block");
						activeMenus.expandVertical(transitionDuration, "auto", function() {
							navbar.trigger("ui.navitem.show.after");
						});
					}
					else {
						navbar.trigger("ui.navitem.hide.before");
						activeMenus.collapseVertical(transitionDuration, 0, function() {
							navbar.trigger("ui.navitem.hide.after");
						});
					}
				
				}
			}

		});

		win.addEventListener("resize", navbarResize);

		function navbarResize() {
			resetNavbar(navbar, { largeDeviceOffset: largeDeviceOffset, 
														largeDeviceMenuOffset: largeDeviceMenuOffset, 
														smallDeviceBreakpoint: smallDeviceBreakpoint, 
														smallDeviceExpansion: smallDeviceExpansion });
		};	

	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navbarControl", {
		value: function (options) {

			var settings = ui.extend({
				transitionDuration: 300,
				largeDeviceOffset: 0,
				largeDeviceMenuOffset: -40,
				smallDeviceBreakpoint: 2,
				smallDeviceAlignment: "left",
				smallDeviceExpansion: "overlay"
			}, options);


			var control = new NavbarInstance(this, settings);

			return this;

		},
		enumerable: false
	});

}(window));
	

