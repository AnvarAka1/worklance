import React from "react";
import classes from "./ProfilePhoto.module.css";
import Photo from "../../../assets/images/profile/avatar1.jpg";
// import { NavLink } from "react-router-dom";
const profilePhoto = props => {
	const { avatar, name } = props;
	const profilePhotoClasses = [
		classes.ProfilePhoto,
		props.profilePhotoClass && classes[props.profilePhotoClass],
		props.big && classes.Big
	];
	return (
		<div className={profilePhotoClasses.join(" ")}>
			<img src={avatar ? avatar : Photo} alt={name} />
		</div>
	);
};

export default profilePhoto;
