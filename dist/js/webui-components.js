﻿/*!
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
		runToggleAction = function (selector, toggleContainer, toggleActivator) {
			
			if (toggleContainer.length) {

				var toggleBody = webui(".off-canvas-body"),
					toggleItem = toggleContainer.find(selector),

					transitionDuration = parseInt(toggleContainer.data("transition-duration")),
					transitionInDelay = toggleContainer.data("transition-in-delay"),
					transitionOutDelay = toggleContainer.data("transition-out-delay"),
					transitionType = toggleContainer.data("transition-type"),
					transitionOrientation = toggleContainer.data("transition-orientation"),
					transitionDistance = toggleContainer.data("transition-distance"),
					focusElement = toggleContainer.data("focus-element"),
					focusReturnElement = toggleContainer.data("focus-return-element"),


					offCanvasDrawer = toggleItem.hasClass("off-canvas-drawer"),
					offCanvas = toggleItem.hasClass("off-canvas-left") || toggleItem.hasClass("off-canvas-right"),
					offCanvasLeft = toggleItem.hasClass("off-canvas-left"),

					activator = arguments.length === 3 && toggleActivator ? ui(toggleActivator) : null;	


				if (toggleItem.length) {

					var toggleItemWidth = toggleItem[0].offsetWidth;

					if (!offCanvasDrawer && offCanvas && toggleBody.length) {

						ui(".off-canvas-left, .off-canvas-right").css("transition-duration", (transitionDuration / 1000) + "s");
						toggleBody.css("transition-duration", (transitionDuration / 1000) + "s");

						if (toggleItem.hasClass("off-canvas-closed")) {

							toggleItem.trigger("ui.toggleItem.show.before");

							delay(transitionInDelay, function () {
								toggleItem.find(".toggle-item-content").show();
								toggleItem.removeClass("off-canvas-closed");
								
								if (offCanvasLeft) {
									toggleItem.css("transform", "translate(0, 0)");
									toggleBody.css("transform", "translate(" + toggleItemWidth + "px, 0)");
								}
								else {
									toggleItem.css("transform", "translate(0, 0)");
									toggleBody.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
								}
								toggleItem[0].ontransitionend = function(event) { toggleItem.trigger("ui.toggleItem.show.after"); }
						
								if (focusElement) {
									var focusEl = toggleItem.find(focusElement).first();
						
									if (focusEl && !focusEl.hasClass("disabled")) {
										focusEl[0].focus();
									}	
								}
			
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
								toggleItem.find(".toggle-item-content").hide();
								toggleItem[0].ontransitionend = function(event) { toggleItem.trigger("ui.toggleItem.hide.after"); }

								if (focusReturnElement) {
									var returnEl = webui(focusReturnElement).first();
			
									if (returnEl && !returnEl.hasClass("disabled")) {
										returnEl[0].focus();
									}
								}
			
							});				
						}
					}
					else if (offCanvas) {

						ui(".off-canvas-left, .off-canvas-right").css("transition-duration", (transitionDuration / 1000) + "s");
					
						if (toggleItem.hasClass("off-canvas-closed")) {

							toggleItem.trigger("ui.toggleItem.show.before");

							delay(transitionInDelay, function () {
								toggleItem.find(".toggle-item-content").show();
								toggleItem.removeClass("off-canvas-closed");
								
								if (offCanvasLeft) {
									toggleItem.css("transform", "translate(0, 0)");
								}
								else {
									toggleItem.css("transform", "translate(0, 0)");
								}
								toggleItem[0].ontransitionend = function(event) { toggleItem.trigger("ui.toggleItem.show.after"); }

								if (focusElement) {
									var focusEl = toggleItem.find(focusElement).first();
						
									if (focusEl && !focusEl.hasClass("disabled")) {
										focusEl[0].focus();
									}	
								}

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
								toggleItem.find(".toggle-item-content").hide();
								toggleItem[0].ontransitionend = function(event) { toggleItem.trigger("ui.toggleItem.hide.after"); }

								if (focusReturnElement) {
									var returnEl = webui(focusReturnElement).first();
			
									if (returnEl && !returnEl.hasClass("disabled")) {
										returnEl[0].focus();
									}
								}

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

											if (activator) {
												activator.find(".nav-indicator").removeClass("active");				
											}			
										});
									}
									else if (transitionDuration && transitionType === "collapse") {
										if (transitionOrientation === "horizontal") {
											el.collapseHorizontal({ duration: transitionDuration }, function() {
												el.trigger("ui.toggleItem.hide.after");
					
												if (activator) {
													activator.find(".nav-indicator").removeClass("active");				
												}
											});
										}
										else {
											el.collapseVertical({ duration: transitionDuration }, function() {
												el.trigger("ui.toggleItem.hide.after");

												if (activator) {
													activator.find(".nav-indicator").removeClass("active");				
												}
											});
										}
									}
									else {
										el.hide();
										el.trigger("ui.toggleItem.hide.after");

										if (activator) {
											activator.find(".nav-indicator").removeClass("active");				
										}
									}	

									if (focusReturnElement) {
										var returnEl = webui(focusReturnElement).first();
				
										if (returnEl && !returnEl.hasClass("disabled")) {
											returnEl[0].focus();
										}
									}
	
								});	
							} 
							else {
								el.trigger("ui.toggleItem.show.before");
		
								delay(transitionInDelay, function () {
									if (transitionDuration && transitionType === "fade") {
										el.fadeIn(transitionDuration, 0, function() {
											el.trigger("ui.toggleItem.show.after");

											if (activator) {
												activator.find(".nav-indicator").addClass("active");
											}
										});
									}
									else if (transitionDuration && transitionType === "collapse") {
										if (transitionOrientation === "horizontal") {
											if (transitionDistance) {
												el.expandHorizontal({ duration: transitionDuration, targetWidth: transitionDistance }, function() {
													el.trigger("ui.toggleItem.show.after");

													if (activator) {
														activator.find(".nav-indicator").addClass("active");
													}
												});											
											}
											else {
												el.expandHorizontal({ duration: transitionDuration }, function() {
													el.trigger("ui.toggleItem.show.after");

													if (activator) {
														activator.find(".nav-indicator").addClass("active");
													}
												});
											}
										}
										else {
											if (transitionDistance) {
												el.expandVertical({ duration: transitionDuration, targetHeight: transitionDistance }, function() {
													el.trigger("ui.toggleItem.show.after");

													if (activator) {
														activator.find(".nav-indicator").addClass("active");
													}
												});
											}
											else {
												el.expandVertical({ duration: transitionDuration }, function() {
													el.trigger("ui.toggleItem.show.after");

													if (activator) {
														activator.find(".nav-indicator").addClass("active");
													}
												});										
											}
										}
									}
									else {
										el.show();
										el.trigger("ui.toggleItem.show.after");

										if (activator) {
											activator.find(".nav-indicator").addClass("active");
										}
									}

									if (focusElement) {
										var focusEl = toggleItem.find(focusElement).first();
							
										if (focusEl && !focusEl.hasClass("disabled")) {
											focusEl[0].focus();
										}	
									}
	
								});
								
								if (!toggleContainer.hasClass("toggle-inclusive")) {

									delay(transitionOutDelay, function () {
										if (transitionDuration && transitionType === "fade") {
											el.siblings(".toggle-item").fadeOut(transitionDuration);

											if (activator) {
												activator.siblings(".toggle-activator").find(".nav-indicator").removeClass("active");				
											}
										}
										else if (transitionDuration && transitionType === "collapse") {
											if (transitionOrientation === "horizontal") {
												el.siblings(".toggle-item").collapseHorizontal({ duration: transitionDuration });	

												if (activator) {
													activator.siblings(".toggle-activator").find(".nav-indicator").removeClass("active");				
												}
											}
											else {
												el.siblings(".toggle-item").collapseVertical({ duration: transitionDuration });	

												if (activator) {
													activator.siblings(".toggle-activator").find(".nav-indicator").removeClass("active");				
												}
											}
										}
										else {
											el.siblings(".toggle-item").hide();

											if (activator) {
												activator.siblings(".toggle-activator").find(".nav-indicator").removeClass("active");				
											}
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

	fn.show = function (displayType) {
		var dt = arguments.length > 0 && displayType ? displayType : "block";
		for (var i = 0; i < this.length; i++) {
			this[i].style["display"] = dt;
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

	fn.setControlState = function (currentCssClass, newCssClass, controlMessage, revertOnClick, resetData) {
		var args = arguments, messageId, messageEl;

		if (args.length > 1) {
			var el;
			for (var i = 0; i < this.length; i++) {
				el = this[i];

				switchClasses(el, currentCssClass, newCssClass);

				if (isTextbox(el) || isPassword(el) || isTextarea(el)) {
					if (!controlMessage) {
						messageId = ui(el).data("validation-text");
						if (messageId) {
							messageEl = ui("#" + messageId);
							if (messageEl) {
								messageEl.text("");
							}
						}
					}
				}
			}
		}
		if (args.length > 2 && controlMessage) {
			var el;

			for (var i = 0; i < this.length; i++) {
				el = this[i];

				if (isTextbox(el) || isPassword(el) || isTextarea(el)) {
					if (controlMessage) {
						messageId = ui(el).data("validation-text");
						if (messageId) {
							messageEl = ui("#" + messageId);
							if (messageEl) {
								messageEl.css("visibility", "visible");
								messageEl.text(controlMessage);
								if (newCssClass === "control-danger") {
									switchClasses(messageEl, "color-success", "color-danger");
								}
								else {
									switchClasses(messageEl, "color-danger", "color-success");
								}
							}
						}
					}
				}
			}
		}
		if (args.length > 3 && revertOnClick) {

			this.click(function () {
				var el = this;

				switchClasses(el, newCssClass, currentCssClass);

				if ((isTextbox(el) || isPassword(el) || isTextarea(el)) && el.value.length === 0) {
					if (controlMessage) {
						messageId = ui(el).data("validation-text");
						if (messageId) {
							messageEl = ui("#" + messageId);
							if (messageEl) {
								messageEl.text("");
							}
						}
					}
				}
			});
		}
		if (args.length === 5 && resetData) {
			this.reset(resetData);
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

	webui.getGuid = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
				return v.toString(16);
		});
	};

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

  webui.percentHeightToPx = function (element, percentValue) {
    return parseFloat(element.parent().css("height")) / 100 * percentValue;
  };

  webui.percentWidthToPx = function (element, percentValue) {
    return parseFloat(element.parent().css("width")) / 100 * percentValue;
  };

	webui.getValueFromCssSize = function(cssSize) {
		if (cssSize && isString(cssSize)) {
			var value = parseFloat(cssSize.replace(/[^0-9.]+/gi, ""));	
			return !isNaN(value) ? value : 0;	
		}
		else if (cssSize && !isNaN(cssSize)) {
			var value = parseFloat(cssSize);
			return !isNaN(value) ? value : 0;	
		}
		return 0;
	};

	webui.getUnitFromCssSize = function(cssSize) {
		if (cssSize && isString(cssSize)) {
			var value = cssSize.replace(/[^a-z%]+/gi, "");	
			return value.length ? value : "px";		
		}
		return "px";
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
				case 1: min = parseFloat(ui.bp_1_over); break;
				case 2: min = parseFloat(ui.bp_2_over); break;
				case 3: min = parseFloat(ui.bp_3_over); break;
				case 4: min = parseFloat(ui.bp_4_over); break;
				case 5: min = parseFloat(ui.bp_5_over); break;
				default: min = 0; break;
			}
			switch (breakPointRange[1]) {
				case 1: max = parseFloat(ui.bp_1_under); break;
				case 2: max = parseFloat(ui.bp_2_under); break;
				case 3: max = parseFloat(ui.bp_3_under); break;
				case 4: max = parseFloat(ui.bp_4_under); break;
				case 5: max = parseFloat(ui.bp_5_under); break;
				default: max = 0; break;
			}
		}
		if (mediaWidth >= min && mediaWidth <= max || mediaWidth >= min && max === 0) {
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

	webui.breakpointChange = function (callback) {

			var mlq1 = window.matchMedia("(max-width: " + ui.bp_1_under + ")");
			mlq1.onchange = (e) => { if (e.matches) { callback(); }}

			var mlq2 = window.matchMedia("(min-width: " + ui.bp_1_over + ") and (max-width: " + ui.bp_2_under + ")");
			mlq2.onchange = (e) => { if (e.matches) { callback(); }}

			var mlq3 = window.matchMedia("(min-width: " + ui.bp_2_over + ") and (max-width: " + ui.bp_3_under + ")");
			mlq3.onchange = (e) => { if (e.matches) { callback(); }}

			var mlq4 = window.matchMedia("(min-width: " + ui.bp_3_over + ") and (max-width: " + ui.bp_4_under + ")");
			mlq4.onchange = (e) => { if (e.matches) { callback(); }}

			var mlq5 = window.matchMedia("(min-width: " + ui.bp_4_over + ") and (max-width: " + ui.bp_5_under + ")");
			mlq5.onchange = (e) => { if (e.matches) { callback(); }}

			var mlq6 = window.matchMedia("(min-width: " + ui.bp_5_over + ")");
			mlq6.onchange = (e) => { if (e.matches) { callback(); }}

			return;
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

	webui(".toggle-activator").click(function (e) {
		e.preventDefault();
		var selector = webui(this).data("target");
		if (!selector) {
			selector = webui(this).attr("href");
		}

		if (selector && selector.length) {
			var toggleContainer = webui(this).closest(".toggle-container");
			runToggleAction(selector, toggleContainer, this);
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

	webui.ready(function() {

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

			if (this.length > 1) { console.warn("WebUI alerts component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new AlertInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.position) { settings.position = newSettings.position; }
				if (newSettings.duration) { settings.duration = newSettings.duration; }
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }
				if (newSettings.displayOrder) { settings.displayOrder = newSettings.displayOrder; }
				if (newSettings.width) { settings.width = newSettings.width; }
				if (newSettings.showHeader) { settings.showHeader = newSettings.showHeader; }
				if (newSettings.inline) { settings.inline = newSettings.inline; }
				if (newSettings.style) { settings.style = newSettings.style; }	
				if (newSettings.autoHide) { settings.autoHide = newSettings.autoHide; }
				if (newSettings.showIcon) { settings.showIcon = newSettings.showIcon; }
				if (newSettings.showClose) { settings.showClose = newSettings.showClose; }
				control = new AlertInstance(this.first(), settings);	
			};


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


(function (win) {
    
  /* PRIVATE */

  var 
    fn = webui.fn;

    
  /* PUBLIC */

  fn.slideVertical = function (direction, distance, duration, callback) {
    var els = this,
      args = arguments,
      uiElement, uiPosition, uiDeltaPosition,
      uiDirection = direction.toLowerCase() === "down" ? 1 : 0,
      distanceValue = args.length > 1 ? ui.getValueFromCssSize(distance) : 0,
      distanceUnit = args.length > 1 ? ui.getUnitFromCssSize(distance) : "px";

    if (distanceUnit === "rem") {
      distanceValue = ui.remToPx(distanceValue);
      distanceUnit = "px";
    }

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("display", "block");
      uiPosition = parseFloat(uiElement.css("top"));
      uiDeltaPosition = uiDirection === 1 ? uiPosition : uiPosition - distanceValue;

      uiElement.animate("top", uiDirection, distanceValue + distanceUnit, uiDeltaPosition, duration, function (el) {
        if (args.length === 4 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.slideHorizontal = function (direction, distance, duration, callback) {
    var els = this,
      args = arguments,
      uiElement, uiPosition, uiDeltaPosition,
      uiDirection = direction.toLowerCase() === "right" ? 1 : 0,
      distanceValue = args.length > 1 ? ui.getValueFromCssSize(distance) : 0,
      distanceUnit = args.length > 1 ? ui.getUnitFromCssSize(distance) : "px";

    if (distanceUnit === "rem") {
      distanceValue = ui.remToPx(distanceValue);
      distanceUnit = "px";
    }

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("display", "block");
      uiPosition = parseFloat(uiElement.css("left"));
      uiDeltaPosition = direction.toLowerCase() === "right" ? uiPosition : uiPosition - distanceValue;

      uiElement.animate("left", uiDirection, distanceValue + distanceUnit, uiDeltaPosition, duration, function (el) {
        if (args.length === 4 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.expandVertical = function (options, callback) {
    var settings = ui.extend({
      duration: 300,
      targetHeight: "auto",
      initialHeight: null,
      displayType: "block",
      paddingTop: 0,
      paddingBottom: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0
    }, options),
    
    els = this,
    args = arguments, 
    uiElement, 
    uiOverflow, 
    uiOriginalHeight, 
    uiTargetHeight,

    targetHeightValue = ui.getValueFromCssSize(settings.targetHeight),
    targetHeightUnit = ui.getUnitFromCssSize(settings.targetHeight),
    initialHeightValue = ui.getValueFromCssSize(settings.initialHeight),
    initialHeightUnit = ui.getUnitFromCssSize(settings.initialHeight);


    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("display", settings.displayType).css("overflow", "hidden").css("min-height", "0");
      uiOriginalHeight = parseFloat(uiElement.css("height"));
      uiOriginalHeight = uiOriginalHeight > 0 ? uiOriginalHeight : els[i].scrollHeight;


      if (settings.targetHeight === "auto" || !targetHeightValue) {
        uiTargetHeight = els[i].scrollHeight + parseFloat(settings.borderTopWidth) + parseFloat(settings.borderBottomWidth);  
        uiElement.css("height", "0");
        uiOriginalHeight = 0;

        var paddingTopValue = ui.getValueFromCssSize(settings.paddingTop);    
        if (parseFloat(uiElement.css("padding-top")) < paddingTopValue) {
          uiTargetHeight = uiTargetHeight + paddingTopValue;
        }
        var paddingBottomValue = ui.getValueFromCssSize(settings.paddingBottom);
        if (parseFloat(uiElement.css("padding-bottom")) < paddingBottomValue) {
          uiTargetHeight = uiTargetHeight + paddingBottomValue;
        }
      } 
      else if (targetHeightValue) {
        uiTargetHeight = targetHeightValue;

        if (targetHeightUnit === "%") {
          uiTargetHeight = ui.percentHeightToPx(uiElement, uiTargetHeight)
        }
        else if (targetHeightUnit === "rem") {
          uiTargetHeight = ui.remToPx(uiTargetHeight);
        }
        uiElement.css("height", "0");
        uiOriginalHeight = 0;
      }

      if (settings.initialHeight !== null) {
        uiElement.css("height", initialHeightValue + initialHeightUnit);
        uiOriginalHeight = initialHeightValue;
      
        if (initialHeightUnit === "%") {
          uiOriginalHeight = ui.percentHeightToPx(uiElement, uiOriginalHeight)
        }
        else if (initialHeightUnit === "rem") {
          uiOriginalHeight = ui.remToPx(uiOriginalHeight);
        }
      }

      targetHeightUnit = "px";

      if (settings.paddingTop) { uiElement.animate("padding-top", 1, settings.paddingTop, 0, settings.duration); }
      if (settings.paddingBottom) { uiElement.animate("padding-bottom", 1, settings.paddingBottom, 0, settings.duration); }
      if (settings.borderTopWidth) { uiElement.animate("border-top-width", 1, settings.borderTopWidth, 0, settings.duration); }
      if (settings.borderBottomWidth) { uiElement.animate("border-bottom-width", 1, settings.borderBottomWidth, 0, settings.duration); }

      uiElement.animate("height", 1, (uiTargetHeight - uiOriginalHeight) + targetHeightUnit, uiOriginalHeight, settings.duration, function (el) {
        
        if (settings.targetHeight === "auto") {
          el.css("height", "auto");
        }

        el.css("overflow", uiOverflow);

        if (args.length === 2 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };  

  fn.expandHorizontal = function (options, callback) {
    var settings = ui.extend({
      duration: 300,
      targetWidth: "auto",
      initialWidth: null,
      displayType: "block",
      paddingLeft: 0,
      paddingRight: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0
    }, options),
    
    els = this,
    args = arguments,
    uiElement, 
    uiOverflow, 
    uiOriginalWidth, 
    uiTargetWidth,

    targetWidthValue = ui.getValueFromCssSize(settings.targetWidth),
    targetWidthUnit = ui.getUnitFromCssSize(settings.targetWidth),
    initialWidthValue = ui.getValueFromCssSize(settings.initialWidth),
    initialWidthUnit = ui.getUnitFromCssSize(settings.initialWidth);


    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("display", settings.displayType).css("overflow", "hidden").css("min-width", "0");
      uiOriginalWidth = parseFloat(uiElement.css("width"));
      uiOriginalWidth = uiOriginalWidth > 0 ? uiOriginalWidth : els[i].scrollWidth;


      if (settings.targetWidth === "auto" || !targetWidthValue) {
        uiTargetWidth = els[i].scrollWidth + parseFloat(settings.borderTopWidth) + parseFloat(settings.borderBottomWidth);  
        uiElement.css("width", "0");
        uiOriginalWidth = 0;
     
        var paddingLeftValue = ui.getValueFromCssSize(settings.paddingLeft);
        if (parseFloat(uiElement.css("padding-left")) < paddingLeftValue) {
          uiTargetWidth = uiTargetWidth + paddingLeftValue;
        }
        var paddingRightValue = ui.getValueFromCssSize(settings.paddingRight);
        if (parseFloat(uiElement.css("padding-right")) < paddingRightValue) {
          uiTargetWidth = uiTargetWidth + paddingRightValue;
        }
      } 
      else if (targetWidthValue) {
        uiTargetWidth = targetWidthValue;

        if (targetWidthUnit === "%") {
          uiTargetWidth = ui.percentWidthToPx(uiElement, uiTargetWidth)
        }
        else if (targetWidthUnit === "rem") {
          uiTargetWidth = ui.remToPx(uiTargetWidth);
        }
        uiElement.css("width", "0");
        uiOriginalWidth = 0;
      }

      if (settings.initialWidth !== null) {
        uiElement.css("width", initialWidthValue + initialWidthUnit);
        uiOriginalWidth = initialWidthValue;
      
        if (initialWidthUnit === "%") {
          uiOriginalWidth = ui.percentWidthToPx(uiElement, uiOriginalWidth)
        }
        else if (initialWidthUnit === "rem") {
          uiOriginalWidth = ui.remToPx(uiOriginalWidth);
        }
      }

      targetWidthUnit = "px";

      if (settings.paddingLeft) { uiElement.animate("padding-left", 1, settings.paddingLeft, 0, settings.duration); }
      if (settings.paddingRight) { uiElement.animate("padding-right", 1, settings.paddingRight, 0, settings.duration); }
      if (settings.borderLeftWidth) { uiElement.animate("border-left-width", 1, settings.borderLeftWidth, 0, settings.duration); }
      if (settings.borderRightWidth) { uiElement.animate("border-right-width", 1, settings.borderRightWidth, 0, settings.duration); }

      uiElement.animate("width", 1, (uiTargetWidth - uiOriginalWidth) + targetWidthUnit, uiOriginalWidth, settings.duration, function (el) {
        
        if (settings.targetWidth === "auto") {
          el.css("width", "auto");
        }

        el.css("overflow", uiOverflow);

        if (args.length === 2 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.collapseVertical = function (options, callback) {
    var settings = ui.extend({
      duration: 300,
      targetHeight: "auto",
      paddingTop: 0,
      paddingBottom: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0
    }, options),
    
    els = this,
    args = arguments,
    uiElement, 
    uiOverflow, 
    uiCurrentHeight, 
    uiTargetHeight,

    targetHeightValue = ui.getValueFromCssSize(settings.targetHeight),
    targetHeightUnit = ui.getUnitFromCssSize(settings.targetHeight);


    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("overflow", "hidden").css("min-height", "0");
      uiCurrentHeight = parseFloat(uiElement.css("height"));
      uiCurrentHeight = uiCurrentHeight > 0 ? uiCurrentHeight : els[i].scrollHeight;


      if (settings.targetHeight === "auto") {
        uiTargetHeight = 0;
      } 
      else if (targetHeightValue) {
        uiTargetHeight = targetHeightValue;

        if (targetHeightUnit === "%") {
          uiTargetHeight = ui.percentHeightToPx(uiElement, uiTargetHeight)
        }
        else if (targetHeightUnit === "rem") {
          uiTargetHeight = ui.remToPx(uiTargetHeight);
        }
      }

      targetHeightUnit = "px";

      if (settings.paddingTop) { uiElement.animate("padding-top", 0, settings.paddingTop, 0, settings.duration); }
      if (settings.paddingBottom) { uiElement.animate("padding-bottom", 0, settings.paddingBottom, 0, settings.duration); }
      if (settings.borderTopWidth) { uiElement.animate("border-top-width", 0, settings.borderTopWidth, 0, settings.duration); }
      if (settings.borderBottomWidth) { uiElement.animate("border-bottom-width", 0, settings.borderBottomWidth, 0, settings.duration); }
 
      uiElement.animate("height", 0, (uiCurrentHeight - uiTargetHeight) + targetHeightUnit, uiTargetHeight, settings.duration, function (el) {
        el.css("overflow", uiOverflow);

        if (!targetHeightValue) {
          el.css("display", "none");
        }
        if (args.length === 2 && callback) {
          callback(el);
        }
      });
      
    }
    return els;
  };

  fn.collapseHorizontal = function (options, callback) {
    var settings = ui.extend({
      duration: 300,
      targetWidth: "auto",
      paddingLeft: 0,
      paddingRight: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0
    }, options),
    
    els = this,
    args = arguments,
    uiElement, 
    uiOverflow, 
    uiCurrentWidth, 
    uiTargetWidth,

    targetWidthValue = ui.getValueFromCssSize(settings.targetWidth),
    targetWidthUnit = ui.getUnitFromCssSize(settings.targetWidth);


    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiOverflow = uiElement.css("overflow");
      uiElement.css("overflow", "hidden").css("min-width", "0");
      uiCurrentWidth = parseFloat(uiElement.css("width"));
      uiCurrentWidth = uiCurrentWidth > 0 ? uiCurrentWidth : els[i].scrollWidth;


      if (settings.targetWidth === "auto") {
        uiTargetWidth = 0;
      } 
      else if (targetWidthValue) {
        uiTargetWidth = targetWidthValue;

        if (targetWidthUnit === "%") {
          uiTargetWidth = ui.percentWidthToPx(uiElement, uiTargetWidth)
        }
        else if (targetWidthUnit === "rem") {
          uiTargetWidth = ui.remToPx(uiTargetWidth);
        }
      }

      targetWidthUnit = "px";

      if (settings.paddingLeft) { uiElement.animate("padding-left", 0, settings.paddingLeft, 0, settings.duration); }
      if (settings.paddingRight) { uiElement.animate("padding-right", 0, settings.paddingRight, 0, settings.duration); }
      if (settings.borderLeftWidth) { uiElement.animate("border-left-width", 0, settings.borderLeftWidth, 0, settings.duration); }
      if (settings.borderRightWidth) { uiElement.animate("border-right-width", 0, settings.borderRightWidth, 0, settings.duration); }
 
      uiElement.animate("width", 0, (uiCurrentWidth - uiTargetWidth) + targetWidthUnit, uiTargetWidth, settings.duration, function (el) {
        el.css("overflow", uiOverflow);

        if (!targetWidthValue) {
          el.css("display", "none");
        }
        if (args.length === 2 && callback) {
          callback(el);
        }
      });
      
    }
    return els;
  };

  fn.fadeIn = function (duration, initialOpacity, callback) {
    var els = this,
      args = arguments,
      uiElement, uiLimitOpacity;

    uiLimitOpacity = args.length > 1 && !isNaN(parseFloat(initialOpacity)) ? initialOpacity : 0;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      uiElement.css("opacity", "0").css("display", "block");

      uiElement.animate("opacity", 1, 1, uiLimitOpacity, duration, function (el) {

        if (args.length === 3 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.fadeOut = function (duration, finalOpacity, callback) {
    var els = this,
      args = arguments,
      uiElement, uiLimitOpacity;

    uiLimitOpacity = finalOpacity && !isNaN(parseFloat(finalOpacity)) ? finalOpacity : 0;

    for (var i = 0; i < els.length; i++) {
      uiElement = webui(els[i]);
      if (uiElement.css("display") === "none" || uiElement.css("visibility") === "hidden") {
        continue;
      }
      uiElement.css("opacity", "1");

      uiElement.animate("opacity", 0, 1, uiLimitOpacity, duration, function (el) {

        if (uiLimitOpacity <= 0.01) {
          el.css("display", "none");
        }
        if (args.length === 3 && callback) {
          callback(el);
        }
      });

    }
    return els;
  };

  fn.animate = function (animateWhat, delta, propertyValue, limitValue, duration, callback) {
    var els = this,
      args = arguments,
      pv = propertyValue ? ui.getValueFromCssSize(propertyValue) : 0,
      pu = animateWhat !== "opacity" ? propertyValue ? ui.getUnitFromCssSize(propertyValue) : "px" : "",
      lv = limitValue ? ui.getValueFromCssSize(limitValue) : 0,
      timeFraction = null, progress = null;

    var start = performance.now();

    requestAnimationFrame(function animate(time) {
      if (delta === 1) {
        timeFraction = (time - start) / duration;
      } else {
        timeFraction = 1 - (time - start) / duration;
      }

      if (timeFraction < 0) timeFraction = 0;
      if (timeFraction > 1) timeFraction = 1;

      progress = timeFraction;
      els.css(animateWhat, (progress * pv) + lv + pu);
  
      if (delta === 1) {
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        } else {
          if (args.length === 6 && callback) { 
            callback(els); 
          }
        }
      } else {
        if (timeFraction > 0) {
          requestAnimationFrame(animate);
        } else {
          if (args.length === 6 && callback) { 
            callback(els); 
          }
        }
      }
    });
    return els;
  };

})(window);

(function (win) {
	
	/* PRIVATE */
	
	var CarouselInstance = function(carousel, settings) { 
		
		var 
			interval = settings.interval,
			autoPlay = settings.autoPlay,
			autoScale = settings.autoScale,
			playDirection = settings.playDirection,
			stopOnHover = settings.stopOnHover,
			transitionDuration = settings.transitionDuration,
			transitionType = settings.transitionType,
			transitionOrientation = settings.transitionOrientation,
			width = settings.width,
			height = settings.height,
		
			carouselHolder,
			carouselItems,
			carouselItemCount,
			
			carouselItemWidth = 0,
			carouselItemHeight = 0,

			itemBorderWidth = 0,
			itemBorderHeight = 0,

			current = 1,
			cycle = false,
			delta = 1,		
			transitionCompleted = true,

			run = null,

			shift = function(dir) {

				current += delta;
				cycle = !!(current === 0 || current > carouselItemCount);
		
				if (cycle) {
					current = (current === 0)? carouselItemCount : 1; 
					if (transitionOrientation === "vertical" && 
						transitionType === "slide") {
						carouselHolder.css(dir, "-" + (carouselItemHeight * current) + "px");
					}
					else {
						carouselHolder.css(dir, "-" + (carouselItemWidth * current) + "px");
					}
				}	
			},
			swap = function(callback) {

				if (delta === 1)
				{           
						if (current === carouselItemCount) {
								current = 1;
						}
						else {
								current += 1;
						}            
				}
				else {
						if (current === 1) {
								current = carouselItemCount;
						}
						else {
								current -= 1;
						}
				}
				if (callback) callback();
			},
			resetCarousel = function(carousel, itemCount) {

				if (autoScale) {

					carousel.css("width", "100%");
					
					carouselHolder = carousel.children(".carousel-item-holder").first();
					carouselItems = carouselHolder.children(".carousel-item").css("width", carousel[0].offsetWidth + "px").css("height", "auto");
	
					carouselItemWidth = parseFloat(ui(carouselItems[current - 1]).css("width"));
					carouselItemHeight = parseFloat(ui(carouselItems[current - 1]).css("height"));

					if (transitionType === "crossfade") {
						carouselHolder.css("width", carouselItemWidth + "px");
					}
					else {	
						if (transitionOrientation === "vertical" && transitionType === "slide") {
								var h = carouselItemHeight * itemCount + carouselItemHeight * 3;
								var t = carouselItemHeight * current;
								carouselHolder.css("top", "-" + t + "px").css("height", h + "px").css("width", carouselItemWidth + "px");
						} else {
								var w = carouselItemWidth * itemCount + carouselItemWidth * 3;
								var l = carouselItemWidth * current;
								carouselHolder.css("width", w + "px").css("height", carouselItemHeight + "px").css("left", "-" + l + "px");
						}
					}
					carousel.css("width", carouselItemWidth + "px").css("height", carouselItemHeight + "px");
				}
				else {

					carousel.css("width", width).css("height", height);
					
					carouselHolder = carousel.children(".carousel-item-holder").first();
					carouselItems = carouselHolder.children(".carousel-item").css("width", carousel[0].clientWidth + "px").css("height", carousel[0].clientHeight + "px");

					carouselItemWidth = parseFloat(ui(carouselItems[current - 1]).css("width"));
					carouselItemHeight = parseFloat(ui(carouselItems[current - 1]).css("height"));

					carouselItems.children().css("width", carouselItemWidth - itemBorderWidth + "px").css("height", carouselItemHeight - itemBorderHeight + "px");

					if (transitionType === "crossfade") {
						carouselHolder.css("height", carouselItemHeight + "px").css("width", carouselItemWidth + "px");
					}
					else {
						if (transitionOrientation === "vertical" && transitionType === "slide") {
								var h = carouselItemHeight * itemCount + carouselItemHeight * 3;
								var t = carouselItemHeight * current;
								carouselHolder.css("height", h + "px").css("width", carouselItemWidth + "px").css("top", "-" + t + "px");
						} else {
								var w = carouselItemWidth * itemCount + carouselItemWidth * 3;
								var l = carouselItemWidth * current;
								carouselHolder.css("width", w + "px").css("height", carouselItemHeight + "px").css("left", "-" + l + "px");
						}	
					}
				}
			},
			prevSlide = function () {

				if (transitionCompleted) {
		
					transitionCompleted = false;
		
					delta = -1;
		
					carousel.trigger("ui.carousel.change.before", [current]);
		
					if (transitionType === "fade") {
						carouselHolder.fadeOut(transitionDuration, 0.9, function (element) {
							element.slideHorizontal("right", carouselItemWidth, 0, function (element) {
								shift("left");
								element.fadeIn(transitionDuration, 0.3, function (element) {
									transitionCompleted = true;
									carousel.trigger("ui.carousel.change.after", [current]);
								});
							});
						});
					}
					else if (transitionType === "crossfade") {          
						swap(function() {
								var items = carouselHolder.find(".carousel-item");

								items.eq(current - 1).fadeIn(transitionDuration, 0, function() {                  
										items.eq(current - 1).siblings(".carousel-item").fadeOut(transitionDuration, 0, function() {

												transitionCompleted = true;
												carousel.trigger("ui.carousel.change.after", [ current ]);
										});
								});
						});
					}
					else if (transitionType === "slide") {
						if (transitionOrientation === "vertical") {
							carouselHolder.slideVertical("down", carouselItemHeight, transitionDuration, function (element) {
								shift("top");
								transitionCompleted = true;
								carousel.trigger("ui.carousel.change.after", [current]);
							});
						}
						else {
							carouselHolder.slideHorizontal("right", carouselItemWidth, transitionDuration, function (element) {
								shift("left");
								transitionCompleted = true;
								carousel.trigger("ui.carousel.change.after", [current]);
							});
						}
					}
				}
			},		
			nextSlide = function () {
		
				if (transitionCompleted) {
		
					transitionCompleted = false;
		
					delta = 1;
		
					carousel.trigger("ui.carousel.change.before", [current]);
		
					if (transitionType === "fade") {
						carouselHolder.fadeOut(transitionDuration, 0.9, function (element) {
							element.slideHorizontal("left", carouselItemWidth, 0, function (element) {
								shift("left");
								element.fadeIn(transitionDuration, 0.3, function (element) {							
									transitionCompleted = true;
									carousel.trigger("ui.carousel.change.after", [current]);
								});
							});
						});
					}
					else if (transitionType === "crossfade") {          
						swap(function() {
								var items = carouselHolder.find(".carousel-item");

								items.eq(current - 1).fadeIn(transitionDuration, 0, function() {                  
										items.eq(current - 1).siblings(".carousel-item").fadeOut(transitionDuration, 0, function() {
												transitionCompleted = true;
												carousel.trigger("ui.carousel.change.after", [ current ]);
										});
								});               
						});
					}
					else if (transitionType === "slide") {
						if (transitionOrientation === "vertical") {
							carouselHolder.slideVertical("up", carouselItemHeight, transitionDuration, function(element) {
								shift("top");
								transitionCompleted = true;
								carousel.trigger("ui.carousel.change.after", [current]);						
							});
						}
						else {
							carouselHolder.slideHorizontal("left", carouselItemWidth, transitionDuration, function(element) {
								shift("left");
								transitionCompleted = true;
								carousel.trigger("ui.carousel.change.after", [current]);
							});
						}
					}
				}
			},		
			selectSlide = function (index) {
			
				if (!isNaN(index) && (index >= 0 && index < carouselItemCount)) {

					carousel.trigger("ui.carousel.change.before", [current]);

					current = parseInt(index) + 1;
		
					if (transitionType === "crossfade") {
						var items = carouselHolder.find(".carousel-item");

						items.eq(current - 1).fadeIn(0, 0, function() {                  
								items.eq(current - 1).siblings(".carousel-item").fadeOut(0, 0, function() {

										transitionCompleted = true;
										carousel.trigger("ui.carousel.change.after", [ current ]);
								});
						});            

					}
					else {
						if (transitionOrientation === "vertical" && transitionType === "slide") {
							carouselHolder.css("top", "-" + (carouselItemHeight * current) + "px");
						}
						else {
							carouselHolder.css("left", "-" + (carouselItemWidth * current) + "px");
						}
						transitionCompleted = true;
						carousel.trigger("ui.carousel.change.after", [current]);
					}
				}
			},
			playCarousel = function () {
		
				clearInterval(run);
				
				if (playDirection === "next") {
					run = setInterval(function() {
						nextSlide();
					}, interval);
				}
				else if (playDirection === "prev") {
					run = setInterval(function() {
						prevSlide();
					}, interval);					
				}	

			},		
		
			stopCarousel = function () {		
				clearInterval(run);
			};



		if (autoScale) {
			carousel.css("width", "100%");
		}
		else {
			carousel.css("width", width).css("height", height);
		}
	
		carouselHolder = carousel.children(".carousel-item-holder").first();     
		carouselItems = carouselHolder.children(".carousel-item");
		carouselItemCount = carouselItems.length;

		if (carouselItemCount) {

			if (transitionType === "crossfade") {
				carouselItems.css("position", "absolute").children().css("width", "100%");               
			}
			else {
				carouselItems.css("display", transitionOrientation === "vertical" && transitionType === "slide" ? "block" : "inline-block").css("float", "left").children().css("width", "100%");
			}

			if (!autoScale) {
				itemBorderWidth = parseFloat(carouselItems.first().css("borderLeftWidth")) + parseFloat(carouselItems.first().css("borderRightWidth"));
				itemBorderHeight = parseFloat(carouselItems.first().css("borderTopWidth")) + parseFloat(carouselItems.first().css("borderBottomWidth"));
			}

			if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
				win.addEventListener("resize", carouselResize);

				function carouselResize() {
					resetCarousel(carousel, carouselItemCount);
				};		
			}

			win.setTimeout(function() {
				resetCarousel(carousel, carouselItemCount);
			}, 100);


			if (transitionType !== "crossfade") {
				webui(carouselItems.last()[0].cloneNode(true)).prependTo(carouselHolder);
				webui(carouselItems.first()[0].cloneNode(true)).appendTo(carouselHolder);
			}
			else {
				selectSlide(0);
			}
			
			if (autoPlay) {
					playCarousel();
					if (stopOnHover) {
							carousel.hoverIn(function() {
									stopCarousel();
							});
							carousel.hoverOut(function() {
									playCarousel();
							});
					}
			}
		}

		this.prev = function () {
			prevSlide();
		};
	
		this.next = function () {	
			nextSlide();
		};
	
		this.pick = function (index) {
			selectSlide(index);
		};
	
		this.play = function () {	
			playCarousel();
		};		
	
		this.stop = function () {	
			stopCarousel();
		};		
	
	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "carouselControl", {
		value: function (options) {

			var settings = ui.extend({
				interval: 10000,
				autoPlay: true,
				autoScale: true,
				playDirection: "next",
				stopOnHover: true,
				transitionDuration: 1500,
				transitionType: "slide",
				transitionOrientation: "horizontal",
				width: "600px",
				height: "400px"
			}, options);

			if (this.length > 1) { console.warn("WebUI carousel component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new CarouselInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.interval) { settings.interval = newSettings.interval; }
				if (newSettings.autoPlay) { settings.autoPlay = newSettings.autoPlay; }
				if (newSettings.autoScale) { settings.autoScale = newSettings.autoScale; }
				if (newSettings.playDirection) { settings.playDirection = newSettings.playDirection; }
				if (newSettings.stopOnHover) { settings.stopOnHover = newSettings.stopOnHover; }
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }
				if (newSettings.transitionType) { settings.transitionType = newSettings.transitionType; }
				if (newSettings.transitionOrientation) { settings.transitionOrientation = newSettings.transitionOrientation; }	
				if (newSettings.width) { settings.width = newSettings.width; }
				if (newSettings.height) { settings.height = newSettings.height; }
				control = new CarouselInstance(this.first(), settings);	
			};

			this.prev = function () {
				control.prev();	
			};
		
			this.next = function () {		
				control.next();	
			};
		
			this.select = function (index) {		
				control.pick(index);	
			};
		
			this.play = function () {		
				control.play();	
			};		
		
			this.stop = function () {		
				control.stop();				
			};		
	
			return this;

		},
		enumerable: false
	});

})(window);
		

(function (win) {

	/* PRIVATE */



	/* PUBLIC */

	Object.defineProperty(webui.prototype, "focusTrapControl", {
		value: function (options) {

			var settings = ui.extend({
				firstFocusElement: null,
				lastFocusElement: null
			}, options);


			if (this.length > 1) { console.warn("WebUI focusTrap component does not support initialising multiple controls. Initialize a new component instead.") }

			var context = this.first();
							
			var firstFocusEl = context.find(settings.firstFocusElement).first();
			var lastFocusEl = context.find(settings.lastFocusElement).first();

			if (firstFocusEl.length && lastFocusEl.length) {

				var focusStart = context.find("[data-webui-focus-start]").first();
				var focusEnd = context.find("[data-webui-focus-end]").first();

				if (!focusStart.length) {
					context.append("<div tabindex='0' data-webui-focus-start></div>", true);
				}
				if (!focusEnd.length) {
					context.append("<div tabindex='0' data-webui-focus-end></div>");
				}

				focusStart = context.find("[data-webui-focus-start]").first();
				if (focusStart.length) {
					focusStart.focusIn(function() {
						lastFocusEl.setFocus();
					});
					focusEnd = context.find("[data-webui-focus-end]").first();
					if (focusEnd.length) {
						focusEnd.focusIn(function() {
							firstFocusEl.setFocus();
						});
					}
				}

			}


			return this;
		},
		enumerable: false

	});

})(window);

(function (win) {
	
	/* PRIVATE */

	var MenuInstance = function(menu, settings) {

		var

			transitionDuration = settings.transitionDuration,
			transitionType = settings.transitionType,

			navigateTo = function(url) {
				if (url) {
					location.href = url;
				}
			},

			toggleDropdown = function (menuActivator) {
		
				if (menuActivator) {
		
					var dropdown = menuActivator.nextSibling("[class*='dropdown-']");
		
					if (dropdown) {
		
						if (dropdown.length) {
		
							if (dropdown.css("display") === "block") {
		
								dropdown.trigger("ui.dropdown.hide.before");
		
								if (transitionType === "fade") {
									dropdown.fadeOut(transitionDuration).trigger("ui.dropdown.hide.after");
								}
								else if (transitionType === "collapse") {
									dropdown.collapseVertical({ duration: transitionDuration }, function() {
										dropdown.trigger("ui.dropdown.hide.after");
									});
								}
								else {
									dropdown.hide().trigger("ui.dropdown.hide.after");
								}
		
								if (dropdown.parent(".dropdown").length) {
									var siblingDropdowns = dropdown.find("[class*='menu-activator']").siblings("[class*='dropdown-']").hide();
									if (transitionType === "fade") {
										siblingDropdowns.first().parents("[class*='dropdown-']").first().fadeOut(transitionDuration);
									}
									else if (transitionType === "collapse") {
										siblingDropdowns.first().parents("[class*='dropdown-']").first().collapseVertical({ duration: transitionDuration });
									}
									else {
										siblingDropdowns.first().parents("[class*='dropdown-']").first().hide();
									}
								}
							}
							else {
								
								dropdown.trigger("ui.dropdown.show.before");
		
								if (transitionType === "fade") {
									dropdown.fadeIn(transitionDuration).trigger("ui.dropdown.show.after");
								}
								else if (transitionType === "collapse") {
									dropdown.expandVertical({ duration: transitionDuration }, function() {
										dropdown.trigger("ui.dropdown.show.after");
									});
								}
								else {
									dropdown.show().trigger("ui.dropdown.show.after");
								}
		
								if (dropdown.hasClass("menu-inclusive") === false) {
		
									if (transitionType === "fade") {
										dropdown.prevSiblings("[class*='dropdown-']").fadeOut(transitionDuration);
										dropdown.nextSiblings("[class*='dropdown-']").fadeOut(transitionDuration);
									}
									else if (transitionType === "collapse") {
										dropdown.prevSiblings("[class*='dropdown-']").collapseVertical({ duration: transitionDuration });
										dropdown.nextSiblings("[class*='dropdown-']").collapseVertical({ duration: transitionDuration });
									}
									else {
										dropdown.prevSiblings("[class*='dropdown-']").hide();
										dropdown.nextSiblings("[class*='dropdown-']").hide();
									}
								}
							}
						}
						dropdown.select(".menu-close").find("[class*='menu-button']:not(.menu-activator):not(.menu-activator-focus)").click(function () {
							menuActivator.parents("[class*='dropdown-']").find("[class*='menu-activator']").siblings("[class*='dropdown-']").hide().first().parents("[class*='dropdown-']").first().hide();
							navigateTo(webui(this).data("url"));
						});
						dropdown.select(".menu-close").find("a:not(.menu-activator):not(.menu-activator-focus)").click(function (e) {
							menuActivator.parents("[class*='dropdown-']").find("[class*='menu-activator']").siblings("[class*='dropdown-']").hide().first().parents("[class*='dropdown-']").first().hide();
						});
						dropdown.select(":not(.menu-close)").find("[class*='menu-button']:not(.menu-activator):not(.menu-activator-focus)").click(function () {
							navigateTo(webui(this).data("url"));
						});
					}
				}

			};
	
		/* EVENTS */
	
		menu.find(".menu-activator").click(function (e) {
			toggleDropdown(webui(this));
		});
	
		menu.find(".menu-activator-focus").focus(function (e) {
			toggleDropdown(webui(this));
		});
	
		menu.find(".menu-activator-dynamic").hoverIn(function (e) {
			var menuActivator = webui(this);
				
			if (menuActivator.siblings("[class*='dropdown-']").css("display") === "none") {
				menuActivator.trigger("ui.dropdown.show.before");
				if (transitionType === "fade") {
					menuActivator.siblings("[class*='dropdown-']").fadeIn(transitionDuration).trigger("ui.dropdown.show.after");
				}
				else if (transitionType === "collapse") {
					menuActivator.siblings("[class*='dropdown-']").expandVertical({ duration: transitionDuration }, function() {
						menuActivator.trigger("ui.dropdown.show.after");
					});
				}
				else {
					menuActivator.siblings("[class*='dropdown-']").show().trigger("ui.dropdown.show.after");
				}
			}
		});
	
		menu.find(".menu-activator-dynamic").hoverOut(function (e) {
			var menuActivator = webui(this);
	
			var allowHide = true;
			var el = webui.elementHoverAt(e.clientX, e.clientY + 1);
	
			if (webui(el).parents("[class*='dropdown-']").length) {
				allowHide = false;
			}
			
			if (allowHide) {
				menuActivator.trigger("ui.dropdown.hide.before");
	
				if (transitionType === "fade") {
					menuActivator.siblings("[class*='dropdown-']").fadeOut(transitionDuration).trigger("ui.dropdown.show.after");
				}
				else if (transitionType === "collapse") {
					menuActivator.siblings("[class*='dropdown-']").collapseVertical({ duration: transitionDuration }, function() {
						menuActivator.trigger("ui.dropdown.show.after");
					});
				}
				else {
					menuActivator.siblings("[class*='dropdown-']").hide().trigger("ui.dropdown.show.after");
				}
			}
		});
	
		menu.find(".menu-activator-dynamic").siblings("[class*='dropdown-']").hoverIn(function () {
			var dropdown = webui(this);
	
			if (dropdown.hasClass("menu-close")) {
	
				dropdown.find("[class*='menu-button']:not(.menu-activator-dynamic)").click(function () {
					dropdown.hide().first().parents("[class*='dropdown-']").first().hide();
					navigateTo(webui(this).data("url"));
				});
				dropdown.find("a:not(.menu-activator-dynamic)").click(function (e) {
					dropdown.hide().first().parents("[class*='dropdown-']").first().hide();
				});
			}
			else {
				dropdown.find("[class*='menu-button']:not(.menu-activator-dynamic)").click(function () {
					navigateTo(webui(this).data("url"));
				});			
			}
		});
	
		menu.find(".menu-activator-dynamic").siblings("[class*='dropdown-']").hoverOut(function (e) {
	
			var dropdown = webui(this);
	
			var allowHide = true;
			var el = webui.elementHoverAt(e.clientX, e.clientY);
	
			if (webui(el).is(".menu-activator-dynamic")) {
				allowHide = false;
			}
	
			if (allowHide) {
				dropdown.trigger("ui.dropdown.hide.before");
	
				if (transitionType === "fade") {
					dropdown.fadeOut(transitionDuration).trigger("ui.dropdown.hide.after");
				}
				else if (transitionType === "collapse") {
					dropdown.collapseVertical({ duration: transitionDuration }, function() {
						dropdown.trigger("ui.dropdown.hide.after");
					});
				}
				else {
					dropdown.hide().trigger("ui.dropdown.hide.after");
				}
			}
		});
	
	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "menuControl", {
		value: function (options) {

			var settings = ui.extend({
				transitionDuration: 300,
				transitionType: "fade"
			}, options);

			if (this.length > 1) { console.warn("WebUI menu component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new MenuInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }
				if (newSettings.transitionType) { settings.transitionType = newSettings.transitionType; }
				control = new MenuInstance(this.first(), settings);	
			};


			return this;

		},
		enumerable: false
	});

})(window);
	



(function (win) {
	
	/* PRIVATE */

	var ModalInstance = function(modal, settings) {

		var

			transitionDuration = settings.transitionDuration,
			closeFromBackdrop = settings.closeFromBackdrop,
			disablePageScrolling = settings.disablePageScrolling,
			focusElement = settings.focusElement,
			focusReturnElement = settings.focusReturnElement,

			showModal = function () {
		
				if (modal) {
		
					modal.trigger("ui.modal.show.before");
					
					if (transitionDuration) {
						modal.fadeIn(transitionDuration).trigger("ui.modal.show.after");
					}
					else {
						modal.show().trigger("ui.modal.show.after");
					}
						
					if (disablePageScrolling) {
						var scrollShift = Math.floor(ui.getScrollbarWidth()) + "px";
						
						if (parseFloat(webui("body").css("height")) > win.innerHeight) {
							webui("body").css("padding-right", scrollShift);
							webui("body").css("overflow", "hidden");
						}
					}
					
					if (focusElement) {
						var focusEl = modal.find(focusElement).first();
			
						if (focusEl && !focusEl.hasClass("disabled")) {
							focusEl[0].focus();
						}	
						else {
							modal.attr("tabindex", "-1");
							modal[0].focus();
						}	
					}
					else {
						modal.attr("tabindex", "-1");
						modal[0].focus();
					}
				}
				return this;
			},
		
			hideModal = function () {
		
				if (modal) {
		
					modal.trigger("ui.modal.hide.before");
					
					if (transitionDuration) {
						modal.fadeOut(transitionDuration, 0, function() {
							if (disablePageScrolling) {
								webui("body").css("padding-right", "");
								webui("body").css("overflow", "");
							}

							modal.trigger("ui.modal.hide.after");
						});					
					}
					else {
						if (disablePageScrolling) {
							webui("body").css("padding-right", "");
							webui("body").css("overflow", "");
						}
						
						modal.hide().trigger("ui.modal.hide.after");
					}

					if (focusReturnElement) {
						var returnEl = webui(focusReturnElement).first();

						if (returnEl && !returnEl.hasClass("disabled")) {
							returnEl[0].focus();
						}
					}
				}
				return this;
			};

		this.openModal = function () {
			showModal();
		};
	
		this.closeModal = function () {	
			hideModal();
		};

		
		if (closeFromBackdrop) {
			modal.click(function (e) {
				if (e.target !== this) {
					return;
				}
				hideModal();
			});
		}

		modal.find(".modal-close").click(function (e) {
			e.preventDefault();
			hideModal();
		});
	
		modal.keyDown(function (e) {	
			if (e.which == 27) {
				e.preventDefault();
				hideModal();
			}
		});	

		modal.find(".modal-scroll-body").css("margin-right", -(ui.getScrollbarWidth() + 1) + "px");
			
	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "modalControl", {
		value: function (options) {

			var settings = ui.extend({			
				transitionDuration: 300,
				closeFromBackdrop: false,
				disablePageScrolling: true,
				focusElement: null,
				focusReturnElement: null
			}, options);

			if (this.length > 1) { console.warn("WebUI modals component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new ModalInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }
				if (newSettings.closeFromBackdrop) { settings.closeFromBackdrop = newSettings.closeFromBackdrop; }
				if (newSettings.disablePageScrolling) { settings.disablePageScrolling = newSettings.disablePageScrolling; }
				if (newSettings.focusElement) { settings.focusElement = newSettings.focusElement; }
				if (newSettings.focusReturnElement) { settings.focusReturnElement = newSettings.focusReturnElement; }
				control = new ModalInstance(this.first(), settings);	
			};


			this.open = function () {
				control.openModal();	
			};
		
			this.close = function () {		
				control.closeModal();	
			};	
			
			return this;
		},
		enumerable: false
	});
	

})(window);
		

(function (win) {
	
	/* PRIVATE */

	var NavbarInstance = function(navbar, settings) {

		var
			transitionDuration = settings.transitionDuration,

			smallDeviceMenuReverse = settings.smallDeviceMenuReverse,
			smallDeviceSubMenuPadding = settings.smallDeviceSubMenuPadding,

			mediumDeviceMenuReverse = settings.mediumDeviceMenuReverse,
			mediumDeviceSubMenuPadding = settings.mediumDeviceSubMenuPadding,

			largeDeviceMenuReverse = settings.largeDeviceMenuReverse,
			largeDeviceSubMenuPadding = settings.largeDeviceSubMenuPadding,

			largeDeviceMenuSpacing = settings.largeDeviceMenuSpacing,
			largeDeviceMenuOffset = settings.largeDeviceMenuOffset,
			largeDeviceSubMenuOffset = settings.largeDeviceSubMenuOffset,

			smallDeviceLogoColor = settings.smallDeviceLogoColor,
			smallDeviceLogoBackground = settings.smallDeviceLogoBackground,
			smallDeviceMenuColor = settings.smallDeviceMenuColor,
			smallDeviceMenuBackground = settings.smallDeviceMenuBackground,
			smallDeviceSubMenuColor = settings.smallDeviceSubMenuColor,
			smallDeviceSubMenuBackground = settings.smallDeviceSubMenuBackground,

			mediumDeviceLogoColor = settings.mediumDeviceLogoColor,
			mediumDeviceLogoBackground = settings.mediumDeviceLogoBackground,
			mediumDeviceMenuColor = settings.mediumDeviceMenuColor,
			mediumDeviceMenuBackground = settings.mediumDeviceMenuBackground,
			mediumDeviceSubMenuColor = settings.mediumDeviceSubMenuColor,
			mediumDeviceSubMenuBackground = settings.mediumDeviceSubMenuBackground,

			largeDeviceLogoColor = settings.largeDeviceLogoColor,
			largeDeviceLogoBackground = settings.largeDeviceLogoBackground,
			largeDeviceMenuColor = settings.largeDeviceMenuColor,
			largeDeviceMenuBackground = settings.largeDeviceMenuBackground,
			largeDeviceSubMenuColor = settings.largeDeviceSubMenuColor,
			largeDeviceSubMenuBackground = settings.largeDeviceSubMenuBackground,

			navButton = navbar.find("[class*='nav-button']").first(),
			navActivators = navbar.find(".nav-activator"),	

			navLogo = navbar.find(".nav-logo").first(),
			navMenu = navbar.children(".nav-menu").first(),
			navItems = navMenu.children(".nav-item"),
			navComponents = navMenu.children(".nav-component"),
			navSubMenus = navbar.find(".nav-sub-menu"),


			setSmallDeviceProperties = function() {

				if (smallDeviceMenuReverse) {
					navMenu.css("flex-direction", "row-reverse");	
				}

				navSubMenus.css("padding", smallDeviceSubMenuPadding);

				navLogo.css("color", smallDeviceLogoColor);
				if (smallDeviceLogoBackground) {
					navLogo.css("background", smallDeviceLogoBackground);
				}
				navMenu.css("color", smallDeviceMenuColor);
				if (smallDeviceMenuBackground) {
					navMenu.css("background", smallDeviceMenuBackground);
				}
				navSubMenus.css("color", smallDeviceSubMenuColor);
				if (smallDeviceSubMenuBackground) {
					navSubMenus.css("background", smallDeviceSubMenuBackground);
				}

				navMenu.children(".nav-item").last().css("margin-bottom", "1rem");
				navMenu.find(".nav-sub-menu").children(":last-of-type").css("margin-bottom", "0.5rem");
			},

			setMediumDeviceProperties = function() {

				navLogo.css("display", "flex");

				if (mediumDeviceMenuReverse) {
					navMenu.css("flex-direction", "row-reverse");
					navLogo.css("justify-content", "end").css("text-align", "right");
					navLogo.children().css("flex", "none");	
				}

				navSubMenus.css("padding", mediumDeviceSubMenuPadding);

				navLogo.css("color", mediumDeviceLogoColor);
				if (mediumDeviceLogoBackground) {
					navLogo.css("background", mediumDeviceLogoBackground);
				}
				navMenu.css("color", mediumDeviceMenuColor);
				if (mediumDeviceMenuBackground) {
					navMenu.css("background", mediumDeviceMenuBackground);		
				}
				navSubMenus.css("color", mediumDeviceSubMenuColor);
				if (mediumDeviceSubMenuBackground) {
					navSubMenus.css("background", mediumDeviceSubMenuBackground);
				}

				navMenu.children(".nav-item").last().css("margin-bottom", "1rem");
				navMenu.find(".nav-sub-menu").children(":last-of-type").css("margin-bottom", "0.5rem");
			},

			setLargeDeviceProperties = function() {

				navLogo.css("display", "flex");

				if (largeDeviceMenuReverse) {
					navMenu.css("flex-direction", "row-reverse");
					navLogo.css("justify-content", "end").css("text-align", "right");
					navLogo.children().css("flex", "none");
					
					if (navItems.last().css("margin-right")) {
						navItems.last().css("margin-left", largeDeviceMenuOffset);
					}
				}
				else {
					navItems.last().css("margin-right", largeDeviceMenuOffset);
				}
				
				navItems.css("margin-left", largeDeviceMenuSpacing);
				navSubMenus.css("margin-left", largeDeviceSubMenuOffset);
				navSubMenus.css("padding", largeDeviceSubMenuPadding);
				
				navLogo.css("color", largeDeviceLogoColor);
				if (largeDeviceLogoBackground) {
					navLogo.css("background", largeDeviceLogoBackground);
				}
				navMenu.css("color", largeDeviceMenuColor);
				if (largeDeviceMenuBackground) {
					navMenu.css("background", largeDeviceMenuBackground);
				}
				navSubMenus.css("color", largeDeviceSubMenuColor);
				if (largeDeviceSubMenuBackground) {
					navSubMenus.css("background", largeDeviceSubMenuBackground);
				}

				navMenu.children(".nav-item").last().css("margin-bottom", "0");
				navMenu.find(".nav-sub-menu").children(":last-of-type").css("margin-bottom", "0.5rem");
			},

			setNavbarProperties = function() {

				if (webui.isWindowInBreakPointRange([0, 3])) {
					setSmallDeviceProperties();
				}
				else if (webui.isWindowInBreakPointRange([3, 4])) {
					setMediumDeviceProperties();
				}
				else {
					setLargeDeviceProperties();
				}
			},

			resetNavbar = function() {	

				navLogo.attr("style", "");
				navMenu.attr("style","");
				navItems.attr("style", "");
				navComponents.attr("style", "");
				navSubMenus.attr("style", "");

		
				if (webui.isWindowInBreakPointRange([0, 3])) {

					navButton.parent().siblings(".nav-item, .nav-component").hide();
					navButton.removeClass("active");
					navSubMenus.hide();
					navActivators.removeClass("active");
					navActivators.find(".nav-indicator").removeClass("active");

					setSmallDeviceProperties();	
				}
				else if (webui.isWindowInBreakPointRange([3, 4])) {

					navButton.parent().siblings(".nav-item").hide();
					navButton.removeClass("active");
					navSubMenus.hide();
					navActivators.removeClass("active");
					navActivators.find(".nav-indicator").removeClass("active");
		
					navButton.parent().siblings(".nav-component").show();

					setMediumDeviceProperties();
				}
				else {

					navSubMenus.hide();
					navActivators.removeClass("active");
					navActivators.find(".nav-indicator").removeClass("active");
					
					navButton.parent().siblings(".nav-item, .nav-component").show();
					navSubMenus.children(".nav-item").show();

					setLargeDeviceProperties();
				}
		
			};

		setNavbarProperties();
		

		/* EVENTS */

		webui.breakpointChange(function() {
			resetNavbar();
		});
		

		navActivators.click(function(e) {
			e.preventDefault();

			var navActivator = ui(this),
				subMenu = navActivator.nextSibling(".nav-sub-menu");

			navActivator.toggleClass("active");
			navActivator.find(".nav-indicator").toggleClass("active");


			if (webui.isWindowInBreakPointRange([0, 3])) {
				subMenu.css("padding", smallDeviceSubMenuPadding);
			}
			else if (webui.isWindowInBreakPointRange([3, 4])) {
				subMenu.css("padding", mediumDeviceSubMenuPadding);
			}
			else {
				subMenu.css("padding", largeDeviceSubMenuPadding);
			}

			var navSubMenuPaddingTop = parseFloat(subMenu.css("padding-top"));
			var navSubMenuPaddingBottom = parseFloat(subMenu.css("padding-bottom"));


			if (navActivator.hasClass("active")) {

				var siblingActivators = navActivator.parent().siblings().children(".nav-activator");

				for (var i = 0; i < siblingActivators.length; i++) {

					var siblingActivator = ui(siblingActivators[i]);

					if (siblingActivator.hasClass("active")) {

						navbar.trigger("ui.navbar.submenu.hide.before");

						siblingActivator.removeClass("active");
						siblingActivator.find(".nav-indicator").removeClass("active");
		
						siblingActivator.nextSibling(".nav-sub-menu")
						.collapseVertical({ duration: transitionDuration, paddingTop: navSubMenuPaddingTop, paddingBottom: navSubMenuPaddingBottom }, function() {
							navbar.trigger("ui.navbar.submenu.hide.after");
						});
					}
				}
				
				navbar.trigger("ui.navbar.submenu.show.before");

				subMenu.expandVertical({ duration: transitionDuration, targetHeight: 0, paddingTop: navSubMenuPaddingTop, paddingBottom: navSubMenuPaddingBottom }, function() {
					navbar.trigger("ui.navbar.submenu.show.after");
				});
				
			}
			else {
				navbar.trigger("ui.navbar.submenu.hide.before");

				subMenu.collapseVertical({ duration: transitionDuration, paddingTop: navSubMenuPaddingTop, paddingBottom: navSubMenuPaddingBottom }, function() {
					navbar.trigger("ui.navbar.submenu.hide.after");
				});

			}		
		
		});
		
		navButton.click(function(e) {
			e.preventDefault();

			var toggleButton = ui(this);
			var rootItems = toggleButton.parent().siblings(".nav-item");
			var rootComponents = toggleButton.parent().siblings(".nav-component");
			var triggered = false;

			toggleButton.toggleClass("active");

			if (toggleButton.hasClass("active")) {

				navbar.trigger("ui.navbar.menu.show.before");
				
				rootItems.expandVertical({ duration: transitionDuration }, function() {
					if (!triggered) { 
						triggered = true;
						navbar.trigger("ui.navbar.menu.show.after");
					}
				});

				if (webui.isWindowInBreakPointRange([0, 3])) {
					rootComponents.expandVertical({ duration: transitionDuration }, function() {
						if (!triggered) { 
							triggered = true;
							navbar.trigger("ui.navbar.menu.show.after");
						}	
					});
				}
			}
			else {
				navbar.trigger("ui.navbar.menu.hide.before");

				rootItems.collapseVertical({ duration: transitionDuration }, function() {
					rootItems.attr("style", "");

					if (!triggered) { 
						triggered = true;		
						navbar.trigger("ui.navbar.menu.hide.after");
					}
				});

				if (webui.isWindowInBreakPointRange([0, 3])) {
					rootComponents.collapseVertical({ duration: transitionDuration }, function() {
						rootComponents.attr("style", "");

						if (!triggered) { 
							triggered = true;	
							navbar.trigger("ui.navbar.menu.hide.after");
						}
					});
	
				}
			}

		});		

	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navbarControl", {
		value: function (options) {

			var settings = ui.extend({

				transitionDuration: 300,

				smallDeviceMenuReverse: false,
				smallDeviceSubMenuPadding: "0 1rem",

				mediumDeviceMenuReverse: false,
				mediumDeviceSubMenuPadding: "0 1rem",

				largeDeviceMenuReverse: false,
				largeDeviceSubMenuPadding: "0 2rem",

				largeDeviceMenuSpacing: 0,
				largeDeviceMenuOffset: 0,				
				largeDeviceSubMenuOffset: 0,

				smallDeviceLogoColor: "inherit",
				smallDeviceLogoBackground: "",
				smallDeviceMenuColor: "inherit",
				smallDeviceMenuBackground: "",
				smallDeviceSubMenuColor: "inherit",
				smallDeviceSubMenuBackground: "rgba(255, 255, 255, 0.2)",
		
				mediumDeviceLogoColor: "inherit",
				mediumDeviceLogoBackground: "",
				mediumDeviceMenuColor: "inherit",
				mediumDeviceMenuBackground: "",
				mediumDeviceSubMenuColor: "inherit",
				mediumDeviceSubMenuBackground: "rgba(255, 255, 255, 0.2)",
		
				largeDeviceLogoColor: "inherit",
				largeDeviceLogoBackground: "",
				largeDeviceMenuColor: "inherit",
				largeDeviceMenuBackground: "",
				largeDeviceSubMenuColor: "inherit",
				largeDeviceSubMenuBackground: "inherit"

			}, options);

			if (this.length > 1) { console.warn("WebUI navbar component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new NavbarInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }

				if (newSettings.smallDeviceMenuReverse) { settings.smallDeviceMenuReverse = newSettings.smallDeviceMenuReverse; }
				if (newSettings.smallDeviceSubMenuPadding) { settings.smallDeviceSubMenuPadding = newSettings.smallDeviceSubMenuPadding; }

				if (newSettings.mediumDeviceMenuReverse) { settings.mediumDeviceMenuReverse = newSettings.mediumDeviceMenuReverse; }
				if (newSettings.mediumDeviceSubMenuPadding) { settings.mediumDeviceSubMenuPadding = newSettings.mediumDeviceSubMenuPadding; }

				if (newSettings.largeDeviceMenuReverse) { settings.largeDeviceMenuReverse = newSettings.largeDeviceMenuReverse; }
				if (newSettings.largeDeviceSubMenuPadding) { settings.largeDeviceSubMenuPadding = newSettings.largeDeviceSubMenuPadding; }

				if (newSettings.largeDeviceMenuSpacing) { settings.largeDeviceMenuSpacing = newSettings.largeDeviceMenuSpacing; }
				if (newSettings.largeDeviceMenuOffset) { settings.largeDeviceMenuOffset = newSettings.largeDeviceMenuOffset; }
				if (newSettings.largeDeviceSubMenuOffset) { settings.largeDeviceSubMenuOffset = newSettings.largeDeviceSubMenuOffset; }

				if (newSettings.smallDeviceLogoColor) { settings.smallDeviceLogoColor = newSettings.smallDeviceLogoColor; }
				if (newSettings.smallDeviceLogoBackground) { settings.smallDeviceLogoBackground = newSettings.smallDeviceLogoBackground; }
				if (newSettings.smallDeviceMenuColor) { settings.smallDeviceMenuColor = newSettings.smallDeviceMenuColor; }
				if (newSettings.smallDeviceMenuBackground) { settings.smallDeviceMenuBackground = newSettings.smallDeviceMenuBackground; }
				if (newSettings.smallDeviceSubMenuColor) { settings.smallDeviceSubMenuColor = newSettings.smallDeviceSubMenuColor; }
				if (newSettings.smallDeviceSubMenuBackground) { settings.smallDeviceSubMenuBackground = newSettings.smallDeviceSubMenuBackground; }

				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
				if (newSettings.mediumDeviceLogoColor) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }

				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				if (newSettings.largeDeviceLogoColor) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
				control = new NavbarInstance(this.first(), settings);	
			};


			return this;
		},
		enumerable: false
	});

})(window);

(function (win) {
	
	/* PRIVATE */


	
	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navButtonControl", {
		value: function (options) {

			var settings = ui.extend({
				transitionDuration: 300, 
				backgroundColor: "transparent", 
				color: "#000000"
			}, options);

			var controls = this;

			for (var i = 0; i < controls.length; i++) {
				
				var control = webui(controls[i]);

				control.append("<span class='nav-button-item'></span><span class='nav-button-item'></span><span class='nav-button-item'></span>");
				control.find(".nav-button-item").css("display", "block").css("transition-duration", settings.transitionDuration / 1000 + "s");

				control.css("background-color", settings.backgroundColor);
				control.find(".nav-button-item").css("background-color", settings.color);	
			}	
			
			return this;
		},
		enumerable: false
		
	});

})(window);
	



(function (win) {
	
	/* PRIVATE */


	
	/* PUBLIC */

	Object.defineProperty(webui.prototype, "navIndicatorControl", {
		value: function (options) {

			var settings = ui.extend({
				indicatorType: "chevron",
				indicatorSize: "medium",
				backgroundColor: "transparent", 
				color: "#000000",
				transitionDuration: 300
			}, options);

			var controls = this;
			var size = settings.indicatorSize === "small" ? "16" : settings.indicatorSize === "medium" ? "20" : settings.indicatorSize === "large" ? "24" : "20";

			for (var i = 0; i < controls.length; i++) {
				
				var control = webui(controls[i]);

				control.append("<span class='nav-indicator-item'>");

				var indicator = control.children(".nav-indicator-item").first();
				if (indicator) {
					indicator.css("background-color", settings.backgroundColor);

					if (settings.indicatorType === "caret") {
						indicator.css("background-image", "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' fill='" +  settings.color.replace(/#/i, '%23') + "' viewBox='0 0 18 18'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")");
					}
					else if (settings.indicatorType === "chevron") {
						indicator.css("background-image", "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' fill='" +  settings.color.replace(/#/i, '%23') + "' viewBox='0 0 18 18'%3E%3Cpath d='M12.2929,5.292875 C12.6834,4.902375 13.3166,4.902375 13.7071,5.292875 C14.0976,5.683375 14.0976,6.316555 13.7071,6.707085 L8.70711,11.707085 C8.31658,12.097605 7.68342,12.097605 7.29289,11.707085 L2.29289,6.707085 C1.90237,6.316555 1.90237,5.683375 2.29289,5.292875 C2.68342,4.902375 3.31658,4.902375 3.70711,5.292875 L8,9.585765 L12.2929,5.292875 Z'/%3E%3C/svg%3E\")");
					}

					indicator.css("transition-duration", settings.transitionDuration / 1000 + "s");
				}

			}	
			
			return this;
		},
		enumerable: false
		
	});

})(window);
	




(function (win) {
	
	/* PRIVATE */

	var

		resetRadial = function(el, params) {

			var radialWidth = el.offsetWidth;
			var radialHeight = el.offsetHeight;

			var radialContent = webui(el).find(".radial-content").css("transition", "all " + params.duration / 1000 + "s ease-out");
					
			var radialItems = radialContent.find(".radial-item");

			var sliceFactor = 1;
			switch (radialItems.length) {
				case 3: sliceFactor = 1.335; break;
				case 4: sliceFactor = 1.50; break;
				case 5: sliceFactor = 1.60; break;
				case 6: sliceFactor = 1.665; break;
				case 7: sliceFactor = 1.715; break;
				case 8: sliceFactor = 1.75; break;
				case 9: sliceFactor = 1.78; break;
				case 10: sliceFactor = 1.80; break;
				case 11: sliceFactor = 1.82; break;
				default: if (radialItems.length > 11) { sliceFactor = 1.833 + ((radialItems.length - 12) * 0.008); } else { sliceFactor = 1; } break;
			}

			var radialSlice = params.mode === "top" ? -sliceFactor : params.mode === "bottom" ? sliceFactor : 1;
	

			for (var j = 0; j < radialItems.length; j++) {
				var radialItem = webui(radialItems[j]);
	
				var radialItemWidth = parseFloat(radialItem.css("width"));
				var radialItemHeight = parseFloat(radialItem.css("height"));
			
				var radialLeft = ((radialWidth/2 * Math.cos(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / params.zoomFactor)) - radialItemWidth/2) + (radialWidth/2) + "px";
				var radialTop = ((radialHeight/2 * Math.sin(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / params.zoomFactor)) - radialItemHeight/2) + (radialHeight/2) + "px";
				radialItem.css("left", radialLeft);
				radialItem.css("top", radialTop);
			}
		};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "radialControl", {
		value: function (options) {

			var settings = ui.extend({
				zoomFactor: 1,
				mode: "full",
				responsive: true,
				transitionDuration: 300
			}, options);

			var controls = webui(this);

			for (var i = 0; i < controls.length; i++) {

				var radialWidth = controls[i].offsetWidth;
				var radialHeight = controls[i].offsetHeight;

				var radialContent = webui(controls[i]).find(".radial-content").css("transition", "all " + settings.transitionDuration / 1000 + "s ease-out");
						
				var radialItems = radialContent.find(".radial-item");

				var sliceFactor = 1;
				switch (radialItems.length) {
					case 3: sliceFactor = 1.335; break;
					case 4: sliceFactor = 1.50; break;
					case 5: sliceFactor = 1.60; break;
					case 6: sliceFactor = 1.665; break;
					case 7: sliceFactor = 1.715; break;
					case 8: sliceFactor = 1.75; break;
					case 9: sliceFactor = 1.78; break;
					case 10: sliceFactor = 1.80; break;
					case 11: sliceFactor = 1.82; break;
					default: if (radialItems.length > 11) { sliceFactor = 1.833 + ((radialItems.length - 12) * 0.008); } else { sliceFactor = 1; } break;
				}

				var radialSlice = settings.mode === "top" ? -sliceFactor : settings.mode === "bottom" ? sliceFactor : 1;
		

				for (var j = 0; j < radialItems.length; j++) {
					var radialItem = webui(radialItems[j]);
		
					var radialItemWidth = parseFloat(radialItem.css("width"));
					var radialItemHeight = parseFloat(radialItem.css("height"));
				
					var radialLeft = ((radialWidth/2 * Math.cos(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / settings.zoomFactor)) - radialItemWidth/2) + (radialWidth/2) + "px";
					var radialTop = ((radialHeight/2 * Math.sin(2 * Math.PI * j / radialItems.length / radialSlice)) / (1 * (1 / settings.zoomFactor)) - radialItemHeight/2) + (radialHeight/2) + "px";
					radialItem.css("left", radialLeft);
					radialItem.css("top", radialTop);
				}
				
				if (settings.responsive) {
					webui(controls[i]).resizeElement(resetRadial, {zoomFactor: settings.zoomFactor, mode: settings.mode, transitionDuration: settings.transitionDuration});
				}
			}

			this.find(".radial-activator").click(function (e) {
				e.preventDefault();
				webui(this).siblings(".radial-content").first().toggleClass("radial-open");
			});

			return this;
		},
		enumerable: false
	});

})(window);
	


(function (win) {

  /* PRIVATE */

  var

    resetScrollspy = function (controls, settings) {
      
      var scrollTargets = webui(document).find("." + settings.scrollTargetClass);

      for (var i = 0; i < scrollTargets.length; i++) {
        var el = webui(scrollTargets[i]);
        var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

        if (el[0].offsetTop <= scrollPos + settings.scrollTargetOffset) {

          var id = el.attr("id");
          var activeItem = controls.find("[data-scrollspy='#" + id + "']");

          if (!activeItem) {
            return;
          }

          controls.find(settings.activatorSelector).removeClass(settings.activatorActiveClass);
          activeItem.addClass(settings.activatorActiveClass);
        }
      }
    };

  /* PUBLIC */

  Object.defineProperty(webui.prototype, "scrollspyControl", {
    value: function (options) {

      var settings = ui.extend({
        activatorSelector: "li > a",
        activatorActiveClass: "active",
        scrollTargetClass: "scroll-target",
        scrollTargetOffset: 0,
        activatorCallback: null
      }, options);

      var controls = this;

      resetScrollspy(controls, settings);

      if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
        win.addEventListener("scroll", function () {
          resetScrollspy(controls, settings);
        });
      }

      if (settings.activatorCallback) {
        var activators = controls.find(settings.activatorSelector);
        for (var i = 0; i < activators.length; i++) {
          activators[i].addEventListener("click", function () {
            settings.activatorCallback();
          });
        }
      }

      return this;
    },
    enumerable: false
  });

})(window);

(function (win) {

	/* PUBLIC */

	// Breakpoint values must be defined as rem value strings, e.g. "29.99rem".
	// NOTE: Please make sure that the converging values have a 0.01 em/rem difference.

	webui.bp_1_under = "29.99rem";
	webui.bp_1_over = "30rem";
	webui.bp_2_under = "39.99rem";
	webui.bp_2_over = "40rem";
	webui.bp_3_under = "49.99rem";
	webui.bp_3_over = "50rem";
	webui.bp_4_under = "69.99rem";
	webui.bp_4_over = "70rem";
	webui.bp_5_under = "89.99rem";
	webui.bp_5_over = "90rem";

})(window);


(function (win) {

  /* PRIVATE */

  var fn = webui.fn;


  /* PUBLIC */

  fn.renderPolygonShape = function (polygonPoints) {
    var shape, id;
    for (var i = 0; i < this.length; i++) {
      shape = webui(this[i]);
      id = ui.getGuid();
      shape.attr("style", "clip-path: url('#" + id + "')");
      webui("<svg width='0' height='0'><defs><clipPath id='" + id + "' clipPathUnits='objectBoundingBox'><polygon points='" + polygonPoints + "' /></clipPath></defs></svg>").appendTo(shape);
    }
    return this;
  };

  fn.createRhombusShape = function () {
    this.renderPolygonShape("0.5 0, 1 0.5, 0.5 1, 0 0.5");
    return this;
  };

  fn.createRhomboidShape = function () {
    this.renderPolygonShape("0 1, 0.3 0, 1 0, 0.7 1");
    return this;
  };

  fn.createKiteShape = function () {
    this.renderPolygonShape("0.5 0, 1 0.3, 0.5 1, 0 0.3");
    return this;
  };

  fn.createEquilateralTriangleShape = function () {
    this.renderPolygonShape("0.5 0.15, 1 1, 0 1");
    return this;
  };

  fn.createTrapezoidIsoscelesShape = function () {
    this.renderPolygonShape("0 1, 0.3 0, 0.7 0, 1 1");
    return this;
  };

  fn.createTriangleIsoscelesShape = function () {
    this.renderPolygonShape("0 1, 0.5 0, 0.5 0, 1 1");
    return this;
  };

  fn.createPentagonShape = function () {
    this.renderPolygonShape("0.5 0, 1 0.4, 0.8 1, 0.2 1, 0 0.4");
    return this;
  };

  fn.createHeptagonShape = function () {
    this.renderPolygonShape("0.5 0, 0.9 0.2, 1 0.6, 0.75 1, 0.25 1, 0 0.6, 0.1 0.2");
    return this;
  };

  fn.createOctagonShape = function () {
    this.renderPolygonShape("0.3 0, 0.7 0, 1 0.3, 1 0.7, 0.7 1, 0.3 1, 0 0.7, 0 0.3");
    return this;
  }

  fn.createStarShape = function () {
    this.renderPolygonShape("0.5 0, 0.63 0.38, 1 0.38, 0.69 0.59, 0.82 1, 0.5 0.75, 0.18 1, 0.31 0.59, 0 0.38, 0.37 0.38");
    return this;
  };

})(window);


(function (win) {
		
	/* PRIVATE */

	var TabsInstance = function(tabs, settings) {

		var 
		transitionDuration = settings.transitionDuration,
		transitionType = settings.transitionType,

		selectTab = function (tabAcivator) {

			var tabId = tabAcivator.data("target");

			if (tabId) {

				var prevTabId = "#" + tabAcivator.parents(".tabs").find(".tab-item.selected").last().attr("id");

				tabAcivator.parents(".tabs").find(".tab-item").removeClass("selected");

				tabAcivator.trigger("ui.tabs.change.before", [ prevTabId, tabId ]);

				var activeTab = tabAcivator.parents(".tabs").find(tabId).first();
				
				if (transitionType === "fade") {
					activeTab.show().children().fadeIn(transitionDuration);
				}
				else if (transitionType === "collapse") {
					activeTab.expandVertical(transitionDuration, "auto");
				}
				else {
					activeTab.show();
				}

				
				activeTab.addClass("selected");

				if (transitionType === "fade") {
					activeTab.siblings(".tab-item").hide().children().fadeOut(transitionDuration);
					activeTab.parent(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").hide().children().fadeOut(transitionDuration);
					activeTab.parent(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").hide().children().fadeOut(transitionDuration);			
					activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").hide().children().fadeOut(transitionDuration);
					
					activeTab.find(".tabs").find(".tab-item").first().show().children().fadeIn(transitionDuration);			
				}
				else if (transitionType === "collapse") {
					activeTab.siblings(".tab-item").collapseVertical(transitionDuration);
					activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").collapseVertical(transitionDuration);
					activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").collapseVertical(transitionDuration);			
					activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").collapseVertical(transitionDuration);

					activeTab.find(".tabs").find(".tab-item").first().expandVertical(transitionDuration, "auto");			
				}
				else {
					activeTab.siblings(".tab-item").hide();			
					activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").hide();
					activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").hide();			
					activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").hide();
					
					activeTab.find(".tabs").find(".tab-item").first().show();									
				}
				
				tabAcivator.trigger("ui.tabs.change.after", [ prevTabId, tabId ]);
			}
		},

		initializeTabEvents = function (callback) {

			tabs.find(".tab-activator").click(function (e) {
				e.preventDefault();
				var activators = webui(this);

				if (activators.length) {
					selectTab(activators.first());
				}
			});
		
			tabs.find(".tab-activator-focus").focus(function (e) {
				e.preventDefault();
				var activators = webui(this);

				if (activators.length) {
					selectTab(activators.first());
				}	
			});
			callback();
		},

		setActiveTab = function () {

			if (settings.activeTabId) {
				var dataTarget = tabs.find("[data-target='" + settings.activeTabId + "']").first();
				if (dataTarget) {
					dataTarget[0].click();
					dataTarget.addClass("selected");
					if (settings.activeTabFocused) {
						dataTarget[0].focus();
					}
				}
				else {
					var href = tabs.find("[href='" + settings.activeTabId + "']").first();
					if (href) {
						href[0].click();
						href.addClass("selected");
						if (settings.activeTabFocused) {
							href[0].focus();
						}
					}							
				}
			}
			else {
				var tab = tabs.find(".tab-activator").last().siblings().last();
				if (tab.length) {
					tab[0].click();
				}
				else {
					tab = tabs.find(".tab-activator-focus").last().siblings().last();
					if (tab.length) {
						tab[0].click();
					}
				}
			}		

		};

		initializeTabEvents(function() {
			setActiveTab();
		});			

	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "tabControl", {
		value: function (options) {

			var settings = ui.extend({
				activeTabId: null,
				activeTabFocused: false,
				transitionDuration: 300,
				transitionType: "fade"
			}, options);

			if (this.length > 1) { console.warn("WebUI tabs component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new TabsInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.activeTabId) { settings.activeTabId = newSettings.activeTabId; }
				if (newSettings.activeTabFocused) { settings.activeTabFocused = newSettings.activeTabFocused; }
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }
				if (newSettings.transitionType) { settings.transitionType = newSettings.transitionType; }
				control = new TabsInstance(this.first(), settings);	
			};

	
			return this;
		},
		enumerable: false
	});

})(window);
		

(function (win) {
	
	/* PRIVATE */

	var ToastInstance = function(container, settings) {

		var
			position = settings.position,
			width = settings.width,
			duration = settings.duration,
			transitionDuration = settings.transitionDuration,
			toastItemTemplate = settings.toastItemTemplate,
			displayOrder = settings.displayOrder,
			autoHide = settings.autoHide,

			showToastItem = function() {

				var toastContainer = container.removeClass("*").addClass("toast-container toast-" + position).css("width", width);
				var itemTemplate = webui(toastItemTemplate);

				if (itemTemplate.length) {

					var toastItem = webui(itemTemplate[0].cloneNode(true));

					if (displayOrder.toLowerCase() === "descending") {
						toastItem.appendTo(toastContainer);
					}
					else {
						if (toastContainer.find(".toast-item").length > 0) {
							toastItem.prependTo(toastContainer);
						}
						else {
							toastItem.appendTo(toastContainer);
						}
					}

					toastItem.trigger("ui.toastitem.show.before");
	
					if (transitionDuration) {
						toastItem.fadeIn(transitionDuration).trigger("ui.toastitem.show.after");
					}
					else {
						toastItem.show().trigger("ui.toastitem.show.after");
					}

					if (autoHide) {
						setTimeout(function() {
							hideToastItem(toastItem);
						}, duration);
					}	

					var toastClose = toastItem.find(".toast-close");
					if (toastClose.length > 0) {
						toastClose.first().click(function () {
							hideToastItem(toastItem);
						});
					}
				
				}
					
			},

			hideToastItem = function(toastItem) {

				if (toastItem) {
		
					toastItem.trigger("ui.toastitem.hide.before");
					
					if (transitionDuration) {
		
						toastItem.fadeOut(transitionDuration).trigger("ui.toastitem.hide.after");
						
						setTimeout(function() {
							toastItem.remove();
						}, transitionDuration);
						
					}
					else {
						toastItem.hide().trigger("ui.toastitem.hide.after");
					}
				}
			};


		this.showToastItem = function () {
			showToastItem();
		};

	};

	/* PUBLIC */

	Object.defineProperty(webui.prototype, "toastControl", {
		value: function (options) {

			var settings = ui.extend({
				position: "top-right",
				width: "25rem",
				duration: 3000,
				transitionDuration: 300,
				toastItemTemplate: null,
				displayOrder: "ascending",
				autoHide: false
			}, options);

			if (this.length > 1) { console.warn("WebUI toast component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new ToastInstance(this.first(), settings);

			this.update = function (newSettings) {
				if (newSettings.position) { settings.position = newSettings.position; }
				if (newSettings.width) { settings.width = newSettings.width; }
				if (newSettings.duration) { settings.duration = newSettings.duration; }
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }
				if (newSettings.toastItemTemplate) { settings.toastItemTemplate = newSettings.toastItemTemplate; }
				if (newSettings.displayOrder) { settings.displayOrder = newSettings.displayOrder; }
				if (newSettings.autoHide) { settings.autoHide = newSettings.autoHide; }
				control = new ToastInstance(this.first(), settings);	
			};

			this.showToastItem = function () {
				control.showToastItem();	
			};

			return this;
		},
		enumerable: false
	});

})(window);
		
﻿
(function (win) {

	/* PRIVATE */

	var TooltipInstance = function(context, settings) {

		var
			autoPositioning = settings.autoPositioning,
			autoResizing = settings.autoResizing,
			autoPositioningMargin = settings.autoPositioningMargin,
			transitionDuration = settings.transitionDuration,
			LEFT = 0,
			TOP = 1,
			RIGHT = 2,
			BOTTOM = 3,
			SHADOW_LEFT = 0,
			SHADOW_TOP = 1,
			SHADOW_RIGHT = 2,
			SHADOW_BOTTOM = 3,

			getTooltipViewportStatus = function (tooltip, requiredMargin) {
				if (arguments.length > 0) {

					var margin = 0;
					var pointerSize = 5;
					var target = tooltip.siblings().first();
					var targetHeight = target[0].offsetHeight;
					var targetWidth = target[0].offsetWidth;
					if (arguments.length > 1 && requiredMargin != null && !isNaN(requiredMargin)) {
						margin = requiredMargin;
					}
					var viewport = {
						left: 0,
						top: 0,
						right: win.innerWidth,
						bottom: win.innerHeight
					};
					var tooltipRect = tooltip[0].getBoundingClientRect();
					var tooltipWidth = tooltipRect.right - tooltipRect.left;
					var tooltipHeight = tooltipRect.bottom - tooltipRect.top;

					var bounds = {
						top: tooltipRect.top - tooltipHeight - pointerSize - margin,
						left: tooltipRect.left - tooltipWidth - pointerSize - margin,
						bottom: tooltipRect.bottom + targetHeight + pointerSize + margin,
						right: tooltipRect.right + targetWidth + pointerSize + margin
					};

					var targetIsFirst = !target.prevSibling()[0];

					if (tooltip.hasClass("tooltip-left") || tooltip.hasClass("tooltip-right")) {
						if (tooltip.hasClass("tooltip-right")) {
								bounds.left = tooltipRect.left + targetWidth + pointerSize - margin;
						}

						if (targetIsFirst) {
							bounds.top = tooltipRect.top - tooltipHeight / 2 - targetHeight / 2 - margin;
							bounds.bottom = tooltipRect.bottom - tooltipHeight / 2 - targetHeight / 2 + margin;
						}
						else {
							bounds.top = tooltipRect.top - tooltipHeight / 2 + targetHeight / 2 - margin;
							bounds.bottom = tooltipRect.bottom - tooltipHeight / 2 + targetHeight / 2 + margin;
						}
					}
					else {
						if (targetIsFirst) {
							bounds.top = tooltipRect.top - targetHeight - tooltipHeight - pointerSize - margin;
							bounds.bottom = tooltipRect.bottom + pointerSize + margin;
						}
					}

					return {
						result: !(viewport.top > bounds.top || viewport.left > bounds.left || viewport.bottom < bounds.bottom || viewport.right < bounds.right),
						topExceeded: bounds.top < viewport.top,
						leftExceeded: bounds.left < viewport.left,
						bottomExceeded: bounds.bottom > viewport.bottom,
						rightExceeded: bounds.right > viewport.right
					};
				}
				return null;
			},

			flipTooltip = function (tooltip, orientation, shadowClass) {

				if (arguments.length > 1) {
					switch (orientation) {
						case TOP:
							tooltip.removeClass("tooltip-left");
							tooltip.removeClass("tooltip-right");
							tooltip.removeClass("tooltip-bottom");
							tooltip.addClass("tooltip-top");
							break;

						case LEFT:
							tooltip.removeClass("tooltip-top");
							tooltip.removeClass("tooltip-right");
							tooltip.removeClass("tooltip-bottom");
							tooltip.addClass("tooltip-left");
							break;

						case BOTTOM:
							tooltip.removeClass("tooltip-top");
							tooltip.removeClass("tooltip-left");
							tooltip.removeClass("tooltip-right");
							tooltip.addClass("tooltip-bottom");
							break;

						case RIGHT:
							tooltip.removeClass("tooltip-top");
							tooltip.removeClass("tooltip-left");
							tooltip.removeClass("tooltip-bottom");
							tooltip.addClass("tooltip-right");
							break;

						default:
							break;
					}
				}
				if (arguments.length > 2) {
					switch (shadowClass) {
						case SHADOW_TOP:
							tooltip.addClass("shadow-top");
							break;

						case SHADOW_LEFT:
							tooltip.addClass("shadow-left");
							break;

						case SHADOW_BOTTOM:
							tooltip.addClass("shadow-bottom");
							break;

						case SHADOW_RIGHT:
							tooltip.addClass("shadow-right");
							break;

						default:
							break;
					}
				}
			},

			positionTooltip = function (tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight) {

				if (tooltip.hasClass("tooltip-left")) {
					tooltip.css("margin-left", "-" + (tooltipWidth + 5) + "px");
					tooltip.css("top", targetHeight / 2 - tooltipHeight / 2 + "px");
				} else if (tooltip.hasClass("tooltip-top")) {
					tooltip.css("margin-top", "-" + (tooltipHeight + 5) + "px");
					tooltip.css("left", targetWidth / 2 - tooltipWidth / 2 + "px");
				} else if (tooltip.hasClass("tooltip-right")) {
					tooltip.css("margin-left", targetWidth + 5 + "px");
					tooltip.css("top", targetHeight / 2 - tooltipHeight / 2 + "px");
				} else if (tooltip.hasClass("tooltip-bottom")) {
					tooltip.css("margin-top", targetHeight + 5 + "px");
					tooltip.css("left", targetWidth / 2 - tooltipWidth / 2 + "px");
				} else {
					tooltip.css("margin-top", "-" + (tooltipHeight + 5) + "px");
					tooltip.css("left", targetWidth / 2 - tooltipWidth / 2 + "px");
				}
			},

			resetTooltips = function () {

				var tooltipWrappers = webui(context).find(".tooltip");

				for (var i = 0; i < tooltipWrappers.length; i++) {
					var tooltip = webui(tooltipWrappers[i]).children("[class*='tooltip-']").first();
					tooltip.css("margin-left", "");
					tooltip.css("margin-top", "");
					tooltip.css("left", "");
					tooltip.css("top", "");
					if (tooltip.hasClass("shadow-left")) {
						flipTooltip(tooltip, LEFT);
					} else if (tooltip.hasClass("shadow-top")) {
						flipTooltip(tooltip, TOP);
					} else if (tooltip.hasClass("shadow-right")) {
						flipTooltip(tooltip, RIGHT);
					} else if (tooltip.hasClass("shadow-bottom")) {
						flipTooltip(tooltip, BOTTOM);
					}
					showTooltip(webui(tooltipWrappers[i]), null, true);
				};
			},

			showTooltip = function (tooltipWrapper, message, resetOnly) {

				var el = webui(tooltipWrapper).first();
				var tooltip = el.children("[class*='tooltip-']").first();
		
				if (tooltip.length) {
		
					var tooltipWidth = tooltip.hasClass("tooltip-sm") ? 125 : tooltip.hasClass("tooltip-md") ? 175 : tooltip.hasClass("tooltip-lg") ? 225 : 125;
		
					if (tooltip.hasClass("tooltip-left")) {
						if (autoResizing && !tooltip.hasClass("tooltip-noautosize")) {
							if (ui.isWindowInBreakPointRange([0, 2])) {
								tooltipWidth = 125;
							}
						}
						if (autoPositioning && !tooltip.hasClass("tooltip-noautopos")) {
							if (tooltip.css("display") === "block") {
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).leftExceeded) {
									flipTooltip(tooltip, RIGHT, SHADOW_LEFT);
								}	
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).rightExceeded) {
									flipTooltip(tooltip, TOP, SHADOW_LEFT);
								}	
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).topExceeded) {
									flipTooltip(tooltip, BOTTOM, SHADOW_LEFT);
								}	
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).bottomExceeded) {
									flipTooltip(tooltip, TOP, SHADOW_LEFT);
								}
							}
						}
					} else if (tooltip.hasClass("tooltip-top")) {
						if (autoResizing && !tooltip.hasClass("tooltip-noautosize")) {
							if (ui.isWindowInBreakPointRange([0, 2])) {
								tooltipWidth = 125;
							}
						}
						if (autoPositioning && !tooltip.hasClass("tooltip-noautopos")) {
							if (tooltip.css("display") === "block") {
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).topExceeded) {
									flipTooltip(tooltip, BOTTOM, SHADOW_TOP);
									if (getTooltipViewportStatus(tooltip, autoPositioningMargin).bottomExceeded) {
										flipTooltip(tooltip, LEFT, SHADOW_TOP);
										if (getTooltipViewportStatus(tooltip, autoPositioningMargin).leftExceeded) {
											flipTooltip(tooltip, RIGHT, SHADOW_TOP);
											if (getTooltipViewportStatus(tooltip, autoPositioningMargin).rightExceeded) {
												flipTooltip(tooltip, TOP, SHADOW_TOP);
											}			
										}		
									}	
								}
							}
						}
					} else if (tooltip.hasClass("tooltip-right")) {
						if (autoResizing && !tooltip.hasClass("tooltip-noautosize")) {
							if (ui.isWindowInBreakPointRange([0, 2])) {
								tooltipWidth = 125;
							}
						}
						if (autoPositioning && !tooltip.hasClass("tooltip-noautopos")) {
							if (tooltip.css("display") === "block") {
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).rightExceeded) {
									flipTooltip(tooltip, LEFT, SHADOW_RIGHT);
								}
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).leftExceeded) {
									flipTooltip(tooltip, BOTTOM, SHADOW_RIGHT);
								}
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).bottomExceeded) {
									flipTooltip(tooltip, TOP, SHADOW_RIGHT);
								}
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).topExceeded) {
									flipTooltip(tooltip, BOTTOM, SHADOW_RIGHT);
								}		
							}
						}
					} else if (tooltip.hasClass("tooltip-bottom")) {
						if (autoResizing && !tooltip.hasClass("tooltip-noautosize")) {
							if (ui.isWindowInBreakPointRange([0, 2])) {
								tooltipWidth = 125;
							}
						}
						if (autoPositioning && !tooltip.hasClass("tooltip-noautopos")) {
							if (tooltip.css("display") === "block") {
								if (getTooltipViewportStatus(tooltip, autoPositioningMargin).bottomExceeded) {
									flipTooltip(tooltip, TOP, SHADOW_BOTTOM);
									if (getTooltipViewportStatus(tooltip, autoPositioningMargin).topExceeded) {
										flipTooltip(tooltip, RIGHT, SHADOW_BOTTOM);
										if (getTooltipViewportStatus(tooltip, autoPositioningMargin).rightExceeded) {
											flipTooltip(tooltip, LEFT, SHADOW_BOTTOM);
											if (getTooltipViewportStatus(tooltip, autoPositioningMargin).leftExceeded) {
												flipTooltip(tooltip, BOTTOM, SHADOW_BOTTOM);
											}			
										}		
									}	
								}
							}
						}
					}
					if (tooltipWidth > 0) {
						tooltip.css("width", tooltipWidth + "px");
						if (arguments.length > 0 && message != null && message.length) {
							tooltip.html(message);
						}
						var target = el.children(":not(.tooltip-dynamic):not(.tooltip-focus):not(.tooltip-static)").first();
						var targetIsFirst = !target.prevSibling()[0] && (tooltip.hasClass("tooltip-top") || tooltip.hasClass("tooltip-bottom"));
		
						if (target.length) {
							var targetWidth = target[0].offsetWidth;
							var targetHeight = targetIsFirst ? 0 : target[0].offsetHeight;
							var tooltipHeight = targetIsFirst ? tooltip[0].offsetHeight + target[0].offsetHeight : tooltip[0].offsetHeight;
							positionTooltip(tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight);
							if (arguments.length < 2 || arguments.length > 1 && !resetOnly) {
								tooltip.trigger("ui.tooltip.show.before");
								if (transitionDuration) {
									tooltip.fadeIn(transitionDuration).trigger("ui.tooltip.show.after");
								}
								else {
									tooltip.show().trigger("ui.tooltip.show.after");
								}
								win.setTimeout(function () {
									resetTooltips();
								}, 50);
							}
						}
					}
				}
				return this;
			},
		
			hideTooltip = function (tooltipWrapper) {
				var el = webui(tooltipWrapper).first();
		
				var tooltip = el.children("[class*='tooltip-']").first();
		
				if (tooltip && tooltip.length) {
					tooltip.trigger("ui.tooltip.hide.before");
					if (transitionDuration) {
						tooltip.fadeOut(transitionDuration).trigger("ui.tooltip.hide.after");
					}
					else {
						tooltip.hide().trigger("ui.tooltip.hide.after");
					}
				}
			};


		this.showTooltip = function (tooltipWrapper, message) {
			showTooltip(tooltipWrapper, message);
		};

		this.hideTooltip = function (tooltipWrapper) {
			hideTooltip(tooltipWrapper);
		};

	

		/* EVENTS */

		if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
			win.addEventListener("resize", function () {
				resetTooltips();
			});
			win.setTimeout(function () {
				win.addEventListener("scroll", function () {
					resetTooltips();
				});
			}, 100);
		}


		context.find(".tooltip").hoverIn(function () {
			var tooltipWrapper = webui(this);

			var disabledTarget = tooltipWrapper.find(".control-disabled").first();
			if (!disabledTarget.length) {
				var disabledParent = tooltipWrapper.parents(".control-group-disabled").first();
				if (!disabledParent.length) {
					var tooltip = tooltipWrapper.children(".tooltip-dynamic").first();
					if (tooltip.length) {
						showTooltip(tooltipWrapper);
						resetTooltips();
					}
				}
			}
		});

		context.find(".tooltip").hoverOut(function () {
			var tooltip = webui(this).children(".tooltip-dynamic").first();

			if (tooltip.length && !tooltip.hasClass("tooltip-noautohide")) {
				hideTooltip(webui(this));
			}
		});

		context.find(".tooltip").find("input, button, select, textarea, [tabindex]").focus(function () {
			var tooltipWrapper = webui(this).parents(".tooltip").first();

			var disabledTarget = webui(this).hasClass("control-disabled");
			if (!disabledTarget) {
				var disabledParent = webui(this).parents(".control-group-disabled").first();
				if (!disabledParent.length) {
					var el = tooltipWrapper.find(".tooltip-focus").first();
					if (el.length) {
						showTooltip(tooltipWrapper);
						resetTooltips();
					}
				}
			}
		});

		context.find(".tooltip").find("input, button, select, textarea, [tabindex]").blur(function () {
			var tooltipWrapper = webui(this).parents(".tooltip").first();

			var el = tooltipWrapper.find(".tooltip-focus").first();
			if (el.length && !el.hasClass("tooltip-noautohide")) {
				hideTooltip(tooltipWrapper);
			}
		});

		context.find(".tooltip .tooltip-static").siblings().keyDown(function (e) {	
			if (e.which == 27) {
				e.preventDefault();
				var el = webui(this).first();
				hideTooltip(el.parent(".tooltip"));
			}
		});
		
		context.find(".tooltip .tooltip-focus").siblings().keyDown(function (e) {	
			if (e.which == 27) {
				e.preventDefault();
				var el = webui(this).first();
				hideTooltip(el.parent(".tooltip"));
			}
		});

		context.find(".tooltip-close").click(function (e) {
			e.preventDefault();

			var tooltipWrapper = webui(this).closest(".tooltip");
			hideTooltip(tooltipWrapper);
		});		

	};


	/* PUBLIC */

	Object.defineProperty(webui.prototype, "tooltipControl", {
		value: function (options) {

			var settings = ui.extend({
				autoPositioning: true,
				autoResizing: true,
				autoPositioningMargin: 0,
				transitionDuration: 300
			}, options);

			if (this.length > 1) { console.warn("WebUI tooltips component does not support initialising multiple controls. Initialize a new component instead.") }

			var control = new TooltipInstance(this, settings);

			this.update = function (newSettings) {
				if (newSettings.autoPositioning) { settings.autoPositioning = newSettings.autoPositioning; }
				if (newSettings.autoResizing) { settings.autoResizing = newSettings.autoResizing; }
				if (newSettings.autoPositioningMargin) { settings.autoPositioningMargin = newSettings.autoPositioningMargin; }
				if (newSettings.transitionDuration) { settings.transitionDuration = newSettings.transitionDuration; }
				control = new TooltipInstance(this.first(), settings);	
			};


			this.showTooltip = function (tooltipWrapper, message) {
				control.showTooltip(tooltipWrapper, message);	
			};

			this.hideTooltip = function (tooltipWrapper) {
				control.hideTooltip(tooltipWrapper);	
			};

			return this;
		},
		enumerable: false
	});

})(window);


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

			this.update = function (newSettings) {
				if (newSettings.showFiles) { settings.showFiles = newSettings.showFiles; }
				if (newSettings.showCount) { settings.showCount = newSettings.showCount; }
				if (newSettings.scrollX) { settings.scrollX = newSettings.scrollX; }
				if (newSettings.scrollY) { settings.scrollY = newSettings.scrollY; }
				control = new UploadInstance(this.first(), settings);	
			};

			
			return this;
		},
		enumerable: false
	});


})(window);
		
﻿
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
	
})(window);
	

(function (win) {

	/* PRIVATE */



	/* PUBLIC */

	Object.defineProperty(webui.prototype, "zoomControl", {
		value: function (options) {

			var settings = ui.extend({
				zoomFactor: 1.05,
				trigger: "hover",
				transitionDuration: 500
			}, options);


			var controls = this;

			for (var i = 0; i < controls.length; i++) {

				var control = webui(controls[i]);
				
				control.css("transition", "all " + settings.transitionDuration / 1e3 + "s ease-in");

				if (settings.trigger === "hover") {
					control.hoverIn(function (e) {
						webui(this).css("transform", "scale(" + settings.zoomFactor + ")");
					});
					control.hoverOut(function (e) {
						webui(this).css("transform", "scale(1)");
					});
				}
				else if (settings.trigger === "focus") {
					control.focus(function (e) {
						webui(this).css("transform", "scale(" + settings.zoomFactor + ")");
					});
					control.blur(function (e) {
						webui(this).css("transform", "scale(1)");
					});
				}
			}

			return this;
		},
		enumerable: false

	});

})(window);