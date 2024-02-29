
var codeHighlighter = {

  highlight : function (selector) {
    var tags = ["html", 
                "head", 
                "body", 
                "div", 
                "span", 
                "header", 
                "footer", 
                "nav", 
                "label", 
                "link", 
                "img",
                "svg",
                "input", 
                "button", 
                "select", 
                "option", 
                "textarea", 
                "blockquote", 
                "table", 
                "thead", 
                "tbody", 
                "tfoot", 
                "tr", 
                "th", 
                "td", 
                "ul", 
                "li",
                "h1",
                "h2",
                "h3",
                "h4",
                "a", 
                "i", 
                "p", 
                "b"];
    var attributes = ["class", "type", "id", "href", "rel", "src"];
    
    var range;

    var codeBlocks = webui(selector).elements();
    
    
    range = new Mark(codeBlocks);
    
    range.markRegExp(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, { className: "string-literal" });

    range.mark(tags, { className: "html-tag", "accuracy": { "value": "exactly", "limiters": ["<", ">", "</", "/>", "(", "."]}, caseSensitive: true });
    range.mark(attributes, { className: "html-attribute", "accuracy": { "value": "exactly", "limiters": ["="]} });
    
  }	
};

var scriptHighlighter = {
  
  highlight : function (selector) {
    var keywords = ["var",
                    "let",
                    "const",
                    "class",
                    "new",
                    "if",
                    "else",
                    "for",
                    "function",
                    "return",
                    "module",
                    "modules",
                    "plugins",
                    "bundles",
                    "entry",
                    "import",
                    "export"];
    var functions = ["webui", "ui", "ready", "click", "update", "at", "concat", "every", "filter", "forEach", "includes", "indexOf", "join", "map", "pop", 
                      "push", "reduce", "reduceRight", "requires", "reverse", "shift", "slice", "some", "sort", "splice", "toReversed", "toSorted", 
                      "toSpliced", "unshift"];
    
    var range;

    var scriptBlocks = webui(selector).elements();
    
    
    range = new Mark(scriptBlocks);
    
    range.markRegExp(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, { className: "string-literal" });
    range.markRegExp(/[\{\}\[\]\(\)]/, { className: "js-closure" });				

    range.mark(keywords, { className: "js-keyword", "accuracy": { "value": "exactly", "limiters": ["(", ".", ":"]}, caseSensitive: true });
    range.mark(functions, { className: "js-function", "accuracy": { "value": "exactly", "limiters": ["(", ".", ":"]}, caseSensitive: true });

  }	
};


var searchHighlighter = {
		
  highlight : function (selector, searchText) {
   
    var range;

    var searchBlocks = webui(selector).elements();
    
    range = new Mark(searchBlocks);

    range.mark(searchText, { className: "search-word", "accuracy": { "value": "partially", separateWordSearch: false, "limiters": ["(", ")", ".", ",", ":"]}, caseSensitive: false });    
    range.mark("deprecated", { className: "warning-highlight", "accuracy": { "value": "exactly", separateWordSearch: true, "limiters": ["(", ")", ".", ",", ":"]}, caseSensitive: false });    

  }	
};
