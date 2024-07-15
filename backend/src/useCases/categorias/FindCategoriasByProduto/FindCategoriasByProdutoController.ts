import { Request, Response, NextFunction } from "express";
import { FindCategoriasByProdutoUC } from "./FindCategoriasByProdutoUC";

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
                return response.status(200).json({ result: result })
            }

            return response.status(404).json({ error: "Nenhuma categoria encontrada!" })

        } catch (error) {
            next(error);
        }
    }
}