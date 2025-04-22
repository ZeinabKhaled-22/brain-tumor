// import module
import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { changePasswordVal, forgetpassVal, signupVal } from "./auth.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { signup, verifyAccount, login, forgetPassword, changePassword, signWithGoogle, verifyGoogle, verifyCallback, getProfile, logout } from "./auth.controller.js";
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

// sign with google
authRouter.get('/signWithGoogle', asyncHandler(signWithGoogle))

// verify google
authRouter.get('/auth/google',asyncHandler(verifyGoogle))

// verify google
authRouter.get('/auth/google/callback', asyncHandler(verifyCallback))

// profile
authRouter.get('/profile', asyncHandler(getProfile))

// logout
authRouter.get('/logout', asyncHandler(logout))

export default authRouter;
