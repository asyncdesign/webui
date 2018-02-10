
(function (win) {
	
	/* PRIVATE */

	var root = webui.root, 
		fn = webui.fn,
		transitionDuration;

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "modalControl", {
		value: function (options) {
			var el = this;

			var settings = ui.extend({
				closeFromBackdrop: false,
				transitionDuration: 300
			}, options);

			transitionDuration = settings.transitionDuration;
			
			if (settings.closeFromBackdrop) {
				el.closest(".modal").click(function (e) {
					if (e.target !== this) {
						return;
					}
					el.hideModal();
				});
			}
			return this;
		},
		enumerable: false
	});

	fn.showModal = function () {

		var modal = this;

		if (modal) {

			modal.trigger("ui.modal.show.before");
			
			if (transitionDuration) {
				modal.fadeIn(transitionDuration).trigger("ui.modal.show.after");
			}
			else {
				modal.show().trigger("ui.modal.show.after");
			}
							
			var scrollShift = Math.floor(ui.getScrollbarWidth()) + "px";
			
			if (parseFloat(webui(root).css("height")) > win.innerHeight) {
				webui("body").css("padding-right", scrollShift);
				webui("body").css("overflow", "hidden");
			}
			
			var focusEl = modal.find("input:not([type=hidden]), input:not([type=button]), input:not([type=submit]), input:not([type=reset]), input:not([type=image]), textarea, select");

			if (focusEl.length && !focusEl.hasClass("disabled")) {
				focusEl[0].focus();
			}

			modal.trigger("ui.modal.show.after");			
		}
		return this;
	};

	fn.hideModal = function () {

		var modal = this;

		if (modal) {

			webui("body").css("padding-right", "");
			webui("body").css("overflow", "");

			modal.trigger("ui.modal.hide.before");
			
			if (transitionDuration) {
				modal.fadeOut(transitionDuration).trigger("ui.modal.hide.after");					
			}
			else {
				modal.hide().parent().remove().trigger("ui.modal.hide.after");
			}
		}
		return this;
	};


	/* EVENTS */

	webui(".modal-close").click(function (e) {
		e.preventDefault();

		var modal = webui(this).closest(".modal");
		modal.trigger("ui.modal.hide.before").hideModal().trigger("ui.modal.hide.after");
	});


}(window));
		