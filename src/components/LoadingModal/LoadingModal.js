import React from "react";
import Modal from "../UI/Modal/Modal";
import Paper from "../UI/Paper/Paper";
import classes from "./LoadingModal.module.css";
import Header from "../UI/Header/Header";
import Logo from "../../assets/images/logo/moblogo.png";

const loadingModal = props => {
	return (
		<Modal loading open={props.open} className={classes.LoadingModal}>
			<Paper center clear sign loading>
				<div>
					<img src={Logo} alt="Worklance" />
				</div>
				<Header h={4} color="#777" mt>
					{props.children}
				</Header>
			</Paper>
		</Modal>
	);
};

export default loadingModal;
