import { Request, Response, NextFunction } from "express";
import { DeleteCategoriaUC } from "./DeleteCategoriaUC"
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class DeleteCategoriaController {
    constructor(
        private deleteCategoriaUC: DeleteCategoriaUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        try {
            let result = await this.deleteCategoriaUC.execute({
                codigoCategoria: codigo
            });

            return response.status(HTTPStatusCode.OK).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    }
}