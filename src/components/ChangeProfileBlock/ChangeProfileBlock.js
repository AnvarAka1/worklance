import React from "react";
import classes from "./ChangeProfileBlock.module.css";
import Paper from "../UI/Paper/Paper";
import Header from "../UI/Header/Header";
const changeProfileBlock = props => {
	const { lang, type } = props;
	const content = {
		title: [ "Изменить профиль", "Change profile", "Uzb" ],
		candidate: [ "Кандидат", "Candidate", "Uzb" ],
		all: [ "Все", "All", "Uzb" ],
		freelancer: [ "Фрилансер", "Freelancer", "Uzb" ]
	};
	const blocksArray = [
		{
			type: 1,
			title: content.candidate[lang ? lang : 0]
		},
		{
			type: 2,
			title: content.all[lang ? lang : 0]
		},
		{
			type: 0,
			title: content.freelancer[lang ? lang : 0]
		}
	];
	const blocks = blocksArray.map(block => {
		return (
			<div
				key={block.type}
				className={type === block.type && classes.Active}
				onClick={event => props.clicked(event, block.type)}
			>
				<Header h={6} color="#777777" center>
					{block.title}
				</Header>
			</div>
		);
	});
	return (
		<Paper>
			<Header h={5} mb>
				{content.title[lang ? lang : 0]}
			</Header>
			<div className={classes.ChangeProfileBlock}>{blocks}</div>
		</Paper>
	);
};

export default changeProfileBlock;
