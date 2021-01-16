import React, { useState, useEffect } from "react";
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
import { editUserDetails } from "../../redux/actions/userActions";

// Components
import CustomButton from "../../utils/CustomButton";

const styles = (theme) => ({
	...theme.styles,
	editButton: {
		float: "right",
	},
});

const EditDetails = (props) => {
	const { classes, credentials, editUserDetails } = props;

	const [userDetails, setUserDetails] = useState({
		bio: "",
		website: "",
		location: "",
	});
	const [open, setOpen] = useState(false);

	const mapUserDetailsToState = (credentials) => {
		setUserDetails({
			bio: credentials.bio ? credentials.bio : "",
			website: credentials.website ? credentials.website : "",
			location: credentials.location ? credentials.location : "",
		});
	};

	useEffect(() => {
		mapUserDetailsToState(credentials);
	}, [credentials]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
		mapUserDetailsToState(credentials);
	};

	const handleChange = (event) => {
		setUserDetails({
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = () => {
		editUserDetails(userDetails);
		handleClose();
	};

	return (
		<>
			<CustomButton
				tip="Edit details"
				onClick={handleOpen}
				btnClassName={classes.editButton}
			>
				<EditIcon color="primary" />
			</CustomButton>

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
							value={userDetails.bio}
							onChange={handleChange}
							fullWidth
						></TextField>

						<TextField
							name="website"
							type="text"
							label="website"
							placeholder="Your personal/professional website."
							className={classes.textField}
							value={userDetails.website}
							onChange={handleChange}
							fullWidth
						></TextField>

						<TextField
							name="location"
							type="text"
							label="location"
							placeholder="Where you live."
							className={classes.textField}
							value={userDetails.location}
							onChange={handleChange}
							fullWidth
						></TextField>
					</form>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>

					<Button onClick={handleSubmit} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

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
