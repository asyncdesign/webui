
(function (win) {
        
    /* PRIVATE */

    var fn = webui.fn;

    /* PUBLIC */

    fn.snapPosition = function(targetElement, position, cssUnit, origin) {
        var args = arguments,
            target = webui(targetElement),
            els = this, el, wrapper;

        if (args.length > 0 && target.length) {

            if (!target.parent().hasClass("snap-target-context")) {
                wrapper = webui("<div></div>").addClass("snap-target-context").css("position", "absolute");
                wrapper.appendTo(target.parent());
                target.appendTo(wrapper);
            }
            else {
                wrapper = target;
            }

            for (var i = 0; i < els.length; i++) {
                el = webui(els[i]);

                el.css("position", "absolute").appendTo(wrapper);

                var pos = position && position.length === 2 ? position : [0, 0];

                var posX = pos[0];
                var posY = pos[1];

                var unit = args.length > 2 && cssUnit && typeof cssUnit === "string" ? cssUnit : "px";

                var targetWidth = target[0].offsetWidth;
                var targetHeight = target[0].offsetHeight;

                var originX, originY, elWidth, elHeight;

                var x = targetWidth / 2;
                var y = targetHeight / 2;

                if (args.length === 4 && origin && typeof origin === "string") {
                    if (origin === "top-left") {
                        x = 0; y = 0;
                    }
                    else if (origin === "top-center") {
                        x = targetWidth / 2; y = 0;
                    }
                    else if (origin === "top-right") {
                        x = targetWidth; y = 0;
                    }
                    else if (origin === "middle-left") {
                        x = 0; y = targetHeight / 2;                   
                    }
                    else if (origin === "middle-center") {
                        x = targetWidth / 2; y = targetHeight / 2;                   
                    }
                    else if (origin === "middle-right") {
                        x = targetWidth; y = targetHeight / 2;
                    }
                    else if (origin === "bottom-left") {
                        x = 0; y = targetHeight;
                    }
                    else if (origin === "bottom-center") {
                        x = targetWidth / 2; y = targetHeight;
                    }
                    else if (origin === "bottom-right") {
                        x = targetWidth; y = targetHeight;
                    } 
                    originX = unit === "rem" ? ui.pxToRem(x) : x;
                    originY = unit === "rem" ? ui.pxToRem(y) : y;                                                                       
                }
                else {
                    originX = unit === "rem" ? ui.pxToRem(x) : x;
                    originY = unit === "rem" ? ui.pxToRem(y) : y;
                }

                elWidth = unit === "rem" ? ui.pxToRem(el[0].offsetWidth / 2) : el[0].offsetWidth / 2;
                elHeight = unit === "rem" ? ui.pxToRem(el[0].offsetHeight / 2) : el[0].offsetHeight / 2; 

                el.css("left", originX - elWidth + posX + unit);
                el.css("top", originY - elHeight + posY + unit);
            }
        }
        return this;
    };

}(window));
    