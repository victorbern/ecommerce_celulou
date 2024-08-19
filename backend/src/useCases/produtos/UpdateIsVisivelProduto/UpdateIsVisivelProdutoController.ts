import { Request, Response, NextFunction } from "express";
import { UpdateIsVisivelProdutoUC } from "./UpdateIsVisivelProdutoUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class UpdateIsVisivelProdutoController {
    constructor(
        private updateIsVisivelProdutoUC: UpdateIsVisivelProdutoUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction) {
        const codigo = request.params.codigo;
        const { isVisivel } = request.body;
        try {
            let result = await this.updateIsVisivelProdutoUC.execute({
                codigoProduto: codigo, isVisivel
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