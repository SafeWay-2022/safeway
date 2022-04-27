import axios from 'axios';
import { useMutation } from 'react-query';
import { API_HOST } from '../config';
import { useQueryClient } from 'react-query';

const doFetch = async (url) => axios.delete(API_HOST + url);

export default function useDelete({ url, mutationKey, tableKey }) {
  const queryClient = useQueryClient();

  const { mutate, error, isError } = useMutation((data) => doFetch(url, data), {
    mutationKey,
    onMutate: async (id) => {
      await queryClient.cancelQueries(tableKey);
      await queryClient.cancelQueries(mutationKey);

      const previousTable = queryClient.getQueryData(tableKey);

      queryClient.setQueryData(tableKey, (old) => old.filter((dataRow) => dataRow._id !== id));

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
