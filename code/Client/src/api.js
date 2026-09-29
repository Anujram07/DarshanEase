const defaultApiUrl = import.meta.env.DEV
	? 'http://localhost:7000'
	: 'https://darshanease-1-i6lx.onrender.com';

export const API_URL = import.meta.env.VITE_API_URL || defaultApiUrl;