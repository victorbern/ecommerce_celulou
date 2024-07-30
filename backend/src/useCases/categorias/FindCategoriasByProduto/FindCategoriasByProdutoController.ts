import { Request, Response, NextFunction } from "express";
import { FindCategoriasByProdutoUC } from "./FindCategoriasByProdutoUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class FindCategoriasByProdutoController {
    constructor(
        private findCategoriasByProdutoUC: FindCategoriasByProdutoUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const codigo = request.params.codigo;

            const result = await this.findCategoriasByProdutoUC.execute({
                codigoProduto: codigo
            })

            if (result.length > 0) {
                return response.status(HTTPStatusCode.OK).json({ result: result })
            }

            return response.status(HTTPStatusCode.NotFound).json({ error: "Nenhuma categoria encontrada!" })

        } catch (error) {
            next(error);
        }
    }
}