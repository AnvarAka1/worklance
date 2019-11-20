import axios from "axios";

const instance = axios.create({
	baseURL: "http://api.worklance.uz/api/",
	// headers:
	headers: {
		// "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
	}
});

export default instance;
