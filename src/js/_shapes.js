
(function (win) {
    
    /* PRIVATE */

    var fn = webui.fn;
    
    var getGuid = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
            return v.toString(16);
        });
    };
    
    var rhombusClipShapes = webui(".rhombus-clip-shape");
    for (var i = 0; i < rhombusClipShapes.length; i++ ) {
        var rhombusClipShape = webui(rhombusClipShapes[i]);
        var svgChildren = rhombusClipShape.children("svg");
        if (!svgChildren.length) {
            var id = getGuid();
            rhombusClipShape.attr("style", "clip-path: url('#" + id + "')");
            webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='0.5 0, 1 0.5, 0.5 1, 0 0.5' /></clipPath></defs></svg>").appendTo(rhombusClipShape);
        }
    }
    
    var rhomboidClipShapes = webui(".rhomboid-clip-shape");
    for (var i = 0; i < rhomboidClipShapes.length; i++ ) {
        var rhomboidClipShape = webui(rhomboidClipShapes[i]);
        var svgChildren = rhomboidClipShape.children("svg");
        if (!svgChildren.length) {
            var id = getGuid();
            rhomboidClipShape.attr("style", "clip-path: url('#" + id + "')");
            webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='0 1, 0.3 0, 1 0, 0.7 1' /></clipPath></defs></svg>").appendTo(rhomboidClipShape);
        }
    }
    
    var kiteClipShapes = webui(".kite-clip-shape");
    for (var i = 0; i < kiteClipShapes.length; i++ ) {
        var kiteClipShape = webui(kiteClipShapes[i]);
        var svgChildren = kiteClipShape.children("svg");
        if (!svgChildren.length) {
            var id = getGuid();
            kiteClipShape.attr("style", "clip-path: url('#" + id + "')");
            webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='0.5 0, 1 0.3, 0.5 1, 0 0.3' /></clipPath></defs></svg>").appendTo(kiteClipShape);
        }
    }
    
    var trapezoidIsoscelesClipShapes = webui(".trapezoid-isosceles-clip-shape");
    for (var i = 0; i < trapezoidIsoscelesClipShapes.length; i++ ) {
        var trapezoidIsoscelesClipShape = webui(trapezoidIsoscelesClipShapes[i]);
        var svgChildren = trapezoidIsoscelesClipShape.children("svg");
        if (!svgChildren.length) {
            var id = getGuid();
            trapezoidIsoscelesClipShape.attr("style", "clip-path: url('#" + id + "')");
            webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='0 1, 0.3 0, 0.7 0, 1 1' /></clipPath></defs></svg>").appendTo(trapezoidIsoscelesClipShape);
        }
    }
    
    var triangleIsoscelesClipShapes = webui(".triangle-isosceles-clip-shape");
    for (var i = 0; i < triangleIsoscelesClipShapes.length; i++ ) {
        var triangleIsoscelesClipShape = webui(triangleIsoscelesClipShapes[i]);
        var svgChildren = triangleIsoscelesClipShape.children("svg");
        if (!svgChildren.length) {
            var id = getGuid();
            triangleIsoscelesClipShape.attr("style", "clip-path: url('#" + id + "')");
            webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='0 1, 0.5 0, 0.5 0, 1 1' /></clipPath></defs></svg>").appendTo(triangleIsoscelesClipShape);
        }
    }
    
    var pentagonClipShapes = webui(".pentagon-clip-shape");
    for (var i = 0; i < pentagonClipShapes.length; i++ ) {
        var pentagonClipShape = webui(pentagonClipShapes[i]);
        var svgChildren = pentagonClipShape.children("svg");
        if (!svgChildren.length) {
            var id = getGuid();
            pentagonClipShape.attr("style", "clip-path: url('#" + id + "')");
            webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='0.5 0, 1 0.4, 0.8 1, 0.2 1, 0 0.4' /></clipPath></defs></svg>").appendTo(pentagonClipShape);
        }
    }
    
    var starClipShapes = webui(".star-clip-shape");
    for (var i = 0; i < starClipShapes.length; i++ ) {
        var starClipShape = webui(starClipShapes[i]);
        var svgChildren = starClipShape.children("svg");
        if (!svgChildren.length) {
            var id = getGuid();
            starClipShape.attr("style", "clip-path: url('#" + id + "')");
            webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='0.5 0, 0.63 0.38, 1 0.38, 0.69 0.59, 0.82 1, 0.5 0.75, 0.18 1, 0.31 0.59, 0 0.38, 0.37 0.38' /></clipPath></defs></svg>").appendTo(starClipShape);
        }
    }
    
    var getTransformShapeParameters = function(shape) {
        var units = shape.data("size") !== undefined && isNaN(shape.data("size")) ? shape.data("size").split(/(\d+)/).filter(Boolean) : [ "10", "rem" ];
        var sizeUnits = [];
        var number = "";
        for (var i = 0; i < units.length; i++) {
            if (i < units.length - 1) {
                number += units[i];
            }
        }
        sizeUnits.push(number);
        sizeUnits.push(units[units.length - 1]);
        var shapeRotation = shape.data("rotation") !== undefined ? shape.data("rotation") : 0;
        var shapeClassName = shape.data("class") !== undefined ? shape.data("class") : "background-default";
        return {
            size: parseFloat(sizeUnits[0]),
            units: sizeUnits[1],
            rotation: shapeRotation,
            class: shapeClassName
        };
    };
    
    var isoscelesShapes = webui(".isosceles-shape");
    for (var i = 0; i < isoscelesShapes.length; i++ ) {
        var shape = webui(isoscelesShapes[i]);
        var params = getTransformShapeParameters(shape);
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size / 1.285714285714286 + params.units);
        shapeContainer.css("height", params.size / 1.285714285714286 + params.units);
        shapeContainer.css("transform", "rotate(45deg) translateX(" + params.size / 5.294087 + params.units + ") translateY(" + params.size / 5.294087 + params.units + ")");
        var shapeInner = webui("<div></div>");
        shapeInner.css("overflow", "hidden");
        shapeInner.css("width", params.size + params.units);
        shapeInner.css("height", params.size + params.units);
        shapeInner.css("transform", "rotate(-45deg) translateY(" + params.size / -1.415 + params.units + ")");
        var shapeContent = webui("<div></div>");
        shapeContent.css("overflow", "hidden");
        shapeContent.css("width", params.size + params.units);
        shapeContent.css("height", params.size + params.units);
        shapeContent.css("transform", "translateY(" + params.size / 3.857142857142857 + params.units + ")");
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeInner);
        shapeInner.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    var rhombusShapes = webui(".rhombus-shape");
    for (var i = 0; i < rhombusShapes.length; i++ ) {
        var shape = webui(rhombusShapes[i]);
        var params = getTransformShapeParameters(shape);
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size / 1.44 + params.units);
        shapeContainer.css("height", params.size / 1.44 + params.units);
        shapeContainer.css("transform", "rotate(45deg)");
        var shapeContent = webui("<div></div>");
        shapeContent.css("width", params.size + params.units);
        shapeContent.css("height", params.size + params.units);
        shapeContent.css("transform", "rotate(-45deg) translateY(" + params.size / -4.56 + params.units + ")");
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    var parallelogramShapes = webui(".parallelogram-shape");
    for (var i = 0; i < parallelogramShapes.length; i++ ) {
        var shape = webui(parallelogramShapes[i]);
        var params = getTransformShapeParameters(shape);
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size + params.units);
        shapeContainer.css("height", params.size / 1.538461538461538 + params.units);
        shapeContainer.css("transform", "rotate(-70deg)");
        var shapeInner = webui("<div></div>");
        shapeInner.css("overflow", "hidden");
        shapeInner.css("width", params.size + params.units);
        shapeInner.css("height", params.size / 1.538461538461538 + params.units);
        shapeInner.css("transform", "rotate(70deg)");
        var shapeContent = webui("<div></div>");
        shapeContent.css("overflow", "hidden");
        shapeContent.css("width", params.size + params.units);
        shapeContent.css("height", params.size + params.units);
        shapeContent.css("transform", "translateY(" + params.size / -4.56 + params.units + ")");
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeInner);
        shapeInner.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    var diamondShapes = webui(".diamond-shape");
    for (var i = 0; i < diamondShapes.length; i++ ) {
        var shape = webui(diamondShapes[i]);
        var params = getTransformShapeParameters(shape);
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size / 1.384615384615385 + params.units);
        shapeContainer.css("height", params.size / 1.384615384615385 + params.units);
        shapeContainer.css("transform", "rotate(45deg)");
        var shapeInner = webui("<div></div>");
        shapeInner.css("overflow", "hidden");
        shapeInner.css("width", params.size / 1.125 + params.units);
        shapeInner.css("height", params.size / 1.125 + params.units);
        shapeInner.css("transform", "rotate(-45deg)");
        var shapeContent = webui("<div></div>");
        shapeContent.css("width", params.size + params.units);
        shapeContent.css("height", params.size + params.units);
        shapeContent.css("transform", "translateX(" + params.size / -18 + params.units + ") translateY(" + params.size / -12 + params.units + ")");
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeInner);
        shapeInner.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    var hexagonShapes = webui(".hexagon-shape");
    for (var i = 0; i < hexagonShapes.length; i++ ) {
        var shape = webui(hexagonShapes[i]);
        var params = getTransformShapeParameters(shape);
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size / 1.168831168831169 + params.units);
        shapeContainer.css("height", params.size * 1.038888888888889 + params.units);
        shapeContainer.css("transform", "rotate(120deg)");
        var shapeInnerFirst = webui("<div></div>");
        shapeInnerFirst.css("overflow", "hidden");
        shapeInnerFirst.css("width", params.size / 1.168831168831169 + params.units);
        shapeInnerFirst.css("height", params.size * 1.038888888888889 + params.units);
        shapeInnerFirst.css("transform", "rotate(-60deg)");
        var shapeInnerSecond = webui("<div></div>");
        shapeInnerSecond.css("overflow", "hidden");
        shapeInnerSecond.css("width", params.size / 1.168831168831169 + params.units);
        shapeInnerSecond.css("height", params.size * 1.038888888888889 + params.units);
        shapeInnerSecond.css("transform", "rotate(-60deg)");
        var shapeContent = webui("<div></div>");
        shapeContent.css("width", params.size + params.units);
        shapeContent.css("height", params.size + params.units);
        shapeContent.css("transform", "translateX(" + params.size / -14 + params.units + ") translateY(" + params.size / 50 + params.units + ")");
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeInnerSecond);
        shapeInnerSecond.appendTo(shapeInnerFirst);
        shapeInnerFirst.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    var octagonShapes = webui(".octagon-shape");
    for (var i = 0; i < octagonShapes.length; i++ ) {
        var shape = webui(octagonShapes[i]);
        var params = getTransformShapeParameters(shape);
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size + params.units);
        shapeContainer.css("height", params.size + params.units);
        shapeContainer.css("transform", "rotate(45deg)");
        var shapeInner = webui("<div></div>");
        shapeInner.css("overflow", "hidden");
        shapeInner.css("width", params.size + params.units);
        shapeInner.css("height", params.size + params.units);
        shapeInner.css("transform", "rotate(-45deg)");
        var shapeContent = webui("<div></div>");
        shapeContent.css("width", params.size + params.units);
        shapeContent.css("height", params.size + params.units);
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeInner);
        shapeInner.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    var diamondFlatShapes = webui(".diamond-flat-shape");
    for (var i = 0; i < diamondFlatShapes.length; i++ ) {
        var shape = webui(diamondFlatShapes[i]);
        var params = getTransformShapeParameters(shape);
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size / 1.45 + params.units);
        shapeContainer.css("height", params.size / 1.45 + params.units);
        shapeContainer.css("transform", "rotate(45deg)");
        var shapeInner = webui("<div></div>");
        shapeInner.css("overflow", "hidden");
        shapeInner.css("width", params.size * .9999999999999997 + params.units);
        shapeInner.css("height", params.size * .84375 + params.units);
        shapeInner.css("transform", "rotate(-45deg) translateX(" + params.size / -19 + params.units + ")");
        var shapeContent = webui("<div></div>");
        shapeContent.css("width", params.size + params.units);
        shapeContent.css("height", params.size + params.units);
        shapeContent.css("transform", "translateY(" + params.size / -6.5 + params.units + ")");
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeInner);
        shapeInner.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    var scaleneLeftShapes = webui(".scalene-left-shape");
    for (var i = 0; i < scaleneLeftShapes.length; i++ ) {
        var shape = webui(scaleneLeftShapes[i]);
        var params = getTransformShapeParameters(shape);
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size / 2.5 + params.units);
        shapeContainer.css("height", params.size / 1.090909090909091 + params.units);
        shapeContainer.css("transform", "rotate(-70deg)");
        var shapeInner = webui("<div></div>");
        shapeInner.css("overflow", "hidden");
        shapeInner.css("width", params.size + params.units);
        shapeInner.css("height", params.size / 3 + params.units);
        shapeInner.css("transform", "rotate(70deg) translateX(" + params.size / 5.4 + params.units + ") translateY(" + params.size / 5.4 + params.units + ")");
        var shapeContent = webui("<div></div>");
        shapeContent.css("width", params.size + params.units);
        shapeContent.css("height", params.size + params.units);
        shapeContent.css("transform", "translateY(" + params.size / -4 + params.units + ")");
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeInner);
        shapeInner.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    var scaleneRightShapes = webui(".scalene-right-shape");
    for (var i = 0; i < scaleneRightShapes.length; i++ ) {
        var shape = webui(scaleneRightShapes[i]);
        var params = getTransformShapeParameters(shape);
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size / 2.5 + params.units);
        shapeContainer.css("height", params.size / 1.090909090909091 + params.units);
        shapeContainer.css("transform", "rotate(70deg)");
        var shapeInner = webui("<div></div>");
        shapeInner.css("overflow", "hidden");
        shapeInner.css("width", params.size + params.units);
        shapeInner.css("height", params.size / 3 + params.units);
        shapeInner.css("transform", "rotate(-70deg) translateX(" + params.size / -2.575 + params.units + ") translateY(" + params.size / -2.63 + params.units + ")");
        var shapeContent = webui("<div></div>");
        shapeContent.css("width", params.size + params.units);
        shapeContent.css("height", params.size + params.units);
        shapeContent.css("transform", "translateY(" + params.size / -4 + params.units + ")");
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeInner);
        shapeInner.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    var customShapes = webui(".custom-shape");
    for (var i = 0; i < customShapes.length; i++ ) {
        var shape = webui(customShapes[i]);
        var params = getTransformShapeParameters(shape);
        var modifiers = shape.data("modifiers") !== undefined ? shape.data("modifiers").split(/((^[-+]?([0-9]+)(\.[0-9]+)?)$)/)[0].split(",") : [ "0.9", "0.8", "-110", "-.05", "0", "0.9", "0.8", "110", ".1", ".12", "1", "1", "0", "-0.1", "-0.1" ];
        var containerWidthScale = modifiers.length > 0 ? parseFloat(modifiers[0]) : 0;
        var containerHeightScale = modifiers.length > 1 ? parseFloat(modifiers[1]) : 0;
        var containerRotate = modifiers.length > 2 ? parseFloat(modifiers[2]) : 0;
        var containerXTranlateScale = modifiers.length > 3 ? parseFloat(modifiers[3]) : 0;
        var containerYTranlateScale = modifiers.length > 4 ? parseFloat(modifiers[4]) : 0;
        var innerWidthScale = modifiers.length > 5 ? parseFloat(modifiers[5]) : 0;
        var innerHeightScale = modifiers.length > 6 ? parseFloat(modifiers[6]) : 0;
        var innerRotate = modifiers.length > 7 ? parseFloat(modifiers[7]) : 0;
        var innerXTranlateScale = modifiers.length > 8 ? parseFloat(modifiers[8]) : 0;
        var innerYTranlateScale = modifiers.length > 9 ? parseFloat(modifiers[9]) : 0;
        var contentWidthScale = modifiers.length > 10 ? parseFloat(modifiers[10]) : 0;
        var contentHeightScale = modifiers.length > 11 ? parseFloat(modifiers[11]) : 0;
        var contentRotate = modifiers.length > 12 ? parseFloat(modifiers[12]) : 0;
        var contentXTranlateScale = modifiers.length > 13 ? parseFloat(modifiers[13]) : 0;
        var contentYTranlateScale = modifiers.length > 14 ? parseFloat(modifiers[14]) : 0;
        shape.css("box-sizing", "border-box");
        shape.css("transform", "rotate(" + params.rotation + "deg)");
        var shapeContainer = webui("<div></div>");
        shapeContainer.css("overflow", "hidden");
        shapeContainer.css("width", params.size * containerWidthScale + params.units);
        shapeContainer.css("height", params.size * containerHeightScale + params.units);
        shapeContainer.css("transform", "rotate(" + containerRotate + "deg) translateX(" + params.size * containerXTranlateScale + params.units + ") translateY(" + params.size * containerYTranlateScale + params.units + ")");
        var shapeInner = webui("<div></div>");
        shapeInner.css("overflow", "hidden");
        shapeInner.css("width", params.size * innerWidthScale + params.units);
        shapeInner.css("height", params.size * innerHeightScale + params.units);
        shapeInner.css("transform", "rotate(" + innerRotate + "deg) translateX(" + params.size * innerXTranlateScale + params.units + ") translateY(" + params.size * innerYTranlateScale + params.units + ")");
        var shapeContent = webui("<div></div>");
        shapeContent.css("width", params.size * contentWidthScale + params.units);
        shapeContent.css("height", params.size * contentHeightScale + params.units);
        shapeContent.css("transform", "rotate(" + contentRotate + "deg) translateX(" + params.size * contentXTranlateScale + params.units + ") translateY(" + params.size * contentYTranlateScale + params.units + ")");
        shapeContent.addClass(params.class);
        shapeContent.appendTo(shapeInner);
        shapeInner.appendTo(shapeContainer);
        shapeContainer.appendTo(shape);
    }
    
    /* PUBLIC */
    
    fn.renderPolygonShape = function(polygonPoints) {
		var shape, id;
		for (var i = 0; i < this.length; i++ ) {
			shape = webui(this[i]);
			id = getGuid();
			shape.attr("style", "clip-path: url('#" + id + "')");
			webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='" + polygonPoints + "' /></clipPath></defs></svg>").appendTo(shape);
		}
		return this;
    };
    
}(window));
    