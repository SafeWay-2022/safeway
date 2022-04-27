import { Table } from 'antd';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { API_HOST, API_REMOTE_HOST } from '../config';
import { useQueryClient } from 'react-query';

const doFetch = async (url, data) => {
  console.log({ url, data });
  return axios.put(API_REMOTE_HOST + url, {
    ...data,
  });
};

const sleep = (timeout) => new Promise((r) => setTimeout(r, timeout));

export default function useUpdate({ url, mutationKey, tableKey }) {
  const queryClient = useQueryClient();
  const { mutate, error, isError } = useMutation((data) => doFetch(url, data), {
    mutationKey,
    onMutate: async (newRow) => {
      await queryClient.cancelQueries(tableKey);
      await queryClient.cancelQueries(mutationKey);

      const previousTable = queryClient.getQueryData(tableKey);

      queryClient.setQueryData(tableKey, (old) =>
        old.map((dataRow) => (dataRow._id === newRow._id ? newRow : dataRow)),
      );

      return { previousTable };
    },
    onError: (err, newRow, context) => {
      queryClient.setQueryData(tableKey, context.previousTable);
    },
    onSettled: () => {
      queryClient.invalidateQueries(tableKey);
    },
  });
  return mutate;
}
