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
import { useQueryClient, useQuery, useMutation } from "react-query";
import BookRow from "../../../components/bookfair/BookRow";
import { GetBooks, SaveBookOrBooks } from "../../../services/bookfair";

const bookfair = () => {
  const [books, setBooks] = useState<Array<any>>([]);
  useEffect(() => {
    GetBooks()
      .then((res) => setBooks(res))
      .catch((e) => console.log(e));
  }, []);
  const bookActionCallBack = (_id: string) =>
    setBooks(books.filter((book) => book._id !== _id));
  return (
    <div>
      <Head>
        <title>Books List</title>
      </Head>
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
            {books
              .filter((b) => b.genre === "")
              .map((book) => (
                <BookRow data={book} cb={() => bookActionCallBack(book._id)} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default bookfair;
