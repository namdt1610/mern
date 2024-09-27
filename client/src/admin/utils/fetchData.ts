// src/utils/api.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async (url: string, method: string = 'GET', body: any = null, headers: any = {}) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data: body,
      headers: {
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export const get = (url: string, headers: any = {}) => fetchData(url, 'GET', null, headers);
export const post = (url: string, body: any, headers: any = {}) => fetchData(url, 'POST', body, headers);
export const put = (url: string, body: any, headers: any = {}) => fetchData(url, 'PUT', body, headers);
export const del = (url: string, headers: any = {}) => fetchData(url, 'DELETE', null, headers);