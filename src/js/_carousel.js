
(function (win) {
	
	/* PRIVATE */
	
	var CarouselInstance = function(carousel, settings) { 
		
		var 
			interval = settings.interval,
			autoPlay = settings.autoPlay,
			autoScale = settings.autoScale,
			playDirection = settings.playDirection,
			stopOnHover = settings.stopOnHover,
			transitionDuration = settings.transitionDuration,
			transitionType = settings.transitionType,
			transitionOrientation = settings.transitionOrientation,
			width = settings.width,
			height = settings.height,
		
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

			run = null,

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
			swap = function(callback) {

				if (delta === 1)
				{           
						if (current === carouselItemCount) {
								current = 1;
						}
						else {
								current += 1;
						}            
				}
				else {
						if (current === 1) {
								current = carouselItemCount;
						}
						else {
								current -= 1;
						}
				}
				if (callback) callback();
			},
			resetCarousel = function(carousel, itemCount, isResizeEvent) {

				if (autoScale) {

					carousel.css("width", "100%");
					
					carouselHolder = carousel.find(".carousel-item-holder");
					carouselItems = carouselHolder.find(".carousel-item").css("width", carousel[0].offsetWidth + "px").css("height", "auto");
	
					carouselItemWidth = parseFloat(ui(carouselItems[current - 1]).css("width"));
					carouselItemHeight = parseFloat(ui(carouselItems[current - 1]).css("height"));

					if (transitionType === "crossfade") {
						carouselHolder.css("width", carouselItemWidth + "px");
					}
					else {	
						if (transitionOrientation === "vertical" && transitionType === "slide") {
								var h = carouselItemHeight * itemCount + carouselItemHeight * 3;
								var t = carouselItemHeight * current;
								carouselHolder.css("top", "-" + t + "px").css("height", h + "px").css("width", carouselItemWidth + "px");
						} else {
								var w = carouselItemWidth * itemCount + carouselItemWidth * 3;
								var l = carouselItemWidth * current;
								carouselHolder.css("width", w + "px").css("height", carouselItemHeight + "px").css("left", "-" + l + "px");
						}
					}
					carousel.css("width", carouselItemWidth + "px").css("height", carouselItemHeight + "px");
				}
				else {
					
					carouselHolder = carousel.find(".carousel-item-holder");
					carouselItems = carouselHolder.find(".carousel-item").css("width", carousel[0].clientWidth + "px").css("height", carousel[0].clientHeight + "px");

					carouselItemWidth = parseFloat(ui(carouselItems[current - 1]).css("width"));
					carouselItemHeight = parseFloat(ui(carouselItems[current - 1]).css("height"));

					carouselItems.children().css("width", carouselItemWidth - itemBorderWidth + "px").css("height", carouselItemHeight - itemBorderHeight + "px");

					if (transitionType === "crossfade") {
						carouselHolder.css("height", carouselItemHeight + "px").css("width", carouselItemWidth + "px");
					}
					else {
						if (transitionOrientation === "vertical" && transitionType === "slide") {
								var h = carouselItemHeight * itemCount + carouselItemHeight * 3;
								var t = carouselItemHeight * current;
								carouselHolder.css("height", h + "px").css("width", carouselItemWidth + "px").css("top", "-" + t + "px");
						} else {
								var w = carouselItemWidth * itemCount + carouselItemWidth * 3;
								var l = carouselItemWidth * current;
								carouselHolder.css("width", w + "px").css("height", carouselItemHeight + "px").css("left", "-" + l + "px");
						}	
					}
				}
			},
			prevSlide = function () {

				if (transitionCompleted) {
		
					transitionCompleted = false;
		
					delta = -1;
		
					carousel.trigger("ui.carousel.change.before", [current]);
		
					if (transitionType === "fade") {
						carouselHolder.fadeOut(transitionDuration, 0.9, function (element) {
							element.slideHorizontal("right", carouselItemWidth, 0, function (element) {
								shift("left");
								element.fadeIn(transitionDuration, 0.3, function (element) {
									transitionCompleted = true;
									carousel.trigger("ui.carousel.change.after", [current]);
								});
							});
						});
					}
					else if (transitionType === "crossfade") {          
						swap(function() {
								var items = carouselHolder.find(".carousel-item");

								items.eq(current - 1).fadeIn(transitionDuration, 0, function() {                  
										items.eq(current - 1).siblings(".carousel-item").fadeOut(transitionDuration, 0, function() {

												transitionCompleted = true;
												carousel.trigger("ui.carousel.change.after", [ current ]);
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
			},		
			nextSlide = function () {
		
				if (transitionCompleted) {
		
					transitionCompleted = false;
		
					delta = 1;
		
					carousel.trigger("ui.carousel.change.before", [current]);
		
					if (transitionType === "fade") {
						carouselHolder.fadeOut(transitionDuration, 0.9, function (element) {
							element.slideHorizontal("left", carouselItemWidth, 0, function (element) {
								shift("left");
								element.fadeIn(transitionDuration, 0.3, function (element) {							
									transitionCompleted = true;
									carousel.trigger("ui.carousel.change.after", [current]);
								});
							});
						});
					}
					else if (transitionType === "crossfade") {          
						swap(function() {
								var items = carouselHolder.find(".carousel-item");

								items.eq(current - 1).fadeIn(transitionDuration, 0, function() {                  
										items.eq(current - 1).siblings(".carousel-item").fadeOut(transitionDuration, 0, function() {

												transitionCompleted = true;
												carousel.trigger("ui.carousel.change.after", [ current ]);
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
			},		
			selectSlide = function (index) {
			
				if (!isNaN(index) && (index >= 0 && index < carouselItemCount)) {

					carousel.trigger("ui.carousel.change.before", [current]);

					current = parseInt(index) + 1;
		
					if (transitionType === "crossfade") {
						var items = carouselHolder.find(".carousel-item");

						items.eq(index).fadeIn(0, 0, function() {                  
								items.eq(index).siblings(".carousel-item").fadeOut(0, 0, function() {

										transitionCompleted = true;
										carousel.trigger("ui.carousel.change.after", [ current ]);
								});
						});               

					}
					else {
						if (transitionOrientation === "vertical" && transitionType === "slide") {
							carouselHolder.css("top", "-" + (carouselItemHeight * current) + "px");
						}
						else {
							carouselHolder.css("left", "-" + (carouselItemWidth * current) + "px");
						}
						transitionCompleted = true;
						carousel.trigger("ui.carousel.change.after", [current]);	
					}
				}
			},
			playCarousel = function () {
		
				clearInterval(run);
				
				if (playDirection === "next") {
					run = setInterval(function() {
						nextSlide();
					}, interval);
				}
				else if (playDirection === "prev") {
					run = setInterval(function() {
						prevSlide();
					}, interval);					
				}	

			},		
		
			stopCarousel = function () {		
				clearInterval(run);
			};		

		carousel.css("display", "block");

		if (autoScale) {
			carousel.css("width", "100%");
		}
		else {
			carousel.css("width", width).css("height", height);
		}

		carouselHolder = carousel.find(".carousel-item-holder").css("display", "block");     
		carouselItems = carouselHolder.find(".carousel-item");
		carouselItemCount = carouselItems.length;

		if (carouselItemCount) {
			if (transitionType === "crossfade") {
				carouselItems.css("position", "absolute").css("float", "left").children().css("display", "block").css("width", "100%").css("margin", "0");               
			}
			else {
				carouselItems.css("display", transitionOrientation === "vertical" && transitionType === "slide" ? "block" : "inline-block").css("float", "left").children().css("width", "100%").css("display", "block").css("margin", "0");
			}

			if (!autoScale) {
				itemBorderWidth = parseFloat(carouselItems.first().css("borderLeftWidth")) + parseFloat(carouselItems.first().css("borderRightWidth"));
				itemBorderHeight = parseFloat(carouselItems.first().css("borderTopWidth")) + parseFloat(carouselItems.first().css("borderBottomWidth"));
			}

			resetCarousel(carousel, carouselItemCount);

			if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
					win.addEventListener("resize", carouselResize);

					function carouselResize() {
						resetCarousel(carousel, carouselItemCount, true);
					};		
			}

			if (transitionType !== "crossfade") {
				webui(carouselItems.last()[0].cloneNode(true)).prependTo(carouselHolder);
				webui(carouselItems.first()[0].cloneNode(true)).appendTo(carouselHolder);
			}
			else {
				selectSlide(0);
			}
			
			if (autoPlay) {
					playCarousel();
					if (stopOnHover) {
							carousel.hoverIn(function() {
									stopCarousel();
							});
							carousel.hoverOut(function() {
									playCarousel();
							});
					}
			}
		}

		this.prev = function () {
			prevSlide();
		};
	
		this.next = function () {	
			nextSlide();
		};
	
		this.pick = function (index) {
			selectSlide(index);
		};
	
		this.play = function () {	
			playCarousel();
		};		
	
		this.stop = function () {	
			stopCarousel();
		};		
	
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
				transitionOrientation: "horizontal",
				width: "600px",
				height: "400px"
			}, options);

			var control = new CarouselInstance(this, settings);

			this.prev = function () {
				control.prev();	
			};
		
			this.next = function () {		
				control.next();	
			};
		
			this.select = function (index) {		
				control.pick(index);	
			};
		
			this.play = function () {		
				control.play();	
			};		
		
			this.stop = function () {		
				control.stop();				
			};		
	
			return this;

		},
		enumerable: false
	});

}(window));
		