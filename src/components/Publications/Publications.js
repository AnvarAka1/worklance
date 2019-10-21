import React from "react";
import Publication from "./Publication/Publication";
import Button from "../UI/Button/Button";

const publications = props => {
	const { publications, lang } = props;
	const content = {
		add: [ "Добавить еще", "Add more", "Uzb" ]
	};
	const publicationsJSX = publications.map(publication => {
		return (
			<Publication
				key={publication.id}
				{...publication}
				removeClicked={event => props.removeClicked(event, publication.id)}
			/>
		);
	});
	return (
		<React.Fragment>
			{publicationsJSX}
			<Button green wide clicked={props.addClicked}>
				<i className="fa fa-plus" /> {content.add[lang]}
			</Button>
		</React.Fragment>
	);
};

export default publications;
