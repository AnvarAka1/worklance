import React from "react";
import Paper from "../UI/Paper/Paper";
import NotificationItem from "./NotificationItem/NotificationItem";
import classes from "./NotificationItems.module.css";
import BellIcon from "../../assets/images/icons/bell.png";
import Header from "../UI/Header/Header";

const notificationItems = props => {
	const { lang } = props;
	const content = {
		notifications: [ "Уведомления", "Notifications" ],
		archive: [ "Архив", "Archive" ]
	};
	const notificationItems = props.notificationItems.map(item => {
		return (
			<NotificationItem
				lang={lang}
				{...item}
				key={item.id}
				clicked={event => props.viewClicked(event, item.id)}
			/>
		);
	});
	return (
		<React.Fragment>
			<Paper minHeight>
				<div className={classes.TopTitles}>
					<div className={classes.NotificationsTitle}>
						<img src={BellIcon} alt="Notifications" />
						<Header h={5}>{content.notifications[lang]}</Header>
					</div>
					<Header clicked={props.archiveClicked} h={5} normal color="#777">
						{content.archive[lang]}
					</Header>
				</div>
				{notificationItems}
			</Paper>
		</React.Fragment>
	);
};

export default notificationItems;
