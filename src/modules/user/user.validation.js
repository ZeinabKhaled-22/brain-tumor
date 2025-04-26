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
  about: generalFields.about,
  userId: generalFields.objectId.required()
})

// change email
export const changeEmailVal = joi.object({
  email: generalFields.email.required()
})

// change phone
export const changePhoneVal = joi.object({
  oldPhone: generalFields.phone.required(),
  newPhone: generalFields.phone.required(),
  userId: generalFields.objectId.required()
})