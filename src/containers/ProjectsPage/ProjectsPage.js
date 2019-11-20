import React, { Component } from "react";
import Projects from "../../components/Projects/Projects";
import Grid from "@material-ui/core/Grid";
import NotificationItems from "../../components/NotificationItems/NotificationItems";
import SearchBar from "../../components/SearchBar/SearchBar";
import Project from "../../components/Projects/Project/Project";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import Avatar1 from "../../assets/images/profile/avatar1.jpg";
import axios from "../../axios-db";
export class ProjectsPage extends Component {
	_isMounted = false;
	state = {
		projects: [
			{
				id: 0,
				authorId: 1,
				title: "Доработать адаптивность сайта",
				author: "MyTaxi Ltd",
				text:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum auctor ridiculus vitae. Est sagittis, at volutpat turpis tellus faucibus commodo. Sit nulla tortor nibh nisi, eros. Scelerisque suspendisse erat sit ultricies tristique.  Est sagittis, at volutpat turpis tellus faucibus commodo",
				price: "300"
			},
			{
				id: 1,
				authorId: 2,
				title: "Доработать адаптивность сайта",
				author: "MyTaxi Ltd",
				text:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum auctor ridiculus vitae. Est sagittis, at volutpat turpis tellus faucibus commodo. Sit nulla tortor nibh nisi, eros. Scelerisque suspendisse erat sit ultricies tristique.  Est sagittis, at volutpat turpis tellus faucibus commodo",
				price: "400"
			},
			{
				id: 2,
				authorId: 1,
				title: "Доработать адаптивность сайта",
				author: "MyTaxi Ltd",
				text:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum auctor ridiculus vitae. Est sagittis, at volutpat turpis tellus faucibus commodo. Sit nulla tortor nibh nisi, eros. Scelerisque suspendisse erat sit ultricies tristique.  Est sagittis, at volutpat turpis tellus faucibus commodo",
				price: "100"
			}
		],
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
			<Button clicked={this.projectModalClosedHandler}>
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
				lang={this.state.lang}
				hover={this.state.hover}
				onHover={this.onHoverEnter}
				onUnHover={this.onHoverLeave}
				projects={this.state.projects}
				projectClicked={this.projectClickedHandler}
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
							{projects}
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

export default ProjectsPage;
