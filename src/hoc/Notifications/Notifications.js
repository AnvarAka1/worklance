import React, { Component } from "react";
import axios from "../../axios-db";
import Grid from "@material-ui/core/Grid";
import NotificationItems from "../../components/NotificationItems/NotificationItems";
import SearchBar from "../../components/SearchBar/SearchBar";
import Avatar1 from "../../assets/images/profile/avatar1.jpg";
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
			options: {
				stack: [
					{
						id: 0,
						value: [ "Все", "All", "AllUzb" ]
					},
					{
						id: 1,
						value: [ "Некоторые", "Some", "SomeUzb" ]
					}
				],
				exp: [
					{
						id: 0,
						value: [ "", "" ]
					},
					{
						id: 1,
						value: [ "", "" ]
					}
				],
				cost: [
					{
						id: 0,
						value: 300
					},
					{
						id: 1,
						value: 15
					}
				]
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
			loading: true
		};
		componentDidMount() {
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
