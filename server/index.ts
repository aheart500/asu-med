import express from "express";
import next from "next";
import mainRouter from "./routes";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./utils/config";
// Server Initialization
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();

nextApp
  .prepare()
  .then(() => {
    mongoose
      .connect(MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => console.log("MongoDB connected successfully"))
      .catch((err) => console.log(err));
    app.use(express.json());
    app.use("/api", mainRouter);
    app.all("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(PORT, () => {
      console.log("App ready on port " + PORT);
    });
  })
  .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
  });
