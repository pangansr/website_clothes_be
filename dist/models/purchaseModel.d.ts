import mongoose, { InferSchemaType } from "mongoose";
declare const purchaseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    totalSpent: number;
    purchaseOwner: mongoose.Types.ObjectId;
    totalQuantity: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    totalSpent: number;
    purchaseOwner: mongoose.Types.ObjectId;
    totalQuantity: number;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    totalSpent: number;
    purchaseOwner: mongoose.Types.ObjectId;
    totalQuantity: number;
}> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export type purchaseSchemaType = InferSchemaType<typeof purchaseSchema>;
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    totalSpent: number;
    purchaseOwner: mongoose.Types.ObjectId;
    totalQuantity: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    totalSpent: number;
    purchaseOwner: mongoose.Types.ObjectId;
    totalQuantity: number;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
    totalSpent: number;
    purchaseOwner: mongoose.Types.ObjectId;
    totalQuantity: number;
} & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
