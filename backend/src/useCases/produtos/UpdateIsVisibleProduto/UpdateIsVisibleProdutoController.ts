import { Request, Response, NextFunction } from "express";
import { UpdateIsVisibleProdutoUC } from "./UpdateIsVisibleProdutoUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class UpdateIsVisibleProdutoController {
    constructor(
        private updateIsVisibleProdutoUC: UpdateIsVisibleProdutoUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction) {
        const codigo = request.params.codigo;
        const { isVisible } = request.body;
        try {
            let result = await this.updateIsVisibleProdutoUC.execute({
                codigoProduto: codigo, isVisible
            });

            if (!result) {
                return response.status(HTTPStatusCode.NoContent).json();
            }

            return response.status(HTTPStatusCode.OK).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    }
}