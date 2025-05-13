import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'X-API-Key': process.env.REACT_APP_API_KEY
  }
});

// Optional: Disable SSL verification for self-signed certificates in development
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export { api }; 