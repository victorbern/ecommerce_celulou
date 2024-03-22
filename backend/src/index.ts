import express from 'express';
import { router } from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);


export { app }