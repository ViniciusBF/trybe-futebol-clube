import * as express from 'express';
import loginRouter from './login.routes';

const routers = express.Router();

routers.use('/login', loginRouter);

export default routers;
