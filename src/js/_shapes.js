
(function (win) {

  /* PRIVATE */

  var fn = webui.fn;


  /* PUBLIC */

  fn.renderPolygonShape = function (polygonPoints) {
    var shape, id;
    for (var i = 0; i < this.length; i++) {
      shape = webui(this[i]);
      id = ui.getGuid();
      shape.attr("style", "clip-path: url('#" + id + "')");
      webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='" + polygonPoints + "' /></clipPath></defs></svg>").appendTo(shape);
    }
    return this;
  };

  fn.createRhombusShape = function () {
    this.renderPolygonShape("0.5 0, 1 0.5, 0.5 1, 0 0.5");
    return this;
  };

  fn.createRhomboidShape = function () {
    this.renderPolygonShape("0 1, 0.3 0, 1 0, 0.7 1");
    return this;
  };

  fn.createKiteShape = function () {
    this.renderPolygonShape("0.5 0, 1 0.3, 0.5 1, 0 0.3");
    return this;
  };

  fn.createTrapezoidIsoscelesShape = function () {
    this.renderPolygonShape("0 1, 0.3 0, 0.7 0, 1 1");
    return this;
  };

  fn.createTriangleIsoscelesShape = function () {
    this.renderPolygonShape("0 1, 0.5 0, 0.5 0, 1 1");
    return this;
  };

  fn.createPentagonShape = function () {
    this.renderPolygonShape("0.5 0, 1 0.4, 0.8 1, 0.2 1, 0 0.4");
    return this;
  };

  fn.createStarShape = function () {
    this.renderPolygonShape("0.5 0, 0.63 0.38, 1 0.38, 0.69 0.59, 0.82 1, 0.5 0.75, 0.18 1, 0.31 0.59, 0 0.38, 0.37 0.38");
    return this;
  };

})(window);
