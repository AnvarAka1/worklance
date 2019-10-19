import React from "react";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";
import Paper from "../../UI/Paper/Paper";
import { NavLink } from "react-router-dom";
const project = props => {
	// const projectClasses = [ classes.Project ];
	const { id, title, author, authorId, text, price, lang } = props;

	const content = {
		price: [ "Цена", "Price" ]
	};
	return (
		<div onMouseEnter={props.onHover} onMouseLeave={props.onUnHover}>
			<Paper>
				<NavLink to={`/projects/${id}`}>
					<Header color={props.hover ? "#007BFF" : "#333"} h={5}>
						{title}
					</Header>
				</NavLink>
				<NavLink to={`/users/${authorId}`}>
					<Header h={5} color="#AAAAAA">
						{author}
					</Header>
				</NavLink>
				<NavLink to={`/projects/${id}`}>
					<Text mt>{text}</Text>
					<Header mt h={5}>
						{content.price[lang]} : ${price}
					</Header>
				</NavLink>
			</Paper>
		</div>
	);
};

export default project;
