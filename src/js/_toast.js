
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

					toastItem.trigger("ui.toast.show.before");
	
					if (transitionDuration) {
						toastItem.fadeIn(transitionDuration).trigger("ui.toast.show.after");
					}
					else {
						toastItem.show().trigger("ui.toast.show.after");
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
		
					toastItem.trigger("ui.toast.hide.before");
					
					if (transitionDuration) {
		
						toastItem.fadeOut(transitionDuration).trigger("ui.toast.hide.after");
						
						setTimeout(function() {
							toastItem.remove();
						}, transitionDuration);
						
					}
					else {
						toastItem.hide().trigger("ui.toast.hide.after");
					}
				}
			};


		this.showToastItem = function () {
			showToastItem();
		};

		this.updateInstance = function (newSettings) {

			if (newSettings.position !== undefined) { position = newSettings.position; }
			if (newSettings.width !== undefined) { width = newSettings.width; }
			if (newSettings.duration !== undefined) { duration = newSettings.duration; }
			if (newSettings.transitionDuration !== undefined) { transitionDuration = newSettings.transitionDuration; }
			if (newSettings.toastItemTemplate !== undefined) { toastItemTemplate = newSettings.toastItemTemplate; }
			if (newSettings.displayOrder !== undefined) { displayOrder = newSettings.displayOrder; }
			if (newSettings.autoHide !== undefined) { autoHide = newSettings.autoHide; }
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

			this.showToastItem = function () {
				control.showToastItem();	
			};

			this.update = function (newSettings) {
				control.updateInstance(newSettings);
			};

			return this;
		},
		enumerable: false
	});

})(window);
		