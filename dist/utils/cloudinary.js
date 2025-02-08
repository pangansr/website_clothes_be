"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImg = exports.uploadImg = exports.getImg = void 0;
const cloudinary_1 = require("cloudinary");
const getImg = async (publicId) => {
    try {
        const result = await cloudinary_1.v2.api.resource(publicId);
        return result;
    }
    catch (error) {
        throw new Error("Img not Found");
    }
};
exports.getImg = getImg;
const uploadImg = async ({ path, originalname, }) => {
    return await cloudinary_1.v2.uploader.upload(path, { public_id: originalname }, function (error, result) {
        if (error)
            throw new Error("Img Upload Failed");
        return result;
    });
};
exports.uploadImg = uploadImg;
const deleteImg = async (publicId) => {
    try {
        return await cloudinary_1.v2.api.delete_resources([publicId], {
            type: "upload",
            resource_type: "image",
        });
    }
    catch (error) {
        throw new Error("Delete img failed");
    }
};
exports.deleteImg = deleteImg;
//# sourceMappingURL=cloudinary.js.map