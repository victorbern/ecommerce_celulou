import { Request, Response, NextFunction } from "express";
import { FindProdutoUC } from "./FindProdutoUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class FindProdutoController {
    constructor(
        private findProdutoUC: FindProdutoUC
    ) { }

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        try {
            let result = await this.findProdutoUC.execute({ codigoProduto: codigo });

            if (result) {
                return response.status(HTTPStatusCode.OK).json({ result: result })
            }

            return response.status(HTTPStatusCode.NotFound).json({ error: "Nenhum produto encontrado!" })
        } catch (error) {
            next(error);
        }
    }
}