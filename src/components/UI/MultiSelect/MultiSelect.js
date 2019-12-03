import React from "react";
import classes from "./MultiSelect.module.css";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const multiSelect = props => {
	const { value, options, placeholder } = props;
	// handleChange

	return (
		<div className={classes.MultiSelect}>
			<Select
				style={{ padding: "10px 15px", color: "#777" }}
				multiple
				displayEmpty
				value={value}
				onChange={props.filterChanged}
				input={<Input disableUnderline style={{ color: "#777" }} />}
				renderValue={selected => {
					if (selected.length === 0) {
						return <em>{placeholder}</em>;
					}

					return selected.join(", ");
				}}
			>
				<MenuItem disabled value="">
					<em>{placeholder}</em>
				</MenuItem>
				{options.map(option => (
					<MenuItem key={option.id} value={option.values[props.lang ? props.lang : 0]}>
						{option.values[props.lang ? props.lang : 0]}
					</MenuItem>
				))}
			</Select>
		</div>
	);
};

export default multiSelect;
