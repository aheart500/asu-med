import "../styles/globals.css";
import { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import StudentState from "../Contexts/Student/StudentState";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <StudentState>
      <CssBaseline />
      <Component {...pageProps} />
    </StudentState>
  );
}

export default MyApp;
