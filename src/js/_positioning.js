
(function (win) {
        
    /* PRIVATE */

    var fn = webui.fn;

    /* PUBLIC */

    fn.snapPosition = function(targetElement, position, unit) {
        var args = arguments,
            target = webui(targetElement),
            els = this, el, context;

        if (args.length > 0 && target.length) {

            for (var i = 0; i < els.length; i++) {
                el = webui(els[i]);

                if (!target.parent().hasClass("snapTargetContext")) {
                    context = webui("<div></div>").addClass("snapTargetContext").css("position", "absolute");
                    context.appendTo(target.parent());
                    target.appendTo(context);
                }

                el.css("position", "absolute").appendTo(context);

                var pos = position && position.length === 2 ? position : [0, 0];

                var x = pos[0];
                var y = pos[1];

                var u = unit && typeof unit === "string" ? unit : "px";

                var targetWidth = target[0].offsetWidth;
                var targetHeight = target[0].offsetHeight;
                var centerX = u === "rem" ? ui.pxToRem(targetWidth / 2) : targetWidth / 2;
                var centerY = u === "rem" ? ui.pxToRem(targetHeight / 2) : targetHeight / 2;

                var elWidth = u === "rem" ? ui.pxToRem(el[0].offsetWidth / 2) : el[0].offsetWidth / 2;
                var elHeight = u === "rem" ? ui.pxToRem(el[0].offsetHeight / 2) : el[0].offsetHeight / 2;

                el.css("left", centerX - elWidth + x + u);
                el.css("top", centerY - elHeight + y + u);
            }
        }
        return this;
    };

}(window));
    