import axios from "axios";
import { useQuery } from "react-query";
import { API_HOST } from "../config";

const fetchSomething = async (url) => {
  const { data } = await axios(API_HOST + url);
  return Array.isArray(data) ? data : data.items;
};

const useSomething = (url) => useQuery(url, () => fetchSomething(url));

export { useSomething, fetchSomething };
