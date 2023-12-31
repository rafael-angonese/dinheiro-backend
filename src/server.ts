import cors from 'cors';
import 'dotenv';
import express from 'express';

import errorHandler from '@/middlewares/error-handler';
import routes from '@/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => {
  console.log('Server listening on port: ' + process.env.PORT);
});
