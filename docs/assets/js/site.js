

	var codeHighlighter = {
		
		highlight : function (selector) {
			var tags = ["html", "head", "body", "div", "span", "label", "link", "img", "input", "button", "select", "option", "textarea", "blockquote", "ul", "li", "a", "i", "p", "b"];
			var attributes = ["class", "type", "id", "href", "rel", "src"];
			
			var codeBlock;

			var codeBlocks = webui(selector);
			
			for (i = 0; i < codeBlocks.length; i++) {
			
				codeBlock = new Mark(codeBlocks[i]);
				
				codeBlock.mark(tags, { className: "html-tag", "accuracy": { "value": "exactly", "limiters": ["<", ">", "</", "/>", "(", "."]}, caseSensitive: true });
				codeBlock.mark(attributes, { className: "html-attribute", "accuracy": { "value": "exactly", "limiters": ["="]} });
				
				codeBlock.markRegExp(/"[^"]+"/, { className: "string-literal" });
			}
		}	
	};

	var scriptHighlighter = {
		
		highlight : function (selector) {
			var tags = ["script", "webui", "ui", "var", "function", "class"];
			
			var scriptBlock;

			var scriptBlocks = webui(selector);
			
			for (i = 0; i < scriptBlocks.length; i++) {
			
				scriptBlock = new Mark(scriptBlocks[i]);
				
				scriptBlock.mark(tags, { className: "html-tag", "accuracy": { "value": "exactly", "limiters": ["(", "."]}, caseSensitive: true });
				
				scriptBlock.markRegExp(/"[^"]+"/, { className: "string-literal" });
			}
		}	
	};
