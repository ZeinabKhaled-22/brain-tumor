// import module
import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

//forget password
export const forgetpassVal = joi.object({
    // otp:generalFields.string
    email: generalFields.email,
})