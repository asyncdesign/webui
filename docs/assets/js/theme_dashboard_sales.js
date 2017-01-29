

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
