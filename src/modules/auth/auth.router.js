// import module
import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { signupVal } from "./auth.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { signup, verifyAccount, login } from "./auth.controller.js";
import { loginVal } from "./auth.validation.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";

// router
const authRouter = Router();

// signup
authRouter.post("/signup", isValid(signupVal), asyncHandler(signup));

// verify token
authRouter.get("/verify/:token", asyncHandler(verifyAccount));

// login
authRouter.post("/login", isValid(loginVal), asyncHandler(login));

// update account
authRouter.put(
  "/:userId",
  isAuthenticated(),
  isAuthorized([]),
  // asyncHandler(updateAccount)
);

// delete account
authRouter.delete(
  "/:userId",
  isAuthenticated(),
  isAuthorized([]),
  // asyncHandler(deleteAccount)
);

export default authRouter;
