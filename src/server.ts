import express, { NextFunction, Request, Response } from 'express';
import 'dotenv'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import AppError from './errors/AppError';

import routes from './routes'

const corsOptions = {
  origin: '*',
  credentials: true,
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json(err);
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
    // message: `Internal server error - ${err.message}`,
  });
});


app.listen(process.env.PORT || 3333, () => {
  console.log('Server listening on port: ' + process.env.PORT)
})