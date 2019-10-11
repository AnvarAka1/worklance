import React, { Component } from "react";
import Projects from "../../components/Projects/Projects";
import NotificationItems from "../../components/NotificationItems/NotificationItems";
import Grid from "@material-ui/core/Grid";
export class ProjectsPage extends Component {
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
				name: "Anvar Abdulsatarov",
				text: "Hello, It's me",
				approved: true,
				date: "27.09"
			},
			{
				id: 1,
				userId: 1,
				name: "Anvar Abdulsatarov",
				text: "Hello, It's me",
				approved: true,
				date: "27.09"
			},
			{
				id: 2,
				userId: 2,
				name: "Anvar Abdulsatarov",
				text: "Hello, It's me",
				approved: true,
				date: "22.08"
			},
			{
				id: 3,
				userId: 1,
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
		this.setState({ loading: false });
	}
	render() {
		let projects = !this.state.loading ? <Projects lang={this.state.lang} projects={this.state.projects} /> : null;
		let notificationItems = !this.state.loading ? (
			<NotificationItems lang={this.state.lang} notificationItems={this.state.notificationItems} />
		) : null;
		return (
			<Grid container spacing={3}>
				<Grid item md={8}>
					<Grid container spacing={1}>
						{projects}
					</Grid>
				</Grid>
				<Grid item md={4}>
					{notificationItems}
				</Grid>
			</Grid>
		);
	}
}

export default ProjectsPage;
