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
    const { email, oldPassword, newPassword } = req.body
    const userId = req.authUser._id
    // check user existence
    const userExist = await User.findOne({ email })
    if(!userExist){
        return next(new AppError(messages.user.notFound, 400))
    }
    // check user password
    const match = bcrypt.compareSync(oldPassword,req.authUser.password )
    // compareSync({password: oldPassword, hashPassword:req.authUser.password })
    //  comparePassword({ password: oldPassword, hashPassword: req.authUser.password})
    if(!match){
        return next(new AppError(messages.user.invalidCredentials, 401))
    }
    // hash new password
    const hashedPassword = bcrypt.hashSync(newPassword, 8)
    //  hashPassword({password: newPassword})
    // update user
    await User.updateOne({_id: userId}, {password: hashedPassword})
    // return response
    return res.status(200).json({message: messages.user.updatedSucessfully, success: true})   
}

/**
 * export const hashPassword = ({password = '', saltRound = 8}) => {
 * retrun bycrpt.hashsync(password, saltRound)
 * }
 * export cconst comparePassword = ({password = '', hashPassword = ''}) => {
 * retrun bycrpt.coparesync(password, hashPassword)
 * }
 */



