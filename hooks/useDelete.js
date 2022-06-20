import axios from 'axios';
import { useMutation } from 'react-query';
import { API_HOST } from '../config';
import { useQueryClient } from 'react-query';
import { getToken } from '../lib/auth';

const doFetch = async (url) =>
  axios.delete(API_HOST + url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export default function useDelete({ url, mutationKey, tableKey }) {
  const queryClient = useQueryClient();

  const { mutate, error, isError } = useMutation((data) => doFetch(url, data), {
    mutationKey,
    onMutate: async (id) => {
      await queryClient.cancelQueries(tableKey);
      await queryClient.cancelQueries(mutationKey);

      const previousTable = queryClient.getQueryData(tableKey);

      queryClient.setQueryData(tableKey, (old) => {
        const newList = old.list.filter((dataRow) => dataRow._id !== id);
        return { ...old, list: newList };
      });

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
