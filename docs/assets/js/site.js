

	var codeHighlighter = {
		
		highlight : function (selectors) {
			var tags = ["html", "head", "body", "div", "span", "link", "img", "input", "button", "select", "option", "textarea", "a", "i", "p", "script"];
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

	$(function () {

		Highcharts.chart('leadStatusPanel', {
			chart: {
				type: 'bar'	
			},
			title: {
				text: null
			},
			subtitle: {
				text: null
			},
			
			xAxis: {
				categories: ['New', 'Tier 1', 'Tier 2', 'Tier 3', 'Closed', 'Disqualified'],
				title: {
					text: null
				},
				labels: {
					overflow: 'justify'
				},
				tickWidth: 0	
			},

			yAxis: {
				min: 0,
				title: {
					text: null
					//align: 'high'
				},
				labels: {
					overflow: 'justify'
				},
				visible: false
			},
			//tooltip: {
			//	valueSuffix: ' millions'
			//},
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true
					}
				},
				series: {
                	colorByPoint: true
            	}
				
			},
			/*
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -40,
				y: 80,
				floating: true,
				borderWidth: 1,
				backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#727272'),
				shadow: true
			},
			*/
			credits: {
				enabled: false
			},
			series: [{
				showInLegend: false,
				data: [7703, 5140, 3946, 2720, 513, 17]

			}]
		});
	});
