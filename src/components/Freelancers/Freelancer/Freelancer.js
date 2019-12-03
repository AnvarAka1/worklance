import React from "react";
import classes from "./Freelancer.module.css";
import Paper from "../../UI/Paper/Paper";
import ProfilePhoto from "../../Profile/ProfilePhoto/ProfilePhoto";
import ProfileShortInfo from "../../Profile/ProfileShortInfo/ProfileShortInfo";
import Skills from "../../Skills/Skills";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";
const freelancer = props => {
	const { avatar, fullname, user_position, about, role, skills, lang } = props;
	const freelancerClasses = [ classes.Freelancer, classes.Inline ];
	const button = props.button ? <div className={classes.Right}>{props.button}</div> : null;

	// when it is not modal
	// all text is to the right
	const rightText = props.inline && (
		<React.Fragment>
			<Text mt maxHeight={props.maxHeight} mbB>
				{about}
			</Text>
			<Skills skills={skills} />
		</React.Fragment>
	);
	// modal

	const modalText = getModalText(props);
	return (
		<div onClick={props.blockClicked}>
			<Paper clear={props.clear} center={props.center} scroll tl>
				<div className={freelancerClasses.join(" ")}>
					<ProfilePhoto big avatar={avatar} name={fullname} />

					<div className={classes.Text}>
						<ProfileShortInfo
							name={fullname}
							position={user_position}
							role={user_position ? user_position : role}
							lang={lang}
						/>
						{rightText}
					</div>
				</div>
				{modalText}
				{button}
			</Paper>
		</div>
	);
};
const getModalText = props => {
	const content = {
		about: [ "О себе", "About", "Uzb" ],
		experience: [ "Опыт работы", "Experience", "Uzb" ],
		portfolio: [ "Портфолио", "Portfolio", "Uzb" ],
		skills: [ "Навыки", "Skills", "Uzb" ],
		contacts: [ "Контакты", "Contacts", "Uzb" ]
	};
	const { about, experience, portfolio, skills, lang, contacts } = props;
	return (
		!props.inline && (
			<React.Fragment>
				<Header h={6} mt>
					{content.about[lang ? lang : 0]}
				</Header>
				<Text mt mbB>
					{about}
				</Text>
				<Header h={6} mt>
					{content.experience[lang ? lang : 0]}
				</Header>
				<Text mt mbB>
					{experience}
				</Text>
				<Header h={6} mt>
					{content.portfolio[lang ? lang : 0]}
				</Header>
				<Text mt mbB>
					{portfolio}
				</Text>
				<Header h={6} mt>
					{content.skills[lang ? lang : 0]}
				</Header>

				<Skills skills={skills} />
				<Header h={6} mt>
					{content.contacts[lang ? lang : 0]}
					<span style={{ color: "#007BFF" }}>{contacts}</span>
				</Header>
			</React.Fragment>
		)
	);
};
export default freelancer;
