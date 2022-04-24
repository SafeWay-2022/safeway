import axios from "axios";
import { useQuery } from "react-query";
import { CLIENT_HOST } from "../config";

const fetchSomething = async () => {
  const { data } = await axios(CLIENT_HOST);
  return data?.items || [];
};

const useSomething = () => useQuery("something", () => fetchSomething());

export { useSomething, fetchSomething };
