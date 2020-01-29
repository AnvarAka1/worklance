import React, { Component } from "react";
import classes from "./LandingPage.module.css";
// import { NavLink } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "../../components/UI/Header/Header";
import Logo from "../../assets/images/logo/landinglogo.png";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Images from "./Images/Images";
import Hidden from "@material-ui/core/Hidden";
class LandingPage extends Component {
	state = {
		size: 500,
		setSize: false,
		isChanged: false,
		posNum: 0
	};
	componentDidMount() {
		window.addEventListener("resize", this.handleResize, false);
		this.setState({ isChanged: false });
	}
	componentWillUnmount() {
		// window.removeEventListener("resize", this.handleResize, false);
	}
	componentDidUpdate() {
		if (!this.state.isChanged) {
			this.setState(prevState => {
				return {
					posNum: ++prevState.posNum % 3,
					isChanged: true
				};
			});

			setTimeout(() => {
				this.setState({ isChanged: false });
			}, 5000);
			// window.removeEventListener("resize", this.handleResize, false);
			// window.addEventListener("resize", this.handleResize, false);
		}

		if (this.state.setSize) {
			setTimeout(() => {
				this.setState({ setSize: false });
			}, 1000);
		}
	}
	handleResize = () => {
		// console.log(this.state.setSize);
		if (!this.state.setSize) {
			// console.log(this.state.setSize);
			// console.log(window.screen.width);
			let size = 600 - 600 / window.screen.width * 200;
			this.setState({ size: size, setSize: true });
		}
	};
	render() {
		const { lang } = this.props;
		const content = {
			lang: [ "Сменить язык", "Change language", "Uzb" ],
			definition: [
				" - это площадка для работы с частичной занятостью для фрилансеров, студентов и компаний, где они могут создавать гибкий график работы и общаться друг с другом.",
				" - marketplace of part-time jobs for freelancers, students and companies, where they can create flexible schedule to work and communicate with each other.",
				"Uzb"
			],
			looking: [ "В поисках", "Looking for", "Uzb" ],
			emp: [ "Сотрудника", "Employee", "Uzb" ],
			or: [ " или ", " or ", " Uzb " ],
			job: [ "Работа с неполной занятостью", "Part-time job", "Uzb" ]
		};
		const languagesArray = [
			{
				id: 0,
				lang: [ "Русский", "Russian", "Рус тили" ]
			},
			{
				id: 1,
				lang: [ "Английский", "English", "Инглиз тили" ]
			},
			{
				id: 2,
				lang: [ "Узбекский", "Uzbek", "Узбек тили" ]
			}
		];
		const languages = languagesArray.map(language => {
			return (
				<li key={language.id} onClick={() => this.props.onLangChangeById(language.id)}>
					<Header h={6} normal>
						{language.lang[lang ? lang : 0]}
					</Header>
				</li>
			);
		});
		return (
			<div className={classes.Wrapper}>
				<div className={classes.LandingPage}>
					<Container>
						<Grid container>
							<Grid item xs={12}>
								<Header>
									<div className={classes.Nav}>
										<div>
											<img src={Logo} alt="Logo" />
										</div>
										<div>
											<div className={classes.Dropdown}>
												<Header h={6} color="#777777">
													{content.lang[lang ? lang : 0]}
												</Header>
												<ul>{languages}</ul>
											</div>
										</div>
									</div>
								</Header>
							</Grid>
							<Hidden mdUp>
								<Grid item xs={12}>
									<Images />
								</Grid>
							</Hidden>
							<Grid item md={5} sm={12}>
								<div className={classes.Content}>
									<Header h={5}>
										Worklance<span>{content.definition[lang ? lang : 0]}</span>
									</Header>
								</div>
								<div className={classes.Subcontent}>
									<Header h={6} color="#333333" normal>
										{content.looking[lang ? lang : 0]}:
									</Header>
									<div className={classes.Buttons}>
										<a
											href="https://instagram.com/worklance_live"
											rel="noopener noreferrer"
											target="_blank"
										>
											<Button dark>{content.emp[lang ? lang : 0]}</Button>
										</a>
										<span>{content.or[lang ? lang : 0]}</span>
										<a
											href="https://t.me/worklance_channel"
											rel="noopener noreferrer"
											target="_blank"
										>
											{content.job[lang ? lang : 0]}
										</a>
									</div>
								</div>
							</Grid>
							<Hidden smDown>
								<Grid item xs={7}>
									<Images posNum={this.state.posNum} lang={lang} size={this.state.size} />
								</Grid>
							</Hidden>
						</Grid>
					</Container>
				</div>
				<footer>
					<div className={classes.Footer}>Worklance inc. © 2020.</div>
				</footer>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onLangChangeById: id => dispatch(actions.langChangeById(id))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
