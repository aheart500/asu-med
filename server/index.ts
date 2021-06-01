import express from "express";
import next from "next";
import mainRouter from "./routes";

// Server Initialization
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
const port = process.env.PORT || 3000;
nextApp
  .prepare()
  .then(() => {
    app.use(express.json());
    app.use("/api", mainRouter);
    app.all("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, () => {
      console.log("App ready on port " + port);
    });
  })
  .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
  });
