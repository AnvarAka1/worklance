import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";
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
export const authSuccess = (token, id, role, email, avatar, name, password) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		id: id,
		token: token,
		role: role,
		email: email,
		name: name,
		avatar: null,
		password: password,
		formFlush: true
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};
export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
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
				console.log(response);
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
				dispatch(authSuccess(token, userData.id, role, email, userData.avatar, userData.fullname, password));
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
	console.log("something");
	return dispatch => {
		console.log("Here");
		const token = localStorage.getItem("token");
		const id = localStorage.getItem("id");
		const role = localStorage.getItem("role");
		const name = localStorage.getItem("name");
		console.log(name);
		// const avatar = localStorage.getItem("avatar");
		let avatar = null;

		axios
			.get(`/user/current`, {
				headers: {
					Authorization: `${token}`
				}
			})
			.then(res => {
				avatar = res.data.avatar;
				if (!token) {
					dispatch(logout());
				} else {
					const expirationDate = new Date(localStorage.getItem("expirationDate"));
					console.log(res);
					if (new Date() > expirationDate) {
						dispatch(logout());
					} else {
						const token = localStorage.getItem("token");
						// need to discuss this
						dispatch(authSuccess(token, id, role, null, avatar, name, null));
						dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
					}
				}
			})
			.catch(err => console.log(err));
	};
};
