import React, { Component } from "react";
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
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

// Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

// Components
import CustomButton from "../utils/CustomButton";
import DeleteScreamButton from "./DeleteScreamButton";

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

class Scream extends Component {
	likedScream = () => {
		return (
			this.props.user.likes &&
			this.props.user.likes.find(
				(like) => like.screamId === this.props.scream.screamId
			)
		);
	};

	likeScream = () => {
		this.props.likeScream(this.props.scream.screamId);
	};

	unlikeScream = () => {
		this.props.unlikeScream(this.props.scream.screamId);
	};

	render() {
		dayjs.extend(relativeTime);

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
		} = this.props;

		const likeButton = !authenticated ? (
			<CustomButton tip="Like">
				<Link to="/login">
					<FavoriteBorderIcon color="primary" />
				</Link>
			</CustomButton>
		) : this.likedScream() ? (
			<CustomButton tip="Undo like" onClick={this.unlikeScream}>
				<FavoriteIcon color="primary" />
			</CustomButton>
		) : (
			<CustomButton tip="Like" onClick={this.likeScream}>
				<FavoriteBorderIcon color="primary" />
			</CustomButton>
		);

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

					{likeButton}

					<span>{likeCount} likes</span>

					<CustomButton tip="Comments">
						<ChatIcon color="primary" />
					</CustomButton>

					<span>{commentCount} comments</span>
				</CardContent>
			</Card>
		);
	}
}

Scream.propTypes = {
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = {
	likeScream,
	unlikeScream,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Scream));
