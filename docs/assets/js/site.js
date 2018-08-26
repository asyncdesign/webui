

	var codeHighlighter = {
		
		highlight : function (selector) {
			var tags = ["html", "head", "body", "div", "span", "link", "img", "input", "button", "select", "option", "textarea", "blockquote", "ul", "li", "a", "i", "p", "b", 
									"script", "webui", "ui", "function"];
			var attributes = ["class", "type", "id", "href", "rel", "src"];
			
			var codeBlock;

			var codeBlocks = webui(selector);
			
			for (i = 0; i < codeBlocks.length; i++) {
			
				codeBlock = new Mark(codeBlocks[i]);
				
				for (var j = 0; j < tags.length; j++) {
					codeBlock.mark(tags[j], { className: "html-tag", "accuracy": { "value": "exactly", "limiters": ["<", ">", "</", "/>", "(", "."]}, caseSensitive: true });
				}
				
				for (var j = 0; j < attributes.length; j++) {
					codeBlock.mark(attributes[j], { className: "html-attribute", "accuracy": { "value": "exactly", "limiters": ["="]} });
				}
				
				codeBlock.markRegExp(/"[^"]+"/, { className: "string-literal" });

			}
		}	
	};
