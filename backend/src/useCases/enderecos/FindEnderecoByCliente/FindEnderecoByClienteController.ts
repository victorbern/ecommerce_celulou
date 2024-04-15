import { FindEnderecoByClienteUC } from "./FindEnderecoByClienteUC";
import { Request, Response, NextFunction } from "express";

export class FindEnderecoByClienteController {
    constructor(
        private findEnderecoByClienteUC: FindEnderecoByClienteUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        try {
            let result = await this.findEnderecoByClienteUC.execute({codigoCliente: codigo});

            if (result.length > 0) {
                return response.status(200).json({result: result});
            }

            return response.status(404).json({ error: "Nenhum endereço encontrado!" })
        } catch (error) {
            next(error);
        }
    }
}