import { getStoredData } from '../../utils/localStorage';

export const accessTokenHandler = (config) => {
	const token = getStoredData('token');

	if (token) {
		// eslint-disable-next-line no-param-reassign
		config.headers = {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
			...config.headers,
		};
	}

	return config;
};
