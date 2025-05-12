import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://ict-project-hazel.vercel.app/'
});

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = sessionStorage.getItem('token');
  if (accessToken && config?.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } 
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance;
