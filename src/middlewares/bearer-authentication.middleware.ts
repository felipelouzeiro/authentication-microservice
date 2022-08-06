import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import usersRepository from '../repositories/usersRepository';
import JWT from 'jsonwebtoken';
import { environment } from '../environments';

async function bearerAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas');
    }

    const [authenticationType, token] = authorizationHeader.split(' ');
    if (authenticationType !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido');
    }

    const tokenPayload = await JWT.verify(token, environment.JWT_KEY);
    console.log('CONSSSOLLE');

    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Token inválido');
    }

    const uuid = tokenPayload.sub;

    const user = await usersRepository.findById(uuid);

    if (!user) {
      throw new ForbiddenError('Usuário ou senha inválidos');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export default bearerAuthenticationMiddleware;
