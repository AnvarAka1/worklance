import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Input from "../../components/UI/Input/Input";
import Header from "../../components/UI/Header/Header";
import Paper from "../../components/UI/Paper/Paper";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-db";
export class ForgotPasswordPage extends Component {
	state = {
		email: {
			inputType: "input",
			elementConfig: {
				type: "email",
				placeholder: "E-mail"
			},
			value: ""
		},
		lang: 0,
		isSent: false
	};
	inputChangeHandler = event => {
		let email = {
			...this.state.email,
			value: event.target.value
		};
		this.setState({ email: email });
	};
	formSubmitHandler = event => {
		event.preventDefault();
		this.setState({ isSent: false });
		let formData = new FormData();
		formData.append("email", this.state.email.value);
		axios
			.post("/reset", formData)
			.then(res => {
				console.log(res);
				this.setState({ isSent: true });
			})
			.catch(err => console.log(err));
	};
	render() {
		const content = {
			email: [ "Введите свой email", "Enter your email", "Uzb" ],
			message: [
				"Готово. На Ваш E-mail была выслана ссылка для сброса пароля",
				"Done. The link for password reset was sent on your E-mail",
				"Uzb"
			],
			button: [ "Отправить", "Send", "Uzb" ]
		};
		const message = this.state.isSent ? (
			<Header h={6} mt color="green">
				{content.message[this.props.lang ? this.props.lang : 0]}
			</Header>
		) : null;
		return (
			<Grid item xs={12}>
				<Grid container>
					<Grid item sm={3} />
					<Grid item sm={6}>
						<Paper trbl>
							<form onSubmit={this.formSubmitHandler}>
								{" "}
								<Header h={5} mb center>
									{content.email[this.state.lang]}
								</Header>
								<Input {...this.state.email} changed={event => this.inputChangeHandler(event)} />
								{message}
								<Button mt blue wide>
									{content.button[this.state.lang]}
								</Button>
							</form>
						</Paper>
					</Grid>
					<Grid item sm={3} />
				</Grid>
			</Grid>
		);
	}
}

export default ForgotPasswordPage;
