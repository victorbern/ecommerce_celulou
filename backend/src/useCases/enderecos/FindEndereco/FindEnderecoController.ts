import { Request, Response, NextFunction } from "express";
import { FindEnderecoUC } from "./FindEnderecoUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

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
                return response.status(HTTPStatusCode.OK).json({ result: result })
            }

            return response.status(HTTPStatusCode.NotFound).json({ error: "Endereço não encontrado!" })
        } catch (error) {
            next(error);
        }
    }
}