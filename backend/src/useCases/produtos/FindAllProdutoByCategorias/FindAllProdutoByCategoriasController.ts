import { Request, Response, NextFunction } from "express";
import { FindAllProdutoByCategoriasUC } from "./FindAllProdutoByCategoriasUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { FindAllProdutoUC } from "./FindAllProdutoUC";

export class FindAllProdutoByCategoriasController {
    constructor(
        private findAllProdutoByCategoriasUC: FindAllProdutoByCategoriasUC,
        private findAllProdutoUC: FindAllProdutoUC
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { categorias } = request.body;
        try {
            let result = null;
            if (categorias) {
                result = await this.findAllProdutoByCategoriasUC.execute({
                categorias
            });
            } else {
                result = await this.findAllProdutoUC.execute();
            }   

            if (result.length > 0) {
                return response.status(HTTPStatusCode.OK).json({ result: result });
            }

            return response.status(HTTPStatusCode.NotFound).json({ error: "Nenhum produto encontrado!" })
        } catch (error) {
            next(error);
        }
    }
}