import React from "react";
import classes from "./ProfilePhoto.module.css";
import Header from "../../UI/Header/Header";
import Input from "../../UI/Input/Input";
import Skeleton from "@material-ui/lab/Skeleton";
const profilePhoto = props => {
	const { avatar, name, lang } = props;
	const profilePhotoClasses = [
		classes.ProfilePhoto,
		props.profilePhotoClass && classes[props.profilePhotoClass],
		props.big && classes.Big,
		props.large && classes.Large,
		props.change && classes.Change
	];

	const content = {
		changeAvatar: [ "Изменить фотографию", "Change photo", "UZB" ]
	};

	const text = (
		<Header h={6} normal center mt>
			{content.changeAvatar[lang ? lang : 0]}
		</Header>
	);
	const input = props.input ? (
		<Input changed={props.avatarChanged} elementConfig={props.input.config} {...props.input} text={text} />
	) : null;
	const error = props.error && (
		<Header h={6} normal center color="red" mt>
			{props.error}
		</Header>
	);
	return (
		<div className={profilePhotoClasses.join(" ")}>
			{!props.loading ? (
				<img src={avatar} alt={name} />
			) : (
				<Skeleton
					variant="circle"
					className={profilePhotoClasses.join(" ")}
					style={{ boxSizing: "border-box" }}
				/>
			)}
			{input}
			{error}
		</div>
	);
};

export default profilePhoto;
