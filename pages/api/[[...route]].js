import axios from 'axios';
import { API_REMOTE_HOST } from '../../config';

export default async function handler(req, res) {
  const { route, limit, skip } = req.query;

  const isNotTable = [].find((r) => route.includes(r));

  const path = route.join('/');
  const queryParams = isNotTable ? '' : `/?limit=${limit || 10000}&skip=${skip || 0}`;
  const url = API_REMOTE_HOST + '/' + path + queryParams;

  try {
    console.log('url:', req.method.toLowerCase(), url);
    const headers = req.headers?.authorization ? { headers: req.headers?.authorization } : {};
    const { data } = await axios({
      method: req.method.toLowerCase(),
      url: url,
      data: req.body,
      headers,
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
// curl -X GET 'https://safeway-chi.vercel.app/api/org?limit=10'  -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZnVuYyIsInNjb3BlcyI6WyJtZTpSIiwibWU6VSJdLCJleHAiOjE2NTU0OTczOTF9.dzdtrkDSbp8YYG_juIsL579fdqYc4KHQ0AyoiKeUYKQ"
