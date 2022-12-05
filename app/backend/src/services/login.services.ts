import * as bcrypt from 'bcryptjs';
import UsersModel from '../database/models/User';
import createToken from '../utils/jwt';
import { IUserLogin } from '../interfaces/IUser';
import validatelogin from './validations/validations';
import HttpException from '../utils/http';

export default class LoginService {
  private _model = UsersModel;

  login = async ({ email, password }: IUserLogin): Promise<string> => {
    validatelogin({ email, password });

    const user = await this._model.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const { username, role, id } = user;
    const token = createToken({ username, role, email, id, password });
    return token;
  };
}
