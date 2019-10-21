import React, { Component } from "react";
import Paper from "../../../components/UI/Paper/Paper";
import Header from "../../../components/UI/Header/Header";
import LabeledInput from "../../../components/UI/LabeledInput/LabeledInput";
export class UserInputsPage extends Component {
	state = {
		formStatic: {
			experience: {
				label: [ "Опыт работы", "Work experience", "Uzb" ],
				config: {
					type: "text"
				},
				inputType: "input",
				value: "Более 3-х лет"
			},
			skills: {
				label: [ "Навыки", "Skills", "Uzb" ],
				config: {
					type: "text"
				},
				inputType: "input",
				value: "HTML5, CSS3, JavaScript, MySQL, NodeJS"
			}
		},
		formDynamic: {
			portfolio: [
				{
					label: [ "Навыки", "Skills", "Uzb" ],
					config: {
						type: "text"
					},
					inputType: "input",
					value: "HTML5, CSS3, JavaScript, MySQL, NodeJS"
				}
			]
		}
	};
	render() {
		const content = {
			title: [ "Дополнительно", "Additionally", "UZB" ]
		};

		return (
			<Paper>
				<Header h={5}>{content.title[this.props.lang]}</Header>
				<LabeledInput />
			</Paper>
		);
	}
}

export default UserInputsPage;
