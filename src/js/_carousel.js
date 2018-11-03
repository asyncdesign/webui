
(function (win) {
	
	/* PRIVATE */
	
	var fn = webui.fn,
		interval,
		autoPlay,
		autoScale,
		playDirection,
		stopOnHover,
		transitionDuration,
		transitionType,
		transitionOrientation,

		carousel,
		carouselHolder,
		carouselItems,
		carouselItemCount,
		
		carouselItemWidth = 0,
		carouselItemHeight = 0,

		itemBorderWidth = 0,
		itemBorderHeight = 0,

		current = 1,
		cycle = false,
		delta = 1,		
		transitionCompleted = true,

		shift = function(dir) {
			current += delta;
			cycle = !!(current === 0 || current > carouselItemCount);
	
			if (cycle) {
				current = (current === 0)? carouselItemCount : 1; 
				if (transitionOrientation === "vertical" && 
					transitionType === "slide") {
					carouselHolder.css(dir, "-" + (carouselItemHeight * current) + "px");
				}
				else {
					carouselHolder.css(dir, "-" + (carouselItemWidth * current) + "px");
				}
			}		
		},
		
		resetCarousel = function(carousel, itemCount, isResizeEvent) {

			if (autoScale) {

				carousel.css("width", "100%");
				
				carouselHolder = carousel.find(".carousel-item-holder");
				carouselItems = carouselHolder.find(".carousel-item");

				if (isResizeEvent) {
						carouselItems.css("width", carousel[0].offsetWidth - itemBorderWidth + "px").css("height", "auto");
				} else {
						carouselItems.css("width", carousel[0].offsetWidth - itemBorderWidth + "px").css("height", carousel[0].offsetHeight - itemBorderHeight + "px");
				}

				win.setTimeout(function() {
					carouselItemWidth = ui.getAvgWidth(carouselItems);
					carouselItemHeight = ui.getAvgHeight(carouselItems);
					
					if (transitionOrientation === "vertical" && transitionType === "slide") {
							var h = carouselItemHeight * itemCount + carouselItemHeight * 3;
							var t = carouselItemHeight * current;
							carouselHolder.css("top", "-" + t + "px").css("height", h + "px").css("width", carouselItemWidth + "px");
					} else {
							var w = carouselItemWidth * itemCount + carouselItemWidth * 3;
							var l = carouselItemWidth * current;
							carouselHolder.css("width", w + "px").css("height", carouselItemHeight + "px").css("left", "-" + l + "px");
					}

					carousel.css("width", carouselItemWidth + "px").css("height", carouselItemHeight + "px");					
				}, 100);
			}
			else {
				
				carouselHolder = carousel.find(".carousel-item-holder");
				carouselItems = carouselHolder.find(".carousel-item");

				carouselItems.css("width", carousel[0].clientWidth + "px").css("height", carousel[0].clientHeight + "px");

				win.setTimeout(function() {
					carouselItemWidth = ui.getMaxWidth(carouselItems);
					carouselItemHeight = ui.getMaxHeight(carouselItems);

					carouselItems.children().css("width", carouselItemWidth - itemBorderWidth + "px").css("height", carouselItemHeight - itemBorderHeight + "px");

					if (transitionOrientation === "vertical" && transitionType === "slide") {
							var h = carouselItemHeight * itemCount + carouselItemHeight * 3;
							var t = carouselItemHeight * current;
							carouselHolder.css("height", h + "px").css("width", carouselItemWidth + "px").css("top", "-" + t + "px");
					} else {
							var w = carouselItemWidth * itemCount + carouselItemWidth * 3;
							var l = carouselItemWidth * current;
							carouselHolder.css("width", w + "px").css("height", carouselItemHeight + "px").css("left", "-" + l + "px");
					}	
				}, 100);				
			}
		};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "carouselControl", {
		value: function (options) {

			var settings = ui.extend({
				interval: 10000,
				autoPlay: true,
				autoScale: true,
				playDirection: "next",
				stopOnHover: true,
				transitionDuration: 1500,
				transitionType: "slide",
				transitionOrientation: "horizontal"
			}, options);

			interval = settings.interval;
			autoPlay = settings.autoPlay;
			autoScale = settings.autoScale;
			playDirection = settings.playDirection;
			stopOnHover = settings.stopOnHover;
			transitionDuration = settings.transitionDuration;
			transitionType = settings.transitionType;
			transitionOrientation = settings.transitionOrientation;

			if (this.length > 1 || webui(".carousel").length > 1) {			
				carousel = this.first();
				console.error("Multiple carousels are not supported in WebUI.");
			}
			else {
				carousel = this;
			}

			carousel.css("display", "block");
			carouselHolder = carousel.find(".carousel-item-holder").css("display", "block");     
			carouselItems = carouselHolder.find(".carousel-item");
			carouselItemCount = carouselItems.length;

			if (carouselItemCount) {
				carouselItems.css("display", transitionOrientation === "vertical" && transitionType === "slide" ? "block" : "inline-block").css("float", "left").children().css("width", "100%").css("display", "block").css("margin", "0");
				itemBorderWidth = parseFloat(carouselItems.first().css("borderLeftWidth")) + parseFloat(carouselItems.first().css("borderRightWidth"));
				itemBorderHeight = parseFloat(carouselItems.first().css("borderTopWidth")) + parseFloat(carouselItems.first().css("borderBottomWidth"));

				resetCarousel(carousel, carouselItemCount);

				if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
						win.onresize = function() {
								resetCarousel(carousel, carouselItemCount, true);
						};
				}

				webui(carouselItems.last()[0].cloneNode(true)).prependTo(carouselHolder);
				webui(carouselItems.first()[0].cloneNode(true)).appendTo(carouselHolder);
				
				if (autoPlay) {
						carousel.play();
						if (stopOnHover) {
								carousel.hoverIn(function() {
										carousel.stop();
								});
								carousel.hoverOut(function() {
										carousel.play();
								});
						}
				}
			}
			return this;

		},
		enumerable: false
	});


	fn.prev = function () {

		if (transitionCompleted) {

			transitionCompleted = false;

			delta = -1;


			carousel.trigger("ui.carousel.change.before", [current]);

			if (transitionType === "fade") {
				carouselHolder.fadeOut(1000, 0.5, function (element) {
					element.slideHorizontal("right", carouselItemWidth, 0, function (element) {
						shift("left");
						element.fadeIn(transitionDuration, 0, function (element) {
							transitionCompleted = true;
							carousel.trigger("ui.carousel.change.after", [current]);
						});
					});
				});
			}
			else if (transitionType === "slide") {
				if (transitionOrientation === "vertical") {
					carouselHolder.slideVertical("down", carouselItemHeight, transitionDuration, function (element) {
						shift("top");
						transitionCompleted = true;
						carousel.trigger("ui.carousel.change.after", [current]);
					});
				}
				else {
					carouselHolder.slideHorizontal("right", carouselItemWidth, transitionDuration, function (element) {
						shift("left");
						transitionCompleted = true;
						carousel.trigger("ui.carousel.change.after", [current]);
					});
				}
			}
		}
		return this;
	};

	fn.next = function () {

		if (transitionCompleted) {

			transitionCompleted = false;

			delta = 1;

			carousel.trigger("ui.carousel.change.before", [current]);

			if (transitionType === "fade") {
				carouselHolder.fadeOut(1000, 0.5, function (element) {
					element.slideHorizontal("left", carouselItemWidth, 0, function (element) {
						shift("left");
						element.fadeIn(transitionDuration, 0, function (element) {							
							transitionCompleted = true;
							carousel.trigger("ui.carousel.change.after", [current]);
						});
					});
				});
			}
			else if (transitionType === "slide") {
				if (transitionOrientation === "vertical") {
					carouselHolder.slideVertical("up", carouselItemHeight, transitionDuration, function(element) {
						shift("top");
						transitionCompleted = true;
						carousel.trigger("ui.carousel.change.after", [current]);
					});
				}
				else {
					carouselHolder.slideHorizontal("left", carouselItemWidth, transitionDuration, function(element) {
						shift("left");
						transitionCompleted = true;
						carousel.trigger("ui.carousel.change.after", [current]);
					});
				}
			}
		}
		return this;
	};

	fn.select = function (index) {

		carousel.trigger("ui.carousel.change.before", [current]);

		if (!isNaN(index) && (index >= 0 && index <= carouselItemCount)) {

			current = parseInt(index) + 1;

			if (transitionOrientation === "vertical" && transitionType === "slide") {
				carouselHolder.css("top", "-" + (carouselItemHeight * current) + "px");
			}
			else {
				carouselHolder.css("left", "-" + (carouselItemWidth * current) + "px");
			}
			transitionCompleted = true;
		}

		carousel.trigger("ui.carousel.change.after", [current]);
		
		return this;
	};


	fn.play = function () {

		clearInterval(this.run);
		
		if (playDirection === "next") {
			this.run = setInterval(function() {
				carousel.next();
			}, interval);
		}
		else if (playDirection === "prev") {
			this.run = setInterval(function() {
				carousel.prev();
			}, interval);					
		}

		return this;	
	};		


	fn.stop = function () {

		clearInterval(this.run);

		return this;	
	};		

}(window));
		