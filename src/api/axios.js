import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://batch-293-0-nodejs.onrender.com'
});

export default axiosClient;