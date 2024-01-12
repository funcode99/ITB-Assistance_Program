import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    accept: 'application/json'
  }
});

Api.interceptors.request.use(function (config) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const token = JSON.parse(localStorage.getItem('token'))

  // use config.params if it has been set
  config.params = config.params || {};
  // add any client instance specific params to config
  config.params['itba'] = params.itba;
  config.params['itbb'] = params.itbb;

  config.headers.Authorization = token && `Bearer ${token}`;

  return config;
});

export default Api;