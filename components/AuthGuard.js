import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API_HOST } from '../config';
import { getToken } from '../lib/auth';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    console.log('fetching me....');
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/login'];
    const path = url.split('?')[0];

    // The only closed route for today, uncomment to test
    // const result = await fetch(API_HOST + '/org', {
    const result = await fetch(API_HOST + '/aaa/me', {
      headers: {
        accept: 'application/json',
        authorization: 'Bearer ' + getToken(),
        'sec-fetch-mode': 'cors',
      },
      method: 'GET',
      mode: 'cors',
    });

    const isAuth = result.ok;

    if (!isAuth && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
