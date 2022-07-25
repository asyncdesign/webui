
(function (win) {
	
	/* PRIVATE */

	var NavbarInstance = function(navbar, settings) {

		var
			transitionDuration = settings.transitionDuration,

			smallDeviceMenuReverse = settings.smallDeviceMenuReverse,
			smallDeviceSubMenuPadding = settings.smallDeviceSubMenuPadding,

			mediumDeviceMenuReverse = settings.mediumDeviceMenuReverse,
			mediumDeviceSubMenuPadding = settings.mediumDeviceSubMenuPadding,

			largeDeviceMenuReverse = settings.largeDeviceMenuReverse,
			largeDeviceSubMenuPadding = settings.largeDeviceSubMenuPadding,

			largeDeviceMenuSpacing = settings.largeDeviceMenuSpacing,
			largeDeviceMenuOffset = settings.largeDeviceMenuOffset,
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


			setSmallDeviceProperties = function() {

				if (smallDeviceMenuReverse) {
					navMenu.css("flex-direction", "row-reverse");	
				}

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

				navMenu.children(".nav-item").last().css("margin-bottom", "1rem");
				navMenu.find(".nav-sub-menu").children(":last-of-type").css("margin-bottom", "0.5rem");
			},

			setMediumDeviceProperties = function() {

				navLogo.css("display", "flex");

				if (mediumDeviceMenuReverse) {
					navMenu.css("flex-direction", "row-reverse");
					navLogo.css("justify-content", "end").css("text-align", "right");
					navLogo.children().css("flex", "none");	
				}

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

				navMenu.children(".nav-item").last().css("margin-bottom", "1rem");
				navMenu.find(".nav-sub-menu").children(":last-of-type").css("margin-bottom", "0.5rem");
			},

			setLargeDeviceProperties = function() {

				navLogo.css("display", "flex");

				if (largeDeviceMenuReverse) {
					navMenu.css("flex-direction", "row-reverse");
					navLogo.css("justify-content", "end").css("text-align", "right");
					navLogo.children().css("flex", "none");
					
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

				navMenu.children(".nav-item").last().css("margin-bottom", "0");
				navMenu.find(".nav-sub-menu").children(":last-of-type").css("margin-bottom", "0.5rem");
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
					navActivators.find(".nav-indicator").removeClass("active");

					setSmallDeviceProperties();	
				}
				else if (webui.isWindowInBreakPointRange([3, 4])) {

					navButton.parent().siblings(".nav-item").hide();
					navButton.removeClass("active");
					navSubMenus.hide();
					navActivators.removeClass("active");
					navActivators.find(".nav-indicator").removeClass("active");
		
					navButton.parent().siblings(".nav-component").show();

					setMediumDeviceProperties();
				}
				else {

					navSubMenus.hide();
					navActivators.removeClass("active");
					navActivators.find(".nav-indicator").removeClass("active");
					
					navButton.parent().siblings(".nav-item, .nav-component").show();
					navSubMenus.children(".nav-item").show();

					setLargeDeviceProperties();
				}
		
			};


		this.updateInstance = function (newSettings) {
			
			if (newSettings.transitionDuration !== undefined) { transitionDuration = newSettings.transitionDuration; }

			if (newSettings.smallDeviceMenuReverse !== undefined) { smallDeviceMenuReverse = newSettings.smallDeviceMenuReverse; }
			if (newSettings.smallDeviceSubMenuPadding !== undefined) { smallDeviceSubMenuPadding = newSettings.smallDeviceSubMenuPadding; }

			if (newSettings.mediumDeviceMenuReverse !== undefined) { mediumDeviceMenuReverse = newSettings.mediumDeviceMenuReverse; }
			if (newSettings.mediumDeviceSubMenuPadding !== undefined) { mediumDeviceSubMenuPadding = newSettings.mediumDeviceSubMenuPadding; }

			if (newSettings.largeDeviceMenuReverse !== undefined) { largeDeviceMenuReverse = newSettings.largeDeviceMenuReverse; }
			if (newSettings.largeDeviceSubMenuPadding !== undefined) { largeDeviceSubMenuPadding = newSettings.largeDeviceSubMenuPadding; }

			if (newSettings.largeDeviceMenuSpacing !== undefined) { largeDeviceMenuSpacing = newSettings.largeDeviceMenuSpacing; }
			if (newSettings.largeDeviceMenuOffset !== undefined) { largeDeviceMenuOffset = newSettings.largeDeviceMenuOffset; }
			if (newSettings.largeDeviceSubMenuOffset !== undefined) { largeDeviceSubMenuOffset = newSettings.largeDeviceSubMenuOffset; }

			if (newSettings.smallDeviceLogoColor !== undefined) { smallDeviceLogoColor = newSettings.smallDeviceLogoColor; }
			if (newSettings.smallDeviceLogoBackground !== undefined) { smallDeviceLogoBackground = newSettings.smallDeviceLogoBackground; }
			if (newSettings.smallDeviceMenuColor !== undefined) { smallDeviceMenuColor = newSettings.smallDeviceMenuColor; }
			if (newSettings.smallDeviceMenuBackground !== undefined) { smallDeviceMenuBackground = newSettings.smallDeviceMenuBackground; }
			if (newSettings.smallDeviceSubMenuColor !== undefined) { smallDeviceSubMenuColor = newSettings.smallDeviceSubMenuColor; }
			if (newSettings.smallDeviceSubMenuBackground !== undefined) { smallDeviceSubMenuBackground = newSettings.smallDeviceSubMenuBackground; }

			if (newSettings.mediumDeviceLogoColor !== undefined) { mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
			if (newSettings.mediumDeviceLogoColor !== undefined) { mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
			if (newSettings.mediumDeviceLogoColor !== undefined) { mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
			if (newSettings.mediumDeviceLogoColor !== undefined) { mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
			if (newSettings.mediumDeviceLogoColor !== undefined) { mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
			if (newSettings.mediumDeviceLogoColor !== undefined) { mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }

			if (newSettings.largeDeviceLogoColor !== undefined) { largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
			if (newSettings.largeDeviceLogoColor !== undefined) { largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
			if (newSettings.largeDeviceLogoColor !== undefined) { largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
			if (newSettings.largeDeviceLogoColor !== undefined) { largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
			if (newSettings.largeDeviceLogoColor !== undefined) { largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
			if (newSettings.largeDeviceLogoColor !== undefined) { largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
			
			resetNavbar();
		};
	

		setNavbarProperties();
		

		/* EVENTS */

		webui.breakpointChange(function() {
			resetNavbar();
		});
		

		navActivators.click(function(e) {
			e.preventDefault();

			var navActivator = ui(this),
				subMenu = navActivator.nextSibling(".nav-sub-menu");

			navActivator.toggleClass("active");
			navActivator.find(".nav-indicator").toggleClass("active");


			if (webui.isWindowInBreakPointRange([0, 3])) {
				subMenu.css("padding", smallDeviceSubMenuPadding);
			}
			else if (webui.isWindowInBreakPointRange([3, 4])) {
				subMenu.css("padding", mediumDeviceSubMenuPadding);
			}
			else {
				subMenu.css("padding", largeDeviceSubMenuPadding);
			}

			var navSubMenuPaddingTop = parseFloat(subMenu.css("padding-top"));
			var navSubMenuPaddingBottom = parseFloat(subMenu.css("padding-bottom"));


			if (navActivator.hasClass("active")) {

				var siblingActivators = navActivator.parent().siblings().children(".nav-activator");

				for (var i = 0; i < siblingActivators.length; i++) {

					var siblingActivator = ui(siblingActivators[i]);

					if (siblingActivator.hasClass("active")) {

						navbar.trigger("ui.navbar.submenu.hide.before");

						siblingActivator.removeClass("active");
						siblingActivator.find(".nav-indicator").removeClass("active");
		
						siblingActivator.nextSibling(".nav-sub-menu")
						.collapseVertical({ duration: transitionDuration, paddingTop: navSubMenuPaddingTop, paddingBottom: navSubMenuPaddingBottom }, function() {
							navbar.trigger("ui.navbar.submenu.hide.after");
						});
					}
				}
				
				navbar.trigger("ui.navbar.submenu.show.before");

				subMenu.expandVertical({ duration: transitionDuration, targetHeight: 0, paddingTop: navSubMenuPaddingTop, paddingBottom: navSubMenuPaddingBottom }, function() {
					navbar.trigger("ui.navbar.submenu.show.after");
				});
				
			}
			else {
				navbar.trigger("ui.navbar.submenu.hide.before");

				subMenu.collapseVertical({ duration: transitionDuration, paddingTop: navSubMenuPaddingTop, paddingBottom: navSubMenuPaddingBottom }, function() {
					navbar.trigger("ui.navbar.submenu.hide.after");
				});

			}		
		
		});
		
		navButton.click(function(e) {
			e.preventDefault();

			var toggleButton = ui(this);
			var rootItems = toggleButton.parent().siblings(".nav-item");
			var rootComponents = toggleButton.parent().siblings(".nav-component");
			var triggered = false;

			toggleButton.toggleClass("active");

			if (toggleButton.hasClass("active")) {

				navbar.trigger("ui.navbar.menu.show.before");
				
				rootItems.expandVertical({ duration: transitionDuration }, function() {
					if (!triggered) { 
						triggered = true;
						navbar.trigger("ui.navbar.menu.show.after");
					}
				});

				if (webui.isWindowInBreakPointRange([0, 3])) {
					rootComponents.expandVertical({ duration: transitionDuration }, function() {
						if (!triggered) { 
							triggered = true;
							navbar.trigger("ui.navbar.menu.show.after");
						}	
					});
				}
			}
			else {
				navbar.trigger("ui.navbar.menu.hide.before");

				rootItems.collapseVertical({ duration: transitionDuration }, function() {
					rootItems.attr("style", "");

					if (!triggered) { 
						triggered = true;		
						navbar.trigger("ui.navbar.menu.hide.after");
					}
				});

				if (webui.isWindowInBreakPointRange([0, 3])) {
					rootComponents.collapseVertical({ duration: transitionDuration }, function() {
						rootComponents.attr("style", "");

						if (!triggered) { 
							triggered = true;	
							navbar.trigger("ui.navbar.menu.hide.after");
						}
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

				smallDeviceMenuReverse: false,
				smallDeviceSubMenuPadding: "0 1rem",

				mediumDeviceMenuReverse: false,
				mediumDeviceSubMenuPadding: "0 1rem",

				largeDeviceMenuReverse: false,
				largeDeviceSubMenuPadding: "0 2rem",

				largeDeviceMenuSpacing: 0,
				largeDeviceMenuOffset: 0,				
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
				control.updateInstance(newSettings);
			};

			return this;
		},
		enumerable: false
	});

})(window);