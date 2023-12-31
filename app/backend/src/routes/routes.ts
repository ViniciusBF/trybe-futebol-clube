import * as express from 'express';
import loginRouter from './login.routes';
import teamsRouter from './teams.routes';
import matchesRouter from './matches.routes';
import leaderboardRouter from './leaderboard.routes';

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);
routers.use('/matches', matchesRouter);
routers.use('/leaderboard', leaderboardRouter);

export default routers;
