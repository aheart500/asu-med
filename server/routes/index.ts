import { Router } from "express";
import FamiliesRouter from "./families";
import ToolsRouter from "./tools";

const route = Router();

route.use("/tools", ToolsRouter);
route.use("/families", FamiliesRouter);
export default route;
