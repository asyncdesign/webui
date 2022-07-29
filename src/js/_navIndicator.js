
(function (win) {
	
	/* PRIVATE */


	
	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navIndicatorControl", {
		value: function (options) {

			var settings = ui.extend({
				indicatorType: "caret",
				indicatorSize: "medium",
				backgroundColor: "transparent", 
				color: "#000000",
				transitionDuration: 500
			}, options);

			var controls = this;
			var size = settings.indicatorSize === "small" ? "16" : settings.indicatorSize === "medium" ? "20" : settings.indicatorSize === "large" ? "24" : "20";

			for (var i = 0; i < controls.length; i++) {
				
				var control = webui(controls[i]);

				control.append("<span class='indicator-item'>");

				var indicator = control.children(".indicator-item").first();

				if (indicator) {

					if (settings.indicatorType === "arrow") {
						indicator.css("background-image", "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='M12 20L12 4' stroke='" +  settings.color.replace(/#/i, '%23') + "' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5 13L12 20L19 13' stroke='" +  settings.color.replace(/#/i, '%23') + "' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")");
					}
					else if (settings.indicatorType === "caret") {
						indicator.css("background-image", "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' fill='" +  settings.color.replace(/#/i, '%23') + "' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")");
					}
					else if (settings.indicatorType === "chevron") {
						indicator.css("background-image", "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' fill='" +  settings.color.replace(/#/i, '%23') + "' viewBox='0 0 16 16'%3E%3Cpath d='M12.2929,5.292875 C12.6834,4.902375 13.3166,4.902375 13.7071,5.292875 C14.0976,5.683375 14.0976,6.316555 13.7071,6.707085 L8.70711,11.707085 C8.31658,12.097605 7.68342,12.097605 7.29289,11.707085 L2.29289,6.707085 C1.90237,6.316555 1.90237,5.683375 2.29289,5.292875 C2.68342,4.902375 3.31658,4.902375 3.70711,5.292875 L8,9.585765 L12.2929,5.292875 Z'/%3E%3C/svg%3E\")");
					}
					
					indicator.css("background-color", settings.backgroundColor);
					indicator.css("transition-duration", settings.transitionDuration / 1000 + "s");
				}

			}	
			
			return this;
		},
		enumerable: false
		
	});

})(window);
	

