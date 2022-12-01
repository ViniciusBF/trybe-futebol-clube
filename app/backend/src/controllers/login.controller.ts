import { Request, Response } from 'express';
import LoginService from '../services';

export default class LoginController {
  private _service = new LoginService();

  login = async (req: Request, res: Response) => {
    const token = await this._service.login(req.body);

    res.status(200).json({ token });
  };

  validate = async (_req: Request, res: Response) => {
    const { role } = res.locals.user;

    res.status(200).json({ role });
  };
}
