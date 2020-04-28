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

const ProfileInfo = (props) => {
  const [firstName, getFirstName] = useState(null);
  const [lastName, getLastName] = useState(null);
  const [primaryIncome, getPrimaryIncome] = useState(null);
  const [country, getCountry] = useState(null);
  const [age, getAge] = useState(null);
  const [profession, getProfession] = useState(null);
  const [gender, getGender] = useState(null);

  //const [recentData, setrecentData] = useState(Date.now);
  useEffect(() => {
    //getRecentExpense();
    const user = {
      email: props.email.email, //done
    };
    //console.log("========deposits and expenseData", expenseData);
    axios.post(`http://localhost:3001/getProfileInfo`, user).then((res) => {
      console.log("after axios call profile info ", res.data.userObj);
      //newData.id = res.data._id;
      //let temp = this.state.data.concat(newData);
      getFirstName(res.data.userObj.firstName);
      getLastName(res.data.userObj.lastName);
      getPrimaryIncome(res.data.userObj.primaryincome);
      getCountry(res.data.userObj.country);
      getAge(res.data.userObj.age);
      getProfession(res.data.userObj.profession);
      getGender(res.data.userObj.gender);
    });
  }, []);
  const classes = useStyles();
  const bal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <React.Fragment>
      <Title>Profile Info</Title>
      <Typography component='p' variant='h6'>
        {`Name : ${firstName} ${lastName}`}
      </Typography>
      <Typography component='p' variant='h6'>
        {`Income : $${primaryIncome}`}
      </Typography>

      <Typography component='p' variant='h6'>
        {`Age : ${age}`}
      </Typography>

      <Typography component='p' variant='h6'>
        {`Status : ${profession}`}
      </Typography>
      <Typography component='p' variant='h6'>
        {`Gender : ${gender}`}
      </Typography>
    </React.Fragment>
  );
};

export default ProfileInfo;
