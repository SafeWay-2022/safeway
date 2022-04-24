import axios from "axios";
import { useQuery } from "react-query";

const fetchSomething = async (url) => {
  console.log({ url });
  const { data } = await axios(url);
  return Array.isArray(data) ? data : data.items;
};

const useSomething = (url) => useQuery("something", () => fetchSomething(url));

export { useSomething, fetchSomething };
