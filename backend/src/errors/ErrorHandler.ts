import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

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
    } else {
        response.status(500).send({ error: "Algo deu errado!" });
    }
    next();
}

