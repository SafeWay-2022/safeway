import axios from 'axios';
import url from 'url';
import { API_REMOTE_HOST } from '../../config';

export default async function handler(req, res) {
  const params = new url.URLSearchParams(req.body);
  try {
    const url = API_REMOTE_HOST + '/aaa/login';
    console.log('login url:', url);
    const { data } = await axios.post(url, params.toString(), {
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    return res.end(JSON.stringify(data));
  } catch (e) {
    console.log('Login Huston...', e.message);
    const payload = {
      message: e?.message,
      statusText: e?.response?.statusText,
      status: e?.response?.status,
    };
    return res.status(401).json(payload);
  }
}
