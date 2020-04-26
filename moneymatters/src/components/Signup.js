import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { storepredictedvalue } from "../actions/storepredictedvalue";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import InitialCustomerExpensesForm from "./InitialCustomerExpensesForm";

// Higher order component is withStyles
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignupWithoutStyles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      age: 0,
      primaryincome: null,
      country: null,
      gender: null,
      profession: null,
      isCustomerDetailsForm: true,
      isExpenseForm: false,
    };
  }

  saveCustomerDetails = async () => {
    const res = await axios.post(`http://localhost:3001/users`, this.state);
    this.setState({ isExpenseForm: true, isCustomerDetailsForm: false });
    this.props.storepredictedvalue(res.data.predictedValue);
  };

  updateState = (e) => {
    switch (e.target.name) {
      case "firstName":
        this.setState({
          firstName: e.target.value,
        });
        break;
      case "lastName":
        this.setState({ lastName: e.target.value });
        break;
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      case "confirmPassword":
        this.setState({ confirmPassword: e.target.value });
        break;
      case "age":
        const ageEntered = parseInt(e.target.value, 10);
        this.setState({ age: ageEntered });
      case "primaryincome":
        this.setState({ primaryincome: e.target.value });
      case "country":
        this.setState({ country: e.target.value });
      case "gender":
        this.setState({ gender: e.target.value });
      case "profession":
        this.setState({ profession: e.target.value });

      default:
      // console.log("inside default");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.isCustomerDetailsForm && (
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar variant='rounded' className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign up
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete='fname'
                      name='firstName'
                      variant='outlined'
                      required
                      fullWidth
                      id='firstName'
                      label='First Name'
                      autoFocus
                      onChange={this.updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      autoComplete='lname'
                      onChange={this.updateState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                      onChange={this.updateState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      autoComplete='current-password'
                      onChange={this.updateState}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      name='confirmPassword'
                      label='Confirm Password'
                      type='password'
                      min='7'
                      id='confirmPassword'
                      onChange={this.updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      //autoComplete='fname'
                      name='age'
                      variant='outlined'
                      required
                      fullWidth
                      id='age'
                      label='Age'
                      type='number'
                      inputProps={{ min: "0", max: "100", step: "1" }}
                      onChange={this.updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='PrimaryIncome'
                      label='Primary Income'
                      name='primaryincome'
                      type='number'
                      inputProps={{ min: "0" }}
                      onChange={this.updateState}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel id='demo-simple-select-label'>
                      Country
                    </InputLabel>
                    <Select
                      //labelId="demo-simple-select-label"
                      id='demo-simple-select'
                      //value={age}
                      fullWidth
                      name='country'
                      onChange={this.updateState}
                    >
                      <MenuItem value={"USA"}>USA</MenuItem>
                      <MenuItem value={"India"}>India</MenuItem>
                      <MenuItem value={"Canada"}>Canada</MenuItem>
                      <MenuItem value={"England"}>England</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel id='demo-simple-select-label'>
                      Gender
                    </InputLabel>
                    <Select
                      //labelId="demo-simple-select-label"
                      id='demo-simple-select'
                      name='gender'
                      fullWidth
                      onChange={this.updateState}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                      <MenuItem value={"other"}>other</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id='demo-simple-select-label'>
                      Profession
                    </InputLabel>
                    <Select
                      //labelId="demo-simple-select-label"
                      name='profession'
                      id='demo-simple-select'
                      fullWidth
                      onChange={this.updateState}
                    >
                      <MenuItem value={"Student"}>Student</MenuItem>
                      <MenuItem value={"Professional"}>Professional</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={this.saveCustomerDetails}
                >
                  Next
                </Button>
                <Grid container justify='flex-end'>
                  <Grid item>
                    <Link to='/Login' variant='body2'>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        )}

        {this.state.isExpenseForm && (
          <InitialCustomerExpensesForm data={this.state} />
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  storepredictedvalue: (value) => dispatch(storepredictedvalue(value)),
});
const Signup = withStyles(useStyles)(SignupWithoutStyles);
export default connect(null, mapDispatchToProps)(Signup);
