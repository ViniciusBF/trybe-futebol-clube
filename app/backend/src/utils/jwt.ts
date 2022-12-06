import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import { Ijwt } from '../interfaces/IJwt';
import HttpException from './http';

const createToken = (data: IUser) => {
  const { password, ...userData } = data;
  const token = jwt.sign({ userData }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

export const validateToken = (token: string): Ijwt => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);

    return user as Ijwt;
  } catch (error) {
    throw new HttpException(401, 'Token must be a valid token');
  }
};

export default createToken;
