// import module
import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'


// add histroy val
export const addHistroyVal = joi.object({
    prediction: generalFields.prediction.required(),
    predictedType: generalFields.predictedType.required(), 
    confidence: generalFields.confidence.required(),
    date: generalFields.date.required() ,
    scanName: generalFields.scanName.required(),
    user: generalFields.objectId.required()
})

