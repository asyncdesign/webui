
(function (win) {

	/* PRIVATE */



	/* PUBLIC */

	Object.defineProperty(webui.prototype, "focusTrapControl", {
		value: function (options) {

			var settings = ui.extend({
				firstFocusElement: null,
				lastFocusElement: null
			}, options);


			if (this.length > 1) { console.warn("WebUI focusTrap component does not support initialising multiple controls. Initialize a new component instead.") }

			var context = this.first();
							
			var firstFocusEl = context.find(settings.firstFocusElement).first();
			var lastFocusEl = context.find(settings.lastFocusElement).first();

			if (firstFocusEl.length && lastFocusEl.length) {

				var focusStart = context.find("[data-webui-focus-start]").first();
				var focusEnd = context.find("[data-webui-focus-end]").first();

				if (!focusStart.length) {
					context.append("<div tabindex='0' data-webui-focus-start></div>", true);
				}
				if (!focusEnd.length) {
					context.append("<div tabindex='0' data-webui-focus-end></div>");
				}

				focusStart = context.find("[data-webui-focus-start]").first();
				if (focusStart.length) {
					focusStart.focusIn(function() {
						lastFocusEl.setFocus();
					});
					focusEnd = context.find("[data-webui-focus-end]").first();
					if (focusEnd.length) {
						focusEnd.focusIn(function() {
							firstFocusEl.setFocus();
						});
					}
				}

			}


			return this;
		},
		enumerable: false

	});

})(window);