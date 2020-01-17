import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
const skeleton = props => {
	return (
		<div>
			<Skeleton {...props} height={40} style={{ marginTop: "10px" }} />
		</div>
	);
};

export default skeleton;
