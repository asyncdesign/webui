

	var codeHighlighter = {
		
		highlight : function (selectors) {
			var tags = ["html", "head", "body", "div", "span", "link", "img", "input", "button", "a", "i", "p", "script"];
			var attributes = ["class", "type", "id"];
			
			var codeBlock;
			
			for (i = 0; i < selectors.length; i++) {
			
				codeBlock = new Mark($("#" + selectors[i]).get());
				
				for (var j = 0; j < tags.length; j++) {
					codeBlock.mark(tags[j], { className: "html-tag", "accuracy": { "value": "exactly", "limiters": ["<", ">", "/"]} });
				}
				
				for (var j = 0; j < attributes.length; j++) {
					codeBlock.mark(attributes[j], { className: "html-attribute", "accuracy": { "value": "exactly", "limiters": ["="]} });
				}
				
				codeBlock.markRegExp(/"[^"]+"/, { className: "string-literal" });

			}
		}
		
	};
