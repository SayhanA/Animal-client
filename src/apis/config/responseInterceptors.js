import axios from 'axios';

export const errorHandler = (error) => {
	const statusCode = error.response?.status;

	if (statusCode && statusCode !== 401) {
		console.error(error);
	}

	return Promise.reject(error);
};

export const refreshTokenHandler = async (error) => {
	const originalRequest = error.config;

	// eslint-disable-next-line no-underscore-dangle
	if (error.response.status === 403 && !originalRequest._retry) {
		// eslint-disable-next-line no-underscore-dangle
		originalRequest._retry = true;
		// const access_token = await fetchNewAccessToken();
		const access_token = 'await fetchNewAccessToken()';
		axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		return axios(originalRequest);
	}

	return Promise.reject(error);
};
