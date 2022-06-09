import axios from 'axios';
import { useQuery } from 'react-query';
import { mapServerTableToUIData } from '../components/ui-components/Inputs/mappers';
import { API_HOST } from '../config';
import { getToken } from '../lib/auth';

export const fetchData = async (url) => {
  const result = await axios(API_HOST + url + '?limit=4200', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const { data, status } = result;

  if (status === 401) {
    return typeof window !== 'undefined' && (window.location.href = '/login');
  }

  const dataArray = Array.isArray(data) ? data : data.items;

  return mapServerTableToUIData(dataArray);
};

export default (url) => useQuery(url, () => fetchData(url));
