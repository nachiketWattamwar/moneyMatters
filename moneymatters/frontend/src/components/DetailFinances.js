import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ReportsPie from "../charts/ReportsPie";
import Chart from "../charts/Chart";
import { Pie } from "react-chartjs-2";
import { URL } from "../config/config";
import ReportsHorizontalBar from "../charts/ReportsHorizontalBar";
//import "../scss/_mystyles.scss";

const spanStyle = {
  display: "inline",
};

const reports = {
  margin: "10px",
};

const dataExpense = {
  labels: ["Food", "Rent", "Bills", "Travel", "Groceries"],
  datasets: [
    {
      data: [250, 2000, 500, 500, 250],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "grey", "green"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const dataIncome = {
  labels: ["Salary", "Shares", "Misc investments"],
  datasets: [
    {
      data: [1000, 500, 100],
      backgroundColor: ["#23A21B", "	#0000ff", "#FFCE56"],
      hoverBackgroundColor: ["#c1f4be", "#e6e6ff", "#ffe299"],
    },
  ],
};

const title = {
  flexGrow: "1",
};

export default class DetailFinances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
    };
  }

  // componentDidMount() {
  //   axios.get("http://localhost:4000/recentFiveExpenses").then((res) => {
  //     console.log(
  //       "from backend data, axios recent 5 expenses",
  //       res.data.length
  //     );
  //     let arr = new Array();
  //     for (let i = 0; i < res.data.length; i++) {
  //       arr.push(res.data[i]);
  //     }
  //     dataExpense.datasets[0] = arr;

  //     this.setState({
  //       loading: false,
  //       data: dataExpense,
  //     });

  //     console.log("all data is after axios call reports piw ", this.state.data);
  //   });
  // }

  render() {
    const imagePath = `url(images/pencilpen.jpg)`;
    return (
      <div style={{ backgroundColor: "darkgrey" }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' style={title}>
              Reports
            </Typography>
            {/* <Button color='inherit'>Login</Button> */}
          </Toolbar>
        </AppBar>
        <span style={spanStyle}>
          <div>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='flex-start'
              spacing={2}
            >
              <Grid item xs={6}>
                <Paper elevation='10' style={reports}>
                  <Typography align='center'>
                    Predictive expenses for next months
                  </Typography>
                  <ReportsHorizontalBar />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid
              container
              direction='row'
              justify='space-evenly'
              alignItems='flex-start'
              spacing={2}
            >
              <Grid item xs={6}>
                <Paper style={reports} elevation='10'>
                  <Typography align='center'>
                    Expenses (All figures in $)
                  </Typography>
                  <Pie data={dataExpense}></Pie>
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid
              container
              direction='row'
              justify='space-evenly'
              alignItems='flex-start'
              spacing={2}
            >
              <Grid item xs={6}>
                <Paper style={reports} elevation='10'>
                  <Typography align='center'>Expense History</Typography>
                  <Chart />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </span>
      </div>
    );
  }
}
