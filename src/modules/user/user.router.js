// import module
import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { forgetpassVal } from "./user.validation.js";
import { changePassword, forgetPassword, resetPassword, } from "./user.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";

// router
const userRouter= Router()

// reset passsword
userRouter.put('/reset', isAuthenticated(), asyncHandler(resetPassword))

// forget password
userRouter.post('/forget',isValid(forgetpassVal),asyncHandler(forgetPassword))

// change password
userRouter.put('/changePassword', isAuthenticated(), asyncHandler(changePassword))




export default userRouter