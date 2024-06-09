import { Request, Response, NextFunction } from "express";
import { UpdateIsDisponivelProdutoUC } from "./UpdateIsDisponivelProdutoUC";

export class UpdateIsDisponivelProdutoController {
    constructor(
        private updateIsDisponivelProdutoUC: UpdateIsDisponivelProdutoUC
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        const { isDisponivelCompra } = request.body;

        try {
            let result = await this.updateIsDisponivelProdutoUC.execute({
                codigoProduto: codigo, isDisponivelCompra,
            });

            if (!result) {
                return response.status(204).json();
            }
            
            return response.status(200).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    }
}