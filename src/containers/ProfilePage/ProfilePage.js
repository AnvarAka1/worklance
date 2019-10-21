import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/UI/Header/Header";

import ProfilePhoto from "../../components/Profile/ProfilePhoto/ProfilePhoto";
import Avatar from "../../assets/images/profile/avatar.jpg";
import ProfileInputs from "../../components/Profile/ProfileInputs/ProfileInputs";
import Publications from "../../components/Publications/Publications";
export class ProfilePage extends Component {
	state = {
		profile: {
			avatar: Avatar,
			general: {
				name: {
					label: [ "Полное имя", "Full name", "Uzb" ],
					config: {
						type: "text"
					},
					inputType: "input",
					value: "Andrew Jackson"
				},
				profession: {
					label: [ "Профессия", "Profession", "Uzb" ],
					config: {
						type: "text"
					},
					inputType: "input",
					value: "Designer"
				},
				about: {
					label: [ "О себе", "About me", "UZB" ],
					config: {},
					inputType: "textarea",
					value:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis egestas fusce egestas mauris sit. Quisque nulla nunc scelerisque risus massa viverra."
				}
			},
			security: {
				curPassword: {
					label: [ "Текущий пароль", "Current password", "Uzb" ],
					config: {
						type: "password",
						autoComplete: "current-password"
					},
					inputType: "input",
					value: ""
				},
				newPassword: {
					label: [ "Новый пароль", "New password", "Uzb" ],
					config: {
						type: "password",
						autoComplete: "new-password"
					},
					inputType: "input",
					value: ""
				},
				confirmPassword: {
					label: [ "Подтвердите пароль", "Confirm password", "Uzb" ],
					config: {
						type: "password",
						autoComplete: "new-password"
					},
					inputType: "input",
					value: ""
				}
			},
			email: {
				email: {
					label: [ "Эл. почта", "E-mail", "Uzb" ],
					config: {
						type: "email"
						// autoComplete: "new-password"
					},
					inputType: "input",
					value: "info@worklance.uz"
				}
			}
		},
		publications: [
			{
				id: 0,
				title: "Доработать адаптивность сайта",
				date: "27.09.2019",
				isProject: true
			},

			{
				id: 1,
				title: "Фронт-энд разработчик",
				date: "25.09.2019",
				isProject: false
			},

			{
				id: 2,
				title: "Написать телеграм-бота",
				date: "21.09.2019",
				isProject: true
			}
		],
		lang: 0,
		loading: true
	};

	componentDidMount() {
		this.setState({ loading: false });
	}
	inputChangeHandler = (event, inputIdentifier, formType) => {
		const value = event.target.value;
		let newState = {
			...this.state.profile
		};
		newState[formType] = { ...this.state.profile[formType] };

		newState[formType][inputIdentifier] = { ...this.state.profile[formType][inputIdentifier] };
		newState[formType][inputIdentifier].value = value;
		this.setState({ profile: newState });
	};
	formSubmitHandler = (event, formType) => {
		event.preventDefault();
		console.log("FormType", formType);
	};
	avatarChangeHandler = () => {
		console.log("Change Avatar");
	};

	removeClickedHandler = (event, id) => {
		console.log("Remove clicked with id", id);
	};
	addClickedHandler = () => {
		console.log("Add clicked");
	};
	render() {
		const content = {
			general: [ "Общая информация", "General information", "InfoUzb" ],
			security: [ "Безопасность", "Security", "Uzb" ],
			publications: [ "Публикации", "Publications", "Uzb" ],
			additional: [ "Дополнительно", "Additionally", "Uzb" ]
		};
		return (
			<Grid container spacing={3}>
				<Grid item sm={6}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Header h={5}>
								<i className="fa fa-user" /> {content.general[this.state.lang]}
							</Header>
						</Grid>
						<Grid item sm={4}>
							<ProfilePhoto
								change
								avatarChanged={this.avatarChangeHandler}
								avatar={this.state.profile.avatar}
								name={"Avatar"}
								lang={this.state.lang}
								large
								loading={this.state.loading}
							/>
						</Grid>
						<Grid item sm={8}>
							<ProfileInputs
								half
								changed={this.inputChangeHandler}
								inputs={this.state.profile.general}
								lang={this.state.lang}
								formType={"general"}
								submitted={this.formSubmitHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<Header h={5}>
								<i className="fa fa-user-lock" /> {content.security[this.state.lang]}
							</Header>
						</Grid>
						<Grid item sm={6}>
							<ProfileInputs
								changed={this.inputChangeHandler}
								inputs={this.state.profile.security}
								lang={this.state.lang}
								formType={"security"}
								submitted={this.formSubmitHandler}
							/>
						</Grid>
						<Grid item sm={6}>
							<ProfileInputs
								changed={this.inputChangeHandler}
								inputs={this.state.profile.email}
								lang={this.state.lang}
								formType={"email"}
								submitted={this.formSubmitHandler}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item sm={1} />
				<Grid item sm={5}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Header h={5}>
								<i className="fa fa-user-lock" />{" "}
								{this.props.isUser ? (
									content.additional[this.state.lang]
								) : (
									content.publications[this.state.lang]
								)}
							</Header>
						</Grid>

						<Grid item xs={12}>
							{this.props.isUser ? null : (
								<Publications
									lang={this.state.lang}
									publications={this.state.publications}
									addClicked={this.addClickedHandler}
									removeClicked={this.removeClickedHandler}
								/>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default ProfilePage;
