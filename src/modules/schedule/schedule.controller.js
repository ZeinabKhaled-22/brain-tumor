// import module 
import { User } from "../../../db/index.js"
import { messages } from "../../utilies/constant/messages.js"

// add to schedule
export const addToSchedule = async (req, res, next) => {
    // get data feom req
    const { doctorId } = req.params
    const userId = req.authUser._id
    // add to db
    const userUpdated = await User.findByIdAndUpdate(userId, { $addToSet: { schedule: doctorId } }, { new: true })
    // send response
    return res.status(200).json({
        message: messages.schedule.updatedSucessfully,
        success: true,
        data: userUpdated.schedule
    })

}

// get all 
export const getAllSchedule = async (req, res, next) => {
    const userId = req.authUser._id;
        const user = await User.findById(userId).populate('schedule'); // populate from doctors collection

        return res.status(200).json({
            success: true,
            data: user.schedule
        })
    // const allSchedule = await User.find()
    // return res.status(200).json({ success: true, data: allSchedule })
}

// delete Schedule
export const deleteSchedule = async (req, res, next) => {
    const { scheduleId } = req.params
    const deletedSchedule = await User.deleteOne({ _id: scheduleId })
    return res.status(200).json({ message: messages.schedule.deletedSuccessfully, success: true })
}

// get specific 
export const specificSchedule = async (req, res, next) => {
    // get data feom req
    const { scheduleId } = req.params
    // get specific
    const getSpecific = await User.findById(scheduleId)
    // send response
    return res.status(200).json({ data: getSpecific, success: true })
}