import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { CONFIG_HOST } from '../config';
import { fetchData } from './useGetTableData';

export default () => {
  const getConfigResponse = useQuery('appConfig', async () => {
    const { data: response = {} } = await axios(CONFIG_HOST);

    const { data } = response;

    return response || {};
  });

  useEffect(() => {
    async function myFnc() {
      if (response.common) {
        const commonToFetch = Object.entries(response.common).map(([key, { apiRoute }]) => ({
          key,
          apiRoute,
        }));

        const commonFetches = commonToFetch.map(({ apiRoute }) => fetchData(apiRoute));
        const commons = await Promise.all(commonFetches);

        console.log({ commons });
      }
    }
    getConfigResponse.data && myFnc();
  }, []);

  console.log({ getConfigResponse });

  return getConfigResponse;
};
