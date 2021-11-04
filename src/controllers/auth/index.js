import { Router } from 'express';
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  increaseVersion,
} from './methods';
const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = await loginUser(req.body);
    res
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .json({ message: 'El usuario ha inicado sesión', accessToken });
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const newUser = await registerUser(req.body);
    res.json({
      message: 'Se ha creado un nuevo usuario',
      newTodo: newUser,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = await refreshAccessToken(
      req.cookies.refreshToken
    );
    res
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .json({ message: 'Token de acceso actualizado', accessToken });
  } catch (error) {
    next(error);
  }
});

router.delete('/sessions', async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = await increaseVersion(
      req.cookies.refreshToken
    );
    res.cookie('refreshToken', refreshToken, { httpOnly: true }).json({
      message: 'Se ha actualizado la version para los tokens',
      accessToken,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
