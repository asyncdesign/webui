
(function (win) {
	
	/* PRIVATE */

	var ToastInstance = function(container, settings) {

		var
			position = settings.position,
			width = settings.width,
			duration = settings.duration,
			transitionDuration = settings.transitionDuration,
			toastItemTemplate = settings.toastItemTemplate,
			displayOrder = settings.displayOrder,
			autoHide = settings.autoHide,

			showToastItem = function() {

				var toastContainer = container.removeClass("*").addClass("toast-container toast-" + position).css("width", width);
				var itemTemplate = webui(toastItemTemplate);

				if (itemTemplate.length) {

					var toastItem = webui(itemTemplate[0].cloneNode(true));

					if (displayOrder.toLowerCase() === "descending") {
						toastItem.appendTo(toastContainer);
					}
					else {
						if (toastContainer.find(".toast-item").length > 0) {
							toastItem.prependTo(toastContainer);
						}
						else {
							toastItem.appendTo(toastContainer);
						}
					}

					toastItem.trigger("ui.toastitem.show.before");
	
					if (transitionDuration) {
						toastItem.fadeIn(transitionDuration).trigger("ui.toastitem.show.after");
					}
					else {
						toastItem.show().trigger("ui.toastitem.show.after");
					}

					if (autoHide) {
						setTimeout(function() {
							hideToastItem(toastItem);
						}, duration);
					}	

					var toastClose = toastItem.find(".toast-close");
					if (toastClose.length > 0) {
						toastClose.first().click(function () {
							hideToastItem(toastItem);
						});
					}
				
				}
					
			},

			hideToastItem = function(toastItem) {

				if (toastItem) {
		
					toastItem.trigger("ui.toastitem.hide.before");
					
					if (transitionDuration) {
		
						toastItem.fadeOut(transitionDuration).trigger("ui.toastitem.hide.after");
						
						setTimeout(function() {
							toastItem.remove();
						}, transitionDuration);
						
					}
					else {
						toastItem.hide().trigger("ui.toastitem.hide.after");
					}
				}
			};


		this.showToastItem = function () {
			showToastItem();
		};

	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "toastControl", {
		value: function (options) {

			var settings = ui.extend({
				position: "top-right",
				width: "25rem",
				duration: 3000,
				transitionDuration: 300,
				toastItemTemplate: null,
				displayOrder: "ascending",
				autoHide: false
			}, options);

			if (this.length > 1) { console.warn("WebUI toast component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new ToastInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.position) { settings.position = newSettings.position; }
				if (newSettings.width) { settings.width = newSettings.width; }
				if (newSettings.duration) { settings.duration = newSettings.duration; }
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }
				if (newSettings.toastItemTemplate) { settings.toastItemTemplate = newSettings.toastItemTemplate; }
				if (newSettings.displayOrder) { settings.displayOrder = newSettings.displayOrder; }
				if (newSettings.autoHide) { settings.autoHide = newSettings.autoHide; }
				control = new ToastInstance(this.first(), settings);	
			};

			this.showToastItem = function () {
				control.showToastItem();	
			};

			return this;
		},
		enumerable: false
	});

})(window);
		