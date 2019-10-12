import React from "react";
import Freelancer from "./Freelancer/Freelancer";
import Grid from "@material-ui/core/Grid";
const freelancers = props => {
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
	return <React.Fragment>{freelancers}</React.Fragment>;
};

export default freelancers;
