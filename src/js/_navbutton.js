
(function (win) {
	
	/* PRIVATE */

	var

		transitionDuration = 300, 
		backgroundColor = "#BDBDBD", 
		color = "#000000";

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navButtonControl", {
		value: function (options) {

			var settings = ui.extend({
				transitionDuration: 300, 
				backgroundColor: "#BDBDBD", 
				color: "#000000"
			}, options);

			transitionDuration = settings.transitionDuration;
			backgroundColor = settings.backgroundColor;
			color = settings.color;

			var navButtons = webui(this);

			navButtons.append("<span class='nav-button-item'></span><span class='nav-button-item'></span><span class='nav-button-item'></span>");
			navButtons.find(".nav-button-item").css("display", "block").css("transition-duration", transitionDuration / 1000 + "s");

			navButtons.css("background-color", backgroundColor);
			navButtons.find(".nav-button-item").css("background-color", color);			
		}
		
	});

}(window));
	

