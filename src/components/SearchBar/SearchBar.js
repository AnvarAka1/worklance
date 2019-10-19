import React, { Component } from "react";
import classes from "./SearchBar.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Text from "../UI/Text/Text";
import FilterIcon from "../../assets/images/icons/filter.png";

class SearchBar extends Component {
	state = {
		search: {
			search: "",
			stack: "",
			exp: "",
			cost: ""
		},
		options: {
			stack: [
				{
					id: 0,
					value: [ "Все", "All", "AllUzb" ]
				},
				{
					id: 1,
					value: [ "Некоторые", "Some", "SomeUzb" ]
				}
			],
			exp: [
				{
					id: 0,
					value: [ "", "" ]
				},
				{
					id: 1,
					value: [ "", "" ]
				}
			],
			cost: [
				{
					id: 0,
					value: 300
				},
				{
					id: 1,
					value: 15
				}
			]
		}
	};
	getInputConfigs = () => {
		// const placeholders = {
		// 	search: [ "Поиск", "Search", "SearchUzb" ]
		// };
		// const options = {};
		// const search = {
		// 	search: {
		// 		placeholder: []
		// 	}
		// };
	};
	searchChangedHandler = event => {
		console.log("Search " + event.target.value);
	};
	searchSubmitHandler = event => {
		event.preventDefault();
		console.log("Search Submitted");
	};
	render() {
		const searchBarClasses = [ classes.SearchBar ];
		const content = {
			filter: [ "Фильтр", "Filter", "Filter" ]
		};
		const { lang } = this.props;
		return (
			<div className={searchBarClasses.join(" ")}>
				<div className={classes.Search}>
					<form className={classes.LeftPart} onSubmit={this.searchSubmitHandler}>
						<i className="fa fa-search" />
						<Input elementConfig={this.state.search} changed={this.searchChangedHandler} />
					</form>
					<div className={classes.RightPart} onClick={this.filterClickedHandler}>
						<img src={FilterIcon} alt="Filter" />
						<Text small>{content.filter[lang]}</Text>
					</div>
				</div>
				<div className={classes.filters}>
					<Button />
				</div>
			</div>
		);
	}
}

export default SearchBar;
