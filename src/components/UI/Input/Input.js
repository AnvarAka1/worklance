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
		props.ptb && classes.Ptb,
		inputType === "file" && classes.File
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
			input = (
				<select className={inputClasses.join(" ")} {...elementConfig} value={value} onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue[props.lang ? props.lang : 0]}
						</option>
					))}
				</select>
			);
			break;
		case "file":
			input = (
				<React.Fragment>
					<input
						className={inputClasses.join(" ")}
						{...elementConfig}
						value={value}
						onChange={props.changed}
					/>
					<label htmlFor={props.elementConfig.name} className={classes.FileLabel}>
						{props.text}
					</label>
				</React.Fragment>
			);

			break;
		default:
			input = (
				<input className={inputClasses.join(" ")} {...elementConfig} value={value} onChange={props.changed} />
			);
	}
	return <React.Fragment>{input}</React.Fragment>;
};

export default input;
