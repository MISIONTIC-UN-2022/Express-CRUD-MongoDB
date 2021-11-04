import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';
import { connectToMongoDB } from './db/client';
import { setUpControllers } from './controllers';

const main = async () => {
  try {
    config({ path: `.env.${process.env.NODE_ENV?.trim() || 'development'}` });
    const PORT = process.env.PORT || 3001;
    const app = express();

    await connectToMongoDB();

    app.use(compression());
    app.use(cookieParser());
    app.use(urlencoded({ extended: false }));
    app.use(json());

    app.get('/', (_req, res) => res.json({ message: 'ok' }));

    setUpControllers(app);

    app.use((err, _req, res, _next) => {
      console.error(err);
      const statusCode = err.statusCode || 500;
      res.status(statusCode).json({ ...err });
    });

    app.listen(PORT, () =>
      console.log(`Sevidor esperando por peticiones en localhost:${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
};

main();
