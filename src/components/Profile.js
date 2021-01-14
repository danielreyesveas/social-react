import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

// Components
import EditDetails from "./EditDetails";

const styles = (theme) => ({
	paper: {
		padding: 20,
	},
	profile: {
		"& .image-wrapper": {
			textAlign: "center",
			position: "relative",
			"& button": {
				position: "absolute",
				top: "80%",
				left: "70%",
			},
		},
		"& .profile-image": {
			width: 200,
			height: 200,
			objectFit: "cover",
			maxWidth: "100%",
			borderRadius: "50%",
		},
		"& .profile-details": {
			textAlign: "center",
			"& span, svg": {
				verticalAlign: "middle",
			},
			"& a": {
				color: "#00bcd4",
			},
		},
		"& hr": {
			border: "none",
			margin: "0 0 10px 0",
		},
		"& svg.button": {
			"&:hover": {
				cursor: "pointer",
			},
		},
	},
	buttons: {
		textAlign: "center",
		"& a": {
			margin: "20px 10px",
		},
	},
});

class Profile extends Component {
	handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append("image", image, image.name);
		this.props.uploadImage(formData);
	};

	handleEditPicture = () => {
		const fileInput = document.getElementById("imageInput");
		fileInput.click();
	};

	handleLogout = () => {
		this.props.logoutUser();
	};

	render() {
		const {
			classes,
			user: {
				credentials: {
					handle,
					createdAt,
					imageUrl,
					bio,
					website,
					location,
				},
				authenticated,
				loading,
			},
		} = this.props;

		let profileMarkup = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div className={classes.profile}>
						<div className="image-wrapper">
							<img
								src={imageUrl}
								alt="profile"
								className="profile-image"
							/>

							<input
								type="file"
								id="imageInput"
								hidden="hidden"
								onChange={this.handleImageChange}
							/>

							<Tooltip
								title="Edit profile picture"
								placement="top"
							>
								<IconButton
									onClick={this.handleEditPicture}
									className="button"
								>
									<EditIcon color="primary" />
								</IconButton>
							</Tooltip>
						</div>

						<hr />

						<div className="profile-details">
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								color="primary"
								variant="h5"
							>
								@{handle}
							</MuiLink>

							<hr />

							{bio && (
								<Typography variant="body2">{bio}</Typography>
							)}

							<hr />

							{location && (
								<>
									<LocationOn color="primary" />{" "}
									<span>{location}</span>
								</>
							)}

							<hr />

							{website && (
								<>
									<LinkIcon color="primary" />
									<a
										href={website}
										target="_blank"
										rel="noopener noreferrer"
									>
										{"  "}
										{website}
									</a>
								</>
							)}

							<hr />

							<CalendarToday color="primary" />
							{"  "}
							<span>
								Joined {dayjs(createdAt).format("MMM YYYY")}
							</span>
						</div>

						<Tooltip title="Log Out" placement="top">
							<IconButton onClick={this.handleLogout}>
								<KeyboardReturn color="primary" />
							</IconButton>
						</Tooltip>

						<EditDetails />
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography variant="body2" align="center">
						No profile found, please login
					</Typography>
					<div className={classes.buttons}>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/login"
						>
							Login
						</Button>
						<Button
							variant="contained"
							color="secondary"
							component={Link}
							to="/signup"
						>
							Sign Up
						</Button>
					</div>
				</Paper>
			)
		) : (
			<p>loading...</p>
		);

		return profileMarkup;
	}
}

Profile.propTyes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Profile));