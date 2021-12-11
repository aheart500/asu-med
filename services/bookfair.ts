import { APICall } from "./api";

export const GetBooks = async () => {
  const result = await APICall.get(`/families/bookfair`);
  return result.data;
};

interface ManyBooksSubmit {
  bulk: true;
  books: String;
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
