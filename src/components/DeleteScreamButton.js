import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// Icons
import { DeleteOutline } from "@material-ui/icons";

// Redux
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";

// Components
import CustomButton from "../utils/CustomButton";
import { Button } from "@material-ui/core";

const styles = {
	deleteButton: {
		position: "absolute",
		left: "90%",
		top: "10%",
	},
};

class DeleteScreamButton extends Component {
	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({
			open: true,
		});
	};

	handleClose = () => {
		this.setState({
			open: false,
		});
	};

	handleDelete = () => {
		this.props.deleteScream(this.props.screamId);
		this.setState({
			open: false,
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<>
				<CustomButton
					tip="Delete Scream"
					onClick={this.handleOpen}
					btnClassName={classes.deleteButton}
				>
					<DeleteOutline color="secondary" />
				</CustomButton>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>
						Are you sure you want to delete this scream?
					</DialogTitle>

					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.deleteScream} color="secondary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}
}

DeleteScreamButton.propTypes = {
	deleteScream: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
};
const mapActionsToProps = {
	deleteScream,
};

export default connect(
	null,
	mapActionsToProps
)(withStyles(styles)(DeleteScreamButton));
