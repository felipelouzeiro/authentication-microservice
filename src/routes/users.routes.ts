import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import usersRepository from '../repositories/usersRepository';

export const usersRoutes = Router();

const users = [{ username: 'foo' }, { username: 'bar' }];

usersRoutes.get(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersRepository.findAllUsers();
      res.status(StatusCodes.OK).send(users);
    } catch (error) {
      next(error);
    }
  }
);

usersRoutes.get(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await usersRepository.findById(id);
      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);
    }
  }
);

usersRoutes.post(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = req.body;

      const id = await usersRepository.create(newUser);

      res.status(StatusCodes.CREATED).send(id);
    } catch (error) {
      next(error);
    }
  }
);

usersRoutes.put(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const modifiedUser = req.body;

      modifiedUser.id = id;

      await usersRepository.update(modifiedUser);

      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  }
);

usersRoutes.delete(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      await usersRepository.removeById(id);

      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
);
