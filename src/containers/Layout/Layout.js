import React, { Component } from "react";
import NavigationItems from "../../components/NavigationItems/NavigationItems";
export class Layout extends Component {
	render() {
		return (
			<div>
				<NavigationItems />
				{this.props.children}
			</div>
		);
	}
}

export default Layout;
