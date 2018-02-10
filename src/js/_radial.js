

(function (win) {
	
	/* PRIVATE */

	var fn = webui.fn,
		radialZoom = 1,
		radialMode = "full",
		transitionDuration = 1000;

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "radialControl", {
		value: function (options) {

			var settings = ui.extend({
				radialZoom: 1,
				radialMode: "full",
				transitionDuration: 300
			}, options);

			radialZoom = settings.radialZoom;
			radialMode = settings.radialMode;
			transitionDuration = settings.transitionDuration;


			var radials = webui(this);

			for (var i = 0; i < radials.length; i++) {

				var radialContent = webui(radials[i]).find(".radial-content");
		
				radialContent.css("transition", "all " + transitionDuration / 1000 + "s ease-out");
		
				var radialWidth = radialContent.parent(".radial")[0].offsetWidth;
				var radialHeight = radialContent.parent(".radial")[0].offsetHeight;
				
				var radialItems = radialContent.find(".radial-item");

				var radialSlice = radialMode === "top" ? -1.75 : radialMode === "bottom" ? 1.75 : 1;
		
				for (var j = 0; j < radialItems.length; j++) {
					var radialItem = webui(radialItems[j]);
		
					var radialItemWidth = parseFloat(radialItem.css("width"));
					var radialItemHeight = parseFloat(radialItem.css("height"));
				
					var radialLeft = ((radialWidth/2 * Math.cos(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / radialZoom)) - radialItemWidth/2) + (radialWidth/2) - 3 + "px";
					var radialTop = ((radialHeight/2 * Math.sin(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / radialZoom)) - radialItemHeight/2) + (radialHeight/2) - 2 + "px";
					radialItem.css("left", radialLeft);
					radialItem.css("top", radialTop);
				}	
	
			}

			this.find(".radial-activator").click(function (e) {
				e.preventDefault();
				webui(this).siblings(".radial-content").first().toggleClass("radial-open");
			});

		}
	});


}(window));
	
