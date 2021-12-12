import { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getGenreInArabic } from "./constants/bookfair";
class PrintTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const books = (this as any).props.books;
    if (books.length === 0) return null;
    const tableRows = [];
    for (let i = 0; i <= books.length; i = i + 2) {
      tableRows.push([books[i], books[i + 1]]);
    }
    return (
      <TableContainer component={Paper} className="printTable">
        <Table size="small" style={{ direction: "rtl", fontSize: "0.8rem" }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">اسم الكتاب</TableCell>
              <TableCell align="right">التصنيف</TableCell>
              <TableCell align="right">اسم الكتاب</TableCell>
              <TableCell align="right">التصنيف</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="right">{row[0]?.title}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {getGenreInArabic(row[0]?.genre)}
                  </TableCell>
                  <TableCell align="right">{row[1]?.title}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {getGenreInArabic(row[1]?.genre)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default PrintTable as any;
