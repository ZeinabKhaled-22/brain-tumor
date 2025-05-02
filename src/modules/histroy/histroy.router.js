// import module
import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isValid } from "../../middleware/validation.js";
import { addHistroyVal } from "./histroy.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addHistroy, deleteHistory, getAllHistroy } from "./histroy.controller.js";
import { cloudUploads } from "../../utilies/multer_cloud.js";

// router
const histroyRouter = Router()

// add histroy
histroyRouter.post('/addHistroy', isAuthenticated(),cloudUploads().single('image'), isValid(addHistroyVal), asyncHandler(addHistroy))

// get all histroy
histroyRouter.get('/getAllHistories',isAuthenticated(), asyncHandler(getAllHistroy))

// delete history
histroyRouter.delete('/:histroyId', isAuthenticated(), asyncHandler(deleteHistory))




// export
export default histroyRouter