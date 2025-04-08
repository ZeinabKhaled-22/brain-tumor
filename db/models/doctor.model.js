import { model, Schema } from "mongoose";

// schema 
const doctorSchema = new Schema({})
// model
export const Doctor = model('Doctor', doctorSchema)