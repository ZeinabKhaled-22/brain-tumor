// import module
import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

// validation of signup
export const signupVal = joi.object({
  firstName: generalFields.firstName.required(),
  lastName: generalFields.lastName.required(),
  phone: generalFields.phone.required(),
  email: generalFields.email.required(),
  password: generalFields.password.required(),
  confirmPassword: generalFields.confirmPassword.required(),
});

// validation of login
export const loginVal = joi.object({
  phone: generalFields.phone.when("email", {
    is: joi.exist(), // email exist
    then: joi.optional(), // phone optional
    otherwise: joi.required(), // phone required
  }),
  email: generalFields.email,
  password: generalFields.password.required(),
});


//forget password
export const forgetpassVal = joi.object({
    // otp:generalFields.string
    email: generalFields.email,
})

// change password
export const changePasswordVal = joi.object({
  email: generalFields.email.required(),
  otp: generalFields.otp.required(),
  newPassword: generalFields.password.required(),
  confirmPassword: generalFields.cPassword.required()
})
