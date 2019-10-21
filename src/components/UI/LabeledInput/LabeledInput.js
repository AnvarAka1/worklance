import React from "react";
import classes from "./LabeledInput.module.css";
import Header from "../Header/Header";
import Input from "../Input/Input";
const labeledInput = props => {
	return (
		<div className={classes.LabeledInput}>
			<Header h={6} mbS color="#777">
				{props.label}
			</Header>
			<Input
				elementConfig={props.elementConfig}
				inputType={props.inputType}
				changed={props.changed}
				value={props.value}
			/>
		</div>
	);
};

export default labeledInput;
