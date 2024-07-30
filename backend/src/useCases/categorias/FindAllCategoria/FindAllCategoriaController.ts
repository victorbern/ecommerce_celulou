import { Request, Response, NextFunction } from "express";
import { FindAllCategoriaUC } from "./FindAllCategoriaUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class FindAllCategoriaController {
    constructor(
        private findAllCategoriaUC: FindAllCategoriaUC,
    ) {}

    async handle (request: Request, response: Response, next: NextFunction): Promise<Response> {
        const filtro = request.params.filtro;
        try {
            let result = await this.findAllCategoriaUC.execute({ filtro: filtro })

            if (result.length > 0) {
                return response.status(HTTPStatusCode.OK).json({ result: result });
            }

            return response.status(HTTPStatusCode.NotFound).json({ error: "Nenhuma categoria encontrada!" });
            
        } catch (error) {
            next(error);
        }
    }
}