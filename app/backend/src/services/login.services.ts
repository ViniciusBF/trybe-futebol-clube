import * as bcrypt from 'bcryptjs';
import UsersModel from '../database/models/User';
import createToken from '../utils/jwt';
import { IUser, IUserLogin } from '../interfaces/IUser';
import validatelogin from './validations/validations';
import HttpException from '../utils/http';

export default class LoginService {
  private _model = UsersModel;

  public async login({ email, password }: IUserLogin): Promise<string> {
    console.log(email, password);
    validatelogin({ email, password });

    const user: IUser | null = await this._model.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = createToken(user);
    return token;
  }
}
