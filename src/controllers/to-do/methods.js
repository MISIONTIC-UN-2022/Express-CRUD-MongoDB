import { Todo } from '../../models';

export const getAllTodos = async () => {
  const todos = await Todo.find();
  return todos;
};

export const getAllTodosByState = async (isCompleted) => {
  const todos = await Todo.find({ isCompleted });
  return todos;
};

export const getTodoById = async (todoId) => {
  const todo = Todo.findById(todoId);
  return todo;
};

export const createTodo = async (payload) => {
  const newTodo = new Todo(payload);
  await newTodo.save();
  return newTodo;
};

export const updateTodo = async (todoId, updatedTodo) => {
  const result = await Todo.updateOne({ _id: todoId }, updatedTodo);
  return result;
};

export const completeTodo = async (todoId) => {
  const result = await Todo(
    { _id: todoId },
    { $set: { isCompleted: true, completedAt: new Date() } }
  );
  return result;
};

export const deleteTodo = async (todoId) => {
  const result = await Todo.deleteOne({ _id: todoId });
  return result;
};
