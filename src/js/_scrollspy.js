
(function (win) {

  /* PRIVATE */

  var

    resetScrollspy = function (controls, settings) {
      
      var scrollTargets = webui(document).find("." + settings.scrollTargetClass);

      for (var i = 0; i < scrollTargets.length; i++) {
        var el = webui(scrollTargets[i]);
        var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

        if (el[0].offsetTop <= scrollPos + settings.scrollTargetOffset) {

          var id = el.attr("id");
          var activeItem = controls.find("[data-scrollspy='#" + id + "']");

          if (!activeItem) {
            return;
          }

          controls.find(settings.activatorSelector).removeClass(settings.activatorActiveClass);
          activeItem.addClass(settings.activatorActiveClass);
        }
      }
    };

  /* PUBLIC */

  Object.defineProperty(webui.prototype, "scrollspyControl", {
    value: function (options) {

      var settings = ui.extend({
        activatorSelector: "li > a",
        activatorActiveClass: "active",
        scrollTargetClass: "scroll-target",
        scrollTargetOffset: 0,
        activatorCallback: null
      }, options);

      var controls = this;

      resetScrollspy(controls, settings);

      if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
        win.addEventListener("scroll", function () {
          resetScrollspy(controls, settings);
        });
      }

      if (settings.activatorCallback) {
        var activators = controls.find(settings.activatorSelector);
        for (var i = 0; i < activators.length; i++) {
          activators[i].addEventListener("click", function () {
            settings.activatorCallback();
          });
        }
      }

      return this;
    },
    enumerable: false
  });

})(window);