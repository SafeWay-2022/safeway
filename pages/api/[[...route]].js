import axios from 'axios';
import App from 'next/app';
import { API_REMOTE_HOST } from '../../config';

export default async function handler(req, res) {
  const { route, limit, skip } = req.query;
  const path = route.join('/');
  const queryParams = `/?limit=${limit || 10000}&skip=${skip || 0}`;
  const url = API_REMOTE_HOST + '/' + path + queryParams;

  try {
    const { data } = await axios[req.method.toLowerCase()](url, req.body, {
      headers: req.headers,
    });
    return res.status(200).json(data);
  } catch (e) {
    console.log('Huston...');
    const payload = {
      message: e?.message,
      statusText: e?.response?.statusText,
      status: e?.response?.status,
    };
    console.log(payload);
    return res.status(400).json(payload);
  }
}
