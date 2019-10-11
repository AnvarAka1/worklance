import React from "react";
import classes from "./MyProfile.module.css";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import ProfileShortInfo from "../ProfileShortInfo/ProfileShortInfo";
import { NavLink } from "react-router-dom";
const myProfile = props => {
	const myProfileClasses = [ classes.MyProfile, props.myProfileClass && classes[props.myProfileClass] ];
	return (
		<NavLink to={"/user"}>
			<div className={myProfileClasses.join(" ")}>
				<ProfileShortInfo mr {...props.profile} />
				<ProfilePhoto {...props.profile} />
			</div>
		</NavLink>
	);
};

export default myProfile;
