import { Table } from "antd";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_HOST, API_REMOTE_HOST } from "../config";
import { useQueryClient } from "react-query";

const doFetch = async (url, data) => {
  console.log({ url, data });
  return axios.put(API_REMOTE_HOST + url + 1, {
    ...data,
  });
};

const useMutateSomething = (mutationKey, url, key) => {
  const queryClient = useQueryClient();
  const { mutate, error, isError } = useMutation((data) => doFetch(url, data), {
    mutationKey,

    onError: async (err, clientRow, context) => {
      try {
        await queryClient.invalidateQueries(key);
        const previousTable = queryClient.getQueryData(key);

        const serverRow = previousTable.find(
          ({ _id }) => _id === clientRow._id
        );

        if (serverRow.name !== clientRow.name) {
          // TODO - think about cleaner solution
          queryClient.setQueryData(key, [...previousTable, {}]);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return mutate;
};

export default useMutateSomething;
