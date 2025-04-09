// import module
import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isValid } from "../../middleware/validation.js";
import { addUserData } from "./userData.controller.js";
import { addUserDataVal } from "./userData.validation.js";

const userDataRouter = Router()

// add userData
userDataRouter.post('/addData',isValid(addUserDataVal), asyncHandler(addUserData) )

export default userDataRouter