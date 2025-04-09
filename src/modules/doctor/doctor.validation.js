//import module
import joi from 'joi' 
import { generalFields } from '../../middleware/validation.js'

// add userData
export const addUserData = joi.object({
    dateOfBirth: generalFields.dateOfBirth.required(),
    user: generalFields.objectId.required()

})