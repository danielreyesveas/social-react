import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AppIcon from "../images/icon.png";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
	...theme.styles,
});

const initialUserData = {
	email: "",
	password: "",
};

const Login = (props) => {
	const { history, classes, ui, loginUser } = props;

	const [errors, setErrors] = useState({});
	const [userData, setUserData] = useState(initialUserData);

	useEffect(() => {
		if (ui.errors) {
			setErrors(ui.errors);
		}
	}, [ui.errors]);

	const handleChange = (event) => {
		console.log(event.target.name, event.target.value);
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		loginUser(userData, history);
	};

	return (
		<Grid container className={classes.form}>
			<Grid item sm></Grid>
			<Grid item sm>
				<img src={AppIcon} alt="App icon" className={classes.appIcon} />

				<Typography variant="h2" className={classes.pageTitle}>
					Login
				</Typography>

				<form noValidate onSubmit={handleSubmit}>
					<TextField
						className={classes.textField}
						error={!!errors.email}
						fullWidth
						helperText={errors.email}
						id="email"
						label="Email"
						name="email"
						onChange={handleChange}
						type="email"
						value={userData.email}
					/>

					<TextField
						className={classes.textField}
						error={!!errors.password}
						fullWidth
						helperText={errors.password}
						id="password"
						label="Password"
						name="password"
						onChange={handleChange}
						type="password"
						value={userData.password}
					/>

					{errors.general && (
						<Typography
							variant="body2"
							className={classes.customError}
						>
							{errors.general}
						</Typography>
					)}
					<Button
						className={classes.submitButton}
						color="primary"
						disabled={ui.loading}
						type="submit"
						variant="contained"
					>
						Login
						{ui.loading && (
							<CircularProgress
								className={classes.progress}
								size={30}
							/>
						)}
					</Button>

					<br />

					<small>
						Don't have an account? sign up
						<Link to="/signup"> here</Link>
					</small>
				</form>
			</Grid>
			<Grid item sm></Grid>
		</Grid>
	);
};

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	ui: state.ui,
});

const mapActionsToProps = {
	loginUser,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Login));
