import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:6101/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error normalization
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Unsuccessful request';
    
    return Promise.reject({
      status,
      message,
      originalError: error,
    });
  }
);
