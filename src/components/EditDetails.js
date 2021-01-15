import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Icons
import EditIcon from "@material-ui/icons/Edit";

// Redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

// Components
import CustomButton from "../utils/CustomButton";

const styles = (theme) => ({
	...theme.styles,
	editButton: {
		float: "right",
	},
});

class EditDetails extends Component {
	state = {
		bio: "",
		website: "",
		location: "",
		open: false,
	};

	mapUserDetailsToState = (credentials) => {
		this.setState({
			bio: credentials.bio ? credentials.bio : "",
			website: credentials.website ? credentials.website : "",
			location: credentials.location ? credentials.location : "",
		});
	};

	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	}

	handleClose = () => {
		this.setState({
			open: false,
		});
	};

	handleOpen = () => {
		const { credentials } = this.props;
		this.setState({
			open: true,
		});
		this.mapUserDetailsToState(credentials);
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = () => {
		const userDetails = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location,
		};

		this.props.editUserDetails(userDetails);
		this.handleClose();
	};

	render() {
		const { classes } = this.props;
		return (
			<>
				<CustomButton
					tip="Edit details"
					onClick={this.handleOpen}
					btnClassName={classes.editButton}
				>
					<EditIcon color="primary" />
				</CustomButton>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>Edit your details</DialogTitle>

					<DialogContent>
						<form>
							<TextField
								name="bio"
								type="text"
								label="Bio"
								multiline
								rows="3"
								placeholder="A short bio about yourself."
								className={classes.textField}
								value={this.state.bio}
								onChange={this.handleChange}
								fullWidth
							></TextField>

							<TextField
								name="website"
								type="text"
								label="website"
								placeholder="Your personal/professional website."
								className={classes.textField}
								value={this.state.website}
								onChange={this.handleChange}
								fullWidth
							></TextField>

							<TextField
								name="location"
								type="text"
								label="location"
								placeholder="Where you live."
								className={classes.textField}
								value={this.state.location}
								onChange={this.handleChange}
								fullWidth
							></TextField>
						</form>
					</DialogContent>

					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>

						<Button onClick={this.handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}
}

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	credentials: state.user.credentials,
});

const mapActionsToProps = {
	editUserDetails,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(EditDetails));
