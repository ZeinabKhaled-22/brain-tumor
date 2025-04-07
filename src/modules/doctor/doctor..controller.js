import { Doctor } from "../../../db/index.js"
import cloudinary from "../../utilies/cloud.js"

// get all doctor
export const getAllDoctor = async (req,res,next) => {
    // upload file
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
        folder: 'brain-tumor/doctors-data'
    })
    // // get all
    // const allDoctor = await Doctor.find()
    // send response
    return res.status(200).json({data: allDoctor, success: true})
}