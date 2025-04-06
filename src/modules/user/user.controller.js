// import module
import { messages } from "../../utilies/constant/messages.js"
import bcrypt from "bcrypt"
import { sendEmail } from "../../utilies/sendEmail.js"
import { User } from "../../../db/index.js"
import { AppError } from "../../utilies/appError.js"
import { generateOTP } from "../../utilies/otp.js"


//forget password
export const forgetPassword = async (req, res, next) => {
    //get data from req
    const { email } = req.body
    // check user existence
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError(messages.user.notFound, 404))
        //if already has email
        if (user.otp && user.expireDateOtp > Date.now()) {
            return next(new AppError('user already has otp', 400))
        }
    }
    //generate otp
    const otp = generateOTP()
    user.otp = otp;
    user.expireDateOtp = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    await user.save();
    //send email
    await sendEmail({ to: email, subject: "forget password", html: `<h1>u request forget password your otp is ${otp} </h1>` });
    // send response
    return res.status(200).json({ message: 'OTP sent to email' });
}


//reset password
export const resetPassword = async (req, res, next) => {
    // get data from req
    const { otp, newPassword } = req.body
    //check email
    //const user=await User.findOne({email})
    // Find user by OTP
    const user = await User.findOne({ otp });
    if (!user) {
        return next(new AppError(messages.user.notfound, 404))
    }
    if (user.otp != otp) {
        return next(new AppError('invalid otp', 401))
    }
    if (user.expireDateOtp < Date.now()) {
        const secondOtp = generateOTP()
        user.otp = secondOtp
        user.expireDateOtp = Date.now() + 5 * 60 * 1000
        await user.save()
        await sendEmail({ to: user.email, subject: 'resent otp', html: `<h1> your otp is ${secondOtp}</h1>` })
        return res.status(200).json({ message: "check your email", success: true })
    }
    ///hash new pass
    const hashedPassword = bcrypt.hashSync(newPassword, 8)
    //user.password=hashedPassword
    //user.otp=undefined
    // user.expireDateOtp=undefined
    // save db
    await user.save()
    // update password
    await User.updateOne({ _id: user._id }, { password: hashedPassword, $unset: { otp: "", expireDateOtp: "" } })
    // send response 
    return res.status(200).json({ message: "pass updated successfully", success: true })
}