import { Router } from 'express';
import LoginController from '../controllers';
import authValidate from '../middlewares/auth.middleware';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', loginController.login);
loginRouter.get('/validate', authValidate, loginController.validate);

export default loginRouter;
