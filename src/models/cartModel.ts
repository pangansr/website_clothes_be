import mongoose, { InferSchemaType } from "mongoose";

export const cartSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productImg: {
            url: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        inCart: {
            type: Number,
            required: true,
        },
        cartOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export type CartType = InferSchemaType<typeof cartSchema>;

export default mongoose.model<CartType>("Cart", cartSchema);
