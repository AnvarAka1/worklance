import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classes from "./FreelancerSkeleton.module.css";
import Paper from "../../Paper/Paper";
import Grid from "@material-ui/core/Grid";
const freelancerSkeleton = props => {
	return (
		<Grid item xs={12}>
			<Paper clear={props.clear} center={props.center} scroll tl>
				<div className={classes.Wrapper}>
					<div width="100%">
						<Skeleton variant="circle" width={80} height={80} style={{ boxSizing: "border-box" }} />
					</div>
					<div className={classes.Text}>
						<Skeleton variant="rect" width={150} />
						<Skeleton variant="rect" className={classes.FreelancerSkeleton} />
						<Skeleton variant="rect" className={classes.FreelancerSkeleton} />
						<Skeleton variant="rect" className={classes.FreelancerSkeleton} width={80} />
					</div>
				</div>
			</Paper>
		</Grid>
	);
};

export default freelancerSkeleton;
