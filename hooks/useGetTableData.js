import axios from 'axios';
import { useQuery } from 'react-query';
import { API_HOST } from '../config';

const fetchData = async (url) => {
  const { data } = await axios(API_HOST + url);
  return Array.isArray(data) ? data : data.items;
};

export default (url) => useQuery(url, () => fetchData(url));
