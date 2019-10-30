/* eslint-disable no-script-url */

import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function Deposits() {
  const [balance, setBalance] = useState(1212);
  const classes = useStyles();
  const bal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  return (
    <React.Fragment>
      <Title>Recent Expense</Title>
      <Typography component='p' variant='h4'>
        {bal.format(balance)}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color='primary' href='javascript:;'>
          View expenses
        </Link>
      </div>
    </React.Fragment>
  );
}
