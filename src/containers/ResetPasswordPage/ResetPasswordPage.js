import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Input from "../../components/UI/Input/Input";
import Header from "../../components/UI/Header/Header";
import Paper from "../../components/UI/Paper/Paper";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-db";
import queryString from "query-string";
export class ResetPasswordPage extends Component {
	state = {
		form: {
			password: {
				inputType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Введите новый пароль"
				},
				value: ""
			},
			confirmPassword: {
				inputType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Подтвердите пароль"
				},
				value: ""
			}
		},
		isSent: false,
		lang: 0
	};
	inputChangeHandler = (event, id) => {
		// let password = {
		// 	...this.state.password,
		// 	value: event.target.value
		// };
		let form = {
			...this.state.form,
			[id]: {
				...this.state.form[id],
				value: event.target.value
			}
		};

		this.setState({ form: form });
	};
	formSubmitHandler = event => {
		event.preventDefault();
		this.setState({ isSent: false });
		let formData = new FormData();
		const tokenValue = queryString.parse(this.props.location.search);
		formData.append("token", tokenValue.token);
		formData.append("password", this.state.form.password.value);
		formData.append("_method", "PUT");
		axios
			.post("/reset/password", formData)
			.then(res => {
				console.log(res);
				this.setState({ isSent: true });
			})
			.catch(err => console.log(err));
	};
	render() {
		const content = {
			password: [ "Введите новый пароль", "Enter new password", "Uzb" ],
			message: [
				"Пароль успешно обновлен. Можете войти через свой аккаунт",
				"Password was successfully updated. You can now log in",
				"Uzb"
			],
			button: [ "Отправить", "Send", "Uzb" ]
		};
		const message = this.state.isSent ? (
			<Header h={6} color="green" mt>
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
									{content.password[this.state.lang]}
								</Header>
								<Input
									{...this.state.form.password}
									changed={event => this.inputChangeHandler(event, "password")}
								/>
								<Input
									mt
									{...this.state.form.confirmPassword}
									changed={event => this.inputChangeHandler(event, "confirmPassword")}
								/>
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

export default ResetPasswordPage;
