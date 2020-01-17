import React, { Component } from "react";
import { string, number, PropTypes } from "prop-types";
import classes from "./Svg.module.css";
class Svg extends Component {
	render() {
		const { size, num } = this.props;
		const colors = [ "#3999FF", "#FDB62F", "#F0F0F0" ];
		const svg = [
			<svg width={size} height={size} viewBox="0 0 520 505" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M283.827 62.0572C346.856 52.8779 407.569 -24.7044 462.207 7.99398C515.119 39.6602 480.135 125.336 490.919 185.993C499.676 235.256 524.178 279.829 519.384 329.632C513.589 389.831 514.336 468.095 461.006 496.743C406.304 526.128 344.681 468.59 283.827 456.17C239.211 447.065 194.712 450.729 152.459 433.771C97.4743 411.703 23.8286 399.773 4.18496 343.937C-15.4051 288.254 38.7581 235.254 63.812 181.8C85.2368 136.089 95.2482 79.1242 139.623 54.9731C182.942 31.3971 235.01 69.1666 283.827 62.0572Z"
					fill={colors[num]}
				/>
			</svg>,
			<svg width={size} height={size} viewBox="0 0 710 695" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M273.26 575.208C227.084 557.841 181.388 539.005 148.878 501.899C106.952 454.045 57.082 399.491 63.8861 336.233C70.7639 272.29 134.121 232.497 182.423 190.035C230.108 148.114 277.509 98.1516 340.775 92.8176C403.584 87.5222 465.563 119.293 511.666 162.276C552.331 200.19 559.994 258.524 575.707 311.856C589.135 357.434 607.134 403.134 596.253 449.387C585.504 495.084 555.195 534.345 516.96 561.582C481.427 586.896 436.991 591.438 393.431 593.873C351.941 596.193 312.154 589.836 273.26 575.208Z"
					fill={colors[num]}
				/>
			</svg>,
			<svg width={size} height={size} viewBox="0 0 599 564" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M331.52 0.00052171C422.195 -0.25078 479.293 90.3336 530.377 165.249C575.245 231.049 613.39 306.526 593.043 383.524C573.334 458.104 503.163 502.519 432.86 534.269C365.285 564.787 292.819 573.332 222.1 551.046C132.865 522.926 23.8896 490.015 3.01276 398.813C-17.869 307.589 74.54 238.581 134.039 166.348C191.612 96.4543 240.968 0.251481 331.52 0.00052171Z"
					fill={colors[num]}
				/>
			</svg>
		];
		return <div className={classes.Svg}>{svg[num ? num : 0]}</div>;
	}
}

Svg.propTypes = {
	size: PropTypes.oneOfType([ string, number ])
};
Svg.defaultProps = {
	size: "auto"
};
export default Svg;
