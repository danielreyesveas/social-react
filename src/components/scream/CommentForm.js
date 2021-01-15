import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import { commentScream } from "../../redux/actions/dataActions";

const styles = (theme) => ({
	...theme.styles,
});

class CommentForm extends Component {
	state = {
		body: "",
		errors: {},
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.ui.errors) {
			this.setState({
				errors: nextProps.ui.errors,
			});
		}
		if (!nextProps.ui.errors && !nextProps.ui.loading) {
			this.setState({
				body: "",
			});
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.commentScream(this.props.screamId, {
			body: this.state.body,
		});
	};

	render() {
		const { classes, authenticated } = this.props;
		const errors = this.state.errors;

		const commentFormMarkup = authenticated ? (
			<Grid item sm={12} style={{ textAlign: "center" }}>
				<form onSubmit={this.handleSubmit}>
					<TextField
						name="body"
						type="text"
						label="Comment on Scream"
						error={!!errors.comment}
						helperText={errors.comment}
						value={this.state.body}
						onChange={this.handleChange}
						fullWidth
						className={classes.textField}
					/>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.submitButton}
					>
						Submit
					</Button>

					<hr className={classes.visibleSeparator} />
				</form>
			</Grid>
		) : null;
		return commentFormMarkup;
	}
}

CommentForm.propTypes = {
	ui: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	screamId: PropTypes.string.isRequired,
	commentScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	ui: state.ui,
	authenticated: state.user.authenticated,
});

const mapActionsToProps = {
	commentScream,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(CommentForm));
