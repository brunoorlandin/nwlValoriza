import express, { Request, Response, NextFunction, response } from "express";
import "express-async-errors";

import "reflect-metadata";

import { router } from "./routes";

import "./database";

import { ErrorHandler } from "./classes/ErrorHandler"

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof ErrorHandler) {

      const { name, statusCode, message, description } = err
      return response.status(statusCode).json({ name, message, description });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
