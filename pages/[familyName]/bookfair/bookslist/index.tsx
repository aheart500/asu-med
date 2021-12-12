import {
  Button,
  makeStyles,
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
import React, { useEffect, useState, useRef } from "react";
import BookRow from "../../../../components/bookfair/BookRow";
import BooksTabs from "../../../../components/bookfair/BooksTabs";
import { GetBooks } from "../../../../services/bookfair";
import Loader from "../../../../components/Loader";
import ReactToPrint from "react-to-print";
import PrintBooks from "../../../../components/bookfair/PrintBooks";
import { BookFairTableColumns } from "../../../../components/bookfair/constants/bookfair";
const useStyles = makeStyles(() => ({
  tableBar: {
    display: "flex",
    margin: "0.5rem 1rem",
    flexDirection: "row-reverse",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));
const bookfair = () => {
  const [books, setBooks] = useState<Array<any>>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    GetBooks()
      .then((res) => setBooks(res))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);
  const printTableRef = useRef();
  const handleChangeText = (e: any) => setSearchText(e.target.value);
  const searchRegex = new RegExp(searchText, "ig");
  const booksFiltered = books.filter((book) =>
    searchText === "" ? true : book?.title.match(searchRegex)
  );
  return (
    <div>
      <Head>
        <title>Books List</title>
      </Head>
      <BooksTabs />
      <div className={classes.tableBar}>
        <h3> عدد الكتب: {books.length}</h3>
        <TextField
          value={searchText}
          onChange={handleChangeText}
          variant="outlined"
          placeholder="ابحث عن كتاب"
          inputProps={{ style: { textAlign: "right" } }}
          style={{ margin: "0 1rem" }}
        />
        <ReactToPrint
          trigger={() => (
            <Button
              variant="contained"
              style={{ margin: "0 1rem" }}
              color="primary"
            >
              طباعة
            </Button>
          )}
          content={() => printTableRef.current}
          pageStyle="@media print { body { -webkit-print-color-adjust: exact; } }"
        />
      </div>
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
              booksFiltered.map((book) => (
                <BookRow key={book._id} data={book} hide={false} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PrintBooks ref={printTableRef} books={books} />
    </div>
  );
};

export default bookfair;
