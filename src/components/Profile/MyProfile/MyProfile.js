import React from "react";
import classes from "./MyProfile.module.css";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import ProfileShortInfo from "../ProfileShortInfo/ProfileShortInfo";
import Button from "../../UI/Button/Button";
import Hidden from "@material-ui/core/Hidden";
import { NavLink } from "react-router-dom";
const myProfile = props => {
	const myProfileClasses = [ classes.MyProfile, props.myProfileClass && classes[props.myProfileClass] ];
	return (
		<div className={classes.MyProfileWrapper}>
			<NavLink to={"/profile"}>
				<div className={myProfileClasses.join(" ")}>
					<Hidden xsDown>
						<ProfileShortInfo mr alignRight {...props.profile} />
					</Hidden>
					<ProfilePhoto {...props.profile} />
				</div>
			</NavLink>
			<Hidden smDown>
				<Button clicked={props.logoutModalOpened}>Выйти</Button>
			</Hidden>
		</div>
	);
};

export default myProfile;
