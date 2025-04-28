// import modules
import { Histroy, User } from "../../../db/index.js"
import { AppError } from "../../utilies/appError.js"
import cloudinary from "../../utilies/cloud.js"
import { messages } from "../../utilies/constant/messages.js"

// add histroy
export const addHistroy = async (req, res, next) => {
    // get data from req
    const { prediction, predictedType, confidence, scanName, user } = req.body
    // check existence
    const userExist = await User.findById(user) //{}, null
    if (!userExist) {
        return next(new AppError(messages.user.notFound, 404))
    }
    // upload image
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        public_id: Histroy.image?.path
    })
    Histroy.image = { secure_url, public_id }
    req.failImage = { secure_url, public_id }
    // prepare data
    const histroy = new Histroy({
        prediction,
        predictedType,
        confidence,
        scanName,
        image: { secure_url, public_id },
        user
    })
    // add to db
    const createdHistroy = await histroy.save() // {}, null
    if (!createdHistroy) {
        return next(new AppError(messages.histroy.failToCreate, 500))
    }
    // send response
    return res.status(201).json({
        message: messages.histroy.createdSuccessfully,
        success: true,
        data: createdHistroy
    })
}

// get all histroies
export const getAllHistroy = async (req, res, next) => {
    // get histroies
    const getHistories = await Histroy.find()
    // response
    return res.status(200).json({ success: true, data: getHistories })
}

// delete histories
export const deleteHistory = async (req, res, next) => {
    // get data from req
    const { histroyId } = req.params
    // delete history
    const deletedHistory = await Histroy.deleteOne({ _id: histroyId })
    // return response
    return res.status(200).json({ message: messages.histroy.deletedSuccessfully, success: true })
}