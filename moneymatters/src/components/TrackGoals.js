import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import "../scss/_mystyles.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TrackGoals extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title: {
				text: "John's College Fund	",
			},
			axisY: {
				title: "Savings ($)",
				includeZero: true,
				prefix: "$",
			},
			axisX: {
				title: "Month",
				interval: 1,
			},
			data: [
				{
					type: "line",
					toolTipContent: "Month {x}: ${y}",
					showInLegend: true,
					includeZero: true,
					legendText: "Expected Savings",
					dataPoints: [
						{ label: "Jan", y: 1000 },
						{ label: "Feb", y: 2000 },
						{ label: "Mar", y: 3000 },
						{ label: "Apr", y: 4000 },
						{ label: "May", y: 5000 },
						{ label: "Jun", y: 6000 },
					],
				},
				{
					type: "line",
					toolTipContent: "Month {x}: ${y}",
					showInLegend: true,
					legendText: "Predicted Savings",
					dataPoints: [
						{ label: "Jan", y: 1100 },
						{ label: "Feb", y: 1900 },
						{ label: "Mar", y: 2500 },
						{ label: "Apr", y: 3700 },
						{ label: "May", y: 4900 },
						{ label: "Jun", y: 5500 },
					],
				},
				{
					type: "line",
					toolTipContent: "Month {x}: ${y}",
					showInLegend: true,
					legendText: "Actual Savings",
					dataPoints: [
						{ label: "Jan", y: 800 },
						{ label: "Feb", y: 2050 },
					],
				},
			],
		};

		return (
			<div>
				<div>
					<AppBar position='static'>
						<Toolbar>
							<Typography variant='h6' className='title'>
								Track Your Goals
							</Typography>
						</Toolbar>
					</AppBar>
				</div>
				<div>
					<CanvasJSChart options={options} />
				</div>
			</div>
		);
	}
}

export default TrackGoals;
