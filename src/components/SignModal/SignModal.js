import React from "react";
// import classes from "./SignModal.module.css";
import Paper from "../UI/Paper/Paper";
import Input from "../UI/Input/Input";
import Header from "../UI/Header/Header";
import Button from "../UI/Button/Button";
import classes from "./SignModal.module.css";
import GoogleLogin from "react-google-login";
const signModal = props => {
	const { lang } = props;
	const content = {
		or: [ "или", "or" ],
		googleSignIn: [ "Авторизация с помощью Google", "Authorize via Google" ],
		googleSignUp: [ "Регистрация с помощью Google", "Register via Google" ],
		freelancer: [ "Фрилансер", "Freelancer" ],
		client: [ "Клиент", "Client" ],
		signIn: [ "Войти", "Sign in" ],
		signUp: [ "Создать аккаунт", "Create an account" ],
		hasAccountMessage: [ "У вас уже имеется аккаунт? Пройдите ", "Already have an account? " ],
		noAccountMessage: [ "У вас нет аккаунта? Пройдите ", "Do not have an account? " ],
		auth: [ "Авторизацию", "Authorize" ],
		reg: [ "Регистрацию", "Register" ],
		forgotPassword: [ "Забыли пароль?", "Forgot password", "Uzb" ]
	};
	let objForm = props.isSignIn ? props.form.signIn : props.form.signUp;
	const inputs = [];
	for (let key in objForm) {
		inputs.push({ key: key, elementConfig: objForm[key] });
	}
	const form = inputs.map(input => {
		return (
			<Input
				mt
				ptb
				key={input.key}
				elementConfig={input.elementConfig.config}
				value={input.elementConfig.value}
				changed={event => props.changed(event, input.key)}
			/>
		);
	});
	const google = (
		<GoogleLogin
			buttonText={
				props.isSignIn ? (
					content.googleSignIn[props.lang ? props.lang : 0]
				) : (
					content.googleSignUp[props.lang ? props.lang : 0]
				)
			}
			className={classes.GoogleButton}
			clientId="577775945538-b8slg5r441le79hi2606hm6gqh8a4sis.apps.googleusercontent.com"
			onSuccess={props.responseGoogle}
			onFailure={props.responseGoogle}
			cookiePolicy={"single_host_origin"}
		/>
	);
	const toggleMessage = (
		<Header center h={5} mtbB>
			{props.isSignIn ? content.noAccountMessage[lang ? lang : 0] : content.hasAccountMessage[lang ? lang : 0]}
			<span onClick={props.toggle} className={classes.Toggle}>
				{props.isSignIn ? content.reg[lang ? lang : 0] : content.auth[lang ? lang : 0]}
			</span>
		</Header>
	);
	const role = !props.isSignIn && (
		<div className={classes.Role}>
			<div
				className={!props.isClientSelected ? classes.Selected : ""}
				onClick={event => props.roleClicked(event, false)}
			>
				{content.freelancer[lang ? lang : 0]}
			</div>
			<div
				className={props.isClientSelected ? classes.Selected : ""}
				onClick={event => props.roleClicked(event, true)}
			>
				{content.client[lang ? lang : 0]}
			</div>
		</div>
	);
	const forgotPassword = props.isSignIn && (
		<Header h={5} color="#00b1eb" center mt clicked={props.signModalClosed}>
			{content.forgotPassword[lang ? lang : 0]}
		</Header>
	);
	const submitButton = (
		<Button wide mtb green ptb>
			<Header h={5}>{props.isSignIn ? content.signIn[lang ? lang : 0] : content.signUp[lang ? lang : 0]}</Header>
		</Button>
	);
	return (
		<Paper sign clear center>
			{google}
			<Header center mtbB h={5}>
				{content.or[lang ? lang : 0]}
			</Header>
			<form onSubmit={event => props.submitted(event)}>
				{form}
				{forgotPassword}
				{role}
				{submitButton}
			</form>
			{toggleMessage}
		</Paper>
	);
};

export default signModal;
