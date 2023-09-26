import axiosObject from 'axios';

const axios = axiosObject.create();
axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export default axios;