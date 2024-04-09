import { Request, Response } from "express";
import { CreateClienteUC } from "./CreateClienteUC";
import { AppError } from "../../../errors/AppError";
import { ZodError } from "zod";

export class CreateClienteController {
    constructor(
        private createClienteUC: CreateClienteUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { nomeCliente, cpfCliente, celularCliente, emailCliente } = request.body;

            let result = await this.createClienteUC.execute({
                nomeCliente, cpfCliente, celularCliente, emailCliente
            });

            return response.status(201).json({ message: result.message })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                if (error instanceof AppError) {
                    return response.status(error.statusCode).json({ 
                        error: error.message
                    });
                }

                if (error instanceof ZodError) {
                    return response.status(400).json({ errors: error.errors })
                }
                
                return response.status(500).json({ error: error.message });
            } else {
                return response.status(500).json({ error: "Unexpected Error" });
            }
        }
    }
}