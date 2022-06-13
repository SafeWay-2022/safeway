import axios from 'axios';
import { API_REMOTE_HOST } from '../../config';
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  const { route, limit, skip } = req.query;

  const isNotTable = [].find((r) => route.includes(r));

  const path = route.join('/');
  const queryParams = isNotTable ? '' : `/?limit=${limit || 10000}&skip=${skip || 0}`;
  const url = API_REMOTE_HOST + '/' + path + queryParams;

  try {
    console.log('url:', req.method.toLowerCase(), url);
    await runMiddleware(req, res, cors)
    const { data } = await axios[req.method.toLowerCase()](url, req.body, {
      headers: req.headers,
    });
    return res.status(200).json(data);
  } catch (e) {
    console.log('Huston...', e.message);
    const payload = {
      message: e?.message,
      statusText: e?.response?.statusText,
      status: e?.response?.status,
    };
    return res.status(e?.response?.status || 400).json(payload);
  }
}
