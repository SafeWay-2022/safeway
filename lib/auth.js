import { API_REMOTE_HOST } from '../config';

export const login = async ({ username, password }) => {
  try {
    const result = await fetch(API_REMOTE_HOST + '/aaa/login', {
      headers: {
        accept: 'application/json',
        'accept-language': 'en-IL,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,en-US;q=0.6',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        pragma: 'no-cache',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      body: `username=${username}&password=${password}&scope=&client_id=&client_secret=`,
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    });

    const { access_token } = await result.json();
    setToken(access_token);

    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
};
export const logOut = () => {
  typeof localStorage !== 'undefined' && localStorage.removeItem('token');
}

export const setToken = (token) => {
  typeof localStorage !== 'undefined' && localStorage.setItem('token', token);
};

export const getToken = () => {
  return typeof localStorage !== 'undefined' && localStorage.getItem('token');
};
