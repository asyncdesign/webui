
(function (win) {
	
	/* PRIVATE */

	var

		transitionDuration = 300,
		smallDeviceAlignment = "left",
		largeDeviceOffset = -40,
		smallDeviceBreakpoint = "sm",
		
		resetNavbar = function(el, params) {

			var rootMenus = ui(el).children(".nav-menu");
			var childMenus = ui(el).children(".nav-menu").find(".nav-menu");	

			var mq = null;
			var mqClassName = null;
			
			switch (params.smallDeviceBreakpoint) {
				case "xs": mq = window.matchMedia("(max-width: 29.99rem)"); mqClassName = "mq-xs"; break;
				case "sm": mq = window.matchMedia("(max-width: 39.99rem)"); mqClassName = "mq-sm"; break;
				case "md": mq = window.matchMedia("(max-width: 49.99rem)"); mqClassName = "mq-md"; break;
				case "lg": mq = window.matchMedia("(max-width: 69.99rem)"); mqClassName = "mq-lg"; break;
				case "xl": mq = window.matchMedia("(max-width: 89.99rem)"); mqClassName = "mq-xl"; break;
				default: mqClassName = "mq-sm"; break;
			}

			if (!mq.matches) {
				ui(el).removeClass(mqClassName);
				ui(el).find("[class*='nav-button']").css("display", "none");
				rootMenus.find("a").css("padding-left", "0").css("padding-right", "1.25rem");
				rootMenus.css("height", "auto").css("display", "block");
				childMenus.css("padding", "0").css("margin-left", "-" + (parseFloat(ui(this).css("width")) + params.largeDeviceOffset) + "px");		
				childMenus.parent().siblings().children(".nav-menu").hide();
				childMenus.children().css("float", "none");
				childMenus.hide();
			}
			else {
				ui(el).addClass(mqClassName);
				ui(el).find("[class*='nav-button']").css("display", "block").removeClass("active");
				rootMenus.css("height", "0").css("display", "none").removeClass("active");

				if (smallDeviceAlignment === "center") {
					rootMenus.find("a").css("text-align", "center");
				}
				else if (smallDeviceAlignment === "right") {
					rootMenus.find("a").css("text-align", "right");
				}
				else {
					rootMenus.find("a").css("text-align", "left");
				}

				rootMenus.find("a").css("padding-left", "1.25rem").css("padding-right", "1.25rem");				

				childMenus.css("margin-left", "0").removeClass("active");
				childMenus.parent().siblings().children(".nav-menu").hide();
				childMenus.hide();
			}

		};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navbarControl", {
		value: function (options) {

			var settings = ui.extend({
				transitionDuration: 300,
				smallDeviceAlignment: "left",
				largeDeviceOffset: -40,
				smallDeviceBreakpoint: "sm"
			}, options);

			transitionDuration = settings.transitionDuration;
			smallDeviceAlignment = settings.smallDeviceAlignment;
			largeDeviceOffset = settings.largeDeviceOffset;
			smallDeviceBreakpoint = settings.smallDeviceBreakpoint;


			var navbars = webui(this);
			var navItems = navbars.children(".nav-menu").children();
			var navButtons = navbars.find("[class*='nav-button']");

			var mq = null;
			var mqClassName = null;
			
			switch (smallDeviceBreakpoint) {
				case "xs": mq = window.matchMedia("(max-width: 29.99rem)"); mqClassName = "mq-xs"; break;
				case "sm": mq = window.matchMedia("(max-width: 39.99rem)"); mqClassName = "mq-sm"; break;
				case "md": mq = window.matchMedia("(max-width: 49.99rem)"); mqClassName = "mq-md"; break;
				case "lg": mq = window.matchMedia("(max-width: 69.99rem)"); mqClassName = "mq-lg"; break;
				case "xl": mq = window.matchMedia("(max-width: 89.99rem)"); mqClassName = "mq-xl"; break;
				default: mqClassName = "mq-sm"; break;
			}

			if (!mq.matches) {
				navbars.removeClass(mqClassName);
				navbars.children(".nav-menu").find("a").css("padding-left", "0").css("padding-right", "1.25rem");
			}
			else {
				navbars.addClass(mqClassName);
				navbars.find(".nav-menu").css("height", "0");

				if (smallDeviceAlignment === "center") {
					navbars.children(".nav-menu").find("a").css("text-align", "center");
				}
				else if (smallDeviceAlignment === "right") {
					navbars.children(".nav-menu").find("a").css("text-align", "right");
				}
				else {
					navbars.children(".nav-menu").find("a").css("text-align", "left");
				}

				navbars.children(".nav-menu").find("a").css("padding-left", "1.25rem").css("padding-right", "1.25rem");				
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

				var activeMenus = ui(this).nextSibling().children(".nav-menu");
			
				activeMenus.toggleClass("active").parent().siblings().children(".nav-menu").removeClass("active");

				if (!mq.matches) {
					navbars.removeClass(mqClassName);
					activeMenus.css("margin-left", "-" + ((parseFloat(ui(this).css("width"))) - largeDeviceOffset) + "px");

					if (activeMenus.css("display") === "none") {
						activeMenus.css("padding", "0");			
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

			});

			win.addEventListener("resize", navbarResize);

			function navbarResize() {
				resetNavbar(navbars, { largeDeviceOffset: largeDeviceOffset, smallDeviceBreakpoint: smallDeviceBreakpoint });
			};		


		}
	});

}(window));
	

