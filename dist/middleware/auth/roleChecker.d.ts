import { NextFunction, Request, Response } from "express";
declare const roleChecker: (rolesAllowed: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export default roleChecker;
