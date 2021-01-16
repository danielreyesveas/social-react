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
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
	...theme.styles,
});

const initialUserData = {
	email: "",
	password: "",
	confirmPassword: "",
	handle: "",
};

const Signup = (props) => {
	const { history, classes, ui, signupUser } = props;

	const [userData, setUserData] = useState(initialUserData);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (ui.errors) {
			setErrors(ui.errors);
		}
	}, [ui.errors]);

	const handleChange = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		signupUser(userData, history);
	};

	return (
		<Grid container className={classes.form}>
			<Grid item sm></Grid>

			<Grid item sm>
				<img src={AppIcon} alt="App icon" className={classes.appIcon} />

				<Typography variant="h2" className={classes.pageTitle}>
					Sign Up
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

					<TextField
						className={classes.textField}
						error={!!errors.confirmPassword}
						fullWidth
						helperText={errors.confirmPassword}
						id="confirmPassword"
						label="Confirm Password"
						name="confirmPassword"
						onChange={handleChange}
						type="password"
						value={userData.confirmPassword}
					/>

					<TextField
						className={classes.textField}
						error={!!errors.handle}
						fullWidth
						helperText={errors.handle}
						id="handle"
						label="Handle"
						name="handle"
						onChange={handleChange}
						type="text"
						value={userData.handle}
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
						Sign Up
						{ui.loading && (
							<CircularProgress
								className={classes.progress}
								size={30}
							/>
						)}
					</Button>

					<br />

					<small>
						Already have an account? login
						<Link to="/login"> here</Link>
					</small>
				</form>
			</Grid>
			<Grid item sm></Grid>
		</Grid>
	);
};

Signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	ui: state.ui,
});

const mapActionsToProps = {
	signupUser,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Signup));
