
(function (win) {
	
	/* PRIVATE */
	
	var 
		fn = webui.fn,

		selectorRegExpMatches = function(selector, regExp) {
			var el = webui(selector);
			return el.is("input[type='text']") && regExp.test(el.val()) || 
					el.is("textarea") && regExp.test(el.text()) || 
					el.is("select") && regExp.test(el.find("option:checked").text()) || 
					el.is("datalist") && regExp.test(el.find("option:checked").text()) || 
					el.is("input[type='checkbox']") && regExp.test(el.is(":checked")) ||
					el.is("input[type='radio']") && regExp.test(el.is(":checked"));
		},
		
		containsSpaceOrDot = function(selector) {
			var el = webui(selector);
			return /^\s$/.test(el.val()) || el.val().indexOf(".") > -1;
		},
		
		containsSpace = function(selector) {
			return /^\s$/.test(webui(selector).val());
		},
		
		toDateObject = function(year, month, day, hour, minute, second) {
			try {
				var date = new Date(year, month, day, hour, minute, second);
				if (date.getDate() == day && date.getMonth() == month && date.getFullYear() == year && date.getHours() == hour && date.getMinutes() == minute && date.getSeconds() == second) {
					return date;
				}
				return null;
			} 
			catch (ex) {
				return null;
			}
		};
	
	/* PUBLIC */
	
	fn.isChecked = function(dependsOnSelector, dependsOnRegExp) {
		var args = arguments,
			el, ok = true;

		if (args.length === 0) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				if (!el.is(":checked")) { ok = false; }
			}
			return ok;
		} 
		else if (args.length === 2) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				if (selectorRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
					if (!el.is(":checked")) {
						ok = false;
					}
				}
				else {
					ok = false;
				}
			}
			return ok;
		}
		return false;
	};
	
	fn.hasConformingString = function(regExp, allowEmpty, dependsOnSelector, dependsOnRegExp) {
		var args = arguments,
		el, ok = true;

		if (args.length === 2) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				if ((!allowEmpty && el.val().length < 1) || (el.val().length > 0 && !regExp.test(el.val()))) {
					ok = false;
				} 
			}
			return ok;
		} 
		else if (args.length === 4) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				if (!allowEmpty && el.val().length < 1) {
					ok = false;
				} 
				else {
					if (selectorRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
						if (el.val().length > 0 && !regExp.test(el.val())) {
							ok = false;
						}
					}
					else {
						ok = false;
					}
				}
			}
			return ok;
		}
		return false;
	};
	
	fn.hasNumericInRange = function(lowerLimit, upperLimit, allowEmpty, dependsOnSelector, dependsOnRegExp) {
		var args = arguments,
		el, ok = true;

		if (args.length === 3) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				if (!allowEmpty && el.val().length < 1) {
					ok = false;
				} 
				else if (el.val().length > 0) {
					if (isNaN(el.val()) || isNaN(lowerLimit) || isNaN(upperLimit) || 
						containsSpace(el) || el.val() < lowerLimit || el.val() > upperLimit) {
						ok = false;
					}
				}
			}
			return ok;
		} 
		else if (args.length === 5) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				if (!allowEmpty && el.val().length < 1) {
					ok = false;
				} 
				else {
					if (selectorRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
						if (el.val().length > 0 && (isNaN(el.val()) || isNaN(lowerLimit) || isNaN(upperLimit) || 
							containsSpace(el) || el.val() < lowerLimit || el.val() > upperLimit)) {
							ok = false;
						}
					}
					else {
						ok = false;
					}
				}
			}
			return ok;
		}
		return false;
	};
	
	fn.hasIntegerInRange = function(lowerLimit, upperLimit, allowEmpty, dependsOnSelector, dependsOnRegExp) {
		var args = arguments,
		el, ok = true;

		if (args.length === 3) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				if (!allowEmpty && el.val().length < 1) {
					ok = false;
				} 
				else if (el.val().length > 0) {
					if (isNaN(el.val()) || isNaN(lowerLimit) || isNaN(upperLimit) ||
						containsSpaceOrDot(el) || el.val() < lowerLimit || el.val() > upperLimit) {
						ok = false;
					}
				}
			}
			return ok;
		} 
		else if (args.length === 5) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				if (!allowEmpty && el.val().length < 1) {
					ok = false;
				} 
				else {
					if (selectorRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
						if (el.val().length > 0 && (isNaN(el.val()) || isNaN(lowerLimit) || isNaN(upperLimit) ||
							containsSpaceOrDot(el) || el.val() < lowerLimit || el.val() > upperLimit)) {
							ok = false;
						}
					}
					else {
						ok = false;
					}
				}
			}
			return ok;
		}
		return false;
	};
	
	fn.hasValidDateTime = function(format, allowEmpty) {
		var el, ok = true;

		if (arguments.length > 0) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				var strDate = el.val();
				if ((!allowEmpty && strDate.length < 1) || 
					(strDate.length > 0 && ui.convertToDate(strDate, format) === null)) {
					ok = false;
				}
			}
			return ok;
		}
		return false;
	};
	
	fn.hasPastDateTime = function(format, allowEmpty) {
		var el, ok = true;

		if (arguments.length > 0) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				var strDate = el.val();
				if (!allowEmpty && strDate.length < 1) {
					ok = false;
				}				
				else if (el.hasValidDateTime(format, allowEmpty)) {
					if (ui.getTimeOffsetFromNow(strDate, format) >= 0) { 
						ok = false;
					}
				}
				else {
					ok = false;
				}
			}
			return ok;
		}
		return false;
	};
	
	fn.hasPresentDateTime = function(format, allowEmpty) {
		var el, ok = true;
		
		if (arguments.length > 0) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				var strDate = el.val();
				if (!allowEmpty && strDate.length < 1) {
					ok = false;
				}				
				else if (el.hasValidDateTime(format, allowEmpty)) {
					if (ui.getTimeOffsetFromNow(strDate, format) !== 0) { 
						ok = false;
					}
				}
				else {
					ok = false;
				}
			}
			return ok;
		}
		return false;
	};

	fn.hasFutureDateTime = function(format, allowEmpty) {
		var el, ok = true;
		
		if (arguments.length > 0) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				var strDate = el.val();
				if (!allowEmpty && strDate.length < 1) {
					ok = false;
				}				
				else if (el.hasValidDateTime(format, allowEmpty)) {
					if (ui.getTimeOffsetFromNow(strDate, format) <= 0) { 
						ok = false;
					}
				}
				else {
					ok = false;
				}
			}
			return ok;
		}
		return false;
	};
	
	fn.hasDateTimeInRange = function(minDateTimeString, maxDateTimeString, format, allowEmpty) {
		var el, ok = true;

		if (arguments.length > 2) {
			for (var i = 0; i < this.length; i++) {
				el = webui(this[i]);

				var strDate = el.val();
				if (!allowEmpty && strDate.length < 1) {
					ok = false;
				}
				else if (el.hasValidDateTime(format, allowEmpty)) {
					var date = ui.convertToDate(strDate, format);
					var minDate = ui.convertToDate(minDateTimeString, format);
					var maxDate = ui.convertToDate(maxDateTimeString, format);
					if (minDate != null && maxDate != null) {
						if (date.valueOf() < minDate.valueOf() || date.valueOf() > maxDate.valueOf()) {
							ok = false;
						}
					}
					else {
						ok = false;
					}
				}
				else {
					ok = false;
				}
			}
			return ok;
		}
		return false;
	};
	
	webui.convertToDate = function(dateTimeString, format) {
		try {
			if (arguments.length > 1) {
				var parts;
				var dateTokens;
				var timeTokens;
				switch (format) {
					case "DD/MM/YYYY":
					dateTokens = dateTimeString.split("/");
					if (dateTokens.length === 3) {
						return toDateObject(dateTokens[2], dateTokens[1] - 1, dateTokens[0], 0, 0, 0);
					}
					break;

					case "DD/MM/YYYY hh:mm":
					case "DD/MM/YYYY HH:mm":
					parts = dateTimeString.split(" ");
					if (parts.length === 2) {
						dateTokens = parts[0].split("/");
						timeTokens = parts[1].split(":");
						if (dateTokens.length === 3 && timeTokens.length === 2) {
							return toDateObject(dateTokens[2], dateTokens[1] - 1, dateTokens[0], timeTokens[0], timeTokens[1], 0);
						}
					}
					break;

					case "DD/MM/YYYY hh:mm:ss":
					case "DD/MM/YYYY HH:mm:ss":
					parts = dateTimeString.split(" ");
					if (parts.length === 2) {
						dateTokens = parts[0].split("/");
						timeTokens = parts[1].split(":");
						if (dateTokens.length === 3 && timeTokens.length === 3) {
							return toDateObject(dateTokens[2], dateTokens[1] - 1, dateTokens[0], timeTokens[0], timeTokens[1], timeTokens[2]);
						}
					}
					break;

					case "DD-MM-YYYY":
					dateTokens = dateTimeString.split("-");
					if (dateTokens.length === 3) {
						return toDateObject(dateTokens[2], dateTokens[1] - 1, dateTokens[0], 0, 0, 0);
					}
					break;

					case "DD-MM-YYYY hh:mm":
					case "DD-MM-YYYY HH:mm":
					parts = dateTimeString.split(" ");
					if (parts.length === 2) {
						dateTokens = parts[0].split("-");
						timeTokens = parts[1].split(":");
						if (dateTokens.length === 3 && timeTokens.length === 2) {
							return toDateObject(dateTokens[2], dateTokens[1] - 1, dateTokens[0], timeTokens[0], timeTokens[1], 0);
						}
					}
					break;

					case "DD-MM-YYYY hh:mm:ss":
					case "DD-MM-YYYY HH:mm:ss":
					parts = dateTimeString.split(" ");
					if (parts.length === 2) {
						dateTokens = parts[0].split("-");
						timeTokens = parts[1].split(":");
						if (dateTokens.length === 3 && timeTokens.length === 3) {
							return toDateObject(dateTokens[2], dateTokens[1] - 1, dateTokens[0], timeTokens[0], timeTokens[1], timeTokens[2]);
						}
					}
					break;

					case "MM/DD/YYYY":
					dateTokens = dateTimeString.split("/");
					if (dateTokens.length === 3) {
						return toDateObject(dateTokens[2], dateTokens[0] - 1, dateTokens[1], 0, 0, 0);
					}
					break;

					case "MM/DD/YYYY hh:mm":
					case "MM/DD/YYYY HH:mm":
					parts = dateTimeString.split(" ");
					if (parts.length === 2) {
						dateTokens = parts[0].split("/");
						timeTokens = parts[1].split(":");
						if (dateTokens.length === 3 && timeTokens.length === 2) {
							return toDateObject(dateTokens[2], dateTokens[0] - 1, dateTokens[1], timeTokens[0], timeTokens[1], 0);
						}
					}
					break;

					case "MM/DD/YYYY hh:mm:ss":
					case "MM/DD/YYYY HH:mm:ss":
					parts = dateTimeString.split(" ");
					if (parts.length === 2) {
						dateTokens = parts[0].split("/");
						timeTokens = parts[1].split(":");
						if (dateTokens.length === 3 && timeTokens.length === 3) {
							return toDateObject(dateTokens[2], dateTokens[0] - 1, dateTokens[1], timeTokens[0], timeTokens[1], timeTokens[2]);
						}
					}
					break;

					case "MM-DD-YYYY":
					dateTokens = dateTimeString.split("-");
					if (dateTokens.length === 3) {
						return toDateObject(dateTokens[2], dateTokens[0] - 1, dateTokens[1], 0, 0, 0);
					}
					break;

					case "MM-DD-YYYY hh:mm:ss":
					case "MM-DD-YYYY HH:mm:ss":
					parts = dateTimeString.split(" ");
					if (parts.length === 2) {
						dateTokens = parts[0].split("-");
						timeTokens = parts[1].split(":");
						if (dateTokens.length === 3 && timeTokens.length === 3) {
							return toDateObject(dateTokens[2], dateTokens[0] - 1, dateTokens[1], timeTokens[0], timeTokens[1], timeTokens[2]);
						}
					}
					break;

					case "MM-DD-YYYY hh:mm":
					case "MM-DD-YYYY HH:mm":
					parts = dateTimeString.split(" ");
					if (parts.length === 2) {
						dateTokens = parts[0].split("-");
						timeTokens = parts[1].split(":");
						if (dateTokens.length === 3 && timeTokens.length === 2) {
							return toDateObject(dateTokens[2], dateTokens[0] - 1, dateTokens[1], timeTokens[0], timeTokens[1], 0);
						}
					}
					break;

					case "hh:mm":
					case "HH:mm":
					timeTokens = dateTimeString.split(":");
					if (timeTokens.length === 2) {
						return toDateObject(1900, 0, 1, timeTokens[0], timeTokens[1], 0);
					}
					break;

					case "hh:mm:ss":
					case "HH:mm:ss":
					timeTokens = dateTimeString.split(":");
					if (timeTokens.length === 3) {
						return toDateObject(1900, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
					}
					break;
				}
			}
			return null;
		} 
		catch (ex) {
			return null;
		}
	};
	
	webui.getTimeOffsetFromNow = function(dateTimeString, format) {
		try {
			if (arguments.length > 1) {
				var sysDate = new Date();
				var date = ui.convertToDate(dateTimeString, format);
				if (date != null) {
					if (format.toLowerCase() === "hh:mm:ss" || format.toLowerCase() === "hh:mm") {
						date.setDate(sysDate.getDate());
						date.setMonth(sysDate.getMonth());
						date.setFullYear(sysDate.getFullYear());
						if (format.toLowerCase() === "hh:mm") {
							date.setSeconds(sysDate.getSeconds());
						}
						sysDate.setMilliseconds(0);
					} else if (format.toLowerCase() === "dd/mm/yyyy hh:mm:ss" || format.toLowerCase() === "dd/mm/yyyy hh:mm" || format.toLowerCase() === "dd-mm-yyyy hh:mm:ss" || format.toLowerCase() === "dd-mm-yyyy hh:mm" || format.toLowerCase() === "mm/dd/yyyy hh:mm:ss" || format.toLowerCase() === "mm/dd/yyyy hh:mm" || format.toLowerCase() === "mm-dd-yyyy hh:mm:ss" || format.toLowerCase() === "mm-dd-yyyy hh:mm") {
						if (format.toLowerCase() === "dd/mm/yyyy hh:mm" || format.toLowerCase() === "dd-mm-yyyy hh:mm" || format.toLowerCase() === "mm/dd/yyyy hh:mm" || format.toLowerCase() === "mm-dd-yyyy hh:mm") {
							date.setSeconds(sysDate.getSeconds());
						}
						sysDate.setMilliseconds(0);
					} else {
						sysDate.setHours(0, 0, 0, 0);
					}
					return date.getTime() - sysDate.getTime();
				}
			}
			return 0;
		} 
		catch (ex) {
			return 0;
		}
	};
	
	/* REGULAR EXPRESSIONS */
	
	webui.BASIC_STRING = /^([a-zA-Z0-9_\s\-\+\~\.\£\@\*\%\(\)\,\:\'\/]{1,2999})$/;
	webui.ITEM_CODE = /^([A-Z0-9]{1,50})$/;
	webui.INTEGER = /^[-+]?\d+$/;
	webui.POSITIVE_INTEGER = /^\d+$/;
	webui.NUMERIC = /^[-+]?\d+(\.\d+)?$/;
	webui.PASSWORD_STRENGTH = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/;
	webui.EMAIL_ADDRESS = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/;
	webui.UK_TELEPHONE = /^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/;
	webui.US_TELEPHONE = /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/;
	webui.UK_POSTCODE = /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i;
	webui.US_ZIPCODE = /^\d{5}(-\d{4})?$/;
	webui.URL = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
	webui.TRUE_VALUE = /^(true)$/;
	webui.FALSE_VALUE = /^(false)$/;
	webui.ANY_VALUE = /^(?!\s*$).+/;
	
}(window));
	