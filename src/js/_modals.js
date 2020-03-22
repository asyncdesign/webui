
(function (win) {
	
	/* PRIVATE */

	var ModalInstance = function(modal, settings) {

	var

		transitionDuration = settings.transitionDuration,
		closeFromBackdrop = settings.closeFromBackdrop,

		showModal = function () {
	
			if (modal) {
	
				modal.trigger("ui.modal.show.before");
				
				if (transitionDuration) {
					modal.fadeIn(transitionDuration).trigger("ui.modal.show.after");
				}
				else {
					modal.show().trigger("ui.modal.show.after");
				}
								
				var scrollShift = Math.floor(ui.getScrollbarWidth()) + "px";
				
				if (parseFloat(webui("body").css("height")) > win.innerHeight) {
					webui("body").css("padding-right", scrollShift);
					webui("body").css("overflow", "hidden");
				}
				
				var focusEl = modal.find("input:not([type=hidden]), input:not([type=button]), input:not([type=submit]), input:not([type=reset]), input:not([type=image]), textarea, select");
	
				if (focusEl.length && !focusEl.hasClass("disabled")) {
					focusEl[0].focus();
				}	
				else {
					modal.attr("tabindex", "-1");
					modal[0].focus();
				}	
			}
			return this;
		},
	
		hideModal = function () {
	
			if (modal) {
	
				webui("body").css("padding-right", "");
				webui("body").css("overflow", "");
	
				modal.trigger("ui.modal.hide.before");
				
				if (transitionDuration) {
					modal.fadeOut(transitionDuration).trigger("ui.modal.hide.after");					
				}
				else {
					modal.hide().trigger("ui.modal.hide.after");
				}
			}
			return this;
		};

		this.openModal = function () {
			showModal();
		};
	
		this.closeModal = function () {	
			hideModal();
		};

		
		if (closeFromBackdrop) {
			modal.click(function (e) {
				if (e.target !== this) {
					return;
				}
				hideModal();
			});
		}

		modal.find(".modal-close").click(function (e) {
			e.preventDefault();
			hideModal();
		});
	
		modal.keyDown(function (e) {	
			if (e.which == 27) {
				e.preventDefault();
				hideModal();
			}
		});	

			
	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "modalControl", {
		value: function (options) {

			var settings = ui.extend({			
				transitionDuration: 300,
				closeFromBackdrop: false
			}, options);

			var control = new ModalInstance(this, settings);

			this.open = function () {
				control.openModal();	
			};
		
			this.close = function () {		
				control.closeModal();	
			};	
			
			return this;
		},
		enumerable: false
	});
	

	/* RUN */

	webui.ready (function() {
		webui(".modal-scroll-body").css("margin-right", -(ui.getScrollbarWidth() + 1) + "px");
	});

}(window));
		