import axios from 'axios';
import { API_REMOTE_HOST } from '../../config';

export default async function handler(req, res) {
  const { route, limit, skip } = req.query;

  const isNotTable = [].find((r) => route.includes(r));

  const path = route.join('/');
  // const queryParams = isNotTable ? '' : `/?limit=${limit || 10000}&skip=${skip || 0}`;
  const url = API_REMOTE_HOST + '/' + path;

  try {
    console.log('url:', req.method.toLowerCase(), url);
    const headers = req.headers ? { ...req.headers } : {};
    delete headers.host; // https://stackoverflow.com/a/33771557/5575768

    const response = await axios({
      method: req.method.toLowerCase(),
      url: url,
      data: req.body,
      headers,
      params: req.query
    });

    const { data } = response;
    return res.status(200).json(data);
  } catch (e) {
    console.log('Huston...', e);
    const payload = {
      message: e?.message,
      statusText: e?.response?.statusText,
      status: e?.response?.status,
    };
    return res.status(e?.response?.status || 400).json(payload);
  }
}
