import { Request, Response, NextFunction } from "express";
import { FindProdutoUC } from "./FindProdutoUC";

export class FindProdutoController {
    constructor(
        private findProdutoUC: FindProdutoUC
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        try {
            let result = await this.findProdutoUC.execute({codigoProduto: codigo});

            return response.status(200).json({ result: result })
        } catch (error) {
            next(error);
        }
    }
}