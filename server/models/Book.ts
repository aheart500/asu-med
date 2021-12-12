import { Schema, model, Document, Model } from "mongoose";
export type BookGenres =
  | "Entertainmaint"
  | "Educational"
  | "Children"
  | "Novels"
  | "Religious"
  | "short Stories"
  | "Cultural"
  | "Self Development";

export interface BookDocument extends Document {
  title: string;
  description: string;
  genre: BookGenres;
  number: number;
}
const BookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  genre: { type: String, default: "" },
  number: { type: Number, default: 0 },
});

const Book = model<BookDocument>("Book", BookSchema);
export default Book;
