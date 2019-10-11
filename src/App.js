import React from "react";
import Layout from "./containers/Layout/Layout";
import { withRouter, Switch, Route } from "react-router-dom";
import ProjectsPage from "./containers/ProjectsPage/ProjectsPage";
const app = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/projects" component={ProjectsPage} />
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
