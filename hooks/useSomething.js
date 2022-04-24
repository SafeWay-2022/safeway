import axios from "axios";
import { useQuery } from "react-query";
import { API_POI } from "../config";

const fetchData = async () => {
  const { data } = await axios("config.json");
  return data;
};

const fetchSomething = async () => {
  const { data } = await axios(API_POI);
  return data?.items || [];
};

const useData = () => useQuery("data", () => fetchData());
const useSomething = () => useQuery("something", () => fetchSomething());

export { useSomething, fetchSomething, useData };
