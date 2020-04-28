import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
let dataHori = {
  labels: ["April", "May", "June", "July", "August", "September", "October"],
  datasets: [
    {
      label: "In USD",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [5510, 5056, 5108, 5200, 5100, 5302, 5400, 5500],
    },
  ],
};

export default class ReportsHorizontalBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataHori,
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
