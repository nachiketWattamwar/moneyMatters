import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { storeemail } from "../actions/storeemail";
import { connect } from "react-redux";
function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit'>Money Matters</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      authorise: false,
      profileInfo: null,
      token: null,
    };
  }

  updateState = (e) => {
    switch (e.target.name) {
      case "email":
        this.setState({
          email: e.target.value,
        });
        break;
      case "password":
        this.setState({
          password: e.target.value,
        });
        break;
      default:
    }
  };

  onLogin = () => {
    const data = this.state;
    console.log("in onLogin method: ", data);
    axios.post(`http://localhost:3001/users/login`, data).then((res) => {
      console.log("before starting action ");

      if (res.data) {
        this.setState({
          email: res.data.userFromDatabase.email,
          profileInfo: res.data.userFromDatabase,
          authorise: true,
        });
      }
      this.props.storeemail(res.data.userFromDatabase.email);
    });
  };

  render() {
    const { classes } = this.props;
    console.log("this props redux info is ", this.state);

    if (this.state.authorise) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: {
              email: this.state.email,
              profileInfo: this.state.profileInfo,
            },
          }}
        />
      );
    } else {
      return (
        <div>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={this.updateState}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  onChange={this.updateState}
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                <Button
                  // type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={this.onLogin}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to='/Signup' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  email: state.storeemail,
});
const mapDispatchToProps = (dispatch) => ({
  storeemail: (email) => dispatch(storeemail(email)),
});
const LoginComponent = withStyles(useStyles)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
