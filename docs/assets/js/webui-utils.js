/*!
* Name: webui-utils - utility functions
* Version: 4.3.0
* Author: Levi Keogh, 2016-10-25
*/

"use strict";

(function( webui, ui, $, undefined ) {
	

	/* PUBLIC */
	
	ui.sum = function () {
		try {
			var i;
			var n = arguments.length;
			var total = 0;
			
			for (var i = 0; i < n; i++) {
				total += arguments[i];
			}
			return total;
		}
		catch (ex) { return 0; }
	};

	ui.pad = function (number, length, padRight) {
	    try {
	        var str = '' + number;
	        while (str.length < length) {
				if (arguments.length > 2 && padRight) {
					str = str + '0';
				}
				else {
					str = '0' + str;
				}
	        }
	        return str;
	    }
	    catch (ex) { return ""; }
	};

	ui.truncate = function (text, length) {
	    try {
	        var str = '';
	        for (var i = 0; i < length; i++) {
	            str += text.charAt(i);
	        }
	        return str;
	    }
	    catch (ex) { return text; }
	};
	
	ui.limitWords = function(text, wordCount) {
		try {
			var words = text.split(' ');
			words.splice(wordCount, words.length-1);
			return words.join(' ') + (words.length !== text.split(' ').length ? '&hellip;' : '');
		}
		catch (ex) { return text; }
	};
	
	ui.getQueryString = function (key) {
	    try {
	        var temp = location.search.match(new RegExp(key + "=(.*?)($|\\&)", "i"));
	        if (!temp) {
	            return;
	        }
	        return temp[1];
	    }
	    catch (ex) { return ""; }

	};
	
	ui.navigateInternal = function (id, navigate) {
		try {
			var url = window.location.href.split("#");
			if (url != null && url.length > 0) {
				var loc = url[0];
				if (navigate) {
					window.location.href = loc + "#" + id;			
				}
				else {
					history.pushState(id, null, loc + "#" + id);
				}
			}
	    }
	    catch (ex) { return; }		
	};
	
	ui.getAbsoluteUri = function (relativeUrl, virtualRoot, addReturnUrl) {
	    try {
	        var cleanUrl = relativeUrl.replace(/\.\.\//g, "").replace(/\./g, "");
	        cleanUrl = cleanUrl.substring(0, 1) === "/" ? cleanUrl.substring(1, cleanUrl.length) : cleanUrl;
	        var cleanRoot = virtualRoot.substring(0, 1) === "/" ? virtualRoot.substring(1, virtualRoot.length) : virtualRoot;
	        var url = window.top.location.protocol + "//" +
                        window.top.location.host + "/" +
                        ((!cleanRoot || cleanRoot === "/") ? "" : (cleanRoot.substring(cleanRoot.length - 1, cleanRoot.length) === "/" ? cleanRoot : cleanRoot + "/")) +
                        (cleanUrl.substring(cleanUrl.length - 1, cleanUrl.length) === "/" ? cleanUrl.substring(0, cleanUrl.length - 1) : cleanUrl);
	        if (addReturnUrl) {
	            url += "?returnUrl=" + encodeURIComponent(window.top.location.href);
	        }
	        return url;
	    }
	    catch (ex) { return ""; }
	};

	ui.getCookie = function (name) {
		try {
			var start = document.cookie.indexOf( name + "=" );
			var len = start + name.length + 1;

			if ((!start) && (name != document.cookie.substring(0, name.length))) {
				return null;
			}
			if (start == -1) {
				return null;
			}
			
			var end = document.cookie.indexOf(";", len);

			if (end == -1) {
				end = document.cookie.length;
			}
			return unescape(document.cookie.substring( len, end ));
		}
		catch (ex) { return null; }
	};

	ui.setCookie = function (name, value, expires, path, domain, secure) {
		try {
			var today = new Date();

			today.setTime(today.getTime());

			if (expires) {
				expires = expires * 1000 * 60 * 60 * 24;
			}

			var expiryDate = new Date(today.getTime() + (expires));

			document.cookie = name + "=" + escape(value) +
				((expires) ? ";expires=" + expiryDate.toGMTString() : "") +
				((path) ? ";path=" + path : "") + 
				((domain) ? ";domain=" + domain : "") +
				((secure) ? ";secure" : "");
				
			return true;
		}
		catch (ex) { return false; }
	};

	ui.deleteCookie = function (name, path, domain) {
		try {
			if (ui.getCookie(name)) {
				document.cookie = name + "=" +
				((path) ? ";path=" + path : "") +
				(( domain) ? ";domain=" + domain : "") +
				";expires=Thu, 01-Jan-1970 00:00:01 GMT";
			}	
			return true;
		}
		catch (ex) { return false; }
	};

	
	/* EXTENSIONS */
	
	Array.prototype.inArray = function (value) {
		try {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === value) {
					return true;
				}
			}
			return false;
		}
		catch (ex) { return false; }
	};

	
	ui.version = "webui-utils-4.3.0";

}( window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery ));
