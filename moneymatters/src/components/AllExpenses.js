import React, { Component } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

export default class AllExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
    };
  }
  componentWillMount() {
    const expenseData = {
      email: this.props.email.email, //done
      totalExpenses: null,
    };
    console.log("========inside all expenses", expenseData);
    axios.post(`http://localhost:3001/allexpenses`, expenseData).then((res) => {
      //newData.id = res.data._id;
      //let temp = this.state.data.concat(newData);
      const sortedData = res.data;
      let totalExpenses = 0;
      for (let i = 0; i < sortedData.length; i++) {
        totalExpenses += sortedData[i].amount;
      }

      this.setState({
        data: sortedData,
        totalExpenses: totalExpenses,
      });

      console.log("===== inside total amount", this.state);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Title>Total Expenses</Title>
        <Typography component='p' variant='h4'>
          {`$ ${this.state.totalExpenses}`}
        </Typography>
      </React.Fragment>
    );
  }
}
