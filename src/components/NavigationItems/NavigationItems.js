import React from "react";
import classes from "./NavigationItems.module.css";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import NavigationItem from "./NavigationItem/NavigationItem";
import Logo from "../UI/Logo/Logo";
import MyProfile from "../Profile/MyProfile/MyProfile";
import Button from "../UI/Button/Button";
const navigationItems = props => {
	const items = [
		{
			id: 0,
			title: [ "Проекты", "Projects" ],
			link: "/projects"
		},

		{
			id: 1,
			title: [ "Вакансии", "Vacancies" ],
			link: "/vacancies"
		},

		{
			id: 2,
			title: [ "Фрилансеры", "Freelancers" ],
			link: "/freelancers"
		},

		{
			id: 3,
			title: [ "Кандидаты", "Candidates" ],
			link: "/candidates"
		}
	];
	const content = {
		button: [ "Войти", "Login" ]
	};
	const navigationItems =
		items &&
		items.map(item => {
			return <NavigationItem key={item.id} {...item} lang={props.lang ? props.lang : 0} />;
		});

	const logo = (
		<li className={classes.Logo}>
			<Logo />
		</li>
	);
	const button = (
		<Button green clicked={props.signModalOpened}>
			{content.button[props.lang ? props.lang : 0]}
		</Button>
	);

	const myProfile = <MyProfile profile={props.profile} />;
	return (
		<AppBar color="inherit" position="static">
			<Container maxWidth="xl">
				<div className={classes.NavigationItems}>
					<ul className={classes.Items}>
						{logo}
						{navigationItems}
					</ul>
					<div className={classes.RightNav}>{props.isAuthorized ? myProfile : button}</div>
				</div>
			</Container>
		</AppBar>
	);
};

export default navigationItems;
