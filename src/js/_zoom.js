
(function (win) {

	/* PRIVATE */

	var 
	
		zoomFactor = 1.05,
		trigger = "hover",
		transitionDuration = 500;


	/* PUBLIC */

	Object.defineProperty(webui.prototype, "zoomControl", {
		value: function (options) {

			var settings = ui.extend({
				zoomFactor: 1.05,
				trigger: "hover",
				transitionDuration: 500
			}, options);

			zoomFactor = settings.zoomFactor;
			trigger = settings.trigger;
			transitionDuration = settings.transitionDuration;

			var zoomObjects = webui(this);

			for (var i = 0; i < zoomObjects.length; i++) {

				var zoomObject = webui(zoomObjects[i]);
				
				zoomObject.css("transition", "all " + transitionDuration / 1e3 + "s ease-in");

				if (trigger === "hover") {
					zoomObject.hoverIn(function (e) {
						webui(this).css("transform", "scale(" + zoomFactor + ")");
					});
					zoomObject.hoverOut(function (e) {
						webui(this).css("transform", "scale(1)");
					});
				}
				else if (trigger === "focus") {
					zoomObject.focus(function (e) {
						webui(this).css("transform", "scale(" + zoomFactor + ")");
					});
					zoomObject.blur(function (e) {
						webui(this).css("transform", "scale(1)");
					});
				}
			}

			return this;
		},
		enumerable: false

	});

})(window);