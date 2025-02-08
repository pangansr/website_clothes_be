import { UserType } from "../models/userModel";

type User = {
    _id: string;
} & UserType;

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export {};
