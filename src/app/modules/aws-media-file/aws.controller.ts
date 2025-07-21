import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { awsService } from "./aws.service";
import { MulterRequest } from "../../interface/error";
import { AppError } from "../../errors/AppError";

const postAwsMediaFileController = catchAsync(async (req, res) => {
  const files = req.files as MulterRequest[] | undefined;

  if (!files) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "No files were uploaded.",
      data: null,
    });
  }

  const result = await awsService.postAwsMediaFileService(files);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "data url found successfully",
    data: result,
  });
});
const postDirectAwsMediaFileController = catchAsync(async (req, res) => {
  const files = req.files as Express.MulterS3.File[] | undefined;

  if (!files) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "No files were uploaded.",
      data: null,
    });
  }

  const result = await awsService.postDirectAwsMediaFileService(files);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "data url found successfully",
    data: result,
  });
});

export const awsController = {
  postAwsMediaFileController,
  postDirectAwsMediaFileController,
};
