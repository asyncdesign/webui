

$(function () {

	Chart.defaults.global.defaultFontColor = "#fff";

	var ctxLeadStatus = document.getElementById("leadStatusCanvas").getContext("2d");
	var leadStatusChart = new Chart(ctxLeadStatus, {
		type: "horizontalBar",
		data: {
			labels: ["New", "Tier 1", "Tier 2", "Tier 3", "Closed", "Rejected"],
			datasets: [{
				label: "",
				data: [4312, 6710, 3894, 4158, 702, 23],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)"
				],
				borderColor: [
					"rgba(255,99,132,1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)"
				],
				borderWidth: 1
			}]
		},
		options: {
			elements: {
				rectangle: {
					borderWidth: 1,
				}
			},
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: false,
				position: "right",
			},
			title: {
				display: false,
				text: ""
			}
		}
	});


	var ctxEmailVolume = document.getElementById("emailVolumeCanvas").getContext("2d");
	var emailVolumeChart = new Chart(ctxEmailVolume, {
		type: "line",
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			datasets: [
				{
					label: "",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: [65, 59, 80, 81, 56, 87, 76],
					spanGaps: false,
				}
			]
		},
		options: {
			elements: {
				rectangle: {
					borderWidth: 1,
				}
			},
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: false,
				position: "right",
			},
			title: {
				display: false,
				text: ""
			}
		}
	});

	var ctxStatusCount = document.getElementById("statusCountCanvas").getContext("2d");
	var statusCountChart = new Chart(ctxStatusCount, {
		type: "doughnut",
		data: {
			labels: [
				"Enterprise",
				"Company",
				"White-label",
				"Corporate",
				"Professional"
			],
			datasets: [
				{
					data: [4312, 6710, 3894, 4158, 702, 23],
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)"
					],
					hoverBackgroundColor: [
						"rgba(255, 99, 132, 0.5)",
						"rgba(54, 162, 235, 0.5)",
						"rgba(255, 206, 86, 0.5)",
						"rgba(75, 192, 192, 0.5)",
						"rgba(153, 102, 255, 0.5)"
					]
				}]
		},
		options: {
			elements: {
				rectangle: {
					borderWidth: 1,
				}
			},
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: false,
				position: "right",
			},
			title: {
				display: false,
				text: ""
			}
		}
	});

	var ctxLeadCustomer = document.getElementById("leadsCustomerCanvas").getContext("2d");
	var leadCustomerChart = new Chart(ctxLeadCustomer, {
		type: "bar",
		data: {
			labels: ["0.0", "2.0", "4.0", "6.0", "8.0", "10"],
			datasets: [{
				label: "",
				data: [4312, 5710, 3894, 4158, 4578, 3989],
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(255,99,132,1)",
				borderWidth: 1
			},
			{
				label: "",
				data: [4112, 5310, 2894, 4000, 4178, 3400],
				backgroundColor: "rgba(255, 206, 86, 0.2)",
				borderColor: "rgba(255,99,132,1)",
				borderWidth: 1
			},
			{
				label: "",
				data: [3871, 4928, 2394, 3158, 2578, 2989],
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(255,99,132,1)",
				borderWidth: 1
			}]
		},
		options: {
			elements: {
				rectangle: {
					borderWidth: 1,
				}
			},
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: false,
				position: "right",
			},
			title: {
				display: false,
				text: ""
			}
		}
	});


});
