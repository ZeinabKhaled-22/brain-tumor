import joi from "joi";
import { AppError } from "../utilies/appError.js";


// general feilds
export const generalFields = {
  firstName: joi.string(),
  lastName: joi.string(),
  phone: joi.string(),
  email: joi.string().email(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_]).{8,}$/
      )
    ),
  confirmPassword: joi.string().valid(joi.ref("password")),
  dateOfBirth: joi.date(),
  objectId: joi.string().hex().length(24),
  role: joi.string(),
  gender: joi.string(),
  dateOfBirth: joi.date(),
  bodyMeasurement: joi.number(),
  height: joi.number(),
  width: joi.number(),
  healthCondition: joi.string(),
  country: joi.string(),
  otp: joi.string(),
  newPassword: joi
    .string()
    .pattern(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_]).{8,}$/
      )
    ),
  cPassword: joi.string().valid(joi.ref("newPassword")),
  about: joi.string(),
  prediction: joi.string(),
  predictedType: joi.string(),
  confidence: joi.number(),
  date: joi.date(),
  scanName: joi.string(),
  idToken: joi.string()

};

// validation
export const isValid = (schema) => {
  return (req, res, next) => {
    let data = { ...req.body, ...req.params, ...req.query };
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      let errArr = [];
      error.details.forEach((err) => {
        errArr.push(err.message);
      });
      return next(new AppError(errArr, 400));
    }
    next();
  };
};
