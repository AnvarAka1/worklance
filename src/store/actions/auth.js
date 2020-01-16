import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";
export const authLoading = () => {
	return {
		type: actionTypes.AUTH_LOADING
	};
};
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};
export const authFormFlush = () => {
	return {
		type: actionTypes.AUTH_FORM_FLUSH
	};
};
export const authSuccess = (token, id, role, email, avatar, name, profession, password) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		id: id,
		token: token,
		role: role,
		email: email,
		name: name,
		avatar: avatar,
		profession: profession,
		password: password,
		formFlush: true,
		loading: false
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
		loading: false
	};
};
export const authAvatarChange = avatar => {
	return {
		type: actionTypes.AUTH_AVATAR_CHANGE,
		avatar: avatar
	};
};
export const authProfileUpdate = (avatar, name, role) => {
	return {
		type: actionTypes.AUTH_PROFILE_UPDATE,
		avatar: avatar,
		name: name,
		role: role
	};
};
export const authResetProfileUpdated = () => {
	return {
		type: actionTypes.AUTH_RESET_PROFILE_UPDATED
	};
};
export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("id");
	localStorage.removeItem("role");
	localStorage.removeItem("profession");
	localStorage.removeItem("name");
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const auth = (fName, sName, email, password, role, isSignIn) => {
	email = email.trim();
	fName = isSignIn ? null : fName.trim();
	sName = isSignIn ? null : sName.trim();
	// const fullName = isSignIn && [ fName, sName ].join(" ");
	return dispatch => {
		// clear error
		dispatch(authStart());
		let formData = new FormData();
		formData.append("email", email);
		formData.append("fName", fName);
		formData.append("sName", sName);
		formData.append("password", password);
		formData.append("role", +role);

		formData.append("returnSecureToken", true);
		const urls = [ "/register", "/login" ];
		let message = null;
		axios
			.post(urls[+isSignIn], formData)
			.then(response => {
				message = response.data.message;
				const data = response.data.auth;
				const userData = response.data.user;

				// expiration date in milliseconds
				const expirationDate = new Date(new Date().getTime() + data.expires_in * 1000);
				// need to save TO THE CACHE instead of localStorage
				const token = userData.provider_id ? data.access_token : "Bearer " + data.access_token;
				localStorage.setItem("token", token);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("id", userData.id);
				localStorage.setItem("name", userData.fullname);
				localStorage.setItem("role", userData.role);

				localStorage.setItem(
					"profession",
					+userData.role ? response.data.userdata.company : userData.user_position
				);

				dispatch(
					authSuccess(
						token,
						userData.id,
						role,
						email,
						userData.avatar,
						userData.fullname,
						// response.data.userdata.user_position,
						userData.user_position,
						password
					)
				);
				dispatch(checkAuthTimeout(data.expires_in));
				if (response.data.status === "error") dispatch(authFail(response.data.message));
			})
			.catch(error => {
				console.log(error);
				dispatch(authFail(message));
			});
	};
};
export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authCheckState = () => {
	return dispatch => {
		dispatch(authLoading());
		const token = localStorage.getItem("token");
		const id = localStorage.getItem("id");
		const role = localStorage.getItem("role");
		const name = localStorage.getItem("name");
		let avatar = null;
		const url = +role === 1 ? "/client" : "/user";
		let profession = null;
		axios
			.get(`${url}/current`, {
				headers: {
					Authorization: `${token}`
				}
			})
			.then(res => {
				avatar = +role === 1 ? res.data.clients.avatar : res.data.userdatas.avatar;
				profession = +role === 1 ? res.data.clients.company : res.data.userdatas.user_position;
				localStorage.setItem("profession", profession);

				if (!token) {
					dispatch(logout());
				} else {
					const expirationDate = new Date(localStorage.getItem("expirationDate"));

					if (new Date() > expirationDate) {
						dispatch(logout());
					} else {
						const token = localStorage.getItem("token");
						// need to discuss this
						dispatch(authSuccess(token, id, role, null, avatar, name, profession, null));
						dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
					}
				}
			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};
