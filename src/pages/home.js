import React, { useEffect } from "react";
import PropTypes from "prop-types";

// material-ui
import Grid from "@material-ui/core/Grid";

// Components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../utils/ScreamSkeleton";

// Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const Home = (props) => {
	const {
		data: { screams, loading },
		getScreams,
	} = props;

	useEffect(() => {
		getScreams();
	}, [getScreams]);

	const recentsScreamsMarkup = loading ? (
		<ScreamSkeleton />
	) : (
		screams.map((scream) => (
			<Scream key={scream.screamId} scream={scream} />
		))
	);

	return (
		<Grid container spacing={2}>
			<Grid item sm={8} xs={12}>
				{recentsScreamsMarkup}
			</Grid>

			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>
	);
};

Home.propTypes = {
	getScreams: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

const mapActionsToProps = {
	getScreams,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
