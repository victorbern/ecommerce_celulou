import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";

export const errorHandlerMiddleware = (
    error: Error, request: Request, response: Response, next: NextFunction
) => {

    console.log(error.stack);

    if (error instanceof AppError) {
        console.log(error.message);
        response.status(error.statusCode).send({
            error: error.message
        });
        next();
    } else if (error instanceof ZodError) {
        response.status(400).send({ errors: error.errors })
        next();
    } else {
        response.status(500).send({ error: error.message });
    }
    next();
}