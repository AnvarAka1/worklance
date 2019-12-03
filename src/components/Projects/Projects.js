import React from "react";
import Project from "./Project/Project";
import Grid from "@material-ui/core/Grid";
const projects = props => {
	const projects = props.projects.map(project => {
		return (
			<Grid item xs={12} key={project.id}>
				<Project
					clicked={event => props.projectClicked(event, project.id)}
					hover={project.id === props.hover ? true : false}
					onHover={() => props.onHover(project.id)}
					onUnHover={() => props.onUnHover(project.id)}
					lang={props.lang}
					maxHeight={props.maxHeight}
					{...project}
				/>
			</Grid>
		);
	});
	return <React.Fragment>{projects}</React.Fragment>;
};

export default projects;
