import { useState } from "react";
import "../styles/globals.css";
import Head from "next/head";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
