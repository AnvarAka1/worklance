import React from "react";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";
import Paper from "../../UI/Paper/Paper";
import classes from "./Project.module.css";
const project = props => {
	const { title, author, description, price, lang } = props;

	const content = {
		price: [ "Цена", "Price" ]
	};

	const button = props.button ? <div className={classes.Right}>{props.button}</div> : null;
	return (
		<div onMouseEnter={props.onHover} onMouseLeave={props.onUnHover} onClick={props.clicked}>
			<Paper clear={props.clear} center={props.center} tl>
				<Header color={props.hover ? "#007BFF" : "#333"} h={5}>
					{title}
				</Header>
				<Header h={5} color="#AAAAAA">
					{author}
				</Header>
				<Text mt>{description}</Text>
				<Header mt h={5}>
					{content.price[lang]} : ${price}
				</Header>
				{button}
			</Paper>
		</div>
	);
};

export default project;
