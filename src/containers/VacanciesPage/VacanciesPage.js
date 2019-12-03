import React, { Component } from "react";
import Projects from "../../components/Projects/Projects";
import Project from "../../components/Projects/Project/Project";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-db";
import Notifications from "../../hoc/Notifications/Notifications";
export class VacanciesPage extends Component {
	_isMounted = false;
	state = {
		vacancies: null,
		lang: 0,
		hover: false,
		vacancyOpen: false,
		vacancySelected: null,
		loading: true
	};
	componentDidMount() {
		this._isMounted = true;
		this.setState({ loading: true });
		axios
			.get("/vacancies")
			.then(res => {
				if (this._isMounted) {
					this.setState({ vacancies: res.data, loading: false });
				}
			})
			.catch(err => {
				console.log(err);
			});
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	archiveClickedHandler = (event, id) => {
		console.log("Archive was clicked");
	};
	viewClickedHandler = (event, id) => {
		event.preventDefault();
		console.log("You clicked " + id);
	};
	onHoverEnter = id => {
		this.setState({ hover: id });
	};
	onHoverLeave = id => {
		this.setState({ hover: -1 });
	};
	vacancyModalOpenedHandler = () => {
		this.setState({
			vacancyOpen: true
		});
	};
	vacancyModalClosedHandler = () => {
		this.setState({
			vacancyOpen: false
		});
	};
	vacancyClickedHandler = (event, id) => {
		this.setState({ vacancySelected: id });
		this.vacancyModalOpenedHandler();
	};
	vacancyIndex(id) {
		const fl = this.state.vacancies.filter(vacancy => {
			return +vacancy.id === +id;
		});

		return fl[0];
	}
	render() {
		const content = {
			button: [ "Закрыть", "Close" ]
		};
		const button = (
			<Button noHover clicked={this.vacancyModalClosedHandler}>
				{content.button[this.props.lang ? this.props.lang : 0]}
			</Button>
		);
		let modal = !this.state.loading ? (
			<Modal
				narrow
				hasCloseButton
				scrollable
				open={this.state.vacancyOpen}
				modalClosed={this.vacancyModalClosedHandler}
			>
				<Project center button={button} clear {...this.vacancyIndex(this.state.vacancySelected)} />
			</Modal>
		) : null;
		let vacancies = !this.state.loading ? (
			<Projects
				maxHeight
				lang={this.state.lang}
				hover={this.state.hover}
				onHover={this.onHoverEnter}
				onUnHover={this.onHoverLeave}
				projects={this.state.vacancies}
				projectClicked={this.vacancyClickedHandler}
			/>
		) : null;

		return (
			<React.Fragment>
				{modal}
				{vacancies}
			</React.Fragment>
		);
	}
}

export default Notifications(VacanciesPage);
