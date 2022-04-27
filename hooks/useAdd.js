import axios from 'axios';
import { useMutation } from 'react-query';
import { API_HOST } from '../config';
import { useQueryClient } from 'react-query';

const doFetch = async (url, data) => axios.post(API_HOST + url, data);

export default function useAdd({ url, mutationKey, tableKey }) {
  const queryClient = useQueryClient();

  const { mutate, error, isError } = useMutation((data) => doFetch(url, data), {
    mutationKey,
    onMutate: async (newRow) => {
      await queryClient.cancelQueries(tableKey);
      await queryClient.cancelQueries(mutationKey);

      const previousTable = queryClient.getQueryData(tableKey);

      queryClient.setQueryData(tableKey, (old) => [newRow, ...old]);

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
