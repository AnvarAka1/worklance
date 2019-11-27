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
export class CandidatesPage extends Component {
	token = null;
	state = {
		candidates: null,
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
		candidateSelected: 0,
		fleelancerOpen: false,
		loading: true,
		lang: 0
	};
	componentDidMount() {
		this.token = localStorage.getItem("token");
		this.setState({ loading: true });
		axios
			.get("/userdata/12", {
				headers: {
					Authorization: this.token
				}
			})
			.then(res => {
				this.setState({ candidates: res.data, loading: false });
			})
			.catch(err => console.log(err));
	}
	candidateModalOpenedHandler = () => {
		this.setState({
			fleelancerOpen: true
		});
	};
	candidateModalClosedHandler = () => {
		this.setState({
			fleelancerOpen: false
		});
	};
	candidateClickedHandler = (event, id) => {
		this.setState({ candidateSelected: id });
		this.candidateModalOpenedHandler();
	};
	candidateIndex(id) {
		const fl = this.state.candidates.filter(candidate => {
			return +candidate.id === +id;
		});
		return fl[0];
	}
	render() {
		const content = {
			button: [ "Закрыть", "Close" ]
		};

		const button = (
			<Button noHover clicked={this.candidateModalClosedHandler}>
				{content.button[this.props.lang ? this.props.lang : 0]}
			</Button>
		);

		let modal = !this.state.loading ? (
			<Modal
				narrow
				hasCloseButton
				scrollable
				open={this.state.fleelancerOpen}
				modalClosed={this.candidateModalClosedHandler}
			>
				<Freelancer center button={button} clear {...this.candidateIndex(this.state.candidateSelected)} />
			</Modal>
		) : null;
		let candidates = !this.state.loading ? (
			<Freelancers
				inline
				freelancers={this.state.candidates}
				lang={this.state.lang}
				loading={this.state.loading}
				fleelancerOpen={this.state.fleelancerOpen}
				candidateModalClosed={this.candidateModalClosedHandler}
				freelancerClicked={this.candidateClickedHandler}
				index={this.candidateIndex(this.state.candidateSelected)}
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
							{candidates}
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

export default CandidatesPage;
