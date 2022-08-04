
(function (win) {
	
	/* PRIVATE */
	
	var UploadInstance = function(control, settings) {

		var
			showFiles = settings.showFiles,
			showCount = settings.showCount,
			scrollX = settings.scrollX,
			scrollY = settings.scrollY;


		if (showFiles === false) {
			control.siblings().first("label").addClass("hide-files");
		}
		if (showCount === false) {
			control.siblings().first("label").addClass("hide-count");
		}
		if (scrollX) {
			control.siblings().first("label").css("overflow-x", "scroll");
			control.select(".upload-icon-bottom").siblings().first("label").css("background-position", "center calc(96% - 15px)");
		}
		if (scrollY) {
			control.siblings().first("label").css("overflow-y", "scroll");
			control.select(".upload.upload-icon-right").siblings().first("label").css("background-position", "calc(97% - 15px) 5px");
			control.select(".upload-sm.upload-icon-right").siblings().first("label").css("background-position", "calc(97% - 15px) 2px");
		}

		control.change(function() {
			
			var upload = webui(this);
	
			if (upload) {
	
				upload.trigger("ui.upload.change.before");				
				var label = upload.siblings("label").first();
				if (upload.length > 0) {
					var files = upload[0].files;
					if (files != null && files.length > 0) {
						if (label) {
							var textValue = "",
									hideFiles = label.hasClass("hide-files"),
									hideCount = label.hasClass("hide-count");

							if (!hideCount) {
								if (files.length === 1) {
									textValue += "(1) file.";
								}
								else if (files.length > 1) {
									textValue += "(" + files.length + ") files.";
								}
							}
							if (!hideFiles) {
								if (!hideCount) {
									textValue += "<br /><br />";
								}
								for (var i = 0; i < files.length; i++) {
									textValue += files[i].name + "<br />";
								}
							}
							if (hideFiles && hideCount) {
								textValue += "Files ready.";
							}
							label.html(textValue);
							upload.trigger("ui.upload.change.after");
						}
					} else {
						if (upload.val() !== null && upload.val().length > 0) {
							if (label) {
								label.text(upload.val().replace("C:\\fakepath\\", ""));
								upload.trigger("ui.upload.change.after");
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

			if (this.length > 1) { console.warn("WebUI upload component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new UploadInstance(this.first(), settings);
			
			return this;
		},
		enumerable: false
	});


})(window);
		