
(function (win) {
		
	/* PRIVATE */

	var transitionDuration,
		transitionType,

	selectTab = function (element) {
		var tabId = element.attr("href");
		if (!tabId) {
			tabId = element.data("target");
		}
		var prevTabId = element.parents(".tabs").find(tabId).siblings(".tab-item.selected").attr("id");
		var curTabId = tabId.replace("#", "");

		element.trigger("ui.tabs.change.before", [ "#" + prevTabId, "#" + curTabId ]);

		var activeTab = element.parents(".tabs").find(tabId);
		
		if (transitionType === "fade") {
			activeTab.show().children().fadeIn(transitionDuration, 0.5);
		}
		else if (transitionType === "collapse") {
			activeTab.expandVertical(transitionDuration);
		}
		else {
			activeTab.show();
		}
		activeTab.addClass("selected");

		if (transitionType === "fade") {
			activeTab.siblings(".tab-item").removeClass("selected").hide().children().fadeOut(1);
			activeTab.parent(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").removeClass("selected").hide().children().fadeOut(1);
			activeTab.parent(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").removeClass("selected").hide().children().fadeOut(1);			
			activeTab.find(".tabs").find(".tab-item").first().show().children().fadeIn(transitionDuration, 0.5);
			activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").removeClass("selected").hide().children().fadeOut(1);
		}
		else if (transitionType === "collapse") {
			activeTab.siblings(".tab-item").collapseVertical(1).removeClass("selected");
			activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").collapseVertical(1).removeClass("selected");
			activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").collapseVertical(1).removeClass("selected");			
			activeTab.find(".tabs").find(".tab-item").first().expandVertical(transitionDuration);			
			activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").collapseVertical(1).removeClass("selected");
		}
		else {
			activeTab.siblings(".tab-item").hide().removeClass("selected");			
			activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").hide().removeClass("selected");
			activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").hide().removeClass("selected");			
			activeTab.find(".tabs").find(".tab-item").first().show();						
			activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").hide().removeClass("selected");			
		}
		
		element.trigger("ui.tabs.change.after", [ "#" + prevTabId, "#" + curTabId ]);
	};


	/* PUBLIC */

	Object.defineProperty(webui.prototype, "tabControl", {
		value: function (options) {

			var settings = ui.extend({
				activeTabId: null,
				activeTabFocused: false,
				transitionDuration: 300,
				transitionType: "fade"
			}, options);

			transitionDuration = settings.transitionDuration;
			transitionType = settings.transitionType;

			if (settings.activeTabId) {
				var activeTab = this.find(settings.activeTabId);

				activeTab.addClass("selected");
			}
			if (settings.activeTabFocused) {
				var href = this.find("[href='" + settings.activeTabId + "']");
				if (href.length) {
					href[0].focus();
				}
				var dataTarget = this.find("[data-target='" + settings.activeTabId + "']");
				if (dataTarget.length) {
					dataTarget[0].focus();
				}
			}
			else {
				var tab = this.find(".tab-activator").first();
				if (tab.length) {
					tab[0].focus();
				}
			}
			return this;
		}
	});

	webui(".tab-activator").click(function(e) {
		e.preventDefault();
		var element = webui(this);
		if (element) {
			selectTab(element);
		}
	});

	webui(".tab-activator").focus(function(e) {
		e.preventDefault();
		var element = webui(this);
		if (element) {
			selectTab(element);
		}
	});

}(window));
		