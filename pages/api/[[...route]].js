import axios from 'axios';
import App from 'next/app';
import { API_REMOTE_HOST } from '../../config';

export default async function handler(req, res) {
  const { route } = req.query;
  const path = route.join('/')
  console.log('-->', req.method, path);

  try {
    const { data } = await axios[req.method.toLowerCase()](
      API_REMOTE_HOST + '/' + path,
      req.body,
    );
    return res.status(200).json(data);
  } catch (e) {
    console.log('Huston...');
    console.log(e.response.statusText, e.response.status);
    return res
      .status(400)
      .json({ message: e.message, statusText: e.response.statusText, status: e.response.status });
  }
}
