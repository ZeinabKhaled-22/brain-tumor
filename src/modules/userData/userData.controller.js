import { User, UserData } from "../../../db/index.js"
import { AppError } from "../../utilies/appError.js"
import { messages } from "../../utilies/constant/messages.js"

// add userDara
export const addUserData = async (req, res, next) => {
    // get data from req
    const { role,
        gender,
        dateOfBirth,
        bodyMeasurement,
        healthCondition,
        user } = req.body
    // check user existence
    const userExist = await User.findById(user)// null, {}
    if (!userExist) {
        return next(new AppError(messages.user.notFound, 404))
    }
    // prepare data 
    const userData = new UserData({
        role,
        gender,
        dateOfBirth,
        bodyMeasurement,
        healthCondition,
        user
    })
    // save db
    const createdUserData = await userData.save() //{}, null
    if (!createdUserData) {
        return next(new AppError(messages.userData.failToCreate, 500))
    }
    // send response
    return res.status(201).json({ message: messages.userData.createdSuccessfully, success: true })

}