import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundRoute = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: "Not Found",
  });
};

export default notFoundRoute;
