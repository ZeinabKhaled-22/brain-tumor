// import router
import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { cloudUploads } from "../../utilies/multer_cloud.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

// doctor router
const doctorRouter = Router()

// get all doctor
doctorRouter.get(
    '/getAllDoctor',
     isAuthenticated(),
      cloudUploads().array([{name: 'doctor'}]),
       asyncHandler()
    )

export default doctorRouter