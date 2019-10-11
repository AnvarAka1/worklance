import React from "react";
import Project from "./Project/Project";
import Grid from "@material-ui/core/Grid";
const projects = props => {
	const projects = props.projects.map(project => {
		return (
			<Grid item xs={12} key={project.id}>
				<Project lang={props.lang} {...project} />
			</Grid>
		);
	});
	return <React.Fragment>{projects}</React.Fragment>;
};

export default projects;
