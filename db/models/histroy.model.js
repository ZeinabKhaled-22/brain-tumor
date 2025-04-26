import { model, Schema, Types } from "mongoose";

// schema
const histroySchema = new Schema({
    image: {
        type: Object
    },
    prediction: {
        type: String,
        required: true,
        trim: true
    },
    predictedType: {
        type: String,
        required: true,
        trim: true
    },
    confidence: {
        type: Number,
        required: true
    },
    date: Date,
    scanName: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
 { timestamps: true }
)
// model
export const Histroy = model("Histroy", histroySchema)