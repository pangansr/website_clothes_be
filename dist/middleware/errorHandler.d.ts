import { Request, Response } from "express";
declare const errorHandler: (error: Error, req: Request, res: Response) => void;
export default errorHandler;
