import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.model';
import ForbiddenError from '../models/errors/forbidden.error.model';

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  if (error instanceof DatabaseError) {
    return res.status(StatusCodes.BAD_REQUEST).send(error.message);
  } else if (error instanceof ForbiddenError) {
    return res.status(StatusCodes.FORBIDDEN).send(error.message);
  } else {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default errorHandler;
