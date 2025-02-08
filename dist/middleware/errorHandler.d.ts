import { NextFunction, Request, Response } from "express";
declare const errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => void;
export default errorHandler;
