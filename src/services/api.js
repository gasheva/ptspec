import axios from 'axios';

const provider = axios.create({
    baseURL: process.env.VUE_APP_SERVICE,
});

export default provider;