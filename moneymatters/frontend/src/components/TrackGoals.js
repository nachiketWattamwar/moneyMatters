import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
//import "../scss/_mystyles.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options1 = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light2",
  title: {
    text: "Retirement Fund", //can change
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
        { label: "Mar", y: 238 },
        { label: "Apr", y: 476 },
        { label: "May", y: 714 },
        { label: "Jun", y: 952 },
        { label: "Jul", y: 1190 },
        { label: "Aug", y: 1428 },
      ],
    },
    {
      type: "line",
      toolTipContent: "Month {x}: ${y}",
      showInLegend: true,
      legendText: "Predicted Savings",
      dataPoints: [
        { label: "Mar", y: 200 },
        { label: "Apr", y: 430 },
        { label: "May", y: 690 },
        { label: "Jun", y: 900 },
        { label: "Jul", y: 1100 },
        { label: "Aug", y: 1380 },
      ],
    },
    {
      type: "line",
      toolTipContent: "Month {x}: ${y}",
      showInLegend: true,
      legendText: "Actual Savings",
      dataPoints: [
        { label: "Mar", y: 198 },
        { label: "Apr", y: 450 },
      ],
    },
  ],
};
const options2 = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light2",
  title: {
    text: "Savings for house", //can change
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
        { label: "Mar", y: 1390 },
        { label: "Apr", y: 2780 },
        { label: "May", y: 4170 },
        { label: "Jun", y: 5560 },
        { label: "Jul", y: 6950 },
        { label: "Aug", y: 8340 },
      ],
    },
    {
      type: "line",
      toolTipContent: "Month {x}: ${y}",
      showInLegend: true,
      legendText: "Predicted Savings",
      dataPoints: [
        { label: "Mar", y: 1400 },
        { label: "Apr", y: 2850 },
        { label: "May", y: 4000 },
        { label: "Jun", y: 5600 },
        { label: "Jul", y: 6800 },
        { label: "Aug", y: 8400 },
      ],
    },
    {
      type: "line",
      toolTipContent: "Month {x}: ${y}",
      showInLegend: true,
      legendText: "Actual Savings",
      dataPoints: [
        { label: "Mar", y: 1380 },
        { label: "Apr", y: 2785 },
      ],
    },
  ],
};

const options3 = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light2",
  title: {
    text: "John's College Fund", //can change
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
        { label: "Mar", y: 417 },
        { label: "Apr", y: 834 },
        { label: "May", y: 1251 },
        { label: "Jun", y: 1668 },
        { label: "Jul", y: 2085 },
        { label: "Aug", y: 2502 },
      ],
    },
    {
      type: "line",
      toolTipContent: "Month {x}: ${y}",
      showInLegend: true,
      legendText: "Predicted Savings",
      dataPoints: [
        { label: "Mar", y: 350 },
        { label: "Apr", y: 750 },
        { label: "May", y: 1100 },
        { label: "Jun", y: 1590 },
        { label: "Jul", y: 1988 },
        { label: "Aug", y: 2200 },
      ],
    },
    {
      type: "line",
      toolTipContent: "Month {x}: ${y}",
      showInLegend: true,
      legendText: "Actual Savings",
      dataPoints: [
        { label: "Mar", y: 330 },
        { label: "Apr", y: 730 },
      ],
    },
  ],
};

const title = {
  flexGrow: "1",
};
class TrackGoals extends Component {
  constructor(props) {
    super(props);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("goalId");

    this.state = {
      goalId: id,
    };

    console.log(this.state.goalId + "jc");
  }
  //all hardcodings
  //get id from props
  //fetch data <-> id and display tracking
  render() {
    let options = {};
    if (this.state.goalId == 1) {
      options = options1;
    } else if (this.state.goalId == 2) {
      options = options2;
    } else if (this.state.goalId == 3) {
      options = options3;
    }
    return (
      <div>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' style={title}>
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
