import React from "react";
import classes from "./Freelancer.module.css";
import Paper from "../../UI/Paper/Paper";
import ProfilePhoto from "../../Profile/ProfilePhoto/ProfilePhoto";
import ProfileShortInfo from "../../Profile/ProfileShortInfo/ProfileShortInfo";
import Skills from "../../Skills/Skills";
import Text from "../../UI/Text/Text";
const freelancer = props => {
	const { avatar, name, position_ru, position_en, position_uz, text, skills, lang } = props;
	const freelancerClasses = [ classes.Freelancer, props.inline && classes.Inline ];
	const button = props.button ? <div className={classes.Right}>{props.button}</div> : null;
	return (
		<div onClick={props.blockClicked}>
			<Paper clear={props.clear} center={props.center} tl>
				<div className={freelancerClasses.join(" ")}>
					<ProfilePhoto big avatar={avatar} name={name} />
					<div className={classes.Text}>
						<ProfileShortInfo
							name={name}
							position_en={position_en}
							position_ru={position_ru}
							position_uz={position_uz}
							lang={lang}
						/>
						<Text mt mbB>
							{text}
						</Text>
						<Skills skills={skills} />
						{button}
					</div>
				</div>
			</Paper>
		</div>
	);
};

export default freelancer;
