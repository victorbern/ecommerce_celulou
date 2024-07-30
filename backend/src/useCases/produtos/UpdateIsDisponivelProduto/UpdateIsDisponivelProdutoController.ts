import { Request, Response, NextFunction } from "express";
import { UpdateIsDisponivelProdutoUC } from "./UpdateIsDisponivelProdutoUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

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
                return response.status(HTTPStatusCode.NoContent).json();
            }
            
            return response.status(HTTPStatusCode.OK).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    }
}