import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { CONFIG_HOST } from '../config';
import { fetchData } from './useGetTableData';

export default () => {
  const [commonTables, setCommonTables] = useState([]);

  const configResponse = useQuery('appConfig', async () => {
    const { data: response = {} } = await axios(CONFIG_HOST);
    return response || {};
  });


  useEffect(() => {
    async function myFnc(commonConfig) {
      const commonToFetch = Object.entries(commonConfig).map(([key, { apiRoute }]) => ({
        key,
        apiRoute,
      }));

      const commonFetches = await Promise.all(
        commonToFetch.map(({ apiRoute }) => fetchData(apiRoute)),
      );

      setCommonTables(
        Object.fromEntries(commonFetches.map((commons, i) => [commonToFetch[i].key, commons.list])),
      );
    }

    configResponse.data?.common && myFnc(configResponse.data.common);
  }, [configResponse?.data?.common]);

  // commonTables - data for dropdowns
  return { ...configResponse, commonTables };
};
