import { model, Schema } from "mongoose";

// schema
const doctorSchema = new Schema([{
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    order: {
        type: String,
        required: true,
        trim: true
    },
    rate: Number,
    informationOfDoctor: {
        type: String,
        required: true,
        trim: true
    },
    location:[{
        type: String,
        required: true,
        trim: true
    }]
}])
// model
export const Doctor = model('Doctor', doctorSchema)