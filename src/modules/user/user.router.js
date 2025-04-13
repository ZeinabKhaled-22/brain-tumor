// import module
import { Router } from "express";
import { deleteAccount, resetPassword, updateAccount, } from "./user.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";

// router
const userRouter= Router()

// reset passsword
userRouter.put('/reset-password', isAuthenticated(), asyncHandler(resetPassword))

// update account
userRouter.put(
  "/:userId",
  isAuthenticated(),
  asyncHandler(updateAccount)
);

// delete account
userRouter.delete(
  "/:userId",
  isAuthenticated(),
  asyncHandler(deleteAccount)
);




export default userRouter