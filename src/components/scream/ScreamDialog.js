import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

// Components
import CustomButton from "../../utils/CustomButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = (theme) => ({
	...theme.styles,
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: "50%",
		objectFit: "cover",
	},
	dialogContent: {
		padding: 20,
	},
	closeButton: {
		position: "absolute",
		left: "90%",
	},
	expandButton: {
		position: "absolute",
		left: "90%",
	},
	spinnerDiv: {
		textAlign: "center",
		marginTop: 50,
		marginBottom: 50,
	},
});

const initialPathState = {
	old: "",
	current: "",
};

const ScreamDialog = (props) => {
	const {
		classes,
		scream: {
			screamId,
			body,
			createdAt,
			likeCount,
			comments,
			commentCount,
			userImage,
			userHandle,
		},
		dialogScreamId,
		dialogUserHandle,
		ui: { loading },
		openDialog,
		getScream,
		clearErrors,
	} = props;

	const [open, setOpen] = useState(false);
	const [path, setPath] = useState(initialPathState);

	useEffect(() => {
		if (!!openDialog) {
			console.log(openDialog);
			handleOpen();
		}
		// eslint-disable-next-line
	}, []);

	const handleOpen = () => {
		let old = window.location.pathname;
		const current = `/users/${dialogUserHandle}/scream/${dialogScreamId}`;

		if (old === current) {
			old = `/users/${dialogUserHandle}`;
		}

		window.history.pushState(null, null, current);

		setPath({
			old,
			current,
		});
		setOpen(true);
		getScream(dialogScreamId);
	};

	const handleClose = () => {
		window.history.pushState(null, null, path.old);
		setOpen(false);
		clearErrors();
	};

	const dialogMarkup = loading ? (
		<div className={classes.spinnerDiv}>
			<CircularProgress size={200} thickness={2} />
		</div>
	) : (
		<Grid container spacing={2}>
			<Grid item sm={5}>
				<img
					src={userImage}
					alt="Profile"
					className={classes.profileImage}
				/>
			</Grid>

			<Grid item sm={7}>
				<Typography
					component={Link}
					color="primary"
					variant="h5"
					to={`/users/${userHandle}`}
				>
					@{userHandle}
				</Typography>

				<hr className={classes.invisibleSeparator} />

				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
				</Typography>

				<hr className={classes.invisibleSeparator} />

				<Typography variant="body1">{body}</Typography>

				<LikeButton screamId={screamId} />

				<span>{likeCount} likes</span>

				<CustomButton tip="Comments">
					<ChatIcon color="primary" />
				</CustomButton>

				<span>{commentCount} comments</span>
			</Grid>

			<hr className={classes.visibleSeparator} />

			<CommentForm screamId={screamId} />

			<Comments comments={comments} />
		</Grid>
	);

	return (
		<>
			<CustomButton
				onClick={handleOpen}
				tip="Expand Scream"
				tipClassName={classes.expandButton}
			>
				<VisibilityIcon color="primary" />
			</CustomButton>

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<CustomButton
					tip="Close"
					onClick={handleClose}
					tipClassName={classes.closeButton}
				>
					<CloseIcon />
				</CustomButton>

				<DialogTitle>Scream</DialogTitle>

				<DialogContent className={classes.dialogContent}>
					{dialogMarkup}
				</DialogContent>
			</Dialog>
		</>
	);
};

ScreamDialog.propTypes = {
	dialogScreamId: PropTypes.string.isRequired,
	dialogUserHandle: PropTypes.string.isRequired,
	openDialog: PropTypes.bool,
	getScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	scream: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	scream: state.data.scream,
	ui: state.ui,
});

const mapActionsToProps = {
	getScream,
	clearErrors,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(ScreamDialog));
