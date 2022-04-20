import axios from "axios";
import { API_HOST } from "../../config";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get(API_HOST + "/poi/");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}
