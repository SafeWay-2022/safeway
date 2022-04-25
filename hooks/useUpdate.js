import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_HOST, API_REMOTE_HOST } from "../config";

const doFetch = async (url, data) => {
  console.log({ url, data });
  fetch(API_REMOTE_HOST + url, {
    headers: {
      accept: "application/json",
      "cache-control": "no-cache",
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    method: "PUT",
    mode: "cors",
  });
};

const useMutateSomething = (mutationKey, url) => {
  const { mutate } = useMutation((data) => doFetch(url, data), {
    mutationKey,
    onSettled: (newTodo, error, variables, context) => {
      if (error) {
        // do something
      }
    },
  });

  return mutate;
};

export default useMutateSomething;
