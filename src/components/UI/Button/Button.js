import React from "react";
import classes from "./Button.module.css";
const button = props => {
	const buttonClasses = [
		classes.Button,
		classes[props.buttonClass],
		props.wider && classes.Wider,
		props.wide && classes.Wide,
		props.blue && classes.Blue,
		props.green && classes.Green,
		props.grey && classes.Grey,
		props.mtb && classes.Mtb,
		props.ptb && classes.Ptb
	];
	const style = {
		...props.buttonStyle
	};
	return (
		<button
			onClick={props.clicked && props.clicked}
			style={style}
			className={buttonClasses.join(" ")}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default button;
