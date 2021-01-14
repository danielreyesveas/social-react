import React, { Component } from "react";
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

class signup extends Component {
	constructor() {
		super();

		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			handle: "",
			errors: {},
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.ui.errors) {
			this.setState({ errors: nextProps.ui.errors });
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle,
		};

		this.props.signupUser(newUserData, this.props.history);
	};

	render() {
		const {
			classes,
			ui: { loading },
		} = this.props;
		const { errors } = this.state;

		return (
			<Grid container className={classes.form}>
				<Grid item sm></Grid>
				<Grid item sm>
					<img
						src={AppIcon}
						alt="App icon"
						className={classes.appIcon}
					/>

					<Typography variant="h2" className={classes.pageTitle}>
						Sign Up
					</Typography>

					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							className={classes.textField}
							error={!!errors.email}
							fullWidth
							helperText={errors.email}
							id="email"
							label="Email"
							name="email"
							onChange={this.handleChange}
							type="email"
							value={this.state.email}
						/>

						<TextField
							className={classes.textField}
							error={!!errors.password}
							fullWidth
							helperText={errors.password}
							id="password"
							label="Password"
							name="password"
							onChange={this.handleChange}
							type="password"
							value={this.state.password}
						/>

						<TextField
							className={classes.textField}
							error={!!errors.confirmPassword}
							fullWidth
							helperText={errors.confirmPassword}
							id="confirmPassword"
							label="Confirm Password"
							name="confirmPassword"
							onChange={this.handleChange}
							type="password"
							value={this.state.confirmPassword}
						/>

						<TextField
							className={classes.textField}
							error={!!errors.handle}
							fullWidth
							helperText={errors.handle}
							id="handle"
							label="Handle"
							name="handle"
							onChange={this.handleChange}
							type="text"
							value={this.state.handle}
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
							disabled={loading}
							type="submit"
							variant="contained"
						>
							Sign Up
							{loading && (
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
	}
}

signup.propTypes = {
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
)(withStyles(styles)(signup));
