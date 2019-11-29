import React from "react";
import classes from "./SearchBar.module.css";
import Input from "../UI/Input/Input";
// import Button from "../UI/Button/Button";
import Text from "../UI/Text/Text";
import FilterIcon from "../../assets/images/icons/filter.png";

const searchBar = props => {
	const searchBarClasses = [ classes.SearchBar ];
	const content = {
		filter: [ "Фильтр", "Filter", "Filter" ]
	};
	const { lang } = props;
	return (
		<div className={searchBarClasses.join(" ")}>
			<div className={classes.Search}>
				<form className={classes.LeftPart} onSubmit={props.submitted}>
					<i className="fa fa-search" />
					<Input elementConfig={props.elementConfig} changed={props.changed} />
				</form>
				<div className={classes.RightPart} onClick={props.filterClicked}>
					<img src={FilterIcon} alt="Filter" />
					<Text small>{content.filter[lang]}</Text>
				</div>
			</div>
			{/* <div className={classes.filters}>
					<Button />
				</div> */}
		</div>
	);
};

export default searchBar;
