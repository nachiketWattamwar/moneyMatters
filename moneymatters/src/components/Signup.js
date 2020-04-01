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
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import InitialCustomerExpensesForm from "./InitialCustomerExpensesForm";

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{"Copyright © "}
			<Link color='inherit'>Money Matters</Link> {new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
// Higher order component is withStyles
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

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: null,
			lastName: null,
			email: null,
			password: null,
			confirmPassword: null,
			isCustomerDetailsForm: true,
			isExpenseForm: false
		};
	}

	saveCustomerDetails = () => {
		this.setState({ isExpenseForm: true, isCustomerDetailsForm: false }, () => {
			//could be deleted??
			const data = this.state;
			/*
			axios.post(`http://localhost:3001/signup`, { data }).then(res => {
				console.log(res);
				console.log(res.data);
			});
			*/
		});
	};

	updateState = e => {
		switch (e.target.name) {
			case "firstName":
				this.setState({
					firstName: e.target.value
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
			default:
			// console.log("inside default");
		}
	};

	render() {
		const { classes } = this.props;

		//console.log("=============", this.props);
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
											id='confirmPassword'
											onChange={this.updateState}
										/>
									</Grid>

									<Grid item xs={12}>
										<FormControlLabel
											control={
												<Checkbox value='allowExtraEmails' color='primary' />
											}
											label='I want to receive inspiration, marketing promotions and updates via email.'
										/>
									</Grid>
								</Grid>
								<Button
									// type='submit'
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
					<InitialCustomerExpensesForm props={this.state} />
				)}
			</div>
		);
	}
}

export default withStyles(useStyles)(Signup);
/* <Grid item xs={12} sm={6}>
									<TextField
										variant='outlined'
										required
										fullWidth
										id='lastName'
										label='Last Name'
										name='lastName'
										autoComplete='lname'
										onChange={this.getFirstName}
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
										onChange={this.getFirstName}
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
										onChange={this.getFirstName}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										name='rent'
										label='Rent'
										id='rent'
										onChange={this.getFirstName}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										name='grocery'
										label='Grocery'
										id='grocery'
										onChange={this.getFirstName}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										name='travel'
										label='Travel'
										id='travel'
										onChange={this.getFirstName}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										name='mobile'
										label='Mobile'
										id='mobile'
										onChange={this.getFirstName}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										name='wifi'
										label='WiFi'
										id='wifi'
										onChange={this.getFirstName}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel
										control={
											<Checkbox value='allowExtraEmails' color='primary' />
										}
										label='I want to receive inspiration, marketing promotions and updates via email.'
									/>
								</Grid>
							</Grid>
							<Button
								// type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
								onClick={this.SignupData}
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
						</form>
					</div>
					<Box mt={5}>
						<Copyright />
					</Box>
				</Container>
			</div>
		);
	}
}

export default withStyles(useStyles)(Signup); */
