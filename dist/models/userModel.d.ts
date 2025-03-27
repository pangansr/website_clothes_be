import mongoose from "mongoose";
declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    totalSales: number;
    role: string;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    location?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    totalSales: number;
    role: string;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    location?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    totalSales: number;
    role: string;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    location?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type UserType = mongoose.InferSchemaType<typeof userSchema>;
declare const _default: mongoose.Model<{
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    totalSales: number;
    role: string;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    location?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    totalSales: number;
    role: string;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    location?: string | null | undefined;
}> & {
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    totalSales: number;
    role: string;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    location?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
