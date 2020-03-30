import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";

const useStyles = theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
});

class InitialCustomerExpensesForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rent: null,
			grocery: null,
			wifi: null,
			travel: null,
			mobile: null
		};
	}

	updateState = e => {
		switch (e.target.name) {
			case "rent":
				this.setState({ rent: e.target.value });
				break;
			case "grocery":
				this.setState({ grocery: e.target.value });
				break;
			case "wifi":
				this.setState({ wifi: e.target.value });
				break;
			case "travel":
				this.setState({ travel: e.target.value });
				break;
			case "mobile":
				this.setState({ mobile: e.target.value });
				break;
			default:
			// console.log("inside default");
		}
	};

	/* saveCustomerExpenses = () => {
		//might need to create a new object
		const customerData = this.props.props;
		//api call for signup
		console.log(customerData);
		const expenseData = this.state;
		axios.post("", expenseData).then(res => {
			console.log(res);
			console.log(res.data);
        });
	}; */

	onSignup = async e => {
		e.preventDefault();
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword
		} = this.props.props;
		if (password !== confirmPassword) console.log("passwords do not match");
		else {
			console.log("in initial expenses data");
			console.log(firstName, lastName, email, password, confirmPassword);
			//first api call to signup user
			//after the first one's success, second api call to log initial expenses for the signed up user
		}
	};

	if(isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<div className={classes.paper}>
						<Avatar variant='rounded' className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Approximate Monthly Expenses
						</Typography>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										name='rent'
										variant='outlined'
										required
										fullWidth
										id='rent'
										label='Monthly Rent'
										autoFocus
										onChange={this.updateState}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name='grocery'
										variant='outlined'
										required
										fullWidth
										id='grocery'
										label='Monthly Groceries'
										autoFocus
										onChange={this.updateState}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name='travel'
										variant='outlined'
										required
										fullWidth
										id='travel'
										label='Monthly Travel'
										autoFocus
										onChange={this.updateState}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name='mobile'
										variant='outlined'
										required
										fullWidth
										id='mobile'
										label='Monthly Mobile Bill'
										autoFocus
										onChange={this.updateState}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name='wifi'
										variant='outlined'
										required
										fullWidth
										id='wifi'
										label='Monthly Wifi Bill'
										autoFocus
										onChange={this.updateState}
									/>
								</Grid>
								<Button
									fullWidth
									variant='contained'
									color='primary'
									className={classes.submit}
									onClick={this.onSignup} //api call
								>
									Sign Up
								</Button>
								<Grid container justify='flex-end'>
									<Grid item>
										<Link to='/Login' variant='body2'>
											Already have an account? Sign in
										</Link>
									</Grid>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</div>
		);
	}
}

export default connect(null, { signup })(
	withStyles(useStyles)(InitialCustomerExpensesForm)
);
