import express from 'express';
import { statusRoute } from './routes/status.routes';
import { usersRoutes } from './routes/users.routes';

const app = express();

// configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configurações das rotas
app.use(usersRoutes);
app.use(statusRoute);

// Inicialização do servidor
app.listen(3000, () => console.log('App escutando na porta 3000!'));
