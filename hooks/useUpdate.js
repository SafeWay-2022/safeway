import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { mapUIRowToServerData } from '../components/ui-components/Inputs/mappers';
import { API_HOST } from '../config';

const doFetch = async (url, data) => axios.put(API_HOST + url, data);

export default function useUpdate({ url, mutationKey, tableKey, route }) {
  const queryClient = useQueryClient();

  const { mutate, error, isError } = useMutation(
    (data) => doFetch(url, mapUIRowToServerData(data, route)),
    {
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
    },
  );

  return mutate;
}
