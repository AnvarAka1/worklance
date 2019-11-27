import React from "react";
import { Route } from "react-router";
import { TitleComponent } from "./TitleComponent.jsx";

// withTitle function
const withTitle = ({ component: Component, title }) => {
	return class Title extends Component {
		render() {
			return (
				<React.Fragment>
					<TitleComponent title={title} />
					<Component {...this.props} />
				</React.Fragment>
			);
		}
	};
};

// Example pages
const Index = () => <h1>This is the IndexComponent!</h1>;
const Persons = () => <h1>This is the PersonsComponent!</h1>;
const Dogs = () => <h1>This is the DogsComponent!</h1>;
const Food = () => <h1>This is the FoodComponent!</h1>;

// Adding title
const IndexComponent = withTitle({ component: Index, title: "Index" });
const PersonsComponent = withTitle({ component: Persons, title: "🧠 Persons" });
const DogsComponent = withTitle({ component: Dogs, title: "🐶 Dogs" });
const FoodComponent = withTitle({ component: Food, title: "🌮 Food" });

// Your router
export default (
	<Route>
		<Route path="/" component={IndexComponent} />
		<Route path="/persons" component={PersonsComponent} />
		<Route path="/dogs" component={DogsComponent} />
		<Route path="/food" component={FoodComponent} />
	</Route>
);
