import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { getAllNews } from "./news.controller.js";

// news router
const newsRouter = Router()

// get all news
newsRouter.get('/getAllNews',isAuthenticated(),asyncHandler(getAllNews))

export default newsRouter