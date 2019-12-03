import React, { Component } from "react";
import axios from "../../axios-db";
import Grid from "@material-ui/core/Grid";
import NotificationItems from "../../components/NotificationItems/NotificationItems";
import SearchBar from "../../components/SearchBar/SearchBar";
import Avatar1 from "../../assets/images/profile/avatar1.jpg";
import Filters from "../../components/Filters/Filters";
const Notifications = WrappedComponent => {
	return class extends Component {
		token = null;
		role = null;
		constructor(props) {
			super(props);
			this.token = localStorage.getItem("token");
			this.role = +localStorage.getItem("role");
		}
		state = {
			search: {
				search: "",
				stack: "",
				exp: "",
				cost: ""
			},
			filter: {
				multiSelect: {
					stack: {
						options: [
							{
								id: 0,
								values: [ "Все", "All", "AllUzb" ]
							},
							{
								id: 1,
								values: [ "Некоторые", "Some", "SomeUzb" ]
							}
						],
						placeholder: "Стек",
						value: []
					},
					exp: {
						options: [
							{
								id: 0,
								values: [ "212", "1231" ]
							},
							{
								id: 1,
								values: [ "333", "3333" ]
							}
						],
						placeholder: "Навыки",
						value: []
					}
				},
				cost: {
					inputType: "input",
					config: {
						type: "text",
						placeholder: "Цена начиная с...$"
					},
					value: ""
				}
			},
			notificationItems: [
				{
					id: 0,
					userId: 1,
					avatar: Avatar1,
					name: "Anvar Abdulsatarov",
					text: "Hello, It's me",
					approved: true,
					date: "27.09"
				},
				{
					id: 1,
					userId: 1,
					avatar: Avatar1,
					name: "Anvar Abdulsatarov",
					text: "Hello, It's me",
					approved: true,
					date: "27.09"
				},
				{
					id: 2,
					userId: 2,
					avatar: Avatar1,
					name: "Anvar Abdulsatarov",
					text: "Hello, It's me",
					approved: true,
					date: "22.08"
				},
				{
					id: 3,
					userId: 1,
					avatar: Avatar1,
					name: "Anvar Abdulsatarov",
					text: "Hello, It's me",
					approved: true,
					date: "27.09"
				}
			],
			lang: 0,
			filterOpen: false,
			loading: true
		};
		componentDidMount() {
			if (localStorage.getItem("token"))
				this.getCurrentUser()
					.then(res => {
						console.log(res);
						let fRoles = [ "freelancers", "candidates", "f_can" ];
						if (+res.data.role) {
							console.log("here");
							return axios.get("/notification/clients", {
								headers: {
									Authorization: this.token
								}
							});
						} else {
							console.log("here");
							return axios.get(`/notification/${fRoles[+res.data.userdatas.profile]}`, {
								headers: {
									Authorization: this.token
								}
							});
						}
					})
					.then(res => {
						console.log(res.data);
						this.setState({ notificationItems: res.data, loading: false });
					})
					.catch(err => console.log(err));
		}
		filterClickedHandler = event => {
			event.preventDefault();
			this.setState(prevState => {
				return {
					filterOpen: !prevState.filterOpen
				};
			});
		};
		getCurrentUser = () => {
			const url = this.role ? "/client" : "/user";
			return axios.get(`${url}/current`, {
				headers: {
					Authorization: this.token
				}
			});
		};
		getInputConfigs = () => {};
		searchChangedHandler = event => {
			console.log("Search " + event.target.value);
		};

		searchSubmitHandler = event => {
			event.preventDefault();
			console.log("Search Submitted");
		};

		costChangeHandler = event => {
			const filter = {
				...this.state.filter,
				cost: {
					...this.state.filter.cost,
					value: event.target.value
				}
			};
			this.setState({ filter: filter });
		};
		selectChangeHandler = (event, key) => {
			const filter = {
				...this.state.filter,
				multiSelect: {
					...this.state.filter.multiSelect,
					[key]: {
						...this.state.filter.multiSelect[key],
						value: event.target.value
					}
				}
			};
			this.setState({ filter: filter });
		};
		filterSubmitHandler = () => {
			console.log("Filter submitted");
		};
		render() {
			let notificationItems = !this.state.loading ? (
				<NotificationItems
					archiveClicked={this.archiveClickedHandler}
					viewClicked={this.viewClickedHandler}
					lang={this.state.lang}
					notificationItems={this.state.notificationItems}
				/>
			) : null;
			return (
				<Grid container spacing={3}>
					<Grid item md={8} xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<SearchBar
									elementConfig={this.state.search}
									changed={this.searchChangedHandler}
									submitted={this.searchSubmitHandler}
									filterClicked={this.filterClickedHandler}
									lang={this.state.lang}
								/>
								{this.state.filterOpen && (
									<Filters
										selects={this.state.filter.multiSelect}
										selectChanged={this.selectChangeHandler}
										costChanged={this.costChangeHandler}
										filterSubmitted={this.filterSubmitHandler}
										cost={this.state.filter.cost}
									/>
								)}
							</Grid>
							<WrappedComponent {...this.props} />
						</Grid>
					</Grid>
					<Grid item md={4} xs={12}>
						{notificationItems}
					</Grid>
				</Grid>
			);
		}
	};
};
export default Notifications;
