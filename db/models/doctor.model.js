import { model, Schema } from "mongoose";

// schema 
const doctorSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    bookingInfo: {
        info:{
            type: String,
        required: true,
        trim: true
        }
    }

})
// model
export const Doctor = model('Doctor', doctorSchema)