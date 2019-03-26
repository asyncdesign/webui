
(function (win) {
		
	/* PRIVATE */

	var 
		transitionDuration,
		transitionType,

		selectTab = function (element) {
			var tabId = element.attr("href");
			if (!tabId) {
				tabId = element.data("target");
			}
			var prevTabId = element.parents(".tabs").find(".tab-item.selected").last().attr("id");
			var curTabId = tabId.replace("#", "");

			element.parents(".tabs").find(".tab-item").removeClass("selected");

			element.trigger("ui.tabs.change.before", [ "#" + prevTabId, "#" + curTabId ]);

			var activeTab = element.parents(".tabs").find(tabId);
			
			if (transitionType === "fade") {
				activeTab.show().children().fadeIn(transitionDuration);
			}
			else if (transitionType === "collapse") {
				activeTab.expandVertical(transitionDuration, "auto");
			}
			else {
				activeTab.show();
			}

			
			activeTab.addClass("selected");

			if (transitionType === "fade") {
				activeTab.siblings(".tab-item").hide().children().fadeOut(transitionDuration);
				activeTab.parent(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").hide().children().fadeOut(transitionDuration);
				activeTab.parent(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").hide().children().fadeOut(transitionDuration);			
				activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").hide().children().fadeOut(transitionDuration);
				
				activeTab.find(".tabs").find(".tab-item").first().show().children().fadeIn(transitionDuration);			
			}
			else if (transitionType === "collapse") {
				activeTab.siblings(".tab-item").collapseVertical(transitionDuration);
				activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").collapseVertical(transitionDuration);
				activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").collapseVertical(transitionDuration);			
				activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").collapseVertical(transitionDuration);

				activeTab.find(".tabs").find(".tab-item").first().expandVertical(transitionDuration, "auto");						
			}
			else {
				activeTab.siblings(".tab-item").hide();			
				activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").hide();
				activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").hide();			
				activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").hide();
				
				activeTab.find(".tabs").find(".tab-item").first().show();									
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
				var href = this.find("[href='" + settings.activeTabId + "']");
				if (href.length) {
					href[0].click();
					href.addClass("selected");
					if (settings.activeTabFocused) {
						href[0].focus();
					}
				}
				else {
					var dataTarget = this.find("[data-target='" + settings.activeTabId + "']");
					if (dataTarget.length) {
						dataTarget[0].click();
						dataTarget.addClass("selected");
						if (settings.activeTabFocused) {
							dataTarget[0].focus();
						}
					}
					else {
						var activeTab = this.find(settings.activeTabId);
						if (activeTab.length) {
							activeTab.addClass("selected");
							activeTab[0].click();
							if (settings.activeTabFocused) {
								activeTab[0].focus();
							}	
						}							
					}
				}
			}
			else {
				var tab = this.find(".tab-activator").last().siblings().last();
				if (tab.length) {
					tab[0].click();
				}
				else {
					tab = this.find(".tab-activator-focus").last().siblings().last();
					if (tab.length) {
						tab[0].click();
					}
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

	webui(".tab-activator-focus").focus(function(e) {
		e.preventDefault();
		var element = webui(this);
		if (element) {
			selectTab(element);
		}
	});

}(window));
		