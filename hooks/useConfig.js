import axios from "axios";
import { useQuery } from "react-query";
import { CONFIG_HOST } from "../config";

export default () =>
  useQuery("appConfig", async () => {
    console.log({ CONFIG_HOST });
    const { data } = await axios(CONFIG_HOST);
    return data;
  });
