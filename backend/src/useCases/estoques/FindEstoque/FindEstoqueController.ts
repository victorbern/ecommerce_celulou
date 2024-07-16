import { Request, Response, NextFunction } from "express";
import { FindEstoqueUC } from "./FindEstoqueUC";

export class FindEstoqueController {
    constructor(
        private findEstoqueUC: FindEstoqueUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        try {
            const result = await this.findEstoqueUC.execute({
                codigoEstoque: codigo,
            });

            if (result) {
                return response.status(200).json({ result: result })
            }

            return response.status(404).json({ error: "Nenhum estoque encontrado!" })
        } catch (error) {
            next(error);
        }
    }
}