// import node modules
import { Request, Response } from 'express';
import { ValidationError } from 'express-validation';

export const validationErrorHandler = (err, req: Request, res: Response, next: Function) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json(err.details.body[0].message);
    return;
  }

  res.status(500).json(err);
}