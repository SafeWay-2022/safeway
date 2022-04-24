import axios from "axios";
import { API_REMOTE_HOST } from "../../config";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get(API_REMOTE_HOST + "/" + req.query.route);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}
