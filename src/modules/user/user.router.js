// import module
import { Router } from "express";
import { deleteAccount, editProfile, resetPassword } from "./user.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { cloudUploads } from "../../utilies/multer_cloud.js";
import { isValid } from "../../middleware/validation.js";
import { editProfileVal } from "./user.validation.js";

// router
const userRouter= Router()

// reset passsword
userRouter.put('/reset-password', isAuthenticated(), asyncHandler(resetPassword))

// edit profile
userRouter.put("/:userId", isAuthenticated(), cloudUploads().single('image'),isValid(editProfileVal),asyncHandler(editProfile));

// delete account
userRouter.delete("/:userId",isAuthenticated(),asyncHandler(deleteAccount));




export default userRouter