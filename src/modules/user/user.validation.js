// import module
import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

// reset password
export const resetPasswordVal = joi.object({
  confirmPassword: generalFields.confirmPassword.required()
})

// edit profile
export const editProfileVal = joi.object({
  firstName: generalFields.firstName,
  about: generalFields.about
})

// change email
export const changeEmailVal = joi.object({
  email: generalFields.email.required()
})

// change phone
export const changePhoneVal = joi.object({
 body: joi.object({
  oldPhone:generalFields.phone.required(),
  newPhone: generalFields.phone.required()
 }),
 params: joi.object({
  userId: joi.string().hex().length(24).required()
 })
})