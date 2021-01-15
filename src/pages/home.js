import React, { Component } from "react";
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

class home extends Component {
	componentDidMount() {
		this.props.getScreams();
	}

	render() {
		const { screams, loading } = this.props.data;
		let recentsScreamsMarkup = loading ? (
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
	}
}

home.propTypes = {
	getScreams: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

const mapActionsToProps = {
	getScreams,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
