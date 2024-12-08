import Axios from 'axios';

export const apiClient = Axios.create({
	baseURL: import.meta.env.EXPOSED_API_ADDRESS,
});