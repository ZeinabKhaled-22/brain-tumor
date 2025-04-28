// import module
import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { changePasswordVal, forgetpassVal, loginWithGoogleVal, signupVal } from "./auth.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { signup, verifyAccount, login, forgetPassword, changePassword } from "./auth.controller.js";
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

// forget password
authRouter.post('/forget-password',isValid(forgetpassVal),asyncHandler(forgetPassword))

// change password
authRouter.put('/change-password',isValid(changePasswordVal),asyncHandler(changePassword))

// login with google
authRouter.post('loginWithGoogle', isValid(loginWithGoogleVal), asyncHandler())


export default authRouter;
