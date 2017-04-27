
(function (webui, ui, $, undefined) {

	/* PRIVATE */

	var alertPosition = "top-right";
	var alertDuration = 5000;
	var alertFadeInDuration = 300;
	var alertFadeOutDuration = 300;
	var alertWidth = "18.750rem";
	var alertShowHeader = true;
	var alertInline = true;
	var alertStyle = "outline-square";
	var alertDynamic = false;
	var alertShowIcon = true;
	var alertShowClose = true;


    /* PUBLIC */

	ui.initAlerts = function (options) {	
		alertPosition = options.position !== void 0 ? options.position : alertPosition;
		alertDuration = options.duration !== void 0 ? options.duration : alertDuration;
		alertFadeInDuration = options.fadeInDuration !== void 0 ? options.fadeInDuration : alertFadeInDuration;
		alertFadeOutDuration = options.fadeOutDuration !== void 0 ? options.fadeOutDuration : alertFadeOutDuration;
		alertWidth = options.width != void 0 ? options.width : alertWidth;
		alertShowHeader = options.showHeader != void 0 ? options.showHeader : alertShowHeader;
		alertInline = options.inline != void 0 ? options.inline : alertInline;
		alertStyle = options.style != void 0 ? options.style : alertStyle;
		alertDynamic = options.dynamic !== void 0 ? options.dynamic : alertDynamic;
		alertShowIcon = options.showIcon !== void 0 ? options.showIcon : alertShowIcon;
		alertShowClose = options.showClose !== void 0 ? options.showClose : alertShowClose;	
	};

	ui.showAlert = function (message, type, dynamic, showIcon, showClose) {

		if (arguments.length > 1) {
			var alertContainer = (!$(".alert-container").length) ?
				$("<div></div>").addClass("alert-container").addClass("alert-" + alertPosition).appendTo("body") :
				$(".alert-container");

			alertContainer.css("width", alertWidth);

			var alertItemOuter = $("<div></div>");

			var alertItemInner = $("<div role='alert'></div>").hide()
				.addClass("alert alert-" + type)
				.css("padding-left", "0.625rem")
				.css("padding-right", "0.625rem")
				.appendTo(alertContainer)
				.animate({ opacity: "show" }, alertFadeInDuration)
				.wrap(alertItemOuter);

			if (alertStyle === "outline-square" || alertStyle === "outline-rounded") {
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

			if (alertStyle.toLowerCase().indexOf("rounded") >= 0) {
				alertItemInner.addClass("rounded-md");
			}

			if (alertShowHeader && !alertInline) {
				if (showIcon || showClose) {
					var alertItemHeader = $("<div></div>").addClass("panel").appendTo(alertItemInner);
					var alertItemHeaderLeft = $("<div></div>").addClass("move-left").appendTo(alertItemHeader);
					var alertItemHeaderRight = $("<div></div>").addClass("move-right").appendTo(alertItemHeader);

					if (showIcon) {
						var alertItemIcon = $("<div></div>").addClass("alert-" + type + "-icon").appendTo(alertItemHeaderLeft)
					}
					if (showClose) {
						var alertItemCancel = $("<div role='button'></div>").addClass("alert-cancel").appendTo(alertItemHeaderRight)
							.click(function () {
								ui.hideAlert(alertItemInner, false);
							});
					}
				}
			}

			var alertItemBody = $("<div></div>").addClass("panel").appendTo(alertItemInner);

			if (alertShowHeader && alertInline) {

				if (showIcon && showClose) {
					var alertItemIcon = $("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody)
					var alertItemBodyMessage = $("<div></div>").addClass("container width-adjacent-md pad-xs move-left").appendTo(alertItemBody).html(message);
					var alertItemCancel = $("<div role='button'></div>").addClass("width-sm move-right alert-cancel").appendTo(alertItemBody)
						.click(function () {
							ui.hideAlert(alertItemInner, false);
						});
				}
				else if (showIcon) {
					var alertItemIcon = $("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody)
					var alertItemBodyMessage = $("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-right", "0").appendTo(alertItemBody).html(message);					
				}
				else if (showClose) {
					var alertItemBodyMessage = $("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-left", "0").appendTo(alertItemBody).html(message);
					var alertItemCancel = $("<div role='button'></div>").addClass("width-sm move-right alert-cancel").appendTo(alertItemBody)
						.click(function () {
							ui.hideAlert(alertItemInner, false);
						});
				}
				else {
					var alertItemBodyMessage = $("<div></div>").addClass("pad-xs").appendTo(alertItemBody).css("padding-left", "0").html(message);
				}

			}
			else {
				var alertItemBodyMessage = $("<div></div>").appendTo(alertItemBody).html(message);
			}

			if (dynamic != null) {
				if (dynamic) {
					setTimeout(function () {
						ui.hideAlert(alertItemInner, true);
					}, alertDuration);
				}
			}
			else {
				if (alertDynamic) {
					setTimeout(function () {
						ui.hideAlert(alertItemInner, true);
					}, alertDuration);
				}
			}
		}
	};

	ui.hideAlert = function (alert, dynamic) {

		if (alert) {
			alert.animate({ opacity: "hide" }, dynamic ? alertDuration : alertFadeOutDuration, function () {
				alert.parent().animate({ height: "0px" }, alertFadeOutDuration, function () {
					alert.parent().remove();
				});
			});
		}
	};

	ui.showSuccessAlert = function (message, dynamic, showIcon, showClose) {
		var msgType = "success";
		switch (arguments.length) {
			case 1: ui.showAlert(message, msgType, alertDynamic, alertShowIcon, alertShowClose); break;
			case 2: ui.showAlert(message, msgType, dynamic, alertShowIcon, alertShowClose); break;
			case 3: ui.showAlert(message, msgType, dynamic, showIcon, alertShowClose); break;
			case 4: ui.showAlert(message, msgType, dynamic, showIcon, showClose); break;
			default: break;
		}
	};

	ui.showInfoAlert = function (message, dynamic, showIcon, showClose) {
		var msgType = "info";
		switch (arguments.length) {
			case 1: ui.showAlert(message, msgType, alertDynamic, alertShowIcon, alertShowClose); break;
			case 2: ui.showAlert(message, msgType, dynamic, alertShowIcon, alertShowClose); break;
			case 3: ui.showAlert(message, msgType, dynamic, showIcon, alertShowClose); break;
			case 4: ui.showAlert(message, msgType, dynamic, showIcon, showClose); break;
			default: break;
		}
	};

	ui.showWarningAlert = function (message, dynamic, showIcon, showClose) {
		var msgType = "warning";
		switch (arguments.length) {
			case 1: ui.showAlert(message, msgType, alertDynamic, alertShowIcon, alertShowClose); break;
			case 2: ui.showAlert(message, msgType, dynamic, alertShowIcon, alertShowClose); break;
			case 3: ui.showAlert(message, msgType, dynamic, showIcon, alertShowClose); break;
			case 4: ui.showAlert(message, msgType, dynamic, showIcon, showClose); break;
			default: break;
		}
	};

	ui.showDangerAlert = function (message, dynamic, showIcon, showClose) {
		var msgType = "danger";
		switch (arguments.length) {
			case 1: ui.showAlert(message, msgType, alertDynamic, alertShowIcon, alertShowClose); break;
			case 2: ui.showAlert(message, msgType, dynamic, alertShowIcon, alertShowClose); break;
			case 3: ui.showAlert(message, msgType, dynamic, showIcon, alertShowClose); break;
			case 4: ui.showAlert(message, msgType, dynamic, showIcon, showClose); break;
			default: break;
		}
	};


} (window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery));
