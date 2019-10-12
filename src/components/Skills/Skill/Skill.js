import React from "react";
import classes from "./Skill.module.css";
const skill = props => {
	const { title } = props;
	return <p className={classes.Skill}>{title}</p>;
};

export default skill;
