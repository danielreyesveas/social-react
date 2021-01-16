import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";

// Components
import CustomButton from "../../utils/CustomButton";
import DeleteScreamButton from "./DeleteScreamButton";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const styles = (theme) => ({
	...theme.styles,
	card: {
		position: "relative",
		display: "flex",
		marginBottom: 20,
	},
	image: {
		minWidth: 200,
	},
	content: {
		padding: 25,
		objectFit: "cover",
	},
});

dayjs.extend(relativeTime);

const Scream = (props) => {
	const {
		classes,
		scream: {
			screamId,
			body,
			createdAt,
			userImage,
			userHandle,
			likeCount,
			commentCount,
		},
		user: {
			authenticated,
			credentials: { handle },
		},
		openDialog,
	} = props;

	const deleteButton =
		authenticated && userHandle === handle ? (
			<DeleteScreamButton screamId={screamId} />
		) : null;

	return (
		<Card className={classes.card}>
			<CardMedia
				image={userImage}
				title="Profile image"
				className={classes.image}
			/>
			<CardContent className={classes.content}>
				<Typography
					variant="h5"
					component={Link}
					to={`/users/${userHandle}`}
					color="primary"
				>
					{userHandle}
				</Typography>

				{deleteButton}

				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).fromNow()}
				</Typography>

				<Typography variant="body1">{body}</Typography>

				<LikeButton screamId={screamId} />

				<span>{likeCount} likes</span>

				<CustomButton tip="Comments">
					<ChatIcon color="primary" />
				</CustomButton>

				<span>{commentCount} comments</span>

				<ScreamDialog
					dialogScreamId={screamId}
					dialogUserHandle={userHandle}
					openDialog={openDialog}
				/>
			</CardContent>
		</Card>
	);
};

Scream.propTypes = {
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
