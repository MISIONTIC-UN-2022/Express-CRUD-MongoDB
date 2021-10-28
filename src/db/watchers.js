import { mongoDBClient } from './client';

const gracefulShutdown = () => {
  console.log('Conexión con MongoDB cerrada.');
  mongoDBClient.close();
};

export const setUpMongoDBProcessWatchers = () => {
  // cerrar conexion en process.exit()
  process.on('exit', gracefulShutdown);

  // cerrar conexion en comandos del CLI.
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGKILL', gracefulShutdown);

  // cerrar conexion en excepciones no controladas.
  process.on('uncaughtException', gracefulShutdown);
};
