import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: 'sucesso' });
});

app.listen(3000, () => console.log('App escutando na porta 3000!'));
