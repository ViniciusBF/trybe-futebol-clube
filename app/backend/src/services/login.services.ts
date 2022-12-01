import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/User';
import createToken from '../utils/jwt';
import { IUserLogin } from '../interfaces/IUser';
import validatelogin from './validations/validations';

export default class LoginService {
  private _model = UserModel;

  public async login({ email, password }: IUserLogin): Promise<string> {
    validatelogin({ email, password });

    const user = await this._model.findOne({ where: { email } });

    if (!user || !bcrypt.compare(password, user.password)) return 'token';

    const token = createToken(user);
    return token;
  }
}
