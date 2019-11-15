import React from "react";
import classes from "./AddPublicationForm.module.css";
import LabeledInput from "../UI/LabeledInput/LabeledInput";
const addPublicationForm = props => {
	const inputs = [];
	for (let key in props.form) {
		inputs.push({ id: key, config: props.form[key] });
	}
	const inputsJSX = inputs.map(input => {
		return (
			<LabeledInput
				key={input.id}
				label={input.config.label[lang]}
				elementConfig={input.config.config}
				inputType={input.config.inputType}
				changed={event => props.changed(event, input.id, formType)}
				value={input.config.value}
			/>
		);
	});
	return <React.Fragment>{inputsJSX}</React.Fragment>;
};

export default addPublicationForm;
