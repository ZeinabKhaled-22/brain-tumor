import bcrypt, { hashSync } from 'bcrypt'
import { User } from "../../../db/index.js"
import { AppError } from "../../utilies/appError.js"
import { messages } from "../../utilies/constant/messages.js"
import { generateToken, verifyToken } from '../../utilies/token.js'
import { sendEmail } from '../../utilies/sendEmail.js'
import { status } from '../../utilies/constant/enums.js'
import { generateOTP } from '../../utilies/otp.js'

// signup
export const signup = async (req, res, next) => {
    // get data from req
    let { firstName, lastName, phone, email, password } = req.body
    // check existence
    const userExist = await User.findOne({ email })// {}, null
    if (userExist) {
        return next(new AppError(messages.user.alreadyExist, 409))
    }
    // hash password
    password = hashSync(password, 8)
    // prapare data
    const user = new User({
        firstName,
        lastName,
        phone,
        email,
        password
    })
    // save in db
    const createdUser = await user.save() //{}, null
    if (!createdUser) {
        return next(new AppError(messages.user.failToCreate, 500))
    }
    // generate token
    const token = generateToken({ payload: email, _id: createdUser._id })
    // send email
    await sendEmail({
        to: email,
        subject: 'verify your account',
        html: `<p>click here to verify account <a href="${req.protocol}://${req.headers.host}/auth/verify/${token}">link</a></p>`
    })
    // send response
    return res.status(201).json({
        message: messages.user.createdSuccessfully,
        success: true,
        data: createdUser
    })
}

// verify token
export const verifyAccount = async (req, res, next) => {
    // get data from req
    const { token } = req.params
    // decoded token
    const payload = verifyToken({ token })
    // update user
    await User.findOneAndUpdate({ email: payload, status: status.PENDING }, { status: status.VERIFIED })
    // send response
    return res.status(200).json({
        message: messages.user.verified,
        success: true
    })
}

// login
export const login = async (req, res, next) => {
    // get data from req
    const { phone, email, password } = req.body
    // check existence
    const userExist = await User.findOne({ $or: [{ email }, { phone }], status: status.VERIFIED }) // {}, null
    if (!userExist) {
        return next(new AppError(messages.user.invalidCredentials, 400))
    }
    // compare password
    const match = bcrypt.compareSync(password, userExist.password)
    if (!match) {
        return next(new AppError(messages.user.invalidCredentials, 400))
    }
    // generate token
    const token = generateToken({ payload: { _id: userExist._id, email } })
    // send response
    return res.status(200).json({
        message: 'login successfully',
        success: true,
        token
    })
}

//forget password
export const forgetPassword = async (req, res, next) => {
    //get data from req
    const { email } = req.body
    // check user existence
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError(messages.user.notFound, 404))
    }
    //if already has email
    if (user.otp && user.expireDateOtp > Date.now()) {
        return next(new AppError('user already has otp', 400))
    }
    //generate otp
    const otp = generateOTP()
    // update user otp
    user.otp = otp;
    user.expireDateOtp = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    // save to db
    await user.save();
    //send email
    await sendEmail({ to: email, subject: "forget password", html: `<h1>u request forget password your otp is ${otp} </h1>` });
    // send response
    return res.status(200).json({ message: 'OTP sent to email' });
}

// change password
export const changePassword = async (req, res, next) => {
    // get data from req
    const { otp, newPassword, confirmPassword } = req.body
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
    //  // compare password
    //  const match = bcrypt.compareSync(newPassword, req.authUser.password)
    //  if(!match){
    //      return next(new AppError(messages.user.invalidCredentials, 400))
    //  }
    // user.password=hashedPassword
    // user.otp=undefined
    // user.expireDateOtp=undefined
    // save db
    await user.save()
    // update password
    await User.updateOne({ _id: user._id }, { password: hashedPassword, $unset: { otp: "", expireDateOtp: "" } })
    // send response 
    return res.status(200).json({ message: "password updated successfully", success: true })
}
