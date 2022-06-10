import axios from 'axios';
import { API_REMOTE_HOST } from '../config';

export const login = async ({ username, password }) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const { data } = await axios.post(API_REMOTE_HOST + '/aaa/login', params);

  setToken(data.access_token);

  return true;
};

export const setToken = (token) => {
  typeof localStorage !== 'undefined' && localStorage.setItem('token', token);
};

export const getToken = () => {
  return typeof localStorage !== 'undefined' && localStorage.getItem('token');
};
