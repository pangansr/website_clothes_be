import { NextFunction, Request, Response } from "express";

const roleChecker = (rolesAllowed: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user.role;

        if (rolesAllowed.includes(userRole)) {
            next();
        } else {
            res.status(401);
            throw new Error("Action not allowed, Unauthorized role!");
        }
    };
};

export default roleChecker;
