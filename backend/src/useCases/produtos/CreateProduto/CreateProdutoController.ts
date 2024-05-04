import { Request, Response, NextFunction } from "express";
import { CreateProdutoUC } from "./CreateProdutoUC";

export class CreateProdutoController {
    constructor(
        private createProdutoUC: CreateProdutoUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction) {
        const { valor, nomeProduto, marca, descricaoProduto, pesoGramas, alturaCM, larguraCM, comprimentoCM } = request.body;
        try {
            let result = await this.createProdutoUC.execute({
                valor, nomeProduto, marca, descricaoProduto, pesoGramas, alturaCM, larguraCM, comprimentoCM
            });

            return response.status(201).json({ message: result.message, codigoProduto: result.codigoProduto })
        } catch (error) {
            next(error);
        }
    }
}