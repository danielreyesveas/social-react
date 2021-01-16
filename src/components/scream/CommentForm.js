import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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

const CommentForm = (props) => {
	const { classes, authenticated, screamId, ui, commentScream } = props;

	const [userDetails, setUserDetails] = useState({
		body: "",
	});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (ui.errors) {
			setErrors(ui.errors);
		}
		if (!ui.errors && !ui.loading) {
			setUserDetails({
				body: "",
			});
		}
	}, [ui.errors, ui.loading]);

	const handleChange = (event) => {
		setUserDetails({
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		commentScream(screamId, userDetails);
	};

	const commentFormMarkup = authenticated ? (
		<Grid item sm={12} style={{ textAlign: "center" }}>
			<form onSubmit={handleSubmit}>
				<TextField
					name="body"
					type="text"
					label="Comment on Scream"
					error={!!errors.comment}
					helperText={errors.comment}
					value={userDetails.body}
					onChange={handleChange}
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
};

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
