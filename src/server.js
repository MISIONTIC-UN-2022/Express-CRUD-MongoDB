import express from 'express';
import compression from 'compression';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(compression());

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.listen(PORT, () =>
  console.log(`Sevidor esperando por peticiones en localhost:${PORT}`)
);
