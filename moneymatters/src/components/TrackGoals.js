import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import "../scss/_mystyles.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TrackGoals extends Component {
	constructor(props) {
		super(props);

		let search = window.location.search;
		let params = new URLSearchParams(search);
		let goalId = params.get("goalId");
		console.log(goalId);
	}
	//all hardcodings
	//get id from props
	//fetch data <-> id and display tracking
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title: {
				text: "John's College Fund	", //can change
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
				//can change
				{
					type: "line",
					toolTipContent: "Month {x}: ${y}",
					showInLegend: true,
					includeZero: true,
					legendText: "Expected Savings",
					dataPoints: [
						{ label: "Mar", y: 1000 },
						{ label: "Apr", y: 2000 },
						{ label: "May", y: 3000 },
						{ label: "Jun", y: 4000 },
						{ label: "Jul", y: 5000 },
						{ label: "Aug", y: 6000 },
					],
				},
				{
					type: "line",
					toolTipContent: "Month {x}: ${y}",
					showInLegend: true,
					legendText: "Predicted Savings",
					dataPoints: [
						{ label: "Mar", y: 1100 },
						{ label: "Apr", y: 1900 },
						{ label: "May", y: 2500 },
						{ label: "Jun", y: 3700 },
						{ label: "Jul", y: 4900 },
						{ label: "Aug", y: 5500 },
					],
				},
				{
					type: "line",
					toolTipContent: "Month {x}: ${y}",
					showInLegend: true,
					legendText: "Actual Savings",
					dataPoints: [
						{ label: "Mar", y: 800 },
						{ label: "Apr", y: 2050 },
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
