import React, { Component } from "react";
import axios from "../../axios-db";
import NotificationItems from "../../components/NotificationItems/NotificationItems";
import Freelancers from "../../components/Freelancers/Freelancers";
import Freelancer from "../../components/Freelancers/Freelancer/Freelancer";
import Grid from "@material-ui/core/Grid";
import SearchBar from "../../components/SearchBar/SearchBar";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import Avatar1 from "../../assets/images/profile/avatar1.jpg";
export class FreelancersPage extends Component {
	token = null;
	state = {
		freelancers: null,
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
		freelancerSelected: 0,
		fleelancerOpen: false,
		loading: true,
		lang: 0
	};
	componentDidMount() {
		this.token = localStorage.getItem("token");
		this.setState({ loading: true });
		axios
			.get("/userdata/02", {
				headers: {
					Authorization: this.token
				}
			})
			.then(res => {
				this.setState({ freelancers: res.data, loading: false });
			})
			.catch(err => console.log(err));
	}
	freelancerModalOpenedHandler = () => {
		this.setState({
			fleelancerOpen: true
		});
	};
	freelancerModalClosedHandler = () => {
		this.setState({
			fleelancerOpen: false
		});
	};
	freelancerClickedHandler = (event, id) => {
		this.setState({ freelancerSelected: id });
		this.freelancerModalOpenedHandler();
	};
	freelancerIndex(id) {
		const fl = this.state.freelancers.filter(freelancer => {
			return +freelancer.id === +id;
		});
		return fl[0];
	}
	render() {
		const content = {
			button: [ "Закрыть", "Close" ]
		};

		const button = (
			<Button noHover clicked={this.freelancerModalClosedHandler}>
				{content.button[this.props.lang ? this.props.lang : 0]}
			</Button>
		);

		let modal = !this.state.loading ? (
			<Modal
				narrow
				hasCloseButton
				scrollable
				open={this.state.fleelancerOpen}
				modalClosed={this.freelancerModalClosedHandler}
			>
				<Freelancer center button={button} clear {...this.freelancerIndex(this.state.freelancerSelected)} />
			</Modal>
		) : null;
		let freelancers = !this.state.loading ? (
			<Freelancers
				inline
				freelancers={this.state.freelancers}
				lang={this.state.lang}
				freelancerClicked={this.freelancerClickedHandler}
			/>
		) : null;
		let notificationItems = !this.state.loading ? (
			<NotificationItems
				archiveClicked={this.archiveClickedHandler}
				viewClicked={this.viewClickedHandler}
				lang={this.state.lang}
				notificationItems={this.state.notificationItems}
			/>
		) : null;
		return (
			<React.Fragment>
				{modal}
				<Grid container spacing={3}>
					<Grid item md={8} xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<SearchBar lang={this.state.lang} />
							</Grid>
							{freelancers}
						</Grid>
					</Grid>
					<Grid item md={4} xs={12}>
						{notificationItems}
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export default FreelancersPage;
