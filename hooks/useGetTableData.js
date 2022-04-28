import axios from 'axios';
import { useQuery } from 'react-query';
import { mapServerTableToUIData } from '../components/ui-components/Inputs/mappers';
import { API_HOST } from '../config';

export const fetchData = async (url) => {
  const { data } = await axios(API_HOST + url);
  const dataArray = Array.isArray(data) ? data : data.items;

  return mapServerTableToUIData(dataArray);
};

export default (url) => useQuery(url, () => fetchData(url));
