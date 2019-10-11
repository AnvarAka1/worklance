import React from "react";
import classes from "./SearchBar.module.css";
import Input from "../UI/Input/Input";
const searchBar = props => {
	searchBarClasses = [ classes.SearchBar ];

	return (
		<div className={searchBar.join(" ")}>
			<Input elementConfig={props.elementConfig} value={props.value} changed={props.changed} />
		</div>
	);
};

export default searchBar;
