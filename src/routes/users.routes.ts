import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const usersRoutes = Router();

const users = [{ username: 'foo' }, { username: 'bar' }];

usersRoutes.get('/users', (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).send(users);
});

usersRoutes.get(
  '/users/:id',
  (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;

    res.status(StatusCodes.OK).send(id);
  }
);

usersRoutes.post(
  '/users',
  (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    res.status(StatusCodes.CREATED).send(newUser);
  }
);

usersRoutes.put(
  '/users/:id',
  (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const modifiedUser = req.body;
    modifiedUser.id = id;

    res.status(StatusCodes.OK).send(modifiedUser);
  }
);

usersRoutes.delete(
  '/users/:id',
  (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;

    res.sendStatus(StatusCodes.OK);
  }
);
