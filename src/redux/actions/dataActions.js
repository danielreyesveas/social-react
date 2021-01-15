import axios from "axios";
import {
	LOADING_UI,
	STOP_LOADING_UI,
	SET_SCREAMS,
	SET_SCREAM,
	POST_SCREAM,
	LOADING_DATA,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	COMMENT_SCREAM,
	DELETE_SCREAM,
	SET_ERRORS,
	CLEAR_ERRORS,
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

export const getScream = (screamId) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/scream/${screamId}`)
		.then((response) => {
			dispatch({ type: SET_SCREAM, payload: response.data });
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const postScream = (newScream) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post("/scream", newScream)
		.then((response) => {
			dispatch({ type: POST_SCREAM, payload: response.data });
			dispatch(clearErrors());
		})
		.catch((error) => {
			dispatch({ type: SET_ERRORS, payload: error.response.data });
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

export const commentScream = (screamId, commentData) => (dispatch) => {
	axios
		.post(`/scream/${screamId}/comment`, commentData)
		.then((response) => {
			dispatch({
				type: COMMENT_SCREAM,
				payload: response.data,
			});
			dispatch(clearErrors());
		})
		.catch((error) => {
			dispatch({ type: SET_ERRORS, payload: error.response.data });
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

export const getUserData = (userHandle) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/user/${userHandle}`)
		.then((response) => {
			dispatch({ type: SET_SCREAMS, payload: response.data.screams });
		})
		.catch((error) => {
			dispatch({ type: SET_SCREAMS, payload: null });
		});
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
