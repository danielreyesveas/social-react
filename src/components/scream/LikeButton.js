import React, { Component } from "react";
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

class LikeButton extends Component {
	likedScream = () => {
		return (
			this.props.user.likes &&
			this.props.user.likes.find(
				(like) => like.screamId === this.props.screamId
			)
		);
	};

	likeScream = () => {
		this.props.likeScream(this.props.screamId);
	};

	unlikeScream = () => {
		this.props.unlikeScream(this.props.screamId);
	};

	render() {
		const { authenticated } = this.props.user;

		const likeButton = !authenticated ? (
			<Link to="/login">
				<CustomButton tip="Like">
					<FavoriteBorderIcon color="primary" />
				</CustomButton>
			</Link>
		) : this.likedScream() ? (
			<CustomButton tip="Undo like" onClick={this.unlikeScream}>
				<FavoriteIcon color="primary" />
			</CustomButton>
		) : (
			<CustomButton tip="Like" onClick={this.likeScream}>
				<FavoriteBorderIcon color="primary" />
			</CustomButton>
		);

		return likeButton;
	}
}

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
