import { S3Client } from "@aws-sdk/client-s3";
import config from "../config";
import multer from "multer";
import multerS3 from "multer-s3";

if (!config.aws_region || !config.aws_access_key_id || !config.aws_access_key) {
  throw new Error("AWS configuration is missing required values.");
}

const s3 = new S3Client({
  region: config.aws_region,
  credentials: {
    accessKeyId: config.aws_access_key_id,
    secretAccessKey: config.aws_access_key,
  },
});

if (!config.s3_bucket_name) {
  throw new Error("S3 bucket name is missing in configuration.");
}

export const directUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.s3_bucket_name,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `${Date.now()}_${file.originalname}`;
      cb(null, fileName);
    },
  }),
});
