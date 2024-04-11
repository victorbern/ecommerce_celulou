import { ZodError } from "zod";
import { AppError } from "../../../errors/AppError";
import { UpdateClienteUC } from "./UpdateClienteUC";
import { Request, Response } from "express";

export class UpdateClienteController {
    constructor(
        private updateClienteUC: UpdateClienteUC,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const codigo = request.params.codigo;
            const { nomeCliente, cpfCliente, celularCliente, emailCliente } = request.body;
            let result = await this.updateClienteUC.execute({
                codigoCliente: codigo, nomeCliente, cpfCliente, celularCliente, emailCliente
            });

            return response.status(200).json({ message: result.message })

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