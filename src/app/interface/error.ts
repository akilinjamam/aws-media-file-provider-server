import { Request } from "express";

export type TerrorSource = {
  path: string | number;
  message: string;
}[];

export type TgenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: TerrorSource;
};

export interface MulterRequest extends Request {
  files: Express.Multer.File[];
  originalname: string;
  mimetype: string;
}
