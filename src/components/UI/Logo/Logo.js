import React from "react";
import classes from "./Logo.module.css";
import Logo from "../../../assets/images/logo/logo.png";
import MobLogo from "../../../assets/images/logo/moblogo.png";
import { NavLink } from "react-router-dom";
const logo = props => {
	const logo = props.isMobLogo ? (
		<img className={classes.MobLogo} src={MobLogo} alt="Logo" />
	) : (
		<img className={classes.Logo} src={Logo} alt="Logo" />
	);
	return <NavLink to="/">{logo}</NavLink>;
};

export default logo;
