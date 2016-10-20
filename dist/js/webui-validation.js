/*!
* Name: webui-validation - validation functions
* Version: 4.2.0
* Author: Levi Keogh, 2016-10-16
*/
"use strict";

(function(webui, ui, $, undefined) {
    /* PRIVATE */
    var dependsOnRegExpMatches = function(dependsOnSelector, dependsOnRegExp) {
        return $("#" + dependsOnSelector).is("input:text") && dependsOnRegExp.test($("#" + dependsOnSelector).val()) || $("#" + dependsOnSelector).is("textarea") && dependsOnRegExp.test($("#" + dependsOnSelector).text()) || $("#" + dependsOnSelector).is("select") && dependsOnRegExp.test($("#" + dependsOnSelector + " option:selected").text()) || $("#" + dependsOnSelector).is("input:checkbox") && dependsOnRegExp.test($("#" + dependsOnSelector).is(":checked"));
    };
    var containsSpaceOrDot = function(selector) {
        return /^\s$/.test($("#" + selector).val()) || $("#" + selector).val().indexOf(".") > -1;
    };
    var containsSpace = function(selector) {
        return /^\s$/.test($("#" + selector).val());
    };
    var toDateObject = function(year, month, day, hour, minute, second) {
        try {
            var date = new Date(year, month, day, hour, minute, second);
            if (date.getDate() == day && date.getMonth() == month && date.getFullYear() == year && date.getHours() == hour && date.getMinutes() == minute && date.getSeconds() == second) {
                return date;
            }
            return null;
        } catch (ex) {
            return null;
        }
    };
    /* PUBLIC */
    ui.isCheckedValue = function(selector, dependsOnSelector, dependsOnRegExp) {
        try {
            if (arguments.length === 1) {
                return $("#" + selector).is(":checked");
            } else if (arguments.length === 3) {
                if (dependsOnRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
                    return $("#" + selector).is(":checked");
                }
            }
            return false;
        } catch (ex) {
            return false;
        }
    };
    ui.isConformingString = function(selector, selectorRegExp, allowEmpty, dependsOnSelector, dependsOnRegExp) {
        try {
            if (arguments.length === 3) {
                if (!allowEmpty && $("#" + selector).val().length < 1) {
                    return false;
                } else if ($("#" + selector).val().length > 0) {
                    if (!selectorRegExp.test($("#" + selector).val())) {
                        return false;
                    }
                }
                return true;
            } else if (arguments.length === 5) {
                if (!allowEmpty && $("#" + selector).val().length < 1) {
                    return false;
                } else if ($("#" + selector).val().length > 0) {
                    if (dependsOnRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
                        if (!selectorRegExp.test($("#" + selector).val())) {
                            return false;
                        }
                        return true;
                    }
                    return false;
                }
                return true;
            }
            return false;
        } catch (ex) {
            return false;
        }
    };
    ui.isNumericInRange = function(selector, lowerLimit, upperLimit, allowEmpty, dependsOnSelector, dependsOnRegExp) {
        try {
            if (arguments.length === 4) {
                if (!allowEmpty && $("#" + selector).val().length < 1) {
                    return false;
                } else if ($("#" + selector).val().length > 0) {
                    if (isNaN($("#" + selector).val()) || isNaN(lowerLimit) || isNaN(upperLimit)) {
                        return false;
                    } else {
                        if (containsSpace(selector) || $("#" + selector).val() < lowerLimit || $("#" + selector).val() > upperLimit) {
                            return false;
                        }
                    }
                }
                return true;
            } else if (arguments.length === 6) {
                if (!allowEmpty && $("#" + selector).val().length < 1) {
                    return false;
                } else if ($("#" + selector).val().length > 0) {
                    if (dependsOnRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
                        if (isNaN($("#" + selector).val()) || isNaN(lowerLimit) || isNaN(upperLimit)) {
                            return false;
                        } else {
                            if (containsSpace(selector) || $("#" + selector).val() < lowerLimit || $("#" + selector).val() > upperLimit) {
                                return false;
                            }
                        }
                        return true;
                    }
                    return false;
                }
                return true;
            }
            return false;
        } catch (ex) {
            return false;
        }
    };
    ui.isIntegerInRange = function(selector, lowerLimit, upperLimit, allowEmpty, dependsOnSelector, dependsOnRegExp) {
        try {
            if (arguments.length === 4) {
                if (!allowEmpty && $("#" + selector).val().length < 1) {
                    return false;
                } else if ($("#" + selector).val().length > 0) {
                    if (isNaN($("#" + selector).val()) || isNaN(lowerLimit) || isNaN(upperLimit)) {
                        return false;
                    } else {
                        if (containsSpaceOrDot(selector) || $("#" + selector).val() < lowerLimit || $("#" + selector).val() > upperLimit) {
                            return false;
                        }
                    }
                }
                return true;
            } else if (arguments.length === 6) {
                if (!allowEmpty && $("#" + selector).val().length < 1) {
                    return false;
                } else if ($("#" + selector).val().length > 0) {
                    if (dependsOnRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
                        if (isNaN($("#" + selector).val()) || isNaN(lowerLimit) || isNaN(upperLimit)) {
                            return false;
                        } else {
                            if (containsSpaceOrDot(selector) || $("#" + selector).val() < lowerLimit || $("#" + selector).val() > upperLimit) {
                                return false;
                            }
                        }
                        return true;
                    }
                    return false;
                }
                return true;
            }
            return false;
        } catch (ex) {
            return false;
        }
    };
    ui.isValidDateTime = function(selector, format, allowEmpty) {
        try {
            if (arguments.length > 1) {
                var strDate = $("#" + selector).val();
                if (allowEmpty && strDate.length < 1) {
                    return true;
                }
                if (ui.convertToDate(strDate, format) != null) {
                    return true;
                }
            }
            return false;
        } catch (ex) {
            return false;
        }
    };
    ui.isPastDateTime = function(selector, format, allowEmpty) {
        try {
            if (arguments.length > 1) {
                var strDate = $("#" + selector).val();
                if (allowEmpty && strDate.length < 1) {
                    return true;
                }
                var sysDate = new Date();
                if (ui.isValidDateTime(selector, format, allowEmpty)) {
                    return ui.getTimeOffsetFromNow(strDate, format) < 0;
                }
            }
            return false;
        } catch (ex) {
            return false;
        }
    };
    ui.isPresentDateTime = function(selector, format, allowEmpty) {
        try {
            if (arguments.length > 1) {
                var strDate = $("#" + selector).val();
                if (allowEmpty && strDate.length < 1) {
                    return true;
                }
                var sysDate = new Date();
                if (ui.isValidDateTime(selector, format, allowEmpty)) {
                    return ui.getTimeOffsetFromNow(strDate, format) === 0;
                }
            }
            return false;
        } catch (ex) {
            return false;
        }
    };
    ui.isFutureDateTime = function(selector, format, allowEmpty) {
        try {
            if (arguments.length > 1) {
                var strDate = $("#" + selector).val();
                if (allowEmpty && strDate.length < 1) {
                    return true;
                }
                var sysDate = new Date();
                if (ui.isValidDateTime(selector, format, allowEmpty)) {
                    return ui.getTimeOffsetFromNow(strDate, format) > 0;
                }
            }
            return false;
        } catch (ex) {
            return false;
        }
    };
    ui.isDateTimeInRange = function(selector, minDateTimeString, maxDateTimeString, format, allowEmpty) {
        try {
            if (arguments.length > 3) {
                var strDate = $("#" + selector).val();
                if (allowEmpty && strDate.length < 1) {
                    return true;
                }
                if (ui.isValidDateTime(selector, format, allowEmpty)) {
                    var date = ui.convertToDate(strDate, format);
                    var minDate = ui.convertToDate(minDateTimeString, format);
                    var maxDate = ui.convertToDate(maxDateTimeString, format);
                    if (minDate != null && maxDate != null) {
                        return date.valueOf() >= minDate.valueOf() && date.valueOf() <= maxDate.valueOf();
                    }
                }
            }
            return false;
        } catch (ex) {
            return false;
        }
    };
    ui.convertToDate = function(dateTimeString, format) {
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
        } catch (ex) {
            return null;
        }
    };
    ui.getTimeOffsetFromNow = function(dateTimeString, format) {
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
        } catch (ex) {
            return 0;
        }
    };
    /* REGULAR EXPRESSIONS */
    ui.BASIC_STRING = /^([a-zA-Z0-9_\s\-\+\~\.\£\@\*\%\(\)\,\:\'\/]{1,2999})$/;
    ui.ITEM_CODE = /^([A-Z0-9]{1,50})$/;
    ui.INTEGER = /^[-+]?\d+$/;
    ui.POSITIVE_INTEGER = /^\d+$/;
    ui.NUMERIC = /^[-+]?\d+(\.\d+)?$/;
    ui.PASSWORD_STRENGTH = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/;
    ui.EMAIL_ADDRESS = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/;
    ui.UK_TELEPHONE = /^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/;
    ui.US_TELEPHONE = /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/;
    ui.UK_POSTCODE = /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i;
    ui.US_ZIPCODE = /^\d{5}(-\d{4})?$/;
    ui.URL = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    ui.TRUE_VALUE = /^(true)$/;
    ui.FALSE_VALUE = /^(false)$/;
    ui.ANY_VALUE = /^(?!\s*$).+/;
    ui.version = "webui-validation-4.2.0";
})(window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery);