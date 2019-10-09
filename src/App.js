import React from "react";
import Layout from "./containers/Layout/Layout";
import { withRouter } from "react-router-dom";
const app = () => {
	return <Layout>something</Layout>;
};

export default withRouter(app);
