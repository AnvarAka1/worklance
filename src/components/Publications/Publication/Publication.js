import React from "react";
import Header from "../../UI/Header/Header";
import classes from "./Publication.module.css";
import Paper from "../../UI/Paper/Paper";
const publication = props => {
	const { title, date, type, lang } = props;
	const content = {
		project: [ "Проект", "Project", "Uzb" ],
		vacancy: [ "Вакансия", "Vacancy", "Uzb" ]
	};
	return (
		<Paper mb>
			<div className={classes.Publication} onClick={props.clicked}>
				<Header h={5}>{title}</Header>
				<div>
					<Header h={5} normal>
						{date}
					</Header>
					<Header h={5} normal>
						{type ? content.vacancy[lang] : content.project[lang]}
					</Header>
				</div>
				<div className={classes.IconWrapper} onClick={props.removeClicked}>
					<i className={[ "fa fa-trash", classes.Icon ].join(" ")} />
				</div>
			</div>
		</Paper>
	);
};

export default publication;
