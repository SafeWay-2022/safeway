import axios from 'axios';
import { useQuery } from 'react-query';
import { mapServerTableToUIData } from '../components/ui-components/Inputs/mappers';
import { API_HOST, PER_PAGE } from '../config';
import { getToken } from '../lib/auth';

export const fetchData = async (url, skip = 0, perPage = PER_PAGE) => {
  const result = await axios(API_HOST + url + `?limit=${perPage}&skip=${skip}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const { data, status } = result;

  if (status === 401) {
    return typeof window !== 'undefined' && (window.location.href = '/login');
  }

  const dataArray = Array.isArray(data) ? data : data.items;

  return {
    total: data?.total,
    skip: data?.skip,
    list: mapServerTableToUIData(dataArray),
  };
};

export const getTableFetch =
  (url) =>
  async (skip = 0, perPage = PER_PAGE) => {
    const result = await axios(API_HOST + url + `?limit=${perPage}&skip=${skip}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const { data, status } = result;

    if (status === 401) {
      return typeof window !== 'undefined' && (window.location.href = '/login');
    }

    const dataArray = Array.isArray(data) ? data : data.items;

    return {
      total: data?.total,
      skip: data?.skip,
      list: mapServerTableToUIData(dataArray),
    };
  };
