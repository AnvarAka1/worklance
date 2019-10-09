import React from "react";
import classes from "./Text.module.css";
const text = props => {
	const textClasses = [ classes.Text, props.textClass && classes[props.textClass] ];
	const textStyles = {
		color: props.color && props.color
	};

	return (
		<p className={textClasses.join(" ")} style={textStyles}>
			{props.children}
		</p>
	);
};

export default text;
