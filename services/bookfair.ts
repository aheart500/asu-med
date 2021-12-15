import { BookGenres } from "../server/models/Book";
import { APICall } from "./api";

export const GetBooks = async (genre?: BookGenres | "unlisted") => {
  const result = await APICall.get(
    `/families/bookfair/${genre ? genre.toLowerCase() : ""}`
  );
  return result.data;
};
interface Book {
  title: string;
  genre: string;
  number: number;
}
interface ManyBooksSubmit {
  bulk: true;
  books: Book;
}
interface SingleBookSumbit {
  bulk: false;
  book: any;
}

export const SaveBookOrBooks = async (
  body: SingleBookSumbit | ManyBooksSubmit
) => {
  const result = await APICall.post("/families/bookfair", body);
  return result.data;
};

export const UpdateBook = async ({
  bookId,
  body,
}: {
  bookId: string;
  body: any;
}) => {
  const result = await APICall.patch("/families/bookfair/" + bookId, body);
  return result.data;
};
export const DeleteBook = async ({ bookId }: { bookId: string }) => {
  const result = await APICall.delete("/families/bookfair/" + bookId);
  return result.data;
};
