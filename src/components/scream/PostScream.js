import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

// Components
import CustomButton from "../../utils/CustomButton";

const styles = (theme) => ({
	...theme.styles,
	closeButton: {
		position: "absolute",
		left: "91%",
		top: "6%",
	},
	submitButton: {
		position: "relative",
		float: "right",
		marginTop: 10,
	},
});

class PostScream extends Component {
	state = {
		open: false,
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
				open: false,
				errors: {},
			});
		}
	}

	handleOpen = () => {
		this.setState({
			open: true,
		});
	};

	handleClose = () => {
		this.props.clearErrors();
		this.setState({
			open: false,
			errors: {},
		});
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.postScream({
			body: this.state.body,
		});
	};

	render() {
		const { errors } = this.state;
		const {
			classes,
			ui: { loading },
		} = this.props;

		return (
			<>
				<CustomButton onClick={this.handleOpen} tip="Post a Scream">
					<AddIcon color="primary" />
				</CustomButton>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<CustomButton
						tip="Close"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon />
					</CustomButton>

					<DialogTitle>Post a new Scream</DialogTitle>

					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								id="body"
								type="text"
								body="Scream..."
								multiline
								rows="3"
								placeholder="Scream at your fellow apes..."
								error={!!errors.body}
								helperText={errors.body}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>

							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progress}
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</>
		);
	}
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	ui: state.ui,
});

const mapActionsToProps = {
	postScream,
	clearErrors,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(PostScream));
