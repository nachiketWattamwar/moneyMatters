import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

export default class ReportsPie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }
  render() {
    return (
      <React.Fragment>
        <Pie data={this.state.data}></Pie>
      </React.Fragment>
    );
  }
}
