import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/jwt';

const authValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return next({ status: 401, message: 'Token must be a valid token' });
  const { userData } = validateToken(authorization);
  res.locals.user = userData;

  return next();
};

export default authValidate;
