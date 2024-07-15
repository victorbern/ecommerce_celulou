import { Request, Response, NextFunction } from "express";
import { FindEnderecoUC } from "./FindEnderecoUC";

export class FindEnderecoController {
    constructor(
        private findEnderecoUC: FindEnderecoUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        
        try {
            let result = await this.findEnderecoUC.execute({
                codigoEndereco: codigo,
            });

            if (result) {
                return response.status(200).json({ result: result })
            }

            return response.status(404).json({ error: "Endereço não encontrado!" })
        } catch (error) {
            next(error);
        }
    }
}