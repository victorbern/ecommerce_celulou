import { Request, Response, NextFunction } from "express";
import { UpdateProdutoUC } from "./UpdateProdutoUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class UpdateProdutoController {
    constructor(
        private updateProdutoUC: UpdateProdutoUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        const { valor, nomeProduto, marca, descricaoProduto, pesoGramas, alturaCM, larguraCM, comprimentoCM } = request.body;
        try {
            let result = await this.updateProdutoUC.execute({
                codigoProduto: codigo, valor, nomeProduto, marca, descricaoProduto, pesoGramas, alturaCM, larguraCM, comprimentoCM
            });

            return response.status(HTTPStatusCode.OK).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    }
}