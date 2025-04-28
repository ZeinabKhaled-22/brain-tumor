// import modeule
import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addToSchedule, deleteSchedule, getAllSchedule, specificSchedule } from "./schedule.controller.js";

// Router
const scheduleRouter =  Router()

// add schedule
scheduleRouter.post('/:doctorId', isAuthenticated(), asyncHandler(addToSchedule) )

// get schedule
scheduleRouter.get('/getAllSchedule', asyncHandler(getAllSchedule))


// delete schedule
scheduleRouter.delete('/:scheduleId', isAuthenticated(), asyncHandler(deleteSchedule))

// specific
scheduleRouter.post('/:scheduleId',isAuthenticated(),asyncHandler(specificSchedule))




// export
export default scheduleRouter