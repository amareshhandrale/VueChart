import painService from '../../service/Pain'
import { Line } from 'vue-chartjs'
import moment from 'moment'

const state = {
	patno: '',
	painData: {}
}

const getters = {
	getPainRowsCount: (state, getters) => {
		if (state.painData.length > 0)
			return 1
		else
			return 0
	},
}

const method = {
	organize(rows, groupBy) {
		var last = groupBy.length - 1;
		return rows.reduce((res, obj) => {
			groupBy.reduce((res, grp, i) =>
				res[obj[grp]] || (res[obj[grp]] = i == last ? [] : {}), res).push(obj);
			return res;
		}, {});
	},
	loadCanvas(id) {
		var canvas = document.createElement('canvas');
		var div = document.getElementById('painLineChart');
		canvas.id = id;
		canvas.height = 90;
		div.appendChild(canvas)
	},
	sortData(value) {
		value.sort((a, b) => {
			return new Date(a.PainAssessmentTime) - new Date(b.PainAssessmentTime);
		});
		return value;
	},
	printChart(canvasid) {
		var context = document.getElementById(canvasid);
		var data = {
			labels: this.labels,
			datasets: [
				{
					data: this.rows,
					label: this.label,
					backgroundColor: 'rgba(75,192,192,0.1)',
					borderColor: "rgb(0, 89, 179)",
					fill: true,
					pointBackgroundColor: '#0059b3',
					borderWidth: 2,
					pointBorderColor: '#0059b3',
					pointRadius: 4,
					linetension: '0',
					pointborderwidth: '10',
					pointbordercolor: '#0059b3',
					pointhoverborderwidth: '3',
					pointhoverbackgroundcolor: '#4a70ad',
					pointhoverbordercolor: '#4a70ad',
				}
				
			]
			
		};
		var myLineChart =new Chart(context, {
			type: 'line',
			data: data,
			options: {
				maintainAspectRatio: true,
				responsive:  true,  
				scales: {
					yAxes: [{
						ticks: {
							min: this.yAxesMin,
							max: this.yAxesMax,
							reverse: true,
						},
						gridLines: {
							drawBorder: true,
							displayOnChartArea: true,
						}
					}],
					xAxes: [{
						position: 'top',
						ticks: {
							max: this.xAxes,
							autoSkip: false,
						},
						bounds: 'ticks',
						gridLines: {
							drawBorder: true,
							displayOnChartArea: true,
						},
						type: 'time',
						time: {
							min: moment(this.xmin).subtract(1, 'day'),
							displayFormats: {
								'millisecond': 'DD-MMM-YY',
								'second': 'DD-MMM-YY',
								'minute': 'DD-MMM-YY',
								'hour': 'DD-MMM-YY',
								'day': 'DD-MMM-YY',
								'week': 'DD-MMM-YY',
								'month': 'DD-MMM-YY',
								'quarter': 'DD-MMM-YY',
								'year': 'DD-MMM-YY',
							}
						}
					}],
				},
				legend: {
					display: false,
				},

				tooltips: {
					enabled: true,
					callbacks: {
						title: function (tooltipItems, data) {
							return moment(tooltipItems[0].xLabel).format('DD MMM YY HH:MM');
						},
						label: function (tooltipItems, data) {
							console.log(data)
							var color = data.datasets[tooltipItems.datasetIndex].pointBackgroundColor[tooltipItems.index];
								return 'PainScore : ' + tooltipItems.yLabel 
						}
					}
				}

			}
		}, );
	},
	getChildren(source) {
		var lineChartData = {
			labels: [],
			rows: [],
			label: '',
			yAxesMax: 0,
			yAxesMin: 0,
			xmin: ''
		};
		lineChartData.xmin = new Date(source[0]['PainAssessmentTime']);
		for (var index in source) {
			switch (source[index]['PainType']) {
				case 0:
					lineChartData.label = 'Standard';
					break;
				case 1:
					lineChartData.label = 'Abbey';
					break;
				case 2:
					lineChartData.label = 'Flacc';
					break;
				case 3:
					lineChartData.label = 'Wongbaker';
					break;
			}
			switch (source[index]['PainScoringType']) {
				case 0:
					lineChartData.yAxesMax = 3;//StandardZeroToThree
					break;
				case 1:
					lineChartData.yAxesMax = 3;//BakerZeroToThree
					break;
				case 2:
					lineChartData.yAxesMax = 10;//FLACCZeroToten
					break;
				case 3:
					lineChartData.yAxesMax = 18;//AbbeyZeroToEighteen
					break;
				case 4:
					lineChartData.yAxesMax = 10;//StandardZeroToTen
					break;
				case 5:
					lineChartData.yAxesMax = 10;//WongBakerZeroToTen
					break;
			}
			lineChartData.labels.push(moment(source[index]['PainAssessmentTime']));
			if (source[index]['PainScore'] < 0) {
				lineChartData.rows.push(null);
			}
			else {
				lineChartData.rows.push(source[index]['PainScore']);
			}
		}
		return lineChartData;
	},
	createPainChart() {
		var paindata = [
			{
				"PainScoringType": 4,//0-10
				"PainType": 0,//standard
				"PainScore": 8,
				"PainAssessmentTime": "2018-03-02T05:27:10Z"
			},
			{
				"PainScoringType": 4,//0-10
				"PainType": 0,//standard
				"PainScore": -1,
				"PainAssessmentTime": "2018-03-02T09:29:15Z"
			},
			{
				"PainScoringType": 4,//0-10
				"PainType": 0,//standard
				"PainScore": 6,
				"PainAssessmentTime": "2018-03-02T12:27:10Z"
			},
			{
				"PainScoringType": 4,//0-10
				"PainType": 0,//standard
				"PainScore": 5,
				"PainAssessmentTime": "2018-03-02T10:27:10Z"
			},
			{
				"PainScoringType": 4,//0-10
				"PainType": 0,//standard
				"PainScore": 7,
				"PainAssessmentTime": "2018-03-02T11:27:10Z"
			},
			{
				"PainScoringType": 4,//0-10
				"PainType": 0,//standard
				"PainScore": 8,
				"PainAssessmentTime": "2018-03-02T08:27:10Z"
			},
			{
				"PainScoringType": 4,//0-10
				"PainType": 0,//standard
				"PainScore": 6,
				"PainAssessmentTime": "2018-03-02T07:27:10Z"
			},
			{
				"PainScoringType": 4,//0-10
				"PainType": 0,//standard
				"PainScore": 5,
				"PainAssessmentTime": "2018-03-03T09:29:15Z"
			},




			{
				"PainScoringType": 0,//0-3
				"PainType": 0,//standard
				"PainScore": 2,
				"PainAssessmentTime": "2018-03-02T09:29:15Z"
			},
			{
				"PainScoringType": 0,//0-3
				"PainType": 0,//standard
				"PainScore": 1,
				"PainAssessmentTime": "2017-03-02T10:27:10Z"
			},

			{
				"PainScoringType": 0,//0-3
				"PainType": 0,//standard
				"PainScore": 3,
				"PainAssessmentTime": "2018-04-02T09:29:15Z"
			},
			{
				"PainScoringType": 0,//0-3
				"PainType": 1,//abbey
				"PainScore": 1,
				"PainAssessmentTime": "2018-03-02T10:34:56Z"
			},
			{
				"PainScoringType": 0,//0-3
				"PainType": 1,//abbey
				"PainScore": 2,
				"PainAssessmentTime": "2018-03-02T10:13:00Z"
			},

			{
				"PainScoringType": 0,//0-3
				"PainType": 1,//abbey
				"PainScore": 0,
				"PainAssessmentTime": "2018-03-06T06:21:22Z"
			},
			{
				"PainScoringType": 3,//0-18
				"PainType": 1,//abbey
				"PainScore": 6,
				"PainAssessmentTime": "2018-03-05T07:31:08Z"
			},
			{
				"PainScoringType": 3,//0-18
				"PainType": 1,//abbey
				"PainScore": 9,
				"PainAssessmentTime": "2018-04-05T07:31:08Z"
			},
			{
				"PainScoringType": 3,//0-18
				"PainType": 1,//abbey
				"PainScore": 3,
				"PainAssessmentTime": "2018-03-08T07:31:08Z"
			}

		]
		state.painData = paindata;
		if (state.painData != null) {
			var values = method.organize(state.painData, ['PainType', 'PainScoringType']);
			for (var item in values) {
				var childnode = values[item];
				for (var child in childnode) {
					var canvasid = "linechart" + item + child;
					method.loadCanvas(canvasid)
					method.sortData(childnode[child])
					var result = method.getChildren(childnode[child])
					this.labels = result.labels;
					this.rows = result.rows;
					this.label = result.label;
					this.yAxesMin = result.yAxesMin;
					this.yAxesMax = result.yAxesMax;
					this.xmin = result.xmin;
					this.xAxes = new Date(this.labels[this.labels.length-1]);
					method.printChart(canvasid);
				}
			}
		}
	}
}

const actions = {
	getPainAssessment(context, patno) {
		var newMsg = painService.getPainAssessmentData(patno).then(response => {
			context.commit('setPainAssessment', response.data)
		})
		.catch(e => {

		})
	}

}

const mutations = {
	setPainAssessment(state, paindata) {
		state.painData=paindata;
		method.createPainChart()
	}
    
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
	data() {
		return {
			rows: [],
			labels: [],
			label: '',
			yAxesMin: 0,
			yAxesMax: 0,
			xAxes: 0
		}
	},
	render() {
		var node = this.$createElement;
		return node(
			'div',
			{ attrs: { id: 'painLineChart', style:'width:70%;height:50%' } }
		);
	}
}
