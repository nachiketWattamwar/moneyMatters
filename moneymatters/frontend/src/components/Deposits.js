/* eslint-disable no-script-url */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import axios from "axios";
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = (props) => {
  const [prediction, getPrediction] = useState(0);
  //const [recentData, setrecentData] = useState(Date.now);
  useEffect(() => {
    //getRecentExpense();
    const expenseData = {
      email: props.email.email, //done
    };
    //console.log("========deposits and expenseData", expenseData);
    axios.post(`http://localhost:4000/prediction`, expenseData).then((res) => {
      console.log("after axios call ", res.data[0]);
      //newData.id = res.data._id;
      //let temp = this.state.data.concat(newData);
      getPrediction(res.data[0]);
    });
  }, []);
  const classes = useStyles();
  const bal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <React.Fragment>
      <Title>Upcoming expense prediction</Title>
      <Typography component='p' variant='h4'>
        {bal.format(prediction)}
      </Typography>
      {/* <Typography color='textSecondary' className={classes.depositContext}>
        on 15 March, 2019
      </Typography> */}
      <div>
        <Link color='primary' to='/expenses'>
          View expenses
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposits;
