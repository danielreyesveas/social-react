import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// material-ui
import Grid from "@material-ui/core/Grid";

// Components
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../utils/ScreamSkeleton";
import ProfileSkeleton from "../utils/ProfileSkeleton";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

const User = (props) => {
	const { data, getUserData } = props;
	const { handle, screamId } = props.match.params;

	const [profile, setProfile] = useState(null);
	const [screamIdParam, setScreamIdParam] = useState(null);

	useEffect(() => {
		if (screamId) {
			setScreamIdParam(screamId);
		}
		getUserData(handle);

		axios
			.get(`/user/${handle}`)
			.then((response) => {
				setProfile(response.data.user);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [getUserData, handle, screamId]);

	const screamsMarkup = data.loading ? (
		<ScreamSkeleton />
	) : data.screams === null ? (
		<p>No Screams from this user.</p>
	) : !screamIdParam ? (
		data.screams.map((scream) => (
			<Scream key={scream.screamId} scream={scream} />
		))
	) : (
		data.screams.map((scream) => {
			if (scream.screamId !== screamIdParam) {
				return <Scream key={scream.screamId} scream={scream} />;
			} else {
				return (
					<Scream key={scream.screamId} scream={scream} openDialog />
				);
			}
		})
	);

	return (
		<Grid container spacing={2}>
			<Grid item sm={8} xs={12}>
				{screamsMarkup}
			</Grid>

			<Grid item sm={4} xs={12}>
				{profile ? (
					<StaticProfile profile={profile} />
				) : (
					<ProfileSkeleton />
				)}
			</Grid>
		</Grid>
	);
};

User.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

const mapActionsToProps = {
	getUserData,
};

export default connect(mapStateToProps, mapActionsToProps)(User);
