import { Router } from 'express';
import { authGuard } from '../../guards/auth';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './methods';
const router = Router();

router.get('/ping', authGuard, async (req, res) => {
  res.json({ message: 'pong', jwt_payload: req.jwt_payload });
});

router.get('/list', authGuard, async (_req, res, next) => {
  try {
    const todos = await getAllUsers();
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/detail', authGuard, async (req, res, next) => {
  try {
    const detail = await getUserById(req.params.userId);
    res.json(detail);
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const newTodo = await createUser(req.body);
    res.json({
      message: 'Se ha creado un nuevo usuario',
      newTodo,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:userId/update', authGuard, async (req, res, next) => {
  try {
    await updateUser(req.params.userId, req.body);
    const data = await getUserById(req.params.userId);
    res.json({
      message: `Se ha actualizado el usuario ${req.params.userId}`,
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId/delete', authGuard, async (req, res, next) => {
  try {
    await deleteUser(req.params.userId);
    res.json({ message: `Se ha eliminado el usuario ${req.params.userId}` });
  } catch (error) {
    next(error);
  }
});

export default router;
