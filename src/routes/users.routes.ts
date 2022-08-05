import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const routes = Router();

const users = [{ username: 'foo' }, { username: 'bar' }];

routes.get('/users', (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).send(users);
});

routes.get(
  '/users/:id',
  (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;

    res.status(StatusCodes.OK).send(id);
  }
);

routes.post('/users', (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  res.status(StatusCodes.CREATED).send(newUser);
});

routes.put(
  '/users/:id',
  (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const modifiedUser = req.body;
    modifiedUser.id = id;

    res.status(StatusCodes.OK).send(modifiedUser);
  }
);

routes.delete(
  '/users/:id',
  (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;

    res.sendStatus(StatusCodes.OK);
  }
);
