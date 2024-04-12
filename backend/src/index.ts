import express from 'express';
import { router } from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandlerMiddleware } from './errors/ErrorHandler';
require('express-async-errors')

const app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandlerMiddleware);


export { app }