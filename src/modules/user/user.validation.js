// import module
import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

// reset password
export const resetPasswordVal = joi.object({
  confirmPassword: generalFields.confirm_password.required()
})