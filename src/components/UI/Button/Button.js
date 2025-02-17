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
		props.danger && classes.Danger,
		props.grey && classes.Grey,
		props.mtb && classes.Mtb,
		props.mt && classes.Mt,
		props.ptb && classes.Ptb,
		props.exit && classes.Exit,
		props.noHover && classes.NoHover,
		props.dark && classes.Dark
	];
	const style = {
		...props.buttonStyle
	};
	switch (props.widerValue) {
		case 1:
			buttonClasses.push(classes.Wider1);
			break;
		case 2:
			buttonClasses.push(classes.Wider2);
			break;
		default:
	}
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
