import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const statusRoute = Router();

statusRoute.get(
  '/status',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({ message: 'Em funcionamento!' });
  }
);
