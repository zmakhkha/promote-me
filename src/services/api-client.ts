import axios from "axios";

export default axios.create({
	baseURL : 'https://api.rawg.io/api',
	params: {
		key: 'd7de81b14a8e4298ab3073efc7753e24'
	}
})