import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './IUser';

export interface Ijwt extends JwtPayload {
  userData: IUser
}
