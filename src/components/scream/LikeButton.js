import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

// Components
import CustomButton from "../../utils/CustomButton";

// Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

const LikeButton = (props) => {
	const { user, screamId, likeScream, unlikeScream } = props;
	const { authenticated } = user;

	const likedScream = () => {
		return (
			user.likes && user.likes.find((like) => like.screamId === screamId)
		);
	};

	const handleLikeScream = () => {
		likeScream(screamId);
	};

	const handleUnlikeScream = () => {
		unlikeScream(screamId);
	};

	const likeButton = !authenticated ? (
		<Link to="/login">
			<CustomButton tip="Like">
				<FavoriteBorderIcon color="primary" />
			</CustomButton>
		</Link>
	) : likedScream() ? (
		<CustomButton tip="Undo like" onClick={handleUnlikeScream}>
			<FavoriteIcon color="primary" />
		</CustomButton>
	) : (
		<CustomButton tip="Like" onClick={handleLikeScream}>
			<FavoriteBorderIcon color="primary" />
		</CustomButton>
	);

	return likeButton;
};

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
