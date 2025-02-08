import mongoose from "mongoose";
declare const productSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    sold: number;
    seller: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    sold: number;
    seller: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    sold: number;
    seller: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type productType = mongoose.InferSchemaType<typeof productSchema>;
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    sold: number;
    seller: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    sold: number;
    seller: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    sold: number;
    seller: mongoose.Types.ObjectId;
    productImg?: {
        id: string;
        url: string;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
