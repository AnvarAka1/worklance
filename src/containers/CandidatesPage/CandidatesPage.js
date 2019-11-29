import React, { Component } from "react";
import axios from "../../axios-db";
import Freelancers from "../../components/Freelancers/Freelancers";
import Freelancer from "../../components/Freelancers/Freelancer/Freelancer";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import Notifications from "../../hoc/Notifications/Notifications";
export class CandidatesPage extends Component {
	token = null;
	state = {
		candidates: null,
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

		return (
			<React.Fragment>
				{modal}
				{candidates}
			</React.Fragment>
		);
	}
}

export default Notifications(CandidatesPage);
