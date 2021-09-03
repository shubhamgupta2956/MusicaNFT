const axios = require('axios');

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: `http://localhost:5000`,
});

export const axiosInstanceTemp = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  baseURL: `http://localhost:5000`,
});
