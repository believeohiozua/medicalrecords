import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import { connect } from 'react-redux';
import { getData } from '../../../actions/RegcrudAction';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ColumnChart extends Component {
	componentDidMount() {
		this.props.getData();
	}

	render() {
		const metricval = this.props.metricval;
		const options = {
			title: {
				text: "Viral Diseases"
			},
			animationEnabled: true,
			data: [
				{
					// Change type to "doughnut", "line", "splineArea", etc.
					type: "column",
					dataPoints: [
						{ label: "Corona", y: (metricval.Corona) + 10 },
						{ label: "Ebola", y: (metricval.Ebola) + 15 },
						{ label: "HIV", y: (metricval.HIV) + 25 },
						{ label: "Small Pox", y: (metricval.SmallPox) + 30 },
						{ label: "Influenza", y: (metricval.Influenza) + 28 },
						{ label: "Others", y: (metricval.Others) + 28 }
					]
				}
			]
		}

		return (
			<div>
				<h1>Statistical Chart</h1>
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
export default connect(mapStateToProps, { getData })(ColumnChart);
