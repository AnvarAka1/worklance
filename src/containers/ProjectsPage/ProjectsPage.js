import React, { Component } from "react";
import Projects from "../../components/Projects/Projects";
import Project from "../../components/Projects/Project/Project";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-db";
import Notifications from "../../hoc/Notifications/Notifications";
export class ProjectsPage extends Component {
	_isMounted = false;
	state = {
		projects: null,
		lang: 0,
		hover: false,
		loading: true,
		projectOpen: false
	};
	componentDidMount() {
		this._isMounted = true;
		this.setState({ loading: true });
		axios
			.get("/projects")
			.then(res => {
				if (this._isMounted) {
					this.setState({ projects: res.data, loading: false });
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
	};
	onHoverEnter = id => {
		this.setState({ hover: id });
	};
	onHoverLeave = id => {
		this.setState({ hover: -1 });
	};
	projectModalOpenedHandler = () => {
		this.setState({
			projectOpen: true
		});
	};
	projectModalClosedHandler = () => {
		this.setState({
			projectOpen: false
		});
	};
	projectClickedHandler = (event, id) => {
		this.setState({ projectSelected: id });
		this.projectModalOpenedHandler();
	};
	projectIndex(id) {
		const fl = this.state.projects.filter(project => {
			return +project.id === +id;
		});

		return fl[0];
	}
	render() {
		const content = {
			button: [ "Закрыть", "Close" ]
		};
		const button = (
			<Button noHover clicked={this.projectModalClosedHandler}>
				{content.button[this.props.lang ? this.props.lang : 0]}
			</Button>
		);
		let modal = !this.state.loading ? (
			<Modal
				narrow
				hasCloseButton
				scrollable
				open={this.state.projectOpen}
				modalClosed={this.projectModalClosedHandler}
			>
				<Project center button={button} clear {...this.projectIndex(this.state.projectSelected)} />
			</Modal>
		) : null;
		let projects = !this.state.loading ? (
			<Projects
				maxHeight
				lang={this.state.lang}
				hover={this.state.hover}
				onHover={this.onHoverEnter}
				onUnHover={this.onHoverLeave}
				projects={this.state.projects}
				projectClicked={this.projectClickedHandler}
			/>
		) : null;
		return (
			<React.Fragment>
				{modal}
				{projects}
			</React.Fragment>
		);
	}
}

export default Notifications(ProjectsPage);
