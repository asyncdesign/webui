
(function (webui, ui, $, undefined) {

	/* PRIVATE */


    /* PUBLIC */

    $.fn.tabControl = function (options) {
		var settings = $.extend({
            activeTabId: null,
			activeTabFocused: false
        }, options );

		if (settings.activeTabId) {
			this.find(settings.activeTabId).show().addClass("selected");
			this.find(settings.activeTabId).siblings(".tab-item").hide().removeClass("selected");
		}

		if (settings.activeTabFocused) {
			this.find("[href='" + settings.activeTabId + "']").focus();
			this.find("[data-target='" + settings.activeTabId + "']").focus();
		}

        return this;
    };

	$(".tab-activator").click( function(e) {
		e.preventDefault();

		var element = $(this);
		
		if (element) {

			var tabId = element.attr("href");

			if (!tabId) {		
				tabId = element.data("target");
			}

			var prevTabId = element.parents(".tabs").find(tabId)
				.siblings(".tab-item.selected").prop("id");
			var curTabId = tabId.replace("#", "");
			

			element.trigger("ui.tabs.change.before", [prevTabId, curTabId]);

			element.parents(".tabs").find(tabId).show().addClass("selected");
			element.parents(".tabs").find(tabId)
				.siblings(".tab-item").hide().removeClass("selected");
		
			element.trigger("ui.tabs.change.after", [prevTabId, curTabId]);	
		}			

	});


} (window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery));
