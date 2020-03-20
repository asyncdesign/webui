
(function (win) {
	
	/* PRIVATE */

	var

		transitionDuration = 300,
		largeDeviceOffset = -40,
		smallDeviceBreakpoint = 2,
		smallDeviceAlignment = "left",
		
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

			var navbar = ui(el);
			var rootMenus = navbar.children(".nav-menu");
			var childMenus = navbar.children(".nav-menu").find(".nav-menu");
			var components = rootMenus.children(".nav-component");	

			if (!mq.matches) {
				
				navbar.removeClass(mqClassName);
				navbar.find("[class*='nav-button']").css("display", "none");

				rootMenus.find("a").css("padding-left", "0").css("padding-right", "1.25rem");
				rootMenus.css("display", "block").css("height", navbar.hasClass("nav-sm") ? "2.375rem" : "2.75rem").addClass("active");
				
				childMenus.css("margin-left", "-" + (parseFloat(ui(this).css("width")) + params.largeDeviceOffset) + "px");	
				childMenus.css("top", navbar.css("height"));	
				childMenus.parent().siblings().children(".nav-menu").hide();
				childMenus.hide();

				components.css("display", "flex").css("height", navbar.css("height"));
			}
			else {
				navbar.addClass(mqClassName);
				navbar.find("[class*='nav-button']").css("display", "block").removeClass("active");

				rootMenus.css("display", "none").removeClass("active");
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

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navbarControl", {
		value: function (options) {

			var settings = ui.extend({
				transitionDuration: 300,
				largeDeviceOffset: -40,
				smallDeviceBreakpoint: 2,
				smallDeviceAlignment: "left"
			}, options);

			transitionDuration = settings.transitionDuration;			
			largeDeviceOffset = settings.largeDeviceOffset;
			smallDeviceBreakpoint = settings.smallDeviceBreakpoint;
			smallDeviceAlignment = settings.smallDeviceAlignment;

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

			var navbars = webui(this);
			var navItems = navbars.children(".nav-menu").children();
			var navButtons = navbars.find("[class*='nav-button']");

			if (!mq.matches) {
				navbars.removeClass(mqClassName);
				navbars.children(".nav-menu").find("a").css("padding-left", "0").css("padding-right", "1.25rem");

				navItems.children(".nav-menu").css("top", navbars.css("height"));				
			}
			else {
				navbars.addClass(mqClassName);
				navbars.children(".nav-menu").find("a").css("padding-left", "1.25rem").css("padding-right", "1.25rem");		

				if (smallDeviceAlignment === "center") {
					navbars.children(".nav-menu").find("a").css("text-align", "center");
				}
				else if (smallDeviceAlignment === "right") {
					navbars.children(".nav-menu").find("a").css("text-align", "right");
				}
				else {
					navbars.children(".nav-menu").find("a").css("text-align", "left");
				}

				navItems.children(".nav-menu").css("height", "0").css("top", "0");			
			}


      navButtons.click(function(e) {
				e.preventDefault();
				
				ui(this).toggleClass("active");

				if (ui(this).hasClass("active")) {
					ui(this).parent().children(".nav-menu").children().css("display", "block");
					ui(this).parent().children(".nav-menu").expandVertical(transitionDuration, "auto");	
				}
				else {
					ui(this).parent().children(".nav-menu").collapseVertical(transitionDuration);	
				}		
			});
			
			navItems.click(function(e) {

				if (ui(this).nextSibling().length) {

					var activeMenus = ui(this).nextSibling().children(".nav-menu");
										
					activeMenus.toggleClass("active").parent().siblings().children(".nav-menu").removeClass("active");

					if (!mq.matches) {
						navbars.removeClass(mqClassName);
						activeMenus.css("margin-left", "-" + ((parseFloat(ui(this).css("width"))) - largeDeviceOffset) + "px");

						if (activeMenus.css("display") === "none") {
							activeMenus.children().css("display", "block");

							activeMenus.parent().siblings().children(".nav-menu").hide();
							activeMenus.children().css("float", "none");
							activeMenus.expandVertical(transitionDuration, "auto");
						}
						else {
							activeMenus.collapseVertical(transitionDuration);
						}
		
					}
					else {
						navbars.addClass(mqClassName);
						activeMenus.css("height", "auto");
						activeMenus.children().css("height", "auto");
				
						if (activeMenus.hasClass("active")) {		
							activeMenus.parent().siblings().children(".nav-menu").collapseVertical(transitionDuration);
							activeMenus.children().css("display", "block");
							activeMenus.expandVertical(transitionDuration, "auto");
						}
						else {
							activeMenus.collapseVertical(transitionDuration);
						}
					
					}
				}

			});

			win.addEventListener("resize", navbarResize);

			function navbarResize() {
				resetNavbar(navbars, { largeDeviceOffset: largeDeviceOffset, smallDeviceBreakpoint: smallDeviceBreakpoint });
			};		


		}
	});

}(window));
	

