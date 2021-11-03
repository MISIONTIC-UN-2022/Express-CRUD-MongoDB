import { Router } from 'express';
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

router.get('/list', async (_req, res, next) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

router.get('/list-pending', async (_req, res, next) => {
  try {
    const todos = await getAllTodosByState(false);
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

router.get('/list-completed', async (_req, res, next) => {
  try {
    const todos = await getAllTodosByState(true);
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

router.get('/:todoId/detail', async (req, res, next) => {
  try {
    const detail = await getTodoById(req.params.todoId);
    res.json(detail);
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const newTodo = await createTodo(req.body);
    res.json({
      message: 'Se ha creado un nuevo todo',
      newTodo,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:todoId/update', async (req, res, next) => {
  try {
    await updateTodo(req.params.todoId, req.body);
    const data = await getTodoById(req.params.todoId);
    res.json({
      message: `Se ha actualizado el todo ${req.params.todoId}`,
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:todoId/complete', async (req, res, next) => {
  try {
    await completeTodo(req.params.todoId);
    res.json({ message: `Se ha completado el todo ${req.params.todoId}` });
  } catch (error) {
    next(error);
  }
});

router.delete('/:todoId/delete', async (req, res, next) => {
  try {
    await deleteTodo(req.params.todoId);
    res.json({ message: `Se ha eliminado el todo ${req.params.todoId}` });
  } catch (error) {
    next(error);
  }
});

export default router;
