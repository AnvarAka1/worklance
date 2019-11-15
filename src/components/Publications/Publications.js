import React from "react";
import Publication from "./Publication/Publication";
import Button from "../UI/Button/Button";
import Header from "../UI/Header/Header";

const publications = props => {
	const { publications, lang } = props;
	const content = {
		add: [ "Добавить еще", "Add more", "Uzb" ],
		noPublications: [ "Нет публикаций", "No publications", "Uzb" ]
	};
	const publicationsJSX = publications.length ? (
		publications.map(publication => {
			return (
				<Publication
					key={publication.id}
					{...publication}
					clicked={event => props.clicked(event, publication.id)}
					removeClicked={event => props.removeClicked(event, publication.id)}
				/>
			);
		})
	) : (
		<Header mb h={5}>
			{content.noPublications[lang ? lang : 0]}
		</Header>
	);
	const button = props.isAddable ? (
		<Button green wide clicked={props.addClicked}>
			<i className="fa fa-plus" /> {content.add[lang]}
		</Button>
	) : null;
	return (
		<React.Fragment>
			{publicationsJSX}

			{button}
		</React.Fragment>
	);
};

export default publications;
