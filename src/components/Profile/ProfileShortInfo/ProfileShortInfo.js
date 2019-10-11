import React from "react";
import classes from "./ProfileShortInfo.module.css";
import Header from "../../UI/Header/Header";
const profileShortInfo = props => {
	const profileShortInfoClasses = [
		classes.ProfileShortInfo,
		props.profileShortInfoClass && classes[props.profileShortInfoClass],
		props.mr && classes.Mr
	];
	const { name, position_en, position_ru, lang } = props;
	return (
		<div className={profileShortInfoClasses.join(" ")}>
			<Header h={6}>{name}</Header>
			<Header h={6} normal>
				{lang ? position_en : position_ru}
			</Header>
		</div>
	);
};

export default profileShortInfo;
