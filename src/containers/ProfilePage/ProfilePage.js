import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/UI/Header/Header";
import ProfilePhoto from "../../components/Profile/ProfilePhoto/ProfilePhoto";
import Avatar from "../../assets/images/profile/avatar.jpg";
import ProfileInputs from "../../components/Profile/ProfileInputs/ProfileInputs";
import Publications from "../../components/Publications/Publications";
import axios from "../../axios-db";
export class ProfilePage extends Component {
	token = null;
	role = null;
	state = {
		profile: {
			avatar: Avatar,
			general: {
				name: {
					label: [ "Полное имя", "Full name", "Uzb" ],
					config: {
						type: "text"
					},
					grid: {
						xs: 12
					},
					inputType: "input",
					value: ""
				},
				profession: {
					label: [ "Профессия", "Profession", "Uzb" ],
					config: {
						type: "text"
					},
					grid: {
						xs: 12
					},
					inputType: "input",
					value: ""
				},
				phone: {
					label: [ "Номер телефона", "Phone number", "Uzb" ],
					config: {
						type: "text"
					},
					grid: {
						xs: 12
					},
					inputType: "input",
					value: ""
				},
				about: {
					label: [ "О себе", "About me", "UZB" ],
					config: {},
					grid: {
						xs: 12
					},
					inputType: "textarea",
					value: ""
				}
			},
			security: {
				curPassword: {
					label: [ "Текущий пароль", "Current password", "Uzb" ],
					config: {
						type: "password",
						autoComplete: "current-password"
					},
					grid: {
						xs: 12
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
					grid: {
						xs: 12
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
					grid: {
						xs: 12
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
					grid: {
						xs: 12
					},
					inputType: "input",
					value: ""
				}
			}
		},
		publications: [
			{
				id: 0,
				title: "Доработать адаптивность сайта",
				date: "27.09.2019",
				type: 1
			},

			{
				id: 1,
				title: "Фронт-энд разработчик",
				date: "25.09.2019",
				type: 0
			},

			{
				id: 2,
				title: "Написать телеграм-бота",
				date: "21.09.2019",
				type: 1
			}
		],
		lang: 0,
		isClient: null,
		loading: true
	};

	componentDidMount() {
		this.token = localStorage.getItem("token");
		this.role = +localStorage.getItem("role");
		const url = this.role === 1 ? "/client" : "/user";
		console.log(url);
		axios
			.get(`${url}/current`, {
				headers: {
					Authorization: `${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				const data = res.data;
				this.assignUserValues(data);
				if (this.role === 1) {
					this.assignPublications(data);
				}
			})
			.catch(err => console.log(err));
	}
	// axiosGetCurrentUser(){

	// }
	assignUserValues = data => {
		const user = this.role ? data.clients : data.userdatas;
		const professionOrCompany = this.role ? user.company : user.user_position;
		let profile = { ...this.state.profile };

		profile.avatar = user.avatar;

		const values = {
			general: {
				name: data.fullname ? data.fullname : "",
				profession: professionOrCompany ? professionOrCompany : "",
				phone: user.phone ? user.phone : "",
				about: user.about ? user.about : ""
			},
			email: {
				email: data.email ? data.email : ""
			}
		};
		profile.general = this.getInputValues(profile.general, values.general);
		profile.email = this.getInputValues(profile.email, values.email);

		this.setState({ profile: profile });
	};
	assignPublications = data => {
		const publications = data.clients.publications.slice();
		this.setState({ publications: publications });
	};
	getInputValues = (objCopy, namesArray) => {
		const newObj = {
			...objCopy
		};
		const names = [];
		for (let key in namesArray) {
			names.push({
				key: key,
				value: namesArray[key]
			});
		}
		names.map(el => {
			newObj[el.key] = {
				...objCopy[el.key],
				value: el.value
			};
			return 1;
		});
		return newObj;
	};
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
		let formData = new FormData();
		const urlToStoreOverallInfo = this.role ? "/client" : "/userdata";
		const formDataFieldForCompanyOrPosition = this.role ? "company" : "user_position";
		switch (formType) {
			case "general":
				const general = {
					...this.state.profile.general
				};
				formData.append("fullname", general.name.value);
				formData.append(formDataFieldForCompanyOrPosition, general.profession.value);
				formData.append("phone", general.phone.value);
				formData.append("about", general.about.value);

				axios
					.post(urlToStoreOverallInfo, formData, {
						headers: {
							Authorization: this.token
						}
					})
					.then(res => console.log(res))
					.catch(err => console.log(err));
				break;
			case "email":
				const email = {
					...this.state.profile.email
				};
				formData.append("email", email.email.value);
				formData.append("_method", "PUT");
				axios
					.post("/userdata/email", formData, {
						headers: {
							Authorization: this.token
						}
					})
					.then(res => console.log(res))
					.catch(err => console.log(err));
				break;
			case "security":
				const security = {
					...this.state.profile.security
				};
				formData.append("old_password", security.curPassword.value);
				formData.append("password", security.newPassword.value);
				formData.append("_method", "PUT");
				axios
					.post("/userdata", formData, {
						headers: {
							Authorization: this.token
						}
					})
					.then(res => console.log(res))
					.catch(err => console.log(err));
				break;
			default:
				return;
		}
	};
	avatarChangeHandler = () => {
		console.log("Change Avatar");
	};
	publicationClickedHandler = (event, id) => {
		this.props.history.push(`/publications/${id}`);
	};
	removeClickedHandler = (event, id) => {
		console.log("Remove clicked with id", id);
	};
	addClickedHandler = () => {
		console.log("Add clicked");
		this.props.history.push("/add");
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
								{this.role ? (
									content.publications[this.state.lang]
								) : (
									content.additional[this.state.lang]
								)}
							</Header>
						</Grid>

						<Grid item xs={12}>
							{this.role ? (
								<Publications
									clicked={this.publicationClickedHandler}
									lang={this.state.lang}
									publications={this.state.publications}
									addClicked={this.addClickedHandler}
									removeClicked={this.removeClickedHandler}
									isAddable
								/>
							) : null}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default ProfilePage;
