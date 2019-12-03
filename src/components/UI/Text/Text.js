import React from "react";
import classes from "./Text.module.css";
const text = props => {
	const textClasses = [
		classes.Text,
		props.textClass && classes[props.textClass],
		props.small && classes.Small,
		props.mt && classes.Mt,
		props.mb && classes.Mb,
		props.mtB && classes.MtB,
		props.mbB && classes.MbB,
		props.maxHeight && classes.MaxHeight
	];
	const textStyles = {
		color: props.color && props.color,
		cursor: props.clicked && "pointer"
	};

	return (
		<p className={textClasses.join(" ")} style={textStyles} onClick={props.clicked && props.clicked}>
			{props.children}
		</p>
	);
};

export default text;
