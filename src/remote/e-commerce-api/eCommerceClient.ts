import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://3.145.148.62:8000/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://e-commerce-frontend-p3.s3-website.us-east-2.amazonaws.com/',
  },
});

export interface eCommerceApiResponse {
  status: number;
  payload: any;
}

export default eCommerceClient;