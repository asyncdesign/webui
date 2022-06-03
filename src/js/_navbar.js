
(function (win) {
	
	/* PRIVATE */

	var NavbarInstance = function(navbar, settings) {

		var
			transitionDuration = settings.transitionDuration,

			smallDeviceSubMenuPadding = settings.smallDeviceSubMenuPadding,
			mediumDeviceSubMenuPadding = settings.mediumDeviceSubMenuPadding,

			largeDeviceMenuReverse = settings.largeDeviceMenuReverse,
			largeDeviceMenuSpacing = settings.largeDeviceMenuSpacing,
			largeDeviceMenuOffset = settings.largeDeviceMenuOffset,
			largeDeviceSubMenuPadding = settings.largeDeviceSubMenuPadding,
			largeDeviceSubMenuOffset = settings.largeDeviceSubMenuOffset,

			smallDeviceLogoColor = settings.smallDeviceLogoColor,
			smallDeviceLogoBackground = settings.smallDeviceLogoBackground,
			smallDeviceMenuColor = settings.smallDeviceMenuColor,
			smallDeviceMenuBackground = settings.smallDeviceMenuBackground,
			smallDeviceSubMenuColor = settings.smallDeviceSubMenuColor,
			smallDeviceSubMenuBackground = settings.smallDeviceSubMenuBackground,

			mediumDeviceLogoColor = settings.mediumDeviceLogoColor,
			mediumDeviceLogoBackground = settings.mediumDeviceLogoBackground,
			mediumDeviceMenuColor = settings.mediumDeviceMenuColor,
			mediumDeviceMenuBackground = settings.mediumDeviceMenuBackground,
			mediumDeviceSubMenuColor = settings.mediumDeviceSubMenuColor,
			mediumDeviceSubMenuBackground = settings.mediumDeviceSubMenuBackground,

			largeDeviceLogoColor = settings.largeDeviceLogoColor,
			largeDeviceLogoBackground = settings.largeDeviceLogoBackground,
			largeDeviceMenuColor = settings.largeDeviceMenuColor,
			largeDeviceMenuBackground = settings.largeDeviceMenuBackground,
			largeDeviceSubMenuColor = settings.largeDeviceSubMenuColor,
			largeDeviceSubMenuBackground = settings.largeDeviceSubMenuBackground,

			navButton = navbar.find("[class*='nav-button']").first(),
			navActivators = navbar.find(".nav-activator"),	

			navLogo = navbar.find(".nav-logo").first(),
			navMenu = navbar.children(".nav-menu").first(),
			navItems = navMenu.children(".nav-item"),
			navComponents = navMenu.children(".nav-component"),
			navSubMenus = navbar.find(".nav-sub-menu"),
			navSubMenuItems = navSubMenus.children(".nav-item"),
			navSubMenuComponents = navSubMenus.children(".nav-component"),

			setSmallDeviceProperties = function() {

				navSubMenus.css("padding", smallDeviceSubMenuPadding);

				navLogo.css("color", smallDeviceLogoColor);
				if (smallDeviceLogoBackground) {
					navLogo.css("background", smallDeviceLogoBackground);
				}
				navMenu.css("color", smallDeviceMenuColor);
				if (smallDeviceMenuBackground) {
					navMenu.css("background", smallDeviceMenuBackground);
				}
				navSubMenus.css("color", smallDeviceSubMenuColor);
				if (smallDeviceSubMenuBackground) {
					navSubMenus.css("background", smallDeviceSubMenuBackground);
				}
			},

			setMediumDeviceProperties = function() {

				navSubMenus.css("padding", mediumDeviceSubMenuPadding);

				navLogo.css("color", mediumDeviceLogoColor);
				if (mediumDeviceLogoBackground) {
					navLogo.css("background", mediumDeviceLogoBackground);
				}
				navMenu.css("color", mediumDeviceMenuColor);
				if (mediumDeviceMenuBackground) {
					navMenu.css("background", mediumDeviceMenuBackground);		
				}
				navSubMenus.css("color", mediumDeviceSubMenuColor);
				if (mediumDeviceSubMenuBackground) {
					navSubMenus.css("background", mediumDeviceSubMenuBackground);
				}
			},

			setLargeDeviceProperties = function() {

				if (largeDeviceMenuReverse) {
					navMenu.css("flex-direction","row-reverse");
					navLogo.css("text-align", "right");
					
					if (navItems.last().css("margin-right")) {
						navItems.last().css("margin-left", largeDeviceMenuOffset);
					}
				}
				else {
					navItems.last().css("margin-right", largeDeviceMenuOffset);
				}
				
				navItems.css("margin-left", largeDeviceMenuSpacing);
				navSubMenus.css("margin-left", largeDeviceSubMenuOffset);
				navSubMenus.css("padding", largeDeviceSubMenuPadding);
				
				navLogo.css("color", largeDeviceLogoColor);
				if (largeDeviceLogoBackground) {
					navLogo.css("background", largeDeviceLogoBackground);
				}
				navMenu.css("color", largeDeviceMenuColor);
				if (largeDeviceMenuBackground) {
					navMenu.css("background", largeDeviceMenuBackground);
				}
				navSubMenus.css("color", largeDeviceSubMenuColor);
				if (largeDeviceSubMenuBackground) {
					navSubMenus.css("background", largeDeviceSubMenuBackground);
				}
			},

			setNavbarProperties = function() {

				if (webui.isWindowInBreakPointRange([0, 3])) {
					setSmallDeviceProperties();
				}
				else if (webui.isWindowInBreakPointRange([3, 4])) {
					setMediumDeviceProperties();
				}
				else {
					setLargeDeviceProperties();
				}
			},

			resetNavbar = function() {	

				navLogo.attr("style", "");
				navMenu.attr("style","");
				navItems.attr("style", "");
				navComponents.attr("style", "");
				navSubMenus.attr("style", "");

		
				if (webui.isWindowInBreakPointRange([0, 3])) {

					navButton.parent().siblings(".nav-item, .nav-component").hide();
					navButton.removeClass("active");
					navSubMenus.hide();
					navActivators.removeClass("active");
					navActivators.find("[class*='nav-indicator']").removeClass("active");

					setSmallDeviceProperties();	
				}
				else if (webui.isWindowInBreakPointRange([3, 4])) {

					navButton.parent().siblings(".nav-item").hide();
					navButton.removeClass("active");
					navSubMenus.hide();
					navActivators.removeClass("active");
					navActivators.find("[class*='nav-indicator']").removeClass("active");
		
					navButton.parent().siblings(".nav-component").show();

					setMediumDeviceProperties();
				}
				else {

					navSubMenus.hide();
					navActivators.removeClass("active");
					navActivators.find("[class*='nav-indicator']").removeClass("active");
					
					navButton.parent().siblings(".nav-item, .nav-component").show();
					navSubMenus.children(".nav-item").show();

					setLargeDeviceProperties();
				}
		
			};

		setNavbarProperties();
		

		/* EVENTS */

		webui.breakpointChange(function() {
			resetNavbar();
		});
		

		navActivators.click(function(e) {
			e.preventDefault();

			var navActivator = ui(this);
			var subMenu = navActivator.nextSibling(".nav-sub-menu");

			navActivator.toggleClass("active");
			navActivator.find("[class*='nav-indicator']").toggleClass("active");

			if (navActivator.hasClass("active")) {

				navActivator.parent().siblings().children(".nav-activator").removeClass("active");
				navActivator.parent().siblings().children(".nav-activator").find("[class*='nav-indicator']").removeClass("active");

				subMenu.parent().siblings().children(".nav-sub-menu").collapseVertical(transitionDuration, 0);
				
				navActivator.trigger("ui.navbar.submenu.show.before");

				subMenu.expandVertical(transitionDuration, "auto", function() {
					navActivator.trigger("ui.navbar.submenu.show.after");
				});
				
			}
			else {
				navActivator.trigger("ui.navbar.submenu.hide.before");

				subMenu.collapseVertical(transitionDuration, 0, function() {
					navActivator.trigger("ui.navbar.submenu.hide.after");
				});

			}		
		
		});
		
		navButton.click(function(e) {
			e.preventDefault();

			var toggleButton = ui(this);
			var rootItems = toggleButton.parent().siblings(".nav-item");
			var rootComponents = toggleButton.parent().siblings(".nav-component");

			toggleButton.toggleClass("active");

			if (toggleButton.hasClass("active")) {

				toggleButton.trigger("ui.navbar.menu.show.before");
				
				rootItems.expandVertical(transitionDuration, "auto", function() {
					toggleButton.trigger("ui.navbar.menu.show.after");
				});

				if (webui.isWindowInBreakPointRange([0, 3])) {
					rootComponents.expandVertical(transitionDuration, "auto");
				}
			}
			else {
				toggleButton.trigger("ui.navbar.menu.hide.before");

				rootItems.collapseVertical(transitionDuration, 0, function() {
					rootItems.attr("style", "");
					toggleButton.trigger("ui.navbar.menu.hide.after");
				});

				if (webui.isWindowInBreakPointRange([0, 3])) {
					rootComponents.collapseVertical(transitionDuration, 0, function() {
						rootComponents.attr("style", "");
					});
	
				}
			}

		});		

	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navbarControl", {
		value: function (options) {

			var settings = ui.extend({

				transitionDuration: 300,
				smallDeviceSubMenuPadding: "0 1rem",
				mediumDeviceSubMenuPadding: "0 1rem",
				largeDeviceMenuReverse: false,
				largeDeviceMenuSpacing: 0,
				largeDeviceMenuOffset: 0,
				largeDeviceSubMenuPadding: "0 2rem",
				largeDeviceSubMenuOffset: 0,

				smallDeviceLogoColor: "inherit",
				smallDeviceLogoBackground: "",
				smallDeviceMenuColor: "inherit",
				smallDeviceMenuBackground: "",
				smallDeviceSubMenuColor: "inherit",
				smallDeviceSubMenuBackground: "rgba(255, 255, 255, 0.2)",
		
				mediumDeviceLogoColor: "inherit",
				mediumDeviceLogoBackground: "",
				mediumDeviceMenuColor: "inherit",
				mediumDeviceMenuBackground: "",
				mediumDeviceSubMenuColor: "inherit",
				mediumDeviceSubMenuBackground: "rgba(255, 255, 255, 0.2)",
		
				largeDeviceLogoColor: "inherit",
				largeDeviceLogoBackground: "",
				largeDeviceMenuColor: "inherit",
				largeDeviceMenuBackground: "",
				largeDeviceSubMenuColor: "inherit",
				largeDeviceSubMenuBackground: "inherit"

			}, options);

			if (this.length > 1) { console.warn("WebUI navbar component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new NavbarInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }
				if (newSettings.smallDeviceSubMenuPadding) { settings.smallDeviceSubMenuPadding = newSettings.smallDeviceSubMenuPadding; }
				if (newSettings.mediumDeviceSubMenuPadding) { settings.mediumDeviceSubMenuPadding = newSettings.mediumDeviceSubMenuPadding; }
				if (newSettings.largeDeviceMenuReverse) { settings.largeDeviceMenuReverse = newSettings.largeDeviceMenuReverse; }
				if (newSettings.largeDeviceMenuSpacing) { settings.largeDeviceMenuSpacing = newSettings.largeDeviceMenuSpacing; }
				if (newSettings.largeDeviceMenuOffset) { settings.largeDeviceMenuOffset = newSettings.largeDeviceMenuOffset; }	
				if (newSettings.largeDeviceSubMenuPadding) { settings.largeDeviceSubMenuPadding = newSettings.largeDeviceSubMenuPadding; }
				if (newSettings.largeDeviceSubMenuOffset) { settings.largeDeviceSubMenuOffset = newSettings.largeDeviceSubMenuOffset; }

				if (newSettings.smallDeviceLogoColor) { settings.smallDeviceLogoColor = newSettings.smallDeviceLogoColor; }
				if (newSettings.smallDeviceLogoBackground) { settings.smallDeviceLogoBackground = newSettings.smallDeviceLogoBackground; }
				if (newSettings.smallDeviceMenuColor) { settings.smallDeviceMenuColor = newSettings.smallDeviceMenuColor; }
				if (newSettings.smallDeviceMenuBackground) { settings.smallDeviceMenuBackground = newSettings.smallDeviceMenuBackground; }
				if (newSettings.smallDeviceSubMenuColor) { settings.smallDeviceSubMenuColor = newSettings.smallDeviceSubMenuColor; }
				if (newSettings.smallDeviceSubMenuBackground) { settings.smallDeviceSubMenuBackground = newSettings.smallDeviceSubMenuBackground; }

				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }

				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				control = new NavbarInstance(this.first(), settings);	
			};


			return this;
		},
		enumerable: false
	});

})(window);