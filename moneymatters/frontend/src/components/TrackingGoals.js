import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
//import "../scss/_mystyles.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { parseISOWithOptions } from "date-fns/fp";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const title = {
  flexGrow: "1",
};
class TrackingGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      amount: null,
      startDate: null,
    };

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let goalId = params.get("goalId");
    console.log("goalID is ", window);
  }

  componentDidMount() {
    console.log("props here ", this.props.location.state.rowData.name);
    this.setState({
      name: this.props.location.state.rowData.name,
      amount: this.props.location.state.rowData.amount,
      startDate: this.props.location.state.rowData.startdate,
    });
  }
  //all hardcodings
  //get id from props
  //fetch data <-> id and display tracking
  render() {
    console.log("tracking goals state is ", this.state.startDate);

    //cosnt stateDate.getMonth()
    const d = new Date(this.state.startDate);
    var y = 0;
    console.log("d is ", d);
    var objArr = [];
    var tempamount = 0;
    for (let i = 0; i <= 5; i++) {
      //const temp = new Expense(x);
      //console.log(new Date(d.setMonth(d.getMonth() + 1)));
      //d = d.setMonth(d.getMonth() + 1);
      tempamount += 1000;
      var temp = new Date(d.setMonth(d.getMonth() + 1));
      objArr.push({
        label: temp.toLocaleString("default", { month: "long" }),
        y: tempamount,
      });
    }
    console.log("myobjarr ", objArr);

    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: this.state.name, //can change
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
          dataPoints: objArr,
        },
        // {
        //   type: "line",
        //   toolTipContent: "Month {x}: ${y}",
        //   showInLegend: true,
        //   legendText: "Predicted Savings",
        //   dataPoints: [
        //     { label: "Mar", y: 1100 },
        //     { label: "Apr", y: 1900 },
        //     { label: "May", y: 2500 },
        //     { label: "Jun", y: 3700 },
        //     { label: "Jul", y: 4900 },
        //     { label: "Aug", y: 5500 },
        //   ],
        // },
        // {
        //   type: "line",
        //   toolTipContent: "Month {x}: ${y}",
        //   showInLegend: true,
        //   legendText: "Actual Savings",
        //   dataPoints: [
        //     { label: "Mar", y: 800 },
        //     { label: "Apr", y: 2050 },
        //   ],
        // },
      ],
    };

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

export default TrackingGoals;
