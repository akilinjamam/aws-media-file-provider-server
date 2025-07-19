import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/glabalErrorHander";
import notFoundRoute from "./app/middleware/notFoundRoute";
import router from "./app/routes";
import { quotes } from "./app/quotes";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
    methods: "POST",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  const rendomIndex = Math.floor(Math.random() * quotes.length);
  const randorQuote = quotes[rendomIndex];
  res.send(`
    welcome to aws micro server for media file provider !!! <br>
    -------------------------------------------------------------------
    <p style="color: green">${randorQuote.quote}<p/>
    <p style="color: orangered">Author: << ${randorQuote.author} >><p/>
    `);
});

app.use("/api/v1/", router);

// not found route
app.use(notFoundRoute);

// global error handler..
app.use(globalErrorHandler);
export default app;
