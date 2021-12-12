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
import Head from "next/head";
import React, { useEffect, useState } from "react";
import BookRow from "../../../../components/bookfair/BookRow";
import { GetBooks } from "../../../../services/bookfair";
import BooksTabs from "../../../../components/bookfair/BooksTabs";
import Loader from "../../../../components/Loader";
import { BookFairTableColumns } from "../../../../components/bookfair/constants/bookfair";
const bookfair = () => {
  const [books, setBooks] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetBooks("unlisted")
      .then((res) => setBooks(res))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

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
              {BookFairTableColumns.map((col) => (
                <TableCell key={col.name} width={col.width}>
                  {col.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <Loader />
            ) : (
              books.map((book) => (
                <BookRow key={book._id} data={book} hide={true} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default bookfair;
