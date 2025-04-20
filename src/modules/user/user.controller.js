// import module
import { messages } from "../../utilies/constant/messages.js"
import bcrypt, { compareSync, hashSync } from "bcrypt"
import { sendEmail } from "../../utilies/sendEmail.js"
import { User } from "../../../db/index.js"
import { AppError } from "../../utilies/appError.js"
import { generateOTP } from "../../utilies/otp.js"
import cloudinary from "../../utilies/cloud.js"


//reset password
export const resetPassword = async (req, res, next) => {
    // get data from req
    const { oldPassword, newPassword } = req.body
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


// edit profile
export const editProfile = async (req, res, next) => {
    // get data from req
    const { firstName, about } = req.body
    const { userId } = req.params
    //check user existence
    const userExist = await User.findById(userId) //{}, null
    if (!userExist) {
        return next(new AppError(messages.user.notFound, 404))
    }
    //edit first name
    if (firstName) {
        return userExist.firstName = firstName
    }
    // edit about
    if (about) {
        return userExist.about = about
    }
    // edit image
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            public_id: userExist.image.public_id
        })
        userExist.image = { secure_url, public_id }
        req.failImage = { secure_url, public_id }
    }
    // add to db
    const updatedProfile = await userExist.save() //{}, null
    if (!updatedProfile) {
        return next(new AppError(messages.user.failToUpdate, 500))
    }
    // send response
    return res.status(200).json({
        message: messages.user.updatedSucessfully,
        success: true,
        data: updatedProfile
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


// change email
export const changeEmail = async (req, res, next) => {
    // get data from req
    const { newEmail } = req.body
    const { userId } = req.params
    // check existence
    const userExist = await User.findById(userId) // {}, null
    if (!userExist) {
        return next(new AppError(messages.user.notFound, 404))
    }
    // change email
    userExist.email = newEmail
    // generate otp
    const otp = generateOTP()
    // update user otp
    userExist.otp = otp;
    userExist.expireDateOtp = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    // save to db
    const updatedEmail = await userExist.save() //{}, null
    if (!updatedEmail) {
        return next(new AppError(messages.user.failToUpdate, 500))
    }
    //send email
    await sendEmail({
        to: email,
        subject: "Edit Email",
        html: `<h1>request for edit email your otp is ${otp} </h1>`
    });
    // send response
    return res.status(200).json({ message: 'OTP sent to email', success: true});

}


