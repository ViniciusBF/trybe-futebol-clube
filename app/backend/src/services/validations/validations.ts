import checkLogin, { insertValidation } from './schemas';
import HttpException from '../../utils/http';
import { IUserLogin } from '../../interfaces/IUser';
import { IMatchBody } from '../../interfaces/IMatch';

const validatelogin = (login: IUserLogin): void => {
  const { error } = checkLogin.validate(login);

  if (error) throw new HttpException(400, error.message);
};

const validateInsert = (body: IMatchBody): void => {
  const { error } = insertValidation.validate(body);

  if (error) throw new HttpException(422, error.message);
};

export default validatelogin;
export { validateInsert };
