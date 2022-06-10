import axios from 'axios';
import { API_HOST } from '../config';

export const login = async (payload) => {
  console.log('client:', API_HOST + '/login');
  const { data } = await axios.post(API_HOST + '/login', payload);

  setToken(data.access_token);

  return true;
};

export const setToken = (token) => {
  typeof localStorage !== 'undefined' && localStorage.setItem('token', token);
};

export const getToken = () => {
  return typeof localStorage !== 'undefined' && localStorage.getItem('token');
};
