import React from "react";
import classes from "./Paper.module.css";
const paper = props => {
	const paperClasses = [
		classes.Paper,
		props.paperClass && classes[props.paperClass],
		props.noPadding && classes.NoPadding,
		props.clear && classes.Clear,
		props.tl && classes.Tl,
		props.trl && classes.Trl,
		props.trbl && classes.Trbl,
		props.minHeight && classes.MinHeight,
		props.mt && classes.Mt,
		props.mb && classes.Mb,
		props.sign && classes.Sign,
		props.center && classes.Center,
		props.cancelMinHeight && classes.CancelMinHeight,
		props.logout && classes.Logout,
		props.scroll && classes.Scroll,
		props.loading && classes.Loading
	];
	const paperStyle = {
		cursor: props.click ? "pointer" : "default"
	};
	return (
		<div className={paperClasses.join(" ")} style={paperStyle}>
			{props.children}
		</div>
	);
};

export default paper;
