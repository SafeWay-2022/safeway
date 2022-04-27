import axios from 'axios';
import App from 'next/app';
import { API_REMOTE_HOST } from '../../config';

export default async function handler(req, res) {
  console.log('-->', req.method, req.query.route);
  try {
    const { data } = await axios[req.method.toLowerCase()](
      API_REMOTE_HOST + '/' + req.query.route,
      req.body,
    );
    return res.status(200).json(data);
  } catch (e) {
    console.log('Huston...');
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
}
