import React from "react";
import Header from "../../UI/Header/Header";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
const navigationItem = props => {
	const { title, lang, link } = props;
	return (
		<li className={classes.NavigationItem}>
			<NavLink to={link} activeClassName={classes.Active}>
				<Header normal h={6}>
					{title[lang]}
				</Header>
			</NavLink>
		</li>
	);
};

export default navigationItem;
