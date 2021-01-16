import {
	SET_SCREAMS,
	SET_SCREAM,
	POST_SCREAM,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	COMMENT_SCREAM,
	DELETE_SCREAM,
	LOADING_DATA,
} from "../types";

const initialState = {
	screams: [],
	scream: {},
	loading: false,
};

let index;

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_SCREAMS:
			return {
				...state,
				screams: action.payload,
				loading: false,
			};
		case SET_SCREAM:
			return {
				...state,
				scream: action.payload,
				loading: false,
			};
		case LIKE_SCREAM:
		case UNLIKE_SCREAM:
			index = state.screams.findIndex(
				(scream) => scream.screamId === action.payload.screamId
			);
			state.screams[index] = action.payload;
			if (state.scream.screamId === action.payload.screamId) {
				state.scream = action.payload;
			}
			return {
				...state,
			};
		case DELETE_SCREAM:
			index = state.screams.findIndex(
				(scream) => scream.screamId === action.payload
			);
			state.screams.splice(index, 1);
			return {
				...state,
			};
		case POST_SCREAM:
			return {
				...state,
				screams: [action.payload, ...state.screams],
			};
		case COMMENT_SCREAM:
			return {
				...state,
				scream: {
					...state.scream,
					comments: [action.payload, ...state.scream.comments],
				},
			};
		default:
			return state;
	}
};

export default dataReducer;
