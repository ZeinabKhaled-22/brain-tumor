import { model, Schema } from "mongoose";
import { gender, healthCondition, roles } from "../../src/utilies/constant/enums.js";

// schema
const userDataSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: Object.values(roles)
    },
    gender: {
        type: String,
        required: true,
        enum: Object.values(gender)
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    bodyMeasurement: {
        type: Number,
        required: true

    },
    healthCondition: {
        type: String,
        required: true,
        enum: Object.values(healthCondition)
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }


})
// model
export const UserData = model('UserData', userDataSchema)