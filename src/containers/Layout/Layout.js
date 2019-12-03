import React, { Component } from "react";
import NavigationItems from "../../components/NavigationItems/NavigationItems";
import Container from "@material-ui/core/Container";
import Modal from "../../components/UI/Modal/Modal";
import SignModal from "../../components/SignModal/SignModal";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import DialogModal from "../../components/DialogModal/DialogModal";

export class Layout extends Component {
	state = {
		form: {
			signIn: {
				email: {
					inputType: "input",
					config: {
						placeholder: "Эл. почта",
						type: "text"
					},
					value: ""
				},
				password: {
					inputType: "input",
					config: {
						placeholder: "Пароль",
						type: "password"
					},
					value: ""
				}
			},
			signUp: {
				fName: {
					inputType: "input",
					config: {
						placeholder: "Имя",
						type: "text"
					},
					value: ""
				},
				sName: {
					inputType: "input",
					config: {
						placeholder: "Фамилия",
						type: "text"
					},
					value: ""
				},
				email: {
					inputType: "input",
					config: {
						placeholder: "Эл. почта",
						type: "text"
					},
					value: ""
				},
				password: {
					inputType: "input",
					config: {
						placeholder: "Пароль",
						type: "password"
					},
					value: ""
				}
			},
			formIsValid: true
		},

		profile: null,
		isClient: false,
		signModalOpened: false,
		isSignIn: true,
		isAuthorizing: false,
		isRedirect: false,
		drawerLeft: false,
		logoutModalOpened: false
	};
	componentDidMount() {
		this.setState({ isAuthorizing: true });
	}
	componentDidUpdate() {
		if (this.state.isLogout) {
			this.setState({ isLogout: false });
		}
		//update profile after profile settings
		if (this.props.profileHasUpdated) {
			const profile = this.updateUserInfo();
			this.setState({ profile: profile });
			// resets profileHasUpdated in store
			this.props.onAuthResetProfileUpdated();
		}

		// update profile when authorizing
		if (this.props.isAuthorized && this.state.isAuthorizing) {
			const profile = this.updateUserInfo();
			const shouldRedirect = this.state.isSignIn ? false : true;
			this.setState({
				profile: profile,
				signModalOpened: false,
				isAuthorizing: false,
				isRedirect: shouldRedirect
			});
		}
		if (this.state.isRedirect) {
			this.setState({ isRedirect: false });
		}
	}
	updateUserInfo = () => {
		const role = +localStorage.getItem("role");
		const profession = localStorage.getItem("profession");
		const profile = {
			...this.state.profile,
			avatar: this.props.authAvatar,
			name: this.props.name,
			role: profession !== "null" ? profession : role
		};
		return profile;
	};
	drawerOpenedHandler = () => {
		this.setState({ drawerLeft: true });
	};
	drawerClosedHandler = () => {
		this.setState({ drawerLeft: false });
	};
	signModalOpenedHandler = () => {
		this.setState({ signModalOpened: true, isSignIn: true });
	};
	signModalClosedHandler = () => {
		this.setState({ signModalOpened: false });
	};
	inputChangedHandler = (event, inputIdentifier) => {
		// input is changed here
		const value = event.target.value;
		let form = { ...this.state.form };

		let signIn;
		let signUp;
		if (this.state.isSignIn) {
			signIn = {
				...form.signIn,
				[inputIdentifier]: form.signIn[inputIdentifier]
			};
			signIn[inputIdentifier].value = value;
			form.signIn = signIn;
		} else {
			signUp = {
				...form.signUp,
				[inputIdentifier]: form.signUp[inputIdentifier]
			};
			signUp[inputIdentifier].value = value;
			form.signUp = signUp;
		}

		this.setState({ form: form });
	};
	toggleClickedHandler = () => {
		this.setState(oldState => {
			return { isSignIn: !oldState.isSignIn };
		});
	};
	formSubmittedHandler = event => {
		// needs to be changed
		event.preventDefault();
		this.setState({ isAuthorizing: true });
		const { isSignIn, isClient } = this.state;
		if (isSignIn) {
			const { email, password } = this.state.form.signIn;
			this.props.onAuth(null, null, email.value, password.value, isClient, true);
		} else {
			const { fName, sName, email, password } = this.state.form.signUp;
			this.props.onAuth(fName.value, sName.value, email.value, password.value, isClient, false);
		}
	};
	roleClickedHandler = (event, isClient) => {
		this.setState({ isClient: isClient });
	};
	logoutModalClosedHandler = event => {
		event.preventDefault();
		this.setState({ logoutModalOpened: false });
	};
	logoutModalOpenedHandler = event => {
		event.preventDefault();
		this.setState({ logoutModalOpened: true });
	};
	logoutHandler = event => {
		this.setState({ isLogout: true });
		this.logoutModalClosedHandler(event);
	};
	responseGoogle = res => {
		// console.log(res);
		const userData = res.profileObj;
		// const el = res.El;
		const googleId = res.googleId;
		this.props.onAuthGoogle(userData.givenName, userData.email, googleId);
	};
	render() {
		const redirect = this.state.isLogout ? <Redirect to="/logout" /> : null;
		const content = {
			dialog: [ "Вы уверены, что хотите выйти?", "Are you sure you want to logout?", "Uzb" ]
		};
		return (
			<div style={{ position: "relative" }}>
				{redirect}
				{this.state.isRedirect ? <Redirect to={"/profile"} /> : null}

				<Modal scrollable open={this.state.signModalOpened} modalClosed={this.signModalClosedHandler}>
					<SignModal
						signModalClosed={this.signModalClosedHandler}
						roleClicked={this.roleClickedHandler}
						isClientSelected={this.state.isClient}
						toggle={this.toggleClickedHandler}
						isSignIn={this.state.isSignIn}
						changed={this.inputChangedHandler}
						form={this.state.form}
						submitted={this.formSubmittedHandler}
					/>
				</Modal>
				<DialogModal
					header={content.dialog}
					yesClicked={this.logoutHandler}
					open={this.state.logoutModalOpened}
					modalClosed={this.logoutModalClosedHandler}
				/>
				<NavigationItems
					logoutModalOpened={this.logoutModalOpenedHandler}
					drawerOpened={this.drawerOpenedHandler}
					isAuthorized={this.props.isAuthorized}
					signModalOpened={this.signModalOpenedHandler}
					signModalClosed={this.signModalClosedHandler}
					profile={this.state.profile}
				/>
				<Hidden mdUp>
					<Drawer open={this.state.drawerLeft} onClose={this.drawerClosedHandler} anchor="right">
						<NavigationItems
							isVertical
							logoutModalOpened={this.logoutModalOpenedHandler}
							drawerClosed={this.drawerClosedHandler}
							isAuthorized={this.props.isAuthorized}
							signModalOpened={this.signModalOpenedHandler}
							signModalClosed={this.signModalClosedHandler}
							profile={this.state.profile}
						/>
					</Drawer>
				</Hidden>
				<Container maxWidth="xl" style={{ paddingTop: "30px", paddingBottom: "60px" }}>
					{this.props.children}
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token !== null,
		isLoading: state.auth.loading,
		isFormFlush: state.auth.formFlush,
		hasError: state.auth.error,
		authAvatar: state.auth.avatar,
		role: state.auth.role,
		profession: state.auth.profession,
		name: state.auth.name,
		profileHasUpdated: state.auth.profileHasUpdated
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (name, surname, email, password, role, isSignIn) =>
			dispatch(actions.auth(name, surname, email, password, role, isSignIn)),
		onAuthResetProfileUpdated: () => dispatch(actions.authResetProfileUpdated()),
		onLogout: () => dispatch(actions.logout()),
		onFormFlush: () => dispatch(actions.authFormFlush())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
