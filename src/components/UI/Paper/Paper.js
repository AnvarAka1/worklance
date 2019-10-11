import React from "react";
import classes from "./Paper.module.css";
const paper = props => {
	const paperClasses = [
		classes.Paper,
		props.paperClass && classes[props.paperClass],
		props.tl && classes.Tl,
		props.trl && classes.Trl,
		props.trbl && classes.Trbl,
		props.minHeight && classes.MinHeight
	];
	return <div className={paperClasses.join(" ")}>{props.children}</div>;
};

export default paper;
