import { MulterRequest } from "../../interface/error";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

type AwsMediaFileService = (files: MulterRequest[]) => any;
type AwsMediaFileServiceAlter = (files: Express.MulterS3.File[]) => any;

const postAwsMediaFileService: AwsMediaFileService = async (files) => {
  console.log(files);
  const fileType = files?.map((type) => type.mimetype);
  if (
    !config.aws_region ||
    !config.aws_access_key_id ||
    !config.aws_access_key
  ) {
    throw new Error("AWS configuration is missing required values.");
  }
  const s3 = new S3Client({
    region: config.aws_region,
    credentials: {
      accessKeyId: config.aws_access_key_id,
      secretAccessKey: config.aws_access_key,
    },
  });

  try {
    console.log(
      config.aws_region,
      config.aws_access_key,
      config.aws_access_key_id,
      config.s3_bucket_name
    );
    const fileUrls = [];

    for (const file of files) {
      const fileStream = fs.createReadStream(file.path);
      const params = {
        Bucket: config.s3_bucket_name,
        Key: `${Date.now()}_${file.originalname}`,
        Body: fileStream,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      const url = `https://${config.s3_bucket_name}.s3.${config.aws_region}.amazonaws.com/${params.Key}`;

      fileUrls.push(url);

      fs.unlinkSync(file.path);
    }

    return {
      url: fileUrls,
      fileType,
    };
  } catch (error) {
    // Delete local uploaded files on error
    for (const file of files) {
      try {
        fs.existsSync(file.path) && fs.unlinkSync(file.path);
      } catch (err) {
        console.error("Failed to delete file during error cleanup:", err);
      }
    }

    throw new AppError(
      StatusCodes.BAD_REQUEST,
      error instanceof Error ? error.message : String(error)
    );
  }
};
const postDirectAwsMediaFileService: AwsMediaFileServiceAlter = async (
  files
) => {
  const urls = files.map((file) => file.location);
  const fileTypes = files.map((file) => file.mimetype);

  return {
    url: urls,
    fileType: fileTypes,
  };
};

export const awsService = {
  postAwsMediaFileService,
  postDirectAwsMediaFileService,
};
