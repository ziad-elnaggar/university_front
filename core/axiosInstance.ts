import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: 'https://university-system-blue.vercel.app/api/',
	// withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token && !config.url?.includes('login') && !config.url?.includes('register')) {
		config.headers['Authorization'] = `Token ${token}`;
	}
	return config;
  });

axiosInstance.interceptors.response.use(
	(res) => {
		toast.success(res.data?.message);
		return res.data;
	},
	(err) => {
		if (!err.response?.status) toast.error('no internet connection!');
		else
			switch (err.response?.status) {
				case 400:
					toast.error(err.response.data.error, { toastId: '400' })
					break;

				case 401:
					toast.error(err.response?.data?.error, { toastId: '401' });
					if (!location.pathname.includes('login')) {
						location.replace('/login');
					}
					break;

				case 404:
					location.replace('/notfound');
					break;

				case 429:
					toast.error('too many request', { toastId: '429' });
					break;

				case 500:
					toast.error('Something went wrong', { toastId: '500' });
					break;

				default:
					toast.error('Something went wrong', { toastId: 'generic' });
					break;
			}
		throw err;
		// Promise.reject(err);
	},
);

export default axiosInstance;
