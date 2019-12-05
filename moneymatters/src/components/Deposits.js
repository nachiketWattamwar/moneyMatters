/* eslint-disable no-script-url */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { connect } from "react-redux";
import { getRecentExpense } from "../actions/recentexpense";
const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

const Deposits = ({ recentexpense, getRecentExpense }) => {
  // const [balance, setBalance] = useState(1212);
  useEffect(() => {
    console.log("=======================inside useEffect()============");
    getRecentExpense();
  }, []);
  const classes = useStyles();
  const bal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  console.log("=================inside deposit=============", recentexpense);
  return (
    <React.Fragment>
      <Title>Recent Expense</Title>
      <Typography component='p' variant='h4'>
        {bal.format(recentexpense.recentExpense)}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color='primary' to='/expenses'>
          View expenses
        </Link>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  recentexpense: state.recentexpense
});

export default connect(mapStateToProps, { getRecentExpense })(Deposits);
