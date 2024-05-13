import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";
import { MulterError } from "multer";

export const errorHandlerMiddleware = (
    error: Error, request: Request, response: Response, next: NextFunction
) => {

    console.log(error.stack);

    if (error instanceof AppError) {
        console.log(error.message);
        response.status(error.statusCode).send({
            error: error.message
        });
    } else if (error instanceof ZodError) {
        response.status(400).send({ error: error.errors[0].message })
    } else if (error instanceof MulterError) {
        switch(error.code) {
            case "LIMIT_FILE_SIZE":
                response.status(400).send({ error: "Erro durante upload: arquivo(s) muito grande(s)"})
            case "LIMIT_UNEXPECTED_FILE":
                response.status(400).send({ error: "Erro durante upload: campo inexperado!"})
            default:
                response.status(400).send({ error: "Erro durante upload. Tente novamente mais tarde!" })
        }
    } else {
        response.status(500).send({ error: "Algo deu errado!" });
    }
    next();
}

// LIMIT_FILE_SIZE: 'File too large',
// LIMIT_FILE_COUNT: 'Too many files',
// LIMIT_FIELD_KEY: 'Field name too long',
// LIMIT_FIELD_VALUE: 'Field value too long',
// LIMIT_FIELD_COUNT: 'Too many fields',
// LIMIT_UNEXPECTED_FILE: 'Unexpected field',
// MISSING_FIELD_NAME: 'Field name missing'