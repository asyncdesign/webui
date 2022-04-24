
(function (win) {
	
	/* PRIVATE */


	
	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navButtonControl", {
		value: function (options) {

			var settings = ui.extend({
				transitionDuration: 300, 
				backgroundColor: "#BDBDBD", 
				color: "#000000"
			}, options);

			var controls = this;

			for (var i = 0; i < controls.length; i++) {
				
				var control = webui(controls[i]);

				control.append("<span class='nav-button-item'></span><span class='nav-button-item'></span><span class='nav-button-item'></span>");
				control.find(".nav-button-item").css("display", "block").css("transition-duration", settings.transitionDuration / 1000 + "s");

				control.css("background-color", settings.backgroundColor);
				control.find(".nav-button-item").css("background-color", settings.color);	
			}	
			
			return this;
		},
		enumerable: false
		
	});

})(window);
	

