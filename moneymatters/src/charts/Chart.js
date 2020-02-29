import React from "react";
import { Line } from "react-chartjs-2";
import Title from "../components/Title";

// Generate Sales Data

export default function Chart() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly expenses",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [650, 590, 800, 810, 560, 550, 555]
      }
    ]
  };
  return (
    <React.Fragment>
      <Title>Today</Title>
      <Line width='300px' height='80px' data={data} />
    </React.Fragment>
  );
}
