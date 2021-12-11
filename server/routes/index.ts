import { NextFunction, RequestHandler, Router } from "express";
import FamiliesRouter from "./families/index";
import ToolsRouter from "./tools";

const route = Router();

const handleReqMiddleware: RequestHandler = (req, res, next) => {
  console.log(`${req.method} ${req.url} `, req.body);
  next();
};
route.use(handleReqMiddleware);
route.use("/tools", ToolsRouter);
route.use("/families", FamiliesRouter);
export default route;
