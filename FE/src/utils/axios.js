import axios from 'axios';
import https from 'https';
const BACKEND_URL = process.env.BACKEND_URL || 'https://localhost:8000';

const instanceAxios = axios.create({
  baseURL: BACKEND_URL,
  httpAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default instanceAxios;
