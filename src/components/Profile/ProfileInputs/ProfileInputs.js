import React from "react";
import classes from "./ProfileInputs.module.css";
import Input from "../../UI/Input/Input";
import Header from "../../UI/Header/Header";
import Button from "../../UI/Button/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
const profileInputs = props => {
	const { inputs, lang, formType } = props;
	const content = {
		save: [ "Сохранить изменения", "Save changes", "UZB" ]
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
			<div className={classes.InputLabel} key={input.id}>
				<Header h={6} mbS color="#777">
					{input.config.label[lang]}
				</Header>
				<Input
					elementConfig={input.config.config}
					inputType={input.config.config.inputType}
					changed={event => props.changed(event, input.id, formType)}
					value={input.config.value}
				/>
			</div>
		);
	});
	return (
		<div className={classes.ProfileInputs}>
			<form onSubmit={event => props.submitted(event, formType)}>
				<Grid container>
					<Grid item xs={12}>
						{inputsJSX}
					</Grid>

					<Hidden smDown>
						<Grid item sm={6} />
					</Hidden>
					<Grid item sm={6}>
						<Button wide clicked={props.clicked}>
							{content.save[lang]}
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default profileInputs;
