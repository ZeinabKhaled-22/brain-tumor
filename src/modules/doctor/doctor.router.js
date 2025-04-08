// import router
import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { getAllDoctor } from "./doctor..controller.js";

// doctor router
const doctorRouter = Router()

// get all doctor
doctorRouter.get('/getAllDoctor',asyncHandler(getAllDoctor))

export default doctorRouter