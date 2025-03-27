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
    productImg: mongoose.Types.DocumentArray<{
        id: string;
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        url: string;
    }> & {
        id: string;
        url: string;
    }>;
    sold: number;
    seller?: mongoose.Types.ObjectId | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    productImg: mongoose.Types.DocumentArray<{
        id: string;
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        url: string;
    }> & {
        id: string;
        url: string;
    }>;
    sold: number;
    seller?: mongoose.Types.ObjectId | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    productImg: mongoose.Types.DocumentArray<{
        id: string;
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        url: string;
    }> & {
        id: string;
        url: string;
    }>;
    sold: number;
    seller?: mongoose.Types.ObjectId | null | undefined;
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
    productImg: mongoose.Types.DocumentArray<{
        id: string;
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        url: string;
    }> & {
        id: string;
        url: string;
    }>;
    sold: number;
    seller?: mongoose.Types.ObjectId | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    productImg: mongoose.Types.DocumentArray<{
        id: string;
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        url: string;
    }> & {
        id: string;
        url: string;
    }>;
    sold: number;
    seller?: mongoose.Types.ObjectId | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    productName: string;
    category: string;
    price: number;
    stocks: number;
    productImg: mongoose.Types.DocumentArray<{
        id: string;
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        url: string;
    }> & {
        id: string;
        url: string;
    }>;
    sold: number;
    seller?: mongoose.Types.ObjectId | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
