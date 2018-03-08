import { Line } from 'vue-chartjs'
export default {
	extends: Line,
	data() {
		return {
		
		datacollection: {
						//labels: [],
						labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
						datasets: [
							{
								//labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
								backgroundColor: 'rgba(75,192,192,0.1)',
								bordercolor: '#00c853',
								fill: true,
								pointBackgroundColor: 'white',
								borderWidth: 1,
								pointBorderColor: '#249EBF',
								scalesdisplay: true,
								pointRadius: 0,
								//Data to be represented on y-axis
								data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
								//data: []
							}
						]
			},
		
        
					//Chart.js options that controls the appearance of the chart
					//options: {
					//	scales: {
					//		yAxes: [{
					//			ticks: {
					//				beginAtZero: true
					//			},
					//			gridLines: {
					//				display: false
					//			}
					//		}],
					//		xAxes: [{
					//			gridLines: {
					//				display: false
					//			}
					//		}]
					//	},
					//	legend: {
					//		display: false
					//	},
					//	responsive: true,
					//	maintainAspectRatio: false
					//}
				
			
		}
	},
	mounted() {

		var paindata= [
			{
				"PainScoringtype": 0,
				"PainType": 1,
				"PainScore": 2,
				"PainAssessmentTime": "2018-03-02T10:34:56Z"
			},
			{
				"PainScoringtype": 3,
				"PainType": 2,
				"PainScore": 9,
				"PainAssessmentTime": "2018-03-02T10:27:10Z"
			},
			{
				"PainScoringtype": 0,
				"PainType": 1,
				"PainScore": 2,
				"PainAssessmentTime": "2018-03-02T10:13:00Z"
			},

			{
				"PainScoringtype": 0,
				"PainType": 1,
				"PainScore": 0,
				"PainAssessmentTime": "2018-03-06T06:21:22Z"
			},
			{
				"PainScoringtype": 0,
				"PainType": 1,
				"PainScore": 0,
				"PainAssessmentTime": "2018-03-05T07:31:08Z"
			},
			{
				"PainScoringtype": 0,
				"PainType": 1,
				"PainScore": 1,
				"PainAssessmentTime": "2018-03-02T09:29:15Z"
			}
		]
		debugger;

		function organize(rows, groupBy) {
			var last = groupBy.length - 1;
			return rows.reduce((res, obj) => {
				groupBy.reduce((res, grp, i) =>
					res[obj[grp]] || (res[obj[grp]] = i == last ? [] : {}), res).push(obj);
				return res;
			}, {});
		}

		var reOrganizedData = organize(paindata, ['PainType', 'PainScoringtype']);
		
		
		var self = this;
		var values = reOrganizedData;
		for (var item in values) {
			//this.datacollection.datasets[item-1].data.push(values[item]['PainScore']);
			//this.datacollection.labels.push(values[item]['PainAssessmentTime']);
		}
		
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

		this.renderChart(this.datacollection, this.options)
	}
}