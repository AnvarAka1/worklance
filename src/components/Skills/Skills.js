import React from "react";
import classes from "./Skills.module.css";
import Skill from "./Skill/Skill";
const skills = props => {
	const skills =
		props.skills &&
		props.skills.map((skill, index) => {
			return <Skill key={index} title={skill} />;
		});
	return <div className={classes.Skills}>{skills}</div>;
};

export default skills;
