import TodoRouter from './to-do';

export const setUpControllers = (app) => {
  app.use('/to-do', TodoRouter);
};
