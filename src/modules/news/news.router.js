import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { getAllNews } from "./news.controller.js";

// news router
const newsRouter = Router()

// get all news
newsRouter.get('/getAllNews',asyncHandler(getAllNews))

export default newsRouter