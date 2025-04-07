import { Doctor } from "../../../db/index.js"

// get all doctor
export const getAllDoctor = async (req,res,next) => {
    // get all
    const allDoctor = await Doctor.find()
    // send response
    return res.status(200).json({data: allDoctor, success: true})
}