import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/User';
import createToken from '../utils/jwt';
import { IUserLogin } from '../interfaces/IUser';

export default class LoginService {
  private _model = UserModel;

  public async login({ email, password }: IUserLogin): Promise<string> {
    const user = await this._model.findOne({ where: { email } });
    if (!user) return 'token';

    if (!bcrypt.compare(password, user.password)) return 'token';

    const token = createToken(user);
    return token;
  }
}
