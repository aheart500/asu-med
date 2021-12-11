import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { GetBooks, SaveBookOrBooks } from "../../../services/bookfair";

const bookfair = () => {
  const queryClient = useQueryClient();
  const [textInput, setTextInput] = useState("");
  const { data: books } = useQuery("books", () => GetBooks(), {
    initialData: [],
  });
  const { mutate: save } = useMutation(SaveBookOrBooks, {
    onSuccess: () => queryClient.invalidateQueries("books"),
  });
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTextInput(e.target.value);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    save({ bulk: true, books: textInput });
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} style={{ display: "flex" }}>
        <TextField
          multiline
          rows={4}
          value={textInput}
          onChange={handleTextInputChange}
          variant="filled"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title} </li>
        ))}
      </ul>
    </div>
  );
};

export default bookfair;
