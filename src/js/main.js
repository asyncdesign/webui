/*!
* Name: webui - UI functions
* Version: 11.0.0
* MIT License
*/

"use strict";

(function (win) {

	var
		root = document,

		isObject = function (el) {
			return el instanceof Object;
		},
		isFunction = function (el) {
			return ({}).toString.call(el) === "[object Function]";
		},
		isArray = function (el) {
			return Array.isArray(el);
		},
		isString = function (el) {
			return typeof el === "string";
		},
		isElement = function (el) {
			return el instanceof Element;
		},
		isDiv = function (el) {
			return el && el.nodeName === "DIV";
		},
		isSpan = function (el) {
			return el && el.nodeName === "SPAN";
		},
		isTextarea = function (el) {
			return el && el.nodeName === "TEXTAREA";
		},
		isSelect = function (el) {
			return el && el.nodeName === "SELECT";
		},
		isDatalist = function (el) {
			return el && el.nodeName === "DATALIST";
		},
		isCheckbox = function (el) {
			return el && el.getAttribute("type") === "checkbox";
		},
		isRadio = function (el) {
			return el && el.getAttribute("type") === "radio";
		},
		isTextbox = function (el) {
			if (el && el.nodeName === "INPUT") {
				if (el.getAttribute("type") === null || ~["text", "number", "password", "date", "search", "tel", "email", "url"].indexOf(el.getAttribute("type"))) {
					return true;
				}
			}
			return false;
		},
		isPassword = function (el) {
			if (el && el.nodeName === "INPUT" && el.getAttribute("type") === "password") {
				return true;
			}
			return false;
		},
		isButton = function (el) {
			if (el && el.nodeName === "BUTTON" || el && el.nodeName === "INPUT" && el.getAttribute("type") === "button") {
				return true;
			}
			return false;
		},
		isArrayLike = function (obj) {
			var length = obj.length,
				type = typeof obj;

			if (isFunction(type) || obj === win) {
				return false;
			}

			if (obj.nodeType === 1 && length) {
				return true;
			}

			return isArray(type) || length === 0 ||
				typeof length === "number" &&
				length > 0;
		},
		valueEquals = function (selector, value) {
			var el = webui(selector);

			if (el.length === 1) {
				return (isTextbox(el[0]) && el.val() === value) || (isTextarea(el[0]) && el.text() === value) ||
					(isSelect(el[0]) && el.find("option:checked").text() === value) ||
					(isCheckbox(el[0]) && el.is(":checked") === value) ||
					(isRadio(el[0]) && el.is(":checked") === value);
			}
			return false;
		},
		switchClasses = function (selector, currentCssClass, newCssClass) {
			var els = webui(selector);

			if (isString(currentCssClass) && currentCssClass.trim()) {
				els.removeClass(currentCssClass);
			}
			if (isString(newCssClass) && newCssClass.trim()) {
				els.addClass(newCssClass);
			}

			for (var i = 0; i < els.length; i++) {
				if (isSelect(els[i])) {
					webui(els[i]).find("option").css("color", webui(els[i]).css("color"));
				}
			}
		},
		delay = function(delay, callback) {
			if (delay) {
				setTimeout(function() {
						callback();
				}, delay);
			}
			else {
				callback();
			}
		},
		runToggleAction = function (selector, toggleContainer) {
			
			if (toggleContainer.length) {
				var toggleBody = webui(".off-canvas-body");
				var toggleItem = toggleContainer.find(selector);

				var transitionDuration = parseInt(toggleContainer.data("transition-duration"));
				var transitionInDelay = toggleContainer.data("transition-in-delay");
				var transitionOutDelay = toggleContainer.data("transition-out-delay");
				var transitionType = toggleContainer.data("transition-type");
				var transitionOrientation = toggleContainer.data("transition-orientation");
				var transitionDistance = toggleContainer.data("transition-distance");

				var offCanvasDrawer = toggleItem.hasClass("off-canvas-drawer");
				var offCanvas = toggleItem.hasClass("off-canvas-left") || toggleItem.hasClass("off-canvas-right");
				var offCanvasLeft = toggleItem.hasClass("off-canvas-left");				


				if (toggleItem.length) {

					var toggleItemWidth = toggleItem[0].offsetWidth;

					if (!offCanvasDrawer && offCanvas && toggleBody.length) {

						ui(".off-canvas-left, .off-canvas-right").css("transition-duration", (transitionDuration / 1000) + "s");
						toggleBody.css("transition-duration", (transitionDuration / 1000) + "s");

						if (toggleItem.hasClass("off-canvas-closed")) {

							toggleItem.trigger("ui.toggleItem.show.before");

							delay(transitionInDelay, function () {
								toggleItem.removeClass("off-canvas-closed");
								
								if (offCanvasLeft) {
									toggleItem.css("transform", "translate(0, 0)");
									toggleBody.css("transform", "translate(" + toggleItemWidth + "px, 0)");
								}
								else {
									toggleItem.css("transform", "translate(0, 0)");
									toggleBody.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
								}
								toggleItem.trigger("ui.toggleItem.show.after");
							});				
						} 
						else {
										
							toggleItem.trigger("ui.toggleItem.hide.before");

							delay(transitionOutDelay, function () {
								if (offCanvasLeft) {
									toggleItem.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
									toggleBody.css("transform", "translate(0, 0)");								
								}
								else {
									toggleItem.css("transform", "translate(" + toggleItemWidth + "px, 0)");
									toggleBody.css("transform", "translate(0, 0)");
								}
								toggleItem.addClass("off-canvas-closed");
								toggleItem.trigger("ui.toggleItem.hide.after");
							});				
						}
					}
					else if (offCanvas) {

						ui(".off-canvas-left, .off-canvas-right").css("transition-duration", (transitionDuration / 1000) + "s");
					
						if (toggleItem.hasClass("off-canvas-closed")) {

							toggleItem.trigger("ui.toggleItem.show.before");

							delay(transitionInDelay, function () {
								toggleItem.removeClass("off-canvas-closed");
								
								if (offCanvasLeft) {
									toggleItem.css("transform", "translate(0, 0)");
								}
								else {
									toggleItem.css("transform", "translate(0, 0)");
								}
								toggleItem.trigger("ui.toggleItem.show.after");
							});			
						} 
						else {
										
							toggleItem.trigger("ui.toggleItem.hide.before");

							delay(transitionOutDelay, function () {
								if (offCanvasLeft) {
									toggleItem.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
								}
								else {
									toggleItem.css("transform", "translate(" + toggleItemWidth + "px, 0)");
								}
								toggleItem.addClass("off-canvas-closed");
								toggleItem.trigger("ui.toggleItem.hide.after");
							});						
						}
					}
					else {
						var els = toggleItem, el;

						for (var i = 0; i < els.length; i++) {

							el = webui(els[i]);

							if (el.css("display") === "block") {

								el.trigger("ui.toggleItem.hide.before");

								delay(transitionOutDelay, function () {
									if (transitionDuration && transitionType === "fade") {
										el.fadeOut(transitionDuration, 0, function() {
											el.trigger("ui.toggleItem.hide.after");
										});
									}
									else if (transitionDuration && transitionType === "collapse") {
										if (transitionOrientation === "horizontal") {
											el.collapseHorizontal(transitionDuration, 0, function() {
												el.trigger("ui.toggleItem.hide.after");
											});
										}
										else {
											el.collapseVertical(transitionDuration, 0, function() {
												el.trigger("ui.toggleItem.hide.after");
											});
										}
									}
									else {
										el.hide();
										el.trigger("ui.toggleItem.hide.after");
									}	
								});	
							} 
							else {
								el.trigger("ui.toggleItem.show.before");
		
								if (transitionDuration && transitionType === "fade") {
									delay(transitionInDelay, function () {
										el.fadeIn(transitionDuration, 0, function() {
											el.trigger("ui.toggleItem.show.after");
										});
									});
								}
								else if (transitionDuration && transitionType === "collapse") {
									delay(transitionInDelay, function () {
										if (transitionOrientation === "horizontal") {
											if (transitionDistance) {
												el.expandHorizontal(transitionDuration, transitionDistance, function() {
													el.trigger("ui.toggleItem.show.after");
												});											
											}
											else {
												el.expandHorizontal(transitionDuration, "auto", function() {
													el.trigger("ui.toggleItem.show.after");
												});
											}
										}
										else {
											if (transitionDistance) {
												el.expandVertical(transitionDuration, transitionDistance, function() {
													el.trigger("ui.toggleItem.show.after");
												});
											}
											else {
												el.expandVertical(transitionDuration, "auto", function() {
													el.trigger("ui.toggleItem.show.after");
												});										
											}
										}
									});
								}
								else {
									delay(transitionInDelay, function () {
										el.show();
										el.trigger("ui.toggleItem.show.after");
									});
								}
								
								if (toggleContainer.hasClass("toggle-inclusive") === false) {

									delay(transitionOutDelay, function () {
										if (transitionDuration && transitionType === "fade") {
											el.siblings(".toggle-item").fadeOut(transitionDuration);
										}
										else if (transitionDuration && transitionType === "collapse") {
											if (transitionOrientation === "horizontal") {
												el.siblings(".toggle-item").collapseHorizontal(transitionDuration);
											}
											else {
												el.siblings(".toggle-item").collapseVertical(transitionDuration);
											}
										}
										else {
											el.siblings(".toggle-item").hide();
										}
									});
								}
							}
						}
					}
				}
			}
		},
		enableDisable = function (selector, enableSelector, currentCssClass, removeCssClass, withValue) {
			var args = arguments;

			if (enableSelector) {
				selector.attr("disabled", "");
				selector.attr("readonly", "");
			}
			else {
				selector.attr("disabled", "disabled");
				selector.attr("readonly", "readonly");
			}
			if (args.length > 2) {
				if (enableSelector) {
					switchClasses(selector, removeCssClass, currentCssClass);
				}
				else {
					switchClasses(selector, removeCssClass, currentCssClass);
				}
			}
			if (args.length === 5 && (isString(withValue) && withValue.trim())) {
				var el;
				for (var i = 0; i < selector.length; i++) {
					el = selector[i];
					if (isTextbox(el) || isButton(el)) {
						el.value = withValue;
					}
					else if (isSelect(el)) {
						webui(el).setOptionText(0, withValue);
					}
					else if (!isCheckbox(selector) && !isRadio(selector)) {
						el.innerHTML = withValue;
					}
				}
			}
			return selector;
		},

		enableDisableConditionally = function (selector, enableSelector, dependsOnSelector, dependsOnValues, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
			var args = arguments;

			if (args.length > 5) {
				var found = false;
				for (var i = 0; i < dependsOnValues.length; i++) {
					var dependsOnValue = dependsOnValues[i];
					var els = webui(dependsOnSelector);
					for (var j = 0; j < els.length; j++) {
						if (valueEquals(els[j], dependsOnValue)) {
							found = true;

							if (enableSelector) {
								if (args.length > 6 && enabledValue !== null) {
									selector.reset(true);
									selector.enable(enabledCssClass, disabledCssClass, enabledValue);
								}
								else {
									selector.enable(enabledCssClass, disabledCssClass);
								}
							}
							else {
								if (args.length > 6 && disabledValue !== null) {
									selector.reset(true);
									selector.disable(disabledCssClass, enabledCssClass, disabledValue);
								}
								else {
									selector.disable(disabledCssClass, enabledCssClass);
								}
							}
							return selector;
						}
					}
				}
				if (!found) {
					if (enableSelector) {
						if (args.length > 7 && disabledValue !== null) {
							selector.reset(true);
							selector.disable(disabledCssClass, enabledCssClass, disabledValue);
						}
						else {
							selector.disable(disabledCssClass, enabledCssClass);
						}
					}
					else {
						if (args.length > 7 && enabledValue !== null) {
							selector.reset(true);
							selector.enable(enabledCssClass, disabledCssClass, enabledValue);
						}
						else {
							selector.enable(enabledCssClass, disabledCssClass);
						}
					}
				}
			}
			return selector;
		},

		showHideConditionally = function (selector, showSelector, dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue) {
			var args = arguments;

			if (args.length > 3) {
				var found = false;
				for (var i = 0; i < dependsOnValues.length; i++) {
					var dependsOnValue = dependsOnValues[i];
					var deps = webui(dependsOnSelector);
					for (var j = 0; j < deps.length; j++) {
						if (valueEquals(deps[j], dependsOnValue)) {
							found = true;
							if (showSelector) {
								selector.show();
							}
							else {
								selector.hide();
							}
							if (args.length > 5) {
								var infs = webui(infoSelector);
								for (var l = 0; l < infs.length; l++) {
									if (isTextbox(infs[l]) || isButton(infs[l])) {
										webui(infs[l]).val(infoSelectorValue);
									}
									else if (isSelect(infs[l])) {
										var options = webui(infs[l]).find("option");
										for (var m = 0; m < options.length; m++) {
											if (options[m].innerHTML === infoSelectorValue) {
												options[m].selected = true;
											}
										}
									}
									else {
										webui(infs[l]).text(infoSelectorValue);
									}
								}
							}
							return selector;
						}
					}
				}
				if (!found) {
					if (showSelector) {
						selector.hide();
					}
					else {
						selector.show();
					}
					if (args.length > 5) {
						var infs = webui(infoSelector);
						for (var j = 0; j < infs.length; j++) {
							if (isTextbox(infs[j]) || isButton(infs[j])) {
								webui(infs[j]).val("");
							}
							else if (isSelect(infs[j])) {
								var options = webui(infs[j]).find("option");
								for (var k = 0; k < options.length; k++) {
									if (options[k].innerHTML === infoSelectorValue) {
										options[k].selected = false;
									}
								}
							}
							else {
								webui(infs[j]).text("");
							}
						}
					}
				}
			}
			return selector;
		},

		webui = function (selector) {
			return new fn.o(selector);
		},

		selectorRegExp = /^([a-zA-Z0-9_=\-\s\[\]\.\#\*\,\>\+\~\(\)\:\"\']{1,255})$/,
		domFragRegExp = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

		fn = webui.fn = webui.prototype = {
			length: 0,

			o: function (selector) {

				if (!selector) {
					return this;
				}

				if (selector.nodeType) {
					this[0] = selector;
					this.length = 1;
					return this;
				}

				if (selector instanceof webui) {
					return selector;
				}

				if (isString(selector)) {
					if (selectorRegExp.test(selector)) {
						var el = root.querySelectorAll(selector);
						if (el.length === 0) {
							return this;
						}
						else if (el.length === 1) {
							this[0] = el[0];
							this.length = 1;
							return this;
						}
						else if (el.length > 1) {
							return webui.mergeArray(this, el);
						}
					}
					else if (domFragRegExp.test(selector)) {
						var fragment = root.createDocumentFragment();
						var wrapper = root.createElement("div");
						wrapper.innerHTML = selector;

						while (wrapper.lastChild) {
							fragment.appendChild(wrapper.firstChild);
						}
						var elements = [].slice.call(fragment.childNodes);

						return webui.mergeArray(this, elements);
					}
				}
				return webui.createArray(selector, this);
			},
			pop: [].pop,
			push: [].push,
			reverse: [].reverse,
			shift: [].shift,
			sort: [].sort,
			splice: [].splice,
			slice: [].slice,
			indexOf: [].indexOf,
			forEach: [].forEach,
			unshift: [].unshift,
			concat: [].concat,
			join: [].join,
			every: [].every,
			some: [].some,
			filter: [].filter,
			map: [].map,
			reduce: [].reduce,
			reduceRight: [].reduceRight
		};

	fn.constructor = webui;
	fn.o.prototype = fn;

	fn.first = function () {
		if (this.length) {
			return webui(this[0]);
		}
		return this;
	};

	fn.last = function () {
		if (this.length) {
			return webui(this[this.length - 1]);
		}
		return this;
	};

	fn.eq = function (index) {
		if (this.length) {
			return webui(this[index]);
		}
		return this;
	};

	fn.find = function (query) {
		var nodes = [],
			el;

		for (var i = 0; i < this.length; i++) {
			var els = this[i].querySelectorAll(query);
			for (var j = 0; j < els.length; j++) {
				if (!~nodes.indexOf(el = els[j]) && el) {
					nodes.push(el);
				}
			}
		}
		return webui(nodes);
	};

	fn.select = function (query) {
		var nodes = [],
			el;

		var els = root.querySelectorAll(query);
		for (var i = 0; i < els.length; i++) {
			for (var j = 0; j < this.length; j++) {
				if (!~nodes.indexOf(el = els[i]) && el && el === this[j]) {
					nodes.push(el);
				}
			}
		}
		return webui(nodes);
	};

	fn.elements = function () {
		var nodes = [];
		for (var i = 0; i < this.length; i++) {
			nodes.push(this[i]);
		}
		return nodes;
	};

	fn.siblings = function (query) {
		var args = arguments.length,
			nodes = [];

		for (var i = 0; i < this.length; i++) {
			var els = args ? webui(this[i].parentNode.children).select(query) : webui(this[i].parentNode.children).select("*");

			if (els && els.length) {
				for (var j = 0; j < els.length; j++) {
					if (els[j] !== this[i] && !~nodes.indexOf(els[j])) {
						nodes.unshift(els[j]);
					}
				}
			}
		}
		return webui(nodes);
	};

	fn.prevSibling = function (query) {
		var args = arguments.length,
			nodes = [];

		for (var i = 0; i < this.length; i++) {
			var el = this[i].previousElementSibling;
			if (el) {
				nodes.push(el);
			}
		}
		return args ? webui(nodes).select(query) : webui(nodes);
	};

	fn.prevSiblings = function (query) {
		var args = arguments.length,
			nodes = [];

		for (var i = 0; i < this.length; i++) {
			var el = this[i];

			while (el.previousElementSibling) {
				nodes.push(el.previousElementSibling);
				el = el.previousElementSibling;
			}
		}
		return args ? webui(nodes).select(query) : webui(nodes);
	};

	fn.nextSibling = function (query) {
		var args = arguments.length,
			nodes = [];

		for (var i = 0; i < this.length; i++) {
			var el = this[i].nextElementSibling;
			if (el) {
				nodes.push(el);
			}
		}
		return args ? webui(nodes).select(query) : webui(nodes);
	};

	fn.nextSiblings = function (query) {
		var args = arguments.length,
			nodes = [];

		for (var i = 0; i < this.length; i++) {
			var el = this[i];

			while (el.nextElementSibling) {
				nodes.push(el.nextElementSibling);
				el = el.nextElementSibling;
			}
		}
		return args ? webui(nodes).select(query) : webui(nodes);
	};

	fn.parent = function (query) {
		var args = arguments.length,
			nodes = [],
			parent;

		for (var i = 0; i < this.length; i++) {
			if (!~nodes.indexOf(parent = this[i].parentElement) && parent) {
				nodes.push(parent);
			}
		}
		return args ? webui(nodes).select(query) : webui(nodes);
	};

	fn.parents = function (query) {
		var args = arguments.length,
			nodes = [],
			el, els;

		for (var i = 0; i < this.length; i++) {
			el = this[i];

			while (el.parentElement) {
				els = webui(el.parentElement);

				if (els && els.length) {
					if (!~nodes.indexOf(els[0])) {
						nodes.push(els[0]);
					}
				}
				el = el.parentElement;
			}
		}
		return args ? webui(nodes).select(query) : webui(nodes);
	};

	fn.closest = function (query) {
		var nodes = [],
			el, els;

		for (var i = 0; i < this.length; i++) {
			el = this[i];
			els = webui(el).select(query);

			if (els && els.length) {
				nodes.push(els[0]);
			}
			else {
				while (el.parentElement) {
					els = webui(el.parentElement).select(query);

					if (els && els.length) {
						if (!~nodes.indexOf(els[0])) {
							nodes.push(els[0]);
						}
						break;
					}
					el = el.parentElement;
				}
			}
		}
		return webui(nodes);
	};

	fn.children = function (query) {
		var args = arguments,
			nodes = [],
			child;

		if (args.length === 0) {
			for (var i = 0; i < this.length; i++) {
				var children = this[i].children;
				for (var j = 0; j < children.length; j++) {
					if (!~nodes.indexOf(child = children[j]) && child) {
						nodes.push(child);
					}
				}
			}
		}
		else {
			var els = root.querySelectorAll(query);
			for (var i = 0; i < this.length; i++) {
				var children = this[i].children;
				for (var j = 0; j < children.length; j++) {
					for (var k = 0; k < els.length; k++) {
						if (!~nodes.indexOf(child = children[j]) && child && child === els[k]) {
							nodes.push(child);
						}
					}
				}
			}				
		}
		return webui(nodes);
	};

	fn.append = function (elements, appendToStart) {
		var args = arguments,
			els, el;

		if (isObject(elements) || (isString(elements) && domFragRegExp.exec(elements))) {
			els = webui(elements);

			if (args.length === 1 || (args.length === 2 && !appendToStart)) {
				for (var i = 0; i < this.length; i++) {
					el = this[i];
					if (el.nodeType === 1 || el.nodeType === 11 || el.nodeType === 9) {
						for (var j = 0; j < els.length; j++) {
							el.appendChild(els[j]);
						}
					}
				}
			}
			else if (args.length === 2 && appendToStart) {
				for (var i = 0; i < this.length; i++) {
					el = this[i];
					if (el.nodeType === 1 || el.nodeType === 11 || el.nodeType === 9) {
						for (var j = 0; j < els.length; j++) {
							el.insertBefore(els[j], el.firstChild);
						}
					}
				}
			}
		}
		return this;
	};

	fn.appendTo = function (to) {
		webui(to).append(this);

		return this;
	};

	fn.prependTo = function (to) {
		webui(to).append(this, true);

		return this;
	};

	fn.remove = function () {
		for (var i = 0; i < this.length; i++) {
			this[i].parentNode && this[i].parentNode.removeChild(this[i]);
		}
		return webui([]);
	};

	fn.removeChildren = function () {
		var el;

		for (var i = 0; i < this.length; i++) {
			el = this[i];
			while (el.lastChild) {
				el.removeChild(el.lastChild);
			}
		}
		return this;
	};

	fn.hasClass = function (className) {
		for (var i = 0; i < this.length; i++) {
			if (this[i].classList) {
				if (this[i].classList.contains(className)) {
					return true;
				}
			}
			else {
				if (new RegExp("(^| )" + className + "( |$)", "gi").test(this[i].className)) {
					return true;
				}
			}
		}
		return false;
	};

	fn.addClass = function (className) {
		for (var i = 0; i < this.length; i++) {
			if (this[i].classList) {
				var classNames = className.split(" ");
				for (var j = 0; j < classNames.length; j++) {
					this[i].classList.add(classNames[j]);
				}
			} else {
				this[i].className += " " + className;
			}
		}
		return this;
	};

	fn.removeClass = function (className) {
		for (var i = 0; i < this.length; i++) {
			if (className === "*") {
				this[i].className = "";
			} else {
				if (this[i].classList) {
					var classNames = className.split(" ");
					for (var j = 0; j < classNames.length; j++) {
						this[i].classList.remove(classNames[j]);
					}
				} else {
					this[i].className = this[i].className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
				}	
			}
		}
		return this;
	};

	fn.attr = function (attrName, attrValue) {
		var args = arguments,
			values = [];

		if (args.length === 1) {
			for (var i = 0; i < this.length; i++) {
				values.push(this[i].getAttribute(attrName));
			}
			return values.length === 1 ? values[0] : values;
		}
		else if (args.length === 2) {
			if (attrValue === null || attrValue === "") {
				for (var i = 0; i < this.length; i++) {
					this[i].removeAttribute(attrName);
				}
			}
			else {
				for (var i = 0; i < this.length; i++) {
					this[i].setAttribute(attrName, attrValue);
				}
			}
		}
		return this;
	};

	fn.data = function (dataName, dataValue) {
		var args = arguments,
			name = dataName.toLowerCase(),
			values = [];

		if (args.length === 1) {
			for (var i = 0; i < this.length; i++) {
				values.push(this[i].getAttribute("data-" + name));
			}
			return values.length === 1 ? values[0] : values;
		}
		else if (args.length === 2) {
			if (dataValue === null || dataValue === "") {
				for (var i = 0; i < this.length; i++) {
					this[i].removeAttribute("data-" + name);
				}
			}
			else {
				for (var i = 0; i < this.length; i++) {
					this[i].setAttribute("data-" + name, dataValue);
				}
			}
		}
		return this;
	};

	fn.css = function (ruleName, ruleValue) {
		var args = arguments,
			styles = [];

		if (args.length === 1) {
			for (var i = 0; i < this.length; i++) {
				var val = win.getComputedStyle(this[i])[ruleName];
				if (ruleName === "height" && this[i].getBoundingClientRect().height > parseFloat(val)) {
						val = this[i].getBoundingClientRect().height + "px";
				}
				else if (ruleName === "width" && this[i].getBoundingClientRect().width > parseFloat(val)) {
						val = this[i].getBoundingClientRect().width + "px";
				}
				styles.push(val != "" ? val : this[i].style[ruleName]);
			}
			return styles.length === 1 ? styles[0] : styles;
		}
		else if (args.length === 2) {
			for (var i = 0; i < this.length; i++) {
				this[i].style[ruleName] = ruleValue;
			}
		}
		return this;
	};

	fn.val = function (value) {
		var args = arguments,
			values = [];

		if (args.length === 1) {
			for (var i = 0; i < this.length; i++) {
				this[i].value = value;
			}
		}
		else {
			for (var i = 0; i < this.length; i++) {
				values.push(this[i].value);
			}
			return values.length === 1 ? values[0] : values;
		}
		return this;
	};

	fn.html = function (value) {
		var args = arguments,
			values = [];

		if (args.length === 1) {
			for (var i = 0; i < this.length; i++) {
				this[i].innerHTML = value;
			}
		}
		else {
			for (var i = 0; i < this.length; i++) {
				values.push(this[i].innerHTML);
			}
			return values.length === 1 ? values[0] : values;
		}
		return this;
	};

	fn.text = function (value) {
		var args = arguments,
			values = [];

		if (args.length === 1) {
			for (var i = 0; i < this.length; i++) {
				this[i].textContent = value;
			}
		}
		else {
			for (var i = 0; i < this.length; i++) {
				values.push(this[i].textContent);
			}
			return values.length === 1 ? values[0] : values;
		}
		return this;
	};

	fn.show = function () {
		for (var i = 0; i < this.length; i++) {
			this[i].style["display"] = "block";
		}
		return this;
	};

	fn.hide = function () {
		for (var i = 0; i < this.length; i++) {
			this[i].style["display"] = "none";
		}
		return this;
	};

	fn.visible = function () {
		for (var i = 0; i < this.length; i++) {
			this[i].style["visibility"] = "visible";
		}
		return this;
	};

	fn.hidden = function () {
		for (var i = 0; i < this.length; i++) {
			this[i].style["visibility"] = "hidden";
		}
		return this;
	};

	fn.has = function (query) {
		return this.find(query).length > 0 ? true : false;
	};

	fn.is = function (query) {
		var els = this.parent().find(query);

		for (var i = 0; i < this.length; i++) {
			for (var j = 0; j < els.length; j++) {
				if (this[i] === els[j]) {
					return true;
				}
			}
		}			
		return false;
	};

	fn.hoverIn = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("mouseenter", eventCallback);
		}
		return this;
	};

	fn.hoverOut = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("mouseleave", eventCallback);
		}
		return this;
	};

	fn.mouseUp = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("mouseup", eventCallback);
		}
		return this;
	};

	fn.mouseDown = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("mousedown", eventCallback);
		}
		return this;
	};

	fn.mouseMove = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("mousemove", eventCallback);
		}
		return this;
	};

	fn.focusIn = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("focusin", eventCallback);
		}
		return this;
	};

	fn.focusOut = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("focusout", eventCallback);
		}
		return this;
	};

	fn.focus = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("focus", eventCallback);
		}
		return this;
	};

	fn.blur = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("blur", eventCallback);
		}
		return this;
	};

	fn.change = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("change", eventCallback);
		}
		return this;
	};

	fn.resize = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("resize", eventCallback);
		}
		return this;
	};

	fn.scroll = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("scroll", eventCallback);
		}
		return this;
	};

	fn.keyDown = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("keydown", eventCallback);
		}
		return this;
	};

	fn.keyUp = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("keyup", eventCallback);
		}
		return this;
	};

	fn.click = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("click", eventCallback);
		}
		return this;
	};

	fn.dblclick = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("dblclick", eventCallback);
		}
		return this;
	};

	fn.dragStart = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("dragstart", eventCallback);
		}
		return this;
	};

	fn.drag = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("drag", eventCallback);
		}
		return this;
	};

	fn.dragEnd = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("dragend", eventCallback);
		}
		return this;
	};

	fn.dragEnter = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("dragenter", eventCallback);
		}
		return this;
	};

	fn.dragOver = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("dragover", eventCallback);
		}
		return this;
	};

	fn.dragLeave = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("dragleave", eventCallback);
		}
		return this;
	};

	fn.drop = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("drop", eventCallback);
		}
		return this;
	};

	fn.onTransitionStart = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("transitionrun", eventCallback);
		}
		return this;
	};

	fn.onTransitionEnd = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("transitionend", eventCallback);
		}
		return this;
	};

	fn.touchStart = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("touchstart", eventCallback);
		}
		return this;
	};

	fn.touchEnd = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("touchend", eventCallback);
		}
		return this;
	};

	fn.touchMove = function (eventCallback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener("touchmove", eventCallback);
		}
		return this;
	};

	fn.on = function (name, callback) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener(name, callback);
		}
		return this;
	};

	fn.off = function (name, callback) {
		for (var i = 0; i < this.length; i++) {
			this[i].removeEventListener(name, callback);
		}
		return this;
	};

	fn.trigger = function (eventCallback, args) {
		var event;

		if (args && args.length) {
			event = root.createEvent("CustomEvent");
			event.initCustomEvent(eventCallback, true, true, args);
		}
		else {
			event = root.createEvent("HTMLEvents");
			event.initEvent(eventCallback, true, true);
		}

		for (var i = 0; i < this.length; i++) {
			this[i].dispatchEvent(event);
		}
		return this;
	};

	fn.toggle = function (toggleState) {

		if (arguments.length === 1) {
			if (toggleState === "on") {
				this.css("display", "block");
				this.attr("aria-hidden", "false");
			}
			else {
				this.css("display", "none");
				this.attr("aria-hidden", "true");
			}
		}
		else {
			var el;
			for (var i = 0; i < this.length; i++) {
				el = this[i];
				if (webui(el).css("display") === "block") {
					el.style["display"] = "none";
					el.setAttribute("aria-hidden", "true");
				}
				else {
					el.style["display"] = "block";
					el.setAttribute("aria-hidden", "false");
				}
			}
		}
		return this;
	};

	fn.toggleClass = function(className) {
		var els = this, el;
		
		for (var i = 0; i < els.length; i++) {
				el = webui(els[i]);
				if (el.hasClass(className)) {
					el.removeClass(className);
				}
				else {
					el.addClass(className);
				}
		}
		return this;
	};

	fn.setFocus = function() {
		this.first()[0].focus();
	};

	fn.setState = function (currentCssClass, newCssClass, revertOnClick, placeholder, resetData) {
		var args = arguments;

		if (args.length > 1) {
			switchClasses(this, currentCssClass, newCssClass);
		}
		if (args.length > 2 && revertOnClick) {
			var els = this;
			this.click(function () {
				switchClasses(els, newCssClass, currentCssClass);

				var el;
				for (var i = 0; i < els.length; i++) {
					el = els[i];
					if ((isTextbox(el) || isPassword(el) || isTextarea(el)) && el.value.length === 0) {
						if (placeholder) {
							el.removeAttribute("placeholder");
						}
					}
				}
			});
		}
		if (args.length > 3 && placeholder) {
			var el;
			for (var i = 0; i < this.length; i++) {
				el = this[i];
				if ((isTextbox(el) || isPassword(el) || isTextarea(el)) && el.value.length === 0) {
					el.setAttribute("placeholder", placeholder);
				}
			}
		}
		if (args.length === 5 && resetData) {
			this.reset(resetData);
			if ((isTextbox(el) || isPassword(el) || isTextarea(el))) {
				el.setAttribute("placeholder", placeholder);
			}
		}
		return this;
	};

	fn.reset = function (resetData) {

		this.attr("disabled", null);
		this.attr("readonly", null);

		if (arguments.length === 1 && resetData) {
			var el;
			for (var i = 0; i < this.length; i++) {
				el = this[i];
				if (isTextbox(el) || isPassword(el) || isSelect(el)) {
					el.value = "";
				}
				else if (isCheckbox(el) || isRadio(el)) {
					el.checked = false;
				}
				else {
					el.textContent = "";
				}
			}
		}
		return this;
	};

	fn.clear = function () {
		var el;
		for (var i = 0; i < this.length; i++) {
			el = this[i];
			if (isTextbox(el) || isPassword(el) || isTextarea(el)) {
				el.value = "";
			} else if (isCheckbox(el) || isRadio(el)) {
				el.checked = false;
			} else if (isSelect(el)) {
				webui(el).find("option").remove();
			} else {
				el.textContent = "";
			}
		}
		return this;
	};

	fn.initializeOptionsList = function (enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
		var args = arguments,
			el;

		for (var i = 0; i < this.length; i++) {
			el = webui(this[i]);

			if (isSelect(this[i]) || isDatalist(this[i])) {

				var totalOptions = el.find("option").length;
				var firstOptionVal = el.find("option").first().val();
				var firstIndex = firstOptionVal === "" || firstOptionVal === "0" ? 1 : 0;

				if ((args.length === 0 && totalOptions > firstIndex)) {
					el.enable();
				}
				else if ((args.length === 0 && totalOptions < firstIndex + 1)) {
					el.disable();
				}
				else if ((args.length === 1 || args.length === 2) && totalOptions > firstIndex) {
					el.enable(enabledCssClass, disabledCssClass);
				}
				else if ((args.length === 1 || args.length === 2) && totalOptions < firstIndex + 1) {
					el.disable(disabledCssClass, enabledCssClass);
				}
				else if ((args.length === 3 || args.length === 4) && totalOptions > firstIndex) {
					el.enable(enabledCssClass, disabledCssClass, enabledValue);
				}
				else if ((args.length === 3 || args.length === 4) && totalOptions < firstIndex + 1) {
					el.disable(disabledCssClass, enabledCssClass, disabledValue);
				}

				if (totalOptions > 1) {
					el.setSelectedOption(0);
				}
			}
		}
		return this;
	};

	fn.addOption = function (optionValue, optionText) {
		if (arguments.length === 2) {
			for (var i = 0; i < this.length; i++) {
				if (isSelect(this[i])) {
					webui(this[i]).append(new Option(optionText, optionValue));
				}
			}
		}
		return this;
	};

	fn.removeOptions = function (selectedOnly) {
		var el;

		for (var i = 0; i < this.length; i++) {
			el = this[i];

			if (arguments.length === 1 && selectedOnly) {
				webui(el).find("option:checked").remove();
			}
			else {
				webui(el).find("option:not(:first-child)").remove();
			}
		}
		return this;
	};

	fn.setSelectedOption = function (optionIndex) {
		if (arguments.length === 1) {
			for (var i = 0; i < this.length; i++) {
				var option = webui(this[i]).find("option")[optionIndex];
				if (option) { option.selected = true; }
			}
		}
		return this;
	};

	fn.setOptionText = function (optionIndex, optionText) {
		if (arguments.length === 2) {
			for (var i = 0; i < this.length; i++) {
				var option = webui(this[i]).find("option").eq(optionIndex);
				if (option) { option.html(optionText); }
			}
		}
		return this;
	};

	fn.getOptionValues = function (selectedOnly) {
		var args = arguments,
			options = [],
			values = [];

		if (args.length === 0 || (args.length === 1 && !selectedOnly)) {
			for (var i = 0; i < this.length; i++) {
				options = webui.mergeArray(options, webui(this[i]).find("option"));
			}
		}
		else if (args.length === 1 && selectedOnly) {
			for (var i = 0; i < this.length; i++) {
				options = webui.mergeArray(options, webui(this[i]).find("option:checked"));
			}
		}
		for (var i = 0; i < options.length; i++) {
			values.push(options[i].value);
		}
		return values;
	};

	fn.getOptionLabels = function (selectedOnly) {
		var args = arguments,
			options = [],
			values = [];

		if (args.length === 0 || (args.length === 1 && !selectedOnly)) {
			for (var i = 0; i < this.length; i++) {
				options = webui.mergeArray(options, webui(this[i]).find("option"));
			}
		}
		else if (args.length === 1 && selectedOnly) {
			for (var i = 0; i < this.length; i++) {
				options = webui.mergeArray(options, webui(this[i]).find("option:checked"));
			}
		}
		for (var i = 0; i < options.length; i++) {
			values.push(options[i].innerHTML);
		}
		return values;
	};

	fn.moveOptionsTo = function (toSelector, moveAll, deselectAll) {
		var args = arguments,
			toElement = webui(toSelector);

		if (args.length === 1 || (args.length > 1 && !moveAll)) {
			for (var i = 0; i < this.length; i++) {
				webui(this[i]).find("option:checked").appendTo(toElement);
				webui(this[i]).find("option:checked").remove();
			}
		}
		else if (args.length > 1 && moveAll) {
			for (var i = 0; i < this.length; i++) {
				webui(this[i]).find("option").appendTo(toElement);
				webui(this[i]).find("option").remove();
			}
		}
		if (args.length === 3) {
			if (deselectAll) {
				for (var i = 0; i < toElement.length; i++) {
					toElement[i].selectedIndex = -1;
				}
			}
		}
		return this;
	};

	fn.enable = function (enabledCssClass, removeCssClass, withValue) {
		return enableDisable(this, true, enabledCssClass, removeCssClass, withValue);
	};

	fn.disable = function (disabledCssClass, removeCssClass, withValue) {
		return enableDisable(this, false, disabledCssClass, removeCssClass, withValue);
	};

	fn.enableConditionally = function (dependsOnSelector, dependsOnValues, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
		return enableDisableConditionally(
			this, true, dependsOnSelector, dependsOnValues, enabledCssClass, disabledCssClass, enabledValue, disabledValue
		);
	};

	fn.disableConditionally = function (dependsOnSelector, dependsOnValues, disabledCssClass, enabledCssClass, disabledValue, enabledValue) {
		return enableDisableConditionally(
			this, false, dependsOnSelector, dependsOnValues, enabledCssClass, disabledCssClass, enabledValue, disabledValue
		);
	};

	fn.showConditionally = function (dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue) {
		return showHideConditionally(
			this, true, dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue
		);
	};

	fn.hideConditionally = function (dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue) {
		return showHideConditionally(
			this, false, dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue
		);
	};

	fn.setMediaWidth = function (width, minOrMax, breakPointRange) {
		var args = arguments;

		if (args.length > 0) {
			if (args.length === 1) {
				this.css("width", width);
			}
			else if (args.length === 2 || (args.length === 3 && breakPointRange && webui.isWindowInBreakPointRange(breakPointRange))) {
				if (minOrMax === null || minOrMax === "") {
					this.css("width", width);
				}
				else if (minOrMax.toLowerCase() === "min") {
					this.css("min-width", width);
				}
				else if (minOrMax.toLowerCase() === "max") {
					this.css("max-width", width);
				}
			}
		}
		return this;
	};

	fn.setMediaHeight = function (height, minOrMax, breakPointRange) {
		var args = arguments;

		if (args.length > 0) {
			if (args.length === 1) {
				this.css("height", height);
			}
			else if (args.length === 2 || (args.length === 3 && breakPointRange && webui.isWindowInBreakPointRange(breakPointRange))) {
				if (minOrMax == null || minOrMax == "") {
					this.css("height", height);
				}
				else if (minOrMax.toLowerCase() == "min") {
					this.css("min-height", height);
				}
				else if (minOrMax.toLowerCase() == "max") {
					this.css("max-height", height);
				}
			}
			else if (args.length === 3 && (breakPointRange && breakPointRange.length === 2)) {
				if (webui.isWindowInBreakPointRange([0, breakPointRange[0]])) {
					this.css("min-height", "1px");
				}
			}
		}
		return this;
	};

	fn.resizeElement = function (eventCallback, params) {
		var el;

		for (var i = 0; i < this.length; i++) {
			el = this[i];

			var zIndex = parseInt(getComputedStyle(el).getPropertyValue("z-index"));

			if (isNaN(zIndex)) { 
				zIndex = 0; 
			};
			zIndex--;
		
			var expand = document.createElement("div");
			webui(expand).css("position", "absolute").css("left", "0").css("top", "0").css("right", "0").css("bottom", "0").css("overflow", "hidden").css("visibility", "hidden").css("zIndex", zIndex);
		
			var expandChild = document.createElement("div");
			webui(expandChild).css("position", "absolute").css("left", "0").css("top", "0").css("width", "10000000px").css("height", "10000000px");
			expand.appendChild(expandChild);
		
			var shrink = document.createElement("div");
			webui(shrink).css("position", "absolute").css("left", "0").css("top", "0").css("right", "0").css("bottom", "0").css("overflow", "hidden").css("visibility", "hidden").css("zIndex", zIndex);
		
			var shrinkChild = document.createElement("div");
			webui(shrinkChild).css("position", "absolute").css("left", "0").css("top", "0").css("width", "200%").css("height", "200%");
			shrink.appendChild(shrinkChild);
		
			el.appendChild(expand);
			el.appendChild(shrink);
		
			function setScroll()
			{
				expand.scrollLeft = 10000000;
				expand.scrollTop = 10000000;		
				shrink.scrollLeft = 10000000;
				shrink.scrollTop = 10000000;
			};
			setScroll();
		
			var size = el.getBoundingClientRect();
		
			var currentWidth = size.width;
			var currentHeight = size.height;
		
			var onScroll = function()
			{
				var size = el.getBoundingClientRect();
		
				var newWidth = size.width;
				var newHeight = size.height;
		
				if (newWidth != currentWidth || newHeight != currentHeight)
				{
					currentWidth = newWidth;
					currentHeight = newHeight;
		
					eventCallback(el, params);
				}
				setScroll();
			};
		
			expand.addEventListener("scroll", onScroll);
			shrink.addEventListener("scroll", onScroll);
		}
		return this;
	};

	fn.snapPosition = function (targetElement, position, cssUnit, origin) {
		var args = arguments,
			target = webui(targetElement),
			els = this, el, wrapper;

		if (args.length > 0 && target.length) {

			if (!target.parent().hasClass("snap-target-context")) {
				wrapper = webui("<div></div>").addClass("snap-target-context").css("position", "absolute");
				wrapper.appendTo(target.parent());
				target.appendTo(wrapper);
			}
			else {
				wrapper = target;
			}

			for (var i = 0; i < els.length; i++) {
				el = webui(els[i]);

				el.css("position", "absolute").appendTo(wrapper);

				var pos = position && position.length === 2 ? position : [0, 0];

				var posX = pos[0];
				var posY = pos[1];

				var unit = args.length > 2 && cssUnit && typeof cssUnit === "string" ? cssUnit : "px";

				var targetWidth = target[0].offsetWidth;
				var targetHeight = target[0].offsetHeight;

				var originX, originY, elWidth, elHeight;

				var x = targetWidth / 2;
				var y = targetHeight / 2;

				if (args.length === 4 && origin && typeof origin === "string") {
					if (origin === "top-left") {
						x = 0; y = 0;
					}
					else if (origin === "top-center") {
						x = targetWidth / 2; y = 0;
					}
					else if (origin === "top-right") {
						x = targetWidth; y = 0;
					}
					else if (origin === "middle-left") {
						x = 0; y = targetHeight / 2;
					}
					else if (origin === "middle-center") {
						x = targetWidth / 2; y = targetHeight / 2;
					}
					else if (origin === "middle-right") {
						x = targetWidth; y = targetHeight / 2;
					}
					else if (origin === "bottom-left") {
						x = 0; y = targetHeight;
					}
					else if (origin === "bottom-center") {
						x = targetWidth / 2; y = targetHeight;
					}
					else if (origin === "bottom-right") {
						x = targetWidth; y = targetHeight;
					}
					originX = unit === "rem" ? ui.pxToRem(x) : x;
					originY = unit === "rem" ? ui.pxToRem(y) : y;
				}
				else {
					originX = unit === "rem" ? ui.pxToRem(x) : x;
					originY = unit === "rem" ? ui.pxToRem(y) : y;
				}

				elWidth = unit === "rem" ? ui.pxToRem(el[0].offsetWidth / 2) : el[0].offsetWidth / 2;
				elHeight = unit === "rem" ? ui.pxToRem(el[0].offsetHeight / 2) : el[0].offsetHeight / 2;

				el.css("left", originX - elWidth + posX + unit);
				el.css("top", originY - elHeight + posY + unit);
			}
		}
		return this;
	};

	
	/* NON-CHAINABLE FUNCTIONS */

	webui.elementHoverAt = function (x, y) {
		return webui(root.elementFromPoint(x, y));
	};

	webui.calculatePointerSpeed = function(event, previousEvent) {
		var 
			x = event.clientX,
			y = event.clientY,
			prevX,
			prevY,
			prevT,
			previousTime,
			distX,
			distY,
			interval,
			velocity;

		if (!previousEvent) { 
			return 0;
		}

		previousTime = previousEvent.time;
		prevX = previousEvent.clientX;
		prevY = previousEvent.clientY;
		prevT = Date.now();
		distX = prevX - x;
		distY = prevY - y;
		interval = prevT - previousTime;

		x = prevX;
		y = prevY;
		velocity = Math.sqrt(distX * distX + distY * distY) / interval;

		return velocity;
	};

	webui.pxToRem = function (pxValue) {
		var el = root.getElementsByTagName("html")[0];
		return parseFloat(pxValue) / parseFloat(win.getComputedStyle(el)["fontSize"]);
	};

	webui.remToPx = function (remValue) {
		var el = root.getElementsByTagName("html")[0];
		return parseFloat(win.getComputedStyle(el)["fontSize"]) * parseFloat(remValue);
	};

	webui.getValueFromCssSize = function(size) {
		var sizeValue = size && isNaN(size) ? parseFloat(size.replace(/[^0-9.]+/gi, "")) : !isNaN(size) ? size : 0;
		return parseFloat(sizeValue);
	};

	webui.getUnitFromCssSize = function(size) {
		var sizeUnit = size && isNaN(size) ? size.replace(/[^a-z%]+/gi, "") : "px";
		return sizeUnit.length > 0 ? sizeUnit : "px";
	};

	webui.getAvgWidth = function (elements) {
		var len = elements.length, sum = 0;

		for(var i = 0; i < len; i++){
			sum += parseFloat(webui(elements[i]).css("width"));
		}	
		return sum/len;
	};

	webui.getAvgHeight = function (elements) {
		var len = elements.length, sum = 0;

		for(var i = 0; i < len; i++){
			sum += parseFloat(webui(elements[i]).css("height"));
		}	
		return sum/len;
	};

	webui.getMaxWidth = function(elements) {
		var len = elements.length, max = 0, width = 0;

		for (var i = 0; i < len; i++) {
				width = parseFloat(webui(elements[i]).css("width"));
				if (width > max) {
						max = width;
				}
		}
		return max;
	};

	webui.getMaxHeight = function(elements) {
		var len = elements.length, max = 0, height = 0;
		
		for (var i = 0; i < len; i++) {
				height = parseFloat(webui(elements[i]).css("height"));
				if (height > max) {
						max = height;
				}
		}
		return max;
	};

	webui.getScrollbarWidth = function () {
		var ruler = root.createElement("div");
		ruler.className = "scrollbar-measure";
		root.body.appendChild(ruler);
		var scrollbarWidth = ruler.offsetWidth - ruler.clientWidth;
		root.body.removeChild(ruler);
		return scrollbarWidth;
	};

	webui.rgbToHex = function (r, g, b) {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	};

	webui.rgbStringToHex = function (rgb) {
		var rgbValues = rgb.replace(/[^\d,]/g, '').split(',');
		rgbValues = rgbValues.slice(0, 3);
		if (rgbValues && rgbValues.length === 3) {
			return "#" + ((1 << 24) + (parseInt(rgbValues[0]) << 16) + (parseInt(rgbValues[1]) << 8) + parseInt(rgbValues[2])).toString(16).slice(1);
		}
		return null;
	};

	webui.getAccessibilityContrastColor = function (hexColor) {
		if (hexColor.indexOf("#") === 0) {
			hexColor = hexColor.slice(1);
		}
		if (hexColor.length === 3) {
			hexColor = "" + hexColor[0] + hexColor[0] + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2];
		}
		if (hexColor.length === 6) {
			var r = parseInt(hexColor.slice(0, 2), 16), g = parseInt(hexColor.slice(2, 4), 16), b = parseInt(hexColor.slice(4, 6), 16);
			return r * .299 + g * .587 + b * .114 > 156 ? "#000000" : "#FFFFFF";
		}
		return null;
	};

	webui.getColorShade = function (hexColor, rgbValue) {
		if (arguments.length === 2) {
			if ((hexColor.length === 6 || hexColor.length === 7) && !isNaN(rgbValue)) {
				var hasHash = false;
				if (hexColor[0] == "#") {
					hexColor = hexColor.slice(1);
					hasHash = true;
				}
				var num = parseInt(hexColor, 16);
				var r = (num >> 16) + rgbValue;
				if (r > 255) {
					r = 255;
				} else if (r < 0) {
					r = 0;
				}
				var g = (num & 255) + rgbValue;
				if (g > 255) {
					g = 255;
				} else if (g < 0) {
					g = 0;
				}
				var b = (num >> 8 & 255) + rgbValue;
				if (b > 255) {
					b = 255;
				} else if (b < 0) {
					b = 0;
				}
				return (hasHash ? "#" : "") + String("000000" + (g | b << 8 | r << 16).toString(16)).slice(-6);
			}
		}
		return "#FFFFFF";
	};

	webui.getElementViewportStatus = function (selector, requiredMargin) {
		var args = arguments,
			els = webui(selector),
			margin = 0,
			el;

		if (args.length > 0) {

			if (els.length === 1) {
				el = els[0];

				if (args.length > 1 && requiredMargin != null && !isNaN(requiredMargin)) {
					margin = requiredMargin;
				}
				var viewport = {
					left: 0,
					top: 0,
					right: win.innerWidth,
					bottom: win.innerHeight
				};
				var clientRect = el.getBoundingClientRect();
				var bounds = {
					top: clientRect.top - margin,
					left: clientRect.left - margin,
					bottom: clientRect.bottom + el.offsetHeight + margin,
					right: clientRect.right + el.offsetWidth + margin
				};
				return {
					result: !(viewport.top > bounds.top || viewport.left > bounds.left || viewport.bottom < bounds.bottom || viewport.right < bounds.right),
					topExceeded: bounds.top < viewport.top,
					leftExceeded: bounds.left < viewport.left,
					bottomExceeded: bounds.bottom > viewport.bottom,
					rightExceeded: bounds.right > viewport.right
				};
			}
		}
		return null;
	};

	webui.isWindowInBreakPointRange = function (breakPointRange) {
		var mediaWidth = webui.pxToRem(win.innerWidth);
		var min = 0;
		var max = 0;
		if (arguments.length === 1 && breakPointRange && breakPointRange.length === 2) {
			switch (breakPointRange[0]) {
				case 1: min = parseFloat(ui.breakpoint1) + 0.01; break;
				case 2: min = parseFloat(ui.breakpoint2) + 0.01; break;
				case 3: min = parseFloat(ui.breakpoint3) + 0.01; break;
				case 4: min = parseFloat(ui.breakpoint4) + 0.01; break;
				case 5: min = parseFloat(ui.breakpoint5) + 0.01; break;
				default: min = 0; break;
			}
			switch (breakPointRange[1]) {
				case 1: max = parseFloat(ui.breakpoint1); break;
				case 2: max = parseFloat(ui.breakpoint2); break;
				case 3: max = parseFloat(ui.breakpoint3); break;
				case 4: max = parseFloat(ui.breakpoint4); break;
				case 5: max = parseFloat(ui.breakpoint5); break;
				default: max = 0; break;
			}
		}
		if (mediaWidth > min && mediaWidth <= max || mediaWidth > min && max == 0) {
			return true;
		}
		return false;
	};


	webui.getSelectedContent = function (targetSelector, focusTargetSelector, includeHtml) {
		var args = arguments,
			target = webui(targetSelector);

		if (typeof win.getSelection !== void 0) {
			var selection = win.getSelection();
			if (selection.rangeCount) {
				var container = root.createElement("div");
				container.appendChild(selection.getRangeAt(0).cloneContents());
				var content = container.innerText;
				if (args.length > 0) {
					if (args.length > 1 && target.length && focusTargetSelector) {
						target[0].focus();
					}
					if (args.length === 3) {
						if (includeHtml) {
							content = container.innerHTML;
						} else {
							content = container.innerText;
						}
					}
					target.val(content);
				}
				return content;
			}
		}
		return "";
	};

	webui.copyToClipboard = function (valueOrSelector) {
		if (arguments.length) {		
			var el = valueOrSelector;
			if (el.length) {
				var tempEl = root.createElement("textarea");
				root.body.appendChild(tempEl);
				tempEl.value = isElement(el) ? el.text() : el;
				tempEl.style.position = "absolute";
				tempEl.style.top = "-9999px";
				tempEl.style.width = "0px";
				tempEl.style.height = "0px";        
				tempEl.select();
				tempEl.setSelectionRange(0, 99999);
				root.execCommand("copy");
				root.body.removeChild(tempEl);
			}
		}
	};

	webui.createArray = function (obj, wrapper) {
		var arr = wrapper || [];

		if (obj !== null) {
			if (isArrayLike(obj)) {
				webui.mergeArray(arr, isString(obj) ? [obj] : obj);
			} else {
				arr.push(obj);
			}
		}
		return arr;
	};

	webui.mergeArray = function (arr1, arr2) {
		var i = arr2.length,
			j = arr1.length,
			k = 0;

		while (k < i) {
			arr1[j++] = arr2[k++];
		}
		arr1.length = j;

		return arr1;
	};

	webui.sum = function () {
		var n = arguments.length;
		var total = 0;
		for (var i = 0; i < n; i++) {
			total += arguments[i];
		}
		return total;
  };

  webui.pad = function (number, length, padRight) {
		if (arguments.length > 1) {
			var str = "" + number;
			while (str.length < length) {
				if (arguments.length > 2 && padRight) {
					str = str + "0";
				} else {
					str = "0" + str;
				}
			}
			return str;
		}
		return number;
  };

  webui.truncate = function (text, length, addEllipsis) {
    if (arguments.length > 1) {
      var str = "";
      for (var i = 0; i < length; i++) {
        str += text.charAt(i);
      }
      return addEllipsis ? str + " &hellip;" : str;
    } 
		return text;
  };

  webui.limitWords = function (text, wordCount, addEllipsis) {
    if (arguments.length > 1) {
      var words = text.split(" ");
      words.splice(wordCount, words.length - 1);
      return words.join(" ") + (words.length < text.split(" ").length ? addEllipsis ? "&hellip;" : "" : "");
    } 
		return text;
  };

  webui.getQueryString = function (key) {
    if (arguments.length === 1) {
      var temp = location.search.match(new RegExp(key + "=(.*?)($|\\&)", "i"));
      if (temp && temp.length) {
        return temp[1];
      }
    } 
		return "";
  };

  webui.navigateInternal = function (id, navigate) {
    if (arguments.length) {
      var url = window.location.href.split("#");
      if (url && url.length) {
        var loc = url[0];
        if (navigate) {
          window.location.href = loc + "#" + id;
        } else {
          history.pushState(id, null, loc + "#" + id);
        }
      }
    }
  };

  webui.getAbsoluteUri = function (relativeUrl, virtualRoot, addReturnUrl) {
    try {
      var cleanUrl = relativeUrl.replace(/\.\.\//g, "").replace(/\./g, "");
      cleanUrl = cleanUrl.substring(0, 1) === "/" ? cleanUrl.substring(1, cleanUrl.length) : cleanUrl;
      var cleanRoot = virtualRoot.substring(0, 1) === "/" ? virtualRoot.substring(1, virtualRoot.length) : virtualRoot;
      var url = window.top.location.protocol + "//" + window.top.location.host + "/" + (!cleanRoot || cleanRoot === "/" ? "" : cleanRoot.substring(cleanRoot.length - 1, cleanRoot.length) === "/" ? cleanRoot : cleanRoot + "/") + (cleanUrl.substring(cleanUrl.length - 1, cleanUrl.length) === "/" ? cleanUrl.substring(0, cleanUrl.length - 1) : cleanUrl);
      if (addReturnUrl) {
        url += "?returnUrl=" + encodeURIComponent(window.top.location.href);
      }
      return url;
    } 
    catch (ex) {
      return null;
    }
  };

  webui.getCookie = function (name) {
    try {
      var start = document.cookie.indexOf(name + "=");
      var len = start + name.length + 1;
      if (!start && name != document.cookie.substring(0, name.length)) {
        return null;
      }
      if (start == -1) {
        return null;
      }
      var end = document.cookie.indexOf(";", len);
      if (end == -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(len, end));
    } 
    catch (ex) {
      return null;
    }
  };

  webui.setCookie = function (name, value, expires, path, domain, secure) {
    try {
      var today = new Date();
      today.setTime(today.getTime());
      if (expires) {
        expires = expires * 1e3 * 60 * 60 * 24;
      }
      var expiryDate = new Date(today.getTime() + expires);
      document.cookie = name + "=" + escape(value) + (expires ? ";expires=" + expiryDate.toUTCString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
      return true;
    } 
    catch (ex) {
      return false;
    }
  };

  webui.deleteCookie = function (name, path, domain) {
    try {
      if (ui.getCookie(name)) {
				document.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
				return true;
			} 
			return false;   
    } 
    catch (ex) {
      return false;
    }
	};
	
	webui.extend = function () {
		for (var i = 1; i < arguments.length; i++) {
			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					if (typeof arguments[0][key] === 'object' && typeof arguments[i][key] === 'object') {
						webui.extend(arguments[0][key], arguments[i][key]);
					}
					else {
						arguments[0][key] = arguments[i][key];
					}
				}
			}
		}
		return arguments[0];
	};


	/* EVENT METHODS */

	webui.on = function (name, callback) {
		root.addEventListener(name, callback);
	};

	webui.off = function (name, callback) {
		root.removeEventListener(name, callback);
	};

	webui.ready = function (callback, waitForComplete) { 

		if (waitForComplete) {
				if (document.readyState === "complete") {
						callback();        
				}
				else {
						win.addEventListener("load", callback);	
				} 
		}
		else {
				if (document.readyState !== "loading") {
						callback();
				}
				else {
						root.addEventListener("DOMContentLoaded", callback);
				}
		}
	};

	webui.version = "v11.0.0";


	/* EVENT HANDLERS */

	webui(".checkbox input:not([disabled]) + label").keyDown(function (e) {		
		if (e.which == 13 || e.which == 32) {
			e.preventDefault();
			this.click();
		}
	});

	webui(".radio input:not([disabled]) + label").keyDown(function (e) {	
		if (e.which == 13 || e.which == 32) {
			e.preventDefault();
			this.click();
		}
	});

	webui("[class*='toggle-button'] input:not([disabled]) + label").keyDown(function (e) {	
		if (e.which == 13 || e.which == 32) {
			e.preventDefault();
			this.click();
		}
	});

	webui("[class*='toggle-switch'] input:not([disabled]) + label").keyDown(function (e) {	
		if (e.which == 13 || e.which == 32) {
			e.preventDefault();
			this.click();
		}
	});

	webui(".control-hint > input").focusIn(function() {
		ui(this).css("padding-top", "0.7rem");
		ui(this).siblings("label").css("transform", "scale(0.7) translateY(-135%)");
	}).focusOut(function() {
		if (!this.value || !this.value.length) {
			ui(this).css("padding-top", "0");
			ui(this).siblings("label").css("transform", "scale(1) translateY(-50%)");
		}		
	});

	webui(".control-hint > textarea").focusIn(function() {	
		ui(this).css("padding-top", "1rem");
		ui(this).siblings("label").css("transform", "scale(0.7)").css("top", "0.5rem").slideVertical("up", "0.3rem", 300);
	}).focusOut(function() {
		if (!this.value || !this.value.length) {
			ui(this).css("padding-top", "0");
			ui(this).siblings("label").css("transform", "scale(1)").slideVertical("down", "0.3rem", 300);
		}
	});

	webui(".toggle-activator").click(function (e) {
		e.preventDefault();
		var selector = webui(this).data("target");
		if (!selector) {
			selector = webui(this).attr("href");
		}

		if (selector && selector.length) {
			var toggleContainer = webui(this).closest(".toggle-container");
			runToggleAction(selector, toggleContainer);
		}
	});

	webui(".toggle-deactivator").click(function (e) {
		e.preventDefault();
		var selector = webui(this).data("target");
		if (!selector) {
			selector = webui(this).attr("href");
		}

		if (selector && selector.length) {
			var toggleContainer = webui(this).closest(".toggle-container");
			runToggleAction(selector, toggleContainer);
		}
	});

	webui(".toggle-activator-focus").focus(function (e) {
		e.preventDefault();
		var selector = webui(this).data("target");
		if (!selector) {
			selector = webui(this).attr("href");
		}

		if (selector && selector.length) {
			var toggleContainer = webui(this).closest(".toggle-container");
			runToggleAction(selector, toggleContainer);
		}
	});

	webui(".toggle-deactivator-focus").blur(function (e) {
		e.preventDefault();
		var selector = webui(this).data("target");
		if (!selector) {
				selector = webui(this).attr("href");
		}
		if (selector && selector.length) {
				var toggleContainer = webui(this).closest(".toggle-container");
				runToggleAction(selector, toggleContainer);
		}
	});

	webui(".toggle-activator-dynamic").hoverIn(function (e) {
		e.preventDefault();
		var selector = webui(this).data("target");
		if (!selector) {
			selector = webui(this).attr("href");
		}

		if (selector && selector.length) {
			var toggleContainer = webui(this).closest(".toggle-container");
			runToggleAction(selector, toggleContainer);
		}
	});

	webui(".toggle-deactivator-dynamic").hoverOut(function (e) {
		e.preventDefault();
		var selector = webui(this).data("target");
		if (!selector) {
				selector = webui(this).attr("href");
		}
		if (selector && selector.length) {
				var toggleContainer = webui(this).closest(".toggle-container");
				runToggleAction(selector, toggleContainer);
		}
	});

	webui(root).click(function (e) {
		var toggleContainer = webui(e.target).parents(".toggle-container");
		if (!toggleContainer.length) {
			var toggleContainers = webui(this).find(".toggle-container");
			if (toggleContainers.length) {
				for (var i = 0; i < toggleContainers.length; i++) {
					var toggleContainer = webui(toggleContainers[i]);
					var selector = toggleContainer.data("close-external");
					if (selector && selector.length) {
						var toggleItems = toggleContainer.find(selector);
						if (toggleItems.length) {
							for (var j = 0; j < toggleItems.length; j++) {
								var toggleItem = webui(toggleItems[j]);
								if (!toggleItem.hasClass("off-canvas-closed") && toggleItem.css("display") === "block") {
									runToggleAction(selector, toggleContainer);
								}
							}
						}
					}
				}
			}
		}
	});


	/* RUN */

	webui.ready (function() {

		webui(".checkbox label").attr("tabindex", "0").attr("role", "checkbox");
		webui(".radio label").attr("tabindex", "0").attr("role", "radio");
		webui("[class*='toggle-button'] label").attr("tabindex", "0").attr("role", "button");
		webui("[class*='toggle-switch'] label").attr("tabindex", "0").attr("role", "button");
		
		webui(".checkbox input[disabled] + label").attr("tabindex", "-1");
		webui(".radio input[disabled] + label").attr("tabindex", "-1");
		webui("[class*='toggle-button'] input[disabled] + label").attr("tabindex", "-1");
		webui("[class*='toggle-switch'] input[disabled] + label").attr("tabindex", "-1");

		webui(".checkbox.control-disabled label").attr("tabindex", "-1");
		webui(".radio.control-disabled label").attr("tabindex", "-1");
		webui("[class*='toggle-button'].control-disabled label").attr("tabindex", "-1");
		webui("[class*='toggle-switch'].control-disabled label").attr("tabindex", "-1");
		
		webui(".control-group-disabled .checkbox label").attr("tabindex", "-1");
		webui(".control-group-disabled .radio label").attr("tabindex", "-1");
		webui(".control-group-disabled [class*='toggle-button'] label").attr("tabindex", "-1");
		webui(".control-group-disabled [class*='toggle-switch'] label").attr("tabindex", "-1");
		
		webui(".off-canvas-left, .off-canvas-right").addClass("off-canvas-closed");
		webui(".off-canvas-body").parents("body").css("overflow-x", "hidden");
		
	});


	/* COMPATIBILITY */

	if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
			// NODE
    	module.exports = webui;
	}
	if (typeof define === "function" && define.amd) {
			// AMD
			define(function() {
					return webui;
			});
	} 
	if (typeof win === "object" && typeof win.document === "object") {
			// WINDOW
			win.webui = win.ui = webui;
	}

})(window);
