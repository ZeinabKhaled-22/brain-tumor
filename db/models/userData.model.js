import { model, Schema } from "mongoose";
import { gender, healthCondition, roles } from "../../src/utilies/constant/enums.js";

// schema
const userDataSchema = new Schema({
    role: {
        type: String,
        enum: Object.values(roles)
    },
    gender: {
        type: String,
        enum: Object.values(gender)
    },
    dateOfBirth: Date,
    bodyMeasurement: Number,
    healthCondition: {
        type: String,
        enum: Object.values(healthCondition)
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    country: String

})
// model
export const UserData = model('UserData', userDataSchema)