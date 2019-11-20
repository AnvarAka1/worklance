import React from "react";
import classes from "./ProfileInputs.module.css";
import Button from "../../UI/Button/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import LabeledInput from "../../UI/LabeledInput/LabeledInput";
import Header from "../../UI/Header/Header";
const profileInputs = props => {
	const { inputs, lang, formType, success } = props;
	const content = {
		save: [ "Сохранить изменения", "Save changes", "UZB" ],
		message: [ "Успешно обновлено", "Successfully updated", "Uzb" ]
	};
	const inputsArray = [];
	for (let key in inputs) {
		inputsArray.push({
			id: key,
			config: inputs[key]
		});
	}
	const inputsJSX = inputsArray.map(input => {
		return (
			<Grid key={input.id} item {...input.config.grid}>
				<LabeledInput
					label={input.config.label[lang]}
					elementConfig={input.config.config}
					inputType={input.config.inputType}
					changed={event => props.changed(event, input.id, formType)}
					value={input.config.value}
				/>
			</Grid>
		);
	});
	const submitBtn = props.customBtn ? (
		<div className={classes.Buttons}>{props.customBtn}</div>
	) : (
		<Grid item sm={props.half ? 6 : 8}>
			<Button wide clicked={props.clicked}>
				{content.save[lang]}
			</Button>
		</Grid>
	);

	const message = success === formType && (
		<Header h={6} mt color="green">
			{content.message[lang ? lang : 0]}
		</Header>
	);
	return (
		<div className={classes.ProfileInputs}>
			<form onSubmit={event => props.submitted(event, formType)}>
				<Grid container spacing={3}>
					{inputsJSX}
					<Hidden smDown>
						<Grid item sm={props.half ? 6 : 4} />
					</Hidden>
					{submitBtn}
				</Grid>
			</form>
			{message}
		</div>
	);
};

export default profileInputs;
