
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

				setSmallDeviceProperties();	
			}
			else if (webui.isWindowInBreakPointRange([3, 4])) {

				navButton.parent().siblings(".nav-item").hide();
				navButton.removeClass("active");
				navSubMenus.hide();
				navActivators.removeClass("active");
	
				navButton.parent().siblings(".nav-component").show();

				setMediumDeviceProperties();
			}
			else {

				navSubMenus.hide();
				
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

			if (navActivator) {
				navActivator.toggleClass("active");

				if (navActivator.hasClass("active")) {

					navActivator.parent().siblings().children(".nav-activator").removeClass("active");

					subMenu.parent().siblings().children(".nav-sub-menu").collapseVertical(transitionDuration, 0, function() { 
						// After event 
					});
					
					subMenu.expandVertical(transitionDuration, "auto", function() {
						// After event
					});
					
				}
				else {
					subMenu.collapseVertical(transitionDuration, 0, function() {
						// After event
					});

				}
			}
		
		});
		
		navButton.click(function(e) {
			e.preventDefault();

			var toggleButton = ui(this);
			var rootItems = toggleButton.parent().siblings(".nav-item");
			var rootComponents = toggleButton.parent().siblings(".nav-component");

			
			toggleButton.toggleClass("active");

			if (toggleButton.hasClass("active")) {

				rootItems.expandVertical(transitionDuration, "auto", function() {
					// After event
				});

				if (webui.isWindowInBreakPointRange([0, 3])) {
					rootComponents.expandVertical(transitionDuration, "2.475rem", function() {
						// After event					
					});
				}
			}
			else {
				rootItems.collapseVertical(transitionDuration, 0, function() {
					// After event
					rootItems.attr("style", "");
				});

				if (webui.isWindowInBreakPointRange([0, 3])) {
					rootComponents.collapseVertical(transitionDuration, 0, function() {
						// After event
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

			return this;
		},
		enumerable: false
	});

})(window);