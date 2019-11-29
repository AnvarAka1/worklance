import React from "react";
import classes from "./InputWithDropdown.module.css";
import Input from "../UI/Input/Input";
// import LabeledInput from "../UI/LabeledInput/LabeledInput";
import Header from "../UI/Header/Header";
import Grid from "@material-ui/core/Grid";
const inputWithDropdown = props => {
	return (
		<Grid item xs={6}>
			<Header h={6} mbS color="#777">
				{props.input.label[props.lang ? props.lang : 0]}
			</Header>
			<div className={classes.InputWithDropdown}>
				<Input {...props.input} changed={event => props.inputChanged(event)} />
				<Input {...props.inputSelect} changed={event => props.inputSelectChanged(event)} />
			</div>
		</Grid>
	);
};

export default inputWithDropdown;
