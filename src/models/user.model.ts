import {model, Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
    {

     
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },

   email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
   },
{
    timestamps: true
}
);

export type User = InferSchemaType<typeof userSchema>;
const UserModel = model("User", userSchema);
export default UserModel;