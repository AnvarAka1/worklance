import React from "react";
import classes from "./Button.module.css";
const button = props => {
	const buttonClasses = [
		classes.Button,
		classes[props.buttonClass],
		props.wide && classes.Wide,
		props.blue && classes.Blue,
		props.green && classes.Green,
		props.grey && classes.Grey
	];
	return (
		<button onClick={props.clicked && props.clicked} className={buttonClasses.join(" ")} disabled={props.disabled}>
			{props.children}
		</button>
	);
};

export default button;
