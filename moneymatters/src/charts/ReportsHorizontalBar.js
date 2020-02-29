import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
let dataHori = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "In USD",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class ReportsHorizontalBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataHori
    };
  }

  render() {
    return (
      <React.Fragment>
        <HorizontalBar data={this.state.data}></HorizontalBar>
      </React.Fragment>
    );
  }
}
