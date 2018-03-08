import { Line } from 'vue-chartjs'

export default {
	//extends: Line,
	template: '<div style="width:50%;height:50%" id="myChartDiv"></div>',
	mounted() {
		//axios.get('api/VPVueapi/PainChartDetails/painlist').then(function (response) {
		//	var values = response.data.data;
		//	for (var item in values) {
		//		self.data.datasets[0].data.push(values[item]['value']);
		//		self.data.labels.push(values[item]['id']);
		//	}
		//	self.isLoading = false;
		//}).catch(function (error) {
		//	console.log(error);
		//	self.isLoading = false;
		//	self.isError = true;
		//});

		var paindata = [
			{
				"PainScoringtype": 1,//0-10
				"PainType": 0,//standard
				"PainScore": 4,
				"PainAssessmentTime": "2018-03-02T09:29:15Z"
			},
			{
				"PainScoringtype": 1,//0-10
				"PainType": 0,//standard
				"PainScore": 8,
				"PainAssessmentTime": "2018-03-02T10:27:10Z"
			},

			{
				"PainScoringtype": 1,//0-10
				"PainType": 0,//standard
				"PainScore": 5,
				"PainAssessmentTime": "2018-03-02T09:29:15Z"
			},
			{
				"PainScoringtype": 0,//0-3
				"PainType": 0,//standard
				"PainScore": 2,
				"PainAssessmentTime": "2018-03-02T09:29:15Z"
			},
			{
				"PainScoringtype": 0,//0-3
				"PainType": 0,//standard
				"PainScore": 1,
				"PainAssessmentTime": "2017-03-02T10:27:10Z"
			},

			{
				"PainScoringtype": 0,//0-3
				"PainType": 0,//standard
				"PainScore": 3,
				"PainAssessmentTime": "2018-04-02T09:29:15Z"
			},
			{
				"PainScoringtype": 0,//0-3
				"PainType": 1,//abbey
				"PainScore": 2,
				"PainAssessmentTime": "2018-03-02T10:34:56Z"
			},
			{
				"PainScoringtype": 0,//0-3
				"PainType": 1,//abbey
				"PainScore": 2,
				"PainAssessmentTime": "2018-03-02T10:13:00Z"
			},

			{
				"PainScoringtype": 0,//0-3
				"PainType": 1,//abbey
				"PainScore": 0,
				"PainAssessmentTime": "2018-03-06T06:21:22Z"
			},
			{
				"PainScoringtype": 1,//0-10
				"PainType": 1,//abbey
				"PainScore": 6,
				"PainAssessmentTime": "2018-03-05T07:31:08Z"
			},
			{
				"PainScoringtype": 1,//0-10
				"PainType": 1,//abbey
				"PainScore": 9,
				"PainAssessmentTime": "2018-04-05T07:31:08Z"
			},
			{
				"PainScoringtype": 1,//0-10
				"PainType": 1,//abbey
				"PainScore": 3,
				"PainAssessmentTime": "2018-03-08T07:31:08Z"
			}

		]

		function organize(rows, groupBy) {
			var last = groupBy.length - 1;
			return rows.reduce((res, obj) => {
				groupBy.reduce((res, grp, i) =>
					res[obj[grp]] || (res[obj[grp]] = i == last ? [] : {}), res).push(obj);
				return res;
			}, {});
		}
		function getChildren(source) {
			var lineChartData = {
				labels: [],
				rows: [],
				label: ''
			};
			for (var index in source) {
				switch (source[index]['PainType']) {
					case 0:
						lineChartData.label = 'Standard';
						break;
					case 1:
						lineChartData.label = 'Abbey';
						break;
					case 2:
						lineChartData.label = 'Wongbaker';
						break;
					case 3:
						lineChartData.label = 'Flacc';
						break;
				}
				lineChartData.labels.push(new Date(source[index]['PainAssessmentTime']));
				lineChartData.rows.push(source[index]['PainScore']);
			}
			return lineChartData;
		}
		function loadCanvas(id) {
			var canvas = document.createElement('canvas');
			var div = document.getElementById('myChartDiv');
			canvas.id = id;
			div.appendChild(canvas)
		}
		var values = organize(paindata, ['PainType', 'PainScoringtype']);
		for (var item in values) {
			this.labels = [];
			this.rows = [];
			var childnode = values[item];
			for (var child in childnode) {
				var canvasid = "myChart" + item + child;
				loadCanvas(canvasid)
				var result = getChildren(childnode[child])
				this.labels = result.labels;
				this.rows = result.rows;
				this.label = result.label;
				this.printChart(canvasid);
			}
		}
	},
	data() {
		return {
			rows: [],
			labels: [],
			label: ''
		}
	},
	methods: {
		printChart(canvasid) {
			var context = document.getElementById(canvasid);
			var data = {
				labels: this.labels,
				datasets: [
					{
						label: this.label,
						backgroundColor: '#dd4b39',
						bordercolor: '#00c853',
						fill: true,
						pointBackgroundColor: 'white',
						borderWidth: 1,
						pointBorderColor: '#249EBF',
						scalesdisplay: true,
						pointRadius: 0,
						data: this.rows
					}
				]
			};
			var myLineChart = new Chart(context, {
				type: 'line',
				data: data,
				options: {
					title: {
						display: true,
						text: 'Pain Chart'
					},
					scales: {
						xAxes: [{
							type: 'time',
							time: {
								displayFormats: {
									'millisecond': 'MMM DD',
									'second': 'MMM DD',
									'minute': 'MMM DD',
									'hour': 'MMM DD YYYY ',
									'day': 'MMM DD YYYY hA',
									'week': 'MMM DD',
									'month': 'MMM DD YYYY',
									'quarter': 'MMM DD',
									'year': 'MMM DD YYY',
								}
							}
						}],
					},
				}
			}, { responsive: true, maintainAspectRatio: false });
		}
	}
}
