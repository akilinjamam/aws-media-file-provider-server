import express from "express";
import { awsController } from "./aws.controller";
import { upload } from "../../utils/multerUploader";
import { directUploadv2 } from "../../utils/multerDirectUploadv2";

const awsRouter = express.Router();

awsRouter.post(
  "/create-media-file",
  upload.array("files", 10),
  awsController.postAwsMediaFileController,
);

awsRouter.post(
  "/direct-upload",
  directUploadv2.array("files", 10),
  awsController.postDirectAwsMediaFileController,
);

awsRouter.delete(
  "/delete-media-file",
  awsController.deleteDirectAwsMediaFileController,
);
awsRouter.delete(
  "/delete-multiple-media-files",
  awsController.deleteMultipleAwsFilesController,
);

awsRouter.put(
  "/update-media-file",
  directUploadv2.single("file"),
  async (req, res, next) => {
    const key = await JSON.parse(req.body.key);
    req.body.key = key;
    next();
  },
  awsController.updateDirectAwsMediaFileController,
);

export default awsRouter;
