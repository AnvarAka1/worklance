import React from "react";
import classes from "./LogoutModal.module.css";
import Button from "../UI/Button/Button";
import Header from "../UI/Header/Header";
import Paper from "../UI/Paper/Paper";
import Modal from "../UI/Modal/Modal";
import { NavLink } from "react-router-dom";
const logoutModal = props => {
	const { lang } = props;
	const content = {
		header: [ "Вы уверены, что хотите выйти?", "Are you sure you want to logout?", "Uzb" ],
		yes: [ "Да", "Yes", "Uzb" ],
		no: [ "Нет", "No", "Uzb" ]
	};
	return (
		<Modal {...props.modal} open={props.open} modalClosed={props.modalClosed}>
			<Paper logout clear center>
				<Header h={5} center>
					{content.header[lang ? lang : 0]}
				</Header>

				<div className={classes.Buttons}>
					<Button wide danger clicked={props.modalClosed}>
						<NavLink to={"/logout"}>
							<Header h={6}>{content.yes[lang ? lang : 0]}</Header>
						</NavLink>
					</Button>
					<Button wide clicked={props.modalClosed}>
						<Header h={6}>{content.no[lang ? lang : 0]}</Header>
					</Button>
				</div>
			</Paper>
		</Modal>
	);
};

export default logoutModal;
