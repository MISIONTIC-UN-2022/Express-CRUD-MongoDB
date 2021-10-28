import DB_CONFIG from '../config/db.json';

import { MongoClient } from 'mongodb';
import { setUpMongoDBProcessWatchers } from './watchers';

let mongoDBClient = null;

const listDatabases = async () => {
  const databasesList = await mongoDBClient.db().admin().listDatabases();

  console.log('Bases de datos:');
  databasesList.databases.forEach((db) => console.log(`    - ${db.name}`));
  console.log('');
};

export const connectToMongoDB = async () => {
  const connectionString = DB_CONFIG.CONNECTION_URL;

  mongoDBClient = new MongoClient(connectionString);

  try {
    console.log('Conectandose a MongoDB...');
    await mongoDBClient.connect();
    console.log('Conexion con MongoDB establecida.');
    await listDatabases();
  } catch (e) {
    console.log('Error conectandose a MongoDB');
    console.error(e);
  } finally {
    setUpMongoDBProcessWatchers();
  }
};

export { mongoDBClient };
