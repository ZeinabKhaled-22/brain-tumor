// import module
import joi from "joi";
import { model, Schema } from "mongoose";
import { roles, status } from "../../src/utilies/constant/enums.js";


// schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type:String,
        enum:Object.values(roles),
        default:roles.PATIENT
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(status),
      default: status.PENDING

    },
  },
  { timestamps: true }
);
// model
export const User = model("User", userSchema);
