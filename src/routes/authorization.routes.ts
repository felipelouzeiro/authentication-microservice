import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthorizationMiddleware from '../middlewares/basic-authentication.middleware';
import { environment } from '../environments';
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication.middleware';

export const authorizationRoute = Router();

authorizationRoute.post(
  '/token/validate',
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);

authorizationRoute.post(
  '/token',
  basicAuthorizationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ForbiddenError('Usuário não informado');
      }

      const jwtPayload = { username: user.username };
      const jwtOptions = { subject: user?.uuid };

      const jwt = JWT.sign(jwtPayload, environment.JWT_KEY, jwtOptions);

      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);
