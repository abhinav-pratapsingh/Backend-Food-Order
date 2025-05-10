import express from "express";
import { serachSugesstions } from "../controller/seachController.js";

const searchRouter = express.Router();

searchRouter.get("/",serachSugesstions);

export default searchRouter;