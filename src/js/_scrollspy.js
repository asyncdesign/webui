
(function(win) {

	/* PRIVATE */
	
    var fn = webui.fn,
    
    resetScrollspy = function(menuRoot, settings) {
        var scrollTargets = webui(document).find("." + settings.scrollTargetClass);

        for (var i = 0; i < scrollTargets.length; i++) {
            var el = webui(scrollTargets[i]);
            var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

            if (el[0].offsetTop <= scrollPos + settings.scrollTargetOffset) {

                var id = el.attr("id");
				var activeItem = menuRoot.find("[data-scrollspy='#" + id + "']");
				
                if (!activeItem) {
                    return;
				}
				
                menuRoot.find(settings.menuSelector).removeClass(settings.menuActiveClass);
                activeItem.addClass(settings.menuActiveClass);
            }
        }
    };
    
	/* PUBLIC */
	
    Object.defineProperty(webui.prototype, "scrollspy", {
        value: function(options) {
            var settings = ui.extend({
                menuSelector: "li > a",
                menuActiveClass: "active",
                scrollTargetClass: "scrollspy",
                scrollTargetOffset: 0
			}, options);
			
			var menuRoot = this;
			
            if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
                win.addEventListener("scroll", function() {
                    resetScrollspy(menuRoot, settings);
                });
			}
			
            return this;
        }
	});
	
})(window);