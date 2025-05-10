// import module 
import { User } from "../../../db/index.js"
import { messages } from "../../utilies/constant/messages.js"

// add to schedule
export const addToSchedule = async (req, res, next) => {
    const { doctorId } = req.params;
    const userId = req.authUser._id;

    // Step 1: Add doctor to user's schedule
    await User.findByIdAndUpdate(
        userId,
        { $addToSet: { schedule: doctorId } }, // $addToSet prevents duplicates
        { new: true }
    );

    // Step 2: Get updated user with full doctor data
    const userWithSchedule = await User.findById(userId).populate('schedule');

    // Step 3: Return response
    return res.status(200).json({
        message: 'Schedule updated successfully',
        success: true,
        data: userWithSchedule.schedule // full doctor data
    });

    // get data feom req
    // const { doctorId } = req.params
    // const userId = req.authUser._id
    // // add to db
    // const userUpdated = await User.findByIdAndUpdate(userId, { $addToSet: { schedule: doctorId } }, { new: true })
    // // send response
    // return res.status(200).json({
    //     message: messages.schedule.updatedSucessfully,
    //     success: true,
    //     data: userUpdated.schedule
    // })

}

// get all 
export const getAllSchedule = async (req, res, next) => {
    // const { userId } = req.params
    const userId = req.authUser?._id;
    const user = await User.findById(userId).populate('schedule'); // populate from doctors collection
    // const allSchedule = await User.find().populate('schedule')
    return res.status(200).json({
        success: true,
        data: user.schedule
        //  data: allSchedule
    })
    // const allSchedule = await User.find()
    // return res.status(200).json({ success: true, data: allSchedule })
}

// delete Schedule

export const deleteSchedule = async (req, res, next) => {
    const { scheduleId } = req.params
    const deletedSchedule = await User.updateOne({ _id: req.authUser._id }, { $pull: { schedule: scheduleId } })
    return res.status(200).json({ message: messages.schedule.deletedSuccessfully, success: true })
}