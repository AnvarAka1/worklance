import React, { Component } from "react";
import NavigationItems from "../../components/NavigationItems/NavigationItems";
import Container from "@material-ui/core/Container";
import Avatar from "../../assets/images/profile/avatar2.jpg";
export class Layout extends Component {
	state = {
		profile: {
			avatar: Avatar,
			name: "Geralt of Rivia",
			position_en: "ReactJS Developer",
			position_ru: "ReactJS Разработчик"
		}
	};
	render() {
		return (
			<div>
				<NavigationItems profile={this.state.profile} />
				<Container maxWidth="xl"> {this.props.children}</Container>
			</div>
		);
	}
}

export default Layout;
