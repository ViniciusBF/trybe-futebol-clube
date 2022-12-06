import * as express from 'express';
import loginRouter from './login.routes';
import teamsRouter from './teams.routes';
import matchesRouter from './matches.routes';

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);
routers.use('/matches', matchesRouter);

export default routers;
