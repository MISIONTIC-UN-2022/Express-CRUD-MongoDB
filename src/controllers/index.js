import AuthRouter from './auth';
import TodoRouter from './to-do';
import UserRouter from './user';

export const setUpControllers = (app) => {
  app.use('/auth', AuthRouter);
  app.use('/to-do', TodoRouter);
  app.use('/user', UserRouter);
};
