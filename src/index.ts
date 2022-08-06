import express from 'express';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import errorHandler from './middlewares/error-handle.middleware';
import { authorizationRoute } from './routes/authorization.routes';
import { statusRoute } from './routes/status.routes';
import { usersRoutes } from './routes/users.routes';

const app = express();

// configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configurações das rotas
app.use(statusRoute);
app.use(authorizationRoute);
app.use(usersRoutes);

// Configuração dos Handlers de Erro
app.use(errorHandler);

// Inicialização do servidor
app.listen(3000, () => console.log('App escutando na porta 3000!'));
