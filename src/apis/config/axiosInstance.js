import axios from 'axios';

import baseURL from './baseURL';
// import { accessTokenHandler } from './requestInterceptors';
// eslint-disable-next-line import/no-cycle
// import { refreshTokenHandler } from './responseInterceptors';

const api = axios.create({
	baseURL: baseURL,
	timeout: 10000,
});

// api.interceptors.request.use(
// 	(config) => accessTokenHandler(config),
// 	(error) => Promise.reject(error)
// );

// api.interceptors.response.use(undefined, (error) => {
// 	return refreshTokenHandler(error);
// });

export default api;
