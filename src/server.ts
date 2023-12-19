import AppError from '@/errors/AppError';
import cors from 'cors';
import 'dotenv';
import express, { Request, Response } from 'express';
import 'express-async-errors';

import routes from '@/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json(err);
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Server listening on port: ' + process.env.PORT);
});
