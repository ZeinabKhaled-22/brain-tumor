// import module
import { Router } from "express";
import { changeEmail, deleteAccount, editProfile, resetPassword ,changePhone} from "./user.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { cloudUploads } from "../../utilies/multer_cloud.js";
import { isValid } from "../../middleware/validation.js";
import { changeEmailVal, editProfileVal ,changePhoneVal} from "./user.validation.js";

// router
const userRouter = Router()

// reset passsword  AC
userRouter.put('/reset-password', isAuthenticated(), asyncHandler(resetPassword))

// edit profile
userRouter.put("/:userId",
  isAuthenticated(),
  cloudUploads().single('image'),
  isValid(editProfileVal),
  asyncHandler(editProfile)
);

// delete account
userRouter.delete("/:userId", isAuthenticated(), asyncHandler(deleteAccount));

// edit email
userRouter.put('/:userId', isAuthenticated(),isValid(changeEmailVal), asyncHandler(changeEmail));

// edit phone
userRouter.put('/:userId', isAuthenticated(),isValid(changePhoneVal), asyncHandler(changePhone))




export default userRouter