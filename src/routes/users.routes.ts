import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import usersRepository from '../repositories/usersRepository';

export const usersRoutes = Router();

const users = [{ username: 'foo' }, { username: 'bar' }];

usersRoutes.get(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await usersRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
  }
);

usersRoutes.get(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await usersRepository.findById(id);

    res.status(StatusCodes.OK).send(user);
  }
);

usersRoutes.post(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    const id = await usersRepository.create(newUser);

    res.status(StatusCodes.CREATED).send(id);
  }
);

usersRoutes.put(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const modifiedUser = req.body;

    modifiedUser.id = id;

    await usersRepository.update(modifiedUser);

    res.status(StatusCodes.OK).send();
  }
);

usersRoutes.delete(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;

    await usersRepository.removeById(id);

    res.sendStatus(StatusCodes.OK);
  }
);
