
(function (win) {

	/* PRIVATE */



	/* PUBLIC */

	Object.defineProperty(webui.prototype, "zoomControl", {
		value: function (options) {

			var settings = ui.extend({
				zoomFactor: 1.05,
				trigger: "hover",
				transitionDuration: 500
			}, options);


			var controls = this;

			for (var i = 0; i < controls.length; i++) {

				var control = webui(controls[i]);
				
				control.css("transition", "all " + settings.transitionDuration / 1e3 + "s ease-in");

				if (settings.trigger === "hover") {
					control.hoverIn(function (e) {
						webui(this).css("transform", "scale(" + settings.zoomFactor + ")");
					});
					control.hoverOut(function (e) {
						webui(this).css("transform", "scale(1)");
					});
				}
				else if (settings.trigger === "focus") {
					control.focus(function (e) {
						webui(this).css("transform", "scale(" + settings.zoomFactor + ")");
					});
					control.blur(function (e) {
						webui(this).css("transform", "scale(1)");
					});
				}
			}

			return this;
		},
		enumerable: false

	});

})(window);