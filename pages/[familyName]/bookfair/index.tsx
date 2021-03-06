import {
  Button,
  TextField,
  makeStyles,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import BooksTabs from "../../../components/bookfair/BooksTabs";
import { bookGenres } from "../../../components/bookfair/constants/bookfair";
import { GetBooks, SaveBookOrBooks } from "../../../services/bookfair";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "1rem",
  },
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
  numberInput: {
    width: "50px",
  },
}));
const intialBook = {
  title: "",
  genre: "",
  number: 0,
};
const bookfair = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [newBook, setNewBook] = useState(intialBook);
  const [newBooks, setNewBooks] = useState(intialBook);
  const { data: books } = useQuery("books", () => GetBooks(), {
    initialData: [],
  });
  const { mutate: save } = useMutation(SaveBookOrBooks, {
    onSuccess: () => {
      setNewBook(intialBook);
      setNewBooks(intialBook);
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  const handleMultipleBooksInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setNewBooks({ ...newBooks, [e.target.name]: e.target.value });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    save({ bulk: false, book: newBook });
  };
  const handleMultipleBooksFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    save({ bulk: true, books: newBooks });
  };
  return (
    <div>
      <BooksTabs />
      <form onSubmit={handleFormSubmit} className={classes.root}>
        <TextField
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          className={classes.rtlInput}
          variant="filled"
          style={{ width: "50%" }}
          placeholder="?????????? ????????????"
        />
        <FormControl style={{ width: "25%", marginTop: "24px" }}>
          <Select
            labelId="demo-simple-select-label"
            className={classes.rtlInput}
            id="demo-simple-select"
            value={newBook.genre}
            name="genre"
            onChange={handleInputChange}
            placeholder="?????????? ????????????"
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
        <TextField
          name="number"
          value={newBook.number}
          onChange={handleInputChange}
          variant="filled"
          type="number"
          className={classes.numberInput}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
      <form onSubmit={handleMultipleBooksFormSubmit} className={classes.root}>
        <TextField
          name="title"
          value={newBooks.title}
          onChange={handleMultipleBooksInputChange}
          className={classes.rtlInput}
          variant="filled"
          style={{ width: "50%" }}
          multiline
          rows={5}
          placeholder="?????????? ????????????"
        />
        <FormControl style={{ width: "25%", marginTop: "24px" }}>
          <Select
            labelId="demo-simple-select-label"
            className={classes.rtlInput}
            id="demo-simple-select"
            value={newBooks.genre}
            name="genre"
            onChange={handleMultipleBooksInputChange}
            placeholder="?????????? ????????????"
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
        <TextField
          name="number"
          value={newBooks.number}
          onChange={handleMultipleBooksInputChange}
          variant="filled"
          type="number"
          className={classes.numberInput}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
      <ul>
        {/*   {books.map((book) => (
          <li key={book._id}>{book.title} </li>
        ))} */}
      </ul>
    </div>
  );
};

export default bookfair;
