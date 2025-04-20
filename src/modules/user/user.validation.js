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
  email: generalFields.newEmail.required()
})