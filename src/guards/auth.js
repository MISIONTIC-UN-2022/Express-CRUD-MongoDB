import { verify } from 'jsonwebtoken';
import { UnAuthorizedError } from '../error';

export const authGuard = (req, _res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    throw new UnAuthorizedError('No se encuentra autenticado');

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.JWT_ACCESS_SECRET);
    req.jwt_payload = payload;
  } catch (err) {
    console.log(err);
    throw new UnAuthorizedError('Fallo la verificación del token');
  }

  return next();
};
