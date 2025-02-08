import mongoose, { InferSchemaType } from "mongoose";

const purchaseSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        totalSpent: {
            type: Number,
            required: true,
        },
        purchaseOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        totalQuantity: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export type purchaseSchemaType = InferSchemaType<typeof purchaseSchema>;

export default mongoose.model<purchaseSchemaType>("Purchase", purchaseSchema);
