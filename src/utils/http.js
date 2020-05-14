import axios from 'axios';
// import router from '../router/index.js';
// import store from '../store';

// const devURL = 'http://localhost:1111';
const prodURL = 'https://localhost:44318';

const http = axios.create({
  baseURL: prodURL
});

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;
