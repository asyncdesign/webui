
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

					alert.trigger("ui.alert.show.before");

					if (transitionDuration) {
						alertItemInner.fadeIn(transitionDuration, 0, function() {
							alert.trigger("ui.alert.show.after");
						});
					}
					else {
						alertItemInner.show();
						alert.trigger("ui.alert.show.after");
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
							var alertItemHeader = webui("<div></div>").addClass("flex pad-sm justify-content-space-between").appendTo(alertItemInner);
							var alertItemHeaderLeft = webui("<div></div>").appendTo(alertItemHeader);
							var alertItemHeaderRight = webui("<div></div>").appendTo(alertItemHeader);
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
					var alertItemBody = webui("<div></div>").addClass("flex pad-sm align-items-center").appendTo(alertItemInner);
					if (showHeader && inline) {
						if (showAlertIcon && showAlertClose) {
							webui("<div></div>").addClass("width-sm alert-" + type + "-icon").appendTo(alertItemBody);
							webui("<div></div>").addClass("container flex-auto pad-xs").appendTo(alertItemBody).html(message);
							webui("<div role='button'></div>").addClass("width-sm alert-cancel-button").appendTo(alertItemBody)
								.click(function () {
									hideAlert(alertItemInner, false);
								});
						} else if (showAlertIcon) {
							webui("<div></div>").addClass("width-sm alert-" + type + "-icon").appendTo(alertItemBody);
							webui("<div></div>").addClass("container flex-auto pad-xs").css("padding-right", "0").appendTo(alertItemBody).html(message);
						} else if (showAlertClose) {
							webui("<div></div>").addClass("container flex-auto pad-xs").css("padding-left", "0").appendTo(alertItemBody).html(message);
							webui("<div role='button'></div>").addClass("width-sm alert-cancel-button").appendTo(alertItemBody)
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

			hideAlert = function (alertEl, auto) {
				if (alertEl) {

					alertEl.trigger("ui.alert.hide.before");

					if (auto && transitionDuration) {

						alertEl.fadeOut(transitionDuration, 0, function() {
							alertEl.trigger("ui.alert.hide.after");
							alertEl.parent().remove();
						});
					}
					else {
						alertEl.hide().trigger("ui.alert.hide.after");
						alertEl.parent().remove();
					}
				}
			};


		this.showAlert = function (message, type, auto, icon, close) {
			showAlert(message, type, auto, icon, close);
		};

		this.hideAlert = function (alertEl) {
			hideAlert(alertEl, false);
		};

		this.updateInstance = function (newSettings) {

			if (newSettings.position !== undefined) { position = newSettings.position; }
			if (newSettings.duration !== undefined) { duration = newSettings.duration; }
			if (newSettings.transitionDuration !== undefined) { transitionDuration = newSettings.transitionDuration; }
			if (newSettings.displayOrder !== undefined) { displayOrder = newSettings.displayOrder; }
			if (newSettings.width !== undefined) { width = newSettings.width; }
			if (newSettings.showHeader !== undefined) { showHeader = newSettings.showHeader; }
			if (newSettings.inline !== undefined) { inline = newSettings.inline; }
			if (newSettings.style !== undefined) { style = newSettings.style; }	
			if (newSettings.autoHide !== undefined) { autoHide = newSettings.autoHide; }
			if (newSettings.showIcon !== undefined) { showIcon = newSettings.showIcon; }
			if (newSettings.showClose !== undefined) { showClose = newSettings.showClose; }
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

			if (this.length > 1) { console.warn("WebUI alerts component does not support initialising multiple controls. Initialize a new component instead.") }

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

			this.update = function (newSettings) {
				control.updateInstance(newSettings);
			};

			return this;

		},
		enumerable: false
	});

})(window);
