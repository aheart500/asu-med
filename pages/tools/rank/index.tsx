import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import Container from "@material-ui/core/Container";
import SavingDataForm from "../../../components/Tools/SavingDataForm";
import FetchingRankForm from "../../../components/Tools/FetchingRankForm";
import clsx from "clsx";
const Rank = () => {
  return (
    <div>
      <Head>
        <title>Rank | Login</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Container
        maxWidth="sm"
        className={clsx(styles.container, "rank-container")}
      >
        <SavingDataForm />
        <FetchingRankForm />
      </Container>
    </div>
  );
};
export default Rank;
