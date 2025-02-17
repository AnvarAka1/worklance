import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import ProjectsPage from "./containers/ProjectsPage/ProjectsPage";
import FreelancersPage from "./containers/FreelancersPage/FreelancersPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import VacanciesPage from "./containers/VacanciesPage/VacanciesPage";
import Logout from "./containers/Logout/Logout";
import AddPublicationPage from "./containers/AddPublicationPage/AddPublicationPage";
import CandidatesPage from "./containers/CandidatesPage/CandidatesPage";
// import ForgotPasswordPage from "./containers/ForgotPasswordPage/ForgotPasswordPage";
// import ResetPasswordPage from "./containers/ResetPasswordPage/ResetPasswordPage";
import NotificationsLayout from "./hoc/NotificationsLayout/NotificationsLayout";
import LandingPage from "./containers/LandingPage/LandingPage";
import { TitleComponent } from "./hoc/TitleComponent/TitleComponent";

import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
	state = {
		title: "Worklance"
	};
	componentDidMount() {
		if (localStorage.getItem("token")) {
			this.props.onAuthCheck();
		}
	}

	render() {
		let routes = (
			<Switch>
				{/* <Route
					path="/forgot"
					component={props => {
						return (
							<Layout>
								<ForgotPasswordPage {...props} />
							</Layout>
						);
					}}
				/>
				<Route
					path="/newpassword"
					component={props => {
						return (
							<Layout>
								<ResetPasswordPage {...props} />
							</Layout>
						);
					}}
				/>
				<Route
					path="/projects"
					component={props => {
						return (
							<Layout>
								<span />
							</Layout>
						);
					}}
				/> */}
				<Route path="/" component={LandingPage} />
				<Redirect from="*" to="/projects" />
			</Switch>
		);
		if (this.props.isAuthorized && false) {
			routes = (
				<Layout>
					<Switch>
						<Route
							path="/projects"
							render={props => (
								<NotificationsLayout>
									<ProjectsPage {...props} />
								</NotificationsLayout>
							)}
						/>
						<Route
							path="/vacancies"
							render={props => (
								<NotificationsLayout>
									<VacanciesPage {...props} />
								</NotificationsLayout>
							)}
						/>
						<Route
							path="/freelancers"
							render={props => (
								<NotificationsLayout>
									<FreelancersPage {...props} />
								</NotificationsLayout>
							)}
						/>
						<Route
							path="/candidates"
							render={props => (
								<NotificationsLayout>
									<CandidatesPage {...props} />
								</NotificationsLayout>
							)}
						/>
						<Route path="/profile" component={ProfilePage} />
						<Route path="/add" component={AddPublicationPage} />
						<Route path="/logout" component={Logout} />
						<Redirect from="*" to="/projects" />
					</Switch>
				</Layout>
			);
		}
		return (
			<React.Fragment>
				<TitleComponent
					title={localStorage.getItem("name") ? localStorage.getItem("name") + " | Worklance" : null}
				/>
				{routes}
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token !== null,
		role: state.auth.role,
		lang: state.lang.lang,
		name: state.auth.fullName
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuthCheck: () => dispatch(actions.authCheckState()),
		onLangInit: () => dispatch(actions.langInit()),
		onLangChange: () => dispatch(actions.langChange())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
