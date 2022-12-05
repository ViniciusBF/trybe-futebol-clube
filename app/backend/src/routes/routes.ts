import * as express from 'express';
import loginRouter from './login.routes';
import teamsRouter from './teams.routes';

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);

export default routers;
