import express from 'express';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';
import { connectToMongoDB } from './db/client';
import { setUpControllers } from './controllers';

const main = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const app = express();

    await connectToMongoDB();

    app.use(compression());
    app.use(urlencoded({ extended: false }));
    app.use(json());

    app.get('/', (req, res) => res.json({ message: 'ok' }));

    setUpControllers(app);

    app.use((err, _req, res, _next) => res.status(400).json({ ...err }));

    app.listen(PORT, () =>
      console.log(`Sevidor esperando por peticiones en localhost:${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
};

main();
