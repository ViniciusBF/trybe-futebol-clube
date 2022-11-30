import { Request, Response } from 'express';
import LoginService from '../services';

export default class LoginController {
  private _model = new LoginService();

  login = async (req: Request, res: Response) => {
    const token = await this._model.login(req.body);

    res.status(200).json({ token });
  };
}
