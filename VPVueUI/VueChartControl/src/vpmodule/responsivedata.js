import { Line } from 'vue-chartjs'

export default {
	extends: Line,
	template: '#boxes-template',
	props: ['chartData', 'options'],
	data: () => ({
		chartData: null,
		options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								},
								gridLines: {
									display: false
								}
							}],
							xAxes: [{
								gridLines: {
									display: false
								}
							}]
						},
						legend: {
							display: false
						},
						responsive: true,
						maintainAspectRatio: false
					}
	}),
	async created() {
		var data = [];
		var datacollection = {
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
		}

		var datacollection1 = {
			//labels: [],
			labels: ['January', 'February', 'March', 'April', 'May'],
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
					data: [10, 50, 70, 90, 100]
					//data: []
				}
			]
		}

		debugger;
		data.push(datacollection);
		data.push(datacollection1);
		this.chartData = data;


		//this.chartData = await axios.get(/* some api or vuex stuff*/)
	},
	mounted() {
		//for (var item in this.chartData) {
			this.renderChart(this.chartData[0], this.options)
		//}
		
	}


   

}