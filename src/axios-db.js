import axios from "axios";

const instance = axios.create({
	baseURL: "http://worklance.test/api/"
	// headers:
});

export default instance;
