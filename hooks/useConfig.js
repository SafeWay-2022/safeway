import axios from "axios";
import { useQuery } from "react-query";
import { CONFIG_HOST } from "../config";

export default () =>
  useQuery("appConfig", async () => {
    const { data } = await axios(CONFIG_HOST);
    return data;
  });
