
(function (win) {
		
	/* PRIVATE */

	var 
		transitionDuration,
		transitionType,

		selectTab = function (tabAcivator) {

			var tabId = tabAcivator.attr("href");
			if (!tabId) {
				tabId = tabAcivator.data("target");
			}
			var prevTabId = tabAcivator.parents(".tabs").find(".tab-item.selected").last().attr("id");
			var curTabId = tabId.replace("#", "");

			tabAcivator.parents(".tabs").find(".tab-item").removeClass("selected");

			tabAcivator.trigger("ui.tabs.change.before", [ "#" + prevTabId, "#" + curTabId ]);

			var activeTab = tabAcivator.parents(".tabs").find(tabId);
			
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
			
			tabAcivator.trigger("ui.tabs.change.after", [ "#" + prevTabId, "#" + curTabId ]);
		},

		initialiseTabEvents = function (control) {

			control.find(".tab-activator").click(function (e) {
				e.preventDefault();
				var activators = webui(this);

				if (activators.length) {
					selectTab(activators.first());
				}
			});
		
			control.find(".tab-activator-focus").focus(function (e) {
				e.preventDefault();
				var activators = webui(this);

				if (activators.length) {
					selectTab(activators.first());
				}	
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

			transitionDuration = settings.transitionDuration;
			transitionType = settings.transitionType;

			if (this.length > 1) { console.warn("WebUI tabs component does not support initialising multiple controls.") }

			var control = this.first();

			initialiseTabEvents(control);


			if (settings.activeTabId) {
				var href = control.find("[href='" + settings.activeTabId + "']");
				if (href.length) {
					href[0].click();
					href.addClass("selected");
					if (settings.activeTabFocused) {
						href[0].focus();
					}
				}
				else {
					var dataTarget = control.find("[data-target='" + settings.activeTabId + "']");
					if (dataTarget.length) {
						dataTarget[0].click();
						dataTarget.addClass("selected");
						if (settings.activeTabFocused) {
							dataTarget[0].focus();
						}
					}
					else {
						var activeTab = control.find(settings.activeTabId);
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
				var tab = control.find(".tab-activator").last().siblings().last();
				if (tab.length) {
					tab[0].click();
				}
				else {
					tab = control.find(".tab-activator-focus").last().siblings().last();
					if (tab.length) {
						tab[0].click();
					}
				}
			}		
	
			return this;
		},
		enumerable: false
	});

})(window);
		