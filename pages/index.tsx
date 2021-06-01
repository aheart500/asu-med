import Head from "next/head";
import styles from "../styles/Home.module.css";
import Container from "@material-ui/core/Container";
import SavingDataForm from "../components/SavingDataForm";
import FetchingRankForm from "../components/FetchingRankForm";
const soon = true;
const Home = () => {
  return (
    <div>
      <Head>
        <title>Ranking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        maxWidth="sm"
        className={styles.container}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {soon ? (
          <h1>Coming Soon!</h1>
        ) : (
          <>
            <SavingDataForm />
            <FetchingRankForm />
          </>
        )}
      </Container>
    </div>
  );
};
export default Home;
