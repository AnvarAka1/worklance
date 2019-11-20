import React from "react";
import Freelancer from "./Freelancer/Freelancer";
import Grid from "@material-ui/core/Grid";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import classes from "./Freelancers.module.css";
const freelancers = props => {
	// const content = {
	// 	button: [ "Закрыть", "Close" ]
	// };
	// const button = <Button clicked={props.candidateModalClosed}>{content.button[props.lang ? props.lang : 0]}</Button>;
	// let modal = !props.loading ? (
	// 	<Modal hasCloseButton scrollable open={props.fleelancerOpen} modalClosed={props.candidateModalClosed}>
	// 		<Freelancer center button={button} clear {...props.index} />
	// 	</Modal>
	// ) : null;
	const freelancers = props.freelancers.map(freelancer => {
		return (
			<Grid item xs={12} key={freelancer.id}>
				<Freelancer
					inline={props.inline}
					{...freelancer}
					blockClicked={event => props.freelancerClicked(event, freelancer.id)}
					lang={props.lang}
				/>
			</Grid>
		);
	});
	return (
		<React.Fragment>
			{/* {modal} */}
			{freelancers}
		</React.Fragment>
	);
};

export default freelancers;
