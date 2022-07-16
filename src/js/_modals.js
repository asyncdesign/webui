
(function (win) {
	
	/* PRIVATE */

	var ModalInstance = function(modal, settings) {

		var

			transitionDuration = settings.transitionDuration,
			closeFromBackdrop = settings.closeFromBackdrop,
			disablePageScrolling = settings.disablePageScrolling,
			focusElement = settings.focusElement,
			focusReturnElement = settings.focusReturnElement,

			showModal = function () {
		
				if (modal) {
		
					modal.trigger("ui.modal.show.before");
					
					if (transitionDuration) {
						modal.fadeIn(transitionDuration).trigger("ui.modal.show.after");
					}
					else {
						modal.show().trigger("ui.modal.show.after");
					}
						
					if (disablePageScrolling) {
						var scrollShift = Math.floor(ui.getScrollbarWidth()) + "px";
						
						if (parseFloat(webui("body").css("height")) > win.innerHeight) {
							webui("body").css("padding-right", scrollShift);
							webui("body").css("overflow", "hidden");
						}
					}
					
					if (focusElement) {
						var focusEl = modal.find(focusElement).first();
			
						if (focusEl && !focusEl.hasClass("disabled")) {
							focusEl[0].focus();
						}	
						else {
							modal.attr("tabindex", "-1");
							modal[0].focus();
						}	
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
		
					modal.trigger("ui.modal.hide.before");
					
					if (transitionDuration) {
						modal.fadeOut(transitionDuration, 0, function() {
							if (disablePageScrolling) {
								webui("body").css("padding-right", "");
								webui("body").css("overflow", "");
							}

							modal.trigger("ui.modal.hide.after");
						});					
					}
					else {
						if (disablePageScrolling) {
							webui("body").css("padding-right", "");
							webui("body").css("overflow", "");
						}
						
						modal.hide().trigger("ui.modal.hide.after");
					}

					if (focusReturnElement) {
						var returnEl = webui(focusReturnElement).first();

						if (returnEl && !returnEl.hasClass("disabled")) {
							returnEl[0].focus();
						}
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

		modal.find(".modal-scroll-body").css("margin-right", -(ui.getScrollbarWidth() + 1) + "px");
			
	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "modalControl", {
		value: function (options) {

			var settings = ui.extend({			
				transitionDuration: 300,
				closeFromBackdrop: false,
				disablePageScrolling: true,
				focusElement: null,
				focusReturnElement: null
			}, options);

			if (this.length > 1) { console.warn("WebUI modals component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new ModalInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.transitionDuration !== undefined) { settings.transitionDuration = newSettings.transitionDuration; }
				if (newSettings.closeFromBackdrop !== undefined) { settings.closeFromBackdrop = newSettings.closeFromBackdrop; }
				if (newSettings.disablePageScrolling !== undefined) { settings.disablePageScrolling = newSettings.disablePageScrolling; }
				if (newSettings.focusElement !== undefined) { settings.focusElement = newSettings.focusElement; }
				if (newSettings.focusReturnElement !== undefined) { settings.focusReturnElement = newSettings.focusReturnElement; }
				control = new ModalInstance(this.first(), settings);	
			};


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
	

})(window);
		