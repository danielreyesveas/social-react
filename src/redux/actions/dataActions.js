import axios from "axios";
import {
	SET_SCREAMS,
	SET_SCREAM,
	LOADING_DATA,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	DELETE_SCREAM,
} from "../types";

export const getScreams = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get("/screams")
		.then((response) => {
			dispatch({ type: SET_SCREAMS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: SET_SCREAMS, payload: [] });
		});
};

export const likeScream = (screamId) => (dispatch) => {
	axios
		.get(`/scream/${screamId}/like`)
		.then((response) => {
			dispatch({ type: LIKE_SCREAM, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const unlikeScream = (screamId) => (dispatch) => {
	axios
		.get(`/scream/${screamId}/unlike`)
		.then((response) => {
			dispatch({ type: UNLIKE_SCREAM, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const deleteScream = (screamId) => (dispatch) => {
	axios
		.delete(`/scream/${screamId}`)
		.then(() => {
			dispatch({ type: DELETE_SCREAM, payload: screamId });
		})
		.catch((error) => {
			console.error(error);
		});
};
