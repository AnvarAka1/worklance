import React from "react";
import classes from "./ProfilePhoto.module.css";
import Header from "../../UI/Header/Header";
// import { NavLink } from "react-router-dom";
const profilePhoto = props => {
	let imageRef = React.createRef();
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
	// const resizeFunction = () => {
	// 	const width = imageRef.current;
	// };
	// if (!props.loading) {
	// 	resizeFunction();
	// }
	return (
		<div className={profilePhotoClasses.join(" ")}>
			<img src={avatar} alt={name} ref={imageRef} />
			{props.change ? (
				<Header h={6} normal center>
					{content.changeAvatar[lang]}
				</Header>
			) : null}
		</div>
	);
};

export default profilePhoto;
