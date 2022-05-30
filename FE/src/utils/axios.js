import axios from 'axios';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const instanceAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PROD_BACKEND_URL
      : process.env.REACT_APP_DEV_BACKEND_URL,
  httpAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default instanceAxios;
