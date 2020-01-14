import React from "react";
import classes from "./Modal.module.css";
import Modal from "@material-ui/core/Modal";

const modal = props => {
	const modalClasses = [
		classes.Modal,
		props.scrollable && classes.Scrollable,
		props.narrow && classes.Narrow,
		props.Loading && props.Loading
	];
	return (
		<Modal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={props.open}
			onClose={props.modalClosed}
			className={modalClasses.join(" ")}
			BackdropComponent={props.BackdropComponent}
			BackdropProps={props.BackdropProps}
		>
			<React.Fragment>{props.children}</React.Fragment>
		</Modal>
	);
};

export default modal;
