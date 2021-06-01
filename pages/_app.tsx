import "../styles/globals.css";
import { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
