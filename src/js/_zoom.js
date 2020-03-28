
(function (win) {
	/* PRIVATE */
	var zoom = 1.05,
		trigger = "hover",
		transitionDuration = 500;


	/* PUBLIC */
	Object.defineProperty(webui.prototype, "zoomControl", {
		value: function (options) {
			var settings = ui.extend({
				zoom: 1.05,
				trigger: "hover",
				transitionDuration: 500
			}, options);

			zoom = settings.zoom;
			trigger = settings.trigger;
			transitionDuration = settings.transitionDuration;

			var els = webui(this);

			for (var i = 0; i < els.length; i++) {
				var el = webui(els[i]);
				el.css("transition", "all " + transitionDuration / 1e3 + "s ease-in");

				if (trigger === "hover") {
					el.hoverIn(function (e) {
						webui(this).css("transform", "scale(" + zoom + ")");
					});
					el.hoverOut(function (e) {
						webui(this).css("transform", "scale(1)");
					});
				}
				else if (trigger === "focus") {
					el.focus(function (e) {
						webui(this).css("transform", "scale(" + zoom + ")");
					});
					el.blur(function (e) {
						webui(this).css("transform", "scale(1)");
					});
				}
			}

		}
	});
})(window);
