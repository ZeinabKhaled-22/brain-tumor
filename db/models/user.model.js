// import module
import { model, Schema } from "mongoose";
import { status } from "../../src/utilies/constant/enums.js";


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
    otp:Number,
    expireDateOtp:Date,
    image:{
      type: Object
    },
    about: String,
  },
  { timestamps: true }
);
// model
export const User = model("User", userSchema);
