import { sign, verify } from 'jsonwebtoken';
import { ClientError, NotFoundError, TokenExpiredError } from '../../error';
import { User } from '../../models';

export const registerUser = async (payload) => {
  try {
    const newTodo = new User(payload);
    await newTodo.save();
    return newTodo;
  } catch (error) {
    if (error.code === 11000) throw new ClientError('Usuario no disponible');
    else throw error;
  }
};

const getTokenPair = async (user) => {
  const accessToken = await sign(
    {
      user: { _id: user._id, tokenVersion: user.tokenVersion, user: user.user },
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '5m' }
  );

  const refreshToken = await sign(
    { user: { _id: user._id, tokenVersion: user.tokenVersion } },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { refreshToken, accessToken };
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ user: payload.user });
  if (!user) throw new NotFoundError('Usuario no encontrado.');

  const passwordMatch = await user.comparePassword(payload.password);
  if (!passwordMatch) throw new ClientError('Contraseña invalida.');

  return await getTokenPair(user);
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken)
    throw new NotFoundError('No se encontro el refresh token.');

  const payload = verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(payload.user._id);

  if (!user) throw new NotFoundError('No se encontro el usuario.');

  if (user.tokenVersion !== payload.user.tokenVersion)
    throw new TokenExpiredError('Este token no es valido.');

  return await getTokenPair(user);
};

export const increaseVersion = async (refreshToken) => {
  if (!refreshToken)
    throw new NotFoundError('No se encontro el refresh token.');

  const payload = verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  let user = await User.findById(payload.user._id);
  if (!user) throw new NotFoundError('No se encontro el usuario.');

  await User.updateOne(
    { _id: user._id },
    { tokenVersion: user.tokenVersion + 1 }
  );

  user = await User.findById(user._id);

  return await getTokenPair(user);
};
