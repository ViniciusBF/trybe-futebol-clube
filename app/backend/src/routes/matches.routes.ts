import { Router } from 'express';
import { MatchesController } from '../controllers';
import authValidate from '../middlewares/auth.middleware';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.post('/', authValidate, matchesController.insert);
matchesRouter.patch('/:id/finish', matchesController.updateProgress);
matchesRouter.patch('/:id', matchesController.updateGoals);

export default matchesRouter;
