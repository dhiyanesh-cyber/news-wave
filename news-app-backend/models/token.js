import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref:'users',
        unique: true
    },
    token: { type: String, required: true},
    createdAt:{type: Date, default : Date.now(), expires: 3600}
})


export const Token = mongoose.model("token", tokenSchema);