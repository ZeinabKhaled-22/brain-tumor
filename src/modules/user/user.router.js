// import module
import { Router } from "express";
import { resetPassword, } from "./user.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";

// router
const userRouter= Router()

// reset passsword
userRouter.put('/reset', isAuthenticated(), asyncHandler(resetPassword))




export default userRouter