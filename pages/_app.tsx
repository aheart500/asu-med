import "../styles/globals.css";
import { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import StudentState from "../Contexts/Student/StudentState";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>
      <StudentState>
        <CssBaseline />
        <Component {...pageProps} />
      </StudentState>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
