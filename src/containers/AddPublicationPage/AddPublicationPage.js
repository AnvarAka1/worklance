import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/UI/Header/Header";
import ProfileInputs from "../../components/Profile/ProfileInputs/ProfileInputs";
import Publications from "../../components/Publications/Publications";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-db";
// import Hidden from "@material-ui/core/Hidden";
export class AddPublicationPage extends Component {
	profile = null;
	token = null;
	state = {
		form: {
			title: {
				label: [ "Название публикации", "Title of the publication", "Uzb" ],
				config: {
					type: "text"
				},
				grid: {
					sm: 8,
					xs: 12
				},
				inputType: "input",
				value: ""
			},
			description: {
				label: [ "Описание", "Description", "Uzb" ],
				config: {
					style: {
						height: "70vh"
					}
				},
				grid: {
					xs: 12
				},
				inputType: "textarea",
				value: ""
			},
			type: {
				label: [ "Тип публикации", "Publication type", "Uzb" ],
				config: {
					options: [
						{ value: 0, displayValue: [ "Проект", "Project", "Uzb" ] },
						{ value: 1, displayValue: [ "Вакансия", "Vacancy", "Uzb" ] }
					]
				},
				grid: {
					sm: 6
				},
				inputType: "select",
				value: "0"
			},
			price: {
				label: [ "Цена", "Price", "Uzb" ],
				config: {
					type: "text"
				},
				grid: {
					sm: 6
				},
				inputType: "input",
				value: ""
			}
		},

		publications: null,
		lang: 0,
		isClient: null,
		loading: true,
		submitted: false
	};
	componentDidMount() {
		this.setState({ loading: true });
		this.token = localStorage.getItem("token");
		this.getCurrentClient()
			.then(res => {
				this.profile = res.data;
				this.assignPublications(res.data);
				this.setState({ loading: false });
			})
			.catch(err => console.log(err));
	}
	componentDidUpdate() {
		if (this.state.submitted) {
			// this.setState({ submitted: false });
		}
	}

	getCurrentClient = () => {
		return axios.get("/client/current", {
			headers: {
				Authorization: this.token
			}
		});
	};
	assignPublications = data => {
		const publications = data.clients.publications.slice();
		this.setState({ publications: publications });
	};

	inputChangeHandler = (event, inputIdentifier, formType = null) => {
		const value = event.target.value;
		let form = {
			...this.state.form,
			[inputIdentifier]: {
				...this.state.form[inputIdentifier],
				value: value
			}
		};
		this.setState({ form: form });
	};

	backClickedHandler = () => {
		this.props.history.push("/profile");
	};
	addClickedHandler = () => {
		this.setState({ submitted: false });

		let formData = new FormData();
		const data = { ...this.state.form };

		formData.append("client_id", this.profile.id);
		formData.append("title", data.title.value);
		formData.append("description", data.description.value);
		formData.append("price", data.price.value);
		formData.append("type", data.type.value);
		formData.append("contact", this.profile.clients.phone);

		// check for response
		axios
			.post("/client/publication", formData, {
				headers: {
					Authorization: this.token
				}
			})
			.then(res => {
				this.setState({ submitted: true });
				this.getCurrentClient()
					.then(res => {
						this.assignPublications(res.data);
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	};
	publicationClickedHandler = (event, id) => {
		this.props.history.push(`/publications/${id}`);
	};
	removeClickedHandler = (event, id) => {
		console.log(id);
	};
	submitClickedHandler = event => {
		event.preventDefault();
	};

	render() {
		const content = {
			addPublication: [ "Добавить публикацию", "Add publication", "Uzb" ],
			publications: [ "Публикации", "Publications", "Uzb" ],
			addBtn: [ "Добавить", "Add", "Uzb" ],
			backBtn: [ "Назад", "Back", "Uzb" ],
			message: [ "Публикация успешно создана", "Publication was successfully created", "Uzb" ]
		};
		const message = this.state.submitted ? (
			<Header h={5} color="green">
				{content.message[this.state.lang ? this.state.lang : 0]}
			</Header>
		) : null;
		const customBtn = (
			<React.Fragment>
				<Button widerValue={1} clicked={this.backClickedHandler} grey>
					{content.backBtn[this.state.lang]}
				</Button>
				<Button wider blue clicked={this.addClickedHandler}>
					{content.addBtn[this.state.lang]}
				</Button>
			</React.Fragment>
		);
		const publications = (
			<Publications
				clicked={this.publicationClickedHandler}
				lang={this.state.lang}
				publications={this.state.publications}
				removeClicked={this.removeClickedHandler}
			/>
		);

		return (
			<Grid container spacing={3}>
				<Grid item sm={6}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Header h={5}>
								<i className="fa fa-plus-circle" /> {content.addPublication[this.state.lang]}
							</Header>
						</Grid>
						<Grid item sm={12}>
							<ProfileInputs
								changed={this.inputChangeHandler}
								submitted={this.submitClickedHandler}
								lang={this.state.lang}
								inputs={this.state.form}
								formType={null}
								customBtn={customBtn}
							/>
							{message}
						</Grid>
					</Grid>
				</Grid>
				<Grid item sm={1} />
				<Grid item sm={5}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Header h={5}>
								<i className="fa fa-user-lock" /> {content.publications[this.state.lang]}
							</Header>
						</Grid>

						<Grid item xs={12}>
							{publications}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default AddPublicationPage;
