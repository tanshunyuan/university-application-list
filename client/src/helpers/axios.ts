import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;
console.log(baseURL);
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
