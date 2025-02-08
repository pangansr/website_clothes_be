import { UploadApiResponse, ResourceApiResponse } from "cloudinary";
export declare const getImg: (publicId: string) => Promise<ResourceApiResponse>;
export declare const uploadImg: ({ path, originalname, }: {
    path: string;
    originalname: string;
}) => Promise<UploadApiResponse>;
export declare const deleteImg: (publicId: string) => Promise<any>;
