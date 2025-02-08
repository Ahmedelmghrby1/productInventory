process.on("uncaughtException", (err) => {
  console.log({ error: err });
});

import express from "express";
import { AppError } from "./src/utils/appError.js";
import { db } from "./Database/dbConnection.js";
import { globalError } from "./src/Middlewares/globalError.js";
import { bootstrab } from "./src/Modules/bootstrab.js";
import dotenv from "dotenv"
dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
bootstrab(app)


app.use("*", (req, res, next) => {
  next(new AppError(`Route not found ${req.originalUrl}`, 404));
});
app.use(globalError);
process.on("unhandledRejection", (err) => {
  console.log({ error: err });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
