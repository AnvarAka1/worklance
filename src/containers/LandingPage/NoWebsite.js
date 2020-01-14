import React from "react";
import Header from "../../components/UI/Header/Header";
import classes from "./NoWebsite.module.css";
const NoWebsite = () => {
	return (
		<div className={classes.NoWebsite}>
			<div>
				<Header mb h={1} center>
					Website is currently under development...
				</Header>
				<Header mb h={2} center>
					We will open soon..
				</Header>
			</div>
		</div>
	);
};

export default NoWebsite;
