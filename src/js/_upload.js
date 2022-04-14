
(function (win) {
	
	/* PRIVATE */
	
	var UploadInstance = function(upload, settings) {

		var
			showFiles = settings.showFiles,
			showCount = settings.showCount,
			scrollX = settings.scrollX,
			scrollY = settings.scrollY;


			//TODO: Test support for multiple controls


			if (showFiles === false) {
				upload.siblings().first("label").addClass("hide-files");
			}
			if (showCount === false) {
				upload.siblings().first("label").addClass("hide-count");
			}
			if (scrollX) {
				upload.siblings().first("label").css("overflow-x", "scroll");
				upload.select(".upload-icon-bottom").siblings().first("label").css("background-position", "center calc(96% - 15px)");
			}
			if (scrollY) {
				upload.siblings().first("label").css("overflow-y", "scroll");
				upload.select(".upload.upload-icon-right").siblings().first("label").css("background-position", "calc(97% - 15px) 5px");
				upload.select(".upload-sm.upload-icon-right").siblings().first("label").css("background-position", "calc(97% - 15px) 2px");
			}

			upload.change(function() {
				var element = webui(this);
		
				if (element) {
		
					element.trigger("ui.upload.change.before");				
					var label = element.siblings("label").first();
					if (element.length > 0) {
						var files = element[0].files;
						if (files != null && files.length > 0) {
							if (label) {
								var textValue = "";
								if (label.hasClass("hide-files") === false) {
									for (var i = 0; i < files.length; i++) {
										textValue += files[i].name + "<br />";
									}
								}
								if (label.hasClass("hide-count") === false) {
									if (files.length > 1) {
										textValue += "<br />(" + files.length + ") files.";
									}
								}
								if (label.hasClass("hide-files") && label.hasClass("hide-count")) {
									textValue += "<br />Files ready.";
								}
								label.html(textValue);
								element.trigger("ui.upload.change.after");
							}
						} else {
							if (element.val() !== null && element.val().length > 0) {
								if (label) {
									label.text(element.val().replace("C:\\fakepath\\", ""));
									element.trigger("ui.upload.change.after");
								}
							}
						}
					}
				}
			});	

	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "uploadControl", {
		value: function (options) {

			var settings = ui.extend({
				showFiles: true,
				showCount: true,
				scrollX: false,
				scrollY: false
			}, options);


			var control = new UploadInstance(this, settings);
			
			return this;
		},
		enumerable: false
	});


})(window);
		