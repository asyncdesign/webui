
(function (win) {
		
	/* PRIVATE */

	var TabsInstance = function(tabs, settings) {

		var 
			transitionDuration = settings.transitionDuration,
			transitionType = settings.transitionType,

			selectTab = function (tabAcivator) {

				var tabId = tabAcivator.data("target");

				if (tabId) {

					var prevTabId = "#" + tabAcivator.parents(".tabs").find(".tab-item.selected").last().attr("id");

					tabAcivator.parents(".tabs").find(".tab-item").removeClass("selected");

					tabAcivator.trigger("ui.tabs.change.before", [ prevTabId, tabId ]);

					var activeTab = tabAcivator.parents(".tabs").find(tabId).first();
					
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
					
					tabAcivator.trigger("ui.tabs.change.after", [ prevTabId, tabId ]);
				}
			},

			initializeTabEvents = function (callback) {

				tabs.find(".tab-activator").click(function (e) {
					e.preventDefault();
					var activators = webui(this);

					if (activators.length) {
						selectTab(activators.first());
					}
				});
			
				tabs.find(".tab-activator-focus").focus(function (e) {
					e.preventDefault();
					var activators = webui(this);

					if (activators.length) {
						selectTab(activators.first());
					}	
				});
				callback();
			},

			setActiveTab = function () {

				if (settings.activeTabId) {
					var dataTarget = tabs.find("[data-target='" + settings.activeTabId + "']").first();
					if (dataTarget) {
						dataTarget[0].click();
						dataTarget.addClass("selected");
						if (settings.activeTabFocused) {
							dataTarget[0].focus();
						}
					}
					else {
						var href = tabs.find("[href='" + settings.activeTabId + "']").first();
						if (href) {
							href[0].click();
							href.addClass("selected");
							if (settings.activeTabFocused) {
								href[0].focus();
							}
						}							
					}
				}
				else {
					var tab = tabs.find(".tab-activator").last().siblings().last();
					if (tab.length) {
						tab[0].click();
					}
					else {
						tab = tabs.find(".tab-activator-focus").last().siblings().last();
						if (tab.length) {
							tab[0].click();
						}
					}
				}		
	
			};

			this.initializeTabs = function () {

				initializeTabEvents(function() {
					setActiveTab();
				});
				
			};

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

			if (this.length > 1) { console.warn("WebUI tabs component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new TabsInstance(this.first(), settings);

			control.initializeTabs();

	
			return this;
		},
		enumerable: false
	});

})(window);
		