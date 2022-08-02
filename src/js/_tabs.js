
(function (win) {
		
	/* PRIVATE */

	var TabsInstance = function(tabs, settings) {

		var 
		activeTabId = settings.activeTabId,
		activeTabFocused = settings.activeTabFocused,
		transitionDuration = settings.transitionDuration,
		transitionType = settings.transitionType,

		selectTab = function (tabActivator) {

			var tabId = tabActivator.data("target");

			if (tabId) {

				var prevTabId = "#" + tabActivator.parents(".tabs").find(".tab-item.selected").last().attr("id");

				tabActivator.parents(".tabs").find(".tab-item").removeClass("selected");

				tabActivator.trigger("ui.tabs.change.before", [ prevTabId, tabId ]);

				var activeTab = tabActivator.parents(".tabs").find(tabId).first();
				
				if (transitionType === "fade") {
					activeTab.show().children().fadeIn(transitionDuration);
				}
				else if (transitionType === "collapse") {
					activeTab.show().children().expandVertical({ duration: transitionDuration });
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
					activeTab.siblings(".tab-item").hide().children().collapseVertical({ duration: transitionDuration });
					activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").hide().children().collapseVertical({ duration: transitionDuration });
					activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").hide().children().collapseVertical({ duration: transitionDuration });			
					activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").hide().children().collapseVertical({ duration: transitionDuration });

					activeTab.find(".tabs").find(".tab-item").first().show().children().expandVertical({ duration: transitionDuration });			
				}
				else {
					activeTab.siblings(".tab-item").hide();			
					activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").hide();
					activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").hide();			
					activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").hide();
					
					activeTab.find(".tabs").find(".tab-item").first().show();									
				}
				
				tabActivator.trigger("ui.tabs.change.after", [ prevTabId, tabId ]);
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

			if (activeTabId) {

				var dataTarget = tabs.find("[data-target='" + activeTabId + "']").first();
				if (dataTarget) {
					dataTarget[0].click();
					dataTarget.addClass("selected");
					if (activeTabFocused) {
						dataTarget[0].focus();
					}
				}
				else {
					var href = tabs.find("[href='" + activeTabId + "']").first();
					if (href) {
						href[0].click();
						href.addClass("selected");
						if (activeTabFocused) {
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

		},

		resetTabs = function() {

			tabs.find(".tab-item").children().attr("style", "");
			setActiveTab();
						
		};


		this.updateInstance = function (newSettings) {

			if (newSettings.activeTabId !== undefined) { activeTabId = newSettings.activeTabId; }
			if (newSettings.activeTabFocused !== undefined) { activeTabFocused = newSettings.activeTabFocused; }
			if (newSettings.transitionDuration !== undefined) { transitionDuration = newSettings.transitionDuration; }
			if (newSettings.transitionType !== undefined) { transitionType = newSettings.transitionType; }

			resetTabs();
		};


		/* EVENTS */

		initializeTabEvents(function() {
			setActiveTab();
		});			

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

			this.update = function (newSettings) {
				control.updateInstance(newSettings);
			};
	
			return this;
		},
		enumerable: false
	});

})(window);
		