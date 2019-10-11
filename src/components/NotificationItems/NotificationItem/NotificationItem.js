import React from "react";
import classes from "./NotificationItem.module.css";
import Header from "../../UI/Header/Header";
import Button from "../../UI/Button/Button";
import ProfilePhoto from "../../Profile/ProfilePhoto/ProfilePhoto";
import ApprIcon from "../../../assets/images/icons/approved.png";
import { NavLink } from "react-router-dom";
const notificationItem = props => {
	const { name, avatar, text, userId, lang, approved } = props;
	const content = {
		button: [ "Прочитать", "Read" ]
	};
	return (
		<div className={classes.NotificationItem}>
			<div className={classes.ProfileInfo}>
				<NavLink to={`/users/${userId}`}>
					<ProfilePhoto name={name} avatar={avatar} />
				</NavLink>
				<div className={classes.Info}>
					<NavLink to={`/users/${userId}`}>
						<div className={classes.Name}>
							<Header h={6}>{name}</Header>
							{approved ? <img src={ApprIcon} alt="Approved" /> : null}
						</div>
					</NavLink>
					<div className={classes.Overflow}>
						<NavLink to={`/users/${userId}`}>
							<Header h={6} color="#777777">
								{text}
							</Header>
						</NavLink>
					</div>
				</div>
			</div>
			<Button clicked={props.clicked}>{content.button[lang]}</Button>
		</div>
	);
};

export default notificationItem;
