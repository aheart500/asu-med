import { useContext, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Container from "@material-ui/core/Container";
import StudentContext from "../../Contexts/Student/StudentContext";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";
const useStyle = makeStyles(() => ({
  rank: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "25rem",
    fontSize: "10rem",
  },
}));
const ordinal_suffix_of = (i: number) => {
  let j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};

const rank = () => {
  const router = useRouter();
  const classes = useStyle();
  const { State } = useContext(StudentContext);

  useEffect(() => {
    if (!State) {
      router.push("/rank");
    }
  }, []);
  if (!State) return <h1>Redirecting...</h1>;
  const isMainStream = State.id.toString().length === 6;
  return (
    <Container maxWidth="md" className={styles.container}>
      <Head>
        <title>Rank | Result</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <h1>Out of {State.total} students, you're the</h1>
      <div className={classes.rank}>{ordinal_suffix_of(State.rank)}</div>
      <h1>
        Out of
        {isMainStream
          ? ` ${State.mainstreamStudents} mainstream students, `
          : ` ${State.empStudents} EMP students, `}
        you're the {ordinal_suffix_of(State.rankAmongGroup)}
      </h1>
    </Container>
  );
};

export default rank;
