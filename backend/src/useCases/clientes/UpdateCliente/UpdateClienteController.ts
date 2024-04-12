import { UpdateClienteUC } from "./UpdateClienteUC";
import { Request, Response, NextFunction } from "express";

export class UpdateClienteController {
    constructor(
        private updateClienteUC: UpdateClienteUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        const { nomeCliente, cpfCliente, celularCliente, emailCliente } = request.body;
        try {
            let result = await this.updateClienteUC.execute({
                codigoCliente: codigo, nomeCliente, cpfCliente, celularCliente, emailCliente
            });

            return response.status(200).json({ message: result.message })

        } catch (error) {
            next(error);
        }
    }
}