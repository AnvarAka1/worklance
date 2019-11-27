import React, { Component } from "react";
import NavigationItems from "../../components/NavigationItems/NavigationItems";
import Container from "@material-ui/core/Container";
import Avatar from "../../assets/images/profile/avatar2.jpg";
import Modal from "../../components/UI/Modal/Modal";
import SignModal from "../../components/SignModal/SignModal";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import LogoutModal from "../../components/LogoutModal/LogoutModal";

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
		if (this.props.isAuthorized && this.state.isAuthorizing) {
			let profile;
			const role = +localStorage.getItem("role");
			const profession = localStorage.getItem("profession");

			profile = { ...this.state.profile };
			profile.avatar = this.props.authAvatar;
			profile.name = this.props.name;
			profile.role = profession !== "null" ? profession : role;
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

	render() {
		return (
			<div style={{ position: "relative" }}>
				{this.state.isRedirect ? <Redirect to={"/profile"} /> : null}
				<Modal scrollable open={this.state.signModalOpened} modalClosed={this.signModalClosedHandler}>
					<SignModal
						roleClicked={this.roleClickedHandler}
						isClientSelected={this.state.isClient}
						toggle={this.toggleClickedHandler}
						isSignIn={this.state.isSignIn}
						changed={this.inputChangedHandler}
						form={this.state.form}
						submitted={this.formSubmittedHandler}
					/>
				</Modal>
				<LogoutModal open={this.state.logoutModalOpened} modalClosed={this.logoutModalClosedHandler} />
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
				<Container maxWidth="xl" style={{ paddingTop: "30px" }}>
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
		name: state.auth.name
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (name, surname, email, password, role, isSignIn) =>
			dispatch(actions.auth(name, surname, email, password, role, isSignIn)),
		onLogout: () => dispatch(actions.logout()),
		onFormFlush: () => dispatch(actions.authFormFlush())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
