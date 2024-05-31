import { Request, Response, NextFunction } from "express";
import { UpdateIsVisibleProdutoUC } from "./UpdateIsVisibleProdutoUC";

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

            if (result.message === "O produto já possui esta visibilidade.") {
                return response.status(204).json({ message: result.message });
            }

            return response.status(200).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    }
}