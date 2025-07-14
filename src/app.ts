import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/glabalErrorHander";
import notFoundRoute from "./app/middleware/notFoundRoute";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to aws micro server for media file provider");
});

app.use("/api/v1/", router);

// not found route
app.use(notFoundRoute);

// global error handler..
app.use(globalErrorHandler);
export default app;
