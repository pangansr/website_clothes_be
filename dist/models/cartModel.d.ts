import mongoose, { InferSchemaType } from "mongoose";
export declare const cartSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    productName: string;
    price: number;
    seller: mongoose.Types.ObjectId;
    inCart: number;
    cartOwner: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    productName: string;
    price: number;
    seller: mongoose.Types.ObjectId;
    inCart: number;
    cartOwner: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    productName: string;
    price: number;
    seller: mongoose.Types.ObjectId;
    inCart: number;
    cartOwner: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export type CartType = InferSchemaType<typeof cartSchema>;
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    productName: string;
    price: number;
    seller: mongoose.Types.ObjectId;
    inCart: number;
    cartOwner: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    productName: string;
    price: number;
    seller: mongoose.Types.ObjectId;
    inCart: number;
    cartOwner: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    productName: string;
    price: number;
    seller: mongoose.Types.ObjectId;
    inCart: number;
    cartOwner: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
} & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
