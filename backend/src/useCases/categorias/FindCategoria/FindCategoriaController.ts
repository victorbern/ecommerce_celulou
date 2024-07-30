import { Request, Response, NextFunction } from "express";
import { FindCategoriaUC } from "./FindCategoriaUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class FindCategoriaController {
    constructor(
        private findCategoriaUC: FindCategoriaUC
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { codigo } = request.params;

        try {
            let result = await this.findCategoriaUC.execute({
                codigoCategoria: codigo,
            });

            if (result) {
                return response.status(HTTPStatusCode.OK).json({ result: result })
            }

            return response.status(HTTPStatusCode.NotFound).json({ error: "Categoria não encontrada!" })
        } catch (error) {
            next(error);
        }
    }
}