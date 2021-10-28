import { Router } from 'express';
import { getAllTodos } from './queries';
const router = Router();

router.get('/list', async (req, res) => {
  const todos = await getAllTodos();
  res.json(todos);
});

export default router;
