import { Request, Response } from "express";
import { FindClienteUC } from "./FindClienteUC";
import { AppError } from "../../../errors/AppError";
import { ZodError } from "zod";

export class FindClienteController {
    constructor(
        private findClienteUC: FindClienteUC,
    ) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { codigo } = request.params;

            let result = await this.findClienteUC.execute({
                codigoCliente: codigo
            });

            if (result) {
                return response.status(200).json({ result: result })
            }

            return response.status(404).json({ error: "Cliente não encontrado "})
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