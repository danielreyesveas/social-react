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
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
	...theme.styles,
});

class login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
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

		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(userData, this.props.history);
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
						Login
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
							Login
							{loading && (
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
	}
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	ui: state.ui,
});

const mapActionsToProps = {
	loginUser,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(login));
