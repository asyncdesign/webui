
(function (win) {
	
	/* PRIVATE */

	var

		transitionDuration = 300;

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navButtonControl", {
		value: function (options) {

			var settings = ui.extend({
				transitionDuration: 300
			}, options);

			transitionDuration = settings.transitionDuration;


			var navButtons = webui(this);

			navButtons.append("<span class='nav-button-item'></span><span class='nav-button-item'></span><span class='nav-button-item'></span>");
			navButtons.find(".nav-button-item").css("display", "block").css("transition-duration", transitionDuration / 1000 + "s");

			var color = ui.rgbStringToHex(navButtons.css("color"));
			var backgroundColor = ui.getAccessibilityContrastColor(color);
			navButtons.find(".nav-button-item").css("background-color", backgroundColor);

		}
	});

}(window));
	

