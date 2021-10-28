import { mongoDBClient } from '../../db/client';

export const getAllTodos = async () => {
  try {
    const cursor = await mongoDBClient
      .db('mision-tic-2022')
      .collection('to-do-items')
      .find();

    const todos = await cursor.toArray();
    return todos;
  } catch (error) {
    console.error(error);
  }
};
