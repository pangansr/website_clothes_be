import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    totalSales: {
        type: Number,
        default: 0,
    },
    role: {
        type: String,
        required: true,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
});

export type UserType = mongoose.InferSchemaType<typeof userSchema>;
export default mongoose.model<UserType>("users", userSchema);
