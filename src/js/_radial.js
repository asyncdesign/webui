

(function (win) {
	
	/* PRIVATE */

	var fn = webui.fn,
		zoom = 1,
		mode = "full",
		responsive = true,
		transitionDuration = 1000,
		
		resetRadial = function(el, params) {

			var radialWidth = el.offsetWidth;
			var radialHeight = el.offsetHeight;

			var radialContent = webui(el).find(".radial-content").css("transition", "all " + params.duration / 1000 + "s ease-out");
					
			var radialItems = radialContent.find(".radial-item");

			var radialSlice = params.mode === "top" ? -1.75 : params.mode === "bottom" ? 1.75 : 1;
	

			for (var j = 0; j < radialItems.length; j++) {
				var radialItem = webui(radialItems[j]);
	
				var radialItemWidth = parseFloat(radialItem.css("width"));
				var radialItemHeight = parseFloat(radialItem.css("height"));
			
				var radialLeft = ((radialWidth/2 * Math.cos(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / params.zoom)) - radialItemWidth/2) + (radialWidth/2) - 3 + "px";
				var radialTop = ((radialHeight/2 * Math.sin(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / params.zoom)) - radialItemHeight/2) + (radialHeight/2) - 2 + "px";
				radialItem.css("left", radialLeft);
				radialItem.css("top", radialTop);
			}
		};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "radialControl", {
		value: function (options) {

			var settings = ui.extend({
				zoom: 1,
				mode: "full",
				responsive: true,
				transitionDuration: 300
			}, options);

			zoom = settings.zoom;
			mode = settings.mode;
			responsive = settings.responsive;
			transitionDuration = settings.transitionDuration;


			var radials = webui(this);

			for (var i = 0; i < radials.length; i++) {

				var radialWidth = radials[i].offsetWidth;
				var radialHeight = radials[i].offsetHeight;

				var radialContent = webui(radials[i]).find(".radial-content").css("transition", "all " + transitionDuration / 1000 + "s ease-out");
						
				var radialItems = radialContent.find(".radial-item");

				var radialSlice = mode === "top" ? -1.75 : mode === "bottom" ? 1.75 : 1;
		

				for (var j = 0; j < radialItems.length; j++) {
					var radialItem = webui(radialItems[j]);
		
					var radialItemWidth = parseFloat(radialItem.css("width"));
					var radialItemHeight = parseFloat(radialItem.css("height"));
				
					var radialLeft = ((radialWidth/2 * Math.cos(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / zoom)) - radialItemWidth/2) + (radialWidth/2) - 3 + "px";
					var radialTop = ((radialHeight/2 * Math.sin(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / zoom)) - radialItemHeight/2) + (radialHeight/2) - 2 + "px";
					radialItem.css("left", radialLeft);
					radialItem.css("top", radialTop);
				}
				
				if (responsive) {
					webui(radials[i]).resize(resetRadial, {zoom: zoom, mode: mode, transitionDuration: transitionDuration});
				}
			}

			this.find(".radial-activator").click(function (e) {
				e.preventDefault();
				webui(this).siblings(".radial-content").first().toggleClass("radial-open");
			});

		}
	});

}(window));
	
