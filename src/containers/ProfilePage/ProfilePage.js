import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/UI/Header/Header";
import ProfilePhoto from "../../components/Profile/ProfilePhoto/ProfilePhoto";

import ProfileInputs from "../../components/Profile/ProfileInputs/ProfileInputs";
import Publications from "../../components/Publications/Publications";
import AdditionalBlock from "../../components/AdditionalBlock/AdditionalBlock";
import ChangeProfileBlock from "../../components/ChangeProfileBlock/ChangeProfileBlock";
import axios from "../../axios-db";
import Hidden from "@material-ui/core/Hidden";
export class ProfilePage extends Component {
	token = null;
	role = null;
	state = {
		profile: {
			avatar: null,
			avatarInput: {
				key: "file",
				config: {
					name: "file",
					type: "file",
					id: "file"
				},
				inputType: "file",
				grid: {
					xs: 12
				},
				value: ""
			},
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
		publications: null,
		additional: {
			experience: {
				label: [ "Опыт работы", "Work experience", "Uzb" ],
				config: {
					type: "text"
				},
				grid: {
					xs: 12
				},
				inputType: "input",
				value: ""
			},
			portfolio: [
				{
					id: 0,
					config: {
						type: "text"
					},
					grid: {
						xs: 12
					},
					inputType: "input",
					value: ""
				}
			],
			skills: {
				label: [ "Навыки", "Skills", "Uzb" ],
				config: {
					type: "text"
				},
				grid: {
					xs: 12
				},
				inputType: "input",
				value: ""
			}
		},
		message: null,
		success: null,
		lang: 0,
		profileType: 0,
		isClient: null,
		selectedFile: null,
		avatarError: null,
		loading: true
	};

	componentDidMount() {
		this.setState({ loading: true });
		this.token = localStorage.getItem("token");
		this.role = +localStorage.getItem("role");
		const url = this.role === 1 ? "/client" : "/user";
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
					// is Client
					this.setState({ isClient: true });
					this.assignPublications(data);
				} else {
					// is Freelancer

					this.assignAdditionalBlock(data);
					this.assignProfileBlock(data.userdatas.profile);
					this.setState({ loading: false, isClient: false });
				}
			})
			.catch(err => console.log(err));
	}
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
	assignAdditionalBlock = data => {
		const dt = data.userdatas;
		let additional = {
			...this.state.additional,
			experience: {
				...this.state.additional.experience,
				value: dt.experience ? dt.experience : ""
			},

			portfolio: this.assignPortfolios(data),
			skills: {
				...this.state.additional.skills,
				value: dt.skills ? JSON.parse(dt.skills) : ""
			}
		};

		this.setState({ additional: additional });
	};
	additionalInputChangeHandler = (event, inputIdentifier) => {
		const value = event.target.value;
		const additional = {
			...this.state.additional,
			[inputIdentifier]: {
				...this.state.additional[inputIdentifier],
				value: value
			}
		};
		this.setState({ additional: additional });
	};
	// ------------------------------------------------ PORTFOLIO START
	assignPortfolios = data => {
		const portfolio = data.userdatas.portfolio;
		let portfolioFromState = this.state.additional.portfolio.slice();
		let newPortfolio = [];
		if (portfolio) {
			const portfolioArray = portfolio.split(",").map(el => {
				return el.trim();
			});
			newPortfolio = portfolioArray.map((el, index) => {
				return {
					...portfolioFromState[0],
					id: index,
					value: el
				};
			});
		} else {
			newPortfolio = portfolioFromState.slice();
		}
		return newPortfolio;
	};
	portfolioInputChangeHandler = (event, id) => {
		const value = event.target.value;
		let additional = {
			...this.state.additional
		};
		let portfolio = additional.portfolio.slice();
		const index = portfolio.findIndex(el => el.id === id);
		portfolio[index].value = value;
		additional.portfolio = portfolio;
		this.setState({ additional: additional });
	};

	addPortfolio = event => {
		event.preventDefault();
		let additional = { ...this.state.additional };
		let portfolio = additional.portfolio.slice();
		const lastIndex = portfolio.length - 1;
		let idOfLastElement = portfolio[lastIndex].id;
		let neededId = idOfLastElement;
		let idToUse;
		let isDuplicated = false;
		do {
			neededId++;
			isDuplicated = false;
			//check
			// eslint-disable-next-line
			isDuplicated = portfolio.indexOf(el => el.id === neededId) < 0 ? false : true;
			idToUse = neededId;
		} while (isDuplicated);
		portfolio.push({
			id: idToUse,
			config: {
				type: "text"
			},
			grid: {
				xs: 12
			},
			inputType: "input",
			value: ""
		});
		additional.portfolio = portfolio;
		this.setState({ additional: additional });
	};

	// ----------------------------------------------- END OF PORTFOLIO
	assignProfileBlock = profileType => {
		this.setState({ profileType: profileType });
	};
	profileTypeHandler = (event, type) => {
		event.preventDefault();
		let formData = new FormData();
		formData.append("profile", type);
		formData.append("_method", "PUT");
		axios
			.post("/userdata/profile", formData, {
				headers: {
					Authorization: this.token
				}
			})
			.then(res => {
				this.assignProfileBlock(+res.data);
			})
			.catch(err => console.log(err));
	};

	formSubmitHandler = (event, formType) => {
		event.preventDefault();
		this.setState({ success: null });
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
				formData.append(
					"avatar",
					this.state.selectedFile && this.state.selectedFile,
					this.state.selectedFile && this.state.selectedFile.name
				);

				// check for response
				// maybe add authCheckState
				axios
					.post(urlToStoreOverallInfo, formData, {
						headers: {
							Authorization: this.token
						}
					})
					.then(res => {
						const success = "general";
						this.setState({ success: success });
					})
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
					.then(res => {
						const success = "email";
						this.setState({ success: success });
					})
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
					.then(res => {
						const success = "security";
						this.setState({ success: success });
					})
					.catch(err => console.log(err));
				break;
			default:
				return;
		}
	};

	avatarChangeHandler = event => {
		this.setState({ avatarError: null });
		const error = [
			"Размер файла не должен превышать 2 мегабайт!",
			"File size should not be greater than 2 mb!",
			"Uzb"
		];
		if (event.target.files[0].size / 1024 / 1024 > 2) {
			this.setState({ avatarError: error[this.props.lang ? this.props.lang : 0] });
		} else {
			this.setState({
				selectedFile: event.target.files[0]
			});
		}
	};
	publicationClickedHandler = (event, id) => {
		this.props.history.push(`/publications/${id}`);
	};
	removeClickedHandler = (event, id) => {
		console.log("Remove clicked with id", id);
	};
	addClickedHandler = () => {
		this.props.history.push("/add");
	};
	addMoreHandler = () => {};
	additionalHandler = event => {
		event.preventDefault();
		let formData = new FormData();
		const data = { ...this.state.additional };
		const filteredPortfolio = data.portfolio.filter(el => {
			return el.value !== "";
		});

		const values = filteredPortfolio.map(el => {
			return el.value;
		});

		formData.append("experience", data.experience.value);
		formData.append("portfolio", JSON.stringify(values));
		formData.append("skills", data.skills.value);
		axios
			.post("/userdata/addition", formData, {
				headers: {
					Authorization: this.token
				}
			})
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};
	returnGeneralInput = () => {
		const label = [ "Компания/Должность", "Company/Position", "Uzb" ];
		let general = {
			...this.state.profile.general,
			profession: {
				...this.state.profile.general.profession,
				label: label
			}
		};
		return general;
	};
	render() {
		const content = {
			general: [ "Общая информация", "General information", "InfoUzb" ],
			security: [ "Безопасность", "Security", "Uzb" ],
			publications: [ "Публикации", "Publications", "Uzb" ],
			additional: [ "Дополнительно", "Additionally", "Uzb" ]
		};
		let additional = null;
		if (!this.role) {
			additional = {
				...this.state.additional
			};
		}
		const publications = (
			<Publications
				clicked={this.publicationClickedHandler}
				lang={this.state.lang}
				publications={this.state.publications}
				addClicked={this.addClickedHandler}
				removeClicked={this.removeClickedHandler}
				isAddable
			/>
		);

		return (
			<Grid container spacing={3}>
				<Grid item md={6} sm={12}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Header h={5}>
								<i className="fa fa-user" /> {content.general[this.state.lang]}
							</Header>
						</Grid>
						<Grid item md={4} sm={6} xs={12}>
							<ProfilePhoto
								error={this.state.avatarError}
								change
								avatarChanged={this.avatarChangeHandler}
								avatar={this.state.profile.avatar}
								name={"Avatar"}
								lang={this.state.lang}
								large
								input={this.state.profile.avatarInput}
								loading={this.state.loading}
							/>
						</Grid>

						<Grid item md={8} sm={6} xs={12}>
							<ProfileInputs
								success={this.state.success}
								half
								changed={this.inputChangeHandler}
								inputs={this.state.isClient ? this.returnGeneralInput() : this.state.profile.general}
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
						<Grid item sm={6} xs={12}>
							<ProfileInputs
								success={this.state.success}
								changed={this.inputChangeHandler}
								inputs={this.state.profile.security}
								lang={this.state.lang}
								formType={"security"}
								submitted={this.formSubmitHandler}
							/>
						</Grid>
						<Grid item sm={6} xs={12}>
							<ProfileInputs
								success={this.state.success}
								changed={this.inputChangeHandler}
								inputs={this.state.profile.email}
								lang={this.state.lang}
								formType={"email"}
								submitted={this.formSubmitHandler}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Hidden smDown>
					<Grid item sm={1} />
				</Hidden>
				<Grid item md={5} sm={12} xs={12}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Header h={5}>
								{this.role ? (
									<React.Fragment>
										<i className="fa fa-user-lock" /> {content.publications[this.state.lang]}
									</React.Fragment>
								) : null}
							</Header>
						</Grid>

						<Grid item xs={12}>
							{this.role ? (
								<React.Fragment>{publications}</React.Fragment>
							) : (
								<AdditionalBlock
									addMoreClicked={this.addMoreHandler}
									clicked={this.additionalHandler}
									form={additional}
									addPortfolio={this.addPortfolio}
									changed={this.additionalInputChangeHandler}
									portfolioChanged={this.portfolioInputChangeHandler}
									lang={this.state.lang}
								/>
							)}
							{this.role ? null : (
								<ChangeProfileBlock
									lang={this.state.lang}
									type={this.state.profileType}
									clicked={this.profileTypeHandler}
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
