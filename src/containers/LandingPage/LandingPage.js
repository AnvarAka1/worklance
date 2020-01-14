import React from "react";
import classes from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";
import bsclasses from "./css/bootstrap.min.css";
// import "./css/main.min.css";
const LandingPage = props => {
	return (
		<div style={{ backgroundColor: "black" }} className={classes.LandingPage}>
			<div className={bsclasses.container}>
				<div className={[ bsclasses.navbar, bsclasses.navbarExpandLg, bsclasses.navbarDark ].join(" ")}>
					<a className={bsclasses.navbarBrand} href="#">
						<img src="img/WorklanceLogo.svg" alt="" />
					</a>
					<button
						className={bsclasses.navbarToggler}
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className={bsclasses.navbarTogglerIcon} />
					</button>

					<div className={[ bsclasses.collapse, bsclasses.navbarCollapse ].join(" ")} id="navbarNavDropdown">
						<ul className={[ bsclasses.navbarNav, bsclasses.mlAuto ].join(" ")}>
							<li className={[ bsclasses.navItem, bsclasses.active ].join(" ")}>
								<a className={bsclasses.navLink} href="#">
									О нас <span className={bsclasses.srOnly}>(current)</span>
								</a>
							</li>
							<li className={bsclasses.navItem}>
								<a className={bsclasses.navLink} href="#work">
									Как это работает?
								</a>
							</li>
							<li className={bsclasses.navItem}>
								<a className={bsclasses.navLink} href="https://t.me/worklance_channel" target="_blank">
									Вакансии/Проекты
								</a>
							</li>
							<li className={bsclasses.navItem}>
								<a
									className={bsclasses.navLink}
									href="https://forms.gle/RP9VyeYqUjzMaZZ18"
									target="_blank"
								>
									Фрилансерам
								</a>
							</li>
							<li className={bsclasses.navItem}>
								<a
									className={bsclasses.navLink}
									href="https://forms.gle/2uKBmDR9WykEViw7A"
									target="_blank"
								>
									Компаниям/Клиентам
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className={[ bsclasses.container, bsclasses.fullHeight ].join(" ")}>
				<div className={bsclasses.row}>
					<div
						className={[ bsclasses.colXl6, bsclasses.colLg6, bsclasses.colMd6, bsclasses.col12 ].join(" ")}
					>
						<div className={bsclasses.mainText}>
							<p style={{ color: "white" }} className={bsclasses.mainTextP}>
								Worklance - это маркетплейс, который связывает компании с работниками и фрилансерами.
								Как компания - вы можете за пару кликов найти нужного кадра, или как фрилансер можете в
								свободное время зарабатывать выполнив проекты от компании. Платформа минимизирует
								человеческий фактор при нанятии нужного человека. Считайте, что мы за Вас делаем всю
								работу в плане найма. ✌
							</p>
							<a
								href="https://forms.gle/2uKBmDR9WykEViw7A"
								className={[ bsclasses.btn, bsclasses.btnPrimary, bsclasses.mr2, bsclasses.my2 ].join(
									" "
								)}
								target="_blank"
							>
								Мне нужен фрилансер
							</a>
							<a
								href="https://forms.gle/RP9VyeYqUjzMaZZ18"
								className={[ bsclasses.btn, bsclasses.btnOutlineLight, bsclasses.my2 ].join(" ")}
								target="_blank"
							>
								Мне нужна работа
							</a>
							<p className={[ "mt5", classes.Images ].join(" ")}>
								{" "}
								<a
									href="https://t.me/worklance_channel"
									target="_blank"
									className={[ bsclasses.link, bsclasses.white ].join(" ")}
								>
									<img src="img/icons/telegram.svg" alt="" className={bsclasses.mr2} /> Подпишитесь на
									наш телеграм канал
								</a>
							</p>
						</div>
					</div>

					<div
						className={[ bsclasses.colXl6, bsclasses.colLg6, bsclasses.colMd6, bsclasses.col12 ].join(" ")}
					>
						<div className={bsclasses.mainPics}>
							<img src="img/_src/Ellipse-1.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-2.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-3.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-4.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-5.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-6.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-7.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-8.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-9.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-10.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-11.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-12.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-13.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-14.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-15.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-16.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-17.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-18.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse-19.png" alt="" className={bsclasses.mainPicsImg} />
							<img src="img/_src/Ellipse.png" alt="" className={bsclasses.mainPicsImg} />
						</div>
					</div>
				</div>
			</div>

			<div className={[ bsclasses.container, bsclasses.fullHeight ].join(" ")} id="work">
				<div className={bsclasses.row}>
					<div className={bsclasses.col12}>
						<div className={[ bsclasses.mainSecond, bsclasses.mb5 ].join(" ")}>
							<h1 className={bsclasses.mainSecondH1}>КАК ЭТО РАБОТАЕТ?</h1>
						</div>
					</div>
				</div>
				<div className={[ bsclasses.row, bsclasses.mt5, classes.fontSize ].join(" ")}>
					<div className={[ bsclasses.colXl3, bsclasses.colLg3, bsclasses.colMd6, bsclasses.col6 ].join(" ")}>
						<h1 className={bsclasses.mainSecondNumbers}>1</h1>
						<p className={bsclasses.mainSecondParagraph}>Пройти регистрацию заполнив простую форму</p>
					</div>
					<div className={[ bsclasses.colXl3, bsclasses.colLg3, bsclasses.colMd6, bsclasses.col6 ].join(" ")}>
						<h1 className={bsclasses.mainSecondNumbers}>2</h1>
						<p className={bsclasses.mainSecondParagraph}>Заполнить анкету и выполнить базовое задание</p>
					</div>
					<div className={[ bsclasses.colXl3, bsclasses.colLg3, bsclasses.colMd6, bsclasses.col6 ].join(" ")}>
						<h1 className={bsclasses.mainSecondNumbers}>3</h1>
						<p className={bsclasses.mainSecondParagraph}>
							Выбрать нужную компанию/сотрудника что бы начать работать
						</p>
					</div>
					<div
						className={[
							bsclasses.colXl3,
							bsclasses.colLg3,
							bsclasses.colMd6,
							bsclasses.col6,
							bsclasses.dFlex,
							bsclasses.flexColumn,
							bsclasses.justifyContentCenter
						].join(" ")}
					>
						<img src="img/icons/startup.svg" alt="" className={bsclasses.rocket} />
						<p className={[ bsclasses.mainSecondParagraph, bsclasses.minusMargin ].join(" ")}>
							Начать работать!
						</p>
						<NavLink to="projects" className={[ bsclasses.btn, bsclasses.btnPrimary ].join(" ")}>
							Пройти регистрацию
						</NavLink>
					</div>
				</div>
			</div>

			<div className={[ bsclasses.container, bsclasses.fullHeight, classes.Images ].join(" ")}>
				<div className={bsclasses.row}>
					<div className={bsclasses.col12}>
						<div className={[ bsclasses.mainSecond, bsclasses.mt5 ].join(" ")}>
							<h1 className={bsclasses.mainSecondH1}>НАШИ ПАРТНЕРЫ</h1>
						</div>
					</div>
					<div className={bsclasses.col12}>
						<div className={bsclasses.partners}>
							<img src="img/partners/itpark.png" alt="" />
							<img src="img/partners/mytaxi.png" alt="" />
							<img src="img/partners/dcode.png" alt="" />
						</div>
					</div>
				</div>
				<div className={[ bsclasses.row, bsclasses.mt5 ].join(" ")}>
					<div className={bsclasses.col12}>
						<div className={[ bsclasses.mainSecond, bsclasses.mt5 ].join(" ")}>
							<h1 className={bsclasses.mainSecondH1}>КОНТАКТЫ</h1>
						</div>
					</div>
					<div className={[ bsclasses.col12, bsclasses.mt3 ].join(" ")}>
						<p className={bsclasses.textSmall}>
							{" "}
							<img src="img/icons/2.svg" alt="" className={bsclasses.mt3} /> 4, Tepamasjid str., Tashkent,
							Uzbekistan, 100164
						</p>
						<p className={bsclasses.textSmall}>
							<img src="img/icons/3.svg" alt="" className={bsclasses.mt3} />{" "}
							<a href="tel:+998935939998" className={bsclasses.textLight}>
								+998 93 593 9998{" "}
							</a>{" "}
							|{" "}
							<a href="tel:+998909344657" className={bsclasses.textLight}>
								+998 90 934 46 57
							</a>
						</p>
						<p className={bsclasses.textSmall}>
							<img src="img/icons/1.svg" alt="" className={bsclasses.mt3} />{" "}
							<a href="mailto:worklance.inc@gmail.com" className={bsclasses.textLight}>
								{" "}
								worklance.inc@gmail.com
							</a>
						</p>

						<p className={(bsclasses.mt5, bsclasses.textSmall)}>
							Мы в социальных сетях:
							<a href="https://www.facebook.com/worklance.inc" target="_blank" className={bsclasses.ml3}>
								<img src="img/icons/4.svg" alt="" />
							</a>
							<a href="https://www.instagram.com/worklance.uz/" target="_blank" className={bsclasses.ml3}>
								<img src="img/icons/5.svg" alt="" />
							</a>
							<a href="https://t.me/worklance_channel" target="_blank" className={bsclasses.ml3}>
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
