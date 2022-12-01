import checkLogin from './schemas';
import HttpException from '../../utils/http';
import { IUserLogin } from '../../interfaces/IUser';

const validatelogin = (login: IUserLogin): void => {
  const { error } = checkLogin.validate(login);

  if (error) throw new HttpException(400, error.message);
};

export default validatelogin;
