import { NextFunction, Request, Response } from "express";
import { CreateClienteUC } from "./CreateClienteUC";
import { AppError } from "../../../errors/AppError";
import { ZodError } from "zod";

export class CreateClienteController {
    constructor(
        private createClienteUC: CreateClienteUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { nomeCliente, cpfCliente, celularCliente, emailCliente } = request.body;

        try {

        let result = await this.createClienteUC.execute({
            nomeCliente, cpfCliente, celularCliente, emailCliente
        });

        return response.status(201).json({ 
            message: result.message,
            codigoCliente: result.codigoCliente 
        })

        } catch(error) {
            next(error);
        }
    }
}