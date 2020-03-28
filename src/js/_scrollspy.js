
(function(win) {

	/* PRIVATE */
	
    var
    
      resetScrollspy = function(container, settings) {
          var scrollTargets = webui(document).find("." + settings.scrollTargetClass);

          for (var i = 0; i < scrollTargets.length; i++) {
              var el = webui(scrollTargets[i]);
              var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

              if (el[0].offsetTop <= scrollPos + settings.scrollTargetOffset) {

                  var id = el.attr("id");
                  var activeItem = container.find("[data-scrollspy='#" + id + "']");
                  
                  if (!activeItem) {
                      return;
                  }
                  
                  container.find(settings.activatorSelector).removeClass(settings.activatorActiveClass);
                  activeItem.addClass(settings.activatorActiveClass);
              }
          }
      };
    
	/* PUBLIC */
	
  Object.defineProperty(webui.prototype, "scrollspy", {
    value: function(options) {

      var settings = ui.extend({
          activatorSelector: "li > a",
          activatorActiveClass: "active",
          scrollTargetClass: "scrollspy",
          scrollTargetOffset: 0,
          activatorCallback: null
      }, options);
    
      var container = this;

      resetScrollspy(container, settings);
    
      if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
        win.addEventListener("scroll", function() {
          resetScrollspy(container, settings);
        });
      }
        
      if (settings.activatorCallback) {
          var menuItems = container.find(settings.activatorSelector);
          for (var i = 0; i < menuItems.length; i++) {
              menuItems[i].addEventListener("click", function () {
                  settings.activatorCallback();
              });  
          }  
      }			
      return this;
    }
	});
	
})(window);