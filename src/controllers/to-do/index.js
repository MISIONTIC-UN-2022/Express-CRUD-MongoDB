import { Router } from 'express';
import { verifyTodoPayload } from './guards';
import {
  completeTodo,
  createTodo,
  deleteTodo,
  getAllTodos,
  getAllTodosByState,
  getTodoById,
  updateTodo,
} from './methods';
const router = Router();

router.get('/list', async (_req, res) => {
  const todos = await getAllTodos();
  res.json(todos);
});

router.get('/list-pending', async (_req, res) => {
  const todos = await getAllTodosByState(false);
  res.json(todos);
});

router.get('/list-completed', async (_req, res) => {
  const todos = await getAllTodosByState(true);
  res.json(todos);
});

router.get('/:todoId/detail', async (req, res) => {
  const detail = await getTodoById(req.params.todoId);
  res.json(detail);
});

router.post('/create', verifyTodoPayload, async (req, res) => {
  const newTodo = await createTodo(req.body);
  res.json({
    message: 'Se ha creado un nuevo todo',
    newTodoId: newTodo.insertedId,
  });
});

router.put('/:todoId/update', verifyTodoPayload, async (req, res) => {
  await updateTodo(req.params.todoId, req.body);
  res.json({ message: `Se ha actualizado el todo ${req.params.todoId}` });
});

router.put('/:todoId/complete', async (req, res) => {
  await completeTodo(req.params.todoId);
  res.json({ message: `Se ha completado el todo ${req.params.todoId}` });
});

router.delete('/:todoId/delete', async (req, res) => {
  await deleteTodo(req.params.todoId);
  res.json({ message: `Se ha eliminado el todo ${req.params.todoId}` });
});

export default router;
