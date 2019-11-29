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
				type: "email"
			},
			value: ""
		},
		lang: 0
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
		let formData = new FormData();
		formData.append("email", this.state.email.value);
		axios
			.post("/reset", formData, {
				headers: {
					Authorization: this.token
				}
			})
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log(err));
	};
	render() {
		const content = {
			email: [ "Введите свой email", "Enter your email", "Uzb" ],
			button: [ "Отправить", "Send", "Uzb" ]
		};
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
