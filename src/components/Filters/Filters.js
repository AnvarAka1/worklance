import React from "react";
import classes from "./Filters.module.css";
import Button from "../UI/Button/Button";
import MultiSelect from "../UI/MultiSelect/MultiSelect";
import Input from "../UI/Input/Input";
const filters = props => {
	const content = {
		button: [ "Выполнить", "Submit", "Uzb" ]
	};
	const { selects } = props;

	const selectsJSX = (
		<React.Fragment>
			<MultiSelect
				placeholder={selects.stack.placeholder}
				filterChanged={event => props.selectChanged(event, "stack")}
				options={selects.stack.options}
				value={selects.stack.value}
			/>
			<MultiSelect
				placeholder={selects.exp.placeholder}
				filterChanged={event => props.selectChanged(event, "exp")}
				options={selects.exp.options}
				value={selects.exp.value}
			/>
		</React.Fragment>
	);
	// console.log(selectsArray);
	console.log(selects);
	return (
		<div className={classes.Filters}>
			<div className={classes.FiltersInner}>
				{selectsJSX}
				<Input
					elementConfig={props.cost.config}
					changed={props.costChanged}
					value={props.cost.value}
					inputType={props.cost.inputType}
				/>
			</div>
			<Button clicked={props.filterSubmitted}>{content.button[props.lang ? props.lang : 0]}</Button>
		</div>
	);
};

export default filters;
