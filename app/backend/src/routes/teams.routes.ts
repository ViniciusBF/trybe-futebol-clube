import { Router } from 'express';
import { TeamsController } from '../controllers';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get('/', teamsController.getAll);
teamsRouter.get('/:id', teamsController.getOne);

export default teamsRouter;
