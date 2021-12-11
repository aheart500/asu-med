import { Schema, model, Document, Model } from "mongoose";
export type BookGenres =
  | "Entertainmaint"
  | "Educational"
  | "Children"
  | "Novels"
  | "Religious"
  | "Stories";

export interface BookDocument extends Document {
  title: string;
  description: string;
  genre: BookGenres;
}
const BookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  genre: { type: String, default: "" },
});

const Book = model<BookDocument>("Book", BookSchema);
export default Book;
