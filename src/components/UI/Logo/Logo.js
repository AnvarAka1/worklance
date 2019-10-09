import React from "react";
import classes from "./Logo.module.css";
import Logo from "../../../assets/images/logo/logo.png";
import { NavLink } from "react-router-dom";
const logo = props => {
	return (
		<NavLink to="/">
			<img className={classes.Logo} src={Logo} alt="Logo" />
		</NavLink>
	);
};

export default logo;
