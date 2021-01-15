import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

// material-ui
import Grid from "@material-ui/core/Grid";

// Components
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../utils/ScreamSkeleton";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
	state = {
		profile: null,
		screamIdParam: null,
	};

	componentDidMount() {
		const handle = this.props.match.params.handle;
		const screamId = this.props.match.params.screamId;

		if (screamId) {
			this.setState({ screamIdParam: screamId });
		}
		this.props.getUserData(handle);

		axios
			.get(`/user/${handle}`)
			.then((response) => {
				this.setState({
					profile: response.data.user,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		const { screams, loading } = this.props.data;
		const { screamIdParam } = this.state;

		const screamsMarkup = loading ? (
			<ScreamSkeleton />
		) : screams === null ? (
			<p>No Screams from this user.</p>
		) : !screamIdParam ? (
			screams.map((scream) => (
				<Scream key={scream.screamId} scream={scream} />
			))
		) : (
			screams.map((scream) => {
				if (scream.screamId !== screamIdParam) {
					return <Scream key={scream.screamId} scream={scream} />;
				} else {
					return (
						<Scream
							key={scream.screamId}
							scream={scream}
							openDialog
						/>
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
					{this.state.profile ? (
						<StaticProfile profile={this.state.profile} />
					) : (
						<p>Loading profile...</p>
					)}
				</Grid>
			</Grid>
		);
	}
}

user.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

const mapActionsToProps = {
	getUserData,
};

export default connect(mapStateToProps, mapActionsToProps)(user);
