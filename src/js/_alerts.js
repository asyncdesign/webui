
(function (win) {
	
	/* PRIVATE */

	var fn = webui.fn,

		position = "top-right",
		duration = 300,
		transitionDuration = 300,
		width = "18.750rem",
		showHeader = true,
		inline = true,
		style = "outline-square",
		autoHide = false,
		showIcon = true,
		showClose = true;

	/* PUBLIC */

	webui.initAlerts = function(options) {
		position = options.position !== void 0 ? options.position : position;
		duration = options.duration !== void 0 ? options.duration : duration;
		transitionDuration = options.transitionDuration !== void 0 ? options.transitionDuration : transitionDuration;
		width = options.width != void 0 ? options.width : width;
		showHeader = options.showHeader != void 0 ? options.showHeader : showHeader;
		inline = options.inline != void 0 ? options.inline : inline;
		style = options.style != void 0 ? options.style : style;
		autoHide = options.autoHide !== void 0 ? options.autoHide : autoHide;
		showIcon = options.showIcon !== void 0 ? options.showIcon : showIcon;
		showClose = options.showClose !== void 0 ? options.showClose : showClose;
	};
	webui.showAlert = function(message, type, auto, icon, close) {
		if (arguments.length > 1) {

			var alertContainer = !webui(".alert-container").length ? 
									webui("<div></div>").addClass("alert-container").addClass("alert-" + position).appendTo("body") : 
									webui(".alert-container").addClass("alert-" + position);

			
			alertContainer.css("width", width);
			var alertItemOuter = webui("<div></div>");
			var alertItemInner = webui("<div role='alert'></div>").addClass("alert alert-" + type)
									.css("padding-left", "0.625rem").css("padding-right", "0.625rem")
									.appendTo(alertItemOuter);


			alertItemInner.trigger("ui.alert.show.before");

			if (transitionDuration) {
				alertItemInner.fadeIn(transitionDuration).trigger("ui.alert.show.after");
			}
			else {
				alertItemInner.show().trigger("ui.alert.show.after");
			}
			alertItemOuter.appendTo(alertContainer);
	

			if (style === "outline-square" || style === "outline-rounded") {
				switch (type) {
				case "success":
					alertItemInner.addClass("alert-success-outline");
					break;

				case "info":
					alertItemInner.addClass("alert-info-outline");
					break;

				case "warning":
					alertItemInner.addClass("alert-warning-outline");
					break;

				case "danger":
					alertItemInner.addClass("alert-danger-outline");
					break;

				default:
					break;
				}
			}
			if (style.toLowerCase().indexOf("rounded") >= 0) {
				alertItemInner.addClass("rounded-md");
			}
			if (showHeader && !inline) {
				if (icon || close) {
					var alertItemHeader = webui("<div></div>").addClass("panel").appendTo(alertItemInner);
					var alertItemHeaderLeft = webui("<div></div>").addClass("move-left").appendTo(alertItemHeader);
					var alertItemHeaderRight = webui("<div></div>").addClass("move-right").appendTo(alertItemHeader);
					if (icon) {
						var alertItemIcon = webui("<div></div>").addClass("alert-" + type + "-icon").appendTo(alertItemHeaderLeft);
					}
					if (close) {
						var alertItemCancel = webui("<div role='button'></div>").addClass("alert-cancel").appendTo(alertItemHeaderRight)
						.click(function() {
							ui.hideAlert(alertItemInner, false);
						});
					}
				}
			}
			var alertItemBody = webui("<div></div>").addClass("panel").appendTo(alertItemInner);
			if (showHeader && inline) {
				if (icon && close) {
					var alertItemIcon = webui("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody);
					var alertItemBodyMessage = webui("<div></div>").addClass("container width-adjacent-md pad-xs move-left").appendTo(alertItemBody).html(message);
					var alertItemCancel = webui("<div role='button'></div>").addClass("width-sm move-right alert-cancel").appendTo(alertItemBody)
					.click(function() {
						ui.hideAlert(alertItemInner, false);
					});
				} else if (icon) {
					var alertItemIcon = webui("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody);
					var alertItemBodyMessage = webui("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-right", "0").appendTo(alertItemBody).html(message);
				} else if (close) {
					var alertItemBodyMessage = webui("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-left", "0").appendTo(alertItemBody).html(message);
					var alertItemCancel = webui("<div role='button'></div>").addClass("width-sm move-right alert-cancel").appendTo(alertItemBody)
					.click(function() {
						ui.hideAlert(alertItemInner, false);
					});
				} else {
					var alertItemBodyMessage = webui("<div></div>").addClass("pad-xs").appendTo(alertItemBody).css("padding-left", "0").html(message);
				}
			} else {
				var alertItemBodyMessage = webui("<div></div>").appendTo(alertItemBody).html(message);
			}
			if (auto != null) {
				if (auto) {
					setTimeout(function() {
						ui.hideAlert(alertItemInner, true);
					}, duration);
				}
			} else {
				if (autoHide) {
					setTimeout(function() {
						ui.hideAlert(alertItemInner, true);
					}, duration);
				}
			}
		}
	};
	webui.hideAlert = function(alert, auto) {
		if (alert) {

			alert.trigger("ui.alert.hide.before");
			
			if (transitionDuration) {

				alert.fadeOut(transitionDuration).trigger("ui.alert.hide.after");
				
				setTimeout(function() {
					alert.parent().remove();
				}, transitionDuration);
				
			}
			else {
				alert.hide().parent().remove().trigger("ui.alert.hide.after");
			}
		}
	};
	ui.showSuccessAlert = function(message, auto, icon, close) {
		var msgType = "success";
		switch (arguments.length) {
		case 1:
			ui.showAlert(message, msgType, autoHide, showIcon, showClose); break;
		case 2:
			ui.showAlert(message, msgType, auto, showIcon, showClose); break;
		case 3:
			ui.showAlert(message, msgType, auto, icon, showClose); break;
		case 4:
			ui.showAlert(message, msgType, auto, icon, close); break;
		default:
			break;
		}
	};
	ui.showInfoAlert = function(message, auto, icon, close) {
		var msgType = "info";
		switch (arguments.length) {
		case 1:
			ui.showAlert(message, msgType, autoHide, showIcon, showClose); break;
		case 2:
			ui.showAlert(message, msgType, auto, showIcon, showClose); break;
		case 3:
			ui.showAlert(message, msgType, auto, icon, showClose); break;
		case 4:
			ui.showAlert(message, msgType, auto, icon, close); break;
		default:
			break;
		}
	};
	ui.showWarningAlert = function(message, auto, icon, close) {
		var msgType = "warning";
		switch (arguments.length) {
		case 1:
			ui.showAlert(message, msgType, autoHide, showIcon, showClose); break;
		case 2:
			ui.showAlert(message, msgType, auto, showIcon, showClose); break;
		case 3:
			ui.showAlert(message, msgType, auto, icon, showClose); break;
		case 4:
			ui.showAlert(message, msgType, auto, icon, close); break;
		default:
			break;
		}
	};
	ui.showDangerAlert = function(message, auto, icon, close) {
		var msgType = "danger";
		switch (arguments.length) {
		case 1:
			ui.showAlert(message, msgType, autoHide, showIcon, showClose); break;
		case 2:
			ui.showAlert(message, msgType, auto, showIcon, showClose); break;
		case 3:
			ui.showAlert(message, msgType, auto, icon, showClose); break;
		case 4:
			ui.showAlert(message, msgType, auto, icon, close); break;
		default:
			break;
		}
	};

}(window));
		