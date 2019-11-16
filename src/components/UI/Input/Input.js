import React from "react";
import classes from "./Input.module.css";
const input = props => {
	let input = null;

	const { inputType, value, elementConfig } = props;
	const inputClasses = [
		classes.Input,
		props.inputClass && classes[props.inputClass],
		props.search && classes.Search,
		props.mt && classes.Mt,
		props.mb && classes.Mb,
		props.ptb && classes.Ptb
	];
	switch (inputType) {
		case "input":
			input = (
				<input className={inputClasses.join(" ")} {...elementConfig} value={value} onChange={props.changed} />
			);
			break;
		case "textarea":
			input = (
				<textarea
					className={inputClasses.join(" ")}
					{...elementConfig}
					value={value}
					onChange={props.changed}
				/>
			);
			break;
		case "select":
			break;

		default:
			input = (
				<input className={inputClasses.join(" ")} {...elementConfig} value={value} onChange={props.changed} />
			);
	}
	return <React.Fragment>{input}</React.Fragment>;
};

export default input;
