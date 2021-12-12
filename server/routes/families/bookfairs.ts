import { Router } from "express";
import Book, { BookGenres } from "../../models/Book";

const BookFairsRouter = Router();

BookFairsRouter.get("/", async (_, res) => {
  try {
    const books = await Book.find({}).select("title genre").lean();
    res.send(books);
  } catch (e) {
    res.status(400).send(e);
  }
});
BookFairsRouter.get("/unlisted", async (_, res) => {
  try {
    const books = await Book.find({ genre: "" as any })
      .select("title genre")
      .lean();

    res.send(books);
  } catch (e) {
    res.status(400).send(e);
  }
});

BookFairsRouter.get("/:genre", async (req, res) => {
  try {
    const books = await Book.find({
      genre: { $regex: new RegExp(req.params.genre, "i") },
    })
      .select("title genre")
      .lean();

    res.send(books);
  } catch (e) {
    res.status(400).send(e);
  }
});

// For many books with titles only : Send req as {bulk: true, books: "book1, book2" }
// For single book : Sent req as {bulk : false, book : BOOK}
BookFairsRouter.post("/", async (req, res) => {
  const isBulk = req.body.bulk === true;
  try {
    if (isBulk) {
      const books = req.body.books
        .split("\n")
        .filter((book: string) => book !== "")
        .map((book: string) => ({ title: book.trim() }));
      const insertedBooks = await Book.insertMany(books);
      res.send(insertedBooks);
    } else {
      const book = await Book.create(req.body.book);
      res.send(book);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
BookFairsRouter.patch("/:bookId", (req, res) => {
  Book.findByIdAndUpdate(req.params.bookId, { $set: req.body }, { new: true })
    .then((book) => {
      res.send(book);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
BookFairsRouter.delete("/:bookId", async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.params.bookId });
    res.send("Deleted");
  } catch (e) {
    res.status(400).send(e);
  }
});

export default BookFairsRouter;
