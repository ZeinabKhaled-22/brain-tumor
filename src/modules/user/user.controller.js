// import module
import { messages } from "../../utilies/constant/messages.js"
import bcrypt, { compareSync, hashSync } from "bcrypt"
import { sendEmail } from "../../utilies/sendEmail.js"
import { User } from "../../../db/index.js"
import { AppError } from "../../utilies/appError.js"
import { generateOTP } from "../../utilies/otp.js"


//reset password
export const resetPassword = async (req, res, next) => {
    // get data from req
    const { oldPassword, newPassword, confirmPassword } = req.body
    const userId = req.authUser._id
    // check user existence
    // const userExist = await User.findOne({ email })
    // if(!userExist){
    //     return next(new AppError(messages.user.notFound, 400))
    // }
    // check user password
    const match = bcrypt.compareSync(oldPassword, req.authUser.password)
    // compareSync({password: oldPassword, hashPassword:req.authUser.password })
    //  comparePassword({ password: oldPassword, hashPassword: req.authUser.password})
    if (!match) {
        return next(new AppError(messages.user.invalidCredentials, 401))
    }
    // hash new password
    const hashedPassword = bcrypt.hashSync(newPassword, 8)
    //  hashPassword({password: newPassword})
    // update user
    await User.updateOne({ _id: userId }, { password: hashedPassword })
    // return response
    return res.status(200).json({ message: messages.user.updatedSucessfully, success: true })
}

/**
 * export const hashPassword = ({password = '', saltRound = 8}) => {
 * retrun bycrpt.hashsync(password, saltRound)
 * }
 * export cconst comparePassword = ({password = '', hashPassword = ''}) => {
 * retrun bycrpt.coparesync(password, hashPassword)
 * }
 */

// update account
export const updateAccount = async (req, res, next) => {
    // get data from req
    const { firstName, lastName, phone } = req.body
    const { userId } = req.params
    // check existense
    const userExist = await User.findById(userId) //{}, null
    if (!userExist) {
        return next(new AppError(messages.user.notFound, 404))
    }
    // prepare data
    userExist.firstName = firstName
    userExist.lastName = lastName
    if(!phone){
        userExist.phone
    }
    // userExist.phone = phone
    // save to db
    const updatedAccount = await userExist.save() //{},null
    if (!updatedAccount) {
        return next(new AppError(messages.user.failToUpdate, 500))
    }
    // send respone
    return res.status(200).json({
        message: messages.user.updatedSucessfully,
        success: true,
        data: updatedAccount
    })
}





// delete account
export const deleteAccount = async (req, res, next) => {
    // get data from req
    const { userId } = req.params
    // delete account
    const deletedAccount = await User.deleteOne({ _id: userId })
    // send response
    return res.status(200).json({ message: messages.user.deletedSuccessfully, success: true })
}


