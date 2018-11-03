/*!
* Name: webui - UI functions
* Version: 8.1.1
* MIT License
*/
"use strict";

(function(win) {
    var _ui = win.ui, _webui = win.webui, root = document, isObject = function(el) {
        return el instanceof Object;
    }, isFunction = function(el) {
        return {}.toString.call(el) === "[object Function]";
    }, isArray = function(el) {
        return Array.isArray(el);
    }, isString = function(el) {
        return typeof el === "string";
    }, isElement = function(el) {
        return el instanceof Element;
    }, isDiv = function(el) {
        return el && el.nodeName === "DIV";
    }, isSpan = function(el) {
        return el && el.nodeName === "SPAN";
    }, isTextarea = function(el) {
        return el && el.nodeName === "TEXTAREA";
    }, isSelect = function(el) {
        return el && el.nodeName === "SELECT";
    }, isDatalist = function(el) {
        return el && el.nodeName === "DATALIST";
    }, isCheckbox = function(el) {
        return el && el.getAttribute("type") === "checkbox";
    }, isRadio = function(el) {
        return el && el.getAttribute("type") === "radio";
    }, isTextbox = function(el) {
        if (el && el.nodeName === "INPUT") {
            if (el.getAttribute("type") === null || ~[ "text", "number", "password", "date", "search", "tel", "email", "url" ].indexOf(el.getAttribute("type"))) {
                return true;
            }
        }
        return false;
    }, isPassword = function(el) {
        if (el && el.nodeName === "INPUT" && el.getAttribute("type") === "password") {
            return true;
        }
        return false;
    }, isButton = function(el) {
        if (el && el.nodeName === "BUTTON" || el && el.nodeName === "INPUT" && el.getAttribute("type") === "button") {
            return true;
        }
        return false;
    }, isArrayLike = function(obj) {
        var length = obj.length, type = typeof obj;
        if (isFunction(type) || obj === win) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return isArray(type) || length === 0 || typeof length === "number" && length > 0;
    }, valueEquals = function(selector, value) {
        var el = webui(selector);
        if (el.length === 1) {
            return isTextbox(el[0]) && el.val() === value || isTextarea(el[0]) && el.text() === value || isSelect(el[0]) && el.find("option:checked").text() === value || isCheckbox(el[0]) && el.is(":checked") === value;
        }
        return false;
    }, switchClasses = function(selector, currentCssClass, newCssClass) {
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
    }, runToggleAction = function(selector, toggleContainer) {
        if (toggleContainer.length) {
            var toggleBody = webui(".off-canvas-body");
            var toggleItem = toggleContainer.find(selector);
            var transitionDuration = parseInt(toggleContainer.data("transition-duration"));
            var transitionType = toggleContainer.data("transition-type");
            var transitionOrientation = toggleContainer.data("transition-orientation");
            var transitionDistance = toggleContainer.data("transition-distance");
            var offCanvas = toggleItem.hasClass("off-canvas-left") || toggleItem.hasClass("off-canvas-right");
            var offCanvasLeft = toggleItem.hasClass("off-canvas-left");
            if (toggleItem.length) {
                var toggleItemWidth = toggleItem[0].offsetWidth;
                if (offCanvas && toggleBody.length) {
                    ui(".off-canvas-left, .off-canvas-right").css("transition-duration", transitionDuration / 1e3 + "s");
                    toggleBody.css("transition-duration", transitionDuration / 1e3 + "s");
                    if (toggleItem.hasClass("off-canvas-closed")) {
                        toggleItem.trigger("ui.toggleItem.show.before");
                        toggleItem.removeClass("off-canvas-closed");
                        if (offCanvasLeft) {
                            toggleItem.css("transform", "translate(0, 0)");
                            toggleBody.css("transform", "translate(" + toggleItemWidth + "px, 0)");
                        } else {
                            toggleItem.css("transform", "translate(0, 0)");
                            toggleBody.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
                        }
                        toggleItem.trigger("ui.toggleItem.show.after");
                    } else {
                        toggleItem.trigger("ui.toggleItem.hide.before");
                        if (offCanvasLeft) {
                            toggleItem.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
                            toggleBody.css("transform", "translate(0, 0)");
                        } else {
                            toggleItem.css("transform", "translate(" + toggleItemWidth + "px, 0)");
                            toggleBody.css("transform", "translate(0, 0)");
                        }
                        toggleItem.addClass("off-canvas-closed");
                        toggleItem.trigger("ui.toggleItem.hide.after");
                    }
                } else if (offCanvas) {
                    ui(".off-canvas-left, .off-canvas-right").css("transition-duration", transitionDuration / 1e3 + "s");
                    if (toggleItem.hasClass("off-canvas-closed")) {
                        toggleItem.trigger("ui.toggleItem.show.before");
                        toggleItem.removeClass("off-canvas-closed");
                        if (offCanvasLeft) {
                            toggleItem.css("transform", "translate(0, 0)");
                        } else {
                            toggleItem.css("transform", "translate(0, 0)");
                        }
                        toggleItem.trigger("ui.toggleItem.show.after");
                    } else {
                        toggleItem.trigger("ui.toggleItem.hide.before");
                        if (offCanvasLeft) {
                            toggleItem.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
                        } else {
                            toggleItem.css("transform", "translate(" + toggleItemWidth + "px, 0)");
                        }
                        toggleItem.addClass("off-canvas-closed");
                        toggleItem.trigger("ui.toggleItem.hide.after");
                    }
                } else {
                    var els = toggleItem, el;
                    for (var i = 0; i < els.length; i++) {
                        el = webui(els[i]);
                        if (el.css("display") === "block") {
                            el.trigger("ui.toggleItem.hide.before");
                            if (transitionDuration && transitionType === "fade") {
                                el.fadeOut(transitionDuration, 0, function() {
                                    el.trigger("ui.toggleItem.hide.after");
                                });
                            } else if (transitionDuration && transitionType === "collapse") {
                                if (transitionOrientation === "horizontal") {
                                    el.collapseHorizontal(transitionDuration, 0, function() {
                                        el.trigger("ui.toggleItem.hide.after");
                                    });
                                } else {
                                    el.collapseVertical(transitionDuration, 0, function() {
                                        el.trigger("ui.toggleItem.hide.after");
                                    });
                                }
                            } else {
                                el.hide();
                                el.trigger("ui.toggleItem.hide.after");
                            }
                        } else {
                            el.trigger("ui.toggleItem.show.before");
                            if (transitionDuration && transitionType === "fade") {
                                el.fadeIn(transitionDuration, 0, function() {
                                    el.trigger("ui.toggleItem.show.after");
                                });
                            } else if (transitionDuration && transitionType === "collapse") {
                                if (transitionOrientation === "horizontal") {
                                    if (transitionDistance) {
                                        el.expandHorizontal(transitionDuration, transitionDistance, function() {
                                            el.trigger("ui.toggleItem.show.after");
                                        });
                                    } else {
                                        el.expandHorizontal(transitionDuration, "auto", function() {
                                            el.trigger("ui.toggleItem.show.after");
                                        });
                                    }
                                } else {
                                    if (transitionDistance) {
                                        el.expandVertical(transitionDuration, transitionDistance, function() {
                                            el.trigger("ui.toggleItem.show.after");
                                        });
                                    } else {
                                        el.expandVertical(transitionDuration, "auto", function() {
                                            el.trigger("ui.toggleItem.show.after");
                                        });
                                    }
                                }
                            } else {
                                el.show();
                                el.trigger("ui.toggleItem.show.after");
                            }
                            if (toggleContainer.hasClass("toggle-inclusive") === false) {
                                if (transitionDuration && transitionType === "fade") {
                                    el.siblings(".toggle-item").fadeOut(transitionDuration);
                                } else if (transitionDuration && transitionType === "collapse") {
                                    if (transitionOrientation === "horizontal") {
                                        el.siblings(".toggle-item").collapseHorizontal(transitionDuration);
                                    } else {
                                        el.siblings(".toggle-item").collapseVertical(transitionDuration);
                                    }
                                } else {
                                    el.siblings(".toggle-item").hide();
                                }
                            }
                        }
                    }
                }
            }
        }
    }, enableDisable = function(selector, enableSelector, currentCssClass, removeCssClass, withValue) {
        var args = arguments;
        if (enableSelector) {
            selector.attr("disabled", "");
            selector.attr("readonly", "");
        } else {
            selector.attr("disabled", "disabled");
            selector.attr("readonly", "readonly");
        }
        if (args.length > 2) {
            if (enableSelector) {
                switchClasses(selector, removeCssClass, currentCssClass);
            } else {
                switchClasses(selector, removeCssClass, currentCssClass);
            }
        }
        if (args.length === 5 && (isString(withValue) && withValue.trim())) {
            var el;
            for (var i = 0; i < selector.length; i++) {
                el = selector[i];
                if (isTextbox(el) || isButton(el)) {
                    el.value = withValue;
                } else if (isSelect(el)) {
                    webui(el).setOptionText(0, withValue);
                } else if (!isCheckbox(selector)) {
                    el.innerHTML = withValue;
                }
            }
        }
        return selector;
    }, enableDisableConditionally = function(selector, enableSelector, dependsOnSelector, dependsOnValues, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
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
                            } else {
                                selector.enable(enabledCssClass, disabledCssClass);
                            }
                        } else {
                            if (args.length > 6 && disabledValue !== null) {
                                selector.reset(true);
                                selector.disable(disabledCssClass, enabledCssClass, disabledValue);
                            } else {
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
                    } else {
                        selector.disable(disabledCssClass, enabledCssClass);
                    }
                } else {
                    if (args.length > 7 && enabledValue !== null) {
                        selector.reset(true);
                        selector.enable(enabledCssClass, disabledCssClass, enabledValue);
                    } else {
                        selector.enable(enabledCssClass, disabledCssClass);
                    }
                }
            }
        }
        return selector;
    }, showHideConditionally = function(selector, showSelector, dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue) {
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
                        } else {
                            selector.hide();
                        }
                        if (args.length > 5) {
                            var infs = webui(infoSelector);
                            for (var l = 0; l < infs.length; l++) {
                                if (isTextbox(infs[l]) || isButton(infs[l])) {
                                    webui(infs[l]).val(infoSelectorValue);
                                } else if (isSelect(infs[l])) {
                                    var options = webui(infs[l]).find("option");
                                    for (var m = 0; m < options.length; m++) {
                                        if (options[m].innerHTML === infoSelectorValue) {
                                            options[m].selected = true;
                                        }
                                    }
                                } else {
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
                } else {
                    selector.show();
                }
                if (args.length > 5) {
                    var infs = webui(infoSelector);
                    for (var j = 0; j < infs.length; j++) {
                        if (isTextbox(infs[j]) || isButton(infs[j])) {
                            webui(infs[j]).val("");
                        } else if (isSelect(infs[j])) {
                            var options = webui(infs[j]).find("option");
                            for (var k = 0; k < options.length; k++) {
                                if (options[k].innerHTML === infoSelectorValue) {
                                    options[k].selected = false;
                                }
                            }
                        } else {
                            webui(infs[j]).text("");
                        }
                    }
                }
            }
        }
        return selector;
    }, webui = function(selector) {
        return new fn.o(selector);
    }, selectorRegExp = /^([a-zA-Z0-9_=\-\s\[\]\.\#\*\,\>\+\~\(\)\:]{1,255})$/, domFragRegExp = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, fn;
    fn = webui.fn = webui.prototype = {
        length: 0,
        o: function(selector) {
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
                    } else if (el.length === 1) {
                        this[0] = el[0];
                        this.length = 1;
                        return this;
                    } else if (el.length > 1) {
                        return webui.mergeArray(this, el);
                    }
                } else if (domFragRegExp.test(selector)) {
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
    fn.first = function() {
        if (this.length) {
            return webui(this[0]);
        }
        return this;
    };
    fn.last = function() {
        if (this.length) {
            return webui(this[this.length - 1]);
        }
        return this;
    };
    fn.eq = function(index) {
        if (this.length) {
            return webui(this[index]);
        }
        return this;
    };
    fn.find = function(query) {
        var nodes = [], el;
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
    fn.filter = function(query) {
        var nodes = [], el;
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
    fn.siblings = function(query) {
        var args = arguments.length, nodes = [];
        for (var i = 0; i < this.length; i++) {
            var els = args ? webui(this[i].parentNode.children).filter(query) : webui(this[i].parentNode.children).filter("*");
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
    fn.prevSibling = function(query) {
        var args = arguments.length, nodes = [];
        for (var i = 0; i < this.length; i++) {
            nodes.push(this[i].previousElementSibling);
        }
        return args ? webui(nodes).filter(query) : webui(nodes);
    };
    fn.prevSiblings = function(query) {
        var args = arguments.length, nodes = [];
        for (var i = 0; i < this.length; i++) {
            var el = this[i];
            while (el.previousElementSibling) {
                nodes.push(el.previousElementSibling);
                el = el.previousElementSibling;
            }
        }
        return args ? webui(nodes).filter(query) : webui(nodes);
    };
    fn.nextSibling = function(query) {
        var args = arguments.length, nodes = [];
        for (var i = 0; i < this.length; i++) {
            nodes.push(this[i].nextElementSibling);
        }
        return args ? webui(nodes).filter(query) : webui(nodes);
    };
    fn.nextSiblings = function(query) {
        var args = arguments.length, nodes = [];
        for (var i = 0; i < this.length; i++) {
            var el = this[i];
            while (el.nextElementSibling) {
                nodes.push(el.nextElementSibling);
                el = el.nextElementSibling;
            }
        }
        return args ? webui(nodes).filter(query) : webui(nodes);
    };
    fn.parent = function(query) {
        var args = arguments.length, nodes = [], parent;
        for (var i = 0; i < this.length; i++) {
            if (!~nodes.indexOf(parent = this[i].parentElement) && parent) {
                nodes.push(parent);
            }
        }
        return args ? webui(nodes).filter(query) : webui(nodes);
    };
    fn.parents = function(query) {
        var args = arguments.length, nodes = [], el, els;
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
        return args ? webui(nodes).filter(query) : webui(nodes);
    };
    fn.closest = function(query) {
        var nodes = [], el, els;
        for (var i = 0; i < this.length; i++) {
            el = this[i];
            els = webui(el).filter(query);
            if (els && els.length) {
                nodes.push(els[0]);
            } else {
                while (el.parentElement) {
                    els = webui(el.parentElement).filter(query);
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
    fn.children = function(query) {
        var args = arguments, nodes = [], child;
        if (args.length === 0) {
            for (var i = 0; i < this.length; i++) {
                var children = this[i].children;
                for (var j = 0; j < children.length; j++) {
                    if (!~nodes.indexOf(child = children[j]) && child) {
                        nodes.push(child);
                    }
                }
            }
        } else {
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
    fn.append = function(elements, appendToStart) {
        var args = arguments, els, el;
        if (isObject(elements) || isString(elements) && domFragRegExp.exec(elements)) {
            els = webui(elements);
            if (args.length === 1 || args.length === 2 && !appendToStart) {
                for (var i = 0; i < this.length; i++) {
                    el = this[i];
                    if (el.nodeType === 1 || el.nodeType === 11 || el.nodeType === 9) {
                        for (var j = 0; j < els.length; j++) {
                            el.appendChild(els[j]);
                        }
                    }
                }
            } else if (args.length === 2 && appendToStart) {
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
    fn.appendTo = function(to) {
        webui(to).append(this);
        return this;
    };
    fn.prependTo = function(to) {
        webui(to).append(this, true);
        return this;
    };
    fn.remove = function() {
        for (var i = 0; i < this.length; i++) {
            this[i].parentNode && this[i].parentNode.removeChild(this[i]);
        }
        return webui([]);
    };
    fn.removeChildren = function() {
        var el;
        for (var i = 0; i < this.length; i++) {
            el = this[i];
            while (el.lastChild) {
                el.removeChild(el.lastChild);
            }
        }
        return this;
    };
    fn.hasClass = function(className) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].classList) {
                if (this[i].classList.contains(className)) {
                    return true;
                }
            } else {
                if (new RegExp("(^| )" + className + "( |$)", "gi").test(this[i].className)) {
                    return true;
                }
            }
        }
        return false;
    };
    fn.addClass = function(className) {
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
    fn.removeClass = function(className) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].classList) {
                var classNames = className.split(" ");
                for (var j = 0; j < classNames.length; j++) {
                    this[i].classList.remove(classNames[j]);
                }
            } else {
                this[i].className = this[i].className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
            }
        }
        return this;
    };
    fn.attr = function(attrName, attrValue) {
        var args = arguments, values = [];
        if (args.length === 1) {
            for (var i = 0; i < this.length; i++) {
                values.push(this[i].getAttribute(attrName));
            }
            return values.length === 1 ? values[0] : values;
        } else if (args.length === 2) {
            if (attrValue === null || attrValue === "") {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attrName);
                }
            } else {
                for (var i = 0; i < this.length; i++) {
                    this[i].setAttribute(attrName, attrValue);
                }
            }
        }
        return this;
    };
    fn.data = function(dataName, dataValue) {
        var args = arguments, name = dataName.toLowerCase(), values = [];
        if (args.length === 1) {
            for (var i = 0; i < this.length; i++) {
                values.push(this[i].getAttribute("data-" + name));
            }
            return values.length === 1 ? values[0] : values;
        } else if (args.length === 2) {
            if (dataValue === null || dataValue === "") {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute("data-" + name);
                }
            } else {
                for (var i = 0; i < this.length; i++) {
                    this[i].setAttribute("data-" + name, dataValue);
                }
            }
        }
        return this;
    };
    fn.css = function(ruleName, ruleValue) {
        var args = arguments, styles = [];
        if (args.length === 1) {
            for (var i = 0; i < this.length; i++) {
                var val = win.getComputedStyle(this[i])[ruleName];
                if (ruleName === "height" && this[i].getBoundingClientRect().height > parseFloat(val)) {
                    val = this[i].getBoundingClientRect().height + "px";
                } else if (ruleName === "width" && this[i].getBoundingClientRect().width > parseFloat(val)) {
                    val = this[i].getBoundingClientRect().width + "px";
                }
                styles.push(val != "" ? val : this[i].style[ruleName]);
            }
            return styles.length === 1 ? styles[0] : styles;
        } else if (args.length === 2) {
            for (var i = 0; i < this.length; i++) {
                this[i].style[ruleName] = ruleValue;
            }
        }
        return this;
    };
    fn.val = function(value) {
        var args = arguments, values = [];
        if (args.length === 1) {
            for (var i = 0; i < this.length; i++) {
                this[i].value = value;
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                values.push(this[i].value);
            }
            return values.length === 1 ? values[0] : values;
        }
        return this;
    };
    fn.html = function(value) {
        var args = arguments, values = [];
        if (args.length === 1) {
            for (var i = 0; i < this.length; i++) {
                this[i].innerHTML = value;
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                values.push(this[i].innerHTML);
            }
            return values.length === 1 ? values[0] : values;
        }
        return this;
    };
    fn.text = function(value) {
        var args = arguments, values = [];
        if (args.length === 1) {
            for (var i = 0; i < this.length; i++) {
                this[i].textContent = value;
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                values.push(this[i].textContent);
            }
            return values.length === 1 ? values[0] : values;
        }
        return this;
    };
    fn.show = function() {
        for (var i = 0; i < this.length; i++) {
            this[i].style["display"] = "block";
        }
        return this;
    };
    fn.hide = function() {
        for (var i = 0; i < this.length; i++) {
            this[i].style["display"] = "none";
        }
        return this;
    };
    fn.visible = function() {
        for (var i = 0; i < this.length; i++) {
            this[i].style["visibility"] = "visible";
        }
        return this;
    };
    fn.hidden = function() {
        for (var i = 0; i < this.length; i++) {
            this[i].style["visibility"] = "hidden";
        }
        return this;
    };
    fn.resize = function(eventCallback, params) {
        var el;
        for (var i = 0; i < this.length; i++) {
            el = this[i];
            var zIndex = parseInt(getComputedStyle(el));
            if (isNaN(zIndex)) {
                zIndex = 0;
            }
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
            function setScroll() {
                expand.scrollLeft = 1e7;
                expand.scrollTop = 1e7;
                shrink.scrollLeft = 1e7;
                shrink.scrollTop = 1e7;
            }
            setScroll();
            var size = el.getBoundingClientRect();
            var currentWidth = size.width;
            var currentHeight = size.height;
            var onScroll = function() {
                var size = el.getBoundingClientRect();
                var newWidth = size.width;
                var newHeight = size.height;
                if (newWidth != currentWidth || newHeight != currentHeight) {
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
    fn.hoverIn = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].onmouseenter = eventCallback;
        }
        return this;
    };
    fn.hoverOut = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].onmouseleave = eventCallback;
        }
        return this;
    };
    fn.focusIn = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].addEventListener("focusin", eventCallback);
        }
        return this;
    };
    fn.focusOut = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].addEventListener("focusout", eventCallback);
        }
        return this;
    };
    fn.focus = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].onfocus = eventCallback;
        }
        return this;
    };
    fn.blur = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].onblur = eventCallback;
        }
        return this;
    };
    fn.change = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].onchange = eventCallback;
        }
        return this;
    };
    fn.keyDown = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].onkeydown = eventCallback;
        }
        return this;
    };
    fn.click = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].onclick = eventCallback;
        }
        return this;
    };
    fn.dragStart = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].ondragstart = eventCallback;
        }
        return this;
    };
    fn.drag = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].ondrag = eventCallback;
        }
        return this;
    };
    fn.dragEnd = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].ondragend = eventCallback;
        }
        return this;
    };
    fn.dragEnter = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].ondragenter = eventCallback;
        }
        return this;
    };
    fn.dragOver = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].ondragover = eventCallback;
        }
        return this;
    };
    fn.dragLeave = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].ondragleave = eventCallback;
        }
        return this;
    };
    fn.drop = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].ondrop = eventCallback;
        }
        return this;
    };
    fn.onTransitionStart = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].ontransitionrun = eventCallback;
        }
        return this;
    };
    fn.onTransitionEnd = function(eventCallback) {
        for (var i = 0; i < this.length; i++) {
            this[i].ontransitionend = eventCallback;
        }
        return this;
    };
    fn.trigger = function(eventCallback, args) {
        var event;
        if (args && args.length) {
            event = root.createEvent("CustomEvent");
            event.initCustomEvent(eventCallback, true, true, args);
        } else {
            event = root.createEvent("HTMLEvents");
            event.initEvent(eventCallback, true, true);
        }
        for (var i = 0; i < this.length; i++) {
            this[i].dispatchEvent(event);
        }
        return this;
    };
    fn.on = function(name, callback) {
        for (var i = 0; i < this.length; i++) {
            this[i].addEventListener(name, callback);
        }
        return this;
    };
    fn.off = function(name, callback) {
        for (var i = 0; i < this.length; i++) {
            this[i].removeEventListener(name, callback);
        }
        return this;
    };
    fn.has = function(query) {
        return this.find(query).length > 0 ? true : false;
    };
    fn.is = function(query) {
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
    fn.toggle = function(toggleState) {
        if (arguments.length === 1) {
            if (toggleState === "on") {
                this.css("display", "block");
                this.attr("aria-hidden", "false");
            } else {
                this.css("display", "none");
                this.attr("aria-hidden", "true");
            }
        } else {
            var el;
            for (var i = 0; i < this.length; i++) {
                el = this[i];
                if (webui(el).css("display") === "block") {
                    el.style["display"] = "none";
                    el.setAttribute("aria-hidden", "true");
                } else {
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
            } else {
                el.addClass(className);
            }
        }
        return this;
    };
    fn.setState = function(currentCssClass, newCssClass, revertOnClick, placeholder, resetData) {
        var args = arguments;
        if (args.length > 1) {
            switchClasses(this, currentCssClass, newCssClass);
        }
        if (args.length > 2 && revertOnClick) {
            var els = this;
            this.click(function() {
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
            if (isTextbox(el) || isPassword(el) || isTextarea(el)) {
                el.setAttribute("placeholder", placeholder);
            }
        }
        return this;
    };
    fn.reset = function(resetData) {
        this.attr("disabled", null);
        this.attr("readonly", null);
        if (arguments.length === 1 && resetData) {
            var el;
            for (var i = 0; i < this.length; i++) {
                el = this[i];
                if (isTextbox(el) || isPassword(el) || isSelect(el)) {
                    el.value = "";
                } else if (isCheckbox(el)) {
                    el.checked = false;
                } else {
                    el.textContent = "";
                }
            }
        }
        return this;
    };
    fn.clear = function() {
        var el;
        for (var i = 0; i < this.length; i++) {
            el = this[i];
            if (isTextbox(el) || isPassword(el) || isTextarea(el)) {
                el.value = "";
            } else if (isCheckbox(el)) {
                el.checked = false;
            } else if (isSelect(el)) {
                webui(el).find("option").remove();
            } else {
                el.textContent = "";
            }
        }
        return this;
    };
    fn.initialize = function(enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
        var args = arguments, el;
        for (var i = 0; i < this.length; i++) {
            el = webui(this[i]);
            if (isSelect(this[i]) || isDatalist(this[i])) {
                var totalOptions = el.find("option").length;
                var firstOptionVal = el.find("option").first().val();
                var firstIndex = firstOptionVal === "" || firstOptionVal === "0" ? 1 : 0;
                if (args.length === 0 && totalOptions > firstIndex) {
                    el.enable();
                } else if (args.length === 0 && totalOptions < firstIndex + 1) {
                    el.disable();
                } else if ((args.length === 1 || args.length === 2) && totalOptions > firstIndex) {
                    el.enable(enabledCssClass, disabledCssClass);
                } else if ((args.length === 1 || args.length === 2) && totalOptions < firstIndex + 1) {
                    el.disable(disabledCssClass, enabledCssClass);
                } else if ((args.length === 3 || args.length === 4) && totalOptions > firstIndex) {
                    el.enable(enabledCssClass, disabledCssClass, enabledValue);
                } else if ((args.length === 3 || args.length === 4) && totalOptions < firstIndex + 1) {
                    el.disable(disabledCssClass, enabledCssClass, disabledValue);
                }
                if (totalOptions > 1) {
                    el.setSelectedOption(0);
                }
            }
        }
        return this;
    };
    fn.addOption = function(optionValue, optionText) {
        if (arguments.length === 2) {
            for (var i = 0; i < this.length; i++) {
                if (isSelect(this[i])) {
                    webui(this[i]).append(new Option(optionText, optionValue));
                }
            }
        }
        return this;
    };
    fn.removeOptions = function(selectedOnly) {
        var el;
        for (var i = 0; i < this.length; i++) {
            el = this[i];
            if (arguments.length === 1 && selectedOnly) {
                webui(el).find("option:checked").remove();
            } else {
                webui(el).find("option:not(:first-child)").remove();
            }
        }
        return this;
    };
    fn.setSelectedOption = function(optionIndex) {
        if (arguments.length === 1) {
            for (var i = 0; i < this.length; i++) {
                var option = webui(this[i]).find("option")[optionIndex];
                if (option) {
                    option.selected = true;
                }
            }
        }
        return this;
    };
    fn.setOptionText = function(optionIndex, optionText) {
        if (arguments.length === 2) {
            for (var i = 0; i < this.length; i++) {
                var option = webui(this[i]).find("option").eq(optionIndex);
                if (option) {
                    option.html(optionText);
                }
            }
        }
        return this;
    };
    fn.moveOptionsTo = function(toSelector, moveAll, deselectAll) {
        var args = arguments, toElement = webui(toSelector);
        if (args.length === 1 || args.length > 1 && !moveAll) {
            for (var i = 0; i < this.length; i++) {
                webui(this[i]).find("option:checked").appendTo(toElement);
                webui(this[i]).find("option:checked").remove();
            }
        } else if (args.length > 1 && moveAll) {
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
    fn.getOptionValues = function(selectedOnly) {
        var args = arguments, options = [], values = [];
        if (args.length === 0 || args.length === 1 && !selectedOnly) {
            for (var i = 0; i < this.length; i++) {
                options = webui.mergeArray(options, webui(this[i]).find("option"));
            }
        } else if (args.length === 1 && selectedOnly) {
            for (var i = 0; i < this.length; i++) {
                options = webui.mergeArray(options, webui(this[i]).find("option:checked"));
            }
        }
        for (var i = 0; i < options.length; i++) {
            values.push(options[i].value);
        }
        return values;
    };
    fn.getOptionLabels = function(selectedOnly) {
        var args = arguments, options = [], values = [];
        if (args.length === 0 || args.length === 1 && !selectedOnly) {
            for (var i = 0; i < this.length; i++) {
                options = webui.mergeArray(options, webui(this[i]).find("option"));
            }
        } else if (args.length === 1 && selectedOnly) {
            for (var i = 0; i < this.length; i++) {
                options = webui.mergeArray(options, webui(this[i]).find("option:checked"));
            }
        }
        for (var i = 0; i < options.length; i++) {
            values.push(options[i].innerHTML);
        }
        return values;
    };
    fn.enable = function(enabledCssClass, removeCssClass, withValue) {
        return enableDisable(this, true, enabledCssClass, removeCssClass, withValue);
    };
    fn.disable = function(disabledCssClass, removeCssClass, withValue) {
        return enableDisable(this, false, disabledCssClass, removeCssClass, withValue);
    };
    fn.enableConditionally = function(dependsOnSelector, dependsOnValues, enabledCssClass, disabledCssClass, enabledValue, disabledValue) {
        return enableDisableConditionally(this, true, dependsOnSelector, dependsOnValues, enabledCssClass, disabledCssClass, enabledValue, disabledValue);
    };
    fn.disableConditionally = function(dependsOnSelector, dependsOnValues, disabledCssClass, enabledCssClass, disabledValue, enabledValue) {
        return enableDisableConditionally(this, false, dependsOnSelector, dependsOnValues, enabledCssClass, disabledCssClass, enabledValue, disabledValue);
    };
    fn.showConditionally = function(dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue) {
        return showHideConditionally(this, true, dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue);
    };
    fn.hideConditionally = function(dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue) {
        return showHideConditionally(this, false, dependsOnSelector, dependsOnValues, infoSelector, infoSelectorValue);
    };
    fn.setMediaWidth = function(width, minOrMax, breakPointRange) {
        var args = arguments;
        if (args.length > 0) {
            if (args.length === 1) {
                this.css("width", width);
            } else if (args.length === 2 || args.length === 3 && breakPointRange && webui.isWindowInBreakPointRange(breakPointRange)) {
                if (minOrMax === null || minOrMax === "") {
                    this.css("width", width);
                } else if (minOrMax.toLowerCase() === "min") {
                    this.css("min-width", width);
                } else if (minOrMax.toLowerCase() === "max") {
                    this.css("max-width", width);
                }
            }
        }
        return this;
    };
    fn.setMediaHeight = function(height, minOrMax, breakPointRange) {
        var args = arguments;
        if (args.length > 0) {
            if (args.length === 1) {
                this.css("height", height);
            } else if (args.length === 2 || args.length === 3 && breakPointRange && webui.isWindowInBreakPointRange(breakPointRange)) {
                if (minOrMax == null || minOrMax == "") {
                    this.css("height", height);
                } else if (minOrMax.toLowerCase() == "min") {
                    this.css("min-height", height);
                } else if (minOrMax.toLowerCase() == "max") {
                    this.css("max-height", height);
                }
            } else if (args.length === 3 && (breakPointRange && breakPointRange.length === 2)) {
                if (webui.isWindowInBreakPointRange([ "", breakPointRange[0] ])) {
                    this.css("min-height", "1px");
                }
            }
        }
        return this;
    };
    webui.elementHoverAt = function(x, y) {
        return webui(root.elementFromPoint(x, y));
    };
    /* NON-CHAINABLE FUNCTIONS */
    webui.on = function(name, callback) {
        root.addEventListener(name, callback);
    };
    webui.off = function(name, callback) {
        root.removeEventListener(name, callback);
    };
    webui.pxToRem = function(pxValue) {
        var el = root.getElementsByTagName("html")[0];
        return parseFloat(pxValue) / parseFloat(win.getComputedStyle(el)["fontSize"]);
    };
    webui.getScrollbarWidth = function() {
        var ruler = root.createElement("div");
        ruler.className = "scrollbar-measure";
        root.body.appendChild(ruler);
        var scrollbarWidth = ruler.offsetWidth - ruler.clientWidth;
        root.body.removeChild(ruler);
        return scrollbarWidth;
    };
    webui.getAvgWidth = function(elements) {
        var len = elements.length, sum = 0;
        for (var i = 0; i < len; i++) {
            sum += parseFloat(webui(elements[i]).css("width"));
        }
        return sum / len;
    };
    webui.getAvgHeight = function(elements) {
        var len = elements.length, sum = 0;
        for (var i = 0; i < len; i++) {
            sum += parseFloat(webui(elements[i]).css("height"));
        }
        return sum / len;
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
    webui.rgbToHex = function(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    webui.rgbStringToHex = function(rgb) {
        var rgbValues = rgb.replace(/[^\d,]/g, "").split(",");
        if (rgbValues && rgbValues.length === 3) {
            return "#" + ((1 << 24) + (parseInt(rgbValues[0]) << 16) + (parseInt(rgbValues[1]) << 8) + parseInt(rgbValues[2])).toString(16).slice(1);
        }
        return null;
    };
    webui.getAccessibilityContrastColor = function(hexColor) {
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
    webui.getColorShade = function(hexColor, rgbValue) {
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
    webui.getElementViewportStatus = function(selector, requiredMargin) {
        var args = arguments, els = webui(selector), margin = 0, el;
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
    webui.isWindowInBreakPointRange = function(breakPointRange) {
        var mediaWidth = webui.pxToRem(win.innerWidth);
        var min = 0;
        var max = 0;
        if (arguments.length === 1 && breakPointRange && breakPointRange.length === 2) {
            switch (breakPointRange[0]) {
              case "xs":
                min = 30;
                break;

              case "sm":
                min = 40;
                break;

              case "md":
                min = 50;
                break;

              case "lg":
                min = 70;
                break;

              case "xl":
                min = 90;
                break;

              default:
                min = 0;
                break;
            }
            switch (breakPointRange[1]) {
              case "xs":
                max = 29.99;
                break;

              case "sm":
                max = 39.99;
                break;

              case "md":
                max = 49.99;
                break;

              case "lg":
                max = 69.99;
                break;

              case "xl":
                max = 89.99;
                break;

              default:
                max = 0;
                break;
            }
        }
        if (mediaWidth > min && mediaWidth <= max || mediaWidth > min && max == 0) {
            return true;
        }
        return false;
    };
    webui.getSelectedContent = function(targetSelector, focusTargetSelector, includeHtml) {
        var args = arguments, target = webui(targetSelector);
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
    webui.createArray = function(obj, wrapper) {
        var arr = wrapper || [];
        if (obj !== null) {
            if (isArrayLike(obj)) {
                webui.mergeArray(arr, isString(obj) ? [ obj ] : obj);
            } else {
                arr.push(obj);
            }
        }
        return arr;
    };
    webui.mergeArray = function(arr1, arr2) {
        var i = arr2.length, j = arr1.length, k = 0;
        while (k < i) {
            arr1[j++] = arr2[k++];
        }
        arr1.length = j;
        return arr1;
    };
    webui.extend = function() {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    if (typeof arguments[0][key] === "object" && typeof arguments[i][key] === "object") {
                        webui.extend(arguments[0][key], arguments[i][key]);
                    } else {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }
        }
        return arguments[0];
    };
    webui.noConflict = function() {
        win.ui = _ui;
        win.webui = _webui;
        return webui;
    };
    webui.ready = function(callback) {
        if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
            callback();
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    };
    webui.version = "v8.1.1";
    /* RUN */
    webui.ready(function() {
        webui(".checkbox label").attr("tabindex", "0").attr("role", "checkbox");
        webui(".radio label").attr("tabindex", "0").attr("role", "radio");
        webui(".off-canvas-left, .off-canvas-right").addClass("off-canvas-closed");
        webui(".off-canvas-body").parents("body").css("overflow-x", "hidden");
    });
    /* EVENTS */
    webui(".checkbox:not(.control-disabled) label").keyDown(function(e) {
        if (e.which == 13 || e.which == 32) {
            e.preventDefault();
            this.click();
        }
    });
    webui(".radio:not(.control-disabled) label").keyDown(function(e) {
        if (e.which == 13 || e.which == 32) {
            e.preventDefault();
            this.click();
        }
    });
    webui(".toggle-activator").click(function(e) {
        e.preventDefault();
        var selector = webui(this).data("target");
        if (!selector.length) {
            selector = webui(this).attr("href");
        }
        if (selector.length) {
            var toggleContainer = webui(this).closest(".toggle-container");
            runToggleAction(selector, toggleContainer);
        }
    });
    webui(".toggle-activator-focus").focus(function(e) {
        e.preventDefault();
        var selector = webui(this).data("target");
        if (!selector.length) {
            selector = webui(this).attr("href");
        }
        if (selector.length) {
            var toggleContainer = webui(this).closest(".toggle-container");
            runToggleAction(selector, toggleContainer);
        }
    });
    webui(".toggle-activator-dynamic").hoverIn(function(e) {
        e.preventDefault();
        var selector = webui(this).data("target");
        if (!selector.length) {
            selector = webui(this).attr("href");
        }
        if (selector.length) {
            var toggleContainer = webui(this).closest(".toggle-container");
            runToggleAction(selector, toggleContainer);
        }
    });
    webui(root).click(function(e) {
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

(function(win) {
    /* PRIVATE */
    var fn = webui.fn, transitionDuration = 500, transitionType = "fade", navigateTo = function(url) {
        if (url) {
            location.href = url;
        }
    };
    /* PUBLIC */
    webui.initMenus = function(options) {
        transitionDuration = options.transitionDuration !== void 0 ? options.transitionDuration : transitionDuration;
        transitionType = options.transitionType !== void 0 ? options.transitionType : transitionType;
    };
    fn.toggleDropdown = function() {
        var menuItem;
        for (var i = 0; i < this.length; i++) {
            menuItem = webui(this[i]);
            var dropdown = menuItem.nextSibling("[class*='dropdown-']");
            if (dropdown) {
                if (dropdown.length) {
                    if (dropdown.css("display") === "block") {
                        dropdown.trigger("ui.dropdown.hide.before");
                        if (transitionType === "fade") {
                            dropdown.fadeOut(transitionDuration).trigger("ui.dropdown.hide.after");
                        } else if (transitionType === "collapse") {
                            dropdown.collapseVertical(transitionDuration).trigger("ui.dropdown.hide.after");
                        } else {
                            dropdown.hide().trigger("ui.dropdown.hide.after");
                        }
                        if (dropdown.parent(".dropdown").length) {
                            var siblingDropdowns = dropdown.find("[class*='menu-activator']").siblings("[class*='dropdown-']").hide();
                            if (transitionType === "fade") {
                                siblingDropdowns.first().parents("[class*='dropdown-']").first().fadeOut(transitionDuration);
                            } else if (transitionType === "collapse") {
                                siblingDropdowns.first().parents("[class*='dropdown-']").first().collapseVertical(transitionDuration, "auto");
                            } else {
                                siblingDropdowns.first().parents("[class*='dropdown-']").first().hide();
                            }
                        }
                    } else {
                        dropdown.trigger("ui.dropdown.show.before");
                        if (transitionType === "fade") {
                            dropdown.fadeIn(transitionDuration).trigger("ui.dropdown.show.after");
                        } else if (transitionType === "collapse") {
                            dropdown.expandVertical(transitionDuration).trigger("ui.dropdown.show.after");
                        } else {
                            dropdown.show().trigger("ui.dropdown.show.after");
                        }
                        if (dropdown.hasClass("menu-inclusive") === false) {
                            if (transitionType === "fade") {
                                dropdown.prevSiblings("[class*='dropdown-']").fadeOut(transitionDuration);
                                dropdown.nextSiblings("[class*='dropdown-']").fadeOut(transitionDuration);
                            } else if (transitionType === "collapse") {
                                dropdown.prevSiblings("[class*='dropdown-']").collapseVertical(transitionDuration);
                                dropdown.nextSiblings("[class*='dropdown-']").collapseVertical(transitionDuration);
                            } else {
                                dropdown.prevSiblings("[class*='dropdown-']").hide();
                                dropdown.nextSiblings("[class*='dropdown-']").hide();
                            }
                        }
                    }
                }
                dropdown.filter(".menu-close").find("[class*='menu-button']:not(.menu-activator):not(.menu-activator-focus)").click(function() {
                    menuItem.parents("[class*='dropdown-']").find("[class*='menu-activator']").siblings("[class*='dropdown-']").hide().first().parents("[class*='dropdown-']").first().hide();
                    navigateTo(webui(this).data("url"));
                });
                dropdown.filter(".menu-close").find("a:not(.menu-activator):not(.menu-activator-focus)").click(function(e) {
                    menuItem.parents("[class*='dropdown-']").find("[class*='menu-activator']").siblings("[class*='dropdown-']").hide().first().parents("[class*='dropdown-']").first().hide();
                });
                dropdown.filter(":not(.menu-close)").find("[class*='menu-button']:not(.menu-activator):not(.menu-activator-focus)").click(function() {
                    navigateTo(webui(this).data("url"));
                });
            }
        }
    };
    /* EVENTS */
    webui(".menu-activator").click(function(e) {
        var menuItem = webui(this);
        menuItem.toggleDropdown();
    });
    webui(".menu-activator-focus").focus(function(e) {
        var menuItem = webui(this);
        menuItem.toggleDropdown();
    });
    webui(".menu-activator-dynamic").hoverIn(function(e) {
        var menuItem = webui(this);
        if (menuItem.siblings("[class*='dropdown-']").css("display") === "none") {
            menuItem.trigger("ui.dropdown.show.before");
            if (transitionType === "fade") {
                menuItem.siblings("[class*='dropdown-']").fadeIn(transitionDuration).trigger("ui.dropdown.show.after");
            } else if (transitionType === "collapse") {
                menuItem.siblings("[class*='dropdown-']").expandVertical(transitionDuration).trigger("ui.dropdown.show.after");
            } else {
                menuItem.siblings("[class*='dropdown-']").show().trigger("ui.dropdown.show.after");
            }
        }
    });
    webui(".menu-activator-dynamic").hoverOut(function(e) {
        var menuItem = webui(this);
        var allowHide = true;
        var el = webui.elementHoverAt(e.clientX, e.clientY + 1);
        if (webui(el).parents("[class*='dropdown-']").length) {
            allowHide = false;
        }
        if (allowHide) {
            menuItem.trigger("ui.dropdown.hide.before");
            if (transitionType === "fade") {
                menuItem.siblings("[class*='dropdown-']").fadeOut(transitionDuration).trigger("ui.dropdown.show.after");
            } else if (transitionType === "collapse") {
                menuItem.siblings("[class*='dropdown-']").collapseVertical(transitionDuration).trigger("ui.dropdown.show.after");
            } else {
                menuItem.siblings("[class*='dropdown-']").hide().trigger("ui.dropdown.show.after");
            }
        }
    });
    webui(".menu-activator-dynamic").siblings("[class*='dropdown-']").hoverIn(function() {
        var dropdown = webui(this);
        if (dropdown.hasClass("menu-close")) {
            dropdown.find("[class*='menu-button']:not(.menu-activator-dynamic)").click(function() {
                dropdown.hide().first().parents("[class*='dropdown-']").first().hide();
                navigateTo(webui(this).data("url"));
            });
            dropdown.find("a:not(.menu-activator-dynamic)").click(function(e) {
                dropdown.hide().first().parents("[class*='dropdown-']").first().hide();
            });
        } else {
            dropdown.find("[class*='menu-button']:not(.menu-activator-dynamic)").click(function() {
                navigateTo(webui(this).data("url"));
            });
        }
    });
    webui(".menu-activator-dynamic").siblings("[class*='dropdown-']").hoverOut(function(e) {
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
            } else if (transitionType === "collapse") {
                dropdown.collapseVertical(transitionDuration).trigger("ui.dropdown.hide.after");
            } else {
                dropdown.hide().trigger("ui.dropdown.hide.after");
            }
        }
    });
})(window);

(function(win) {
    /* PRIVATE */
    var fn = webui.fn, position = "top-right", duration = 300, transitionDuration = 300, width = "18.750rem", showHeader = true, inline = true, style = "outline-square", autoHide = false, showIcon = true, showClose = true;
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
            var alertContainer = !webui(".alert-container").length ? webui("<div></div>").addClass("alert-container").addClass("alert-" + position).appendTo("body") : webui(".alert-container").addClass("alert-" + position);
            alertContainer.css("width", width);
            var alertItemOuter = webui("<div></div>");
            var alertItemInner = webui("<div role='alert'></div>").addClass("alert alert-" + type).css("padding-left", "0.625rem").css("padding-right", "0.625rem").appendTo(alertItemOuter);
            alertItemInner.trigger("ui.alert.show.before");
            if (transitionDuration) {
                alertItemInner.fadeIn(transitionDuration).trigger("ui.alert.show.after");
            } else {
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
                        webui("<div></div>").addClass("alert-" + type + "-icon").appendTo(alertItemHeaderLeft);
                    }
                    if (close) {
                        webui("<div role='button'></div>").addClass("alert-cancel-button").appendTo(alertItemHeaderRight).click(function() {
                            ui.hideAlert(alertItemInner, false);
                        });
                    }
                }
            }
            var alertItemBody = webui("<div></div>").addClass("panel").appendTo(alertItemInner);
            if (showHeader && inline) {
                if (icon && close) {
                    webui("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody);
                    webui("<div></div>").addClass("container width-adjacent-md pad-xs move-left").appendTo(alertItemBody).html(message);
                    webui("<div role='button'></div>").addClass("width-sm move-right alert-cancel-button").appendTo(alertItemBody).click(function() {
                        ui.hideAlert(alertItemInner, false);
                    });
                } else if (icon) {
                    webui("<div></div>").addClass("width-sm move-left alert-" + type + "-icon").appendTo(alertItemBody);
                    webui("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-right", "0").appendTo(alertItemBody).html(message);
                } else if (close) {
                    webui("<div></div>").addClass("container width-adjacent-sm pad-xs move-left").css("padding-left", "0").appendTo(alertItemBody).html(message);
                    webui("<div role='button'></div>").addClass("width-sm move-right alert-cancel-button").appendTo(alertItemBody).click(function() {
                        ui.hideAlert(alertItemInner, false);
                    });
                } else {
                    webui("<div></div>").addClass("pad-xs").appendTo(alertItemBody).css("padding-left", "0").html(message);
                }
            } else {
                webui("<div></div>").appendTo(alertItemBody).html(message);
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
            if (auto && transitionDuration) {
                alert.fadeOut(transitionDuration).trigger("ui.alert.hide.after");
                setTimeout(function() {
                    alert.parent().remove();
                }, transitionDuration);
            } else {
                alert.hide().parent().remove().trigger("ui.alert.hide.after");
            }
        }
    };
    ui.showSuccessAlert = function(message, auto, icon, close) {
        var msgType = "success";
        switch (arguments.length) {
          case 1:
            ui.showAlert(message, msgType, autoHide, showIcon, showClose);
            break;

          case 2:
            ui.showAlert(message, msgType, auto, showIcon, showClose);
            break;

          case 3:
            ui.showAlert(message, msgType, auto, icon, showClose);
            break;

          case 4:
            ui.showAlert(message, msgType, auto, icon, close);
            break;

          default:
            break;
        }
    };
    ui.showInfoAlert = function(message, auto, icon, close) {
        var msgType = "info";
        switch (arguments.length) {
          case 1:
            ui.showAlert(message, msgType, autoHide, showIcon, showClose);
            break;

          case 2:
            ui.showAlert(message, msgType, auto, showIcon, showClose);
            break;

          case 3:
            ui.showAlert(message, msgType, auto, icon, showClose);
            break;

          case 4:
            ui.showAlert(message, msgType, auto, icon, close);
            break;

          default:
            break;
        }
    };
    ui.showWarningAlert = function(message, auto, icon, close) {
        var msgType = "warning";
        switch (arguments.length) {
          case 1:
            ui.showAlert(message, msgType, autoHide, showIcon, showClose);
            break;

          case 2:
            ui.showAlert(message, msgType, auto, showIcon, showClose);
            break;

          case 3:
            ui.showAlert(message, msgType, auto, icon, showClose);
            break;

          case 4:
            ui.showAlert(message, msgType, auto, icon, close);
            break;

          default:
            break;
        }
    };
    ui.showDangerAlert = function(message, auto, icon, close) {
        var msgType = "danger";
        switch (arguments.length) {
          case 1:
            ui.showAlert(message, msgType, autoHide, showIcon, showClose);
            break;

          case 2:
            ui.showAlert(message, msgType, auto, showIcon, showClose);
            break;

          case 3:
            ui.showAlert(message, msgType, auto, icon, showClose);
            break;

          case 4:
            ui.showAlert(message, msgType, auto, icon, close);
            break;

          default:
            break;
        }
    };
    /* EVENTS */
    webui(".alert-close").click(function(e) {
        e.preventDefault();
        var alert = webui(this).closest(".alert");
        alert.trigger("ui.alert.hide.before").hide().trigger("ui.alert.hide.after");
    });
})(window);

(function(win) {
    /* PRIVATE */
    var fn = webui.fn, tooltipAutoPos = true, tooltipAutoSize = true, tooltipAutoPosMargin = 0, transitionDuration = 500, LEFT = 0, TOP = 1, RIGHT = 2, BOTTOM = 3, SHADOW_LEFT = 0, SHADOW_TOP = 1, SHADOW_RIGHT = 2, SHADOW_BOTTOM = 3, getTooltipViewportStatus = function(element, requiredMargin) {
        if (arguments.length > 0) {
            var margin = 0;
            var pointerSize = 5;
            var targetHeight = element.siblings().first()[0].offsetHeight;
            var targetWidth = element.siblings().first()[0].offsetWidth;
            if (arguments.length > 1 && requiredMargin != null && !isNaN(requiredMargin)) {
                margin = requiredMargin;
            }
            var viewport = {
                left: 0,
                top: 0,
                right: win.innerWidth,
                bottom: win.innerHeight
            };
            var clientRect = element[0].getBoundingClientRect();
            var elementWidth = clientRect.right - clientRect.left;
            var elementHeight = clientRect.bottom - clientRect.top;
            var bounds = {
                top: clientRect.top - elementHeight - targetHeight / 2 + pointerSize - margin,
                left: clientRect.left + targetWidth + pointerSize - margin,
                bottom: clientRect.bottom + targetHeight + targetHeight / 2 - pointerSize + margin,
                right: clientRect.right + targetWidth + pointerSize + margin
            };
            if (element.hasClass("tooltip-left") || element.hasClass("tooltip-right")) {
                if (element.hasClass("tooltip-left")) {
                    bounds.left = clientRect.left - elementWidth - pointerSize - margin;
                }
                bounds.top = clientRect.top - elementHeight / 2 + targetHeight / 2 - margin;
                bounds.bottom = clientRect.bottom - elementHeight / 2 + targetHeight / 2 + margin;
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
    }, flipTooltip = function(tooltip, orientation, shadowClass) {
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
    }, positionTooltip = function(tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight) {
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
    }, resetTooltips = function() {
        var tooltips = webui(".tooltip");
        for (var i = 0; i < tooltips.length; i++) {
            var tooltip = webui(tooltips[i]).children("[class*='tooltip-']").first();
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
            webui(tooltips[i]).showTooltip(null, true);
        }
    };
    if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
        win.addEventListener("resize", function() {
            resetTooltips();
        });
        win.setTimeout(function() {
            win.addEventListener("scroll", function() {
                resetTooltips();
            });
        }, 100);
    }
    /* PUBLIC */
    webui.initTooltips = function(options) {
        tooltipAutoPos = options.autoPositioning !== void 0 ? options.autoPositioning : tooltipAutoPos;
        tooltipAutoPosMargin = options.autoPositioningMargin !== void 0 ? options.autoPositioningMargin : tooltipAutoPosMargin;
        tooltipAutoSize = options.autoResizing !== void 0 ? options.autoResizing : tooltipAutoSize;
        transitionDuration = options.transitionDuration !== void 0 ? options.transitionDuration : transitionDuration;
    };
    fn.showTooltip = function(message, resetOnly) {
        var el = webui(this).first();
        var tooltip = el.children("[class*='tooltip-']").first();
        if (tooltip.length) {
            var tooltipWidth = tooltip.hasClass("tooltip-sm") ? 125 : tooltip.hasClass("tooltip-md") ? 175 : tooltip.hasClass("tooltip-lg") ? 225 : 125;
            if (tooltip.hasClass("tooltip-left")) {
                if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
                    if (ui.isWindowInBreakPointRange([ "", "sm" ])) {
                        tooltipWidth = 125;
                    }
                }
                if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
                    if (tooltip.css("display") === "block") {
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {
                            flipTooltip(tooltip, RIGHT, SHADOW_LEFT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
                            flipTooltip(tooltip, TOP, SHADOW_LEFT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
                            flipTooltip(tooltip, BOTTOM, SHADOW_LEFT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
                            flipTooltip(tooltip, TOP, SHADOW_LEFT);
                        }
                    }
                }
            } else if (tooltip.hasClass("tooltip-top")) {
                if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
                    if (ui.isWindowInBreakPointRange([ "", "sm" ])) {
                        tooltipWidth = 125;
                    }
                }
                if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
                    if (tooltip.css("display") === "block") {
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
                            flipTooltip(tooltip, BOTTOM, SHADOW_TOP);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
                            flipTooltip(tooltip, TOP, SHADOW_TOP);
                        }
                    }
                }
            } else if (tooltip.hasClass("tooltip-right")) {
                if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
                    if (ui.isWindowInBreakPointRange([ "", "sm" ])) {
                        tooltipWidth = 125;
                    }
                }
                if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
                    if (tooltip.css("display") === "block") {
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).rightExceeded) {
                            flipTooltip(tooltip, LEFT, SHADOW_RIGHT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).leftExceeded) {
                            flipTooltip(tooltip, BOTTOM, SHADOW_RIGHT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
                            flipTooltip(tooltip, TOP, SHADOW_RIGHT);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
                            flipTooltip(tooltip, BOTTOM, SHADOW_RIGHT);
                        }
                    }
                }
            } else if (tooltip.hasClass("tooltip-bottom")) {
                if (tooltipAutoSize && !tooltip.hasClass("tooltip-noautosize")) {
                    if (ui.isWindowInBreakPointRange([ "", "sm" ])) {
                        tooltipWidth = 125;
                    }
                }
                if (tooltipAutoPos && !tooltip.hasClass("tooltip-noautopos")) {
                    if (tooltip.css("display") === "block") {
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).bottomExceeded) {
                            flipTooltip(tooltip, TOP, SHADOW_BOTTOM);
                        }
                        if (getTooltipViewportStatus(tooltip, tooltipAutoPosMargin).topExceeded) {
                            flipTooltip(tooltip, BOTTOM, SHADOW_BOTTOM);
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
                if (target.length) {
                    var targetWidth = target[0].offsetWidth;
                    var targetHeight = target[0].offsetHeight;
                    var tooltipHeight = tooltip[0].offsetHeight;
                    positionTooltip(tooltip, targetWidth, targetHeight, tooltipWidth, tooltipHeight);
                    if (arguments.length < 2 || arguments.length > 1 && !resetOnly) {
                        tooltip.trigger("ui.tooltip.show.before");
                        if (transitionDuration) {
                            tooltip.fadeIn(transitionDuration).trigger("ui.tooltip.show.after");
                        } else {
                            tooltip.show().trigger("ui.tooltip.show.after");
                        }
                        win.setTimeout(function() {
                            resetTooltips();
                        }, 50);
                    }
                }
            }
        }
        return this;
    };
    fn.hideTooltip = function() {
        var el = webui(this).first();
        var tooltip = el.children("[class*='tooltip-']").first();
        if (tooltip && tooltip.length) {
            tooltip.trigger("ui.tooltip.hide.before");
            if (transitionDuration) {
                tooltip.fadeOut(transitionDuration).trigger("ui.tooltip.hide.after");
            } else {
                tooltip.hide().trigger("ui.tooltip.hide.after");
            }
        }
    };
    /* EVENTS */
    webui(".tooltip").hoverIn(function() {
        var els = webui(this);
        var disabledTarget = els.children(".control-disabled");
        if (!disabledTarget.length) {
            var disabledParent = els.parents(".control-group-disabled");
            if (!disabledParent.length) {
                var tooltip = els.children(".tooltip-dynamic").first();
                if (tooltip.length) {
                    els.showTooltip();
                    resetTooltips();
                }
            }
        }
    });
    webui(".tooltip").hoverOut(function() {
        var tooltip = webui(this).children(".tooltip-dynamic").first();
        if (tooltip.length && !tooltip.hasClass("tooltip-noautohide")) {
            webui(this).hideTooltip();
        }
    });
    webui(".tooltip").children("input, button, select, textarea").focus(function() {
        var tooltip = webui(this).parent(".tooltip");
        var disabledTarget = webui(this).hasClass("control-disabled");
        if (!disabledTarget) {
            var disabledParent = webui(this).parents(".control-group-disabled");
            if (!disabledParent.length) {
                var el = tooltip.children(".tooltip-focus").first();
                if (el.length) {
                    tooltip.showTooltip();
                    resetTooltips();
                }
            }
        }
    });
    webui(".tooltip").children("input, button, select, textarea").blur(function() {
        var tooltip = webui(this).parent(".tooltip");
        var el = tooltip.children(".tooltip-focus").first();
        if (el.length && !el.hasClass("tooltip-noautohide")) {
            tooltip.hideTooltip();
        }
    });
})(window);

(function(win) {
    /* PRIVATE */
    var root = webui.root, fn = webui.fn, transitionDuration;
    /* PUBLIC */
    Object.defineProperty(webui.prototype, "modalControl", {
        value: function(options) {
            var el = this;
            var settings = ui.extend({
                closeFromBackdrop: false,
                transitionDuration: 300
            }, options);
            transitionDuration = settings.transitionDuration;
            if (settings.closeFromBackdrop) {
                el.closest(".modal").click(function(e) {
                    if (e.target !== this) {
                        return;
                    }
                    el.hideModal();
                });
            }
            return this;
        },
        enumerable: false
    });
    fn.showModal = function() {
        var modal = this;
        if (modal) {
            modal.trigger("ui.modal.show.before");
            if (transitionDuration) {
                modal.fadeIn(transitionDuration).trigger("ui.modal.show.after");
            } else {
                modal.show().trigger("ui.modal.show.after");
            }
            var scrollShift = Math.floor(ui.getScrollbarWidth()) + "px";
            if (parseFloat(webui(root).css("height")) > win.innerHeight) {
                webui("body").css("padding-right", scrollShift);
                webui("body").css("overflow", "hidden");
            }
            var focusEl = modal.find("input:not([type=hidden]), input:not([type=button]), input:not([type=submit]), input:not([type=reset]), input:not([type=image]), textarea, select");
            if (focusEl.length && !focusEl.hasClass("disabled")) {
                focusEl[0].focus();
            }
            modal.trigger("ui.modal.show.after");
        }
        return this;
    };
    fn.hideModal = function() {
        var modal = this;
        if (modal) {
            webui("body").css("padding-right", "");
            webui("body").css("overflow", "");
            modal.trigger("ui.modal.hide.before");
            if (transitionDuration) {
                modal.fadeOut(transitionDuration).trigger("ui.modal.hide.after");
            } else {
                modal.hide().parent().remove().trigger("ui.modal.hide.after");
            }
        }
        return this;
    };
    /* EVENTS */
    webui(".modal-close").click(function(e) {
        e.preventDefault();
        var modal = webui(this).closest(".modal");
        modal.trigger("ui.modal.hide.before").hideModal().trigger("ui.modal.hide.after");
    });
})(window);

(function(win) {
    /* PRIVATE */
    var fn = webui.fn;
    /* PUBLIC */
    Object.defineProperty(webui.prototype, "uploadControl", {
        value: function(options) {
            var settings = ui.extend({
                showFiles: true,
                showCount: true,
                scrollX: false,
                scrollY: false
            }, options);
            if (settings.showFiles === false) {
                this.siblings().first("label").addClass("hide-files");
            }
            if (settings.showCount === false) {
                this.siblings().first("label").addClass("hide-count");
            }
            if (settings.scrollX) {
                this.siblings().first("label").css("overflow-x", "scroll");
                this.filter(".upload-icon-bottom").siblings().first("label").css("background-position", "center calc(96% - 15px)");
            }
            if (settings.scrollY) {
                this.siblings().first("label").css("overflow-y", "scroll");
                this.filter(".upload.upload-icon-right").siblings().first("label").css("background-position", "calc(97% - 15px) 5px");
                this.filter(".upload-sm.upload-icon-right").siblings().first("label").css("background-position", "calc(97% - 15px) 2px");
            }
            return this;
        }
    });
    webui(".upload, .upload-sm").change(function() {
        var element = webui(this);
        if (element) {
            element.trigger("ui.upload.change.before");
            var label = element.siblings("label").first();
            if (element.length > 0) {
                var files = element[0].files;
                if (files != null && files.length > 0) {
                    if (label) {
                        var textValue = "";
                        if (label.hasClass("hide-files") === false) {
                            for (var i = 0; i < files.length; i++) {
                                textValue += files[i].name + "<br />";
                            }
                            textValue += "<br />";
                        }
                        if (label.hasClass("hide-count") === false) {
                            if (files.length > 1) {
                                textValue += "(" + files.length + ") files";
                            }
                        }
                        if (label.hasClass("hide-files") && label.hasClass("hide-count")) {
                            textValue += "Files loaded.";
                        }
                        textValue += "<br />";
                        label.html(textValue);
                        element.trigger("ui.upload.change.after");
                    }
                } else {
                    if (element.val() !== null && element.val().length > 0) {
                        if (label) {
                            label.text(element.val().replace("C:\\fakepath\\", ""));
                            element.trigger("ui.upload.change.after");
                        }
                    }
                }
            }
        }
    });
})(window);

(function(win) {
    /* PRIVATE */
    var transitionDuration, transitionType, selectTab = function(element) {
        var tabId = element.attr("href");
        if (!tabId) {
            tabId = element.data("target");
        }
        var prevTabId = element.parents(".tabs").find(".tab-item.selected").last().attr("id");
        var curTabId = tabId.replace("#", "");
        element.parents(".tabs").find(".tab-item").removeClass("selected");
        element.trigger("ui.tabs.change.before", [ "#" + prevTabId, "#" + curTabId ]);
        var activeTab = element.parents(".tabs").find(tabId);
        if (transitionType === "fade") {
            activeTab.show().children().fadeIn(transitionDuration);
        } else if (transitionType === "collapse") {
            activeTab.expandVertical(transitionDuration, "auto");
        } else {
            activeTab.show();
        }
        activeTab.addClass("selected");
        if (transitionType === "fade") {
            activeTab.siblings(".tab-item").hide().children().fadeOut(transitionDuration);
            activeTab.parent(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").hide().children().fadeOut(transitionDuration);
            activeTab.parent(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").hide().children().fadeOut(transitionDuration);
            activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").hide().children().fadeOut(transitionDuration);
            activeTab.find(".tabs").find(".tab-item").first().show().children().fadeIn(transitionDuration);
        } else if (transitionType === "collapse") {
            activeTab.siblings(".tab-item").collapseVertical(transitionDuration);
            activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").collapseVertical(transitionDuration);
            activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").collapseVertical(transitionDuration);
            activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").collapseVertical(transitionDuration);
            activeTab.find(".tabs").find(".tab-item").first().expandVertical(transitionDuration, "auto");
        } else {
            activeTab.siblings(".tab-item").hide();
            activeTab.parents(".tabs").parents(".tabs").first().children(".tab-item").first().siblings(".tab-item").hide();
            activeTab.parents(".tabs").parents(".tabs").last().children(".tab-item").first().siblings(".tab-item").hide();
            activeTab.find(".tabs").find(".tab-item").first().siblings(".tab-item").hide();
            activeTab.find(".tabs").find(".tab-item").first().show();
        }
        element.trigger("ui.tabs.change.after", [ "#" + prevTabId, "#" + curTabId ]);
    };
    /* PUBLIC */
    Object.defineProperty(webui.prototype, "tabControl", {
        value: function(options) {
            var settings = ui.extend({
                activeTabId: null,
                activeTabFocused: false,
                transitionDuration: 300,
                transitionType: "fade"
            }, options);
            transitionDuration = settings.transitionDuration;
            transitionType = settings.transitionType;
            if (settings.activeTabId) {
                var href = this.find("[href='" + settings.activeTabId + "']");
                if (href.length) {
                    href[0].click();
                    href.addClass("selected");
                    if (settings.activeTabFocused) {
                        href[0].focus();
                    }
                } else {
                    var dataTarget = this.find("[data-target='" + settings.activeTabId + "']");
                    if (dataTarget.length) {
                        dataTarget[0].click();
                        dataTarget.addClass("selected");
                        if (settings.activeTabFocused) {
                            dataTarget[0].focus();
                        }
                    } else {
                        var activeTab = this.find(settings.activeTabId);
                        if (activeTab.length) {
                            activeTab.addClass("selected");
                            activeTab[0].click();
                            if (settings.activeTabFocused) {
                                activeTab[0].focus();
                            }
                        }
                    }
                }
            } else {
                var tab = this.find(".tab-activator").last().siblings().last();
                if (tab.length) {
                    tab[0].click();
                } else {
                    tab = this.find(".tab-activator-focus").last().siblings().last();
                    if (tab.length) {
                        tab[0].click();
                    }
                }
            }
            return this;
        }
    });
    webui(".tab-activator").click(function(e) {
        e.preventDefault();
        var element = webui(this);
        if (element) {
            selectTab(element);
        }
    });
    webui(".tab-activator-focus").focus(function(e) {
        e.preventDefault();
        var element = webui(this);
        if (element) {
            selectTab(element);
        }
    });
})(window);

(function(win) {
    /* PRIVATE */
    var fn = webui.fn, zoom = 1, mode = "full", responsive = true, transitionDuration = 1e3, resetRadial = function(el, params) {
        var radialWidth = el.offsetWidth;
        var radialHeight = el.offsetHeight;
        var radialContent = webui(el).find(".radial-content").css("transition", "all " + params.duration / 1e3 + "s ease-out");
        var radialItems = radialContent.find(".radial-item");
        var sliceFactor = 1;
        switch (radialItems.length) {
          case 3:
            sliceFactor = 1.335;
            break;

          case 4:
            sliceFactor = 1.5;
            break;

          case 5:
            sliceFactor = 1.6;
            break;

          case 6:
            sliceFactor = 1.665;
            break;

          case 7:
            sliceFactor = 1.715;
            break;

          case 8:
            sliceFactor = 1.75;
            break;

          case 9:
            sliceFactor = 1.78;
            break;

          case 10:
            sliceFactor = 1.8;
            break;

          case 11:
            sliceFactor = 1.82;
            break;

          default:
            if (radialItems.length > 11) {
                sliceFactor = 1.833 + (radialItems.length - 12) * .008;
            } else {
                sliceFactor = 1;
            }
            break;
        }
        var radialSlice = params.mode === "top" ? -sliceFactor : params.mode === "bottom" ? sliceFactor : 1;
        for (var j = 0; j < radialItems.length; j++) {
            var radialItem = webui(radialItems[j]);
            var radialItemWidth = parseFloat(radialItem.css("width"));
            var radialItemHeight = parseFloat(radialItem.css("height"));
            var radialLeft = radialWidth / 2 * Math.cos(2 * Math.PI * j / radialItems.length / radialSlice) / (1 * (1 / params.zoom)) - radialItemWidth / 2 + radialWidth / 2 + "px";
            var radialTop = radialHeight / 2 * Math.sin(2 * Math.PI * j / radialItems.length / radialSlice) / (1 * (1 / params.zoom)) - radialItemHeight / 2 + radialHeight / 2 + "px";
            radialItem.css("left", radialLeft);
            radialItem.css("top", radialTop);
        }
    };
    /* PUBLIC */
    Object.defineProperty(webui.prototype, "radialControl", {
        value: function(options) {
            var settings = ui.extend({
                zoom: 1,
                mode: "full",
                responsive: true,
                transitionDuration: 300
            }, options);
            zoom = settings.zoom;
            mode = settings.mode;
            responsive = settings.responsive;
            transitionDuration = settings.transitionDuration;
            var radials = webui(this);
            for (var i = 0; i < radials.length; i++) {
                var radialWidth = radials[i].offsetWidth;
                var radialHeight = radials[i].offsetHeight;
                var radialContent = webui(radials[i]).find(".radial-content").css("transition", "all " + transitionDuration / 1e3 + "s ease-out");
                var radialItems = radialContent.find(".radial-item");
                var sliceFactor = 1;
                switch (radialItems.length) {
                  case 3:
                    sliceFactor = 1.335;
                    break;

                  case 4:
                    sliceFactor = 1.5;
                    break;

                  case 5:
                    sliceFactor = 1.6;
                    break;

                  case 6:
                    sliceFactor = 1.665;
                    break;

                  case 7:
                    sliceFactor = 1.715;
                    break;

                  case 8:
                    sliceFactor = 1.75;
                    break;

                  case 9:
                    sliceFactor = 1.78;
                    break;

                  case 10:
                    sliceFactor = 1.8;
                    break;

                  case 11:
                    sliceFactor = 1.82;
                    break;

                  default:
                    if (radialItems.length > 11) {
                        sliceFactor = 1.833 + (radialItems.length - 12) * .008;
                    } else {
                        sliceFactor = 1;
                    }
                    break;
                }
                var radialSlice = mode === "top" ? -sliceFactor : mode === "bottom" ? sliceFactor : 1;
                for (var j = 0; j < radialItems.length; j++) {
                    var radialItem = webui(radialItems[j]);
                    var radialItemWidth = parseFloat(radialItem.css("width"));
                    var radialItemHeight = parseFloat(radialItem.css("height"));
                    var radialLeft = radialWidth / 2 * Math.cos(2 * Math.PI * j / radialItems.length / radialSlice) / (1 * (1 / zoom)) - radialItemWidth / 2 + radialWidth / 2 + "px";
                    var radialTop = radialHeight / 2 * Math.sin(2 * Math.PI * j / radialItems.length / radialSlice) / (1 * (1 / zoom)) - radialItemHeight / 2 + radialHeight / 2 + "px";
                    radialItem.css("left", radialLeft);
                    radialItem.css("top", radialTop);
                }
                if (responsive) {
                    webui(radials[i]).resize(resetRadial, {
                        zoom: zoom,
                        mode: mode,
                        transitionDuration: transitionDuration
                    });
                }
            }
            this.find(".radial-activator").click(function(e) {
                e.preventDefault();
                webui(this).siblings(".radial-content").first().toggleClass("radial-open");
            });
        }
    });
})(window);

(function(win) {
    /* PRIVATE */
    var fn = webui.fn, interval, autoPlay, autoScale, playDirection, stopOnHover, transitionDuration, transitionType, transitionOrientation, carousel, carouselHolder, carouselItems, carouselItemCount, carouselItemWidth = 0, carouselItemHeight = 0, itemBorderWidth = 0, itemBorderHeight = 0, current = 1, cycle = false, delta = 1, transitionCompleted = true, shift = function(dir) {
        current += delta;
        cycle = !!(current === 0 || current > carouselItemCount);
        if (cycle) {
            current = current === 0 ? carouselItemCount : 1;
            if (transitionOrientation === "vertical" && transitionType === "slide") {
                carouselHolder.css(dir, "-" + carouselItemHeight * current + "px");
            } else {
                carouselHolder.css(dir, "-" + carouselItemWidth * current + "px");
            }
        }
    }, resetCarousel = function(carousel, itemCount, isResizeEvent) {
        if (autoScale) {
            carousel.css("width", "100%");
            carouselHolder = carousel.find(".carousel-item-holder");
            carouselItems = carouselHolder.find(".carousel-item");
            if (isResizeEvent) {
                carouselItems.css("width", carousel[0].offsetWidth - itemBorderWidth + "px").css("height", "auto");
            } else {
                carouselItems.css("width", carousel[0].offsetWidth - itemBorderWidth + "px").css("height", carousel[0].offsetHeight - itemBorderHeight + "px");
            }
            win.setTimeout(function() {
                carouselItemWidth = ui.getAvgWidth(carouselItems);
                carouselItemHeight = ui.getAvgHeight(carouselItems);
                if (transitionOrientation === "vertical" && transitionType === "slide") {
                    var h = carouselItemHeight * itemCount + carouselItemHeight * 3;
                    var t = carouselItemHeight * current;
                    carouselHolder.css("top", "-" + t + "px").css("height", h + "px").css("width", carouselItemWidth + "px");
                } else {
                    var w = carouselItemWidth * itemCount + carouselItemWidth * 3;
                    var l = carouselItemWidth * current;
                    carouselHolder.css("width", w + "px").css("height", carouselItemHeight + "px").css("left", "-" + l + "px");
                }
                carousel.css("width", carouselItemWidth + "px").css("height", carouselItemHeight + "px");
            }, 100);
        } else {
            carouselHolder = carousel.find(".carousel-item-holder");
            carouselItems = carouselHolder.find(".carousel-item");
            carouselItems.css("width", carousel[0].clientWidth + "px").css("height", carousel[0].clientHeight + "px");
            win.setTimeout(function() {
                carouselItemWidth = ui.getMaxWidth(carouselItems);
                carouselItemHeight = ui.getMaxHeight(carouselItems);
                carouselItems.children().css("width", carouselItemWidth - itemBorderWidth + "px").css("height", carouselItemHeight - itemBorderHeight + "px");
                if (transitionOrientation === "vertical" && transitionType === "slide") {
                    var h = carouselItemHeight * itemCount + carouselItemHeight * 3;
                    var t = carouselItemHeight * current;
                    carouselHolder.css("height", h + "px").css("width", carouselItemWidth + "px").css("top", "-" + t + "px");
                } else {
                    var w = carouselItemWidth * itemCount + carouselItemWidth * 3;
                    var l = carouselItemWidth * current;
                    carouselHolder.css("width", w + "px").css("height", carouselItemHeight + "px").css("left", "-" + l + "px");
                }
            }, 100);
        }
    };
    /* PUBLIC */
    Object.defineProperty(webui.prototype, "carouselControl", {
        value: function(options) {
            var settings = ui.extend({
                interval: 1e4,
                autoPlay: true,
                autoScale: true,
                playDirection: "next",
                stopOnHover: true,
                transitionDuration: 1500,
                transitionType: "slide",
                transitionOrientation: "horizontal"
            }, options);
            interval = settings.interval;
            autoPlay = settings.autoPlay;
            autoScale = settings.autoScale;
            playDirection = settings.playDirection;
            stopOnHover = settings.stopOnHover;
            transitionDuration = settings.transitionDuration;
            transitionType = settings.transitionType;
            transitionOrientation = settings.transitionOrientation;
            if (this.length > 1 || webui(".carousel").length > 1) {
                carousel = this.first();
                console.error("Multiple carousels are not supported in WebUI.");
            } else {
                carousel = this;
            }
            carousel.css("display", "block");
            carouselHolder = carousel.find(".carousel-item-holder").css("display", "block");
            carouselItems = carouselHolder.find(".carousel-item");
            carouselItemCount = carouselItems.length;
            if (carouselItemCount) {
                carouselItems.css("display", transitionOrientation === "vertical" && transitionType === "slide" ? "block" : "inline-block").css("float", "left").children().css("width", "100%").css("display", "block").css("margin", "0");
                itemBorderWidth = parseFloat(carouselItems.first().css("borderLeftWidth")) + parseFloat(carouselItems.first().css("borderRightWidth"));
                itemBorderHeight = parseFloat(carouselItems.first().css("borderTopWidth")) + parseFloat(carouselItems.first().css("borderBottomWidth"));
                resetCarousel(carousel, carouselItemCount);
                if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
                    win.onresize = function() {
                        resetCarousel(carousel, carouselItemCount, true);
                    };
                }
                webui(carouselItems.last()[0].cloneNode(true)).prependTo(carouselHolder);
                webui(carouselItems.first()[0].cloneNode(true)).appendTo(carouselHolder);
                if (autoPlay) {
                    carousel.play();
                    if (stopOnHover) {
                        carousel.hoverIn(function() {
                            carousel.stop();
                        });
                        carousel.hoverOut(function() {
                            carousel.play();
                        });
                    }
                }
            }
            return this;
        },
        enumerable: false
    });
    fn.prev = function() {
        if (transitionCompleted) {
            transitionCompleted = false;
            delta = -1;
            carousel.trigger("ui.carousel.change.before", [ current ]);
            if (transitionType === "fade") {
                carouselHolder.fadeOut(1e3, .5, function(element) {
                    element.slideHorizontal("right", carouselItemWidth, 0, function(element) {
                        shift("left");
                        element.fadeIn(transitionDuration, 0, function(element) {
                            transitionCompleted = true;
                            carousel.trigger("ui.carousel.change.after", [ current ]);
                        });
                    });
                });
            } else if (transitionType === "slide") {
                if (transitionOrientation === "vertical") {
                    carouselHolder.slideVertical("down", carouselItemHeight, transitionDuration, function(element) {
                        shift("top");
                        transitionCompleted = true;
                        carousel.trigger("ui.carousel.change.after", [ current ]);
                    });
                } else {
                    carouselHolder.slideHorizontal("right", carouselItemWidth, transitionDuration, function(element) {
                        shift("left");
                        transitionCompleted = true;
                        carousel.trigger("ui.carousel.change.after", [ current ]);
                    });
                }
            }
        }
        return this;
    };
    fn.next = function() {
        if (transitionCompleted) {
            transitionCompleted = false;
            delta = 1;
            carousel.trigger("ui.carousel.change.before", [ current ]);
            if (transitionType === "fade") {
                carouselHolder.fadeOut(1e3, .5, function(element) {
                    element.slideHorizontal("left", carouselItemWidth, 0, function(element) {
                        shift("left");
                        element.fadeIn(transitionDuration, 0, function(element) {
                            transitionCompleted = true;
                            carousel.trigger("ui.carousel.change.after", [ current ]);
                        });
                    });
                });
            } else if (transitionType === "slide") {
                if (transitionOrientation === "vertical") {
                    carouselHolder.slideVertical("up", carouselItemHeight, transitionDuration, function(element) {
                        shift("top");
                        transitionCompleted = true;
                        carousel.trigger("ui.carousel.change.after", [ current ]);
                    });
                } else {
                    carouselHolder.slideHorizontal("left", carouselItemWidth, transitionDuration, function(element) {
                        shift("left");
                        transitionCompleted = true;
                        carousel.trigger("ui.carousel.change.after", [ current ]);
                    });
                }
            }
        }
        return this;
    };
    fn.select = function(index) {
        carousel.trigger("ui.carousel.change.before", [ current ]);
        if (!isNaN(index) && (index >= 0 && index <= carouselItemCount)) {
            current = parseInt(index) + 1;
            if (transitionOrientation === "vertical" && transitionType === "slide") {
                carouselHolder.css("top", "-" + carouselItemHeight * current + "px");
            } else {
                carouselHolder.css("left", "-" + carouselItemWidth * current + "px");
            }
            transitionCompleted = true;
        }
        carousel.trigger("ui.carousel.change.after", [ current ]);
        return this;
    };
    fn.play = function() {
        clearInterval(this.run);
        if (playDirection === "next") {
            this.run = setInterval(function() {
                carousel.next();
            }, interval);
        } else if (playDirection === "prev") {
            this.run = setInterval(function() {
                carousel.prev();
            }, interval);
        }
        return this;
    };
    fn.stop = function() {
        clearInterval(this.run);
        return this;
    };
})(window);

(function(win) {
    /* PRIVATE */
    var fn = webui.fn, resetScrollspy = function(container, settings) {
        var scrollTargets = webui(document).find("." + settings.scrollTargetClass);
        for (var i = 0; i < scrollTargets.length; i++) {
            var el = webui(scrollTargets[i]);
            var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
            if (el[0].offsetTop <= scrollPos + settings.scrollTargetOffset) {
                var id = el.attr("id");
                var activeItem = container.find("[data-scrollspy='#" + id + "']");
                if (!activeItem) {
                    return;
                }
                container.find(settings.activatorSelector).removeClass(settings.activatorActiveClass);
                activeItem.addClass(settings.activatorActiveClass);
            }
        }
    };
    /* PUBLIC */
    Object.defineProperty(webui.prototype, "scrollspy", {
        value: function(options) {
            var settings = ui.extend({
                activatorSelector: "li > a",
                activatorActiveClass: "active",
                scrollTargetClass: "scrollspy",
                scrollTargetOffset: 0,
                activatorCallback: null
            }, options);
            var container = this;
            if (typeof win !== void 0 && typeof win.addEventListener !== void 0) {
                win.addEventListener("scroll", function() {
                    resetScrollspy(container, settings);
                });
            }
            if (settings.activatorCallback) {
                var menuItems = container.find(settings.activatorSelector);
                for (var i = 0; i < menuItems.length; i++) {
                    menuItems[i].addEventListener("click", function() {
                        settings.activatorCallback();
                    });
                }
            }
            return this;
        }
    });
})(window);

(function(win) {
    /* PRIVATE */
    var fn = webui.fn;
    /* PUBLIC */
    fn.snapPosition = function(targetElement, position, cssUnit, origin) {
        var args = arguments, target = webui(targetElement), els = this, el, wrapper;
        if (args.length > 0 && target.length) {
            if (!target.parent().hasClass("snap-target-context")) {
                wrapper = webui("<div></div>").addClass("snap-target-context").css("position", "absolute");
                wrapper.appendTo(target.parent());
                target.appendTo(wrapper);
            } else {
                wrapper = target;
            }
            for (var i = 0; i < els.length; i++) {
                el = webui(els[i]);
                el.css("position", "absolute").appendTo(wrapper);
                var pos = position && position.length === 2 ? position : [ 0, 0 ];
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
                        x = 0;
                        y = 0;
                    } else if (origin === "top-center") {
                        x = targetWidth / 2;
                        y = 0;
                    } else if (origin === "top-right") {
                        x = targetWidth;
                        y = 0;
                    } else if (origin === "middle-left") {
                        x = 0;
                        y = targetHeight / 2;
                    } else if (origin === "middle-center") {
                        x = targetWidth / 2;
                        y = targetHeight / 2;
                    } else if (origin === "middle-right") {
                        x = targetWidth;
                        y = targetHeight / 2;
                    } else if (origin === "bottom-left") {
                        x = 0;
                        y = targetHeight;
                    } else if (origin === "bottom-center") {
                        x = targetWidth / 2;
                        y = targetHeight;
                    } else if (origin === "bottom-right") {
                        x = targetWidth;
                        y = targetHeight;
                    }
                    originX = unit === "rem" ? ui.pxToRem(x) : x;
                    originY = unit === "rem" ? ui.pxToRem(y) : y;
                } else {
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
})(window);

(function(win) {
    /* PRIVATE */
    var fn = webui.fn, getValueFromCssSize = function(size) {
        var sizeValue = size && isNaN(size) ? parseFloat(size.replace(/[^0-9]+/gi, "")) : !isNaN(size) ? size : 0;
        return parseFloat(sizeValue);
    }, getUnitFromCssSize = function(size) {
        var sizeUnit = size && isNaN(size) ? size.replace(/[^a-z%]+/gi, "") : "px";
        sizeUnit = sizeUnit.length > 0 ? sizeUnit : "px";
        return sizeUnit !== "auto" ? sizeUnit : "auto";
    };
    /* PUBLIC */
    fn.slideVertical = function(direction, distance, duration, callback) {
        var args = arguments, els = this, uiElement, uiDistance, uiMovement, uiPosition, uiFinalPosition, pos, frameAdjustment = 50 / (duration / 1e3), uiDirection = direction ? direction : "down", distanceUnit = args.length > 1 ? getUnitFromCssSize(distance) : "px", distanceValue = args.length > 1 ? getValueFromCssSize(distance) : 0;
        uiDistance = distanceValue;
        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiElement.css("display", "block");
            uiMovement = uiDistance / duration * frameAdjustment;
            uiPosition = parseFloat(uiElement.css("top"));
            uiFinalPosition = uiDirection === "down" ? uiPosition + uiDistance : uiPosition - uiDistance;
            var nextFrame = function(element, movement, position, finalPosition, dir) {
                pos = dir === "down" ? parseFloat(position + movement) : parseFloat(position - movement);
                if (dir === "down" && pos > finalPosition || dir === "up" && pos < finalPosition || duration === 0) {
                    element.css("top", finalPosition + distanceUnit);
                    if (args.length === 4 && callback) {
                        callback(element);
                    }
                    return;
                } else {
                    element.css("top", pos + distanceUnit);
                    win.requestAnimationFrame(function() {
                        nextFrame(element, movement, pos, finalPosition, dir);
                    });
                }
            };
            nextFrame(uiElement, uiMovement, uiPosition, uiFinalPosition, uiDirection);
        }
        return els;
    };
    fn.slideHorizontal = function(direction, distance, duration, callback) {
        var args = arguments, els = this, uiElement, uiDistance, uiMovement, uiPosition, uiFinalPosition, pos, frameAdjustment = 50 / (duration / 1e3), uiDirection = direction ? direction : "right", distanceUnit = args.length > 1 ? getUnitFromCssSize(distance) : "px", distanceValue = args.length > 1 ? getValueFromCssSize(distance) : 0;
        uiDistance = distanceValue;
        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiElement.css("display", "block");
            uiMovement = uiDistance / duration * frameAdjustment;
            uiPosition = parseFloat(uiElement.css("left"));
            uiFinalPosition = uiDirection === "right" ? uiPosition + uiDistance : uiPosition - uiDistance;
            var nextFrame = function(element, movement, position, finalPosition, dir) {
                pos = dir === "right" ? parseFloat(position + movement) : parseFloat(position - movement);
                if (dir === "right" && pos > finalPosition || dir === "left" && pos < finalPosition || duration === 0) {
                    element.css("left", finalPosition + distanceUnit);
                    if (args.length === 4 && callback) {
                        callback(element);
                    }
                    return;
                } else {
                    element.css("left", pos + distanceUnit);
                    win.requestAnimationFrame(function() {
                        nextFrame(element, movement, pos, finalPosition, dir);
                    });
                }
            };
            nextFrame(uiElement, uiMovement, uiPosition, uiFinalPosition, uiDirection);
        }
        return els;
    };
    fn.expandVertical = function(duration, targetHeight, callback) {
        var args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiOriginalHeight, uiTargetHeight, uiMovement, uiCurrentHeight, frameAdjustment = 50 / (duration / 1e3), targetHeightUnit = args.length > 1 ? getUnitFromCssSize(targetHeight) : "px", targetHeightValue = args.length > 1 ? getValueFromCssSize(targetHeight) : targetHeightUnit !== "auto" ? 0 : "", isAuto = targetHeightUnit === "auto";
        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiOverflow = uiElement.css("overflow");
            uiElement.css("display", "block").css("overflow", "hidden").css("min-height", "0");
            uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-top-width")) + parseFloat(uiElement.css("border-bottom-width")) : 0;
            uiOriginalHeight = parseFloat(uiElement.css("height")) > uiBorderSize ? parseFloat(uiElement.css("height")) + uiBorderSize : els[i].scrollHeight + uiBorderSize;
            if (isAuto) {
                uiTargetHeight = els[i].scrollHeight + uiBorderSize;
                targetHeightUnit = "px";
            } else {
                if (targetHeightValue) {
                    if (targetHeightUnit === "%") {
                        uiTargetHeight = parseFloat(uiElement.parent().css("height")) / 100 * targetHeightValue;
                        targetHeightUnit = "px";
                    } else {
                        uiTargetHeight = targetHeightValue;
                    }
                } else {
                    uiTargetHeight = targetHeightUnit === "rem" ? ui.pxToRem(uiOriginalHeight) : uiOriginalHeight;
                }
            }
            uiElement.css("height", "0");
            uiCurrentHeight = 0;
            uiMovement = uiTargetHeight / duration * frameAdjustment;
            var nextFrame = function(el, targetHeight, heightUnit, currentHeight, movement, overflow) {
                var height = currentHeight + movement;
                if (height >= targetHeight || duration === 0) {
                    if (isAuto) {
                        el.css("height", "auto").css("overflow", overflow);
                    } else {
                        el.css("height", targetHeight + heightUnit).css("overflow", overflow);
                    }
                    if (args.length === 3 && callback) {
                        callback(el);
                    }
                    return;
                } else {
                    el.css("height", height + heightUnit);
                    win.requestAnimationFrame(function() {
                        nextFrame(el, targetHeight, heightUnit, height, movement, overflow);
                    });
                }
            };
            nextFrame(uiElement, uiTargetHeight, targetHeightUnit, uiCurrentHeight, uiMovement, uiOverflow);
        }
        return els;
    };
    fn.expandHorizontal = function(duration, targetWidth, callback) {
        var args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiOriginalWidth, uiTargetWidth, uiMovement, uiCurrentWidth, frameAdjustment = 50 / (duration / 1e3), targetWidthUnit = args.length > 1 ? getUnitFromCssSize(targetWidth) : "px", targetWidthValue = args.length > 1 ? getValueFromCssSize(targetWidth) : targetWidthUnit !== "auto" ? 0 : "", isAuto = targetWidthUnit === "auto";
        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiOverflow = uiElement.css("overflow");
            uiElement.css("display", "block").css("overflow", "hidden").css("min-width", "0");
            uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-left-width")) + parseFloat(uiElement.css("border-right-width")) : 0;
            uiOriginalWidth = parseFloat(uiElement.css("width")) > uiBorderSize ? parseFloat(uiElement.css("width")) + uiBorderSize : els[i].scrollWidth + uiBorderSize;
            if (isAuto) {
                uiTargetWidth = els[i].scrollWidth + uiBorderSize;
                targetWidthUnit = "px";
            } else {
                if (targetWidthValue) {
                    if (targetWidthUnit === "%") {
                        uiTargetWidth = parseFloat(uiElement.parent().css("width")) / 100 * targetWidthValue;
                        targetWidthUnit = "px";
                    } else {
                        uiTargetWidth = targetWidthValue;
                    }
                } else {
                    uiTargetWidth = targetWidthUnit === "rem" ? ui.pxToRem(uiOriginalWidth) : uiOriginalWidth;
                }
            }
            uiElement.css("width", "0");
            uiCurrentWidth = 0;
            uiMovement = uiTargetWidth / duration * frameAdjustment;
            var nextFrame = function(el, targetWidth, widthUnit, currentWidth, movement, overflow) {
                var width = currentWidth + movement;
                if (width >= targetWidth || duration === 0) {
                    if (isAuto) {
                        el.css("width", "auto").css("overflow", overflow);
                    } else {
                        el.css("width", targetWidth + widthUnit).css("overflow", overflow);
                    }
                    if (args.length === 3 && callback) {
                        callback(el);
                    }
                    return;
                } else {
                    el.css("width", width + widthUnit);
                    win.requestAnimationFrame(function() {
                        nextFrame(el, targetWidth, widthUnit, width, movement, overflow);
                    });
                }
            };
            nextFrame(uiElement, uiTargetWidth, targetWidthUnit, uiCurrentWidth, uiMovement, uiOverflow);
        }
        return els;
    };
    fn.collapseVertical = function(duration, targetHeight, callback) {
        var args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiCurrentHeight, uiTargetHeight, uiMovement, frameAdjustment = 50 / (duration / 1e3), targetHeightUnit = args.length > 1 ? getUnitFromCssSize(targetHeight) : "px", targetHeightValue = args.length > 1 ? getValueFromCssSize(targetHeight) : targetHeightUnit !== "auto" ? 0 : "";
        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiOverflow = uiElement.css("overflow");
            uiElement.css("overflow", "hidden").css("min-height", "0");
            uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-top-width")) + parseFloat(uiElement.css("border-bottom-width")) : 0;
            uiCurrentHeight = parseFloat(uiElement.css("height")) > uiBorderSize ? parseFloat(uiElement.css("height")) + uiBorderSize : els[i].scrollHeight + uiBorderSize;
            if (targetHeightUnit === "auto") {
                uiTargetHeight = els[i].scrollHeight + uiBorderSize;
                targetHeightUnit = "px";
            } else {
                if (targetHeightUnit === "%") {
                    uiTargetHeight = parseFloat(uiElement.parent().css("height")) / 100 * targetHeightValue;
                    targetHeightUnit = "px";
                } else {
                    uiTargetHeight = targetHeightValue;
                }
            }
            if (targetHeightUnit === "rem") {
                uiCurrentHeight = ui.pxToRem(uiCurrentHeight);
            }
            uiMovement = uiCurrentHeight / duration * frameAdjustment;
            var nextFrame = function(el, targetHeight, heightUnit, currentHeight, movement, overflow) {
                var height = currentHeight - movement;
                if (height <= targetHeight || duration === 0) {
                    if (targetHeight) {
                        el.css("height", targetHeight + heightUnit).css("overflow", overflow);
                    } else {
                        el.css("height", targetHeight + heightUnit).css("overflow", overflow).css("display", "none");
                    }
                    if (args.length === 3 && callback) {
                        callback(el);
                    }
                    return;
                } else if (height > targetHeight) {
                    el.css("height", height + heightUnit);
                    win.requestAnimationFrame(function() {
                        nextFrame(el, targetHeight, heightUnit, height, movement, overflow);
                    });
                }
            };
            nextFrame(uiElement, uiTargetHeight, targetHeightUnit, uiCurrentHeight, uiMovement, uiOverflow);
        }
        return els;
    };
    fn.collapseHorizontal = function(duration, targetWidth, callback) {
        var args = arguments, els = this, uiElement, uiOverflow, uiBorderSize, uiCurrentWidth, uiTargetWidth, uiMovement, frameAdjustment = 50 / (duration / 1e3), targetWidthUnit = args.length > 1 ? getUnitFromCssSize(targetWidth) : "px", targetWidthValue = args.length > 1 ? getValueFromCssSize(targetWidth) : targetWidthUnit !== "auto" ? 0 : "";
        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiOverflow = uiElement.css("overflow");
            uiElement.css("overflow", "hidden").css("min-width", "0");
            uiBorderSize = uiElement.css("box-sizing") === "content-box" ? parseFloat(uiElement.css("border-left-width")) + parseFloat(uiElement.css("border-right-width")) : 0;
            uiCurrentWidth = parseFloat(uiElement.css("width")) > uiBorderSize ? parseFloat(uiElement.css("width")) + uiBorderSize : els[i].scrollWidth + uiBorderSize;
            if (targetWidthUnit === "auto") {
                uiTargetWidth = els[i].scrollWidth + uiBorderSize;
                targetWidthUnit = "px";
            } else {
                if (targetWidthUnit === "%") {
                    uiTargetWidth = parseFloat(uiElement.parent().css("width")) / 100 * targetWidthValue;
                    targetWidthUnit = "px";
                } else {
                    uiTargetWidth = targetWidthValue;
                }
            }
            if (targetWidthUnit === "rem") {
                uiCurrentWidth = ui.pxToRem(uiCurrentWidth);
            }
            uiMovement = uiCurrentWidth / duration * frameAdjustment;
            var nextFrame = function(el, targetWidth, widthUnit, currentWidth, movement, overflow) {
                var width = currentWidth - movement;
                if (width <= targetWidth || duration === 0) {
                    if (targetWidth) {
                        el.css("width", targetWidth + widthUnit).css("overflow", overflow);
                    } else {
                        el.css("width", targetWidth + widthUnit).css("overflow", overflow).css("display", "none");
                    }
                    if (args.length === 3 && callback) {
                        callback(el);
                    }
                    return;
                } else if (width > targetWidth) {
                    el.css("width", width + widthUnit);
                    win.requestAnimationFrame(function() {
                        nextFrame(el, targetWidth, widthUnit, width, movement, overflow);
                    });
                }
            };
            nextFrame(uiElement, uiTargetWidth, targetWidthUnit, uiCurrentWidth, uiMovement, uiOverflow);
        }
        return els;
    };
    fn.fadeIn = function(duration, initialOpacity, callback) {
        var args = arguments, els = this, uiElement, uiChange, uiCurrentOpacity, frameAdjustment = 50 / (duration / 1e3);
        uiCurrentOpacity = args.length > 1 && !isNaN(parseFloat(initialOpacity)) ? initialOpacity : 0;
        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            uiElement.css("opacity", "0").css("display", "block");
            uiChange = 1 / duration * frameAdjustment;
            var nextFrame = function(element, currentOpacity, change) {
                var opacity = currentOpacity + change;
                if (opacity >= .99 || duration < frameAdjustment) {
                    element.css("opacity", "1").css("display", "block");
                    if (args.length === 3 && callback) {
                        callback(element);
                    }
                    return;
                } else if (opacity < .99) {
                    element.css("opacity", opacity).css("display", "block");
                    win.requestAnimationFrame(function() {
                        nextFrame(element, opacity, change);
                    });
                }
            };
            nextFrame(uiElement, uiCurrentOpacity, uiChange);
        }
        return els;
    };
    fn.fadeOut = function(duration, finalOpacity, callback) {
        var args = arguments, els = this, uiElement, uiChange, uiCurrentOpacity, frameAdjustment = 50 / (duration / 1e3);
        uiCurrentOpacity = finalOpacity && !isNaN(parseFloat(finalOpacity)) ? finalOpacity : 0;
        for (var i = 0; i < els.length; i++) {
            uiElement = webui(els[i]);
            if (uiElement.css("display") === "none" || uiElement.css("visibility") === "hidden") {
                continue;
            }
            uiElement.css("opacity", "1");
            uiChange = 1 / duration * frameAdjustment;
            var nextFrame = function(element, currentOpacity, change) {
                var opacity = currentOpacity - change;
                if (opacity <= uiCurrentOpacity + .01 || duration < frameAdjustment) {
                    uiCurrentOpacity > .01 ? element.css("opacity", uiCurrentOpacity + "") : element.css("display", "none");
                    if (args.length === 3 && callback) {
                        callback(element);
                    }
                    return;
                } else if (opacity > .01) {
                    element.css("opacity", opacity);
                    win.requestAnimationFrame(function() {
                        nextFrame(element, opacity, change);
                    });
                }
            };
            nextFrame(uiElement, 1, uiChange);
        }
        return els;
    };
})(window);

(function(win) {
    /* PRIVATE */
    var fn = webui.fn, selectorRegExpMatches = function(selector, regExp) {
        var el = webui(selector);
        return el.is("input[type='text']") && regExp.test(el.val()) || el.is("textarea") && regExp.test(el.text()) || el.is("select") && regExp.test(el.find("option:checked").text()) || el.is("datalist") && regExp.test(el.find("option:checked").text()) || el.is("input[type='checkbox']") && regExp.test(el.is(":checked")) || el.is("input[type='radio']") && regExp.test(el.is(":checked"));
    }, containsSpaceOrDot = function(selector) {
        var el = webui(selector);
        return /^\s$/.test(el.val()) || el.val().indexOf(".") > -1;
    }, containsSpace = function(selector) {
        return /^\s$/.test(webui(selector).val());
    }, toDateObject = function(year, month, day, hour, minute, second) {
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
    fn.isChecked = function(dependsOnSelector, dependsOnRegExp) {
        var args = arguments, el, ok = true;
        if (args.length === 0) {
            for (var i = 0; i < this.length; i++) {
                el = webui(this[i]);
                if (!el.is(":checked")) {
                    ok = false;
                }
            }
            return ok;
        } else if (args.length === 2) {
            for (var i = 0; i < this.length; i++) {
                el = webui(this[i]);
                if (selectorRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
                    if (!el.is(":checked")) {
                        ok = false;
                    }
                } else {
                    ok = false;
                }
            }
            return ok;
        }
        return false;
    };
    fn.hasConformingString = function(regExp, allowEmpty, dependsOnSelector, dependsOnRegExp) {
        var args = arguments, el, ok = true;
        if (args.length === 2) {
            for (var i = 0; i < this.length; i++) {
                el = webui(this[i]);
                if (!allowEmpty && el.val().length < 1 || el.val().length > 0 && !regExp.test(el.val())) {
                    ok = false;
                }
            }
            return ok;
        } else if (args.length === 4) {
            for (var i = 0; i < this.length; i++) {
                el = webui(this[i]);
                if (!allowEmpty && el.val().length < 1) {
                    ok = false;
                } else {
                    if (selectorRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
                        if (el.val().length > 0 && !regExp.test(el.val())) {
                            ok = false;
                        }
                    } else {
                        ok = false;
                    }
                }
            }
            return ok;
        }
        return false;
    };
    fn.hasNumericInRange = function(lowerLimit, upperLimit, allowEmpty, dependsOnSelector, dependsOnRegExp) {
        var args = arguments, el, ok = true;
        if (args.length === 3) {
            for (var i = 0; i < this.length; i++) {
                el = webui(this[i]);
                if (!allowEmpty && el.val().length < 1) {
                    ok = false;
                } else if (el.val().length > 0) {
                    if (isNaN(el.val()) || isNaN(lowerLimit) || isNaN(upperLimit) || containsSpace(el) || el.val() < lowerLimit || el.val() > upperLimit) {
                        ok = false;
                    }
                }
            }
            return ok;
        } else if (args.length === 5) {
            for (var i = 0; i < this.length; i++) {
                el = webui(this[i]);
                if (!allowEmpty && el.val().length < 1) {
                    ok = false;
                } else {
                    if (selectorRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
                        if (el.val().length > 0 && (isNaN(el.val()) || isNaN(lowerLimit) || isNaN(upperLimit) || containsSpace(el) || el.val() < lowerLimit || el.val() > upperLimit)) {
                            ok = false;
                        }
                    } else {
                        ok = false;
                    }
                }
            }
            return ok;
        }
        return false;
    };
    fn.hasIntegerInRange = function(lowerLimit, upperLimit, allowEmpty, dependsOnSelector, dependsOnRegExp) {
        var args = arguments, el, ok = true;
        if (args.length === 3) {
            for (var i = 0; i < this.length; i++) {
                el = webui(this[i]);
                if (!allowEmpty && el.val().length < 1) {
                    ok = false;
                } else if (el.val().length > 0) {
                    if (isNaN(el.val()) || isNaN(lowerLimit) || isNaN(upperLimit) || containsSpaceOrDot(el) || el.val() < lowerLimit || el.val() > upperLimit) {
                        ok = false;
                    }
                }
            }
            return ok;
        } else if (args.length === 5) {
            for (var i = 0; i < this.length; i++) {
                el = webui(this[i]);
                if (!allowEmpty && el.val().length < 1) {
                    ok = false;
                } else {
                    if (selectorRegExpMatches(dependsOnSelector, dependsOnRegExp)) {
                        if (el.val().length > 0 && (isNaN(el.val()) || isNaN(lowerLimit) || isNaN(upperLimit) || containsSpaceOrDot(el) || el.val() < lowerLimit || el.val() > upperLimit)) {
                            ok = false;
                        }
                    } else {
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
                if (!allowEmpty && strDate.length < 1 || strDate.length > 0 && ui.convertToDate(strDate, format) === null) {
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
                } else if (el.hasValidDateTime(format, allowEmpty)) {
                    if (ui.getTimeOffsetFromNow(strDate, format) >= 0) {
                        ok = false;
                    }
                } else {
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
                } else if (el.hasValidDateTime(format, allowEmpty)) {
                    if (ui.getTimeOffsetFromNow(strDate, format) !== 0) {
                        ok = false;
                    }
                } else {
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
                } else if (el.hasValidDateTime(format, allowEmpty)) {
                    if (ui.getTimeOffsetFromNow(strDate, format) <= 0) {
                        ok = false;
                    }
                } else {
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
                } else if (el.hasValidDateTime(format, allowEmpty)) {
                    var date = ui.convertToDate(strDate, format);
                    var minDate = ui.convertToDate(minDateTimeString, format);
                    var maxDate = ui.convertToDate(maxDateTimeString, format);
                    if (minDate != null && maxDate != null) {
                        if (date.valueOf() < minDate.valueOf() || date.valueOf() > maxDate.valueOf()) {
                            ok = false;
                        }
                    } else {
                        ok = false;
                    }
                } else {
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
        } catch (ex) {
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
        } catch (ex) {
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