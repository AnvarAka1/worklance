import React from "react";
import classes from "./MyProfile.module.css";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import ProfileShortInfo from "../ProfileShortInfo/ProfileShortInfo";
import Button from "../../UI/Button/Button";
import { NavLink } from "react-router-dom";
const myProfile = props => {
	const myProfileClasses = [ classes.MyProfile, props.myProfileClass && classes[props.myProfileClass] ];
	return (
		<div className={classes.MyProfileWrapper}>
			<NavLink to={"/profile"}>
				<div className={myProfileClasses.join(" ")}>
					<ProfileShortInfo mr alignRight {...props.profile} />
					<ProfilePhoto {...props.profile} />
				</div>
			</NavLink>
			<NavLink to={"/logout"}>
				<Button>Выйти</Button>
			</NavLink>
		</div>
	);
};

export default myProfile;
