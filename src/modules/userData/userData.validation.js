// import module
import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'


// add userData
export const addUserDataVal = joi.object({
    role: generalFields.role.required(),
        gender: generalFields.gender.required(),
        dateOfBirth: generalFields.dateOfBirth.required(),
        bodyMeasurement: generalFields.bodyMeasurement.required(),
        height: generalFields.height.required(),
        width: generalFields.width.required(),
        healthCondition: generalFields.healthCondition.required(),
        user: generalFields.objectId.required(),
        country: generalFields.country.required()
})