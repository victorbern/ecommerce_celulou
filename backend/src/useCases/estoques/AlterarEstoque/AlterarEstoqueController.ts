import { Request, Response, NextFunction } from "express";
import { AlterarEstoqueUC } from "./AlterarEstoqueUC";

export class AlterarEstoqueController {
    constructor(
        private alterarEstoqueUC: AlterarEstoqueUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        const valorAlteracao = request.body.valorAlteracao;

        try {
            const result = await this.alterarEstoqueUC.execute({
                codigoProduto: codigo, valorAlteracao
            });

            return response.status(200).json({ result })

        } catch (error) {
            next(error);
        }
    }
}