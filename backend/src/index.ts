import express from 'express';
import { router } from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandlerMiddleware } from './errors/ErrorHandler';
require('express-async-errors')
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync('./swagger.yml', 'utf8')
const swaggerDocument = YAML.parse(file)


const app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandlerMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export { app }