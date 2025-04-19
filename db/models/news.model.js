import { model, Schema } from "mongoose";

// schema 
const newsSchema = new Schema({})
// model
export const News = model('News', newsSchema)