import React from "react";
import Header from "../../UI/Header/Header";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
const navigationItem = props => {
	const { title, lang, link } = props;
	return (
		<li
			className={[ classes.NavigationItem, props.isVertical && classes.Vertical ].join(" ")}
			onClick={props.drawerClosed}
		>
			<NavLink to={link} activeClassName={classes.Active}>
				<Header normal h={props.isVertical ? 5 : 6}>
					{title[lang]}
				</Header>
			</NavLink>
		</li>
	);
};

export default navigationItem;
