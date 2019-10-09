import React from "react";
import classes from "./Header.module.css";
const header = props => {
	const headerClasses = [
		classes.Header,
		props.headerClass && classes[props.headerClass],
		props.normal && classes.Normal
	];
	const headerStyles = {
		color: props.color && props.color
	};
	let header = null;
	switch (props.h) {
		case 1:
			header = (
				<h1 className={headerClasses.join(" ")} style={headerStyles} onClick={props.clicked && props.clicked}>
					{props.children}
				</h1>
			);
			break;
		case 2:
			header = (
				<h2 className={headerClasses.join(" ")} style={headerStyles} onClick={props.clicked && props.clicked}>
					{props.children}
				</h2>
			);
			break;

		case 3:
			header = (
				<h3 className={headerClasses.join(" ")} style={headerStyles} onClick={props.clicked && props.clicked}>
					{props.children}
				</h3>
			);
			break;
		case 4:
			header = (
				<h4 className={headerClasses.join(" ")} style={headerStyles} onClick={props.clicked && props.clicked}>
					{props.children}
				</h4>
			);
			break;
		case 5:
			header = (
				<h5 className={headerClasses.join(" ")} style={headerStyles} onClick={props.clicked && props.clicked}>
					{props.children}
				</h5>
			);
			break;
		case 6:
			header = (
				<h6 className={headerClasses.join(" ")} style={headerStyles} onClick={props.clicked && props.clicked}>
					{props.children}
				</h6>
			);
			break;
		default:
			header = (
				<h1 className={headerClasses.join(" ")} style={headerStyles} onClick={props.clicked && props.clicked}>
					{props.children}
				</h1>
			);
	}

	return <React.Fragment>{header}</React.Fragment>;
};

export default header;
