import React from "react";
import Layout from "./containers/Layout/Layout";
import { withRouter, Switch, Route } from "react-router-dom";
import ProjectsPage from "./containers/ProjectsPage/ProjectsPage";
import FreelancersPage from "./containers/FreelancersPage/FreelancersPage";

const app = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/projects" component={ProjectsPage} />
				<Route path="/freelancers" component={FreelancersPage} />
				<Route
					path="/"
					component={() => {
						return null;
					}}
				/>
			</Switch>
		</Layout>
	);
};

export default withRouter(app);
