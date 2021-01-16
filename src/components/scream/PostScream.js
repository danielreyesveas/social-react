import React, { useState, useEffect } from "react";
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

const initialScreamState = {
	body: "",
};

const PostScream = (props) => {
	const { classes, ui, clearErrors, postScream } = props;

	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState({});
	const [scream, setScream] = useState(initialScreamState);

	useEffect(() => {
		if (ui.errors) {
			setErrors(ui.errors);
		}
		if (!ui.errors && !ui.loading) {
			setErrors({});
			setOpen(false);
			setScream(initialScreamState);
		}
	}, [ui.errors, ui.loading]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		clearErrors();
		setOpen(false);
	};

	const handleChange = (event) => {
		setScream({
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		postScream(scream);
	};

	return (
		<>
			<CustomButton onClick={handleOpen} tip="Post a Scream">
				<AddIcon color="primary" />
			</CustomButton>

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<CustomButton
					tip="Close"
					onClick={handleClose}
					tipClassName={classes.closeButton}
				>
					<CloseIcon />
				</CustomButton>

				<DialogTitle>Post a new Scream</DialogTitle>

				<DialogContent>
					<form onSubmit={handleSubmit}>
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
							onChange={handleChange}
							fullWidth
						/>

						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.submitButton}
							disabled={ui.loading}
						>
							Submit
							{ui.loading && (
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
};

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
