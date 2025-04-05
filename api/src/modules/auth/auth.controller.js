import bcrypt, { hashSync } from 'bcrypt'
import { User } from "../../../db/index.js"
import { AppError } from "../../utilies/appError.js"
import { messages } from "../../utilies/constant/messages.js"
import { generateToken, verifyToken } from '../../utilies/token.js'
import { sendEmail } from '../../utilies/sendEmail.js'
import { status } from '../../utilies/constant/enums.js'

// signup
export const signup = async (req,res,next) => {
    // get data from req
    let { firstName, lastName, phone, email, password } = req.body
    // check existence
    const userExist = await User.findOne({ email })// {}, null
    if(userExist){
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
    if(!createdUser){
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
export const verifyAccount = async (req,res,next) => {
    // get data from req
    const { token } = req.params
    // decoded token
    const payload = verifyToken({ token })
    // update user
    await User.findOneAndUpdate({ email: payload, status: status.PENDING}, { status: status.VERIFIED })
    // send response
    return res.status(200).json({
        message: messages.user.verified,
        success: true
    })
}

// login
export const login = async (req,res,next) => {
    // get data from req
    const { phone, email, password } = req.body
    // check existence
    const userExist = await User.findOne({ $or: [{ email },{phone}], status: status.VERIFIED }) // {}, null
    if(!userExist){
        return next(new AppError(messages.user.invalidCredentials,400))
    }
    // compare password
    const match = bcrypt.compareSync(password, userExist.password)
    if(!match){
        return next(new AppError(messages.user.invalidCredentials, 400))
    }
    // generate token
    const token = generateToken({ payload: {_id: userExist._id, email} })
    // send response
    return res.status(200).json({
        message: 'login successfully',
        success: true,
        token
    })
}