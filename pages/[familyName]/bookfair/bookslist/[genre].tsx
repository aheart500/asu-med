import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import BookRow from "../../../../components/bookfair/BookRow";
import { isAGenre } from "../../../../components/bookfair/constants/bookfair";
import BooksTabs from "../../../../components/bookfair/BooksTabs";
import { GetBooks } from "../../../../services/bookfair";
import Loader from "../../../../components/Loader";

const bookfair = ({ genre }) => {
  const [books, setBooks] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    isAGenre &&
      GetBooks(genre)
        .then((res) => setBooks(res))
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
  }, [genre]);
  if (!isAGenre)
    return "We don't have any book under this genre. Please re-check the url";
  return (
    <div>
      <Head>
        <title>Books List</title>
      </Head>
      <BooksTabs />
      <h3 style={{ textAlign: "right", margin: "0.5rem 1rem" }}>
        عدد الكتب: {books.length}
      </h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="25%"></TableCell>
              <TableCell width="25%" align="right">
                التصنيف
              </TableCell>
              <TableCell width="50%" align="right">
                اسم الكتاب
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <Loader />
            ) : (
              books.map((book) => (
                <BookRow key={book._id} data={book} hide={false} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      genre: context.query.genre,
    },
  };
};
export default bookfair;
