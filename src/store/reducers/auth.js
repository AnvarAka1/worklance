import * as actionTypes from "../actions/actionTypes";

const initialState = {
	id: null,
	token: null,
	role: null,
	error: null,
	email: "",
	name: "",
	avatar: "",
	profession: null,
	password: "",
	formFlush: false,
	profileHasUpdated: false,
	loading: false
};

const authFormFlush = (state, action) => {
	return {
		...state,
		formFlush: false
	};
};
// fill all the parameters of the user
const authSuccess = (state, action) => {
	return {
		...state,
		id: action.id,
		token: action.token,
		role: action.role,
		name: action.name,
		email: action.email,
		avatar: action.avatar,
		password: action.password,
		profession: action.profession,
		error: null,
		formFlush: true,
		loading: false
	};
};

// error
const authFail = (state, action) => {
	return {
		...state,
		error: action.error,
		loading: false
	};
};

//clear error in global user state
const authStart = (state, action) => {
	return {
		...state,
		error: null,
		loading: true
	};
};
const authAvatarChange = (state, action) => {
	return {
		...state,
		avatar: action.avatar,
		profileHasUpdated: true
	};
};
// clear everything
const authLogout = (state, action) => {
	return {
		...state,
		id: null,
		token: null,
		role: null,
		error: null,
		email: "",
		profession: null,
		name: "",
		avatar: "",
		password: ""
	};
};
const authProfileUpdate = (state, action) => {
	return {
		...state,
		role: action.role,
		avatar: action.avatar,
		name: action.name,
		profileHasUpdated: true
	};
};
const authResetProfileUpdated = (state, action) => {
	return {
		...state,
		profileHasUpdated: false
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_AVATAR_CHANGE:
			return authAvatarChange(state, action);
		case actionTypes.AUTH_PROFILE_UPDATE:
			return authProfileUpdate(state, action);
		case actionTypes.AUTH_RESET_PROFILE_UPDATED:
			return authResetProfileUpdated(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.AUTH_FORM_FLUSH:
			return authFormFlush(state, action);
		default:
			return state;
	}
};
export default reducer;
