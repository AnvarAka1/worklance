import React, { Component } from "react";
import NotificationItems from "../../components/NotificationItems/NotificationItems";
import Freelancers from "../../components/Freelancers/Freelancers";
import Freelancer from "../../components/Freelancers/Freelancer/Freelancer";
import Grid from "@material-ui/core/Grid";
import SearchBar from "../../components/SearchBar/SearchBar";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import Avatar from "../../assets/images/profile/avatar.jpg";
import Avatar1 from "../../assets/images/profile/avatar1.jpg";
import Avatar2 from "../../assets/images/profile/avatar2.jpg";
import Avatar3 from "../../assets/images/profile/avatar3.jpg";
export class FreelancersPage extends Component {
	state = {
		freelancers: [
			{
				id: 0,
				avatar: Avatar,
				name: "Claire Murphy",
				position_ru: "UI/UX Дизайнер",
				position_en: "UI/UX Designer",
				position_uz: "UI/UX Dizayner",
				text:
					"Minim pariatur deserunt aliquip excepteur sit aute in commodo anim. Excepteur consequat eiusmod excepteur ad incididunt sint deserunt id pariatur officia. Ut eiusmod est velit ullamco nostrud.",
				skills: [
					{
						id: 8,
						title: "Figma"
					},
					{
						id: 3,
						title: "Adobe Photoshop"
					},
					{
						id: 4,
						title: "Adobe Illustrator"
					},
					{
						id: 1,
						title: "Corel Draw"
					},
					{
						id: 2,
						title: "Adobe XD"
					},
					{
						id: 19,
						title: "Adobe Premiere"
					}
				]
			},
			{
				id: 1,
				avatar: Avatar1,
				name: "Dustin Alexander",
				position_ru: "Front-end Разработчик",
				position_en: "Front-end Developer",
				position_uz: "Front-end",
				text:
					"Sit do occaecat ad amet elit cupidatat aliqua esse amet. Nisi commodo et sunt occaecat enim cupidatat. Dolore aliquip dolor amet sit qui nisi laborum aliqua commodo officia.",
				skills: [
					{
						id: 8,
						title: "Figma"
					},
					{
						id: 3,
						title: "Adobe Photoshop"
					},
					{
						id: 4,
						title: "Adobe Illustrator"
					},
					{
						id: 1,
						title: "Corel Draw"
					},
					{
						id: 2,
						title: "Adobe XD"
					}
				]
			},
			{
				id: 2,
				avatar: Avatar2,
				name: "Claire Murphy",
				position_ru: "UI/UX Дизайнер",
				position_en: "UI/UX Designer",
				position_uz: "UI/UX Dizayner",
				text:
					"Minim pariatur deserunt aliquip excepteur sit aute in commodo anim. Excepteur consequat eiusmod excepteur ad incididunt sint deserunt id pariatur officia. Ut eiusmod est velit ullamco nostrud.",
				skills: [
					{
						id: 8,
						title: "Figma"
					},
					{
						id: 3,
						title: "Adobe Photoshop"
					},
					{
						id: 4,
						title: "Adobe Illustrator"
					},
					{
						id: 1,
						title: "Corel Draw"
					},
					{
						id: 2,
						title: "Adobe XD"
					},
					{
						id: 19,
						title: "Adobe Premiere"
					}
				]
			},
			{
				id: 3,
				avatar: Avatar3,
				name: "Claire Murphy",
				position_ru: "Copywriter",
				position_en: "Copywriter",
				position_uz: "Copywriter",
				text:
					"Voluptate nulla duis exercitation nisi. Amet sunt veniam cupidatat deserunt consequat laborum aute proident id. Dolor aute aliquip exercitation tempor sunt cillum ea.",
				skills: [
					{
						id: 8,
						title: "Figma"
					},
					{
						id: 3,
						title: "Adobe Photoshop"
					},
					{
						id: 4,
						title: "Adobe Illustrator"
					},
					{
						id: 1,
						title: "Corel Draw"
					},
					{
						id: 2,
						title: "Adobe XD"
					},
					{
						id: 19,
						title: "Adobe Premiere"
					}
				]
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
		freelancerSelected: 0,
		fleelancerOpen: false,
		loading: false,
		lang: 0
	};
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
		console.log("Freelancer with id " + id + " was clicked");
		this.setState({ freelancerSelected: id });
		this.freelancerModalOpenedHandler();
	};
	render() {
		const content = {
			button: [ "Закрыть", "Close" ]
		};
		const button = (
			<Button clicked={this.freelancerModalClosedHandler}>
				{content.button[this.props.lang ? this.props.lang : 0]}
			</Button>
		);
		let modal = (
			<Modal
				hasCloseButton
				scrollable
				open={this.state.fleelancerOpen}
				modalClosed={this.freelancerModalClosedHandler}
			>
				<Freelancer center button={button} clear {...this.state.freelancers[this.state.freelancerSelected]} />
			</Modal>
		);
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
					<Grid item md={8}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<SearchBar lang={this.state.lang} />
							</Grid>
							{freelancers}
						</Grid>
					</Grid>
					<Grid item md={4}>
						{notificationItems}
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export default FreelancersPage;
