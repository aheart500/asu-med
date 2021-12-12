import {
  TableRow,
  TableCell,
  TextField,
  FormControl,
  MenuItem,
  Select,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useState, useRef } from "react";
import { DeleteBook, UpdateBook } from "../../services/bookfair";
import { BookFairTableColumns, bookGenres } from "./constants/bookfair";
const useStyles = makeStyles(() => ({
  rtlInput: {
    direction: "rtl",
    "& .MuiInputBase-input": {
      textAlign: "right",
    },
  },
  menuItem: {
    justifyContent: "flex-end",
  },
  saveBtn: {
    margin: "1rem",
  },
  actionsCell: {
    "@media (max-width: 768px)": {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
      flexDirection: "column-reverse",
    },
  },
  numberInput: {
    "& .MuiFilledInput-input": {
      padding: "5px 2px",
    },
  },
}));

const BookRow = ({ data, hide }) => {
  const classes = useStyles();
  const originalBook = useRef(data);
  const [book, setBook] = useState(data);
  const [hidden, setHidden] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBook({ ...book, [e.target.name]: e.target.value });
  const handleBookSave = () => {
    UpdateBook({ bookId: data._id, body: book })
      .then(() => hide && setHidden(true))
      .catch((e) => console.log(e));
  };
  const handleBookDelete = () => {
    DeleteBook({ bookId: data._id })
      .then(() => setHidden(true))
      .catch((e) => console.log(e));
  };
  if (hidden) return null;
  return (
    <TableRow key={book._id}>
      <TableCell
        width={BookFairTableColumns[0].width}
        align="right"
        className={classes.actionsCell}
      >
        <Button
          onClick={handleBookDelete}
          variant="contained"
          color="secondary"
        >
          حذف
        </Button>
        <Button
          disabled={
            originalBook.current.title === book.title &&
            originalBook.current.genre === book.genre &&
            originalBook.current.number === book.number
          }
          color="primary"
          onClick={handleBookSave}
          variant="contained"
          className={classes.saveBtn}
        >
          حفظ
        </Button>
      </TableCell>
      <TableCell width={BookFairTableColumns[1].width}>
        <TextField
          name="number"
          value={book.number}
          onChange={handleChange}
          fullWidth
          variant="filled"
          type="number"
          className={classes.numberInput}
        />
      </TableCell>
      <TableCell width={BookFairTableColumns[2].width}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            className={classes.rtlInput}
            id="demo-simple-select"
            value={book.genre}
            name="genre"
            onChange={handleChange}
          >
            {bookGenres.map((genre) => (
              <MenuItem
                key={genre.name}
                className={classes.menuItem}
                value={genre.name}
              >
                {genre.arabic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell width={BookFairTableColumns[3].width} align="right">
        <TextField
          name="title"
          className={classes.rtlInput}
          value={book.title}
          onChange={handleChange}
          fullWidth
          variant="filled"
        />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(BookRow);
