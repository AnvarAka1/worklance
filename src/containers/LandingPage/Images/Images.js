import React from "react";
import classes from "./Images.module.css";
import Header from "../../../components/UI/Header/Header";
import staticImage from "../../../assets/images/landing/static.png";
// import svgImage from "../../../assets/images/landing/vectors/1.svg";
import image1 from "../../../assets/images/landing/people/1.png";

import image2 from "../../../assets/images/landing/people/2.png";
import image3 from "../../../assets/images/landing/people/3.png";
// import { ReactSVG } from "react-svg";
import Svg from "../Svg/Svg";
const images = props => {
	const { lang, posNum, size } = props;
	const content = {
		looking: [ "В поисках", "Looking for", "Uzb" ],
		position: [
			[ "превосходного разработчика", "Excellent developer", "Uzb" ],
			[ "блестящего дизайнера", "brilliant designer", "Uzb" ],
			[ "супер менеджера", "super manager", "Uzb" ]
		]
	};
	const people = [ image1, image2, image3 ];

	return (
		<div className={classes.Images}>
			<img src={staticImage} className={classes.StaticImage} alt="staticImage" />
			<div className={classes.ImageWrapper}>
				<div style={{ position: "relative" }}>
					<Svg num={posNum} size={size} />
					<img src={people[posNum ? posNum : 0]} className={classes.People} alt="people" />
				</div>
				<div className={classes.Text}>
					<Header h={3}>{content.looking[lang ? lang : 0]}</Header>
					<Header h={3}>{content.position[posNum ? posNum : 0][lang ? lang : 0]}</Header>
				</div>
			</div>
		</div>
	);
};

export default images;
