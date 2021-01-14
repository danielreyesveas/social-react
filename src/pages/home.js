import React, { Component } from "react";
import axios from "axios";

// material-ui
import Grid from "@material-ui/core/Grid";

// Components
import Scream from "../components/Scream";
import Profile from "../components/Profile";

class home extends Component {
	state = { screams: null };

	componentDidMount() {
		axios
			.get("/screams")
			.then((response) => {
				this.setState({
					screams: response.data,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		let recentsScreamsMarkup = this.state.screams ? (
			this.state.screams.map((scream) => (
				<Scream key={scream.screamId} scream={scream} />
			))
		) : (
			<p>Loading...</p>
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

export default home;
