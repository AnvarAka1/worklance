import React from "react";
import classes from "./AdditionalBlock.module.css";
import Paper from "../UI/Paper/Paper";
import LabeledInput from "../UI/LabeledInput/LabeledInput";
import Button from "../UI/Button/Button";
import Header from "../UI/Header/Header";
import Input from "../UI/Input/Input";
const additionalBlock = props => {
	const { lang, form } = props;
	const content = {
		title: [ "Дополнительно", "Additionally", "Uzb" ],
		portfolio: [ "Портфолио", "Portfolio", "Uzb" ],
		addMoreBtn: [ "Добавить еще", "Add more", "Uzb" ],
		saveBtn: [ "Сохранить изменения", "Save changes", "Uzb" ]
	};
	// const additionalArray = [];
	// for (let key in props.form) {
	// 	additionalArray.push({
	// 		id: key,
	// 		config: props.form[key]
	// 	});
	// }

	const portfolio = form.portfolio.map(input => {
		return (
			<Input
				mb
				key={input.id}
				elementConfig={input.config}
				inputType={input.inputType}
				changed={event => props.portfolioChanged(event, input.id)}
				value={input.value}
			/>
		);
	});

	return (
		<Paper>
			<Header h={5} mb>
				<i className="fa fa-clipboard-list" /> {content.title[props.lang ? props.lang : 0]}
			</Header>
			<form className={classes.Center}>
				{/* form */}

				<LabeledInput
					label={form.experience.label[lang]}
					elementConfig={form.experience.config.config}
					inputType={form.experience.inputType}
					changed={event => props.changed(event, "experience")}
					value={form.experience.value}
				/>
				<Header h={6} mbS color="#777">
					{content.portfolio[props.lang ? props.lang : 0]}
				</Header>
				{portfolio}
				<Button clicked={props.addPortfolio}>{content.addMoreBtn[props.lang ? props.lang : 0]}</Button>
				<LabeledInput
					label={form.skills.label[lang]}
					elementConfig={form.skills.config.config}
					inputType={form.skills.inputType}
					changed={event => props.changed(event, "skills")}
					value={form.skills.value}
				/>
				<Button wider clicked={props.clicked}>
					{content.saveBtn[props.lang ? props.lang : 0]}
				</Button>
			</form>
		</Paper>
	);
};

export default additionalBlock;
