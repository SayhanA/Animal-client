import axios from 'axios';

import baseURL from './baseURL';

const api = axios.create({
	baseURL: baseURL,
	timeout: 10000,
});

export default api;
