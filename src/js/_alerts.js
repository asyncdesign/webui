
(function (win) {

	/* PRIVATE */

	var AlertInstance = function (alert, settings) {

		var
			position = settings.position,
			duration = settings.duration,
			transitionDuration = settings.transitionDuration,
			displayOrder = settings.displayOrder,
			width = settings.width,
			showHeader = settings.showHeader,
			inline = settings.inline,
			style = settings.style,
			autoHide = settings.autoHide,
			showIcon = settings.showIcon,
			showClose = settings.showClose,


			showAlert = function (message, type, auto, icon, close) {
				if (arguments.length > 1) {

					var autoHideAlert = auto === null ? auto = autoHide : auto;
					var showAlertIcon = icon === null ? icon = showIcon : icon;
					var showAlertClose = close === null ? close = showClose : close;

					var alertContainer = alert.removeClass("*").addClass("alert-container alert-" + position).css("width", width);

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

					if (displayOrder.toLowerCase() === "descending") {
						alertItemOuter.appendTo(alertContainer);
					}
					else {
						if (alertContainer.find(".alert").length > 0) {
							alertItemOuter.prependTo(alertContainer);
						}
						else {
							alertItemOuter.appendTo(alertContainer);
						}
					}

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
						if (showAlertIcon || showAlertClose) {
							var alertItemHeader = webui("<div></div>").addClass("panel").appendTo(alertItemInner);
							var alertItemHeaderLeft = webui("<div></div>").addClass("move-left").appendTo(alertItemHeader);
							var alertItemHeaderRight = webui("<div></div>").addClass("move-right").appendTo(alertItemHeader);
							if (showAlertIcon) {
								webui("<div></div>").addClass("alert-" + type + "-icon").appendTo(alertItemHeaderLeft);
							}
							if (showAlertClose) {
								webui("<div role='button'></div>").addClass("alert-cancel-button").appendTo(alertItemHeaderRight)
									.click(function () {
										hideAlert(alertItemInner, false);
									});
							}
						}
					}
					var alertItemBody = webui("<div></div>").addClass("panel flex-items-center").appendTo(alertItemInner);
					if (showHeader && inline) {
						if (showAlertIcon && showAlertClose) {
							webui("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody);
							webui("<div></div>").addClass("container width-adjacent-md pad-xs move-left").appendTo(alertItemBody).html(message);
							webui("<div role='button'></div>").addClass("width-sm move-right alert-cancel-button").appendTo(alertItemBody)
								.click(function () {
									hideAlert(alertItemInner, false);
								});
						} else if (showAlertIcon) {
							webui("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody);
							webui("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-right", "0").appendTo(alertItemBody).html(message);
						} else if (showAlertClose) {
							webui("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-left", "0").appendTo(alertItemBody).html(message);
							webui("<div role='button'></div>").addClass("width-sm move-right alert-cancel-button").appendTo(alertItemBody)
								.click(function () {
									hideAlert(alertItemInner, false);
								});
						} else {
							webui("<div></div>").addClass("pad-xs").appendTo(alertItemBody).css("padding-left", "0").html(message);
						}
					} else {
						webui("<div></div>").appendTo(alertItemBody).html(message);
					}

					if (autoHideAlert) {
						setTimeout(function () {
							hideAlert(alertItemInner, true);
						}, duration);
					}

				}
			},

			hideAlert = function (alert, auto) {
				if (alert) {

					alert.trigger("ui.alert.hide.before");

					if (auto && transitionDuration) {

						alert.fadeOut(transitionDuration).trigger("ui.alert.hide.after");

						setTimeout(function () {
							alert.parent().remove();
						}, transitionDuration);

					}
					else {
						alert.hide().parent().remove().trigger("ui.alert.hide.after");
					}
				}
			};


		this.showAlert = function (message, type, auto, icon, close) {
			showAlert(message, type, auto, icon, close);
		};

		this.hideAlert = function (alert) {
			hideAlert(alert, false);
		};

	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "alertControl", {
		value: function (options) {

			var settings = ui.extend({
				position: "top-right",
				duration: 3000,
				transitionDuration: 300,
				displayOrder: "ascending",
				width: "25rem",
				showHeader: true,
				inline: true,
				style: "outline-square",
				autoHide: true,
				showIcon: true,
				showClose: true
			}, options);

			if (this.length > 1) { console.warn("WebUI alerts component does not support initialising multiple controls.") }

			var control = new AlertInstance(this.first(), settings);

			this.showAlert = function (message, type, auto, icon, close) {
				switch (arguments.length) {
					case 2:
						control.showAlert(message, type, settings.autoHide, settings.showIcon, settings.showClose); break;
					case 3:
						control.showAlert(message, type, auto, settings.showIcon, settings.showClose); break;
					case 4:
						control.showAlert(message, type, auto, icon, settings.showClose); break;
					case 5:
						control.showAlert(message, type, auto, icon, close); break;
					default:
						break;
				}
			};

			this.hideAlert = function (alert) {
				control.hideAlert(alert, false);
			};

			this.showSuccessAlert = function (message, auto, icon, close) {
				var msgType = "success";
				switch (arguments.length) {
					case 1:
						control.showAlert(message, msgType, settings.autoHide, settings.showIcon, settings.showClose); break;
					case 2:
						control.showAlert(message, msgType, auto, settings.showIcon, settings.showClose); break;
					case 3:
						control.showAlert(message, msgType, auto, icon, settings.showClose); break;
					case 4:
						control.showAlert(message, msgType, auto, icon, close); break;
					default:
						break;
				}
			};

			this.showInfoAlert = function (message, auto, icon, close) {
				var msgType = "info";
				switch (arguments.length) {
					case 1:
						control.showAlert(message, msgType, settings.autoHide, settings.showIcon, settings.showClose); break;
					case 2:
						control.showAlert(message, msgType, auto, settings.showIcon, settings.showClose); break;
					case 3:
						control.showAlert(message, msgType, auto, icon, settings.showClose); break;
					case 4:
						control.showAlert(message, msgType, auto, icon, close); break;
					default:
						break;
				}
			};

			this.showWarningAlert = function (message, auto, icon, close) {
				var msgType = "warning";
				switch (arguments.length) {
					case 1:
						control.showAlert(message, msgType, settings.autoHide, settings.showIcon, settings.showClose); break;
					case 2:
						control.showAlert(message, msgType, auto, settings.showIcon, settings.showClose); break;
					case 3:
						control.showAlert(message, msgType, auto, icon, settings.showClose); break;
					case 4:
						control.showAlert(message, msgType, auto, icon, close); break;
					default:
						break;
				}
			};

			this.showDangerAlert = function (message, auto, icon, close) {
				var msgType = "danger";
				switch (arguments.length) {
					case 1:
						control.showAlert(message, msgType, settings.autoHide, settings.showIcon, settings.showClose); break;
					case 2:
						control.showAlert(message, msgType, auto, settings.showIcon, settings.showClose); break;
					case 3:
						control.showAlert(message, msgType, auto, icon, settings.showClose); break;
					case 4:
						control.showAlert(message, msgType, auto, icon, close); break;
					default:
						break;
				}
			};

			return this;

		},
		enumerable: false
	});

})(window);
