import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/', leaderboardController.getAll);
leaderboardRouter.get('/home', leaderboardController.getAllHome);
leaderboardRouter.get('/away', leaderboardController.getAllAway);

export default leaderboardRouter;
