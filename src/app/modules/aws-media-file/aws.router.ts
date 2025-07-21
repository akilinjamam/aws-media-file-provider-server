import express from "express";
import { awsController } from "./aws.controller";
import { upload } from "../../utils/multerUploader";
import { directUpload } from "../../utils/multerDirectUpload";

const awsRouter = express.Router();

awsRouter.post(
  "/create-media-file",
  upload.array("files", 10),
  awsController.postAwsMediaFileController
);

awsRouter.post(
  "/direct-upload",
  directUpload.array("files", 10),
  awsController.postDirectAwsMediaFileController
);

export default awsRouter;
