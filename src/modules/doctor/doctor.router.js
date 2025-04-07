// import router
import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { cloudUploads } from "../../utilies/multer_cloud.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { extractData } from "./doctor..controller.js";
import { fileUploads } from "../../utilies/multer.js";

// doctor router
const doctorRouter = Router()

// get all doctor
// doctorRouter.get(
//     '/getAllDoctor',
//      isAuthenticated(),
//       cloudUploads().single('file'),
//        asyncHandler(getAllDoctor)
//     )

doctorRouter.post('/read-file',fileUploads({folder: "doctor's-data"}).single('file'), asyncHandler(extractData))

export default doctorRouter