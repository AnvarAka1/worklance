import React from "react";
import classes from "./Skills.module.css";
import Skill from "./Skill/Skill";
const skills = props => {
	const skills = props.skills.map(skill => {
		return <Skill key={skill.id} title={skill.title} />;
	});
	return <div className={classes.Skills}>{skills}</div>;
};

export default skills;
