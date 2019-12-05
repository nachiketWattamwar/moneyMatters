import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

const dataExpense = {
  labels: ["Food", "Rent and Bills", "Misc"],
  datasets: [
    {
      data: [30, 500, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const dataIncome = {
  labels: ["Salary", "Shares", "Misc investments"],
  datasets: [
    {
      data: [1000, 500, 100],
      backgroundColor: ["#23A21B", "	#0000ff", "#FFCE56"],
      hoverBackgroundColor: ["#c1f4be", "#e6e6ff", "#ffe299"]
    }
  ]
};

export default class DetailFinances extends Component {
  render() {
    return (
      <div>
        <span>
          <div style={{ width: "500px" }}>
            <h2>Expenses</h2>
            <Pie data={dataExpense} />
          </div>
          <div style={{ width: "500px" }}>
            <h2>Income</h2>
            <Pie data={dataIncome} />
          </div>
        </span>
      </div>
    );
  }
}
