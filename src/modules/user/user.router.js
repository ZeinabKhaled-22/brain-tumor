// import module
import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { forgetpassVal } from "./user.validation.js";
import { forgetPassword,  resetPassword,  } from "./user.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";

// router
const userRouter= Router()

// forget password
userRouter.post('/forget',isValid(forgetpassVal),asyncHandler(forgetPassword))

// reset password
userRouter.put('/reset', isAuthenticated(), asyncHandler(resetPassword))
export default userRouter