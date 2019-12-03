import React from "react";
import classes from "./DialogModal.module.css";
import Button from "../UI/Button/Button";
import Header from "../UI/Header/Header";
import Paper from "../UI/Paper/Paper";
import Modal from "../UI/Modal/Modal";

const dialogModal = props => {
	const { lang } = props;
	const content = {
		yes: [ "Да", "Yes", "Uzb" ],
		no: [ "Нет", "No", "Uzb" ]
	};
	return (
		<Modal {...props.modal} open={props.open} modalClosed={event => props.modalClosed(event)}>
			<Paper logout clear center>
				<Header h={5} center>
					{props.header[lang ? lang : 0]}
				</Header>

				<div className={classes.Buttons}>
					<Button wide danger clicked={event => props.yesClicked(event)}>
						<Header h={6}>{content.yes[lang ? lang : 0]}</Header>
					</Button>
					<Button wide clicked={event => props.modalClosed(event)}>
						<Header h={6}>{content.no[lang ? lang : 0]}</Header>
					</Button>
				</div>
			</Paper>
		</Modal>
	);
};

export default dialogModal;
