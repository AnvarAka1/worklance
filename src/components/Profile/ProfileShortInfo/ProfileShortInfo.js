import React from "react";
import classes from "./ProfileShortInfo.module.css";
import Header from "../../UI/Header/Header";
const profileShortInfo = props => {
	const profileShortInfoClasses = [
		classes.ProfileShortInfo,
		props.profileShortInfoClass && classes[props.profileShortInfoClass],
		props.mr && classes.Mr,
		props.alignRight && classes.AlignRight
	];
	const { name, role, lang } = props;
	const content = {
		freelancer: [ "Фрилансер", "Freelancer", "Uzb" ],
		client: [ "Клиент", "Client", "Uzb" ]
	};
	let position;
	switch (+role) {
		case 0:
			position = content.freelancer[lang ? lang : 0];
			break;
		case 1:
			position = content.client[lang ? lang : 0];
			break;
		default:
			position = role;
			break;
	}
	return (
		<div className={profileShortInfoClasses.join(" ")}>
			<Header h={6}>{name}</Header>
			<Header h={6} normal>
				{position}
			</Header>
		</div>
	);
};

export default profileShortInfo;
