import React, { Component } from "react";
import axios from "../../axios-db";
import Freelancers from "../../components/Freelancers/Freelancers";
import Freelancer from "../../components/Freelancers/Freelancer/Freelancer";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import Notifications from "../../hoc/Notifications/Notifications";
export class FreelancersPage extends Component {
	token = null;
	state = {
		freelancers: null,
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

		return (
			<React.Fragment>
				{modal}
				{freelancers}
			</React.Fragment>
		);
	}
}

export default Notifications(FreelancersPage);
