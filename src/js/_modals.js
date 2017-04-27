
(function (webui, ui, $, undefined) {

	/* PRIVATE */


    /* PUBLIC */

    $.fn.modalControl = function (options) {
		var settings = $.extend({
            closeFromBackdrop: false
        }, options );

		if (settings.closeFromBackdrop) {
			this.closest(".modal").click(function (e) {
				if (e.target !== this) {
					return;
				}
				ui.hideModal(this);
			});
		}

        return this;
    };

	ui.showModal = function (selector) {

		var modal = $(selector);

		if (modal) {

			modal.trigger("ui.modal.show.before");

			modal.show();
			
			var scrollShift = Math.floor(ui.getScrollbarWidth()) + "px";		

			$("body").css("padding-right", scrollShift);
			$("body").css("overflow", "hidden");

			modal.find("input, textarea, select")
					.not("input[type=hidden],input[type=button],input[type=submit],input[type=reset],input[type=image],button")
					.filter(":enabled:visible:first")
					.focus();

			modal.trigger("ui.modal.show.after");			
		}
	};

	ui.hideModal = function (selector) {

		var modal = $(selector);

		if (modal) {

			modal.trigger("ui.modal.hide.before");

			$("body").css("padding-right", "");
			$("body").css("overflow", "");

			modal.hide();

			modal.trigger("ui.modal.hide.after");
		}
	};


} (window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery));
