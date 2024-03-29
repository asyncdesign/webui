

(function (win) {
	
	/* PRIVATE */

	var

		resetRadial = function(el, params) {

			var radialWidth = el.offsetWidth;
			var radialHeight = el.offsetHeight;

			var radialContent = webui(el).find(".radial-content").css("transition", "all " + params.duration / 1000 + "s ease-out");
					
			var radialItems = radialContent.find(".radial-item");

			var sliceFactor = 1;
			switch (radialItems.length) {
				case 3: sliceFactor = 1.335; break;
				case 4: sliceFactor = 1.50; break;
				case 5: sliceFactor = 1.60; break;
				case 6: sliceFactor = 1.665; break;
				case 7: sliceFactor = 1.715; break;
				case 8: sliceFactor = 1.75; break;
				case 9: sliceFactor = 1.78; break;
				case 10: sliceFactor = 1.80; break;
				case 11: sliceFactor = 1.82; break;
				default: if (radialItems.length > 11) { sliceFactor = 1.833 + ((radialItems.length - 12) * 0.008); } else { sliceFactor = 1; } break;
			}

			var radialSlice = params.mode === "top" ? -sliceFactor : params.mode === "bottom" ? sliceFactor : 1;
	

			for (var j = 0; j < radialItems.length; j++) {
				var radialItem = webui(radialItems[j]);
	
				var radialItemWidth = parseFloat(radialItem.css("width"));
				var radialItemHeight = parseFloat(radialItem.css("height"));
			
				var radialLeft = ((radialWidth/2 * Math.cos(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / params.zoomFactor)) - radialItemWidth/2) + (radialWidth/2) + "px";
				var radialTop = ((radialHeight/2 * Math.sin(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / params.zoomFactor)) - radialItemHeight/2) + (radialHeight/2) + "px";
				radialItem.css("left", radialLeft);
				radialItem.css("top", radialTop);
			}
		};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "radialControl", {
		value: function (options) {

			var settings = ui.extend({
				zoomFactor: 1,
				mode: "full",
				responsive: true,
				transitionDuration: 300
			}, options);

			var controls = webui(this);

			for (var i = 0; i < controls.length; i++) {

				var radialWidth = controls[i].offsetWidth;
				var radialHeight = controls[i].offsetHeight;

				var radialContent = webui(controls[i]).find(".radial-content").css("transition", "all " + settings.transitionDuration / 1000 + "s ease-out");
						
				var radialItems = radialContent.find(".radial-item");

				var sliceFactor = 1;
				switch (radialItems.length) {
					case 3: sliceFactor = 1.335; break;
					case 4: sliceFactor = 1.50; break;
					case 5: sliceFactor = 1.60; break;
					case 6: sliceFactor = 1.665; break;
					case 7: sliceFactor = 1.715; break;
					case 8: sliceFactor = 1.75; break;
					case 9: sliceFactor = 1.78; break;
					case 10: sliceFactor = 1.80; break;
					case 11: sliceFactor = 1.82; break;
					default: if (radialItems.length > 11) { sliceFactor = 1.833 + ((radialItems.length - 12) * 0.008); } else { sliceFactor = 1; } break;
				}

				var radialSlice = settings.mode === "top" ? -sliceFactor : settings.mode === "bottom" ? sliceFactor : 1;
		

				for (var j = 0; j < radialItems.length; j++) {
					var radialItem = webui(radialItems[j]);
		
					var radialItemWidth = parseFloat(radialItem.css("width"));
					var radialItemHeight = parseFloat(radialItem.css("height"));
				
					var radialLeft = ((radialWidth/2 * Math.cos(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / settings.zoomFactor)) - radialItemWidth/2) + (radialWidth/2) + "px";
					var radialTop = ((radialHeight/2 * Math.sin(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / settings.zoomFactor)) - radialItemHeight/2) + (radialHeight/2) + "px";
					radialItem.css("left", radialLeft);
					radialItem.css("top", radialTop);
				}
				
				if (settings.responsive) {
					webui(controls[i]).resizeElement(resetRadial, {zoomFactor: settings.zoomFactor, mode: settings.mode, transitionDuration: settings.transitionDuration});
				}
			}

			this.find(".radial-activator").click(function (e) {
				e.preventDefault();
				webui(this).siblings(".radial-content").first().toggleClass("radial-open");
			});

			return this;
		},
		enumerable: false
	});

})(window);
	
