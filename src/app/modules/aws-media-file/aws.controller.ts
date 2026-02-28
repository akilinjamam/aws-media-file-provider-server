import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { awsService } from "./aws.service";
import { MulterRequest } from "../../interface/error";
import {
  S3Client,
  ListObjectVersionsCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import config from "../../config";

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

const deleteDirectAwsMediaFileController = catchAsync(async (req, res) => {
  const { key } = req.body;

  if (!key) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "File key is required",
      data: null,
    });
  }

  const splitedKey = key.split(".amazonaws.com/")?.[1];

  const result = await awsService.deleteDirectAwsMedisFileService(
    splitedKey as string,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "file deleted successfully",
    data: result,
  });
});

const updateDirectAwsMediaFileController = catchAsync(async (req, res) => {
  const { key } = req.body.key;
  console.log(key);
  const file = req.file;
  const result = await awsService.updateDirectAwsMediaFileService(
    key,
    file as Express.MulterS3.File,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "file updated successfully",
    data: result,
  });
});

const deleteMultipleAwsFilesController = catchAsync(async (req, res) => {
  const keys: string[] = req.body.keys; // array of keys from frontend

  if (!keys || keys.length === 0) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "No keys provided",
      data: null,
    });
  }

  let allSplitedKeys = [];
  for (const key of keys) {
    allSplitedKeys.push(key.split(".amazonaws.com/")?.[1]);
  }
  console.log(allSplitedKeys);

  const result =
    await awsService.deleteMulipleAwsMediaFileService(allSplitedKeys);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Files deleted successfully",
    data: result,
  });
});

export const awsController = {
  postAwsMediaFileController,
  postDirectAwsMediaFileController,
  deleteDirectAwsMediaFileController,
  updateDirectAwsMediaFileController,
  deleteMultipleAwsFilesController,
};
