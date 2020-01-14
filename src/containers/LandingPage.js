import React from "react";
import classes from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";
import bsclasses from "./css/bootstrap.min.css";
import "./css/main.min.css";
const LandingPage = props => {
	return (
		<div style={{ backgroundColor: "black" }} className={classes.LandingPage}>
			<div className="container">
				<div className="navbar navbarExpandLg navbarDark">
					<a className="navbarBrand" href="#">
						<img src="img/WorklanceLogo.svg" alt="" />
					</a>
					<button
						className="navbarToggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbarTogglerIcon" />
					</button>

					<div className="collapse navbarCollapse" id="navbarNavDropdown">
						<ul className="navbarNav ml-auto">
							<li className="navItem active">
								<a className="navLink" href="#">
									О нас <span className="srOnly">(current)</span>
								</a>
							</li>
							<li className="navItem">
								<a className="navLink" href="#work">
									Как это работает?
								</a>
							</li>
							<li className="navItem">
								<a className="navLink" href="https://t.me/worklance_channel" target="_blank">
									Вакансии/Проекты
								</a>
							</li>
							<li className="navItem">
								<a className="navLink" href="https://forms.gle/RP9VyeYqUjzMaZZ18" target="_blank">
									Фрилансерам
								</a>
							</li>
							<li className="navItem">
								<a className="navLink" href="https://forms.gle/2uKBmDR9WykEViw7A" target="_blank">
									Компаниям/Клиентам
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="container fullHeight">
				<div className="row">
					<div className="colXl6 col-lg-6 colMd6 col12">
						<div className="mainText">
							<p style={{ color: "white" }} className="mainTextP">
								Worklance - это маркетплейс, который связывает компании с работниками и фрилансерами.
								Как компания - вы можете за пару кликов найти нужного кадра, или как фрилансер можете в
								свободное время зарабатывать выполнив проекты от компании. Платформа минимизирует
								человеческий фактор при нанятии нужного человека. Считайте, что мы за Вас делаем всю
								работу в плане найма. ✌
							</p>
							<a
								href="https://forms.gle/2uKBmDR9WykEViw7A"
								className="btn btnPrimary mr2 my2"
								target="_blank"
							>
								Мне нужен фрилансер
							</a>
							<a
								href="https://forms.gle/RP9VyeYqUjzMaZZ18"
								className="btn btnOutlineLight my2"
								target="_blank"
							>
								Мне нужна работа
							</a>
							<p className={[ "mt5", classes.Images ].join(" ")}>
								{" "}
								<a href="https://t.me/worklance_channel" target="_blank" className="link white">
									<img src="img/icons/telegram.svg" alt="" className="mr2" /> Подпишитесь на наш
									телеграм канал
								</a>
							</p>
						</div>
					</div>

					<div className="colXl6 col-lg-6 colMd6 col12">
						<div className="mainPics">
							<img src="img/_src/Ellipse-1.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-2.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-3.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-4.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-5.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-6.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-7.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-8.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-9.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-10.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-11.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-12.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-13.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-14.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-15.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-16.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-17.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-18.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse-19.png" alt="" className="mainPicsImg" />
							<img src="img/_src/Ellipse.png" alt="" className="mainPicsImg" />
						</div>
					</div>
				</div>
			</div>

			<div className="container fullHeight" id="work">
				<div className="row">
					<div className="col12">
						<div className="mainSecond mb5">
							<h1 className="mainSecondH1">КАК ЭТО РАБОТАЕТ?</h1>
						</div>
					</div>
				</div>
				<div className={[ "row mt5", classes.fontSize ].join(" ")}>
					<div className="colXl3 colLg3 colMd6 col6">
						<h1 className="mainSecondNumbers">1</h1>
						<p className="mainSecondParagraph">Пройти регистрацию заполнив простую форму</p>
					</div>
					<div className="colXl3 colLg3 colMd6 col6">
						<h1 className="mainSecondNumbers">2</h1>
						<p className="mainSecondParagraph">Заполнить анкету и выполнить базовое задание</p>
					</div>
					<div className="colXl3 colLg3 colMd6 col6">
						<h1 className="mainSecondNumbers">3</h1>
						<p className="mainSecondParagraph">Выбрать нужную компанию/сотрудника что бы начать работать</p>
					</div>
					<div className="colXl3 colLg3 colMd6 col6 dFlex flexColumn justifyContentCenter">
						<img src="img/icons/startup.svg" alt="" className="rocket" />
						<p className="mainSecondParagraph minusMargin">Начать работать!</p>
						<NavLink to="projects" className="btn btnPrimary">
							Пройти регистрацию
						</NavLink>
					</div>
				</div>
			</div>

			<div className={[ "container fullHeight", classes.Images ].join(" ")}>
				<div className="row">
					<div className="col12">
						<div className="mainSecond mt5">
							<h1 className="mainSecondH1">НАШИ ПАРТНЕРЫ</h1>
						</div>
					</div>
					<div className="col12">
						<div className="partners">
							<img src="img/partners/itpark.png" alt="" />
							<img src="img/partners/mytaxi.png" alt="" />
							<img src="img/partners/dcode.png" alt="" />
						</div>
					</div>
				</div>
				<div className="row mt5">
					<div className="col12">
						<div className="mainSecond mt5">
							<h1 className="mainSecondH1">КОНТАКТЫ</h1>
						</div>
					</div>
					<div className="col12 mt3">
						<p className="textSmall">
							{" "}
							<img src="img/icons/2.svg" alt="" className="mt3" /> 4, Tepamasjid str., Tashkent,
							Uzbekistan, 100164
						</p>
						<p className="textSmall">
							<img src="img/icons/3.svg" alt="" className="mt3" />{" "}
							<a href="tel:+998935939998" className="textLight">
								+998 93 593 9998{" "}
							</a>{" "}
							|{" "}
							<a href="tel:+998909344657" className="textLight">
								+998 90 934 46 57
							</a>
						</p>
						<p className="textSmall">
							<img src="img/icons/1.svg" alt="" className="mt3" />{" "}
							<a href="mailto:worklance.inc@gmail.com" className="textLight">
								{" "}
								worklance.inc@gmail.com
							</a>
						</p>

						<p className="mt5 textSmall">
							Мы в социальных сетях:
							<a href="https://www.facebook.com/worklance.inc" target="_blank" className="ml3">
								<img src="img/icons/4.svg" alt="" />
							</a>
							<a href="https://www.instagram.com/worklance.uz/" target="_blank" className="ml3">
								<img src="img/icons/5.svg" alt="" />
							</a>
							<a href="https://t.me/worklance_channel" target="_blank" className="ml3">
								<img src="img/icons/6.svg" alt="" />
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
