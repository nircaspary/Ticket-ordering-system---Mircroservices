import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    const errors = err.serializeErrors();
    return res.status(err.statusCode).send({ errors });
  }
  console.error(err);
  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
};
