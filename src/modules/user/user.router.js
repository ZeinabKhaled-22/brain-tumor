// import module
import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { forgetpassVal } from "./user.validation.js";
import { changePassword, forgetPassword, } from "./user.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";

// router
const userRouter= Router()

// forget password
userRouter.post('/forget',isValid(forgetpassVal),asyncHandler(forgetPassword))

// reset password
userRouter.put('/changePassword', isAuthenticated(), asyncHandler(changePassword))
export default userRouter