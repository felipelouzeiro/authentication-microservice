import { User } from '../models/useModel';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
