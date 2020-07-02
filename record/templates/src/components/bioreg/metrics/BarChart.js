import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import { connect } from 'react-redux';
import { getData } from '../../../actions/RegcrudAction';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class BarChart extends Component {

	addSymbols(e) {
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if (order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	componentDidMount() {
		this.props.getData();
	}


	render() {
		const metricval = this.props.metricval;
		const options = {
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "Common Illness"
			},
			axisX: {
				title: "",
				reversed: true,
			},
			axisY: {
				title: "",
				labelFormatter: this.addSymbols
			},
			data: [{

				type: "bar",
				dataPoints: [
					{ y: (metricval.Fever) + 1000000000, label: "Fever" },
					{ y: (metricval.Malaria) + 1800000000, label: "Malaria" },
					{ y: (metricval.Diarrhea) + 800000000, label: "Diarrhea" },
					{ y: (metricval.Common_Cough) + 563000000, label: "Common Cough" },
					{ y: (metricval.Cold) + 376000000, label: "Cold" },
					{ y: (metricval.Food_poisoning) + 336000000, label: "Food poisoning" },
					{ y: (metricval.Others) + 330000000, label: "Others" }
				]
			}]
		}

		return (
			<div>
				<CanvasJSChart options={options}
				/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}
const mapStateToProps = (state) => ({

	metricval: state.regdata_reducer.metircval,
});
export default connect(mapStateToProps, { getData })(BarChart);
