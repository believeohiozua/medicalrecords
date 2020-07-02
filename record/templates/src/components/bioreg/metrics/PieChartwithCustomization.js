import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import { connect } from 'react-redux';
import { getData } from '../../../actions/RegcrudAction';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChartWithCustomization extends Component {
	componentDidMount() {
		this.props.getData();
	}
	render() {
		const metricval = this.props.metricval;
		const options = {
			theme: "dark2",
			animationEnabled: true,
			exportFileName: "New Year Resolutions",
			exportEnabled: true,
			title: {
				text: "Terminal Diseases"
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: [
					{ y: (metricval.Cancer) + 32, label: "Cancer" },
					{ y: (metricval.Azemia) + 22, label: "Azemia" },
					{ y: (metricval.Parkinson) + 15, label: "Parkinson" },
					{ y: (metricval.Diabetis) + 19, label: "Diabetis" },
					{ y: (metricval.Arthritis) + 5, label: "Arthritis" },
					{ y: (metricval.Others) + 7, label: "Others" }
				]
			}]
		}

		return (
			<div>
				<CanvasJSChart options={options}
				/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to <PieChartWithCustomization /> the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}
const mapStateToProps = (state) => ({

	metricval: state.regdata_reducer.metircval,
});
export default connect(mapStateToProps, { getData })(PieChartWithCustomization);
